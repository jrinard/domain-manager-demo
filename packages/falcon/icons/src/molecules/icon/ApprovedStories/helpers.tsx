import React from 'react'
import { Icon, IconProps } from '../Icon'

export const IconStoryWithLabel = ({ icon, size, color }: IconProps) => {
  return (
    <div className="flex flex-col items-center justify-start">
      <Icon color={color} icon={icon} size={size} />
      <span className={`mt-2 whitespace-nowrap text-sm text-secondary`}>
        {icon}
      </span>
    </div>
  )
}
