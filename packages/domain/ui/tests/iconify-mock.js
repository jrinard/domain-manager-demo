import React from 'react'
import { noop } from 'lodash'

// Mock Icon component that doesn't start any timers or async operations
export const Icon = ({ icon, ...props }) => {
  return React.createElement('div', {
    'data-testid': 'mock-icon',
    'data-icon': icon,
    ...props,
  })
}

// Mock iconLoaded function that always returns true
export const iconLoaded = () => true

// Mock addIcon function that does nothing
export const addIcon = noop

// Export as default as well for compatibility
export default { Icon, iconLoaded, addIcon }
