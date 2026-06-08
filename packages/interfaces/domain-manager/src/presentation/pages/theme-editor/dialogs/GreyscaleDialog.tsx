import { useMemo, useState } from 'react'
import {
  type ParsedStylesheet,
  type TokenName,
  type OklchColor,
  createThemePreset,
  greyscaleFamilies,
  resolveRaw,
  formatOklchCss,
} from '@domain/styles'
import { Button } from '@falcon/buttons'
import { Dialog, DialogTrigger } from '@spacedock/falcon-ui'

type FamilyId = (typeof greyscaleFamilies)[number]['id']

export interface GreyscaleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (args: { familyId: FamilyId; preset: ParsedStylesheet }) => void
  primaryHex: string
  accentHex?: string
  currentFamilyId?: FamilyId
  stylesheet: ParsedStylesheet
  theme: 'light' | 'dark'
}

export function GreyscaleDialog({
  open,
  onOpenChange,
  onConfirm,
  primaryHex = '#c90a2d', // * CV Red (default/fallback)
  accentHex,
  currentFamilyId,
  stylesheet,
  theme,
}: GreyscaleDialogProps) {
  const [selectedId, setSelectedId] = useState<FamilyId>(
    currentFamilyId ?? greyscaleFamilies[0].id,
  )

  const selected = useMemo(
    () =>
      greyscaleFamilies.find((f) => f.id === selectedId) ||
      greyscaleFamilies[0],
    [selectedId],
  )

  const preset = useMemo<ParsedStylesheet>(
    () => createThemePreset({ greyscale: selectedId, primaryHex, accentHex }),
    [selectedId, primaryHex, accentHex],
  )

  // Build inline CSS variables for a local preview container (light mode)
  const previewVars = useMemo(() => {
    const resolved = resolveRaw(
      preset[theme],
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
  }, [preset, theme])

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      className="w-full max-w-2xl"
      title="Choose greyscale family"
      completeLabel={`Use ${selected.label}`}
      action={{
        children: `Use ${selected.label}`,
        onClick: () => onConfirm({ familyId: selectedId, preset }),
      }}
    >
      <DialogTrigger>
        <button className="text-grayscale-500 text-sm hover:text-[var(--primary)] hover:underline">
          Choose greyscale family
        </button>
      </DialogTrigger>
      <div className="flex gap-1.5">
        {greyscaleFamilies.map((f) => (
          <Button
            key={f.id}
            onClick={() => setSelectedId(f.id)}
            variant={selectedId === f.id ? 'primary' : 'ghost-primary'}
            aria-pressed={selectedId === f.id}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <div style={contentStyle}>
        <PreviewCard styleVars={previewVars} familyLabel={selected.label} />
      </div>

      {/* <DialogFooter
        action={{
          children: `Use ${selected.label}`,
          onClick: () => onConfirm({ familyId: selectedId, preset }),
        }}
      /> */}
    </Dialog>
  )
}

export function PreviewCard({
  styleVars,
  familyLabel,
}: {
  styleVars: Record<string, string>
  familyLabel: string
}) {
  const cssVars = useMemo(
    () => styleVars,
    [styleVars],
  ) as unknown as React.CSSProperties
  return (
    <div
      className="flex flex-col gap-1.5 "
      style={{
        ...previewContainerStyle,
        ...(cssVars as React.CSSProperties),
        background: 'var(--bg)',
        color: 'var(--fg)',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        {familyLabel} preview
      </div>
      <div
        className="w-full p-1.5"
        style={{ background: 'var(--topbar)', color: 'var(--topbar-fg)' }}
      >
        Top Bar
      </div>
      <div
        className="w-full p-1.5 text-sm"
        style={{ background: 'var(--navbar)', color: 'var(--navbar-fg)' }}
      >
        Navbar
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={panelStyle}>
          <div style={{ marginBottom: 8 }}>Panel</div>
          <button style={buttonStylePrimary}>Primary</button>
          <button style={buttonStyleSecondary}>Secondary</button>
        </div>
        <div style={{ ...panelStyle, background: 'var(--list-item-odd)' }}>
          <div style={{ marginBottom: 8 }}>List</div>
          <div style={listItemStyle}>Row 1</div>
          <div
            style={{ ...listItemStyle, background: 'var(--list-item-even)' }}
          >
            Row 2
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        Navbar:{' '}
        <span style={{ background: 'var(--navbar)', padding: '2px 6px' }} />
        &nbsp; Sidebar:{' '}
        <span style={{ background: 'var(--sidebar)', padding: '2px 6px' }} />
      </div>
    </div>
  )
}

// Inline styles (keep simple to avoid external deps)
const tabButtonStyleDark: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '6px 6px 0px 0px',
  border: '1px solid #111827',
  background: '#111827',
  cursor: 'pointer',
}

const tabButtonActiveStyle: React.CSSProperties = {
  background: '#eef2ff',
  borderBottomColor: '#c7d2fe',
}

const tabButtonActiveStyleDark: React.CSSProperties = {
  background: '#111827',
  borderBottomColor: '#e5e7eb',
}

const contentStyle: React.CSSProperties = {
  padding: 16,
}

const footerStyle: React.CSSProperties = {
  padding: 16,
  display: 'flex',
  gap: 8,
  justifyContent: 'flex-end',
  borderTop: '1px solid #e5e7eb',
}

const secondaryBtnStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #e5e7eb',
  background: '#fff',
  cursor: 'pointer',
}

const primaryBtnStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid transparent',
  background: '#111827',
  color: '#fff',
  cursor: 'pointer',
}

const previewContainerStyle: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: 12,
}

const panelStyle: React.CSSProperties = {
  background: 'var(--bg-contrast-low)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: 12,
  minWidth: 220,
}

const buttonStylePrimary: React.CSSProperties = {
  background: 'var(--primary)',
  color: 'var(--primary-fg)',
  border: '1px solid var(--primary)',
  borderRadius: 6,
  padding: '6px 10px',
  cursor: 'pointer',
  marginRight: 8,
}

const buttonStyleSecondary: React.CSSProperties = {
  background: 'var(--secondary)',
  color: 'var(--secondary-fg)',
  border: '1px solid var(--secondary)',
  borderRadius: 6,
  padding: '6px 10px',
  cursor: 'pointer',
}

const listItemStyle: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: 4,
  background: 'var(--list-item-odd)',
}

export default GreyscaleDialog
