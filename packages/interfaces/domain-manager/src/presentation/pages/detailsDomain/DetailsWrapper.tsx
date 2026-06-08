import { useLocation, useParams, Navigate } from 'react-router-dom'
import { HOME_TAB_ROUTE } from '../../../data/constants'
import { DetailsDomain } from './DetailsDomain'
import { DetailsDomainMenu } from '../detailsDomainMenu/DetailsDomainMenu'
import { DetailsDomainMastery } from '../detailsDomainMastery/DetailsDomainMastery'

const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'

export const DetailsWrapper = () => {
  const { domainTab } = useParams<{ domainTab: string }>()
  const location = useLocation()

  if (IS_PORTFOLIO_DEMO && domainTab === 'tryyb') {
    return (
      <Navigate
        to={location.pathname.replace('/tryyb', '/home')}
        replace
      />
    )
  }

  // `menuType` is provided via navigation state from VersionControlTable links.
  // Expected values: "top" | "side" (sometimes "top,side" historically).
  const menuType = (location as any)?.state?.menuType as string | undefined

  switch (domainTab) {
    case HOME_TAB_ROUTE:
    case 'tryyb':
      return <DetailsDomain />
    case 'menu':
      return <DetailsDomainMenu menuType={menuType} />
    case 'mastery':
      return <DetailsDomainMastery />
    default:
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-grayscale-400 text-center">
            <p>Unknown configuration type: {domainTab}</p>
          </div>
        </div>
      )
  }
}
