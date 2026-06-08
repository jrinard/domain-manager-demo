import React, { useRef, useEffect, useState } from 'react'
import { MenuConfig, MenuButton, ToggleSection } from '@domain/configs'
import { MenuItemCard } from './MenuItemCard'
import { useMenuDragAndDrop } from './dnd/useMenuDragAndDrop'
import { mergeClasses } from '@falcon/style'

interface MenuBuilderEditorProps {
  config: MenuConfig
  disabled?: boolean
  onConfigChange: (config: MenuConfig) => void
  onEditTopButton: (index: number) => void
  onEditToggleSection: (index: number) => void
  onDeleteTopButton: (index: number) => void
  onDeleteToggleSection: (index: number) => void
  onAddSubSection: (sectionIndex: number) => void
  onEditSubSection: (sectionIndex: number, subSectionIndex: number) => void
  onDeleteSubSection: (sectionIndex: number, subSectionIndex: number) => void
  onAddButtonToSubSection: (
    sectionIndex: number,
    subSectionIndex: number,
  ) => void
  onEditButtonInSubSection: (
    sectionIndex: number,
    subSectionIndex: number,
    buttonIndex: number,
  ) => void
  onDeleteButtonInSubSection: (
    sectionIndex: number,
    subSectionIndex: number,
    buttonIndex: number,
  ) => void
}

export const MenuBuilderEditor = ({
  config,
  disabled,
  onConfigChange,
  onEditTopButton,
  onEditToggleSection,
  onDeleteTopButton,
  onDeleteToggleSection,
  onAddSubSection,
  onEditSubSection,
  onDeleteSubSection,
  onAddButtonToSubSection,
  onEditButtonInSubSection,
  onDeleteButtonInSubSection,
}: MenuBuilderEditorProps) => {
  const topScrollRef = useRef<HTMLDivElement>(null)
  const contentScrollRef = useRef<HTMLDivElement>(null)

  // Extract all drag-and-drop logic to hook
  const {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    draggedSubSection,
    dragOverSectionIndex,
    dragOverSubSection,
    handleSubSectionDragStart,
    handleSubSectionDragOver,
    handleSubSectionDragLeave,
    handleSubSectionDrop,
    draggedButton,
    dragOverButton,
    handleButtonDragStart,
    handleButtonDragOver,
    handleButtonDragLeave,
    handleButtonDrop,
    handleDragEnd,
    topLevelItems,
  } = useMenuDragAndDrop({ config, onConfigChange })

  const handleTopScroll = () => {
    if (topScrollRef.current && contentScrollRef.current) {
      contentScrollRef.current.scrollLeft = topScrollRef.current.scrollLeft
    }
  }

  const handleContentScroll = () => {
    if (topScrollRef.current && contentScrollRef.current) {
      topScrollRef.current.scrollLeft = contentScrollRef.current.scrollLeft
    }
  }

  useEffect(() => {
    const updateScrollWidth = () => {
      const contentDiv = contentScrollRef.current
      if (contentDiv && topScrollRef.current) {
        const innerDiv = topScrollRef.current.querySelector('div')
        if (innerDiv) {
          innerDiv.style.width = `${contentDiv.scrollWidth}px`
        }
      }
    }

    updateScrollWidth()
    const timeoutId = setTimeout(updateScrollWidth, 100)

    const contentDiv = contentScrollRef.current
    if (contentDiv) {
      const resizeObserver = new ResizeObserver(updateScrollWidth)
      resizeObserver.observe(contentDiv)

      return () => {
        clearTimeout(timeoutId)
        resizeObserver.disconnect()
      }
    }

    return () => clearTimeout(timeoutId)
  }, [config])

  // Measure container height
  const [containerHeight, setContainerHeight] = useState(100)

  useEffect(() => {
    const measureHeight = () => {
      const container = contentScrollRef.current
      if (!container) return

      const items = container.querySelectorAll('.menu-item-card-wrapper')
      let maxHeight = 0
      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        if (rect.height > maxHeight) {
          maxHeight = rect.height
        }
      })

      if (maxHeight > 0) {
        setContainerHeight(maxHeight + 20)
      }
    }

    const timeoutId = setTimeout(measureHeight, 100)
    const resizeObserver = new ResizeObserver(measureHeight)
    if (contentScrollRef.current) {
      resizeObserver.observe(contentScrollRef.current)
    }

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
    }
  }, [topLevelItems])

  return (
    <div
      className={mergeClasses(
        'flex w-full flex-col gap-0',
        disabled && 'pointer-events-none opacity-40',
      )}
    >
      {/* Top scrollbar */}
      <div
        ref={topScrollRef}
        className="border-grayscale-600 h-5 w-full overflow-x-auto overflow-y-hidden rounded-t border border-b-0 bg-[#1a1a1a]"
        onScroll={handleTopScroll}
      >
        <div className="h-px w-[2000px]" />
      </div>

      {/* Content */}
      <div
        ref={contentScrollRef}
        className="border-grayscale-600 w-full overflow-x-auto rounded-b border-2 border-dotted bg-black p-4"
        onScroll={handleContentScroll}
        style={{ minHeight: `${containerHeight}px` }}
      >
        <div className="flex w-max min-w-full flex-row gap-4">
          {topLevelItems.map((item, index) => {
            const isDragging = draggedIndex === index
            const isDragOver = dragOverIndex === index

            if (item.type === 'button') {
              const button = item.data as MenuButton
              return (
                <div
                  key={`button-${item.index}`}
                  className={`w-[200px] flex-shrink-0 cursor-grab active:cursor-grabbing ${
                    isDragging ? 'opacity-50' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <MenuItemCard
                    kind={button.type}
                    title={button.title}
                    description={button.description}
                    hideIcon={button.hideIcon}
                    iconName={button.ccIconName}
                    functionID={button.functionID}
                    traitID={button.traitID}
                    onClick={() => onEditTopButton(item.index)}
                    onDelete={() => onDeleteTopButton(item.index)}
                  />
                </div>
              )
            } else {
              const section = item.data as ToggleSection
              const isSubSectionDragOver =
                dragOverSectionIndex === item.index &&
                draggedSubSection !== null &&
                draggedSubSection.sectionIndex !== item.index

              return (
                <div
                  key={`section-${item.index}`}
                  className={`w-[200px] flex-shrink-0 cursor-grab active:cursor-grabbing ${
                    isDragging ? 'opacity-50' : ''
                  } ${
                    (isDragOver && draggedIndex !== null) ||
                    isSubSectionDragOver
                      ? 'border-2 border-dashed border-white'
                      : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => {
                    // Only handle if not a button drag
                    if (draggedButton === null) {
                      // Handle top-level section drag
                      handleDragOver(e, index)
                      // Handle sub-section drag (for moving between sections)
                      handleSubSectionDragOver(e, item.index)
                    }
                  }}
                  onDragLeave={(e) => {
                    handleDragLeave()
                    // Only clear sub-section drag over if leaving the section entirely
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX
                    const y = e.clientY
                    if (
                      x < rect.left ||
                      x > rect.right ||
                      y < rect.top ||
                      y > rect.bottom
                    ) {
                      handleSubSectionDragLeave()
                    }
                  }}
                  onDrop={(e) => {
                    // Handle top-level section drop
                    handleDrop(e, index)
                    // Handle sub-section drop
                    handleSubSectionDrop(e, item.index)
                  }}
                  onDragEnd={handleDragEnd}
                >
                  <MenuItemCard
                    kind="dropdown"
                    title={section.title}
                    description={section.description}
                    hideIcon={section.hideIcon}
                    iconName={section.ccIconName}
                    onClick={() => onEditToggleSection(item.index)}
                    onAddSection={() => onAddSubSection(item.index)}
                    onDelete={() => onDeleteToggleSection(item.index)}
                    subSections={section.categories || []}
                    sectionIndex={item.index}
                    draggedSubSection={draggedSubSection}
                    dragOverSubSection={dragOverSubSection}
                    onSubSectionDragStart={handleSubSectionDragStart}
                    onSubSectionDragOver={(e, sectionIndex, subSectionIndex) =>
                      handleSubSectionDragOver(e, sectionIndex, subSectionIndex)
                    }
                    onSubSectionDrop={(e, sectionIndex, subSectionIndex) =>
                      handleSubSectionDrop(e, sectionIndex, subSectionIndex)
                    }
                    draggedButton={draggedButton}
                    dragOverButton={dragOverButton}
                    onButtonDragStart={handleButtonDragStart}
                    onButtonDragOver={handleButtonDragOver}
                    onButtonDrop={handleButtonDrop}
                    onButtonDragLeave={handleButtonDragLeave}
                    onEditSubSection={(subSectionIndex) =>
                      onEditSubSection(item.index, subSectionIndex)
                    }
                    onDeleteSubSection={(subSectionIndex) =>
                      onDeleteSubSection(item.index, subSectionIndex)
                    }
                    onAddButtonToSubSection={(subSectionIndex) =>
                      onAddButtonToSubSection(item.index, subSectionIndex)
                    }
                    onEditButtonInSubSection={(subSectionIndex, buttonIndex) =>
                      onEditButtonInSubSection(
                        item.index,
                        subSectionIndex,
                        buttonIndex,
                      )
                    }
                    onDeleteButtonInSubSection={(
                      subSectionIndex,
                      buttonIndex,
                    ) =>
                      onDeleteButtonInSubSection(
                        item.index,
                        subSectionIndex,
                        buttonIndex,
                      )
                    }
                  />
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}
