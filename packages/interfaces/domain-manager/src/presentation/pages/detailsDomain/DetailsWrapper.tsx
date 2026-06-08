import { useLocation, useParams } from 'react-router-dom'
import { DetailsDomain } from './DetailsDomain'
import { DetailsDomainMenu } from '../detailsDomainMenu/DetailsDomainMenu'
import { DetailsDomainMastery } from '../detailsDomainMastery/DetailsDomainMastery'

export const DetailsWrapper = () => {
  const { domainTab } = useParams<{ domainTab: string }>()
  const location = useLocation()

  // `menuType` is provided via navigation state from VersionControlTable links.
  // Expected values: "top" | "side" (sometimes "top,side" historically).
  const menuType = (location as any)?.state?.menuType as string | undefined

  switch (domainTab) {
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
