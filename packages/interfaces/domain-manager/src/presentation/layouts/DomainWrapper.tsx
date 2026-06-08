import * as React from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useApplyDomainStylesheet } from '@domain/configs'
import DomainHeader from './DomainHeader'
import { useSession } from '@spacedock/cargo-bay'
import {
  PORTFOLIO_DEMO_DOMAIN_ID,
  PORTFOLIO_DEMO_DOMAIN_IDS,
} from '../../data/constants'

const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'

export const DomainWrapper = () => {
  const { domainID } = useParams<{ domainID: string }>()
  const location = useLocation()
  const domainIDNumber = domainID ? Number(domainID) : undefined
  const session = useSession({ throwOnMissingSession: false })
  const onCourseURL = session?.onCourseURL

  useApplyDomainStylesheet({
    domainID: domainIDNumber,
    originOverride: onCourseURL,
  })

  if (!domainID) return null

  if (
    IS_PORTFOLIO_DEMO &&
    domainIDNumber &&
    !PORTFOLIO_DEMO_DOMAIN_IDS.has(domainIDNumber)
  ) {
    const redirectedPath = location.pathname.replace(
      `/domain/${domainID}`,
      `/domain/${PORTFOLIO_DEMO_DOMAIN_ID}`,
    )
    return (
      <Navigate to={`${redirectedPath}${location.search}`} replace />
    )
  }

  return (
    <div className="mx-6 flex h-full flex-col">
      <div className="bg-site-bg sticky top-[var(--site-top-height)] z-10 pt-6">
        <DomainHeader teamID={Number(domainID)} />
      </div>
      <div className="grow overflow-visible">
        <Outlet /> {/* Domain tab content */}
      </div>
    </div>
  )
}
