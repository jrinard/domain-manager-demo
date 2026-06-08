import React from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import { MenuButtonCard } from './MenuButtonCard'

interface SubSectionCardProps {
  title?: string
  description?: string
  onClick?: () => void
  onDelete?: () => void
  onAddButton?: () => void
  buttons?: any[]
  onEditButton?: (buttonIndex: number) => void
  onDeleteButton?: (buttonIndex: number) => void
  draggable?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  isDragging?: boolean
  isDragOver?: boolean
  sectionIndex?: number
  subSectionIndex?: number
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
}

export const SubSectionCard = ({
  title = 'Sub Button',
  description,
  onClick,
  onDelete,
  onAddButton,
  buttons = [],
  onEditButton,
  onDeleteButton,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging = false,
  isDragOver = false,
  sectionIndex,
  subSectionIndex,
  draggedButton,
  dragOverButton,
  onButtonDragStart,
  onButtonDragOver,
  onButtonDrop,
  onButtonDragLeave,
}: SubSectionCardProps) => {
  return (
    <div className="ml-5 flex flex-col gap-0">
      {/* Visual indicator line above when dragging over */}
      {isDragOver && (
        <div className="h-1 border-t-2 border-dashed border-white bg-white" />
      )}
      <div
        className={`border-grayscale-500 flex min-h-[50px] items-center gap-2 border bg-black px-4 py-2 text-white hover:opacity-60 ${
          isDragging ? 'opacity-50' : ''
        } ${draggable ? 'cursor-grab' : 'cursor-pointer'} ${
          isDragOver ? 'border-2 border-white bg-white/10' : ''
        }`}
        onClick={onClick}
        draggable={draggable}
        onDragStart={(e) => {
          e.stopPropagation()
          onDragStart?.(e)
        }}
        onDragOver={(e) => {
          // Only handle drag over if it's a sub-section drag, not a button drag
          if (draggedButton === null) {
            e.preventDefault()
            e.stopPropagation()
            onDragOver?.(e)
          }
        }}
        onDrop={(e) => {
          // Only handle drop if it's a sub-section drag, not a button drag
          if (draggedButton === null) {
            e.preventDefault()
            e.stopPropagation()
            onDrop?.(e)
          }
        }}
      >
        {/* Edit Icon */}
        <Icon icon="square-edit-outline" size="lg" color="current" />

        <div className="flex flex-col">
          <TextBody className="text-primary" size="m">
            {title}
          </TextBody>
          {description && (
            <TextBody className="text-grayscale-400" size="xs">
              {description}
            </TextBody>
          )}
        </div>

        {/* Delete Icon - only show if no buttons */}
        {buttons.length === 0 && (
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

      {/* Buttons in this sub section */}
      {buttons.map((button, index) => {
        const isButtonDragging =
          draggedButton?.sectionIndex === sectionIndex &&
          draggedButton?.subSectionIndex === subSectionIndex &&
          draggedButton?.buttonIndex === index
        const isButtonDragOver =
          dragOverButton?.sectionIndex === sectionIndex &&
          dragOverButton?.subSectionIndex === subSectionIndex &&
          dragOverButton?.buttonIndex === index

        return (
          <MenuButtonCard
            key={index}
            type={button.type}
            title={button.title}
            __NAME={button.__NAME}
            description={button.description}
            hideIcon={button.hideIcon}
            iconName={button.ccIconName}
            onClick={() => onEditButton?.(index)}
            onDelete={() => onDeleteButton?.(index)}
            draggable={
              sectionIndex !== undefined && subSectionIndex !== undefined
            }
            onDragStart={
              sectionIndex !== undefined &&
              subSectionIndex !== undefined &&
              onButtonDragStart
                ? () => onButtonDragStart(sectionIndex, subSectionIndex, index)
                : undefined
            }
            onDragOver={
              sectionIndex !== undefined &&
              subSectionIndex !== undefined &&
              onButtonDragOver
                ? (e) =>
                    onButtonDragOver(e, sectionIndex, subSectionIndex, index)
                : undefined
            }
            onDragLeave={onButtonDragLeave}
            onDrop={
              sectionIndex !== undefined &&
              subSectionIndex !== undefined &&
              onButtonDrop
                ? (e) => onButtonDrop(e, sectionIndex, subSectionIndex, index)
                : undefined
            }
            isDragging={isButtonDragging}
            isDragOver={isButtonDragOver}
          />
        )
      })}

      {/* New Button/Link area */}
      <div className="border-grayscale-700 bg-grayscale-800 flex max-h-[40px] items-center justify-center gap-2 border border-t-0 px-2 py-1.5">
        <Button
          className="h-[25px]"
          variant="primary"
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onAddButton?.()
          }}
        >
          +
        </Button>
        <TextBody className="text-grayscale-400" size="s">
          Button/Link
        </TextBody>
      </div>
    </div>
  )
}
