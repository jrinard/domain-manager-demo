import React from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import { SubSectionCard } from './SubSectionCard'

interface MenuItemCardProps {
  kind: 'menu-item' | 'custom-tab' | 'link' | 'dropdown' | 'text-only'
  title?: string
  description?: string
  hideIcon?: boolean
  iconName?: string
  functionID?: number
  traitID?: number
  onClick?: () => void
  onAddSection?: () => void
  onDelete?: () => void
  disabled?: boolean
  subSections?: any[]
  sectionIndex?: number
  draggedSubSection?: { sectionIndex: number; subSectionIndex: number } | null
  dragOverSubSection?: { sectionIndex: number; subSectionIndex: number } | null
  onSubSectionDragStart?: (
    e: React.DragEvent,
    sectionIndex: number,
    subSectionIndex: number,
  ) => void
  onSubSectionDragOver?: (
    e: React.DragEvent,
    sectionIndex: number,
    subSectionIndex: number,
  ) => void
  onSubSectionDrop?: (
    e: React.DragEvent,
    sectionIndex: number,
    subSectionIndex: number,
  ) => void
  draggedButton?: {
    sectionIndex: number
    subSectionIndex: number
    buttonIndex: number
  } | null
  dragOverButton?: {
    sectionIndex: number
    subSectionIndex: number
    buttonIndex: number
  } | null
  onButtonDragStart?: (
    sectionIndex: number,
    subSectionIndex: number,
    buttonIndex: number,
  ) => void
  onButtonDragOver?: (
    e: React.DragEvent,
    sectionIndex: number,
    subSectionIndex: number,
    buttonIndex: number,
  ) => void
  onButtonDrop?: (
    e: React.DragEvent,
    sectionIndex: number,
    subSectionIndex: number,
    buttonIndex: number,
  ) => void
  onButtonDragLeave?: () => void
  onEditSubSection?: (subSectionIndex: number) => void
  onDeleteSubSection?: (subSectionIndex: number) => void
  onAddButtonToSubSection?: (subSectionIndex: number) => void
  onEditButtonInSubSection?: (
    subSectionIndex: number,
    buttonIndex: number,
  ) => void
  onDeleteButtonInSubSection?: (
    subSectionIndex: number,
    buttonIndex: number,
  ) => void
}

export const MenuItemCard = ({
  kind,
  title = 'Menu Item',
  description,
  hideIcon,
  iconName,
  onClick,
  onAddSection,
  onDelete,
  disabled = false,
  subSections = [],
  sectionIndex,
  draggedSubSection,
  dragOverSubSection,
  onSubSectionDragStart,
  onSubSectionDragOver,
  onSubSectionDrop,
  draggedButton,
  dragOverButton,
  onButtonDragStart,
  onButtonDragOver,
  onButtonDrop,
  onButtonDragLeave,
  onEditSubSection,
  onDeleteSubSection,
  onAddButtonToSubSection,
  onEditButtonInSubSection,
  onDeleteButtonInSubSection,
}: MenuItemCardProps) => {
  return (
    <div className={`flex flex-col gap-0 ${disabled ? 'opacity-50' : ''}`}>
      <div
        className={`border-grayscale-500 flex min-h-[50px] items-center gap-2 border bg-black px-4 py-2 text-white ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-60'
        }`}
        onClick={disabled ? undefined : onClick}
        onDragOver={(e) => {
          if (draggedButton === null) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      >
        {/* Edit Icon */}
        <Icon icon="square-edit-outline" size="lg" color="current" />

        {!hideIcon && iconName && (
          <Icon icon={iconName} size="lg" color="current" />
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <TextBody
              className={`text-white ${kind === 'link' ? 'underline' : ''}`}
              size="m"
            >
              {title}
            </TextBody>
            {kind === 'dropdown' && (
              <Icon icon="chevron-down" size="sm" color="current" />
            )}
          </div>
          {description && (
            <TextBody className="text-grayscale-400" size="xs">
              {description}
            </TextBody>
          )}
        </div>
        {/* Delete Icon - Hide if disabled or if dropdown has subsections */}
        {!disabled && !(kind === 'dropdown' && subSections.length > 0) && (
          <div
            className="text-grayscale-500 ml-auto cursor-pointer hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.()
            }}
          >
            <Icon icon="close" size="lg" color="current" />
          </div>
        )}
      </div>

      {kind === 'dropdown' && (
        <>
          <div className="border-grayscale-700 bg-grayscale-800 flex max-h-[40px] items-center justify-center gap-2 border border-t-0 px-2 py-1.5">
            <Button
              className="h-[25px]"
              variant="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onAddSection?.()
              }}
            >
              +
            </Button>
            <TextBody className="text-grayscale-400" size="s">
              Sub Section
            </TextBody>
          </div>

          {/* Sub Sections */}
          {draggedSubSection &&
            draggedSubSection.sectionIndex !== sectionIndex &&
            dragOverSubSection?.sectionIndex === sectionIndex &&
            dragOverSubSection?.subSectionIndex === 0 && (
              <div className="ml-5 h-1 border-t-2 border-dashed border-white bg-white" />
            )}
          {subSections.map((subSection, index) => {
            const isDragging =
              draggedSubSection?.sectionIndex === sectionIndex &&
              draggedSubSection?.subSectionIndex === index
            const isDragOver =
              dragOverSubSection?.sectionIndex === sectionIndex &&
              dragOverSubSection?.subSectionIndex === index

            return (
              <SubSectionCard
                key={index}
                title={subSection.title}
                description={subSection.description}
                onClick={() => onEditSubSection?.(index)}
                onDelete={() => onDeleteSubSection?.(index)}
                onAddButton={() => onAddButtonToSubSection?.(index)}
                buttons={subSection.buttons || []}
                onEditButton={(buttonIndex) =>
                  onEditButtonInSubSection?.(index, buttonIndex)
                }
                onDeleteButton={(buttonIndex) =>
                  onDeleteButtonInSubSection?.(index, buttonIndex)
                }
                draggable={sectionIndex !== undefined}
                onDragStart={
                  sectionIndex !== undefined && onSubSectionDragStart
                    ? (e) => onSubSectionDragStart(e, sectionIndex, index)
                    : undefined
                }
                onDragOver={
                  sectionIndex !== undefined && onSubSectionDragOver
                    ? (e) => onSubSectionDragOver(e, sectionIndex, index)
                    : undefined
                }
                onDrop={
                  sectionIndex !== undefined && onSubSectionDrop
                    ? (e) => onSubSectionDrop(e, sectionIndex, index)
                    : undefined
                }
                isDragging={isDragging}
                isDragOver={isDragOver}
                sectionIndex={sectionIndex}
                subSectionIndex={index}
                draggedButton={draggedButton}
                dragOverButton={dragOverButton}
                onButtonDragStart={onButtonDragStart}
                onButtonDragOver={onButtonDragOver}
                onButtonDrop={onButtonDrop}
                onButtonDragLeave={onButtonDragLeave}
              />
            )
          })}
        </>
      )}
    </div>
  )
}
