import * as React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { SkeletonContainer, TextHeading } from '@spacedock/falcon-ui'
import { HOME_TAB_ROUTE } from '../../data/constants'
import { TryybVersionControlWrapper } from '../pages/version-control/TryybVersionControlWrapper'
import { MenuVersionControlWrapper } from '../pages/version-control/MenuVersionControlWrapper'

const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'

export const TeamTabContent = () => {
  const { teamID, teamTab } = useParams<{ teamID: string; teamTab: string }>()
  const location = useLocation()
  const id = Number(teamID)
  const tab = teamTab || HOME_TAB_ROUTE

  if (IS_PORTFOLIO_DEMO && teamTab === 'tryyb') {
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
      return (
        <div className="mt-8 text-center">
          Mastery Page for Team {id} (Under Construction)
        </div>
      )
    case 'images':
      return (
        <div className="mt-8 text-center">
          Images Page for Team {id} (Under Construction)
        </div>
      )
    case 'custom-names':
      return (
        <div className="mt-8 text-center">
          Custom Names Page for Team {id} (Under Construction)
        </div>
      )
    case 'r3':
      return (
        <div className="mt-8 text-center">
          R3 Page for Team {id} (Under Construction)
        </div>
      )
    case 'services':
      return (
        <div className="mt-8 text-center">
          Services Page for Team {id} (Under Construction)
        </div>
      )
    default:
      return (
        <div className="flex h-[210px]">
          <SkeletonContainer
            width="100%"
            className="bg-grayscale-800 flex items-center justify-center rounded-xl text-center"
          >
            <TextHeading>Welcome.</TextHeading>
            <TextHeading>Please choose a Tab to continue.</TextHeading>
          </SkeletonContainer>
        </div>
      )
  }
}
