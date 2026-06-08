import { useEffect, useMemo } from 'react'

import { useDomainUIQuery } from '@tyto/query'
import { applyStylesheetLinkToDocument } from './applyDomainStylsheet'

interface Props {
  domainID?: number
  oncourseURL?: string
  originOverride?: string
}

export function useApplyDomainStylesheet(props: Props) {
  const domainUIQuery = useDomainUIQuery({
    domainID: props.domainID ?? 0,
    disabled: !props.domainID,
    oncourseURL: props.oncourseURL,
  })

  const matchingImageObject = useMemo(() => {
    return domainUIQuery.data?.domainUI?.images?.find(
      (imgData) => imgData.imageName === 'domainStylesheet',
    )
  }, [domainUIQuery.data])

  useEffect(() => {
    if (!matchingImageObject) return

    applyStylesheetLinkToDocument({
      imageID: matchingImageObject.imageID,
      stylesheetPathURL: matchingImageObject.pathURL,
      sessionOncourseURL: props.originOverride,
    })
  }, [matchingImageObject?.pathURL])
}
