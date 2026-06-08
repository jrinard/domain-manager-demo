export type TitleSubType = 'team' | 'primary-team' | 'person'

export interface TitleSectionData extends Record<string, unknown> {
  sub_type?: TitleSubType
  memberID?: number
  title?: string
}
