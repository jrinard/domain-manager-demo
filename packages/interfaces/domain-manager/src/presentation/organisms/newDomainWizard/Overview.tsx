import { useMemo } from 'react'
import { TextHeading, TextBody, Badge } from '@spacedock/falcon-ui'
import { DecoyButton, Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import { Link } from '@spacedock/navigator'

import { DOMAIN_MANAGER_PATHS } from '../../../data/constants'

import {
  useHomeConfigs,
  useTopMenuConfigs,
} from '../../../data/hooks/useEditableUIConfig'

interface OverviewProps {
  closeWizard: () => void
  domainID: number
  goToStep?: (
    step:
      | 'domain-images'
      | 'scheme-and-menu-preferences'
      | 'style-theme'
      | 'initial-home-config'
      | 'initial-top-menu-config'
      | 'overview',
  ) => void
}

export const Overview = (props: OverviewProps) => {
  const homeConfigs = useHomeConfigs({ domainID: props.domainID })
  const topMenuConfigs = useTopMenuConfigs({ domainID: props.domainID })

  // Get the most recent enabled or draft config for home
  const recentHomeConfig = useMemo(() => {
    if (!homeConfigs.all_configs) return null

    const activeConfigs = homeConfigs.all_configs.filter(
      (config) =>
        config.activeStatus === 'ocENABLED' ||
        config.activeStatus === 'ocDRAFT',
    )

    // Sort by modified date descending and return the first one
    return activeConfigs.sort((a, b) => {
      const dateA = new Date(a.modifiedDate || 0).getTime()
      const dateB = new Date(b.modifiedDate || 0).getTime()
      return dateB - dateA
    })[0]
  }, [homeConfigs.all_configs])

  // Get the most recent enabled or draft config for top menu
  const recentTopMenuConfig = useMemo(() => {
    if (!topMenuConfigs.all_configs) return null

    const activeConfigs = topMenuConfigs.all_configs.filter(
      (config) =>
        config.activeStatus === 'ocENABLED' ||
        config.activeStatus === 'ocDRAFT',
    )

    // Sort by modified date descending and return the first one
    return activeConfigs.sort((a, b) => {
      const dateA = new Date(a.modifiedDate || 0).getTime()
      const dateB = new Date(b.modifiedDate || 0).getTime()
      return dateB - dateA
    })[0]
  }, [topMenuConfigs.all_configs])

  const isLoading = homeConfigs.isPending || topMenuConfigs.isPending

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <TextHeading className="text-site-fg">
          Setup Complete!{' '}
          <span role="img" aria-label="celebration">
            🎉
          </span>
        </TextHeading>
        <TextBody className="text-grayscale-500 mt-2">
          Your domain has the general setup complete. You can now preview and
          manage your layout configurations.
        </TextBody>
      </div>

      {isLoading ? (
        <TextBody>Loading configurations...</TextBody>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Home Configuration */}
          <div className="bg-bg-contrast-low border-bg-contrast-medium rounded-md border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon="home" size="lg" className="text-primary" />

                <TextBody className="text-site-fg font-semibold">
                  Home Page Configuration/Layout
                </TextBody>
              </div>
              {recentHomeConfig && (
                <Badge
                  variant={
                    recentHomeConfig.activeStatus === 'ocENABLED'
                      ? 'success'
                      : 'warning'
                  }
                >
                  {recentHomeConfig.activeStatus === 'ocENABLED'
                    ? 'Live'
                    : 'Draft'}
                </Badge>
              )}
            </div>

            {recentHomeConfig ? (
              <>
                <TextBody className="text-grayscale-500 mb-3 text-sm">
                  {recentHomeConfig.configName || 'Untitled Configuration'}
                </TextBody>
                <Link
                  to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.domainID}/tryyb/${recentHomeConfig.UIconfigGUID}`}
                  onClick={props.closeWizard}
                >
                  <DecoyButton
                    className="max-w-72"
                    variant="secondary"
                    size="small"
                  >
                    <div className="flex items-center gap-2">
                      <Icon icon="eye" />
                      <span>Customize More</span>
                    </div>
                  </DecoyButton>
                </Link>
              </>
            ) : (
              <TextBody className="text-grayscale-500 text-sm">
                No configuration created yet
              </TextBody>
            )}
          </div>

          {/* Top Menu Configuration */}
          <div className="border-bg-contrast-medium bg-bg-contrast-low rounded-md border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon="menu" size="lg" className="text-primary" />
                <TextBody className="text-site-fg font-semibold">
                  Top Menu Configuration/Layout
                </TextBody>
              </div>
              {recentTopMenuConfig && (
                <Badge
                  variant={
                    recentTopMenuConfig.activeStatus === 'ocENABLED'
                      ? 'success'
                      : 'warning'
                  }
                >
                  {recentTopMenuConfig.activeStatus === 'ocENABLED'
                    ? 'Live'
                    : 'Draft'}
                </Badge>
              )}
            </div>

            {recentTopMenuConfig ? (
              <>
                <TextBody className="text-grayscale-500 mb-3 text-sm">
                  {recentTopMenuConfig.configName || 'Untitled Configuration'}
                </TextBody>
                <Link
                  to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.domainID}/menu/${recentTopMenuConfig.UIconfigGUID}`}
                  onClick={props.closeWizard}
                >
                  <DecoyButton
                    className="max-w-72"
                    variant="secondary"
                    size="small"
                  >
                    <div className="flex items-center gap-2">
                      <Icon icon="eye" />
                      <span>Customize More</span>
                    </div>
                  </DecoyButton>
                </Link>
              </>
            ) : (
              <TextBody className="text-grayscale-500 text-sm">
                No configuration created yet
              </TextBody>
            )}
          </div>
        </div>
      )}

      <div className="border-grayscale-400 dark:border-grayscale-700 bg-primary/10 col-span-1 rounded-md border p-4 md:col-span-2">
        <div className="flex items-start gap-3">
          <Icon icon="information-circle" size="lg" className="text-primary" />
          <div>
            <TextBody className="text-site-fg mb-1 font-medium">
              Next Steps
            </TextBody>
            <TextBody className="text-grayscale-500 text-sm">
              You can continue customizing your domain by exploring the domain
              manager. Here are some quick links to help.
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.domainID}/theme`}
                  onClick={props.closeWizard}
                  className="text-primary text-md hover:underline"
                >
                  Theme Editor
                </Link>
                <span className="text-grayscale-400">|</span>
                <Link
                  to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.domainID}/images`}
                  onClick={props.closeWizard}
                  className="text-primary hover:underline"
                >
                  Images
                </Link>
                <span className="text-grayscale-400">|</span>
                <Link
                  to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.domainID}/tryyb`}
                  onClick={props.closeWizard}
                  className="text-primary hover:underline"
                >
                  Home/Tryyb Layout
                </Link>
                <span className="text-grayscale-400">|</span>
                <Link
                  to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.domainID}/menu`}
                  onClick={props.closeWizard}
                  className="text-primary hover:underline"
                >
                  Menu Layout
                </Link>
                <span className="text-grayscale-400">|</span>
                <Link
                  to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.domainID}/mastery`}
                  onClick={props.closeWizard}
                  className="text-primary hover:underline"
                >
                  Mastery Training
                </Link>
              </div>
            </TextBody>
          </div>
        </div>
      </div>
      <div className="border-border border-t pt-4">
        <div className="flex items-center">
          <Button
            variant="ghost-primary"
            onClick={() => {
              if (props.goToStep) props.goToStep('initial-top-menu-config')
            }}
          >
            <div className="flex items-center gap-2">
              <Icon icon="chevron-left" />
              <span>Back</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
