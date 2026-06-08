import { SkeletonText, TextHeading } from '@spacedock/falcon-ui'
import {
  SidebarNavigation,
  NavigationSection,
} from '../../organisms/sidebarNavigation'

interface ImagesPageLoadingProps {
  navSections: NavigationSection[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  hasMetReq: (sectionId: string) => boolean
}

export const ImagesPageLoading = ({
  navSections,
  activeSection,
  onSectionClick,
  hasMetReq,
}: ImagesPageLoadingProps) => {
  return (
    <div className="bg-site-bg flex h-full w-full flex-col">
      {/* Header - Sticky */}
      <div className="border-grayscale-600 bg-site-bg sticky top-[160px] z-20 flex w-full flex-row justify-between border-b">
        <nav className="mt-2 flex items-center gap-2 px-8 py-4 text-sm">
          <TextHeading size={3}>Logo & Background Images</TextHeading>
        </nav>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-0 shrink grow flex-col lg:flex-row">
        {/* Left Sidebar - Fixed Position */}
        <div className="h-auto lg:h-auto lg:w-[280px] lg:self-start">
          <SidebarNavigation
            sections={navSections}
            activeSection={activeSection}
            onSectionClick={onSectionClick}
            hasMetReq={hasMetReq}
            scrollContainer="#images-loading-main-content"
            isLoading
          />
        </div>

        <main
          id="images-loading-main-content"
          className="flex-1 overflow-y-auto py-6 pt-4"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            scrollbarColor: '#525252 #262626',
          }}
        >
          <div className="flex gap-2 px-2">
            <div className="w-full space-y-4 pb-48 pl-4 pr-4 sm:space-y-6 lg:space-y-8 lg:pl-8 lg:pr-8">
              {/* Main Logo Section Skeleton */}
              <section>
                <div className="mb-2 gap-4 pb-1 opacity-40">
                  <div className="flex items-center gap-3">
                    <SkeletonText size="lg" length="short" />
                    <SkeletonText
                      size="sm"
                      length="short"
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900 cursor-pointer rounded-md border p-4 opacity-50">
                      <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                        <div className="flex h-full w-full items-center justify-center rounded">
                          <SkeletonText size="sm" length="short" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <SkeletonText size="sm" length="medium" />
                      </div>
                    </div>
                    <div className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900 cursor-pointer rounded-md border p-4 opacity-50">
                      <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                        <div className="flex h-full w-full items-center justify-center rounded">
                          <SkeletonText size="sm" length="short" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <SkeletonText size="sm" length="medium" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Login Logo Section Skeleton */}
              <section>
                <div className="mb-2 gap-4 pb-1 opacity-40">
                  <div className="flex items-center gap-3">
                    <SkeletonText size="lg" length="short" />
                    <SkeletonText
                      size="sm"
                      length="short"
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900 cursor-pointer rounded-md border p-4 opacity-50">
                      <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                        <div className="flex h-full w-full items-center justify-center rounded">
                          <SkeletonText size="sm" length="short" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <SkeletonText size="sm" length="medium" />
                      </div>
                    </div>
                    <div className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900 cursor-pointer rounded-md border p-4 opacity-50">
                      <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                        <div className="flex h-full w-full items-center justify-center rounded">
                          <SkeletonText size="sm" length="short" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <SkeletonText size="sm" length="medium" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Email Logo Section Skeleton */}
              <section>
                <div className="mb-2 gap-4 pb-1 opacity-40">
                  <div className="flex items-center gap-3">
                    <SkeletonText size="lg" length="short" />
                    <SkeletonText
                      size="sm"
                      length="short"
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900cursor-pointer rounded-md border p-4 opacity-50">
                      <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                        <div className="flex h-full w-full items-center justify-center rounded">
                          <SkeletonText size="sm" length="short" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <SkeletonText size="sm" length="medium" />
                      </div>
                    </div>
                    <div className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900cursor-pointer rounded-md border p-4 opacity-50">
                      <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                        <div className="flex h-full w-full items-center justify-center rounded">
                          <SkeletonText size="sm" length="short" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <SkeletonText size="sm" length="medium" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Background Image Section Skeleton */}
              <section>
                <div className="mb-2 gap-4 pb-1 opacity-40">
                  <div className="flex items-center gap-3">
                    <SkeletonText size="lg" length="short" />
                    <SkeletonText
                      size="sm"
                      length="short"
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900 cursor-pointer rounded-md border p-4 opacity-50"
                      >
                        <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                          <div className="flex h-full w-full items-center justify-center rounded">
                            <SkeletonText size="sm" length="short" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <SkeletonText size="sm" length="medium" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Login Back Image Section Skeleton */}
              <section>
                <div className="mb-2 gap-4 pb-1 opacity-40">
                  <div className="flex items-center gap-3">
                    <SkeletonText size="lg" length="short" />
                    <SkeletonText
                      size="sm"
                      length="short"
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900 cursor-pointer rounded-md border p-4 opacity-50"
                      >
                        <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                          <div className="flex h-full w-full items-center justify-center rounded">
                            <SkeletonText size="sm" length="short" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <SkeletonText size="sm" length="medium" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Favicon Section Skeleton */}
              <section>
                <div className="mb-2 gap-4 pb-1 opacity-40">
                  <div className="flex items-center gap-3">
                    <SkeletonText size="lg" length="short" />
                    <SkeletonText
                      size="sm"
                      length="short"
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="border-grayscale-600 bg-grayscale-200 dark:bg-grayscale-900 cursor-pointer rounded-md border p-4 opacity-50">
                      <div className="bg-grayscale-800 mb-3 h-32 w-full rounded">
                        <div className="flex h-full w-full items-center justify-center rounded">
                          <SkeletonText size="sm" length="short" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <SkeletonText size="sm" length="medium" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
