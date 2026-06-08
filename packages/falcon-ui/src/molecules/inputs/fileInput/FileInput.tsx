import React, { PropsWithChildren } from 'react'

export interface FileInputProps
  extends PropsWithChildren,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (newFiles: File[]) => void
}

const FileInput = ({ ...props }: FileInputProps) => {
  return (
    <div
      className="relative size-full"
      onDrop={(e) => {
        const file = onDrop(e, props.accept, props.multiple)
        if (file && file.length) {
          props.onChange(file)
        }
      }}
    >
      {props.children}
      <input
        onChange={(e) => {
          const file = onChange(e, props.multiple)
          if (file && file.length) {
            props.onChange(file)
          }
        }}
        accept={props.accept}
        type="file"
        className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
      />
    </div>
  )
}
FileInput.displayName = 'FileInput'

function onChange(e: React.ChangeEvent<HTMLInputElement>, multiple?: boolean) {
  if (e.target && e.target.files) {
    if (multiple) {
      return Array.from(e.target.files)
    }
    return [e.target.files[0]]
  }
}

function onDrop(
  e: React.DragEvent<HTMLDivElement>,
  accept?: string,
  multiple?: boolean
) {
  e.preventDefault()
  if (e.dataTransfer && e.dataTransfer.files) {
    if (!accept) {
      if (multiple) {
        return Array.from(e.dataTransfer.files)
      }
      return [e.dataTransfer.files[0]]
    }
    const fileArr = Array.from(e.dataTransfer.files)
    const filteredFileArr = fileArr.filter((file) => {
      const fileType = file['type']
      if (accept.split(',').find((acceptType) => acceptType === fileType)) {
        return true
      }
      return false
    })
    return filteredFileArr
  }
}

export { FileInput }
