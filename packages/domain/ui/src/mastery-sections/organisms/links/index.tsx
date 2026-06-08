import React from 'react'
import type { SectionRenderMode } from '@domain/schemas'
import type { MasteryLinksSection as LinksSectionType } from '@domain/configs'
import { Icon } from '@falcon/icons'

export interface LinksSectionProps {
  section: LinksSectionType | any
  renderMode?: SectionRenderMode
  attachments?: any[]
}

export const LinksSection = ({ section }: LinksSectionProps) => {
  const title =
    section?.metadata?.display_name || (section?.section_data && section.section_data.title) || 'Links'

  return (
    <div className="p-4 bg-grayscale-900 rounded-lg border border-grayscale-800 shadow-sm">
      <div className="flex items-center gap-1">
        <div className="text-white opacity-90">
          <Icon icon="filter-variant" className="h-5 w-5" />
        </div>
        <div className="text-white font-medium">Filter</div>

        <div className="relative flex-none max-w-[150px]">
          <input
            className="w-full pl-4 pr-10 py-2 bg-grayscale-800 text-grayscale-300 placeholder-grayscale-500 rounded-[25px] outline-none"
            placeholder="Search"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-grayscale-400">
            <Icon icon="search" className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {(function renderTopButtons() {
            const data = section?.section_data || {}
            const items: Array<{ key: string; enabled: boolean; text: string }> = [
              {
                key: 'enrolled',
                enabled: !!data.showEnrolledTrainingLink,
                text: data.enrolledTrainingLinkText || 'Enrolled Training',
              },
              {
                key: 'assignments',
                enabled: !!data.showAssignmentsLink,
                text: data.assignmentsButtonText || 'Assignments',
              },
              {
                key: 'teamHistory',
                enabled: !!data.showTeamHistoryLink,
                text: data.teamHistoryButtonText || 'Team Reports',
              },
              {
                key: 'history',
                enabled: !!data.showHistoryLink,
                text: data.historyButtonText || 'History',
              },
              {
                key: 'transcript',
                enabled: !!data.showTranscriptLink,
                text: data.transcriptButtonText || 'Transcript',
              },
              {
                key: 'certifications',
                enabled: !!data.showCertificationsLink,
                text: data.certificationsButtonText || 'Certificates',
              },
            ]

            return items
              .filter((i) => i.enabled)
              .map((it) => (
                <button
                  key={it.key}
                  className="bg-grayscale-800 text-white rounded-md w-36 h-8 text-sm flex items-center justify-center border border-grayscale-700"
                >
                  {it.text}
                </button>
              ))
          })()}
        </div>
      </div>

      <div className="mt-5 border-t border-grayscale-800" />
    </div>
  )
}

