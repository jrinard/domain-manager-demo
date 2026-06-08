import type {
  ParsedStylesheet,
  RawTokenValue,
  TokenName,
  useEditableStylesheet,
} from '@domain/styles'
import {
  DERIVATIONS,
  formatOklchCss,
  formatCSSVariable,
  convertColorFormat,
  isRawRef,
  isDerivedToken,
  toOklchColor,
  greyscaleFamilies,
} from '@domain/styles'
import { Icon } from '@falcon/icons'
import {
  ColorCard,
  ColorPaletteChooser,
  ColorPicker,
  Tooltip,
  useToast,
} from '@spacedock/falcon-ui'
import { pickStyles } from './utils'

import {
  formatTokenNameForSections as formatTokenName,
  formatTokenNameTerse,
} from './name-utils'
import { THEME_EDITOR_COLOR_SECTIONS } from './constants'
import { GreyscaleDialog } from './dialogs/GreyscaleDialog'

interface Props {
  stylesheet: ParsedStylesheet
  theme: 'light' | 'dark'
  styles: Record<string, string>
  themeValues: Record<string, RawTokenValue>
  editableStylesheet: ReturnType<typeof useEditableStylesheet>
  showGreyscaleDialog: boolean
  setShowGreyscaleDialog: (show: boolean) => void
}

const scrollToSection = (sectionTitle: string) => {
  const sectionId = `section-${sectionTitle.toLowerCase().replace(/\s+/g, '-')}`
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const ThemeEditorSidebar = ({
  theme,
  styles,
  themeValues,
  editableStylesheet,
  showGreyscaleDialog,
  setShowGreyscaleDialog,
}: Props) => {
  const toast = useToast()

  return (
    <div
      className="flex w-full flex-col gap-4 rounded-xl p-4 shadow-lg"
      style={{
        ...styles,
        background: 'var(--sidebar)',
        color: 'var(--sidebar-fg)',
      }}
    >
      <section className="flex w-full justify-center">
        <GreyscaleDialog
          stylesheet={editableStylesheet.sheet}
          open={showGreyscaleDialog}
          theme={theme}
          onOpenChange={(newValue) => setShowGreyscaleDialog(newValue)}
          onConfirm={({ familyId, preset }) => {
            setShowGreyscaleDialog(false)
            editableStylesheet.mergeSheet(preset)
            const family = greyscaleFamilies.find((f) => f.id === familyId)
            const familyName = family?.label || 'Unknown'
            toast.toastSuccess({
              description: `Successfully set theme greyscale to ${familyName}.`,
            })
          }}
          primaryHex={
            convertColorFormat(styles['--primary'], 'oklch', 'hex') ?? '#c90a2d'
          }
          accentHex={
            convertColorFormat(styles['--secondary'], 'oklch', 'hex') ??
            '#262626'
          }
        />
      </section>

      <section className="mb-8 grid grid-cols-5 gap-2 rounded-lg bg-black p-3 dark:bg-black">
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Primary')}
        >
          <ColorCard
            className="bg-primary text-primary-fg"
            style={pickStyles(styles, '--primary', '--primary-fg')}
            text={formatTokenNameTerse('--primary')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Primary')}
        >
          <ColorCard
            className="bg-primary-subtle text-primary-subtle-fg"
            style={pickStyles(
              styles,
              '--primary-subtle',
              '--primary-subtle-fg',
            )}
            text={formatTokenNameTerse('--primary-subtle')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Site')}
        >
          <ColorCard
            className="text-site-fg bg-site-bg"
            style={pickStyles(styles, '--site-bg', '--site-fg')}
            text={formatTokenNameTerse('--site-bg')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Secondary')}
        >
          <ColorCard
            className="bg-secondary text-secondary-fg"
            style={pickStyles(styles, '--secondary', '--secondary-fg')}
            text={formatTokenNameTerse('--secondary')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Top Menu')}
        >
          <ColorCard
            className="bg-topbar text-topbar-fg"
            style={pickStyles(styles, '--topbar', '--topbar-fg')}
            text={formatTokenNameTerse('--topbar')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Navigation Bars')}
        >
          <ColorCard
            className="bg-navbar text-navbar-fg"
            style={pickStyles(styles, '--navbar', '--navbar-fg')}
            text={formatTokenNameTerse('--navbar')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Sidebar')}
        >
          <ColorCard
            className="bg-sidebar text-sidebar-fg"
            style={pickStyles(styles, '--sidebar', '--sidebar-fg')}
            text={formatTokenNameTerse('--sidebar')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('BG Contrast Colors')}
        >
          <ColorCard
            className="text-site-fg bg-bg-contrast-low"
            style={pickStyles(styles, '--bg-contrast-low', '--site-fg')}
            text={formatTokenNameTerse('--bg-contrast-low')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('BG Contrast Colors')}
        >
          <ColorCard
            className="text-site-fg bg-bg-contrast-medium"
            style={pickStyles(styles, '--bg-contrast-medium', '--site-fg')}
            text={formatTokenNameTerse('--bg-contrast-medium')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('BG Contrast Colors')}
        >
          <ColorCard
            className="text-site-fg bg-bg-contrast-high"
            style={pickStyles(styles, '--bg-contrast-high', '--site-fg')}
            text={formatTokenNameTerse('--bg-contrast-high')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Success')}
        >
          <ColorCard
            className="bg-success text-success-fg"
            style={pickStyles(styles, '--success', '--success-fg')}
            text={formatTokenNameTerse('--success')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Warning')}
        >
          <ColorCard
            className="bg-warning text-warning-fg"
            style={pickStyles(styles, '--warning', '--warning-fg')}
            text={formatTokenNameTerse('--warning')}
          />
        </div>
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={() => scrollToSection('Danger')}
        >
          <ColorCard
            className="bg-danger text-danger-fg"
            style={pickStyles(styles, '--danger', '--danger-fg')}
            text={formatTokenNameTerse('--danger')}
          />
        </div>
      </section>

      <section className="flex flex-col gap-8" style={styles}>
        {THEME_EDITOR_COLOR_SECTIONS.map((section) => (
          <div
            key={section.title}
            id={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ scrollMarginTop: '230px' }}
          >
            <h2 className="text-lg font-medium">{section.title}</h2>
            <p className="text-grayscale-500 mb-2 text-sm">
              {section.description}
            </p>
            <div className="flex flex-row flex-wrap gap-y-2">
              {section.tokens.map((tokenData) => {
                const token: TokenName = tokenData.name

                return (
                  <div
                    className="flex w-[135px] flex-col items-start gap-1"
                    key={token}
                  >
                    <h3 className="text-sm capitalize">
                      {formatTokenName(token)}
                    </h3>
                    <div className="flex flex-row items-center gap-2">
                      {tokenData.pickerType === 'color' ? (
                        <ColorPicker
                          className="rounded-sm outline outline-offset-2 outline-white/20"
                          value={
                            convertColorFormat(styles[token], 'oklch', 'hex') ??
                            '#000000'
                          }
                          onChange={(value) => {
                            let hex: string
                            if (typeof value === 'string') {
                              hex = value
                            } else if (
                              typeof (
                                value as {
                                  toString: (fmt?: string) => string
                                }
                              ).toString === 'function'
                            ) {
                              hex = (
                                value as {
                                  toString: (fmt?: string) => string
                                }
                              ).toString('hex')
                            } else {
                              hex = String(value)
                            }

                            const currentHex = convertColorFormat(
                              styles[token],
                              'oklch',
                              'hex',
                            )

                            if (
                              currentHex &&
                              hex.toLowerCase() === currentHex.toLowerCase()
                            ) {
                              return
                            }

                            const oklchValue = toOklchColor(hex)
                            editableStylesheet.setColor(
                              theme,
                              token,
                              oklchValue,
                            )
                          }}
                        />
                      ) : (
                        <ColorPaletteChooser
                          className="outline outline-offset-2 outline-white/20"
                          contentStyle={styles}
                          paletteOnly={false}
                          value={
                            isRawRef(themeValues[token])
                              ? formatCSSVariable(themeValues[token]?.target)
                              : convertColorFormat(
                                  formatOklchCss(
                                    (themeValues[token]?.type === 'color' &&
                                      themeValues[token]?.value) || {
                                      mode: 'oklch',
                                      l: 0,
                                      c: 0,
                                      h: 0,
                                    },
                                  ),
                                  'oklch',
                                  'rgb',
                                )
                          }
                          onChange={(value) => {
                            if (/^--/.test(value)) {
                              editableStylesheet.setRef(theme, token, value)
                            } else {
                              editableStylesheet.setColor(theme, token, value)
                            }
                          }}
                          customVariables={[
                            '--primary',
                            '--secondary',
                            '--site-bg',
                            '--site-fg',
                          ]}
                        />
                      )}

                      {isDerivedToken(token) ? (
                        <Tooltip
                          content={
                            <div>
                              <p>
                                {editableStylesheet.sheet.locks.has(token) ? (
                                  "This token has been locked and will not automaticallychange when it's associated Colors change."
                                ) : (
                                  <>
                                    This token will is computed when any of the
                                    following changes:
                                    <br />
                                    {DERIVATIONS[token]?.deps?.length ? (
                                      <ul>
                                        {DERIVATIONS[token].deps?.map(
                                          (source) => (
                                            <li key={source}>
                                              {formatTokenName(source)}
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    ) : null}
                                  </>
                                )}
                              </p>
                            </div>
                          }
                        >
                          <button
                            onClick={() =>
                              editableStylesheet.toggleValueLock(theme, token)
                            }
                          >
                            <Icon
                              color="secondary"
                              icon={
                                editableStylesheet.sheet.locks.has(token)
                                  ? 'link-variant-off'
                                  : 'link-variant'
                                // ? 'lock'
                                // : 'lock-open-outline'
                              }
                              size="sm"
                            />
                          </button>
                        </Tooltip>
                      ) : null}

                      {isRawRef(themeValues[token]) ? (
                        <span className="text-grayscale-600 text-xs">
                          {/* <Icon color="secondary" icon="mirror" size="sm" /> */}
                          Mirroring:{' '}
                          {formatTokenName(themeValues[token].target)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ThemeEditorSidebar
