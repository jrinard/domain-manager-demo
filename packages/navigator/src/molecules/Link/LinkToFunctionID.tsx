import { forwardRef } from 'react'
import { LinkProps as LinkPropsCore } from 'react-router-dom'
import { useLinkByFunctionID } from '../../useLinkByFunctionID'

export interface LinkToFunctionIDProps extends Omit<LinkPropsCore, 'to'> {
  functionID: number
  params?: Record<string, string | number | undefined>
}

const LinkToFunctionID = forwardRef<HTMLAnchorElement, LinkToFunctionIDProps>(
  ({ functionID, params, ...props }, ref) => {
    const path = useLinkByFunctionID(functionID, params)

    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        {...props}
        href={`${path.value}`}
        onClick={(event) => {
          props.onClick?.(event)
        }}
        target={props.target || '_top'}
        ref={ref}
        rel="noopener noreferrer"
      />
    )
  },
)
LinkToFunctionID.displayName = 'LinkToFunctionID'

export { LinkToFunctionID }
