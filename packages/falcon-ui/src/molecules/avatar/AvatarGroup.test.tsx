import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AvatarGroup } from './AvatarGroup'
import { AvatarProps } from './Avatar'

describe('AvatarGroup', () => {
  const testList: AvatarProps[] = [
    { src: '1', name: '1' },
    { src: '2', name: '2' },
    { src: '3', name: '3' },
    { src: '4', name: '4' },
    { src: '5', name: '5' },
  ]
  it('only renders 3 when max=undefined', () => {
    const { baseElement } = render(<AvatarGroup list={testList} />)
    // Note that the 4 assertion is due to displaying "+2"
    expect(baseElement.firstChild?.firstChild?.childNodes).lengthOf(4)
    expect(screen.getByText('+2')).toBeInTheDocument()
  })
  it('all rendered when max=0', () => {
    const { baseElement } = render(<AvatarGroup list={testList} max={0} />)
    expect(baseElement.firstChild?.firstChild?.childNodes).lengthOf(5)
  })
  it('partial rendered when max=3', () => {
    const { baseElement } = render(<AvatarGroup list={testList} max={3} />)
    expect(baseElement.firstChild?.firstChild?.childNodes).lengthOf(4)
    expect(screen.getByText('+2')).toBeInTheDocument()
  })
})
