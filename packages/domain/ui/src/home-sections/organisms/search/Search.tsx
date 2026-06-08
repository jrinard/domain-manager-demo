import type { HomeSection } from '@domain/configs'
import type { SearchSectionData } from '@domain/schemas'

export interface SearchProps {
  section?: HomeSection<SearchSectionData>
  sectionData: SearchSectionData
  headerImageUrl?: string
  isLoading?: boolean
}

export const Search = ({
  section,
  sectionData,
  headerImageUrl,
  isLoading = false,
}: SearchProps) => {
  if (!section) {
    return null
  }

  const {
    placeholder = 'Search',
    border_radius = '8px',
    header_image_width = '1/4',
  } = sectionData

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    )
  }

  // Map border_radius values to styles
  const borderRadiusStyle = border_radius === 'none' ? '0' : border_radius

  // Map header_image_width to Tailwind classes
  const widthClassMap = {
    '1/4': 'w-1/4',
    '1/3': 'w-1/3',
    '1/2': 'w-1/2',
    '3/4': 'w-3/4',
    full: 'w-full',
  }
  const headerWidthClass = widthClassMap[header_image_width]

  return (
    <div className="flex h-full flex-col">
      {/* Header Image */}
      {headerImageUrl && (
        <div className={`mb-4 flex justify-start ${headerWidthClass}`}>
          <img
            src={headerImageUrl}
            alt="Search header"
            className="max-h-48 w-auto max-w-full object-contain"
          />
        </div>
      )}

      {/* Search Input */}
      <div className="w-full flex-1">
        <input
          type="text"
          placeholder={placeholder}
          className="focus:border-primary focus:ring-primary/20 w-full border border-gray-300 bg-white px-4 py-3 text-lg focus:outline-none focus:ring-2"
          style={{ borderRadius: borderRadiusStyle }}
        />
      </div>
    </div>
  )
}
