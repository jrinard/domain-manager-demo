import { DomainManagerRoutes } from '@interfaces/domain-manager'
import { Surface } from '@spacedock/falcon-ui'
import { DemoUserBootstrap } from './providers/DemoUserBootstrap'

export function App() {
  return (
    <>
      <DemoUserBootstrap />
      <div className="bg-primary/10 text-site-fg border-primary/30 fixed bottom-0 left-0 right-0 z-[9999] border-t px-4 py-2 text-center text-xs md:text-sm">
        Portfolio demo — mock data only. Changes persist until refresh.
      </div>
      <Surface className="bg-site-bg text-site-fg min-h-screen pb-12">
        <DomainManagerRoutes />
      </Surface>
    </>
  )
}
