import React from 'react'
import { ToggleGroup } from '@spacedock/falcon-ui'
import { TextHeading, TextBody } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'

interface LayoutEditSectionPanelProps {
  selectedSection: string | null
  selectedPlacedSection: string | null
  placedSections: any[]

  // Section dimensions
  selectedDisplayName: string
  setSelectedDisplayName: (value: string) => void
  selectedBgColor: string
  setSelectedBgColor: (value: string) => void

  // Title configuration
  titleVariation: 'team' | 'person'
  setTitleVariation: (value: 'team' | 'person') => void
  selectedTitleText: string
  setSelectedTitleText: (value: string) => void

  // Carousels configuration
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedContinueWatchingScope: string
  setSelectedContinueWatchingScope: (value: string) => void
  selectedStatusFilters: string[]
  setSelectedStatusFilters: React.Dispatch<React.SetStateAction<string[]>>

  // Link configuration
  selectedLinkType: string
  setSelectedLinkType: (value: string) => void

  // Stats Count configuration
  selectedStatsSubType: string
  setSelectedStatsSubType: (value: string) => void
  selectedStatsIconName: string
  setSelectedStatsIconName: (value: string) => void
  selectedStatsIconColorScheme: string
  setSelectedStatsIconColorScheme: (value: string) => void
  selectedStatsTeamSource: 'primary' | 'specific'
  setSelectedStatsTeamSource: (value: 'primary' | 'specific') => void
  selectedStatsTeamID: string
  setSelectedStatsTeamID: (value: string) => void
  selectedAlignment?: 'left' | 'center' | 'right'
  setSelectedAlignment?: (
    value: 'left' | 'center' | 'right' | undefined,
  ) => void

  // Actions
  handleSaveSection: () => void
  handleDownloadConfig: () => void
  onTitleVariationChange: (variation: 'team' | 'person') => void
}

export const LayoutEditSectionPanel = ({
  selectedSection,
  selectedPlacedSection,
  placedSections,
  selectedDisplayName,
  setSelectedDisplayName,
  selectedBgColor,
  setSelectedBgColor,
  titleVariation,
  setTitleVariation,
  selectedAlignment,
  setSelectedAlignment,
  selectedTitleText,
  setSelectedTitleText,
  selectedCategory,
  setSelectedCategory,
  selectedContinueWatchingScope,
  setSelectedContinueWatchingScope,
  selectedStatusFilters,
  setSelectedStatusFilters,
  selectedLinkType,
  setSelectedLinkType,
  selectedStatsSubType,
  setSelectedStatsSubType,
  selectedStatsIconName,
  setSelectedStatsIconName,
  selectedStatsIconColorScheme,
  setSelectedStatsIconColorScheme,
  selectedStatsTeamSource,
  setSelectedStatsTeamSource,
  selectedStatsTeamID,
  setSelectedStatsTeamID,
  handleSaveSection,
  handleDownloadConfig,
  onTitleVariationChange,
}: LayoutEditSectionPanelProps) => {
  // Helper to check if a section type is currently selected
  const isSectionType = (...keywords: string[]) => {
    const checkLabel = (label: string) =>
      keywords.some((keyword) => label.toLowerCase().includes(keyword))

    if (selectedPlacedSection) {
      const section = placedSections.find((s) => s.id === selectedPlacedSection)
      return section ? checkLabel(section.label) : false
    }

    return selectedSection ? checkLabel(selectedSection) : false
  }

  return (
    <div className="border-grayscale-600 bg-grayscale-800 w-64 rounded-lg border p-3">
      <TextHeading size={4} className="mb-4 text-white">
        Edit Section
      </TextHeading>
      {selectedSection || selectedPlacedSection ? (
        <div className="space-y-4">
          {/* Section Label and Dimensions */}
          <div className="bg-grayscale-900 rounded-md p-3">
            <TextBody className="mb-2 text-sm font-medium text-white">
              {selectedPlacedSection
                ? placedSections.find((s) => s.id === selectedPlacedSection)
                    ?.label || 'Section'
                : selectedSection
                  ? selectedSection.charAt(0).toUpperCase() +
                    selectedSection.slice(1)
                  : 'Section'}
            </TextBody>
            <TextBody className="text-sm text-gray-400">
              {selectedPlacedSection
                ? (() => {
                    const section = placedSections.find(
                      (s) => s.id === selectedPlacedSection,
                    )
                    return section
                      ? `${section.columnSpan}x${section.rowSpan}`
                      : 'N/A'
                  })()
                : 'N/A'}
            </TextBody>
          </div>

          {/* Display Name and Background Color */}
          <div className="bg-grayscale-900 rounded-md p-3">
            {/* Display Name - Show for carousel, link, and r3-heatmap sections */}
            {isSectionType('carousel', 'link', 'heatmap') && (
              <div className="mb-3">
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Display Name
                </TextBody>
                <input
                  type="text"
                  placeholder="Section display name"
                  className="border-grayscale-600 bg-grayscale-800 placeholder-grayscale-400 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedDisplayName}
                  onChange={(e) => setSelectedDisplayName(e.target.value)}
                />
              </div>
            )}

            {/* Background Color - Show for carousel and link sections */}
            {isSectionType('carousel', 'link') && (
              <div>
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Background Color
                </TextBody>
                <select
                  className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedBgColor}
                  onChange={(e) => setSelectedBgColor(e.target.value)}
                >
                  <option value="transparent">Transparent</option>
                  <option value="primary">Primary</option>
                  <option value="opaque">Opaque</option>
                  <option value="grey">Grey</option>
                </select>
              </div>
            )}

            {/* Alignment - show for title and welcome sections */}
            {isSectionType('title', 'welcome') && (
              <div className="mt-3">
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Alignment
                </TextBody>
                <ToggleGroup
                  variant="shadow"
                  value={selectedAlignment}
                  onChange={(value) => {
                    setSelectedAlignment?.(
                      value as 'left' | 'center' | 'right' | undefined,
                    )
                  }}
                  options={[
                    {
                      value: 'left',
                      label: (
                        <Icon
                          color="current"
                          icon="format-align-left"
                          size="lg"
                        />
                      ),
                      ariaLabel: 'Align left',
                    },
                    {
                      value: 'center',
                      label: (
                        <Icon
                          color="current"
                          icon="format-align-center"
                          size="lg"
                        />
                      ),
                      ariaLabel: 'Align center',
                    },
                    {
                      value: 'right',
                      label: (
                        <Icon
                          color="current"
                          icon="format-align-right"
                          size="lg"
                        />
                      ),
                      ariaLabel: 'Align right',
                    },
                  ]}
                />
              </div>
            )}
          </div>

          {/* Title Configuration - Only show for title sections */}
          {isSectionType('title') && (
            <div className="bg-grayscale-900 rounded-md p-3">
              {/* Title Text */}
              <div className="mb-3">
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Title Text
                </TextBody>
                <input
                  type="text"
                  placeholder="Title text"
                  className="border-grayscale-600 bg-grayscale-800 placeholder-grayscale-400 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedTitleText}
                  onChange={(e) => setSelectedTitleText(e.target.value)}
                />
              </div>

              {/* Variant */}
              <div>
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Variant
                </TextBody>
                <ToggleGroup
                  variant="shadow"
                  options={[
                    {
                      value: 'team',
                      label: (
                        <button
                          onClick={() => {
                            setTitleVariation('team')
                            onTitleVariationChange('team')
                          }}
                          className={`rounded px-2 py-1 text-xs ${
                            titleVariation === 'team'
                              ? 'bg-white text-black'
                              : 'text-white'
                          }`}
                        >
                          Team
                        </button>
                      ),
                    },
                    {
                      value: 'person',
                      label: (
                        <button
                          onClick={() => {
                            setTitleVariation('person')
                            onTitleVariationChange('person')
                          }}
                          className={`rounded px-2 py-1 text-xs ${
                            titleVariation === 'person'
                              ? 'bg-white text-black'
                              : 'text-white'
                          }`}
                        >
                          User
                        </button>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          )}

          {/* Carousels Configuration */}
          {isSectionType('carousel') && (
            <div className="bg-grayscale-900 rounded-md p-3">
              {/* Category */}
              <div className="mb-3">
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Category
                </TextBody>
                <input
                  type="text"
                  placeholder="Catalog ID"
                  className="border-grayscale-600 bg-grayscale-800 placeholder-grayscale-400 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
              </div>

              {/* Continue Watching Scope */}
              <div className="mb-3">
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Continue Watching Scope
                </TextBody>
                <select
                  className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedContinueWatchingScope}
                  onChange={(e) =>
                    setSelectedContinueWatchingScope(e.target.value)
                  }
                >
                  <option value="present-in-categories">
                    Present in Categories
                  </option>
                  <option value="not-present-in-categories">
                    Not in Categories
                  </option>
                  <option value="direct-enrollments">Direct Enrollments</option>
                  <option value="all-enrolled-training">
                    All Enrolled Training
                  </option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>

              {/* Status Filters */}
              <div>
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Status Filters
                </TextBody>
                <div className="space-y-1">
                  {[
                    { value: 'ocINCOMPLETE', label: 'Incomplete' },
                    { value: 'ocINPROGRESS', label: 'In Progress' },
                    { value: 'ocNOTATTEMPTED', label: 'Not Attempted' },
                    { value: 'ocCOMPLETE', label: 'Complete' },
                  ].map((filter) => (
                    <label
                      key={filter.value}
                      className="flex items-center text-xs text-white"
                    >
                      <input
                        type="checkbox"
                        className="border-grayscale-600 bg-grayscale-800 mr-2 rounded"
                        checked={selectedStatusFilters.includes(filter.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStatusFilters((prev) => [
                              ...prev,
                              filter.value,
                            ])
                          } else {
                            setSelectedStatusFilters((prev) =>
                              prev.filter((f) => f !== filter.value),
                            )
                          }
                        }}
                      />
                      {filter.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Link Configuration - Only show for link sections */}
          {isSectionType('link') && (
            <div className="bg-grayscale-900 rounded-md p-3">
              <TextBody className="text-grayscale-300 mb-1 text-xs">
                Destination
              </TextBody>
              <select
                className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
                value={selectedLinkType}
                onChange={(e) => setSelectedLinkType(e.target.value)}
              >
                <option value="teamboards">Teamboards</option>
                <option value="library">Library</option>
                <option value="mastery">Training (Mastery)</option>
              </select>
            </div>
          )}

          {/* Stats Count Configuration - Only show for stats sections */}
          {isSectionType('stats') && (
            <div className="bg-grayscale-900 space-y-3 rounded-md p-3">
              <div>
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Stat Type
                </TextBody>
                <select
                  className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedStatsSubType}
                  onChange={(e) => setSelectedStatsSubType(e.target.value)}
                >
                  <option value="active-employees">Active Employees</option>
                  <option value="courses-completed">Courses Completed</option>
                  <option value="lesson-completions">Lessons Completed</option>
                </select>
              </div>

              <div>
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Icon
                </TextBody>
                <select
                  className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedStatsIconName}
                  onChange={(e) => setSelectedStatsIconName(e.target.value)}
                >
                  <option value="people-outline">People</option>
                  <option value="trophy-outline">Trophy</option>
                  <option value="check-circle-outline">Check Circle</option>
                  <option value="videocam-outline">Video Camera</option>
                </select>
              </div>

              <div>
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Icon Color
                </TextBody>
                <select
                  className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedStatsIconColorScheme}
                  onChange={(e) =>
                    setSelectedStatsIconColorScheme(e.target.value)
                  }
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="red">Red</option>
                </select>
              </div>

              <div>
                <TextBody className="text-grayscale-300 mb-1 text-xs">
                  Team Source
                </TextBody>
                <select
                  className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
                  value={selectedStatsTeamSource}
                  onChange={(e) => {
                    const newValue = e.target.value as 'primary' | 'specific'
                    setSelectedStatsTeamSource(newValue)
                    // Clear teamID when switching to "User's Primary Team"
                    if (newValue === 'primary') {
                      setSelectedStatsTeamID('')
                    }
                  }}
                >
                  <option value="primary">User's Primary Team</option>
                  <option value="specific">Specific Team</option>
                </select>
              </div>

              {selectedStatsTeamSource === 'specific' && (
                <div>
                  <TextBody className="text-grayscale-300 mb-1 text-xs">
                    Team ID
                  </TextBody>
                  <input
                    type="text"
                    className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
                    value={selectedStatsTeamID}
                    onChange={(e) => setSelectedStatsTeamID(e.target.value)}
                    placeholder="Enter Team ID"
                  />
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSaveSection}
            className="w-full rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
          >
            {selectedPlacedSection ? 'Save' : 'Place Section'}
          </button>

          <button
            onClick={handleDownloadConfig}
            className="bg-grayscale-700 hover:bg-grayscale-600 w-full rounded-md px-3 py-2 text-sm text-white"
          >
            Download Home Config
          </button>
        </div>
      ) : (
        <div className="w-[150px] space-y-4"></div>
      )}
    </div>
  )
}
