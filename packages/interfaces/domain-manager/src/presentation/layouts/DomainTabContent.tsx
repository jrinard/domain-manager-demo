import * as React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { SkeletonContainer, TextHeading } from '@spacedock/falcon-ui'
import { HOME_TAB_ROUTE } from '../../data/constants'
import { TryybVersionControlWrapper } from '../pages/version-control/TryybVersionControlWrapper'
import { MenuVersionControlWrapper } from '../pages/version-control/MenuVersionControlWrapper'
import { MasteryVersionControlWrapper } from '../pages/version-control/MasteryVersionControlWrapper'
import ThemeEditor from '../pages/theme-editor'
import { ImagesPage } from '../pages/images-page/ImagesPage'
import { R3PermissionsPage } from '../pages/r3-permissions'

const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'

export const DomainTabContent = () => {
  const { domainID, domainTab } = useParams<{
    domainID: string
    domainTab: string
  }>()
  const location = useLocation()
  const id = Number(domainID)
  const tab = domainTab || HOME_TAB_ROUTE

  if (IS_PORTFOLIO_DEMO && domainTab === 'tryyb') {
    return (
      <Navigate
        to={location.pathname.replace('/tryyb', '/home')}
        replace
      />
    )
  }

  switch (tab) {
    case HOME_TAB_ROUTE:
    case 'tryyb':
      return <TryybVersionControlWrapper domainID={id} />
    case 'menu':
      return <MenuVersionControlWrapper domainID={id} />
    case 'mastery':
      return <MasteryVersionControlWrapper domainID={id} />
    case 'images':
      return <ImagesPage domainID={id} />
    case 'custom-names':
      return (
        <div className="mt-8 text-center">
          Custom Names Page for Domain {id} (Under Construction)
        </div>
      )
    case 'r3':
      return <R3PermissionsPage domainID={id} />
    case 'services':
      return (
        <div className="mt-8 text-center">
          Services Page for Domain {id} (Under Construction)
        </div>
      )
    case 'theme':
      return <ThemeEditor domainID={id} />
    default:
      return (
        <div className="flex h-[210px]">
          <SkeletonContainer
            width="100%"
            className="bg-grayscale-800 flex items-center justify-center rounded-xl text-center"
          >
            <TextHeading>Please choose a Tab to continue.</TextHeading>
          </SkeletonContainer>
        </div>
      )
  }
}
