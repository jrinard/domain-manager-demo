export const mockTextFile = (extension: string, size: number): File => {
  const fileName =
    (Math.random() * 1000).toString().replace('.', '') + extension.toLowerCase()

  const file = new File([''], fileName, { type: 'text/plain' })

  Object.defineProperty(file, 'size', { value: size })

  return file
}
