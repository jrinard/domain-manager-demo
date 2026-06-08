import { TextBody, Dialog, DialogTrigger } from '@spacedock/falcon-ui'
import {
  HomeSectionWrapper,
  AppLinkSection,
  ButtonSection,
  R3QuadrantsSection,
  R3HeatmapSection,
  R3FullSection,
  TitleSection,
  CarouselsSection,
  WelcomeSection,
  TextSection,
  LogoAndButtonSection,
  ItemsGroupSection,
  CustomTabsSection,
  BADefaultEvents,
  StatsCountSection,
  ActivityTableSection,
  ChartSection,
  CatalogNewsSection,
  OPSection,
  LessonSection,
  SearchSection,
  BannersSection,
  FeaturedContentSection,
  HeaderSection,
  InProgressEnrolledTrainingSection,
  RecentTrainingSection,
  LinksSection,
} from '@domain/ui'
import { TextEditor, PluginPresets } from '@spacedock/md-wysiwyg'
import type { HomeSectionTyped } from '@domain/configs'
import { mergeClasses } from '@falcon/style'
import type { DomainUI } from '@spacedock/manifest'
import React from 'react'

// // import { TeamboardLinkSectionData } from '@domain/schemas'

// TODO This might need a better home.
const TextInlineEditor: React.FC<{
  section: HomeSectionTyped
  renderMode?: 'prod' | 'mock'
  attachments?: DomainUI.Attachment[]
}> = ({ section, renderMode, attachments }) => {
  const content = (section.section_data as any)?.content || ''
  const [open, setOpen] = React.useState(false)
  const [localMd, setLocalMd] = React.useState<string>(content)

  React.useEffect(() => {
    setLocalMd(content)
  }, [content])

  return (
    <div className="relative">
      <TextSection section={section as any} renderMode={renderMode} />
      <div className="absolute right-2 top-2 z-10">
        <Dialog
          title="Edit Text Content"
          closeLabel="Cancel"
          completeLabel="Save"
          action={{
            onClick: () => {
              window.dispatchEvent(
                new CustomEvent('spacedock:section-updated', {
                  detail: {
                    sectionId: section.id,
                    sectionData: { content: localMd },
                  },
                }),
              )
              // also emit a plain update event to force a refresh if targeted update didn't apply
              window.dispatchEvent(new CustomEvent('spacedock:section-updated'))
              setOpen(false)
            },
          }}
          maxWidth="xl"
          open={open}
          onOpenChange={(o) => {
            setOpen(o)
            if (o) setLocalMd(content)
          }}
        >
          <DialogTrigger asChild>
            <button
              className="bg-primary-600 rounded px-2 py-1 text-xs text-white"
              type="button"
            >
              Edit Text
            </button>
          </DialogTrigger>

          <div className="w-full">
            <TextEditor
              markdown={localMd}
              plugins={PluginPresets.TEXT_ONLY_PLUGINS}
              onChange={(md: string) => setLocalMd(md)}
            />
          </div>
        </Dialog>
      </div>
    </div>
  )
}

interface LayoutSectionCardProps {
  domainID?: number
  isSelected?: boolean
  sectionLabel: string
  className?: string
  sectionSubType?: string
  section?: HomeSectionTyped
  renderMode?: 'prod' | 'mock'
  attachments?: DomainUI.Attachment[]
}

export const LayoutSectionCard = ({
  isSelected,
  domainID,
  section,
  sectionLabel,
  attachments,
  className,
  renderMode,
}: LayoutSectionCardProps) => {
  // inline editor buffer removed; modal editor used instead
  // Determine which component to render based on section type
  const renderSectionContent = () => {
    if (!section) {
      return <span>Missing Section Data</span>
    }

    switch (section.section_type) {
      case 'r3-heatmap':
        return (
          // <HomeSectionWrapper section={section}>
          <div
            style={{
              transform: 'scale(0.4)',
              transformOrigin: 'top left',
              width: '250%',
              height: '250%',
            }}
          >
            <R3HeatmapSection section={section} renderMode={renderMode} />
          </div>
          // </HomeSectionWrapper>
        )
      case 'r3-quadrants':
        return (
          // <HomeSectionWrapper section={section}>
          <R3QuadrantsSection section={section} renderMode={renderMode} />
          // </HomeSectionWrapper>
        )
      case 'r3-full':
        return (
          // <HomeSectionWrapper section={section}>
          <R3FullSection section={section} renderMode={renderMode} />
          // </HomeSectionWrapper>
        )
      case 'title':
        return (
          // <HomeSectionWrapper section={section}>
          <TitleSection section={section} renderMode={renderMode} />
          // </HomeSectionWrapper>
        )
      case 'mastery-header':
        return (
          // <HomeSectionWrapper section={section}>
          <HeaderSection
            section={section as any}
            renderMode={renderMode}
            attachments={attachments}
          />
          // </HomeSectionWrapper>
        )
      case 'mastery-inprogress-enrolled-training':
        return (
          <InProgressEnrolledTrainingSection
            section={section as any}
            renderMode={renderMode}
            attachments={attachments}
          />
        )
      case 'mastery-recent-training':
        return (
          <RecentTrainingSection
            section={section as any}
            renderMode={renderMode}
            attachments={attachments}
          />
        )
      case 'mastery-links':
        return (
          <LinksSection
            section={section as any}
            renderMode={renderMode}
            attachments={attachments}
          />
        )
      case 'cvent':
        return (
          <HomeSectionWrapper section={section}>
            <div
              style={{
                transform: 'scale(0.7)',
                transformOrigin: 'top left',
              }}
            >
              <BADefaultEvents
                isLoading={false}
                isRefetching={false}
                updatingRegistration={false}
                events={
                  [
                    {
                      id: '1',
                      title: 'Weekly Team Training Call',
                      start: new Date(
                        Date.now() + 24 * 60 * 60 * 1000,
                      ).toISOString(), // Tomorrow
                      end: new Date(
                        Date.now() + 25 * 60 * 60 * 1000,
                      ).toISOString(),
                      description: 'Join us for our weekly training session',
                      registration: null,
                    },
                    {
                      id: '2',
                      title: 'Product Launch Webinar',
                      start: new Date(
                        Date.now() + 48 * 60 * 60 * 1000,
                      ).toISOString(), // 2 days
                      end: new Date(
                        Date.now() + 49 * 60 * 60 * 1000,
                      ).toISOString(),
                      description: 'Learn about our new product features',
                      registration: { status: 'Accepted' },
                    },
                    {
                      id: '3',
                      title: 'Leadership Summit',
                      start: new Date(
                        Date.now() + 72 * 60 * 60 * 1000,
                      ).toISOString(), // 3 days
                      end: new Date(
                        Date.now() + 76 * 60 * 60 * 1000,
                      ).toISOString(),
                      description: 'Annual leadership summit',
                      registration: null,
                    },
                  ] as any
                }
                webcasts={{}}
                isPreview
                onClickSeeAll={() => {
                  // No-op for preview
                }}
                onClickRegister={() => {
                  // No-op for preview - prevents registration API calls
                }}
                onClickEvent={() => {
                  // No-op for preview
                }}
              />
            </div>
          </HomeSectionWrapper>
        )
      case 'training-carousels':
        return (
          // <HomeSectionWrapper section={section}>
          <CarouselsSection
            section={
              renderMode === 'mock'
                ? {
                    id: 'carousels',
                    section_type: 'training-carousels' as const,
                    metadata: {
                      display_name: 'Live Call Recordings',
                      bgColor: section.metadata?.bgColor || 'transparent',
                    },
                    section_data: {
                      categories: [{ catalogID: 2856383 }],
                      continue_watching_scope:
                        'not-present-in-categories' as const,
                    },
                    layout_position: {
                      areaName: 'carousels',
                    },
                  }
                : section
            }
            renderMode={renderMode}
          />
          // </HomeSectionWrapper>
        )
      case 'link':
        return (
          // <HomeSectionWrapper section={section}>
          <AppLinkSection
            section={section}
            dynamic_section_data={{ domainID } as any}
            attachments={attachments}
            renderMode={renderMode}
          />
          // </HomeSectionWrapper>
        )
      case 'button':
        return (
          <ButtonSection
            section={section}
            dynamic_section_data={{ domainID }}
            renderMode={renderMode}
          />
        )
      case 'welcome':
        return (
          // <HomeSectionWrapper section={section}>
          <WelcomeSection section={section as any} renderMode={renderMode} />
          // </HomeSectionWrapper>
        )
      case 'text': {
        return (
          <TextInlineEditor
            section={section}
            renderMode={renderMode}
            attachments={attachments}
          />
        )
      }
      case 'logo-and-button':
        return (
          <LogoAndButtonSection
            section={section as any}
            domainID={domainID}
            attachments={attachments}
            renderMode={renderMode}
          />
        )
      case 'items-group':
        return (
          <ItemsGroupSection
            section={section as any}
            dynamic_section_data={{ domainID }}
            renderMode={renderMode}
            attachments={attachments}
          />
        )
      case 'custom-tabs':
        return (
          <CustomTabsSection
            section={section}
            dynamic_section_data={{ domainID }}
            renderMode={renderMode}
          />
        )

      case 'activity-table':
        return (
          // <HomeSectionWrapper section={section}>
          <ActivityTableSection section={section} renderMode={renderMode} />
          // </HomeSectionWrapper>
        )
      case 'stats-count':
        return (
          // <HomeSectionWrapper section={section}>
          <StatsCountSection
            section={section}
            dynamic_section_data={{ teamID: 2220968 }}
            renderMode={renderMode ?? 'mock'}
          />
          // </HomeSectionWrapper>
        )
      case 'chart':
        return (
          // <HomeSectionWrapper section={section}>
          <ChartSection section={section} renderMode={renderMode} />
          // </HomeSectionWrapper>
        )
      case 'catalog-news':
        return (
          <CatalogNewsSection
            section={section}
            dynamic_section_data={{ domainID }}
            renderMode={renderMode ?? 'mock'}
          />
        )
      case 'op':
        return (
          <OPSection
            section={section}
            renderMode={renderMode ?? 'mock'}
            domainID={domainID}
            attachments={attachments}
          />
        )
      case 'lesson':
        return (
          <LessonSection
            section={section}
            attachments={attachments}
            renderMode={'prod'}
          />
        )
      case 'search':
        return (
          <SearchSection
            section={section}
            attachments={attachments}
            domainID={domainID}
            renderMode={renderMode ?? 'mock'}
          />
        )
      case 'banners':
        return (
          <BannersSection
            section={section}
            attachments={attachments}
            domainID={domainID}
            renderMode={renderMode ?? 'mock'}
          />
        )
      case 'featured-content':
        return (
          <FeaturedContentSection
            section={section}
            attachments={attachments}
            domainID={domainID}
            renderMode={renderMode ?? 'mock'}
          />
        )
    }

    // Default fallback - show label
    return (
      <TextBody className="absolute left-1/2 top-2 -translate-x-1/2 text-sm font-medium">
        {sectionLabel}
      </TextBody>
    )
  }

  return (
    <div
      className={mergeClasses(
        `outline-grayscale-700 h-full w-full rounded outline-dotted outline-2 outline-offset-[-2px]`,
        isSelected &&
          'outline-primary rounded outline-dotted outline-2 outline-offset-[-2px]',
        className,
      )}
    >
      {renderSectionContent()}
    </div>
  )
}
