/**
 * Domain Manager Interface Routes
 *
 * Routes for the Domain Manager interface when running natively in tryyb.
 * Provides domain configuration, theme editing, menu building, and layout editing.
 */

import { Route, Routes } from 'react-router-dom'

import { DomainManagerStoreContextProvider } from '../data/stores/DomainManagerStoreContext'
import PageGuard from '../providers/PageGuard'
import { WelcomePage } from '../presentation/pages/home'
import MainFramework from '../presentation/layouts/MainFramework'
import { DomainWrapper } from '../presentation/layouts/DomainWrapper'
import { DomainTabContent } from '../presentation/layouts/DomainTabContent'
import { TeamWrapper } from '../presentation/layouts/TeamWrapper'
import { TeamTabContent } from '../presentation/layouts/TeamTabContent'
import { DetailsWrapper } from '../presentation/pages/detailsDomain/DetailsWrapper'
import { DetailsTeam } from '../presentation/pages/detailsTeam/DetailsTeam'
import CannotView from '../presentation/pages/error/CannotView'

import '../styles.scss'

/**
 * DomainManagerRoutes - Main route export for the Domain Manager interface
 *
 * Wrapped with DomainManagerStoreContextProvider for domain state management.
 */
export function DomainManagerRoutes() {
  return (
    <DomainManagerStoreContextProvider>
      <div className="bg-site-bg h-full w-full">
        <Routes>
          {/* Permission Error */}
          <Route path="/permission-error" element={<CannotView />} />

          <Route element={<PageGuard />}>
            {/* Home */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/welcome" element={<WelcomePage />} />

            <Route element={<MainFramework />}>
              {/* Domain Routes */}
              <Route path="domain" element={<DomainWrapper />}>
                <Route path=":domainID">
                  <Route path=":domainTab">
                    <Route index element={<DomainTabContent />} />
                    {/* VersionControl / main tab */}
                    <Route path=":configID" element={<DetailsWrapper />} />
                    {/* Individual config - routes to DetailsDomain or DetailsDomainMenu based on tab */}
                  </Route>
                  <Route index element={<DomainTabContent />} />
                </Route>
              </Route>

              {/* Team Routes */}
              <Route path="team" element={<TeamWrapper />}>
                <Route path=":teamID">
                  <Route path=":teamTab">
                    <Route index element={<TeamTabContent />} />
                    {/* Team tab main page */}
                    <Route path=":configID" element={<DetailsTeam />} />
                    {/* Individual config */}
                  </Route>
                  <Route index element={<TeamTabContent />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </DomainManagerStoreContextProvider>
  )
}
