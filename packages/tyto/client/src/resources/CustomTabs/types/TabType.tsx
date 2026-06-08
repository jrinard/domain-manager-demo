export interface Tab {
  traitID: number
  name: string
  domainID: number
  seq: number
  iconUrl: string
  iconUrlLarge: string
  iconPathFull: string
  methodType: string
  destinationURI: string
  navigationTarget: string
  samlLogonUrl: string
  ssoCert: {
    certGUID: string
    expiresDateUTC: string
    effectiveDateUTC: string
    thumbprint: string
  }
  menuItemDescription: string
  menuItemKeyPhrases: string[]
}
