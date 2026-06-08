import { get, isObject, isString } from 'lodash'
import { forwardRef } from 'react'
import {
  Link as LinkCore,
  LinkProps as LinkPropsCore,
  useLinkClickHandler,
} from 'react-router-dom'
import { useAppPath } from '../../useAppPath'
import { LinkToApp } from './LinkToApp'
import { LinkToFunctionID, LinkToFunctionIDProps } from './LinkToFunctionID'

type ToFunction = {
  functionID: number
  params?: LinkToFunctionIDProps['params']
}

interface LinkProps extends Omit<LinkPropsCore, 'to'> {
  to: LinkPropsCore['to'] | ToFunction
  app?: string
  functionData?: { id: number; params?: LinkToFunctionIDProps['params'] }
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ app, functionData, to, ...props }, ref) => {
    const appPath: string | undefined = useAppPath(app, isString(to) ? to : '')
    const functionID =
      (isObject(functionData) && get(functionData, 'id', undefined)) ||
      (isObject(to) && get(to, 'functionID', undefined))
    const handleClick = useLinkClickHandler(
      functionID ? '' : (to as LinkPropsCore['to']),
      {
        replace: props.replace,
        state: props.state,
        target: props.target,
      },
    )

    if (functionID) {
      return (
        <LinkToFunctionID
          {...props}
          functionID={functionID}
          params={functionData?.params || (to as ToFunction).params}
        />
      )
    } else if (appPath && app && (to as ToFunction).functionID === undefined) {
      return (
        <LinkToApp
          {...props}
          app={app}
          appPath={appPath}
          to={to as LinkPropsCore['to']}
        />
      )
    }

    return (
      <LinkCore
        {...props}
        to={to as LinkPropsCore['to']}
        rel="noopener noreferrer"
        onClick={(event) => {
          props.onClick?.(event)
          if (!event.defaultPrevented) {
            handleClick(event)
          }
        }}
        ref={ref}
      />
    )
  },
)
Link.displayName = 'Link'

export { Link }
