export type DiscGraphValues = {
  d3: number
  i3: number
  s3: number
  c3: number
  d2: number
  i2: number
  s2: number
  c2: number
  d1: number
  i1: number
  s1: number
  c1: number
  styleKey3: string
}

export type IncompleteDiscGraphValues = Pick<DiscGraphValues, 'styleKey3'>

export type DiscGraphValuesExtended = DiscGraphValues & {
  personID: number
  personName: string
}
