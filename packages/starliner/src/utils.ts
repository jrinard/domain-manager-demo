export function ensure3(level: number): -1 | 0 | 1 | 2 {
  switch (Math.round(level) % 3) {
    case -1:
      return -1
    case 1:
      return 1
    case 2:
      return 2
    case 0:
    default:
      return 0
  }
}
