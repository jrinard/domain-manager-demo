import { TytoData } from '@spacedock/manifest'

import { createAsset } from './Asset'

export const createLesson = (
  overrides?: Partial<TytoData.Lesson>,
): TytoData.Lesson => {
  const asset = createAsset()
  const nowISOString = new Date().toISOString()

  return {
    activeStatus: 'ocENABLED',
    assetDate: nowISOString,
    assets: [asset],
    assetType: asset.assetType,
    attributeFile: '',
    ...{
      certifyMemberID: 123,
      certifyType: 'ocNOCERTIFY',
      certifyemail: '',
      commandLine: '',
      createdByID: 123,
      createdDate: nowISOString,
      createdName: 'Test User',
      creditUnitDesc: '',
      creditUnits: 0,
      domainID: 123,
      eventLocation: '',
      expirationDate: nowISOString,
      exposureCalc: 'ocSHARED',
      hasAddDraft: true,
      hasAddShare: false,
      hasChange: true,
      hasDelete: true,
      hasRecommitEnabledAsset: true,
      hasReview: false,
      hasView: true,
      hasViewOriginal: true,
      isAnswerKey: false,
      isAutoRecert: false,
      isCredit: false,
      isManualRecert: false,
      isResource: false,
      itemType: 'ocImage',
      keywordStringArray: [],
      lastReviewDate: nowISOString,
      launchBehavior: 0,
      launchCount: 0,
      lessonDesc: '',
      lessonID: 123,
      lessonItemType: 'ocDOCUMENT',
      lessonName: 'Test Lesson',
      lessonPolicyID: 0,
      locID: 123,
      masteryScore: 0,
      maxBrowse: 10_000,
      maxReview: 10_000,
      maxTimeAllowed: '0',
      maxToComplete: 0,
      maxToPass: 0,
      modifiedByID: 123,
      modifiedDate: nowISOString,
      moduleID: '123',
      name: 'Test Lesson',
      ocType: 'ocLESSON',
      recertificationTime: oneYearFromNowISOString(),
      restrictOriginal: 'ocDISABLED',
      reviewedByID: 123,
      setCompletion: 0,
      setStatus: 0,
      standardConversationStatus: 'ocENABLED',
      teamRoot: 123,
      timeLimitAction: '',
      timeLimitMsg: '',
    },
    ...overrides,
  }
}

function oneYearFromNowISOString() {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)

  return date.toISOString()
}
