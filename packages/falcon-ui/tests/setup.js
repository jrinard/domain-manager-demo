import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/extend-expect'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  void cleanup()
})

global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

global.DOMRect = {
  fromRect: () => ({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
  }),
}

global.PointerEvent = class PointerEvent extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict)
    this.button = eventInitDict.button || 0
    this.ctrlKey = eventInitDict.ctrlKey || false
    this.pointerType = eventInitDict.pointerType || 'mouse'
  }
}
