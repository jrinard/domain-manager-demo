import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  Icon,
  APPROVED_ICONS,
  MDI_ICON_NAMES,
  type ApprovedIcon,
} from '@falcon/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@spacedock/falcon-ui'

export interface IconPickerProps {
  value?: string
  onChange?: (icon: string) => void
  label?: string
  topIcons?: string[]
  className?: string
  topIconsLabel?: string
}

const MENU_ICONS = [
  'account',
  'account-multiple-outline',
  'calendar-outline',
  'check',
  'edit-outline',
  'envelope-outline',
  'star-outline',
  'search',
  'settings',
  'trash-outline',
]

interface IconButtonProps {
  iconName: string
  isSelected: boolean
  onSelect: (icon: string) => void
}

const IconButton = ({ iconName, isSelected, onSelect }: IconButtonProps) => {
  const displayName = iconName.replace(/-/g, ' ')

  return (
    <button
      type="button"
      onClick={() => onSelect(iconName)}
      className={`flex items-center justify-center rounded-sm border border-black/10 p-2 transition-all hover:bg-gray-100/5 ${
        isSelected ? 'ring-primary ring-2 ring-offset-2 ring-offset-black' : ''
      }`}
      aria-label={displayName}
      title={displayName}
    >
      <Icon icon={iconName as ApprovedIcon} size="xl" color="secondary" />
    </button>
  )
}

export const IconPicker = ({
  value,
  onChange,
  label = 'Choose icon',
  topIcons = MENU_ICONS,
  topIconsLabel = 'Menu Icons',
  className,
}: IconPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const [menuIconsOpen, setMenuIconsOpen] = useState(true)
  const [allIconsOpen, setAllIconsOpen] = useState(true)
  const [mdiIconsOpen, setMdiIconsOpen] = useState(false)

  const { menuIcons, approvedIcons, mdiIcons } = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const topIconsSet = new Set(topIcons)
    const approvedSet = new Set(APPROVED_ICONS)

    const filterBySearch = (icons: readonly string[]) =>
      term ? icons.filter((icon) => icon.toLowerCase().includes(term)) : icons

    const menuIcons = filterBySearch(topIcons)

    const approvedIcons = filterBySearch(
      APPROVED_ICONS.filter((icon) => !topIconsSet.has(icon)),
    )

    const mdiIcons = filterBySearch(
      MDI_ICON_NAMES.filter(
        (icon) => !approvedSet.has(icon) && !topIconsSet.has(icon),
      ),
    )

    return { menuIcons, approvedIcons, mdiIcons }
  }, [searchTerm, topIcons])

  useEffect(() => {
    if (searchTerm.trim()) {
      if (menuIcons.length > 0) setMenuIconsOpen(true)
      if (approvedIcons.length > 0) setAllIconsOpen(true)
      if (mdiIcons.length > 0) setMdiIconsOpen(true)
    }
  }, [searchTerm, menuIcons.length, approvedIcons.length, mdiIcons.length])

  const handleSelect = useCallback(
    (iconName: string) => {
      onChange?.(iconName)
      setIsOpen(false)
      setSearchTerm('')
    },
    [onChange],
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={`inline-flex h-10 min-h-10 items-center justify-center gap-2 rounded-sm border border-black/10 transition-all ${
            value
              ? 'w-10 min-w-10 ring-1 ring-inset ring-black/5 hover:bg-gray-100/5'
              : 'bg-primary text-primary-fg w-32 hover:opacity-90'
          } ${className ?? ''}`}
        >
          {value ? (
            <Icon icon={value as ApprovedIcon} size="xl" color="primary" />
          ) : (
            <>
              <Icon icon="palette" size="base" />
              <span className="text-sm">Choose Icon</span>
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="min-w-[400px] max-w-[500px] p-3"
        hideHeader={false}
        headerText={label}
        onInteractOutside={() => setIsOpen(false)}
        align="start"
      >
        <div className="flex flex-col gap-3">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-grayscale-900 border-grayscale-700 text-grayscale-100 placeholder-grayscale-500 focus:ring-primary w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2"
          />

          {/* Scrollable content */}
          <div
            className="h-[400px] overflow-y-auto overscroll-contain px-2"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Section 1: Menu Icons */}
            {menuIcons.length > 0 && (
              <Collapsible
                open={menuIconsOpen}
                onOpenChange={setMenuIconsOpen}
                className="mb-3"
              >
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="text-grayscale-500 hover:text-grayscale-300 transition-colors"
                      aria-label={`Toggle ${topIconsLabel}`}
                    >
                      <Icon
                        icon={menuIconsOpen ? 'chevron-down' : 'chevron-right'}
                        size="base"
                      />
                    </button>
                  </CollapsibleTrigger>
                  <div className="text-grayscale-400 text-xs font-medium">
                    {topIconsLabel} ({menuIcons.length})
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {menuIcons.map((iconName) => (
                      <IconButton
                        key={iconName}
                        iconName={iconName}
                        isSelected={value === iconName}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Section 2: All Icons (APPROVED_ICONS) */}
            {approvedIcons.length > 0 && (
              <Collapsible
                open={allIconsOpen}
                onOpenChange={setAllIconsOpen}
                className="mb-3"
              >
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="text-grayscale-500 hover:text-grayscale-300 transition-colors"
                      aria-label="Toggle All Icons"
                    >
                      <Icon
                        icon={allIconsOpen ? 'chevron-down' : 'chevron-right'}
                        size="base"
                      />
                    </button>
                  </CollapsibleTrigger>
                  <div className="text-grayscale-400 text-xs font-medium">
                    All Icons ({approvedIcons.length})
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {approvedIcons.map((iconName) => (
                      <IconButton
                        key={iconName}
                        iconName={iconName}
                        isSelected={value === iconName}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Section 3: More from Iconify (MDI library) */}
            {mdiIcons.length > 0 && (
              <Collapsible
                open={mdiIconsOpen}
                onOpenChange={setMdiIconsOpen}
                className="mb-3"
              >
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="text-grayscale-500 hover:text-grayscale-300 transition-colors"
                      aria-label="Toggle More from Iconify"
                    >
                      <Icon
                        icon={mdiIconsOpen ? 'chevron-down' : 'chevron-right'}
                        size="base"
                      />
                    </button>
                  </CollapsibleTrigger>
                  <div className="text-grayscale-400 text-xs font-medium">
                    More from Iconify ({mdiIcons.length})
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {mdiIcons.map((iconName) => (
                      <IconButton
                        key={iconName}
                        iconName={iconName}
                        isSelected={value === iconName}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* No results */}
            {menuIcons.length === 0 &&
              approvedIcons.length === 0 &&
              mdiIcons.length === 0 && (
                <div className="text-grayscale-500 py-8 text-center text-sm">
                  No icons found for "{searchTerm}"
                </div>
              )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default IconPicker
