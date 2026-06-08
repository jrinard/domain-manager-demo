import { useLayoutEffect, useRef, useState } from 'react'

export function useResponsiveBreadcrumb<
  T extends { label: string; id: string | number; to?: string },
>(items: T[], debounceMs = 100) {
  const containerRef = useRef<HTMLUListElement | null>(null)
  const [visibleItems, setVisibleItems] = useState<T[]>(items)
  const [condensed, setCondensed] = useState(false)
  const debounceTimeout = useRef<number>()

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const BUFFER = 8
    const EXPAND_MARGIN = 20

    const update = () => {
      if (!el) return

      const clientWidth = el.clientWidth
      const scrollWidth = el.scrollWidth

      // Check if we need to condense
      if (
        !condensed &&
        scrollWidth > clientWidth + BUFFER &&
        items.length > 4
      ) {
        setVisibleItems([
          items[0],
          { id: '__ellipsis__', label: '...' } as T,
          ...items.slice(-2),
        ])
        if (!condensed) setCondensed(true)
        return
      }

      // Check if we can expand
      if (condensed) {
        // Render full breadcrumb off-screen to measure actual width
        const temp = document.createElement('ul')
        temp.style.position = 'absolute'
        temp.style.visibility = 'hidden'
        temp.style.whiteSpace = 'nowrap'
        temp.style.pointerEvents = 'none'
        temp.style.padding = '0'
        temp.style.margin = '0'
        temp.style.font = getComputedStyle(el).font

        items.forEach((item) => {
          const li = document.createElement('li')
          li.style.display = 'inline-block'
          li.textContent = item.label
          temp.appendChild(li)
        })

        document.body.appendChild(temp)
        const fullWidth = temp.scrollWidth
        document.body.removeChild(temp)

        if (fullWidth + EXPAND_MARGIN < clientWidth) {
          setVisibleItems(items)
          setCondensed(false)
        }
      }
    }

    const observer = new ResizeObserver(() => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      debounceTimeout.current = window.setTimeout(
        () => requestAnimationFrame(update),
        debounceMs,
      )
    })

    update()
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [items, condensed, debounceMs])

  return { containerRef, visibleItems, condensed }
}
