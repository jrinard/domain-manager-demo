import { useEffect } from 'react'
import { get, noop } from 'lodash'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSyync } from './useSyync'
import { SYYNC_CUSTOM_MESSAGE_TYPE } from './constants'
import { SyncMessage } from './types'

export function useSyncPathChangeEffect() {
  const syync = useSyync()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const handleMessageReceived = (e: Event) => {
      const event: CustomEvent<SyncMessage> = e as CustomEvent<SyncMessage>
      const detail = get(event, 'detail')

      if (!detail || typeof detail !== 'object') return

      const msgType: string = get(detail, 'type')

      if (!msgType) return

      switch (msgType) {
        case 'navigation-request': {
          let route = `${detail?.payload?.path || ''}`

          if (
            !route ||
            !route.trim() ||
            route.trim() === window.location.pathname
          ) {
            return
          } else if (!route.startsWith('/')) {
            route = `/${route}`
          }

          navigate(route)
          break
        }
        default:
          return
      }
    }

    window.addEventListener(
      `${SYYNC_CUSTOM_MESSAGE_TYPE}`,
      handleMessageReceived,
      { signal },
    )

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!syync) return

    syync
      .sendMessage('sync-child-route', { route: location.pathname })
      .then(noop)
      .catch(noop)
  }, [location.pathname, syync])
}

export default useSyncPathChangeEffect
