import React from 'react'
import { noop } from 'lodash'
import { render, screen, fireEvent } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'
import {
  ComboButton,
  ComboButtonMain,
  ComboButtonAction,
  ComboButtonMenu,
  ComboButtonMenuItem,
} from './ComboButton'

describe('ComboButton', () => {
  it('renders main button and action button', () => {
    const mainClick = vi.fn()
    const actionClick = vi.fn()

    render(
      <ComboButton>
        <ComboButtonMain onClick={mainClick}>Download File</ComboButtonMain>
        <ComboButtonAction
          icon="content-copy"
          onClick={actionClick}
          data-testid="action-button"
        />
      </ComboButton>,
    )

    expect(screen.getByText('Download File')).toBeInTheDocument()
    expect(screen.getByTestId('action-button')).toBeInTheDocument()
  })

  it('calls main button onClick when clicked', () => {
    const mainClick = vi.fn()
    const actionClick = vi.fn()

    render(
      <ComboButton>
        <ComboButtonMain onClick={mainClick}>Download File</ComboButtonMain>
        <ComboButtonAction icon="content-copy" onClick={actionClick} />
      </ComboButton>,
    )

    fireEvent.click(screen.getByText('Download File'))
    expect(mainClick).toHaveBeenCalledTimes(1)
    expect(actionClick).not.toHaveBeenCalled()
  })

  it('calls action button onClick when clicked', () => {
    const mainClick = vi.fn()
    const actionClick = vi.fn()

    render(
      <ComboButton>
        <ComboButtonMain onClick={mainClick}>Download File</ComboButtonMain>
        <ComboButtonAction
          icon="content-copy"
          onClick={actionClick}
          data-testid="action-button"
        />
      </ComboButton>,
    )

    fireEvent.click(screen.getByTestId('action-button'))
    expect(actionClick).toHaveBeenCalledTimes(1)
    expect(mainClick).not.toHaveBeenCalled()
  })

  it('renders menu items when using ComboButtonMenu', () => {
    const menuItemClick = vi.fn()

    render(
      <ComboButton>
        <ComboButtonMain>Download File</ComboButtonMain>
        <ComboButtonMenu icon="chevron-down">
          <ComboButtonMenuItem onClick={menuItemClick}>
            Copy to clipboard
          </ComboButtonMenuItem>
          <ComboButtonMenuItem>Share file</ComboButtonMenuItem>
        </ComboButtonMenu>
      </ComboButton>,
    )

    // Menu items should not be visible initially
    expect(screen.queryByText('Copy to clipboard')).not.toBeInTheDocument()

    // Click menu trigger to open menu (second button in the combo)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    fireEvent.click(buttons[1])

    // Menu items should now be visible
    expect(screen.getByText('Copy to clipboard')).toBeInTheDocument()
    expect(screen.getByText('Share file')).toBeInTheDocument()
  })

  it('applies disabled state to both buttons', () => {
    render(
      <ComboButton disabled>
        <ComboButtonMain data-testid="main-button">
          Download File
        </ComboButtonMain>
        <ComboButtonAction icon="content-copy" data-testid="action-button" />
      </ComboButton>,
    )

    expect(screen.getByTestId('main-button')).toBeDisabled()
    expect(screen.getByTestId('action-button')).toBeDisabled()
  })

  it('throws error when missing ComboButtonMain', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(noop)

    expect(() => {
      render(
        <ComboButton>
          <ComboButtonAction icon="content-copy" />
        </ComboButton>,
      )
    }).toThrow('ComboButton requires a ComboButtonMain child')

    consoleSpy.mockRestore()
  })

  it('throws error when missing action or menu', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(noop)

    expect(() => {
      render(
        <ComboButton>
          <ComboButtonMain>Download</ComboButtonMain>
        </ComboButton>,
      )
    }).toThrow(
      'ComboButton requires either a ComboButtonAction or ComboButtonMenu child',
    )

    consoleSpy.mockRestore()
  })

  it('throws error when both action and menu are present', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(noop)

    expect(() => {
      render(
        <ComboButton>
          <ComboButtonMain>Download</ComboButtonMain>
          <ComboButtonAction icon="copy" />
          <ComboButtonMenu icon="menu">
            <ComboButtonMenuItem>Item</ComboButtonMenuItem>
          </ComboButtonMenu>
        </ComboButton>,
      )
    }).toThrow(
      'ComboButton cannot have both ComboButtonAction and ComboButtonMenu children',
    )

    consoleSpy.mockRestore()
  })

  it('applies variant and size props correctly', () => {
    render(
      <ComboButton variant="secondary" size="text" data-testid="combo-button">
        <ComboButtonMain data-testid="main-button">
          Download File
        </ComboButtonMain>
        <ComboButtonAction icon="content-copy" data-testid="action-button" />
      </ComboButton>,
    )

    const comboButton = screen.getByTestId('combo-button')
    expect(comboButton).toHaveClass(
      'inline-flex',
      'rounded-md',
      'overflow-hidden',
    )
  })
})
