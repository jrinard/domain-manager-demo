import { forwardRef } from 'react'
import {
  LinkProps as LinkPropsCore,
  useLinkClickHandler,
} from 'react-router-dom'

interface LinkToAppProps extends LinkPropsCore {
  appPath: string | undefined
  app: string
}

const LinkToApp = forwardRef<HTMLAnchorElement, LinkToAppProps>(
  ({ appPath, app, ...props }, ref) => {
    const target = props.target ? props.target : '_top'
    const handleClick = useLinkClickHandler(props.to, {
      replace: props.replace,
      state: props.state,
      target: target,
    })

    if (!appPath) {
      const path = JSON.stringify(props.to)
      throw new Error(`Link could not be create for ${path} in app ${app}`)
    }

    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        {...props}
        href={`${appPath}`}
        onClick={(event) => {
          props.onClick?.(event)
          if (!event.defaultPrevented) {
            handleClick(event)
          }
        }}
        ref={ref}
        target={target}
        rel="noopener noreferrer"
      />
    )
  },
)
LinkToApp.displayName = 'LinkToApp'

export { LinkToApp }
