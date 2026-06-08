import React from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'

interface MenuButtonCardProps {
  type: 'link' | 'custom-tab' | 'menu-item' | 'text-only'
  title?: string
  __NAME?: string
  description?: string
  hideIcon?: boolean
  iconName?: string
  onClick?: () => void
  onDelete?: () => void
  draggable?: boolean
  onDragStart?: () => void
  onDragOver?: (e: React.DragEvent) => void
  onDragLeave?: () => void
  onDrop?: (e: React.DragEvent) => void
  isDragging?: boolean
  isDragOver?: boolean
}

export const MenuButtonCard = ({
  type,
  title,
  __NAME,
  description,
  hideIcon,
  iconName,
  onClick,
  onDelete,
  draggable = false,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragging = false,
  isDragOver = false,
}: MenuButtonCardProps) => {
  const displayTitle = title || __NAME || type

  return (
    <div
      className={`border-grayscale-500 ml-10 flex min-h-[40px] items-center gap-2 border bg-black px-4 py-2 text-white hover:opacity-60 ${
        isDragging ? 'opacity-50' : ''
      } ${draggable ? 'cursor-grab' : 'cursor-pointer'} ${
        isDragOver ? 'border-2 border-dashed border-white' : ''
      }`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={(e) => {
        e.stopPropagation()
        onDragStart?.()
      }}
      onDragOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onDragOver?.(e)
      }}
      onDragLeave={(e) => {
        e.stopPropagation()
        onDragLeave?.()
      }}
      onDrop={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onDrop?.(e)
      }}
    >
      {/* Edit Icon */}
      <Icon icon="square-edit-outline" size="sm" color="current" />

      {!hideIcon && iconName && (
        <Icon icon={iconName} size="sm" color="current" />
      )}

      <div className="flex flex-col">
        <TextBody
          className={`text-white ${type === 'link' ? 'underline' : ''}`}
          size="s"
        >
          {displayTitle}
        </TextBody>
        {description && (
          <TextBody className="text-grayscale-400" size="xs">
            {description}
          </TextBody>
        )}
      </div>

      {/* Delete Icon */}
      <div
        className="text-grayscale-500 ml-auto cursor-pointer hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation()
          onDelete?.()
        }}
      >
        <Icon icon="close" size="sm" color="current" />
      </div>
    </div>
  )
}
