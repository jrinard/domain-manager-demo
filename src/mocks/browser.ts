import { setupWorker } from 'msw'
import { handlers } from './handlers'

export async function startMockServer() {
  const worker = setupWorker(...handlers)
  await worker.start({
    onUnhandledRequest: () => undefined,
    serviceWorker: { url: '/mockServiceWorker.js' },
  })
  return worker
}
