import React from 'react'
import type { SectionRenderMode } from '@domain/schemas'
import type { MasteryEnrolledTrainingSection as EnrolledSectionType } from '@domain/configs'
import { TextHeading } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'

export interface InProgressEnrolledTrainingProps {
  section: EnrolledSectionType | any
  renderMode?: SectionRenderMode
  attachments?: any[]
}

export const InProgressEnrolledTrainingSection = ({
  section,
  renderMode = 'prod',
}: InProgressEnrolledTrainingProps) => {
  const title =
    section?.metadata?.display_name ||
    (section?.section_data && section.section_data.title) ||
    'In Progress Training'

  return (
    <div className="p-4 bg-grayscale-900 rounded-lg border border-grayscale-800 shadow-sm flex items-start justify-between">
      <div>
        <TextHeading size={4} className="text-white mb-3">
          {title}
        </TextHeading>

        <div className="flex items-start gap-5">
          <div className="flex flex-col gap-2">
            <div className="w-64 h-32 bg-grayscale-800 rounded-2xl border border-grayscale-700" />
            <div className="w-64 text-white text-lg font-semibold">Course Name A</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-64 h-32 bg-grayscale-800 rounded-2xl border border-grayscale-700" />
            <div className="w-64 text-white text-lg font-semibold">Course Name B</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-64 h-32 bg-grayscale-800 rounded-2xl border border-grayscale-700" />
            <div className="w-64 text-white text-lg font-semibold">Course Name C</div>
          </div>
        </div>
      </div>

      <div className="ml-4 text-white opacity-80 self-center">
        <Icon icon="chevron-right" className="h-6 w-6" />
      </div>
    </div>
  )
}

