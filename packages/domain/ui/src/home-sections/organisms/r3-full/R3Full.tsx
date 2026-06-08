import { HomeSectionWrapper } from '../home-section-wrapper'
import type { HomeSection } from '@domain/configs'
import type { R3FullSectionData } from '@domain/schemas'
import type { DiscProfile } from '@tyto/client'
import { Avatar } from '@spacedock/falcon-ui'
import { DISCQuadrants } from '@spacedock/dossier'
import { useState } from 'react'
import { Icon } from '@falcon/icons'
import { SessionHandling } from '@spacedock/cargo-bay'
import { EnvironmentVariables } from '@spacedock/tricorder'
import { getTopOrigin } from '@spacedock/origins'
import { makePathFullyQualified } from '@tyto/assets'
import { Link, useAppPath } from '@spacedock/navigator'

export interface R3FullProps {
  section?: HomeSection<R3FullSectionData>
  sectionData?: R3FullSectionData
  discProfile?: DiscProfile
  isLoading?: boolean
  renderMode?: 'prod' | 'mock'
}

export const R3Full = ({
  section,
  discProfile,
  isLoading = false,
  renderMode = 'prod',
}: R3FullProps) => {
  const [searchString, setSearchString] = useState('')
  const r3AppPath = useAppPath('r3-tool', '')

  if (!section) {
    return null
  }

  const hasProfile = !!discProfile

  const handleSearch = () => {
    if (!searchString || !r3AppPath) return
    // Navigate to R3 search with the search term
    const searchUrl = `${r3AppPath}search/${encodeURIComponent(searchString)}`
    window.location.href = searchUrl
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const discValue = hasProfile
    ? {
        d3: discProfile?.d3 || 0,
        i3: discProfile?.i3 || 0,
        s3: discProfile?.s3 || 0,
        c3: discProfile?.c3 || 0,
        d2: discProfile?.d2 || 0,
        i2: discProfile?.i2 || 0,
        s2: discProfile?.s2 || 0,
        c2: discProfile?.c2 || 0,
        d1: discProfile?.d1 || 0,
        i1: discProfile?.i1 || 0,
        s1: discProfile?.s1 || 0,
        c1: discProfile?.c1 || 0,
        styleKey3: discProfile?.styleKey3 ?? '',
      }
    : null

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 12,
      }}
      padding={section.metadata.padding}
    >
      <div className="flex h-full w-full font-['Oswald']">
        {hasProfile ? (
          <>
            {/* Left side - DISC Graph */}
            <div
              className="flex flex-col items-center justify-center"
              style={{ width: renderMode === 'mock' ? '193px' : '275px' }}
            >
              {discValue && (
                <>
                  <DISCQuadrants
                    size={renderMode === 'mock' ? 193 : 275}
                    graph="Public"
                    discValues={discValue}
                  />
                  <p
                    className="mt-4 text-white"
                    style={{
                      fontSize: renderMode === 'mock' ? '12px' : '17px',
                      lineHeight: renderMode === 'mock' ? '21px' : '30px',
                    }}
                  >
                    PUBLIC SELF
                  </p>
                </>
              )}
            </div>

            {/* Right side - User info and search */}
            <div className="ml-auto flex w-[63%] flex-col">
              {/* Top section */}
              <div className="flex h-[71%] flex-col">
                {/* User info row */}
                <div className="flex w-full items-center justify-start">
                  <Avatar
                    stroked
                    size="3xl"
                    name={discProfile?.personName || 'User'}
                    src={
                      renderMode === 'prod'
                        ? makePathFullyQualified({
                            baseURL:
                              EnvironmentVariables.TYTO_BASE_URL ||
                              getTopOrigin() ||
                              '/',
                            relativePath: `/person/profilephoto?sessionKey=${SessionHandling.getActiveSessionKey()}&personID=${discProfile?.personID}&assetID=&encoding=ocORIGINAL&silhouette=dark`,
                          })
                        : undefined
                    }
                  />
                  <h2 className="ml-[13px] text-[22px] uppercase leading-[20px] text-white">
                    {discProfile?.personName}
                  </h2>
                  <img
                    className="ml-auto max-h-[74px]"
                    src="https://cherry.mocaworks.com/v2/domains/551/images/start/r3-section-white-logo.svg"
                    alt="R3 Logo"
                  />
                </div>

                {/* Headline */}
                <h1
                  className="mt-[4%] font-['Montserrat'] font-black text-white"
                  style={{
                    fontSize: renderMode === 'mock' ? '26px' : '28px',
                    lineHeight: renderMode === 'mock' ? '32px' : '34px',
                  }}
                >
                  COMPARE YOUR COMMUNICATION STYLE WITH OTHERS
                </h1>
              </div>

              {/* Bottom section - Search */}
              <div className="relative flex h-[56px] min-h-[56px] w-[90%] items-end">
                <input
                  type="text"
                  className="h-full w-full rounded-full border-2 border-white bg-transparent px-[19px] pr-[57px] font-['Oswald'] text-[24px] font-light leading-[24px] text-white placeholder:text-white focus:outline-none"
                  placeholder="find someone to compare..."
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="absolute right-0 flex h-full w-[66px] items-center justify-center rounded-full pb-[2px] text-white"
                  onClick={handleSearch}
                >
                  <Icon icon="search" size="lg" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* No profile - CEO 101 promo */}
            <div
              className="relative flex-shrink-0 bg-[#404f5f]"
              style={{ width: '50%' }}
            >
              <img
                src="https://cherry.mocaworks.com/v2/domains/551/images/start/banner-ceo-101-left.png"
                alt="CEO 101 Course"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="ml-[30px] flex flex-col justify-between pb-[10px]">
              <div className="mt-[6px] flex items-center text-[18px] leading-[22px] text-white">
                <img
                  src="https://cherry.mocaworks.com/v2/domains/551/images/start/tiny-cv-brand-white.png"
                  alt="CV Logo"
                  className="h-auto"
                />
              </div>

              <h1 className="flex items-center font-['Montserrat'] text-[28px] font-black leading-[32px] text-white">
                <Icon icon="chevrons-left" size="sm" className="mr-2" />
                LEARN ABOUT THE CEO PLATFORM
              </h1>

              {renderMode === 'mock' ? (
                <div className="pointer-events-none max-w-[242px] rounded-[3px] bg-[var(--theme-primary-color,#c8102e)] px-[56px] py-[8px] text-center font-['Oswald'] text-[16px] leading-[20px] text-white">
                  TAKE THE COURSE
                </div>
              ) : (
                <Link
                  app="mastery"
                  to="course/2058348"
                  target="_top"
                  className="block max-w-[242px] rounded-[3px] bg-[var(--theme-primary-color,#c8102e)] px-[56px] py-[8px] text-center font-['Oswald'] text-[16px] leading-[20px] text-white no-underline hover:opacity-90"
                >
                  TAKE THE COURSE
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </HomeSectionWrapper>
  )
}
