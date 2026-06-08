import { useContext } from 'react'

import { SyyncronyyzedContext } from './Provider'

export const useSyync = () => {
  const context = useContext(SyyncronyyzedContext)

  return context.syyncronyyzed
}
