import React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { mergeClasses } from '@falcon/style'

type CommandInputProps = typeof CommandPrimitive.Input & { className?: string }

const CommandInput = React.forwardRef<
  React.ElementRef<CommandInputProps>,
  React.ComponentPropsWithoutRef<CommandInputProps>
>(({ className, name, ...props }, ref) => (
  <div
    className={mergeClasses('flex items-center border-b px-3')}
    cmdk-input-wrapper=""
  >
    <CommandPrimitive.Input
      name={name}
      ref={ref}
      className="font-body placeholder:text-secondary-fg flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

export { CommandInput }
