import type { ParsedStylesheet, useEditableStylesheet } from '@domain/styles'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import { RadioGroup } from '@spacedock/falcon-ui'

interface Props {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  stylesheet: ParsedStylesheet
  editableStylesheet: ReturnType<typeof useEditableStylesheet>
  isRemoteStylesheet: boolean
  onSave: () => void
  onUndo?: () => void
  onMergeDefault?: () => void
  isSaving?: boolean
}

export const ThemeControlBar = ({
  theme,
  setTheme,
  stylesheet,
  editableStylesheet,
  isRemoteStylesheet,
  onSave,
  onUndo,
  onMergeDefault,
  isSaving = false,
}: Props) => {
  return (
    <div className="border-grayscale-600 bg-site-bg flex h-12 w-full flex-row justify-between border-b">
      <div className="flex items-center gap-4 px-6">
        <RadioGroup
          options={[
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Dark',
              value: 'dark',
            },
          ]}
          onChange={(newTheme) => setTheme(newTheme as 'light' | 'dark')}
          defaultValue={theme}
        />
      </div>

      <div className="flex items-center justify-end gap-4 px-6">
        <button
          className="text-grayscale-500 hover:text-primary text-sm hover:underline"
          onClick={() => {
            editableStylesheet.applyFallbackStylesheet()
            onMergeDefault?.()
          }}
        >
          Merge Default
        </button>

        <button
          className="text-grayscale-500 hover:text-primary flex items-center gap-2 text-sm hover:underline"
          onClick={() => {
            editableStylesheet.overrideSheet(stylesheet)
            onUndo?.()
          }}
        >
          <Icon icon="arrow-u-left-top" size="sm" />
          {isRemoteStylesheet ? 'Undo Changes' : 'Reset Stylesheet'}
        </button>

        <Button
          className="min-w-24"
          variant="primary"
          size="small"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  )
}
