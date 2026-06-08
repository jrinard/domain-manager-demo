import { PropsWithChildren } from 'react'

import { mergeClasses } from '@falcon/style'

interface Props {
  style: React.CSSProperties
  className?: string
  text?: string
  textClassName?: string
}

const ColorCard = (props: PropsWithChildren<Props>) => {
  return (
    <div
      className={mergeClasses(
        'w-15 items-en flex aspect-[7/10] flex-row rounded-md p-1.5',
        props.className,
      )}
      style={props.style}
    >
      {props.children ?? (
        <span
          className={mergeClasses(
            'mt-auto w-full p-1.5 text-sm',
            props.textClassName,
          )}
        >
          {props.text}
        </span>
      )}
    </div>
  )
}

export { ColorCard }
