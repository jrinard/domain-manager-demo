import { Surface, TextHeading, TextSubHeading } from '@spacedock/falcon-ui'
import React, { PropsWithChildren } from 'react'

export type GeneralLayoutProps = PropsWithChildren & {
  title: string
}

export const GeneralLayout = ({ title, children }: GeneralLayoutProps) => {
  return (
    <Surface className="flex h-screen w-screen flex-col gap-6 p-16 pt-10">
      <header className="flex h-6 items-center justify-between gap-2 pb-2 pt-6">
        <div className="flex items-center gap-2">
          <TextSubHeading>domain-manager | </TextSubHeading>
          <TextHeading size={2}>{title}</TextHeading>
        </div>
      </header>

      <main className="mx-auto flex w-full flex-1 pb-6 pt-2 text-center">
        {children}
      </main>
    </Surface>
  )
}
