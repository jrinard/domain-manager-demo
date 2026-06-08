import React from 'react'

import { Carousel, Image, TextHeading } from '@spacedock/falcon-ui'
import { Link } from '@spacedock/navigator'
import { EnvironmentVariables } from '@spacedock/tricorder'
import { useCatalogCurriculumPublicationQuery } from '@tyto/query'

type CatalogQueryResult = ReturnType<
  typeof useCatalogCurriculumPublicationQuery
>['data']
type Catalog = NonNullable<CatalogQueryResult>['catalogs'][number]
type ChildItem = Catalog['childItems'][number]

export interface BACatalogCarouselProps {
  nonStartedTopLevelCourses: ChildItem[]
  title?: string
  isPreview?: boolean
}

const BACatalogCarousel = ({
  nonStartedTopLevelCourses,
  title = 'Training',
  isPreview = false,
  ...props
}: BACatalogCarouselProps) => {
  return (
    <div className="flex flex-col gap-5">
      <TextHeading size={3}>{title}</TextHeading>
      <Carousel
        cardSize="training-tile"
        carouselItems={nonStartedTopLevelCourses.map((course) => {
          return (
            <div
              key={course.about?.curriculumID}
              className="flex h-60 flex-col gap-2.5 border border-stone-500"
            >
              {isPreview ? (
                <div className="size-full">
                  <Image
                    loadingSize="full"
                    className="h-36 w-full"
                    src={`${EnvironmentVariables.ASSETS_BASE_URL || ''}${
                      course.about?.curriculum.profileImage?.encodings[0]
                        ?.pathURL ?? ''
                    }`}
                    alt=""
                  />
                  <div className="flex flex-col gap-2.5 px-4">
                    <TextHeading size={6}>
                      {course.about?.curriculum.name}
                    </TextHeading>
                  </div>
                </div>
              ) : (
                <Link
                  className="size-full"
                  app="mastery"
                  to={`course/${course.about?.curriculumID}`}
                >
                  <Image
                    loadingSize="full"
                    className="h-36 w-full"
                    src={`${EnvironmentVariables.ASSETS_BASE_URL || ''}${
                      course.about?.curriculum.profileImage?.encodings[0]
                        ?.pathURL ?? ''
                    }`}
                    alt=""
                  />
                  <div className="flex flex-col gap-2.5 px-4">
                    <TextHeading size={6}>
                      {course.about?.curriculum.name}
                    </TextHeading>
                  </div>
                </Link>
              )}
            </div>
          )
        })}
      />
    </div>
  )
}
BACatalogCarousel.displayName = 'BACatalogCarousel'

export { BACatalogCarousel }
