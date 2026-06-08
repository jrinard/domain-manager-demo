import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover'
import { ToggleGroup } from '../toggleGroup/ToggleGroup'
import { ColorArea } from '../../components/ui/color-area'
import { ColorSlider } from '../../components/ui/color-slider'
import { ColorField } from '../../components/ui/color-field'
import { parseColor, type Color } from '@react-stately/color'
import { Icon } from '@falcon/icons'

type ColorValue = string | undefined | null

export interface ColorPaletteChooserProps {
  value?: ColorValue
  onChange?: (value: string) => void
  className?: string
  /**
   * Optional header text in the popover.
   */
  label?: string
  /**
   * Domain specific CSS variable names (e.g. "--primary").
   * These render in a separate "Custom" section.
   */
  customVariables?: string[]
  /**
   * Optional inline style for the content container.
   */
  contentStyle?: CSSProperties
  /**
   * When true, allows selecting any custom color via a color picker.
   * Defaults to false.
   */
  paletteOnly?: boolean
}

type TailwindClass = string

interface SwatchDef {
  /** Tailwind bg-* class used to render the swatch */
  cls?: TailwindClass
  /** Inline style background used to render (for CSS variables) */
  style?: CSSProperties
  /** Value to emit on selection. If omitted, we'll compute the color from CSS at runtime. */
  value?: string
  ariaLabel: string
}

const groups: { title: string; items: SwatchDef[] }[] = [
  {
    title: 'Grayscale',
    items: [
      '--grayscale-950',
      '--grayscale-900',
      '--grayscale-800',
      '--grayscale-700',
      '--grayscale-600',
      '--grayscale-500',
      '--grayscale-400',
      '--grayscale-300',
      '--grayscale-200',
      '--grayscale-100',
      '--grayscale-50',
    ].map((cls) => ({
      cls,
      ariaLabel: cls,
      style: { backgroundColor: toCssVar(cls) },
    })),
  },
  {
    title: 'Red',
    items: [
      'bg-red-950',
      'bg-red-900',
      'bg-red-800',
      'bg-red-700',
      'bg-red-600',
      'bg-red-500',
      'bg-red-400',
      'bg-red-300',
      'bg-red-200',
      'bg-red-100',
      'bg-red-50',
    ].map((cls) => ({ cls, ariaLabel: cls })),
  },
  {
    title: 'Orange',
    items: [
      'bg-orange-950',
      'bg-orange-900',
      'bg-orange-800',
      'bg-orange-700',
      'bg-orange-600',
      'bg-orange-500',
      'bg-orange-400',
      'bg-orange-300',
      'bg-orange-200',
      'bg-orange-100',
      'bg-orange-50',
    ].map((cls) => ({ cls, ariaLabel: cls })),
  },
  {
    title: 'Yellow',
    items: [
      'bg-yellow-950',
      'bg-yellow-900',
      'bg-yellow-800',
      'bg-yellow-700',
      'bg-yellow-600',
      'bg-yellow-500',
      'bg-yellow-400',
      'bg-yellow-300',
      'bg-yellow-200',
      'bg-yellow-100',
      'bg-yellow-50',
    ].map((cls) => ({ cls, ariaLabel: cls })),
  },
  {
    title: 'Green',
    items: [
      'bg-green-950',
      'bg-green-900',
      'bg-green-800',
      'bg-green-700',
      'bg-green-600',
      'bg-green-500',
      'bg-green-400',
      'bg-green-300',
      'bg-green-200',
      'bg-green-100',
      'bg-green-50',
    ].map((cls) => ({ cls, ariaLabel: cls })),
  },
  {
    title: 'Blue',
    items: [
      'bg-blue-950',
      'bg-blue-900',
      'bg-blue-800',
      'bg-blue-700',
      'bg-blue-600',
      'bg-blue-500',
      'bg-blue-400',
      'bg-blue-300',
      'bg-blue-200',
      'bg-blue-100',
      'bg-blue-50',
    ].map((cls) => ({ cls, ariaLabel: cls })),
  },
  {
    title: 'Purple',
    items: [
      'bg-purple-950',
      'bg-purple-900',
      'bg-purple-800',
      'bg-purple-700',
      'bg-purple-600',
      'bg-purple-500',
      'bg-purple-400',
      'bg-purple-300',
      'bg-purple-200',
      'bg-purple-100',
      'bg-purple-50',
    ].map((cls) => ({ cls, ariaLabel: cls })),
  },
  {
    title: 'Pink',
    items: [
      'bg-pink-950',
      'bg-pink-900',
      'bg-pink-800',
      'bg-pink-700',
      'bg-pink-600',
      'bg-pink-500',
      'bg-pink-400',
      'bg-pink-300',
      'bg-pink-200',
      'bg-pink-100',
      'bg-pink-50',
    ].map((cls) => ({ cls, ariaLabel: cls })),
  },
]

function toCssVar(token: string) {
  return token.trim().startsWith('var(') ? token.trim() : `var(${token.trim()})`
}

const normalizeColorString = (value?: string | null) =>
  (value ?? '').replace(/\s+/g, '').toLowerCase()

const SwatchButton = ({
  def,
  selectedValue,
  onSelect,
}: {
  def: SwatchDef
  selectedValue?: string | null
  onSelect: (value: string) => void
}) => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [computedBg, setComputedBg] = useState<string>('')

  const isSelected = useMemo(() => {
    const a = normalizeColorString(selectedValue)
    const b = normalizeColorString(def.value ?? computedBg)
    return a !== '' && a === b
  }, [selectedValue, def.value, computedBg])

  const style = def.style
  const className = `outline-hidden relative size-7 rounded-full border border-black/5 ring-1 ring-inset ring-black/5 ${
    def.cls ?? ''
  } ${isSelected ? 'ring-2 ring-offset-2 ring-offset-white' : ''}`

  const handleClick = useCallback(() => {
    if (def.value) {
      onSelect(def.value)
      return
    }
    if (ref.current) {
      const bg = window.getComputedStyle(ref.current).backgroundColor
      setComputedBg(bg)
      onSelect(bg)
    }
  }, [onSelect, def.value])

  return (
    <button
      ref={ref}
      aria-label={def.ariaLabel}
      type="button"
      className={className}
      style={style}
      onClick={handleClick}
    />
  )
}

export const ColorPaletteChooser = ({
  value,
  onChange,
  className,
  label = 'Choose color',
  customVariables = [],
  contentStyle,
  paletteOnly = true,
}: ColorPaletteChooserProps) => {
  const [mode, setMode] = useState<'palette' | 'custom'>('palette')

  const customGroup = useMemo(() => {
    if (!customVariables.length) return null
    const items: SwatchDef[] = customVariables.map((token) => ({
      ariaLabel: token,
      value: token, // emit the bare variable name (e.g. --primary)
      style: { backgroundColor: toCssVar(token) },
    }))
    return { title: 'Custom', items }
  }, [customVariables])

  const selectedStyle: CSSProperties = useMemo(() => {
    if (!value) return {}
    const v = String(value)
    if (v.trim().startsWith('--')) {
      return { backgroundColor: toCssVar(v) }
    }
    return { backgroundColor: v }
  }, [value])

  const handleSelect = useCallback(
    (v: string) => {
      onChange?.(v)
    },
    [onChange],
  )

  const allGroups = customGroup ? [...groups, customGroup] : groups

  // Parse the current color value for the color picker
  const colorValue = useMemo(() => {
    if (!value) return undefined
    try {
      const v = String(value)
      // Skip CSS variables, they can't be parsed
      if (v.trim().startsWith('--') || v.trim().startsWith('var(')) {
        return undefined
      }
      return parseColor(v)
    } catch {
      return undefined
    }
  }, [value])

  const handleColorChange = useCallback(
    (color: Color | null) => {
      if (!color) return
      // Convert color to hex string
      const hexValue = color.toString('hex')
      onChange?.(hexValue)
    },
    [onChange],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={`inline-flex size-8 min-w-8 items-center justify-center rounded-sm border border-black/10 ring-1 ring-inset ring-black/5 ${className ?? ''}`}
          style={selectedStyle}
        />
      </PopoverTrigger>
      <PopoverContent className="min-w-72 p-3" hideHeader headerText={label}>
        <div className="flex flex-col gap-3" style={contentStyle}>
          {!paletteOnly && (
            <div className="flex justify-center pb-1">
              <ToggleGroup
                variant="shadow"
                options={[
                  {
                    value: 'palette',
                    label: <Icon icon="palette" className="h-4 w-12" />,
                    ariaLabel: 'Palette',
                  },
                  {
                    value: 'custom',
                    label: <Icon icon="eyedropper" className="h-4 w-12" />,
                    ariaLabel: 'Custom Color',
                  },
                ]}
                onChange={(selected) =>
                  setMode((selected as 'palette' | 'custom') || 'palette')
                }
              />
            </div>
          )}

          {mode === 'palette' ? (
            // Palette Mode
            <>
              {allGroups.map((group) => (
                <div key={group.title}>
                  <div className="mb-1 text-xs font-medium text-neutral-500">
                    {group.title}
                  </div>
                  <div className="grid grid-cols-11 gap-2">
                    {group.items.map((def, idx) => (
                      <SwatchButton
                        key={`${group.title}-${idx}`}
                        def={def}
                        selectedValue={
                          typeof value === 'string' ? value : undefined
                        }
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Custom Color Picker Mode
            <div className="flex flex-col gap-3">
              <ColorArea
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
                value={colorValue}
                onChange={handleColorChange}
              />
              <ColorSlider
                showOutput={false}
                colorSpace="hsb"
                channel="hue"
                value={colorValue}
                onChange={handleColorChange}
              />
              <ColorField
                enableColorPicker={false}
                className="h-9"
                aria-label="Hex"
                value={colorValue}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPaletteChooser
