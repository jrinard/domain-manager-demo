import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '../packages/falcon/tailwind/src/tailwind-imports.css'
import '../packages/domain/styles/src/constants/default.css'
import '../packages/interfaces/domain-manager/src/styles.scss'
import './styles/demo-shell.css'

import { startMockServer } from './mocks/browser'
import { DemoProviders } from './providers/DemoProviders'
import { App } from './App'

function showBootstrapError(error: unknown) {
  const root = document.getElementById('root')
  const message = error instanceof Error ? error.message : String(error)
  if (root) {
    root.innerHTML = `<pre style="color:#f87171;padding:1.5rem;font-family:monospace;white-space:pre-wrap">Demo failed to start:\n${message}\n\nCheck the browser console for details.</pre>`
  }
}

async function bootstrap() {
  try {
    await startMockServer()
  } catch (error) {
    console.error('MSW failed to start — API mocks may not work:', error)
  }

  const root = document.getElementById('root')
  if (!root) throw new Error('#root not found')

  createRoot(root).render(
    <BrowserRouter basename="/domain-manager">
      <DemoProviders>
        <App />
      </DemoProviders>
    </BrowserRouter>,
  )
}

bootstrap().catch(showBootstrapError)
