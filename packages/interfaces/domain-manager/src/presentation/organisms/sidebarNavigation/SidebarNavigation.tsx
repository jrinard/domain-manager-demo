import { useScreenSize } from '@domain/ui'
import { Icon } from '@falcon/icons'
import { ProgressBar, SkeletonText, ComboBox } from '@spacedock/falcon-ui'
import { useState, useEffect } from 'react'

export interface NavigationSection {
  id: string
  label: string
  required: boolean
}

export interface SidebarNavigationProps {
  sections: NavigationSection[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  hasMetReq: (sectionId: string) => boolean
  scrollContainer?: string // CSS selector for the scroll container
  isLoading?: boolean
}

export const SidebarNavigation = ({
  sections,
  activeSection,
  onSectionClick,
  hasMetReq,
  scrollContainer = 'main',
  isLoading = false,
}: SidebarNavigationProps) => {
  const [internalActiveSection, setInternalActiveSection] =
    useState(activeSection)

  // Update internal state when prop changes
  useEffect(() => {
    setInternalActiveSection(activeSection)
  }, [activeSection])

  const screenSizeData = useScreenSize()
  const isMobile = screenSizeData.semanticScreenWidth === 'mobile'

  // Scroll detection for automatic highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Adjusted offset for better highlighting

      // Find the section that's currently most visible
      let currentSection = sections[0].id
      let minDistance = Infinity

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop } = element
          const distance = Math.abs(scrollPosition - offsetTop)

          if (distance < minDistance) {
            minDistance = distance
            currentSection = section.id
          }
        }
      }

      setInternalActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    // Call once on mount to set initial state
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleSectionClick = (sectionId: string) => {
    // Immediately highlight the clicked section
    setInternalActiveSection(sectionId)
    onSectionClick(sectionId)

    const element = document.getElementById(sectionId)

    if (element) {
      // Get the element's position
      const elementRect = element.getBoundingClientRect()
      const elementTop = elementRect.top + window.pageYOffset

      // Account for header height + breadcrumb + breathing room
      const headerOffset = 249 // Header height is 164px + breadcrumb ~65px + 20px breathing room
      const offsetPosition = elementTop - headerOffset

      // Smooth scroll to the adjusted position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Calculate progress for required sections only
  const requiredSections = sections.filter((section) => section.required)
  const completedSections = requiredSections.filter((section) =>
    hasMetReq(section.id),
  )
  const progressPercentage =
    requiredSections.length > 0
      ? (completedSections.length / requiredSections.length) * 100
      : 0

  if (isLoading) {
    return (
      <aside className="min-w-[240px] self-start p-6 pl-8 pt-6">
        <div className="bg-grayscale-200 dark:bg-grayscale-900 w-[200px] rounded-xl p-2 opacity-50 shadow-lg">
          <ul className="text-grayscale-400 space-y-2">
            {sections.map((section) => (
              <li
                key={section.id}
                className="flex items-center gap-3 rounded-md px-2 py-1"
              >
                <SkeletonText size="sm" length="short" className="h-4 w-4" />
                <SkeletonText size="lg" length="medium" />
              </li>
            ))}
          </ul>

          <div className="flex h-[150px] flex-col items-center justify-end p-2">
            <SkeletonText size="lg" length="5/6" />
          </div>
        </div>
      </aside>
    )
  }

  // Mobile version with ComboBox
  if (isMobile) {
    return (
      <div className="mb-2 w-full border-b border-t border-red-500 px-4 py-2">
        <div className="space-y-2">
          <ComboBox
            triggerClassName="w-full"
            items={sections.map((section) => ({
              value: section.id,
              item: section.label,
            }))}
            value={internalActiveSection}
            onChange={(value) => {
              if (value) {
                handleSectionClick(value)
              }
            }}
            selectPlaceholder="Select Section"
            includeSearch={false}
            id="sidebar-navigation-combobox"
            aria-label="Navigation Sections"
          />

          <div className="flex justify-center">
            <ProgressBar
              progress={Math.min(progressPercentage, 100)}
              hasLabel
              color="success"
              size="lg"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <aside className="min-w-[200px] self-start p-1 pl-8 pt-6">
      <div className="bg-grayscale-200 dark:bg-grayscale-900 w-[200px] rounded-xl p-2 shadow-lg">
        <ul className="text-grayscale-400 space-y-2">
          {sections.map((section) => {
            const isActive = internalActiveSection === section.id
            const sectionHasMetReq = hasMetReq(section.id)

            return (
              <li
                key={section.id}
                className={`hover:bg-grayscale-400 dark:hover:bg-grayscale-800 flex cursor-pointer items-center gap-3 rounded-md px-2 py-1 ${
                  isActive ? 'text-site-fg' : 'hover:text-white'
                }`}
                onClick={() => handleSectionClick(section.id)}
              >
                {section.required ? (
                  <Icon
                    color={sectionHasMetReq ? 'success' : 'current'}
                    icon={
                      sectionHasMetReq
                        ? 'checkbox-blank-circle'
                        : 'checkbox-blank-circle-outline'
                    }
                    size="xl"
                  />
                ) : (
                  <div className="h-6 w-6" />
                )}
                {section.label}
              </li>
            )
          })}
        </ul>

        <div className="flex h-[150px] flex-col justify-end p-2">
          <ProgressBar
            progress={Math.min(progressPercentage, 100)}
            hasLabel
            color="success"
            size="lg"
          />
        </div>
      </div>
    </aside>
  )
}
