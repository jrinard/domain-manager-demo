import { useState, useLayoutEffect, useRef, MutableRefObject } from 'react'
export const useIsOverflowing = <T extends HTMLElement = HTMLDivElement>(
  providedRef?: MutableRefObject<T>
) => {
  const privateRef = useRef<T | null>(null)
  const ref = providedRef ? providedRef : privateRef
  const [isOverflow, setIsOverflow] = useState(false)
  const [amountOverflowingY, setAmountOverflowingY] = useState(0)

  useLayoutEffect(() => {
    const { current } = ref

    const trigger = () => {
      const hasOverflowY =
        current != null ? current.scrollHeight > current.clientHeight : false
      setIsOverflow(hasOverflowY)

      if (current != null) {
        let amountOverflowing = 0
        for (let index = 0; index < current.children.length; index++) {
          if (
            current.children[index].getBoundingClientRect().y >
            current?.getBoundingClientRect().bottom
          ) {
            amountOverflowing++
          }
        }
        setAmountOverflowingY(amountOverflowing)
      }
    }

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current)
      }

      trigger()
    }
  }, [ref])

  return { isOverflow, amountOverflowingY, ref }
}
