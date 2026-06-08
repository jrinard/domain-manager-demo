import { useState, useEffect, useMemo } from 'react'
import {
  TextHeading,
  TextBody,
  ComboBox,
  ColorPicker,
  useToast,
} from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import {
  greyscaleFamilies,
  useEditableStylesheet,
  useParsedDomainStylesheet,
  serializeStylesheet,
  createThemePreset,
  convertColorFormat,
  useStylesFromStylesheet,
  resolveRaw,
  formatOklchCss,
  type TokenName,
  type OklchColor,
} from '@domain/styles'
import { useUploadFileMutation } from '@tyto/query'

import type { TytoData, DomainUI } from '@spacedock/manifest'

import { useUpdateDomainUIMutation } from '../../../data/hooks/useUpdateDomainPropertiesMutation'

interface StyleThemeProps {
  domainID: number
  domainImages: Record<TytoData.DomainUIImageType, DomainUI.Image>
  goToStep?: (step: WizardStep) => void
}

type FamilyId = (typeof greyscaleFamilies)[number]['id']

type WizardStep =
  | 'domain-images'
  | 'scheme-and-menu-preferences'
  | 'style-theme'
  | 'initial-home-config'
  | 'initial-top-menu-config'
  | 'overview'

export const StyleTheme = (props: StyleThemeProps) => {
  const toast = useToast()
  const [selectedFamilyId, setSelectedFamilyId] = useState<FamilyId>(
    greyscaleFamilies[0].id,
  )
  const [primaryColor, setPrimaryColor] = useState('#c90a2d') // CV Red default
  const [isSaving, setIsSaving] = useState(false)

  const { parsed, isMissingDomainStylesheet, isError } =
    useParsedDomainStylesheet(props.domainID)

  const editableStylesheet = useEditableStylesheet(parsed)
  const styles = useStylesFromStylesheet('dark', editableStylesheet.sheet)

  const domainUIMutator = useUpdateDomainUIMutation({
    domainID: props.domainID,
  })

  const uploadFileMutator = useUploadFileMutation({
    onSuccess: () => {
      // Success handled in handleSave
    },
    onUploadProgress() {
      // Not used for now
    },
  })

  // Initialize from existing stylesheet
  useEffect(() => {
    if (!isMissingDomainStylesheet && !isError && parsed) {
      editableStylesheet.overrideSheet(parsed)

      // Try to extract the primary color from the stylesheet
      const primaryToken = parsed.dark?.['--primary']

      let primaryTokenValue =
        typeof primaryToken === 'string' ? primaryToken : ''

      if (
        typeof primaryToken === 'object' &&
        'value' in primaryToken &&
        typeof primaryToken.value === 'object'
      ) {
        if (primaryToken.value.mode === 'oklch') {
          primaryTokenValue = `oklch(${primaryToken.value.l} ${primaryToken.value.c} ${primaryToken.value.h} )`
        }
      }

      if (primaryTokenValue && typeof primaryTokenValue === 'string') {
        const hex = convertColorFormat(primaryTokenValue, 'oklch', 'hex')
        if (hex) {
          setPrimaryColor(hex)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMissingDomainStylesheet, parsed, isError])

  const familyOptions = useMemo(
    () =>
      greyscaleFamilies.map((family) => ({
        value: family.id,
        item: family.label,
      })),
    [],
  )

  const selected = useMemo(
    () =>
      greyscaleFamilies.find((f) => f.id === selectedFamilyId) ||
      greyscaleFamilies[0],
    [selectedFamilyId],
  )

  const previewVars = useMemo(() => {
    const preset = createThemePreset({
      greyscale: selectedFamilyId,
      primaryHex: primaryColor,
    })
    const resolved = resolveRaw(
      preset['dark'],
      {} as Record<TokenName, OklchColor>,
    ).values
    const styleVars: Record<string, string> = {}
    for (const [token, value] of Object.entries(resolved) as [
      string,
      OklchColor,
    ][]) {
      styleVars[token] = formatOklchCss(value)
    }
    return styleVars
  }, [selectedFamilyId, primaryColor])

  const contentStyle: React.CSSProperties = {
    padding: 16,
  }

  const handleFamilyChange = (familyId: string) => {
    setSelectedFamilyId(familyId as FamilyId)

    // Create a preset with the selected family and apply it
    const preset = createThemePreset({
      greyscale: familyId as FamilyId,
      primaryHex: primaryColor,
    })

    editableStylesheet.mergeSheet(preset)
  }

  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color)

    // Create a preset with the current family and new color
    const preset = createThemePreset({
      greyscale: selectedFamilyId,
      primaryHex: color,
    })

    editableStylesheet.mergeSheet(preset)
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const stylesheetString = serializeStylesheet(
        editableStylesheet.sheet['light'],
        editableStylesheet.sheet['dark'],
        {
          locks: editableStylesheet.sheet.locks,
          version: '1',
        },
      )

      const uploadResult = await uploadFileMutator.mutateAsync({
        file: new File([stylesheetString], 'domainStylesheet.v4.css', {
          type: 'text/css',
        }),
      })

      await domainUIMutator.updateDomainUI({
        domainImages: {
          domainStylesheet: uploadResult.uploadFiles[0].fileUploadKey,
        },
      })

      toast.toastSuccess({
        description: 'Theme saved successfully',
      })
    } catch (err) {
      console.error(err)
      toast.toastError({
        description: 'Failed to save theme',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <TextHeading>Style Theme</TextHeading>
        <TextBody className="text-grayscale-500 mt-2">
          Customize your domain's visual theme by selecting a grayscale family
          and primary color.
        </TextBody>
      </div>

      {/* Top row: Grayscale family and Primary color side-by-side */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <TextBody className="text-site-fg mb-2 font-semibold">
            Grayscale Family
          </TextBody>
          <TextBody className="text-grayscale-500 mb-3 text-sm">
            Choose the grayscale color palette for your domain's interface.
          </TextBody>
          <ComboBox
            items={familyOptions}
            value={selectedFamilyId}
            onChange={handleFamilyChange}
            selectPlaceholder="Select a grayscale family"
            includeSearch={false}
            id="grayscale-family-combobox"
            aria-label="Grayscale Family"
          />
        </div>

        <div>
          <TextBody className="text-site-fg mb-2 font-semibold">
            Primary Color
          </TextBody>
          <TextBody className="text-grayscale-500 mb-3 text-sm">
            Select the primary brand color for buttons, links, and accents.
          </TextBody>
          <div className="flex items-center gap-4">
            <ColorPicker
              value={primaryColor}
              onChange={(color) => handlePrimaryColorChange(String(color))}
              label="Primary Color"
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div
        className="rounded-md p-4"
        style={{
          ...(previewVars as any),
          background: 'var(--bg)',
          color: 'var(--fg)',
          borderRadius: 8,
          border: '1px solid var(--border)',
        }}
      >
        <TextBody className="text-site-fg mb-3 font-semibold">Preview</TextBody>
        <div
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 6,
            display: 'flex',
            justifyContent: 'left',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              padding: 20,
              borderRadius: 6,
              background: 'var(--topbar)',
              color: 'var(--topbar-fg)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              justifyContent: 'flex-start',
              border: '1px solid rgba(0,0,0,0.04)',
            }}
          >
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost-primary">Ghost</Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <Button
            variant="ghost-primary"
            onClick={() => {
              if (props.goToStep) props.goToStep('scheme-and-menu-preferences')
            }}
          >
            <span className="flex items-center gap-2">
              <Icon icon="chevron-left" />
              <span>Back</span>
            </span>
          </Button>
        </div>

        <div>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Theme'}
          </Button>
        </div>
      </div>
    </div>
  )
}
