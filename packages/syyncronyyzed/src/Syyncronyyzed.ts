import { get } from 'lodash'
import {
  APP_TYPES,
  COMMON_REJECTION_MESSAGES,
  SYYNC_CUSTOM_MESSAGE_TYPE,
} from './constants'
import type {
  AppRole,
  AppType,
  ConnectionState,
  CoreKnownMessageTypes,
  SyncMessage,
  SyyncProps,
} from './types'
import { generateRandomString } from './utils'

class Syyncronyyzed<KnownMessageTypes extends string = string> {
  private _appRole: AppRole
  private _appType: AppType
  private _targetHosts: Set<string>
  private messageID: number
  private _targetWindow: Window | HTMLIFrameElement | null
  private pendingOutboundMessages: {
    [key: string]: {
      resolve: (
        value: SyncMessage<
          KnownMessageTypes | CoreKnownMessageTypes
        >['payload'],
      ) => void
      reject: (errorMsg: string) => void
    }
  }
  private pendingInboundMessages: Map<string, MessageEventSource>
  private _instanceID: string
  private _connectionState: ConnectionState
  private _listenerEstablished: boolean
  private _pingMessageID: string | undefined
  private _messagePort: MessagePort | undefined
  private _failedSessionKeys: Set<string>

  constructor({
    targetWindow: _initialWindow = window,
    appRole,
    appType,
    targetHosts,
  }: SyyncProps) {
    this.messageID = 0

    if (appRole) {
      this._appRole = appRole
    } else {
      this._appRole = _initialWindow === window ? 'child' : 'parent'
    }

    this._appType = appType
    this._targetHosts = new Set(targetHosts)
    this._targetWindow =
      _initialWindow === window && this._appRole !== 'child'
        ? null
        : _initialWindow
    this._connectionState = 'uninitialized'
    this._listenerEstablished = false
    this.pendingOutboundMessages = {}
    this.pendingInboundMessages = new Map()
    this._instanceID = generateRandomString()
    this._failedSessionKeys = new Set()

    this._removeWindowMessageListener =
      this._removeWindowMessageListener.bind(this)
    this._removePortMessageListener = this._removePortMessageListener.bind(this)
    this._setupWindowMessageListener =
      this._setupWindowMessageListener.bind(this)
    this._setupPortMessageListener = this._setupPortMessageListener.bind(this)
    this.generateMessageID = this.generateMessageID.bind(this)
    this.isExpectedRequestType = this.isExpectedRequestType.bind(this)
    this.onWindowMessageReceived = this.onWindowMessageReceived.bind(this)
    this.onPortMessageReceived = this.onPortMessageReceived.bind(this)
    this.onMessageReceived = this.onMessageReceived.bind(this)
    this.emitMessageReceived = this.emitMessageReceived.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.sendResponse = this.sendResponse.bind(this)
    this.sendRejection = this.sendRejection.bind(this)
    this.clearPendingInboundMessage = this.clearPendingInboundMessage.bind(this)
    this.clearPendingOutboundPing = this.clearPendingOutboundPing.bind(this)
    this.checkAndHandleInternalMessage =
      this.checkAndHandleInternalMessage.bind(this)
    this.initializeConnection = this.initializeConnection.bind(this)
    this.ping = this.ping.bind(this)
    this.setTargetWindowAndReinitialize =
      this.setTargetWindowAndReinitialize.bind(this)

    if (
      import.meta.env['VITEST'] !== 'true' &&
      import.meta.env['TEST'] !== 'true'
    ) {
      if (import.meta.env['STORYBOOK'] !== 'true') {
        this._setupWindowMessageListener()
      }
      this.initializeConnection()
    }
  }

  public get instanceID(): string {
    return this._instanceID
  }

  public get connectionState(): ConnectionState {
    return this._connectionState
  }

  public get isConnected(): boolean {
    return this._connectionState === 'connected'
  }

  private get appRole(): AppRole {
    return this._appRole
  }

  protected get appType(): AppType {
    return this._appType
  }

  private get messagePort(): MessagePort | undefined {
    return this._messagePort
  }

  private get targetHosts() {
    return this._targetHosts
  }

  public get failedSessionKeys(): Set<string> {
    return this._failedSessionKeys
  }

  protected get targetWindow() {
    try {
      const targetWindow = this._targetWindow

      if (!targetWindow) return

      if (
        targetWindow instanceof HTMLElement &&
        'contentWindow' in targetWindow
      ) {
        return targetWindow.contentWindow
      }

      return targetWindow
    } catch (err) {
      console.error(err)
      return undefined
    }
  }

  public addFailedSessionKey(sessionKey: string) {
    this._failedSessionKeys.add(sessionKey)
  }

  private isExpectedRequestType(senderAppType: AppType): boolean {
    if (this.appType === senderAppType) {
      console.log('Incoming Message has same App Type; ignore.')
      return false
    }

    if (this.appType === APP_TYPES.TRYYB && senderAppType === APP_TYPES.TRYYB) {
      return false
    } else if (senderAppType !== APP_TYPES.TRYYB) {
      return false
    }

    if (this.connectionState !== 'connected') {
      this._connectionState = 'connected'
    }

    return true
  }

  public isFailedSessionKey(sesKey: string): boolean {
    return this._failedSessionKeys.has(sesKey)
  }

  _removeWindowMessageListener() {
    if (!this.targetWindow) return

    this.targetWindow.removeEventListener(
      'message',
      this.onWindowMessageReceived,
    )
  }

  private _setupWindowMessageListener() {
    if (this._listenerEstablished) return
    console.log('Setting up addEventListener!')

    window.addEventListener('message', this.onWindowMessageReceived)
    this._listenerEstablished = true
  }

  private _removePortMessageListener() {
    if (!this.messagePort) return

    this.messagePort.removeEventListener('message', this.onPortMessageReceived)
  }

  private _setupPortMessageListener() {
    const messagePort = this.messagePort

    if (!messagePort) return
    console.log('Setting up addEventListener!')

    messagePort.onmessageerror = this.onPortMessageError
    messagePort.onmessage = this.onPortMessageReceived
  }

  protected generateMessageID(): string {
    return `${this._instanceID}-${this.messageID++}`
  }

  private onWindowMessageReceived(
    event: MessageEvent<SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>>,
  ) {
    const isFrom = (path: string, match: RegExp): boolean => {
      const found = get(event.data, path, '').match(match)
      return !!(found && found.length > 0)
    }
    const fromWebpack = get(event.data, 'type', '') as string
    if (
      isFrom('source', /^(react-devtools-).*/gi) ||
      (fromWebpack && fromWebpack.indexOf('webpack') > -1)
    )
      return
    if (event.origin === window.location.origin) {
      return
    } else if (!event.data) {
      // eslint-disable-next-line no-console
      console.error('Message Event contained to `data`; ignore.')
      return
    }

    if (!this.isExpectedRequestType(event.data.appType)) {
      // TODO
      return
    }

    // TODO: Establish channel connection with `event.ports[0]`
    this.onMessageReceived(event)
  }

  private onPortMessageError(
    event: MessageEvent<SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>>,
  ) {
    // TODO: Handle error
  }

  private onPortMessageReceived(
    event: MessageEvent<SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>>,
  ) {
    if (event.origin === window.location.origin) {
      console.log('Message is own (onPortMessageReceived); ignore.')
      return
    } else if (!event.data) {
      return
    }

    // TODO
    this.onMessageReceived(event)
  }

  private onMessageReceived(
    event: MessageEvent<SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>>,
  ) {
    const message = event.data

    if (event.origin === window.location.origin) {
      console.log('Message is own (onMessageReceived); ignore.')
      return
    }

    if (message.role === 'request') {
      const wasHandled = this.checkAndHandleInternalMessage(event, message)

      if (wasHandled) {
        return
      }

      this.emitMessageReceived(event, message)
    } else if (message.role === 'response') {
      if (message.errorMsg) {
        const reject =
          this.pendingOutboundMessages[`${message.messageID}`]?.reject

        if (reject) {
          reject(message.errorMsg)
          delete this.pendingOutboundMessages[`${message.messageID}`]
        }

        return
      }

      const resolve =
        this.pendingOutboundMessages[`${message.messageID}`]?.resolve
      if (resolve) {
        resolve(message.payload)
        delete this.pendingOutboundMessages[`${message.messageID}`]
      }
    } else {
      console.error('Unknown message role:', message.role)
    }
  }

  private emitMessageReceived(
    event: MessageEvent<SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>>,
    message: SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>,
  ) {
    if (!event.source) return

    this.pendingInboundMessages.set(`${message.messageID}`, event.source)

    // * NOTE: `window` ***NOT*** `this._targetWindow`; intentional.
    window.dispatchEvent(
      new CustomEvent(SYYNC_CUSTOM_MESSAGE_TYPE, { detail: message }),
    )
  }

  public sendMessage(
    messageType: KnownMessageTypes | CoreKnownMessageTypes,
    payload?: {
      [key: string]: unknown
    },
  ): Promise<
    SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>['payload']
  > {
    return new Promise((resolve, reject) => {
      const messageID = this.generateMessageID()
      if (!this.targetWindow || !('postMessage' in this.targetWindow)) {
        reject('Target Window does not support `postMessage`')
      } else if (messageType === 'ping' && !this._pingMessageID) {
        this._pingMessageID = messageID
      }

      const message: SyncMessage<typeof messageType> = {
        appType: this.appType,
        messageID,
        type: messageType,
        role: 'request',
        payload: payload || {},
      }
      this.pendingOutboundMessages[messageID] = { resolve, reject }
      this.targetWindow?.postMessage(message, '*')
    })
  }

  public sendResponse(
    messageID: string,
    messageType: KnownMessageTypes | CoreKnownMessageTypes,
    payload?: {
      [key: string]: unknown
    },
    errorMsg?: string,
  ): boolean {
    if (!this.targetWindow) {
      return false
    }

    if (!this.pendingInboundMessages.has(messageID)) {
      return false
    }

    const messageSource = this.pendingInboundMessages.get(messageID)

    if (!messageSource || !('postMessage' in messageSource)) {
      return false
    }

    const message: SyncMessage<typeof messageType> = {
      appType: this.appType,
      messageID,
      type: messageType,
      role: 'response',
      payload: payload || {},
    }

    if (errorMsg) {
      message.errorMsg = errorMsg
    }

    messageSource.postMessage(message, { targetOrigin: '*' })

    return this.clearPendingInboundMessage(messageID)
  }

  public sendRejection(
    messageID: string,
    messageType: KnownMessageTypes | CoreKnownMessageTypes,
    rejectionMessage = COMMON_REJECTION_MESSAGES.UNKNOWN_ERROR_OCCURRED_IN_OTHER_APP,
  ): boolean {
    return this.sendResponse(messageID, messageType, {}, rejectionMessage)
  }

  /**
   * @returns `Boolean` of whether it was handled or not
   */
  private clearPendingInboundMessage(messageID: string) {
    if (!messageID || !this.pendingInboundMessages.has(messageID)) {
      return false
    }

    this.pendingInboundMessages.delete(messageID)
    return true
  }

  private clearPendingOutboundPing() {
    const pingMessageID = this._pingMessageID

    if (!pingMessageID) return

    const resFunction = this.pendingOutboundMessages[pingMessageID]?.resolve

    if (resFunction) {
      resFunction({})
    }

    delete this.pendingOutboundMessages[pingMessageID]
    this._pingMessageID = undefined
  }

  /**
   * @returns `Boolean` of whether it was handled or not
   */
  private checkAndHandleInternalMessage(
    _event: MessageEvent<
      SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>
    >,
    message: SyncMessage<KnownMessageTypes | CoreKnownMessageTypes>,
  ): boolean {
    switch (message.type) {
      case 'ping':
        if (this._pingMessageID) {
          /**
           * If there is a Pending Outbound Ping that has not had a response yet,
           * Yet the app is now processing an inbound Ping, that may be considered
           * Sufficiently equivalent to a proper response to the outbound Ping.
           */
          this.clearPendingOutboundPing()
        }
        this.sendResponse(message.messageID, 'ping')
        return true
      default:
        return false
    }
  }

  private async initializeConnection(): Promise<boolean> {
    if (this._connectionState === 'connected') {
      return true
    }

    if (!this.targetWindow) {
      return false
    }

    if (import.meta.env['STORYBOOK'] === 'true') {
      this._connectionState = 'connected'
      return true
    }

    try {
      if (this._connectionState === 'uninitialized') {
        this._connectionState = 'initializing'
      }

      const response = await this.ping()

      if (!response || response.type !== 'ping') {
        console.error(
          '::SYNCRONYYZED:: Invalid Ping Response Received. Message.data: ',
          response,
        )
        return false
      }

      this._connectionState = 'connected'
      return true
    } catch (_err) {
      this._connectionState = 'disconnected'
      return false
    }
  }

  ping() {
    console.log('Pinging! (Spacedock)')
    return this.sendMessage('ping', {})
  }

  public setTargetWindowAndReinitialize(
    newTargetWindow: Window | HTMLIFrameElement,
  ) {
    if (!newTargetWindow || newTargetWindow === window) return

    this._connectionState = 'initializing'
    this._removeWindowMessageListener()
    // TODO: Update `this.appRole`?
    this._targetWindow = newTargetWindow
    this._setupWindowMessageListener()

    this.initializeConnection()
  }
}

export { Syyncronyyzed }
export default Syyncronyyzed
