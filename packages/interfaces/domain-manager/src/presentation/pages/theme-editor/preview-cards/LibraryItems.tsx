import { TextHeading } from '@spacedock/falcon-ui'
import { VariantProps, cva, mergeClasses } from '@falcon/style'
import { TytoData, Data } from '@spacedock/manifest'
import { Icon } from '@falcon/icons'

const FAKE_ASSETS: Pick<Data.Asset, 'assetID' | 'assetName' | 'assetType'>[] = [
  {
    assetID: 1,
    assetName: 'Assignment',
    assetType: 'ocASSIGNMENT',
  },
  {
    assetID: 2,
    assetName: 'Image',
    assetType: 'ocImage',
  },

  {
    assetID: 3,
    assetName: 'Video',
    assetType: 'ocVideo',
  },

  {
    assetID: 4,
    assetName: 'Audio',
    assetType: 'ocAudio',
  },

  {
    assetID: 5,
    assetName: 'URL',
    assetType: 'ocURL',
  },

  {
    assetID: 6,
    assetName: 'PDF',
    assetType: 'ocPDF',
  },

  {
    assetID: 7,
    assetName: 'Photo',
    assetType: 'ocPhoto',
  },

  {
    assetID: 8,
    assetName: 'Profile Photo',
    assetType: 'ocProfilePhoto',
  },

  {
    assetID: 9,
    assetName: 'Spreadsheet',
    assetType: 'ocSpreadsheet',
  },

  {
    assetID: 10,
    assetName: 'Word',
    assetType: 'ocWord',
  },

  {
    assetID: 11,
    assetName: 'Zip',
    assetType: 'ocZip',
  },

  {
    assetID: 12,
    assetName: 'Event',
    assetType: 'ocEvent',
  },
]

const LibraryItems = () => {
  return (
    <section className="bg-site-bg flex h-full flex-col gap-4 p-4">
      <TextHeading className="text-site-fg">Library / Assets</TextHeading>

      <div className="mx-auto my-auto flex flex-row flex-wrap gap-2">
        {FAKE_ASSETS.map((asset) => (
          <AssetCard key={asset.assetID} asset={asset} />
        ))}
      </div>
    </section>
  )
}

const variants = cva('flex flex-col', {
  variants: {
    assetType: {
      document: 'bg-asset-document-subtle text-asset-document',
      image: 'bg-asset-image-subtle text-asset-image',
      video: 'bg-asset-video-subtle text-asset-video',
      audio: 'bg-asset-audio-subtle text-asset-audio',
      url: 'bg-asset-url-subtle text-asset-url',
      markdown: 'bg-asset-md-subtle text-asset-md',
      excel: 'bg-asset-excel-subtle text-asset-excel',
      speedsheet: 'bg-asset-speedsheet-subtle text-asset-speedsheet',
      quickart: 'bg-asset-quickart-subtle text-asset-quickart',
      quickdoc: 'bg-asset-quickdoc-subtle text-asset-quickdoc',
      photoalbum: 'bg-asset-photoalbum-subtle text-asset-photoalbum',
      elearning: 'bg-asset-elearning-subtle text-asset-elearning',
      scorm: 'bg-asset-scorm-subtle text-asset-scorm',
      zip: 'bg-asset-zip-subtle text-asset-zip',
      asset: 'bg-asset-subtle text-asset',
      event: 'bg-secondary text-primary',
      assignment: 'bg-asset-assignment-subtle text-asset-assignment',
      pdf: 'bg-asset-pdf-subtle text-asset-pdf',
      photo: 'bg-asset-image-subtle text-asset-image',
      profilephoto: 'bg-asset-profilephoto-subtle text-asset-profilephoto',
      spreadsheet: 'bg-asset-speedsheet-subtle text-asset-speedsheet',
      word: 'bg-asset-word-subtle text-asset-word',
    },
  },
  defaultVariants: {
    assetType: 'asset',
  },
})

interface AssetCardProps extends VariantProps<typeof variants> {
  asset: Pick<Data.Asset, 'assetID' | 'assetName' | 'assetType'>
}

const AssetCard = (props: AssetCardProps) => {
  return (
    <div
      className={mergeClasses(
        'flex h-24 w-20 flex-col rounded-md border border-solid border-current',
        variants({
          assetType: normalizeAssetType(props.asset.assetType),
        }),
      )}
    >
      <section className="flex w-full flex-row items-center justify-center px-2 pb-0.5 pt-1">
        {RenderAssetIcon(props.asset.assetType)}
      </section>
      <section className="border-top mt-auto w-full overflow-hidden p-2">
        <TextHeading size={6} className="overflow-hidden text-xs">
          {props.asset.assetName}
        </TextHeading>
      </section>
    </div>
  )
}

function RenderAssetIcon(assetType: TytoData.AssetType) {
  const normalizedAssetType =
    assetType.toLocaleLowerCase() as Lowercase<TytoData.AssetType>

  switch (normalizedAssetType) {
    case 'ocassignment':
      return <Icon size="5xl" icon="assignment-ind-outline" />
    // // case 'ocdocument':
    // //   return 'document'
    case 'ocimage':
      return <Icon size="5xl" icon="insert-photo" />
    case 'ocvideo':
      return <Icon size="5xl" icon="file-video" />
    case 'ocaudio':
      return <Icon size="5xl" icon="audio-book" />
    case 'ocurl':
      return <Icon size="5xl" icon="link-box-variant" />
    case 'ocpdf':
      return <Icon size="5xl" icon="file-pdf-box" />
    case 'ocphoto':
      return <Icon size="5xl" icon="insert-photo" />
    case 'ocprofilephoto':
      return <Icon size="5xl" icon="person-circle" />
    case 'ocscorm':
      return <Icon size="5xl" icon="learn-outline" />
    case 'ocspreadsheet':
      return <Icon size="5xl" icon="file-excel" />
    case 'ocword':
      return <Icon size="5xl" icon="file-word" />
    case 'oczip':
      return <Icon size="5xl" icon="folder-zip" />
    case 'ocevent':
      return <Icon size="5xl" icon="event-blank-outline" />
    default:
      return undefined
  }
}

function normalizeAssetType(assetType: TytoData.AssetType) {
  const normalizedAssetType =
    assetType.toLocaleLowerCase() as Lowercase<TytoData.AssetType>

  switch (normalizedAssetType) {
    case 'ocassignment':
      return 'assignment'
    // // case 'ocdocument':
    // //   return 'document'
    case 'ocimage':
      return 'image'
    case 'ocvideo':
      return 'video'
    case 'ocaudio':
      return 'audio'
    case 'ocurl':
      return 'url'
    case 'ocpdf':
      return 'pdf'
    case 'ocphoto':
      return 'photo'
    case 'ocprofilephoto':
      return 'profilephoto'
    case 'ocscorm':
      return 'scorm'
    case 'ocspreadsheet':
      return 'spreadsheet'
    case 'ocword':
      return 'word'
    case 'oczip':
      return 'zip'
    case 'ocevent':
      return 'event'
    default:
      return 'document'
  }
}

export default LibraryItems
