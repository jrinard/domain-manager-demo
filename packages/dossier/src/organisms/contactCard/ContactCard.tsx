import React from 'react'

import { Avatar, Button, Skeleton } from '@spacedock/falcon-ui'
import { cva, mergeClasses, VariantProps } from '@falcon/style'

import { DISCQuadrants } from '../../molecules/discQuadrants/DISCQuadrants'
import { DiscGraphValues } from '../../molecules/discGraph/DiscGraph'

const variants = cva('rounded items-center justify-between flex gap-3', {
  variants: {
    weighted: {
      true: 'p-5 border-grey border shadow-xl',
      false: '',
    },
  },
  defaultVariants: {
    weighted: false,
  },
})

export interface ContactCardProps extends VariantProps<typeof variants> {
  displayName: string
  avatar: string
  email: string
  phone: string
  discValues?: DiscGraphValues
  title: string
  isLoading?: boolean
  width?: string
}

const ContactCard = ({
  displayName,
  avatar,
  email,
  phone,
  discValues,
  title,
  isLoading,
  weighted,
  width,
}: ContactCardProps) => {
  return (
    <div className={mergeClasses(variants({ weighted }), width ?? '')}>
      <div className="flex flex-col gap-4">
        <div className="mr-4 flex flex-row gap-4">
          {isLoading ? (
            <Skeleton.Circle size="12" />
          ) : (
            <Avatar name={displayName} src={avatar} size="xl" />
          )}
          <div className="flex flex-col gap-1">
            {isLoading ? (
              <Skeleton.Text size="xl" />
            ) : (
              <div className="text-secondary-fg text-xl">{displayName}</div>
            )}
            {isLoading ? (
              <Skeleton.Text size="xl" />
            ) : (
              <div className="text-secondary-fg text-lg">{title}</div>
            )}
            <Button
              variant="primary"
              className="mx-0 mt-2"
              disabled={isLoading}
            >
              Go To Profile
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <Skeleton.Text size="sm" length="short" />
          ) : (
            <div className="text-secondary-fg pl-2 text-sm font-thin">
              Phone: <span className="pl-2">{phone}</span>
            </div>
          )}
          {isLoading ? (
            <Skeleton.Text size="sm" />
          ) : (
            <div className="text-secondary-fg pl-2 text-sm font-thin">
              Email: <span className="pl-4">{email}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-end justify-center pl-4">
        {isLoading ? (
          <Skeleton.Square size="40" />
        ) : (
          <DISCQuadrants discValues={discValues} graph="Public" size={150} />
        )}
      </div>
    </div>
  )
}
ContactCard.displayName = 'ContactCard'

export { ContactCard }
