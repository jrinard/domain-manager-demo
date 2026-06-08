import React, { useState } from 'react'

interface ArrayOfNumbersInputProps {
  value: number[] | undefined
  onChange: (value: number[] | undefined) => void
}

export const ArrayOfNumbersInput = ({
  value,
  onChange,
}: ArrayOfNumbersInputProps) => {
  const currentNumbers = Array.isArray(value) ? value : []
  const [inputValue, setInputValue] = useState('')

  const addNumber = () => {
    const num = parseInt(inputValue.trim(), 10)
    if (!isNaN(num) && !currentNumbers.includes(num)) {
      onChange([...currentNumbers, num])
      setInputValue('')
    }
  }

  const removeNumber = (numToRemove: number) => {
    const updated = currentNumbers.filter((n) => n !== numToRemove)
    onChange(updated.length > 0 ? updated : undefined)
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Tag display */}
      {currentNumbers.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {currentNumbers.map((num) => (
            <span
              key={num}
              className="bg-primary-700 border-primary-500 flex items-center gap-1 rounded border px-2 py-0.5 text-xs text-white"
            >
              {num}
              <button
                type="button"
                onClick={() => removeNumber(num)}
                className="ml-1 text-white hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-1">
        <input
          type="number"
          className="border-grayscale-600 bg-grayscale-800 placeholder-grayscale-400 flex-1 rounded border px-2 py-1 text-xs text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addNumber()
            }
          }}
          placeholder="Enter role ID"
        />
        <button
          type="button"
          onClick={addNumber}
          className="bg-primary-600 hover:bg-primary-700 rounded px-3 py-1 text-xs text-white"
        >
          +
        </button>
      </div>
    </div>
  )
}
