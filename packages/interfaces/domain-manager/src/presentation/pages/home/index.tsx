import { useCurrentUser } from '@spacedock/chaincode'
import {
  Avatar,
  Surface,
  TextBody,
  TextHeading,
  ButtonVariants,
  Label,
} from '@spacedock/falcon-ui'
import { EnvironmentVariables } from '@spacedock/tricorder'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { homeTabPath } from '../../../data/constants'

export const WelcomePage = () => {
  const currentUser = useCurrentUser()
  const navigate = useNavigate()

  //Determines if the user's primary location is a domain or a team to route as a landing page.
  React.useEffect(() => {
    if (currentUser?.teamRootID && currentUser?.domainID) {
      const target =
        currentUser.teamRootID === currentUser.domainID
          ? homeTabPath('domain', currentUser.teamRootID)
          : homeTabPath('team', currentUser.teamRootID)
      navigate(target, { replace: true })
    }
  }, [currentUser?.teamRootID, currentUser?.domainID, navigate])

  return (
    <Surface className="flex h-screen w-screen flex-col items-center p-16 text-center">
      <div className="flex flex-col gap-2 py-8">
        <TextHeading>Welcome</TextHeading>
        <div className="flex gap-2">
          <Avatar
            src={`${EnvironmentVariables.ASSETS_BASE_URL}${
              currentUser?.profileThumbPath ?? ''
            }`}
            name={currentUser?.userName || 'User Name'}
            size="sm"
          />
          <TextBody>{currentUser?.userName}</TextBody>
        </div>
        <Link
          to={homeTabPath('domain', 551)}
          className={ButtonVariants({ variant: 'primary' })}
        >
          <Label textType="navigation" className="cursor-pointer">
            Go to Team/Domain
          </Label>
        </Link>
      </div>
    </Surface>
  )
}

export default WelcomePage
