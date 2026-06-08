import React from 'react'

import { TextBody } from '@spacedock/falcon-ui'

export interface BAStyleKeyProps {
  styleKey: string
}

const BAStyleKey = ({ styleKey, ...props }: BAStyleKeyProps) => {
  const styleKeyAsArray = React.useMemo(() => {
    return styleKey.split('').filter((token) => !!token) as string[]
  }, [styleKey])
  return (
    <div className="flex items-center gap-1">
      {styleKeyAsArray.map((key) => {
        switch (key) {
          case 'D':
            return (
              <TextBody key={key} color={'red400'}>
                D
              </TextBody>
            )
          case 'I':
            return (
              <TextBody key={key} color={'blue400'}>
                I
              </TextBody>
            )
          case 'S':
            return (
              <TextBody key={key} color={'lime400'}>
                S
              </TextBody>
            )
          case 'C':
            return (
              <TextBody key={key} color={'violet400'}>
                A
              </TextBody>
            )
          default:
            return <TextBody>{key}</TextBody>
        }
      })}
    </div>
  )
}
BAStyleKey.displayName = 'BAStyleKey'

export { BAStyleKey }
