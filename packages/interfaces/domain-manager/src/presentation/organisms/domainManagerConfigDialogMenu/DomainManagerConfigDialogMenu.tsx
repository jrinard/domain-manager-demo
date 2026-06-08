import { keyBy } from 'lodash'
import {
  Dialog,
  useToast,
  Switch,
  TextBody,
  ComboBox,
  Checkbox,
} from '@spacedock/falcon-ui'
import { TextInput } from '@falcon/inputs'
import { Icon } from '@falcon/icons'
import { MENU_ITEMS, MANAGE_MENU_ITEMS } from '@spacedock/manifest'
import { useState, useEffect, useMemo } from 'react'
import {
  useCustomTabsReadQuery,
  useMenuQuery,
  useMenuManageQuery,
} from '@tyto/query'
import { IconPicker } from '@falcon/icon-picker'
import { createFileURL } from '../../../data/utils/file-path'

export interface DomainManagerConfigDialogMenuProps {
  id: number
  domainID?: number
  open: boolean
  onOpenChange: (val: boolean) => void
  onSuccess: (newItem: any) => void
  initialData?: any
  editingType?: 'topButton' | 'toggleSection'
  buttonOnly?: boolean
}

const DomainManagerConfigDialogMenu = ({
  id,
  domainID,
  open,
  onOpenChange,
  onSuccess,
  initialData,
  editingType,
  buttonOnly = false,
}: DomainManagerConfigDialogMenuProps) => {
  const toast = useToast()

  const [displayAs, setDisplayAs] = useState<
    'default' | 'title' | 'text-only'
  >(initialData?.displayAs || 'default')
  const [buttonVariant, setButtonVariant] = useState<
    'link' | 'custom-tab' | 'menu-item' | 'text-only'
  >('link')
  const [location, setLocation] = useState<'top' | 'section'>('top')
  const [title, setTitle] = useState<string>(initialData?.title || '')
  const [description, setDescription] = useState<string>(
    initialData?.description || '',
  )
  const [hideIcon, setHideIcon] = useState<boolean>(
    initialData?.hideIcon !== undefined ? initialData.hideIcon : true,
  )
  const [iconName, setIconName] = useState<string>(
    initialData?.ccIconName || '',
  )
  const [functionID, setFunctionID] = useState<string>(
    initialData?.functionID?.toString() || '',
  )
  const [traitID, setTraitID] = useState<string>(
    initialData?.traitID?.toString() || '',
  )
  const [showTraitInput, setShowTraitInput] = useState<boolean>(false)
  const [url, setUrl] = useState<string>(initialData?.href || '')
  const [target, setTarget] = useState<string>(initialData?.target || '')
  const [iconPath, setIconPath] = useState<string>(initialData?.iconPath || '')
  const [iconPathLarge, setIconPathLarge] = useState<string>(
    initialData?.iconPathLarge || '',
  )
  const [iconRightPath, setIconRightPath] = useState<string>(
    initialData?.iconRightPath || '',
  )

  const buttonTypeOptions = [
    { value: 'link', item: 'Link' },
    { value: 'custom-tab', item: 'Custom Tab' },
    { value: 'menu-item', item: 'Menu Item' },
    { value: 'text-only', item: 'Text Only (non-link)' },
  ]

  const displayAsOptions = [
    { value: 'default', item: 'Default' },
    { value: 'title', item: 'Title (larger text)' },
    { value: 'text-only', item: 'Text Only (no link)' },
  ]

  const targetOptions = [
    { value: '', item: 'Same Window' },
    { value: '_blank', item: 'New Window' },
    { value: '_top', item: 'Full Window' },
  ]

  const menuQuery = useMenuQuery({
    disabled: buttonVariant !== 'menu-item' && buttonVariant !== 'custom-tab',
  })
  const manageMenuQuery = useMenuManageQuery({
    disabled: buttonVariant !== 'menu-item',
  })

  const customTabsQuery = useCustomTabsReadQuery({
    domainID: domainID ?? 0,
    isEnabled: !!domainID && buttonVariant === 'custom-tab',
  })

  // Convert MENU_FUNCTIONS to ComboBox options
  const menuItemOptions = useMemo(() => {
    const keyedMenuItems = keyBy(menuQuery.data?.menuItems, 'functionID')
    const keyedManageMenuItems = keyBy(
      manageMenuQuery.data?.menuItems,
      'functionID',
    )

    return [...MENU_ITEMS, ...MANAGE_MENU_ITEMS].map((item) => {
      let menuItem = keyedMenuItems[item.functionID]

      if (!menuItem) {
        menuItem = keyedManageMenuItems[item.functionID]
      }

      return {
        value: item.functionID.toString(),
        item: (
          <div className="flex flex-row items-center gap-1">
            {keyedMenuItems[item.functionID]?.iconPath ? (
              <img
                src={createFileURL(keyedMenuItems[item.functionID]?.iconPath)}
                alt={item.menuDisplayName || item.functionName}
                className="h-4 w-4"
              />
            ) : (
              <div className="h-4 w-4" />
            )}
            {item.menuDisplayName || item.functionName}
          </div>
        ),
        properties: {
          displayName: item.menuDisplayName,
        },
      }
    })
  }, [menuQuery.data ?? null, manageMenuQuery.data ?? null])

  const customTabOptions = useMemo(() => {
    return (
      customTabsQuery.data?.tabs.map((tab) => ({
        value: tab.traitID.toString(),
        item: (
          <div className="flex flex-row items-center gap-1">
            {tab.iconUrl ? (
              <img
                src={fixCustomTabIconPath(tab.iconUrl)}
                alt={tab.name}
                className="h-4 w-4"
              />
            ) : (
              <div className="h-4 w-4" />
            )}
            {tab.name}
          </div>
        ),
        properties: {
          displayName: tab.name,
        },
      })) ?? []
    )
  }, [customTabsQuery.data ?? null])

  const resetForm = () => {
    setButtonVariant('link')
    setDisplayAs('default')
    setLocation('top')
    setTitle('')
    setDescription('')
    setHideIcon(true)
    setIconName('')
    setIconPath('')
    setIconPathLarge('')
    setIconRightPath('')
    setFunctionID('')
    setTraitID('')
    setUrl('')
    setTarget('')
  }

  // Update form when initialData or editingType changes
  useEffect(() => {
    if (initialData || editingType) {
      setLocation(editingType === 'toggleSection' ? 'section' : 'top')
      setButtonVariant(
        (initialData?.type || 'link') as 'link' | 'custom-tab' | 'menu-item' | 'text-only',
      )
      setDisplayAs(initialData?.displayAs || 'default')
      setTitle(initialData?.title || '')
      setDescription(initialData?.description || '')
      setHideIcon(
        initialData?.hideIcon !== undefined ? initialData.hideIcon : true,
      )
      setIconName(initialData?.ccIconName || '')
      setFunctionID(initialData?.functionID?.toString() || '')
      setTraitID(initialData?.traitID?.toString() || '')
      setUrl(initialData?.href || '')
      setTarget(initialData?.target || '')
      setIconPath(initialData?.iconPath || '')
      setIconPathLarge(initialData?.iconPathLarge || '')
      setIconRightPath(initialData?.iconRightPath || '')
    } else {
      resetForm()
    }

    // Force location to 'top' when buttonOnly is true
    if (buttonOnly) {
      setLocation('top')
    }
  }, [initialData, editingType, buttonOnly])

  const getIconProps = () => ({
    hideIcon,
    ...(iconName && !hideIcon && { ccIconName: iconName }),
    ...(iconPath && !hideIcon && { iconPath }),
    ...(iconPathLarge && !hideIcon && { iconPathLarge }),
    ...(iconRightPath && !hideIcon && { iconRightPath }),
  })

  const getDefaultTitle = () => {
    if (title) return title
    const defaults: Record<
      'link' | 'menu-item' | 'custom-tab' | 'text-only',
      string
    > = {
      link: 'Link',
      'custom-tab': 'Tab',
      'menu-item': 'Menu',
      'text-only': 'Text',
    }
    return defaults[buttonVariant] || 'Untitled'
  }

  const handleSave = () => {
    if (location === 'section') {
      onSuccess({
        _id: '',
        title: title || 'Toggle',
        description: description || '',
        location: 'section',
        categories: [],
        ...getIconProps(),
      })
    } else {
      onSuccess({
        title: getDefaultTitle(),
        description: description || '',
        type: buttonVariant === 'text-only' ? 'text-only' : buttonVariant,
        location: 'top',
        ...(displayAs !== 'default' && { displayAs }),
        ...getIconProps(),
        ...(buttonVariant !== 'text-only' && functionID && { functionID: parseInt(functionID) || 0 }),
        ...(buttonVariant !== 'text-only' && traitID && { traitID: parseInt(traitID) || 0 }),
        ...(buttonVariant !== 'text-only' && url && { href: url }),
        ...(buttonVariant !== 'text-only' && target && { target }),
      })
    }

    onOpenChange(false)
    resetForm()
  }

  // Dynamic title based on editing vs creating
  const getDialogTitle = () => {
    if (initialData || editingType) {
      return editingType === 'toggleSection'
        ? 'Edit Toggle Section'
        : 'Edit Button'
    }
    if (buttonOnly) {
      return 'Add Button'
    }
    return 'Create Button or Toggle Section'
  }

  return (
    <Dialog
      maxWidth="lg"
      maxHeight="screen"
      open={open}
      onOpenChange={onOpenChange}
      title={getDialogTitle()}
      destructiveLabel="Save"
      action={{ onClick: handleSave }}
    >
      {/* Form Section */}
      <div className="flex flex-col gap-2 rounded px-4">
        {/* Location Select - FIRST - Button Cards */}
        {!buttonOnly && !initialData && !editingType && (
          <div className="mb-2 flex flex-col gap-2">
            <div className="m-2 flex gap-6">
              {/* Button Card */}
              <div
                className={`flex flex-1 cursor-pointer items-center gap-3 border bg-black px-4 py-1.5 text-white transition-all hover:opacity-80 ${
                  location === 'top'
                    ? 'border-grayscale-300 opacity-100'
                    : 'border-grayscale-500 opacity-50'
                }`}
                style={{ minHeight: '40px' }}
                onClick={() => setLocation('top')}
              >
                <div className="flex flex-col">
                  <TextBody className="text-white underline" size="m">
                    Button
                  </TextBody>
                  <TextBody className="text-grayscale-400" size="xs">
                    Clickable link/action
                  </TextBody>
                </div>
              </div>

              {/* Toggle Section Card */}
              <div
                className={`flex flex-1 cursor-pointer items-center gap-3 border bg-black px-4 py-1.5 text-white transition-all hover:opacity-80 ${
                  location === 'section'
                    ? 'border-grayscale-300 opacity-100'
                    : 'border-grayscale-500 opacity-50'
                }`}
                style={{ minHeight: '40px' }}
                onClick={() => setLocation('section')}
              >
                <div className="flex flex-col">
                  <TextBody className="text-white" size="m">
                    Toggle Section
                  </TextBody>
                  <TextBody className="text-grayscale-400" size="xs">
                    Dropdown container that holds buttons
                  </TextBody>
                </div>
                <Icon icon="chevron-down" size="lg" color="current" />
              </div>
            </div>

            {/* Conditional description text */}
            <div className="px-4 pt-2">
              {location === 'section' ? (
                <TextBody className="text-grayscale-400" size="xs">
                  Toggle Sections act as containers to hold buttons in a drop
                  down.
                </TextBody>
              ) : (
                <TextBody className="text-grayscale-400" size="xs">
                  This is the general menu item that can be a Link, a Menu Item,
                  or a Custom Tab.
                </TextBody>
              )}
            </div>
          </div>
        )}

        {/* Button Type Select - ONLY for top buttons */}
        {location === 'top' && (
          <div className="flex flex-col gap-1">
            <TextBody className="text-sm opacity-70">Button Type</TextBody>
            <ComboBox
              items={buttonTypeOptions}
              value={buttonVariant}
              onChange={(value) => {
                setButtonVariant(value as 'link' | 'custom-tab' | 'menu-item' | 'text-only')
                if (value === 'text-only') {
                  setDisplayAs('text-only')
                }
              }}
            />
          </div>
        )}

        {/* Display As selector */}
        {location === 'top' && buttonVariant !== 'text-only' && (
          <div className="flex flex-col gap-1">
            <TextBody className="text-sm opacity-70">Display As</TextBody>
            <ComboBox
              items={displayAsOptions}
              value={displayAs}
              onChange={(value) => setDisplayAs(value as 'default' | 'title' | 'text-only')}
            />
          </div>
        )}

        {/* Details Section Divider */}
        <hr className="border-grayscale-600 my-2" />

        {/* Details Section Header */}
        <TextBody className="text-sm font-semibold opacity-70">
          Details
        </TextBody>

        {/* Label */}
        <div className="flex flex-col gap-1">
          <TextBody className="text-sm opacity-70">
            Label{' '}
            {buttonVariant === 'menu-item' || buttonVariant === 'custom-tab'
              ? 'Override'
              : ''}
            {(location === 'section' ||
              (location === 'top' && buttonVariant === 'link')) && (
              <span className="text-red-500"> *</span>
            )}
          </TextBody>
          <TextInput
            placeholder={
              location === 'section' || buttonVariant === 'link'
                ? 'Enter label (required)'
                : 'Enter label (optional)'
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Description */}
        <div className="flex flex-col gap-1">
          <TextBody className="text-sm opacity-70">
            Description{' '}
            {buttonVariant === 'menu-item' || buttonVariant === 'custom-tab'
              ? 'Override'
              : ''}
          </TextBody>
          <TextInput
            placeholder="Enter description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Button-specific fields - ONLY for top buttons */}
        {location === 'top' && buttonVariant !== 'text-only' && (
          <>
            {/* Destination Section - with extra gap */}
            <div className="mt-4 flex flex-col gap-2">
              {/* Destination Section Divider */}
              <hr className="border-grayscale-600 my-2" />

              {/* Destination Section Header */}
              <TextBody className="text-sm font-semibold opacity-70">
                Destination
              </TextBody>

              {/* Trait ID - Required for custom-tab */}
              {buttonVariant === 'custom-tab' && (
                <div className="flex flex-col gap-1">
                  <TextBody className="flex flex-row items-center gap-2 text-sm opacity-70">
                    <div>
                      Trait ID (Custom Tab){' '}
                      <span className="text-red-500">*</span>
                    </div>
                    <div className="ml-auto flex flex-row items-center gap-1">
                      <Checkbox
                        id="show-trait-input"
                        checked={showTraitInput}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setShowTraitInput(true)
                          } else {
                            setShowTraitInput(false)
                          }
                        }}
                      />
                      <label
                        htmlFor="show-trait-input"
                        className="hover:cursor-pointer"
                      >
                        Type in Trait ID
                      </label>
                    </div>
                  </TextBody>
                  {showTraitInput || customTabsQuery.error ? (
                    <TextInput
                      placeholder="Trait ID (required)"
                      value={traitID}
                      onChange={(e) => setTraitID(e.target.value)}
                    />
                  ) : (
                    <ComboBox
                      includeSearch
                      items={customTabOptions}
                      value={traitID}
                      onChange={(value) => setTraitID(value)}
                    />
                  )}
                </div>
              )}

              {/* Internal Location - Required for menu-item, optional for others */}
              {buttonVariant === 'menu-item' && (
                <div className="flex flex-col gap-1">
                  <TextBody className="text-sm opacity-70">
                    Internal Location (Menu Item)
                    {buttonVariant === 'menu-item' ? (
                      <span className="text-red-500"> *</span>
                    ) : (
                      <span className="text-grayscale-500 ml-1 text-xs">
                        (optional)
                      </span>
                    )}
                  </TextBody>
                  <ComboBox
                    includeSearch
                    items={menuItemOptions}
                    value={functionID}
                    onChange={(value, item) => {
                      setFunctionID(value)
                      if (
                        item?.properties &&
                        'displayName' in item.properties &&
                        typeof item.properties.displayName === 'string'
                      ) {
                        setTitle(item.properties.displayName)
                      }
                    }}
                  />
                </div>
              )}

              {/* URL - Always shown, required for link, optional for others */}
              {buttonVariant === 'link' && (
                <div className="flex flex-col gap-1">
                  <TextBody className="text-sm opacity-70">
                    URL
                    {buttonVariant === 'link' ? (
                      <span className="text-red-500"> *</span>
                    ) : (
                      <span className="text-grayscale-500 ml-1 text-xs">
                        (optional fallback)
                      </span>
                    )}
                  </TextBody>
                  <TextInput
                    placeholder="Enter URL - https://www.example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              )}

              {/* Open In - Optional for link and menu-item */}
              {(buttonVariant === 'link' || buttonVariant === 'menu-item') && (
                <div className="flex flex-col gap-1">
                  <TextBody className="text-sm opacity-70">
                    Open In{' '}
                    <span className="text-grayscale-500 ml-1 text-xs">
                      (optional)
                    </span>
                  </TextBody>
                  <ComboBox
                    items={targetOptions}
                    value={target}
                    onChange={(value) => setTarget(value)}
                  />
                </div>
              )}

              {/* Icon Details Section Divider */}
              <hr className="border-grayscale-600 my-2 mt-4" />

              {/* Icon Details Section Header */}
              <TextBody className="text-sm font-semibold opacity-70">
                Icon Details
              </TextBody>

              {/* Icon Fields - Available for all button types */}
              <div className="mb-2 flex items-center justify-start gap-2">
                <TextBody className="text-sm opacity-70">Hide Icon</TextBody>
                <Switch checked={hideIcon} onCheckedChange={setHideIcon} />
              </div>

              {!hideIcon && (
                <>
                  {/* Icon Name - IconPicker for visual icon selection */}
                  <div className="flex flex-col gap-1">
                    <TextBody className="text-sm opacity-70">
                      Icon Name{' '}
                      <span className="text-grayscale-500 ml-1 text-xs">
                        (optional)
                      </span>
                    </TextBody>
                    <IconPicker
                      value={iconName}
                      onChange={(value) => setIconName(value)}
                      label="Choose Icon"
                    />
                  </div>

                  {/* Icon Path Fields */}
                  {[
                    {
                      label: 'Icon Path',
                      value: iconPath,
                      onChange: setIconPath,
                      placeholder: 'Enter icon path URL',
                      hint: 'custom image URL',
                    },
                    {
                      label: 'Icon Path Large',
                      value: iconPathLarge,
                      onChange: setIconPathLarge,
                      placeholder: 'Enter large icon path URL',
                      hint: 'larger image URL',
                    },
                    {
                      label: 'Icon Right Path',
                      value: iconRightPath,
                      onChange: setIconRightPath,
                      placeholder: 'Enter right icon path URL',
                      hint: 'right side icon URL',
                    },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col gap-1">
                      <TextBody className="text-sm opacity-70">
                        {field.label}{' '}
                        <span className="text-grayscale-500 ml-1 text-xs">
                          (optional - {field.hint})
                        </span>
                      </TextBody>
                      <TextInput
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Dialog>
  )
}

function fixCustomTabIconPath(iconPath: string) {
  return createFileURL(iconPath)
}

DomainManagerConfigDialogMenu.displayName = 'DomainManagerConfigDialogMenu'

export { DomainManagerConfigDialogMenu }
