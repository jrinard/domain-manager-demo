import { useParams, useLocation, Link } from 'react-router-dom'
import { Icon } from '@falcon/icons'

export const DetailsTeam = () => {
  const { teamID, configID } = useParams<{
    teamID: string
    configID: string
  }>()
  const location = useLocation()
  const configName = (location && location.state?.name) || configID

  return (
    <div className="flex min-h-screen w-full flex-col gap-10 bg-black px-12 py-6">
      {/* Breadcrumb */}
      <nav className="mt-4 flex items-center gap-2 text-sm">
        <Icon color="current" icon="chevron-double-left" size="2xl" />
        <Link
          to={`/team/${teamID}/tryyb`}
          className="opacity-70 hover:underline"
        >
          Back to Team Version Control
        </Link>
        |<span className="text-primary"> {configName}</span>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4">
        <h1 className="text-xl font-bold">{configName}</h1>
        <p>
          Placeholder for where we would put team details like theme, start
          version, etc.
        </p>
      </div>
    </div>
  )
}
