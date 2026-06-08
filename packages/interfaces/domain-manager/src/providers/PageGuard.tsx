import { Outlet, Navigate } from 'react-router-dom'
import { useTeamsFiltered } from '../data/hooks'
import { TextHeading, SkeletonContainer } from '@spacedock/falcon-ui'
import { useSession } from '@spacedock/cargo-bay'
import { useApplyDomainStylesheet } from '@domain/configs'
import { DOMAIN_MANAGER_PATHS } from '../data/constants/'

const PageGuard = () => {
  const session = useSession({ throwOnMissingSession: false })
  const domainID = session?.domainID
  const onCourseURL = session?.onCourseURL

  const teamsQuery = useTeamsFiltered({
    teamType: 'ocDOMAIN',
    operation: 'ocVIEW',
  })

  useApplyDomainStylesheet({
    domainID: import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true' ? undefined : domainID,
    originOverride: onCourseURL,
  })

  if (!domainID) {
    return (
      <div className="flex h-screen flex-col justify-center">
        <div className="m-10 mx-auto h-[200px] w-[42%] rounded-xl bg-neutral-800 text-center opacity-30">
          <SkeletonContainer
            height="100%"
            className="flex items-center justify-center rounded-xl text-center"
          >
            <TextHeading>Loading session</TextHeading>
          </SkeletonContainer>
        </div>
      </div>
    )
  }

  if (teamsQuery.isFetching) {
    return (
      <div className="flex h-screen flex-col justify-center">
        <div className="m-10 mx-auto h-[200px] w-[42%] rounded-xl bg-neutral-800 text-center opacity-30">
          <SkeletonContainer
            height="100%"
            className="flex items-center justify-center rounded-xl text-center"
          >
            <TextHeading>Loading</TextHeading>
          </SkeletonContainer>
        </div>
      </div>
    )
  }

  // * If *not* loading and `teams` is undefined or empty, redirect to permission error
  // * NOTE: There should never be a case where you can see the Team Tree but it is empty.
  if (!teamsQuery.teams?.length) {
    // * @FIXME: Refactored the render order, but this logic should be in a Guard...
    return (
      <Navigate to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/permission-error`} />
    )
  }

  return <Outlet />
}

export { PageGuard }
export default PageGuard
