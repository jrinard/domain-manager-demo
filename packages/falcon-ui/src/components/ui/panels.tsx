'use client'

import * as React from 'react'
import { PanelLeft } from 'lucide-react'

import { mergeClasses as cn } from '@falcon/style'

import { Button, type ButtonProps } from './button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './sheet'

const DIVIDER_WIDTH = 16

const DEFAULT_PANEL_WIDTH = 250
const DEFAULT_MIN_WIDTH = 200
const DEFAULT_MAX_WIDTH = 750

export type PanelsBreakpoint = 'mobile' | 'tablet' | 'desktop'

const BREAKPOINT_PX: Record<PanelsBreakpoint, number> = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
}

function useMediaBelow(maxWidthExclusive: number): boolean {
  const [below, setBelow] = React.useState(false)

  React.useEffect(() => {
    const query = `(max-width: ${maxWidthExclusive - 1}px)`
    const mql = window.matchMedia(query)
    const update = () => setBelow(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [maxWidthExclusive])

  return below
}

function clearSelection() {
  const selection = window.getSelection?.()
  if (selection?.empty) selection.empty()
  else if (selection?.removeAllRanges) selection.removeAllRanges()
}

function cancelSelectEvent(e: Event) {
  e.preventDefault()
}

let selectableLock = false

function setSelectable(enable: boolean) {
  if (enable === selectableLock) return
  selectableLock = enable
  if (enable) {
    document.removeEventListener('selectstart', cancelSelectEvent, false)
    document.removeEventListener('dragstart', cancelSelectEvent, false)
    document.body.classList.remove('unselectable')
  } else {
    clearSelection()
    document.addEventListener('dragstart', cancelSelectEvent, false)
    document.addEventListener('selectstart', cancelSelectEvent, false)
    document.body.classList.add('unselectable')
  }
}

export type FalconPanelConfig = {
  width?: number
  minWidth?: number
  maxWidth?: number
  resizable?: boolean
}

function resolvePanelConfig(
  config: FalconPanelConfig | undefined,
): Required<Omit<FalconPanelConfig, 'resizable'>> & { resizable: boolean } {
  return {
    width: config?.width ?? DEFAULT_PANEL_WIDTH,
    minWidth: config?.minWidth ?? DEFAULT_MIN_WIDTH,
    maxWidth: config?.maxWidth ?? DEFAULT_MAX_WIDTH,
    resizable: config?.resizable !== false,
  }
}

type PanelsContextValue = {
  collapseAt: PanelsBreakpoint
  isCollapsed: boolean
  leftSheetOpen: boolean
  setLeftSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  rightSheetOpen: boolean
  setRightSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleLeft: () => void
  toggleRight: () => void
}

const PanelsContext = React.createContext<PanelsContextValue | null>(null)

export function usePanels() {
  const ctx = React.useContext(PanelsContext)
  if (!ctx) {
    throw new Error('usePanels must be used within a PanelsProvider.')
  }
  return ctx
}

export type PanelsProviderProps = {
  collapseAt?: PanelsBreakpoint
  children: React.ReactNode
}

export function PanelsProvider({
  collapseAt = 'mobile',
  children,
}: PanelsProviderProps) {
  const breakpointPx = BREAKPOINT_PX[collapseAt]
  const isCollapsed = useMediaBelow(breakpointPx)
  const [leftSheetOpen, setLeftSheetOpen] = React.useState(false)
  const [rightSheetOpen, setRightSheetOpen] = React.useState(false)

  const toggleLeft = React.useCallback(() => {
    setLeftSheetOpen((o) => !o)
  }, [])

  const toggleRight = React.useCallback(() => {
    setRightSheetOpen((o) => !o)
  }, [])

  const value = React.useMemo(
    () =>
      ({
        collapseAt,
        isCollapsed,
        leftSheetOpen,
        setLeftSheetOpen,
        rightSheetOpen,
        setRightSheetOpen,
        toggleLeft,
        toggleRight,
      }) satisfies PanelsContextValue,
    [
      collapseAt,
      isCollapsed,
      leftSheetOpen,
      rightSheetOpen,
      toggleLeft,
      toggleRight,
    ],
  )

  return (
    <PanelsContext.Provider value={value}>{children}</PanelsContext.Provider>
  )
}

function useResizeDrag(opts: {
  enabled: boolean
  minWidth: number
  maxWidth: number
  onWidthChange: (next: number) => void
  invertDelta?: boolean
}) {
  const { enabled, minWidth, maxWidth, onWidthChange, invertDelta } = opts
  const dragRef = React.useRef<{
    lastX: number
    width: number
  } | null>(null)

  const onMove = React.useCallback(
    (e: MouseEvent) => {
      if (!dragRef.current) return
      const delta = e.clientX - dragRef.current.lastX
      dragRef.current.lastX = e.clientX
      const applied = invertDelta ? -delta : delta
      const next = dragRef.current.width + applied
      const clamped = Math.min(maxWidth, Math.max(minWidth, next))
      dragRef.current.width = clamped
      onWidthChange(clamped)
    },
    [invertDelta, maxWidth, minWidth, onWidthChange],
  )

  const onUp = React.useCallback(() => {
    setSelectable(true)
    dragRef.current = null
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }, [onMove])

  const onPointerDown = React.useCallback(
    (e: React.MouseEvent, currentWidth: number) => {
      if (!enabled) return
      e.preventDefault()
      setSelectable(false)
      dragRef.current = { lastX: e.clientX, width: currentWidth }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    },
    [enabled, onMove, onUp],
  )

  return onPointerDown
}

export type PanelsProps = {
  mainContent: React.ReactNode
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
  leftPanel?: FalconPanelConfig
  rightPanel?: FalconPanelConfig
  /** When true, left column is omitted (width and sheet). */
  hideLeft?: boolean
  className?: string
  mainClassName?: string
  supplementaryTopOffset?: string
}

const topStackOffset =
  'calc(var(--site-top-height, 0px) + var(--supplementary-top-offset, 0px))'
const panelHeightExpr =
  'calc(100vh - var(--site-top-height, 0px) - var(--supplementary-top-offset, 0px))'
const resizeDividerClassName =
  'hover:bg-bg-contrast-low fixed z-20 cursor-ew-resize border-0 bg-transparent p-0'

export function Panels({
  mainContent,
  leftComponent,
  rightComponent,
  leftPanel: leftPanelCfg,
  rightPanel: rightPanelCfg,
  hideLeft = false,
  className,
  mainClassName,
  supplementaryTopOffset,
}: PanelsProps) {
  const {
    isCollapsed,
    leftSheetOpen,
    setLeftSheetOpen,
    rightSheetOpen,
    setRightSheetOpen,
  } = usePanels()

  const leftCfg = resolvePanelConfig(leftPanelCfg)
  const rightCfg = resolvePanelConfig(rightPanelCfg)

  const [leftWidth, setLeftWidth] = React.useState(leftCfg.width)
  const [rightWidth, setRightWidth] = React.useState(rightCfg.width)

  const hasLeftContent = Boolean(leftComponent)
  const hasLeft = hasLeftContent && !hideLeft
  const hasRight = Boolean(rightComponent)

  React.useEffect(() => {
    setLeftWidth(leftCfg.width)
  }, [leftCfg.width])

  React.useEffect(() => {
    setRightWidth(rightCfg.width)
  }, [rightCfg.width])

  const leftGutter =
    hasLeft && !isCollapsed
      ? leftWidth + (leftCfg.resizable ? DIVIDER_WIDTH : 0)
      : 0
  const rightGutter =
    hasRight && !isCollapsed
      ? rightWidth + (rightCfg.resizable ? DIVIDER_WIDTH : 0)
      : 0

  const onLeftDrag = useResizeDrag({
    enabled: hasLeft && leftCfg.resizable && !isCollapsed,
    minWidth: leftCfg.minWidth,
    maxWidth: leftCfg.maxWidth,
    onWidthChange: setLeftWidth,
  })

  const onRightDrag = useResizeDrag({
    enabled: hasRight && rightCfg.resizable && !isCollapsed,
    minWidth: rightCfg.minWidth,
    maxWidth: rightCfg.maxWidth,
    onWidthChange: setRightWidth,
    invertDelta: true,
  })

  const sheetSideClassName =
    'w-[min(100vw,var(--falcon-panels-sheet-width,85vw))] bg-bg-contrast-low p-0 text-foreground sm:max-w-md [&>button]:hidden'

  const renderLeftBody = () => (
    <div className="flex h-full min-h-0 flex-col overflow-auto">
      {leftComponent}
    </div>
  )

  const renderRightBody = () => (
    <div className="flex h-full min-h-0 flex-col overflow-auto">
      {rightComponent}
    </div>
  )

  const fixedShellClass =
    'fixed z-10 overflow-y-auto overflow-x-hidden whitespace-normal'

  return (
    <div
      className={cn('relative h-full w-full', className)}
      data-falcon-panels
      data-layout={isCollapsed ? 'collapsed' : 'expanded'}
      style={
        {
          '--supplementary-top-offset': supplementaryTopOffset,
        } as React.CSSProperties
      }
    >
      {hasLeftContent && isCollapsed && (
        <Sheet open={leftSheetOpen} onOpenChange={setLeftSheetOpen}>
          <SheetContent
            side="left"
            className={sheetSideClassName}
            style={
              {
                '--falcon-panels-sheet-width': `${Math.min(leftCfg.maxWidth, Math.max(leftCfg.minWidth, leftWidth))}px`,
              } as React.CSSProperties
            }
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Left panel</SheetTitle>
              <SheetDescription>Navigation and tools</SheetDescription>
            </SheetHeader>
            {renderLeftBody()}
          </SheetContent>
        </Sheet>
      )}

      {hasRight && isCollapsed && (
        <Sheet open={rightSheetOpen} onOpenChange={setRightSheetOpen}>
          <SheetContent
            side="right"
            className={sheetSideClassName}
            style={
              {
                '--falcon-panels-sheet-width': `${Math.min(rightCfg.maxWidth, Math.max(rightCfg.minWidth, rightWidth))}px`,
              } as React.CSSProperties
            }
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Right panel</SheetTitle>
              <SheetDescription>Secondary content</SheetDescription>
            </SheetHeader>
            {renderRightBody()}
          </SheetContent>
        </Sheet>
      )}

      {hasLeft && !isCollapsed && (
        <div
          className={cn(fixedShellClass, 'left-0')}
          style={{
            top: topStackOffset,
            width: leftWidth,
            height: panelHeightExpr,
            maxHeight: panelHeightExpr,
          }}
        >
          {renderLeftBody()}
        </div>
      )}

      {hasLeft && !isCollapsed && leftCfg.resizable && (
        <button
          type="button"
          aria-label="Resize left panel"
          className={cn(resizeDividerClassName)}
          style={{
            top: topStackOffset,
            left: leftWidth,
            width: DIVIDER_WIDTH,
            height: panelHeightExpr,
            maxHeight: panelHeightExpr,
          }}
          onMouseDown={(e) => onLeftDrag(e, leftWidth)}
        />
      )}

      {hasRight && !isCollapsed && (
        <div
          className={cn(fixedShellClass, 'right-0')}
          style={{
            top: topStackOffset,
            width: rightWidth,
            height: panelHeightExpr,
            maxHeight: panelHeightExpr,
          }}
        >
          {renderRightBody()}
        </div>
      )}

      {hasRight && !isCollapsed && rightCfg.resizable && (
        <button
          type="button"
          aria-label="Resize right panel"
          className={cn(resizeDividerClassName)}
          style={{
            top: topStackOffset,
            right: rightWidth,
            width: DIVIDER_WIDTH,
            height: panelHeightExpr,
            maxHeight: panelHeightExpr,
          }}
          onMouseDown={(e) => onRightDrag(e, rightWidth)}
        />
      )}

      <div
        className={cn('h-full min-w-0 whitespace-normal', mainClassName)}
        style={
          isCollapsed
            ? { width: '100%' }
            : {
                marginLeft: leftGutter,
                width: `calc(100% - ${leftGutter + rightGutter}px)`,
              }
        }
      >
        {mainContent}
      </div>
    </div>
  )
}

export type PanelsTriggerProps = ButtonProps & {
  side?: 'left' | 'right'
}

export const PanelsTrigger = React.forwardRef<
  HTMLButtonElement,
  PanelsTriggerProps
>(({ side = 'left', className, onClick, children, ...props }, ref) => {
  const { toggleLeft, toggleRight } = usePanels()

  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon"
      className={cn('h-7 w-7', className)}
      onClick={(e) => {
        onClick?.(e)
        if (side === 'right') toggleRight()
        else toggleLeft()
      }}
      {...props}
    >
      {children ?? (
        <>
          <PanelLeft className="size-4" />
          <span className="sr-only">Toggle {side} panel</span>
        </>
      )}
    </Button>
  )
})
PanelsTrigger.displayName = 'PanelsTrigger'
