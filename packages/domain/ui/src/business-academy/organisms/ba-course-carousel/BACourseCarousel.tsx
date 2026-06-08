import React from 'react'
import { Carousel, Image, TextHeading } from '@spacedock/falcon-ui'
import { Link } from '@spacedock/navigator'
import { EnvironmentVariables } from '@spacedock/tricorder'
import type { EnrolledBlock, EnrolledSubBlock } from '@tyto/client'

export interface BACourseCarouselProps {
  startedCourses: (EnrolledBlock | EnrolledSubBlock)[]
  isPreview?: boolean
}

const BACourseCarousel = ({
  startedCourses,
  isPreview = false,
}: BACourseCarouselProps) => {
  return (
    <div className="flex flex-col gap-5">
      <TextHeading size={3}>Continue Watching</TextHeading>
      <Carousel
        cardSize="training-tile"
        carouselItems={startedCourses.map((course) => {
          return (
            <div
              key={course.curriculumID}
              className="flex h-60 flex-col gap-2.5 border border-stone-500"
            >
              {isPreview ? (
                <div className="size-full">
                  <Image
                    loadingSize="full"
                    className="h-36 w-full"
                    src={`${EnvironmentVariables.ASSETS_BASE_URL || ''}${
                      course.profileImage?.encodings?.[0]?.pathURL ?? ''
                    }`}
                    alt=""
                  />
                  <div className="flex flex-col gap-2.5 px-4">
                    <TextHeading size={6}>{course.curriculumName}</TextHeading>
                  </div>
                </div>
              ) : (
                <Link
                  app="mastery"
                  to={`course/${course.curriculumID}`}
                  className="size-full"
                  target="_top"
                >
                  <Image
                    loadingSize="full"
                    className="h-36 w-full"
                    src={`${EnvironmentVariables.ASSETS_BASE_URL || ''}${
                      course.profileImage?.encodings?.[0]?.pathURL ?? ''
                    }`}
                    alt=""
                  />
                  <div className="flex flex-col gap-2.5 px-4">
                    <TextHeading size={6}>{course.curriculumName}</TextHeading>
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
BACourseCarousel.displayName = 'BACourseCarousel'

export { BACourseCarousel }
