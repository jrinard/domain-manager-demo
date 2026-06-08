// Bidirectional mapping between legacy Mastery section types and domain manager types.
// Converts legacy Mastery sections to domain-manager format and back for compatibility.
// Example: "Links" -> "mastery-links" in the domain manager.
// Keeps Mastery-specific sections separate from Home sections.

export const SECTION_TYPE_MAP: Record<string, string> = {
  Header: 'mastery-header',
  Links: 'mastery-links',
  InProgressEnrolledTraining: 'mastery-inprogress-enrolled-training',
  Catalog: 'mastery-catalog',
  RecentTraining: 'mastery-recent-training',
}

export const REVERSE_SECTION_TYPE_MAP: Record<string, string> = Object.entries(
  SECTION_TYPE_MAP,
).reduce(
  (acc, [k, v]) => {
    acc[v] = k
    return acc
  },
  {} as Record<string, string>,
)

export function toMasterySectionType(sectionType: string): string {
  if (typeof sectionType !== 'string') return sectionType
  // normalize incoming legacy variants (kebab, snake, lower, Pascal) to lookup key
  const normalized = sectionType.replace(/[-_\s]/g, '').toLowerCase()
  const normalizedMap: Record<string, string> = {
    header: SECTION_TYPE_MAP['Header'],
    links: SECTION_TYPE_MAP['Links'],
    enrolledtraining: SECTION_TYPE_MAP['EnrolledTraining'],
    inprogressenrolledtraining: SECTION_TYPE_MAP['InProgressEnrolledTraining'],
    catalog: SECTION_TYPE_MAP['Catalog'],
    recenttraining: SECTION_TYPE_MAP['RecentTraining'],
  }
  return normalizedMap[normalized] ?? sectionType
}

export function toLegacySectionType(sectionType: string): string {
  return REVERSE_SECTION_TYPE_MAP[sectionType] ?? sectionType
}

export function mapConfigToMastery(config: any) {
  if (!config || !Array.isArray(config.sections)) return config
  const out = {
    ...config,
    sections: config.sections.map((s: any) => {
      if (s && typeof s.section_type === 'string') {
        return { ...s, section_type: toMasterySectionType(s.section_type) }
      }
      return s
    }),
  }
  return out
}

export function mapConfigToLegacy(config: any) {
  if (!config || !Array.isArray(config.sections)) return config
  const out = {
    ...config,
    sections: config.sections.map((s: any) => {
      if (s && typeof s.section_type === 'string') {
        return { ...s, section_type: toLegacySectionType(s.section_type) }
      }
      return s
    }),
  }
  return out
}
