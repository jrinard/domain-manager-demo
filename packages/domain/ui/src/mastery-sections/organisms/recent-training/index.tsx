import React from 'react'
import type { SectionRenderMode } from '@domain/schemas'
import type { MasteryRecentTrainingSection as RecentSectionType } from '@domain/configs'
import { TextHeading } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'

export interface RecentTrainingProps {
  section: RecentSectionType | any
  renderMode?: SectionRenderMode
  attachments?: any[]
}

export const RecentTrainingSection = ({
  section,
  renderMode = 'prod',
}: RecentTrainingProps) => {
  const title =
    section?.metadata?.display_name ||
    (section?.section_data && section.section_data.title) ||
    'Recent Training'

  return (
    <div className="p-4 bg-grayscale-900 rounded-lg border border-grayscale-800 shadow-sm flex items-start justify-between">
      <div>
        <TextHeading size={4} className="text-white mb-3">
          {title}
        </TextHeading>

        <div className="flex items-start gap-5">
          <div className="flex flex-col gap-2">
            <div className="w-64 h-32 bg-grayscale-800 rounded-2xl border border-grayscale-700" />
            <div className="w-64 text-white text-lg font-semibold">Recent Course A</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-64 h-32 bg-grayscale-800 rounded-2xl border border-grayscale-700" />
            <div className="w-64 text-white text-lg font-semibold">Recent Course B</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-64 h-32 bg-grayscale-800 rounded-2xl border border-grayscale-700" />
            <div className="w-64 text-white text-lg font-semibold">Recent Course C</div>
          </div>
        </div>
      </div>

      <div className="ml-4 text-white opacity-80 self-center">
        <Icon icon="chevron-right" className="h-6 w-6" />
      </div>
    </div>
  )
}

