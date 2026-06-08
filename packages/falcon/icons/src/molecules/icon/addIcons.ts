import { addIcon } from '@iconify/react'

// Track if icons have been added to avoid duplicate registration
let iconsAdded = false

export const addIcons = () => {
  // Guard against SSR/Node.js environments and test environments
  if (typeof window === 'undefined' || iconsAdded) {
    return
  }

  iconsAdded = true

  addIcon('falcon-ui:account-star-check', {
    body: '<path fill="currentcolor" d="m5.318 11.078 1.94 1.18-.515-2.224 1.742-1.489-2.288-.197-.879-2.09-.894 2.09-2.272.197 1.726 1.489-.539 2.224 1.98-1.18Zm16.871-.331 1.204 1.213-5.617 5.67-2.986-3.012 1.205-1.213 1.78 1.79 4.414-4.448Zm-9.55 3.871 2.582 2.581H6.618v-1.72c0-1.902 3.08-3.441 6.882-3.441l1.626.094-2.486 2.486Zm.86-11.183a3.441 3.441 0 110 6.882 3.441 3.441 0 010-6.882Z"/>',
    width: 26,
    height: 24,
  })
  addIcon('falcon-ui:pie-chart', {
    body: '<path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10h10Z"/>',
    width: 24,
    height: 24,
  })
}
