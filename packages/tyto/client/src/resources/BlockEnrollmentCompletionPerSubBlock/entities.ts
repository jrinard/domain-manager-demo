export interface Person {
  personID: number
  givenName: string
  familyName: string
  primaryElementID: number
  hasViewEnrollment: boolean
  blockEnrollmentSummary: Block[]
}

export interface Block {
  seq: number
  blockID: number
  blockTitle?: string
  requiredStepCount: number
  cntComplete?: number
}
