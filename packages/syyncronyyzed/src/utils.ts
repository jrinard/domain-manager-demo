import { BROWSER_STORAGE_KEY_RING, SES_STOR } from '@spacedock/cargo-bay'

export function generateRandomString(): string {
  return Math.random().toString(36).slice(2)
}

export function pullParentHostname() {
  if (window.parent.location !== window.location && document.referrer) {
    const referrerLocation = new URL(document.referrer)

    // ! SPOOKY. What if it was iframed in a malicious website?
    // TODO: Ensure Azure CDN has whitelist of sites this can be iframed in
    if (
      referrerLocation?.hostname &&
      referrerLocation.hostname !== window.location.hostname
    ) {
      // * If referrer is not the same as host, set that to SessionStorage for continued use
      // * even after page refreshes.
      // ! Side Effect; meh...
      try {
        SES_STOR.set(
          BROWSER_STORAGE_KEY_RING.API_HOSTNAME,
          referrerLocation.hostname
        )
      } catch (err) {
        //
      }

      return referrerLocation.hostname
    }

    const storedHostname = SES_STOR.get(BROWSER_STORAGE_KEY_RING.API_HOSTNAME)

    // * If rerrer is same as current host but there is an hostname in SessionStorage that is different, use such.
    if (storedHostname && storedHostname !== window.location.hostname) {
      return storedHostname
    }
  }

  return undefined
}

export function getParentWindowRef() {
  const _parent = window.parent

  if (_parent) {
    return _parent
  }

  return window.top
}
