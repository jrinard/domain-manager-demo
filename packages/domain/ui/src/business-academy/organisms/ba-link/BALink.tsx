import React from 'react'

import { TextBody } from '@spacedock/falcon-ui'
import { Link } from '@spacedock/navigator'
import { Icon } from '@falcon/icons'

export interface BaLinkProps {
  title: string
  link: string
  app?: string
  isPreview?: boolean
  topRender?: React.ReactNode
  titleRender?: React.ReactNode
}

const BaLink = ({
  title,
  link,
  app,
  isPreview,
  topRender,
  titleRender,
  ...props
}: BaLinkProps) => {
  return (
    <Link to={link} app={app} className="flex w-full flex-col gap-2">
      {topRender ? (
        <div className=" flex flex-col gap-2">{<div>{topRender}</div>}</div>
      ) : null}

      <div className="flex w-full items-center justify-between">
        <TextBody className="flex flex-row items-center gap-2">
          {titleRender ? titleRender : null}
          {title}
        </TextBody>
        <div>
          <Icon icon="arrow-right" color={'muted'} size="xl" />
        </div>
      </div>
    </Link>
  )
}
BaLink.displayName = 'BaLink'

export { BaLink }
