import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  disabled?: boolean
}

export interface GetResponse extends TytoBaseResponse {
  languages: kvLanguageBCP47[]
}

interface kvLanguageBCP47 {
  languageTagBCP47: string
  lableNaitive: string
  lableFrench: string
  lableEnglish: string
  isTextDesignation: boolean
  isAudioDesignation: boolean
}
