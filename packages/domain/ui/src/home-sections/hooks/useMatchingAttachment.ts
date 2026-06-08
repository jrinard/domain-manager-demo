import { useMemo } from 'react'
import type { DomainUI } from '@spacedock/manifest'
import { createFileURL } from '../../utils/file-path'
import { getEncoding } from '@tyto/assets'

export function useMatchingAttachment(
  elementID: number,
  attachments?: DomainUI.Attachment[],
) {
  return useMemo(() => {
    const attachment = attachments?.find(
      (attachment) => attachment.courseItemID === elementID,
    )

    return {
      attachment,
      pathURL: pullThumbnailFromAttachment(attachment),
    }
  }, [attachments, elementID])
}

function pullThumbnailFromAttachment(attachment?: DomainUI.Attachment) {
  if (!attachment) {
    return null
  }

  if (isImageAttachment(attachment)) {
    return createFileURL(attachment.item.pathURL)
  } else if (isLessonAttachment(attachment)) {
    return createFileURL(
      getEncoding(attachment.item.assets?.[0].encodings, 'ocTHUMBNAIL')
        ?.pathURL ?? '',
    )
  }

  return null
}

function isImageAttachment(
  attachment: DomainUI.Attachment,
): attachment is DomainUI.UIConfigLibraryImageItem {
  return 'imageType' in attachment.item
}

function isLessonAttachment(
  attachment: DomainUI.Attachment,
): attachment is DomainUI.UIConfigLibraryLessonItem {
  return 'lessonItemType' in attachment.item
}
