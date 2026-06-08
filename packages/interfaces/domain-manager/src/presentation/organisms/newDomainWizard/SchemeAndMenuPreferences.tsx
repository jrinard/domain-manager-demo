import { useState, useEffect } from 'react'
import { TextHeading, TextBody, useToast } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { Button } from '@falcon/buttons'

import type { TytoData } from '@spacedock/manifest'

import { useUpdateDomainUIMutation } from '../../../data/hooks/useUpdateDomainPropertiesMutation'

interface SchemeAndMenuPreferencesProps {
  domainID: number
  domainProperties: Partial<TytoData.DomainProperties>
  goToStep?: (step: WizardStep) => void
}

type WizardStep =
  | 'domain-images'
  | 'scheme-and-menu-preferences'
  | 'style-theme'
  | 'initial-home-config'
  | 'initial-top-menu-config'
  | 'overview'

interface SelectableCardProps {
  title: string
  description: string
  icon: string
  selected: boolean
  onClick: () => void
  variety?: 'light' | 'dark'
}

const SelectableCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
  variety,
}: SelectableCardProps) => {
  return (
    <div
      className={`
        hover:border-primary border-bg-contrast-medium
        w-full cursor-pointer rounded-md border p-4 transition-all
        ${variety === 'light' ? 'bg-bg-contrast-low' : 'bg--bg-contrast-medium'}
        ${selected ? 'border-primary ring-primary ring-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
          rounded-lg p-3
          ${
            selected
              ? 'bg-primary text-primary-fg'
              : variety === 'light'
                ? 'bg-grayscale-50 text-black'
                : 'bg-grayscale-300 text-grayscale-700 dark:bg-grayscale-700 dark:text-grayscale-300'
          }
        `}
        >
          <Icon icon={icon} size="lg" />
        </div>
        <div className="flex-1">
          <div
            className={`${variety === 'light' ? 'text-black' : 'text-site-fg'} mb-1 font-medium`}
          >
            {title}
          </div>
          <TextBody className="text-grayscale-500 text-xs">
            {description}
          </TextBody>
        </div>
        {selected && (
          <div className="text-primary">
            <Icon icon="checkmark-circle" size="lg" />
          </div>
        )}
      </div>
    </div>
  )
}

export const SchemeAndMenuPreferences = (
  props: SchemeAndMenuPreferencesProps,
) => {
  const toast = useToast()
  const [lightScheme, setLightScheme] = useState(false)
  const [darkScheme, setDarkScheme] = useState(false)
  const [menuType, setMenuType] = useState<'top' | 'side' | null>(null)

  const domainUIMutator = useUpdateDomainUIMutation({
    domainID: props.domainID,
  })

  // Initialize from existing properties
  useEffect(() => {
    const schemes = props.domainProperties.colorSchemes || ''
    setLightScheme(schemes.includes('light'))
    setDarkScheme(schemes.includes('dark'))
    setMenuType(props.domainProperties.menuType as 'top' | 'side')
  }, [props.domainProperties])

  const updateColorSchemes = async (light: boolean, dark: boolean) => {
    const schemes: string[] = []
    if (dark) schemes.push('dark')
    if (light) schemes.push('light')

    const colorSchemes = (schemes.join(',') ||
      'dark') as TytoData.DomainProperties['colorSchemes']

    try {
      await domainUIMutator.updateDomainUI({
        properties: {
          colorSchemes,
        },
      })

      toast.toastSuccess({
        description: 'Color schemes updated',
      })
    } catch (err) {
      console.error(err)
      toast.toastError({
        description: 'Failed to update color schemes',
      })
    }
  }

  const updateMenuType = async (type: 'top' | 'side') => {
    try {
      await domainUIMutator.updateDomainUI({
        properties: {
          menuType: type,
        },
      })

      toast.toastSuccess({
        description: 'Menu type updated',
      })
    } catch (err) {
      console.error(err)
      toast.toastError({
        description: 'Failed to update menu type',
      })
    }
  }

  const handleLightSchemeToggle = () => {
    const newLight = !lightScheme
    setLightScheme(newLight)
    updateColorSchemes(newLight, darkScheme)
  }

  const handleDarkSchemeToggle = () => {
    const newDark = !darkScheme
    setDarkScheme(newDark)
    updateColorSchemes(lightScheme, newDark)
  }

  const handleMenuTypeChange = (type: 'top' | 'side') => {
    setMenuType(type)
    updateMenuType(type)
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <TextHeading className="text-site-fg">
          Scheme & Menu Preferences
        </TextHeading>
        <TextBody className="text-grayscale-500 mt-2">
          Configure your domain's color schemes and menu layout preferences.
        </TextBody>
      </div>

      {/* Color Schemes Section */}
      <div>
        <TextBody className="text-site-fg mb-3 font-semibold">
          Color Schemes
        </TextBody>
        <TextBody className="text-grayscale-500 mb-3 text-sm">
          Select which color schemes your domain will support. You can enable
          both.
        </TextBody>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <SelectableCard
            title="Light Theme"
            description="A bright, clean interface for daytime use"
            icon="weather-sunny"
            selected={lightScheme}
            onClick={handleLightSchemeToggle}
            variety="light"
          />
          <SelectableCard
            title="Dark Theme"
            description="A darker interface that's easier on the eyes"
            icon="moon-waning-crescent"
            selected={darkScheme}
            onClick={handleDarkSchemeToggle}
            variety="dark"
          />
        </div>
      </div>

      {/* Menu Type Section */}
      <div>
        <TextBody className="text-site-fg mb-3 font-semibold">
          Menu Type
        </TextBody>
        <TextBody className="text-grayscale-500 mb-3 text-sm">
          Choose how the main navigation menu will be displayed.
        </TextBody>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <SelectableCard
            title="Top Menu"
            description="Navigation bar at the top of the page. Recommended"
            icon="page-layout-header"
            selected={menuType === 'top'}
            onClick={() => handleMenuTypeChange('top')}
          />
          <SelectableCard
            title="Side Menu"
            description="Navigation bar on the left side of the page"
            icon="page-layout-sidebar-left"
            selected={menuType === 'side'}
            onClick={() => handleMenuTypeChange('side')}
          />
        </div>
      </div>
      {/* Back Button */}
      <div className="border-border flex items-center justify-between border-b pb-4">
        <Button
          variant="ghost-primary"
          onClick={() => {
            if (props.goToStep) props.goToStep('domain-images')
          }}
        >
          <div className="flex items-center gap-2">
            <Icon icon="chevron-left" />
            <span>Back</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
