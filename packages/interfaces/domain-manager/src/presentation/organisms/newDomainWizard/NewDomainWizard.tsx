import { Dialog } from '@spacedock/falcon-ui'
import { useSimpleReducer } from '@spacedock/noonian'
import type { TytoData, DomainUI } from '@spacedock/manifest'

import { useKeyedDomainImages } from '../../../data/hooks/useKeyedDomainImages'
import { useDomainProperties } from '../../../data/hooks/useDomainProperties'

import { SchemeAndMenuPreferences } from './SchemeAndMenuPreferences'
import { StyleTheme } from './StyleTheme'
import { InitialHomeConfig } from './InitialHomeConfig'
import { InitialTopMenuConfig } from './InitialTopMenuConfig'
import { DomainImages } from './DomainImages'
import { Overview } from './Overview'

interface NewDomainWizardProps {
  domainID: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface NewDomainWizardState {
  step:
    | 'domain-images'
    | 'scheme-and-menu-preferences'
    | 'style-theme'
    | 'initial-home-config'
    | 'initial-top-menu-config'
    | 'overview'
}

export const NewDomainWizard = (props: NewDomainWizardProps) => {
  const domainPropertiesResults = useDomainProperties({
    domainID: props.domainID,
  })
  const domainImagesResults = useKeyedDomainImages({ domainID: props.domainID })

  const domainUI = domainPropertiesResults.domainUI
  const bothHooksResolved =
    domainImagesResults.keyedImages &&
    domainPropertiesResults.remoteDomainProperties

  const isInitialLoad =
    domainImagesResults.isPending ||
    domainPropertiesResults.isPending ||
    !bothHooksResolved

  if (isInitialLoad) {
    return null
  } else if (!domainUI) {
    // TODO: FIXME
    return null
  }

  return (
    <NewDomainWizardData
      {...props}
      refetch={domainPropertiesResults.refetch}
      domainUI={domainUI}
      domainProperties={domainPropertiesResults.remoteDomainProperties}
      domainImages={domainImagesResults.keyedImages}
    />
  )
}

interface NewDomainWizardDataProps extends NewDomainWizardProps {
  refetch: () => void
  domainUI: DomainUI.DomainUI
  domainProperties: Partial<TytoData.DomainProperties>
  domainImages: Record<TytoData.DomainUIImageType, DomainUI.Image>
}

const WIZARD_STEPS: Array<{
  id: NewDomainWizardState['step']
  label: string
}> = [
  { id: 'domain-images', label: 'Images' },
  { id: 'scheme-and-menu-preferences', label: 'Settings' },
  { id: 'style-theme', label: 'Theme' },
  { id: 'initial-home-config', label: 'Home Config' },
  { id: 'initial-top-menu-config', label: 'Menu Config' },
  { id: 'overview', label: 'Overview' },
]

const NewDomainWizardData = (props: NewDomainWizardDataProps) => {
  const { state, update } = useSimpleReducer<NewDomainWizardState>({
    step: determineInitialStep(props),
  })

  const currentStepIndex = WIZARD_STEPS.findIndex((s) => s.id === state.step)

  return (
    <Dialog
      className="max-w-5xl"
      title={<span className="text-site-fg">New Domain Wizard</span>}
      open={props.open}
      onOpenChange={props.onOpenChange}
      maxWidth="xxl"
      maxHeight="screen"
      completeLabel={state.step === 'overview' ? 'Complete' : 'Next'}
      hideCancel={state.step === 'overview'}
      action={{
        value: state.step === 'overview' ? 'Complete' : 'Next',
        onClick: () => {
          props.refetch()

          if (state.step === 'overview') {
            props.onOpenChange(false)
          } else {
            update({
              step: determineNextStep(state.step),
            })
          }
        },
      }}
    >
      {/* Progress Indicator */}
      <div className="border-grayscale-300 dark:border-grayscale-700 mb-2 gap-6 border-b pb-4">
        <div className="flex items-center justify-between">
          {WIZARD_STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex
            const isUpcoming = index > currentStepIndex

            return (
              <div
                key={step.id}
                className={`flex flex-1 items-center ${index < currentStepIndex ? 'cursor-pointer' : ''}`}
                onClick={() => {
                  if (index < currentStepIndex) {
                    update({ step: step.id })
                  }
                }}
                role={index < currentStepIndex ? 'button' : undefined}
                tabIndex={index < currentStepIndex ? 0 : -1}
                aria-disabled={index < currentStepIndex ? false : true}
              >
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all
                      ${
                        isCompleted
                          ? 'bg-primary text-primary-fg cursor-pointer hover:scale-110'
                          : isCurrent
                            ? 'border-primary bg-primary/20 text-primary border-2'
                            : 'border-grayscale-400 text-grayscale-500 border-2 bg-transparent'
                      }
                    `}
                  >
                    {isCompleted ? <span>✓</span> : <span>{index + 1}</span>}
                  </div>
                  {/* Step Label */}
                  <div
                    className={`
                      mt-2 text-xs font-medium
                      ${
                        isCurrent
                          ? 'text-primary'
                          : isCompleted
                            ? 'text-site-fg hover:text-primary cursor-pointer'
                            : 'text-grayscale-500'
                      }
                    `}
                  >
                    {step.label}
                  </div>
                </div>

                {/* Connector Line */}
                {index < WIZARD_STEPS.length - 1 && (
                  <div
                    className={`
                      mx-2 h-0.5 flex-1 transition-all
                      ${
                        index < currentStepIndex
                          ? 'bg-primary'
                          : 'bg-grayscale-300 dark:bg-grayscale-700'
                      }
                    `}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <NewDomainWizardRouter
        {...props}
        step={state.step}
        goToStep={(step) => update({ step })}
      />
    </Dialog>
  )
}

interface NewDomainWizardRouterProps extends NewDomainWizardDataProps {
  step: NewDomainWizardState['step']
  goToStep: (step: NewDomainWizardState['step']) => void
}

function NewDomainWizardRouter(props: NewDomainWizardRouterProps) {
  switch (props.step) {
    case 'scheme-and-menu-preferences':
      return (
        <SchemeAndMenuPreferences
          domainID={props.domainID}
          domainProperties={props.domainProperties}
          goToStep={props.goToStep}
        />
      )
    case 'style-theme':
      return (
        <StyleTheme
          domainID={props.domainID}
          domainImages={props.domainImages}
          goToStep={props.goToStep}
        />
      )
    case 'initial-home-config':
      return (
        <InitialHomeConfig
          domainID={props.domainID}
          goToStep={props.goToStep}
        />
      )
    case 'initial-top-menu-config':
      return (
        <InitialTopMenuConfig
          domainID={props.domainID}
          goToStep={props.goToStep as any}
        />
      )
    case 'overview':
      return (
        <Overview
          domainID={props.domainID}
          closeWizard={() => props.onOpenChange(false)}
          goToStep={props.goToStep}
        />
      )
    case 'domain-images':
    default:
      return (
        <DomainImages
          domainID={props.domainID}
          domainImages={props.domainImages}
          refetch={props.refetch as any}
        />
      )
  }
}

function determineInitialStep({
  domainUI,
  domainProperties,
  domainImages,
}: NewDomainWizardDataProps): NewDomainWizardState['step'] {
  if (!domainUI.images.length) {
    return 'domain-images'
  } else if (
    !domainProperties['menuType'] ||
    !domainProperties['colorSchemes']
  ) {
    return 'scheme-and-menu-preferences'
  } else if (!domainImages['domainStylesheet']) {
    return 'style-theme'
  } else {
    return 'initial-home-config'
  }
}

function determineNextStep(currentStep: NewDomainWizardState['step']) {
  switch (currentStep) {
    case 'domain-images':
      return 'scheme-and-menu-preferences'
    case 'scheme-and-menu-preferences':
      return 'style-theme'
    case 'style-theme':
      return 'initial-home-config'
    case 'initial-home-config':
      return 'initial-top-menu-config'
    case 'initial-top-menu-config':
      return 'overview'
    default:
      return 'domain-images'
  }
}
