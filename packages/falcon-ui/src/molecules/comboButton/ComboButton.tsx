import { get } from 'lodash'
import React, {
  ReactNode,
  Children,
  cloneElement,
  isValidElement,
  useState,
  ReactElement,
} from 'react'
import { Icon } from '@falcon/icons'
import { mergeClasses, VariantProps, cva } from '@falcon/style'

import { Popover, PopoverTrigger, PopoverContent } from '../popover/Popover'

const comboButtonVariants = cva('inline-flex overflow-hidden rounded-md', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-fg border-primary border',
      secondary: 'bg-secondary text-secondary-fg border-secondary border',
      success: 'bg-success text-success-fg border-success border',
      warning: 'bg-warning text-warning-fg border-warning border',
      danger: 'bg-danger text-danger-fg border-danger border',
      ghost: 'text-site-fg border border-transparent bg-transparent',
      'ghost-primary': 'text-primary border border-transparent bg-transparent',
      'ghost-danger': 'text-danger border border-transparent bg-transparent',
      fill: 'text-site-fg border border-current bg-transparent',
      neutral: 'bg-site-fg text-site-bg border-site-fg border',
      outline: 'text-site-fg border-border border bg-transparent',
      disabled:
        'bg-muted text-muted-fg border-muted cursor-not-allowed border opacity-50',
      shadow:
        'border-grayscale-300 dark:border-grayscale-700 border bg-white text-white shadow-lg dark:bg-black',
    },
    size: {
      medium: '',
      mobileSidebar: '',
      small: '',
      text: 'h-10',
      'text-thin': 'h-7',
      fit: 'h-full',
      tiny: 'h-7',
      large: 'min-h-14',
      xlarge: 'min-h-20',
      xxlarge: 'min-h-24',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'medium',
  },
})

const mainButtonVariants = cva(
  'h-full flex-1 rounded-r-none border-r-0 transition-all duration-200',
  {
    variants: {
      variant: {
        primary: 'hover:bg-primary-subtle hover:text-primary-subtle-fg',
        secondary: 'hover:bg-site-bg hover:text-site-fg',
        success: 'hover:bg-success-subtle hover:text-success-subtle-fg',
        warning: 'hover:bg-warning-subtle hover:text-warning-subtle-fg',
        danger: 'hover:bg-danger-subtle hover:text-danger-subtle-fg',
        ghost: 'hover:bg-secondary hover:text-secondary-fg',
        'ghost-primary': 'hover:bg-primary hover:text-primary-fg',
        'ghost-danger': 'hover:bg-danger hover:text-danger-fg',
        fill: 'hover:bg-primary hover:text-primary-fg',
        neutral: '',
        outline: 'hover:bg-site-bg hover:text-site-fg',
        shadow: 'hover:bg-color-primary',
      },
      size: {
        medium: 'px-3 py-2',
        mobileSidebar: 'px-2 py-1',
        small: 'px-1.5 py-1',
        text: 'p-2 px-3',
        'text-thin': 'px-2 py-1 text-sm',
        fit: 'p-2 px-3',
        tiny: 'p-1.5 text-sm',
        large: 'px-4 py-3',
        xlarge: 'px-4 py-3.5',
        xxlarge: 'px-5 py-4',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'medium',
    },
  },
)

const actionButtonVariants = cva(
  'h-full rounded-l-none border-l border-white/20 transition-all duration-200',
  {
    variants: {
      variant: {
        primary: 'hover:bg-primary-subtle hover:text-primary-subtle-fg',
        secondary: 'hover:bg-site-bg hover:text-site-fg',
        success: 'hover:bg-success-subtle hover:text-success-subtle-fg',
        warning: 'hover:bg-warning-subtle hover:text-warning-subtle-fg',
        danger: 'hover:bg-danger-subtle hover:text-danger-subtle-fg',
        ghost: 'hover:bg-secondary hover:text-secondary-fg',
        'ghost-primary': 'hover:bg-primary hover:text-primary-fg',
        'ghost-danger': 'hover:bg-danger hover:text-danger-fg',
        fill: 'hover:bg-primary hover:text-primary-fg',
        neutral: '',
        outline: 'hover:bg-site-bg hover:text-site-fg',
        shadow: 'hover:bg-color-primary',
      },
      size: {
        medium: 'px-2.5 py-2',
        mobileSidebar: 'px-2 py-1',
        small: 'px-1.5 py-1',
        text: 'p-2',
        'text-thin': 'px-1.5 py-1',
        fit: 'px-2.5 py-2',
        tiny: 'px-1.5 py-1',
        large: 'px-3 py-3',
        xlarge: 'px-3.5 py-3.5',
        xxlarge: 'px-4 py-4',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'medium',
    },
  },
)

export interface ComboButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comboButtonVariants> {
  children: ReactNode
  disabled?: boolean
}

export interface ComboButtonMainProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export interface ComboButtonActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
}

export interface ComboButtonMenuProps {
  icon: string
  children: ReactNode
}

const ComboButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
  ...props
}: ComboButtonProps) => {
  // Extract children components
  const childrenArray = Children.toArray(children)
  const mainButton = childrenArray.find(
    (child) =>
      isValidElement(child) &&
      get(child.type, 'displayName') === ComboButtonMain.displayName,
  )
  const actionButton = childrenArray.find(
    (child) =>
      isValidElement(child) &&
      get(child.type, 'displayName') === ComboButtonAction.displayName,
  )
  const menuButton = childrenArray.find(
    (child) =>
      isValidElement(child) &&
      get(child.type, 'displayName') === ComboButtonMenu.displayName,
  )

  if (!mainButton) {
    throw new Error('ComboButton requires a ComboButtonMain child')
  }

  if (!actionButton && !menuButton) {
    throw new Error(
      'ComboButton requires either a ComboButtonAction or ComboButtonMenu child',
    )
  }

  if (actionButton && menuButton) {
    throw new Error(
      'ComboButton cannot have both ComboButtonAction and ComboButtonMenu children',
    )
  }

  return (
    <div
      className={mergeClasses(
        comboButtonVariants({ variant, size }),
        className,
      )}
      {...props}
    >
      {/* Clone main button with proper styling */}
      {isValidElement(mainButton) &&
        cloneElement(mainButton, {
          ...mainButton.props,
          variant,
          size,
          disabled: disabled || mainButton.props.disabled,
          className: mergeClasses(
            mainButtonVariants({ size }),
            mainButton.props.className || '',
          ),
        })}

      {/* Render action button or menu */}
      {actionButton &&
        isValidElement(actionButton) &&
        cloneElement(actionButton, {
          ...actionButton.props,
          variant,
          size,
          disabled: disabled || actionButton.props.disabled,
          className: mergeClasses(
            actionButtonVariants({ size }),
            actionButton.props.className || '',
          ),
        })}

      {menuButton &&
        isValidElement(menuButton) &&
        cloneElement(menuButton, {
          ...menuButton.props,
          variant,
          size,
          disabled: disabled,
          className: mergeClasses(
            actionButtonVariants({ size }),
            menuButton.props.className || '',
          ),
        })}
    </div>
  )
}

const ComboButtonMain = ({
  children,
  className,
  ...props
}: ComboButtonMainProps & { variant?: string; size?: string }) => {
  return (
    <button
      className={mergeClasses(
        'flex flex-row items-center justify-center gap-2 font-medium transition-all duration-200 ease-in hover:opacity-90 focus:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

const ComboButtonAction = ({
  icon,
  className,
  disabled,
  onClick,
  ...props
}: ComboButtonActionProps & { variant?: string; size?: string }) => {
  return (
    <button
      className={mergeClasses(
        'flex flex-row items-center justify-center font-medium transition-all duration-200 ease-in hover:opacity-90 focus:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <Icon icon={icon} size="sm" />
    </button>
  )
}

const ComboButtonMenu = ({
  icon,
  children,
  disabled,
  className,
}: ComboButtonMenuProps & {
  disabled?: boolean
  className?: string
  variant?: string
  size?: string
}) => {
  const [open, setOpen] = useState(false)

  // Wrap children onClick handlers to close the popover
  const wrappedChildren = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === ComboButtonMenuItem) {
      const originalOnClick = child.props.onClick
      return cloneElement(child as ReactElement<any>, {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          originalOnClick?.(e)
          setOpen(false)
        },
      })
    }
    return child
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={mergeClasses(
            'flex flex-row items-center justify-center font-medium transition-all duration-200 ease-in hover:opacity-90 focus:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2',
            className,
          )}
          disabled={disabled}
        >
          <Icon icon={icon} size="sm" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-site-bg w-auto p-0" hideHeader>
        <div className="py-1">{wrappedChildren}</div>
      </PopoverContent>
    </Popover>
  )
}

// Menu item component for use within ComboButtonMenu
export interface ComboButtonMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string
  children: ReactNode
  destructive?: boolean
}

const ComboButtonMenuItem = ({
  icon,
  children,
  destructive = false,
  className,
  ...props
}: ComboButtonMenuItemProps) => {
  return (
    <button
      className={mergeClasses(
        'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
        destructive
          ? 'text-danger hover:text-danger focus:text-danger focus:outline-none'
          : 'text-site-fg hover:text-primary focus:text-primary focus:outline-none',
        className,
      )}
      {...props}
    >
      {icon && <Icon icon={icon} size="sm" />}
      {children}
    </button>
  )
}

ComboButton.displayName = 'ComboButton'
ComboButtonMain.displayName = 'ComboButtonMain'
ComboButtonAction.displayName = 'ComboButtonAction'
ComboButtonMenu.displayName = 'ComboButtonMenu'
ComboButtonMenuItem.displayName = 'ComboButtonMenuItem'

export {
  ComboButton,
  ComboButtonMain,
  ComboButtonAction,
  ComboButtonMenu,
  ComboButtonMenuItem,
}
