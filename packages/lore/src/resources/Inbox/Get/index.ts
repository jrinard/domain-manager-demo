import { Endpoints, TYTO_ENDPOINT_PATHS } from '@tyto/client'
import { Data } from '@spacedock/manifest'
import { faker } from '@faker-js/faker/locale/en_US'
import { rest } from 'msw'
import { fixtureInboxGetResponseEnabled } from './fixtureEnabled'
export { fixtureSingleConversationResponse } from './noticeId/fixtureSingleConversation'

const generateNotice = (
  overrides?: Partial<
    | Omit<Data.ConversationNotice, 'about'>
    | Omit<Data.ConversationsNotice, 'about'>
  > & {
    about?: Partial<Data.ConversationNoticeAbout>
  }
): Data.ConversationNotice | Data.ConversationsNotice => {
  return {
    about: {
      aboutID: 0,
      aboutType: '',
      actionType: 'ocNewThread',
      activeStatus: faker.helpers.arrayElement([
        'ocENABLED',
        'ocDISABLED',
        'ocDRAFT',
        'ocARCHIVE',
      ]),
      attachmentCount: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
      commentCount: 1,
      commentCountNew: 1,
      isCritical: false,
      locID: 6625657,
      members: [],
      name: '',
      noticeDate: '',
      noticeID: 0,
      noticeText: '',
      noticeType: 'ocPrivateThread',
      ocType: 'ocNOTICE',
      ...overrides?.about,
    },
    aboutID: 0,
    aboutType: faker.helpers.arrayElement(['ocNOTICE']),
    actionType: faker.helpers.arrayElement(['ocReply']),
    activeStatus: faker.helpers.arrayElement([
      'ocENABLED',
      'ocDISABLED',
      'ocARCHIVE',
    ]),
    catalogIDs: [],
    fromElementID: 0,
    functionID: 0,
    isCascade: faker.datatype.boolean(),
    isCritical: faker.datatype.boolean(),
    isNew: faker.datatype.boolean(),
    locID: 0,
    name: faker.lorem.words({ min: 1, max: 10 }),
    noticeDate: '2023-06-05T22:39:17.357+00:00',
    noticeID: 0,
    noticeText: '',
    noticeType: 'ocPrivateIN',
    ocType: 'ocNOTICE',
    param1: '',
    param2: '',
    param3: '',
    param4: '',
    sortDate: '',
    toElementID: 0,
    toElementType: 'ocPERSON',
  }
}
export const generateInboxGetResponse = (
  props?: Endpoints.Tyto.Inbox.Get.Parameters
): Endpoints.Tyto.Inbox.Get.Response => {
  // TODO generate Members
  const members: Data.NoticeMember[] = [
    {
      emailPreference: 'ocINSTANT',
      lastComment: '1900-01-01T00:00:00+00:00',
      lastDraft: '1900-01-01T00:00:00+00:00',
      recentUnread: '2500-01-01T00:00:00+00:00',
      element: {
        elementID: 1503800,
        elementName: 'Austin Blain',
        activeStatus: 'ocENABLED',
        elementType: 'ocPERSON',
        profilePhoto: {
          thumbnailPath: '1503800_xyt0irmgjfa_200px.jpg',
          domainID: 551,
        },
      },
    },
    {
      emailPreference: 'ocINSTANT',
      lastComment: '2023-06-05T22:35:45.28+00:00',
      lastDraft: '1900-01-01T00:00:00+00:00',
      recentUnread: '2500-01-01T00:00:00+00:00',
      element: {
        elementID: 2209853,
        elementName: 'John Bailey',
        activeStatus: 'ocENABLED',
        elementType: 'ocPERSON',
        profilePhoto: {
          thumbnailPath: '2209853_kvemjhrbf1w_200px.jpg',
          domainID: 1698652,
        },
      },
    },
  ]
  return {
    notices: [generateNotice({ about: { members } })],
    // TODO: Generate Participants and Members
    participants: [
      {
        outsideTerminateDate: '1900-01-01T00:00:00Z',
        activeStatus: 'ocENABLED',
        elementID: 1503800,
        elementName: 'Austin Blain',
        elementSubType: 'ocITEM',
        elementType: 'ocPERSON',
        isAbsent: false,
        locID: 1503800,
        name: 'Austin Blain',
        ocType: 'ocPERSON',
        profileImage: {
          assetID: 1942036,
          assetName: '19561 (1).jpg',
          assetDesc: '',
          assetType: 'ocPhoto',
          orientation: 'ocVOID',
          modifiedDate: '2021-06-30T16:58:18.213',
          modifiedByID: 1503800,
          createdDate: '2021-06-30T16:58:18.213',
          createdByID: 1503800,
          createdByName: 'Austin Blain',
          sequence: 6,
          softwareRequirements: '',
          originalMD5: '3Es8EIdfkKSsIgd2XUd1zQ==',
          domainID: 551,
          encodings: [
            {
              encodingType: 'ocTHUMBNAIL',
              mimeType: 'image/jpeg',
              modifiedDate: '2021-06-30T16:58:18.213',
              height: 500,
              width: 500,
              length: 0,
              sizeBytes: 0,
              activeStatus: 'ocENABLED',
              pathURL: '/v2/domains/551/assets/1503800_xyt0irmgjfa_200px.jpg',
            },
          ],
          courseItemID: 1503800,
        },
      },
      {
        outsideTerminateDate: '1900-01-01T00:00:00Z',
        isAbsent: false,
        profileImage: {
          assetID: 2218073,
          assetName: 'IMGL8356.jpeg',
          assetDesc: '',
          assetType: 'ocPhoto',
          orientation: 'ocVOID',
          modifiedDate: '2023-05-08T16:28:50.333',
          modifiedByID: 2209853,
          createdDate: '2023-05-08T16:28:50.333',
          createdByID: 2209853,
          createdByName: 'John Bailey',
          sequence: 2,
          softwareRequirements: '',
          originalMD5: 'cRLXetPF0GJd/XfGjnx1pA==',
          domainID: 1698652,
          encodings: [
            {
              encodingType: 'ocTHUMBNAIL',
              mimeType: 'image/jpeg',
              modifiedDate: '2023-05-08T16:28:50.333',
              height: 500,
              width: 500,
              length: 0,
              sizeBytes: 0,
              activeStatus: 'ocENABLED',
              pathURL:
                '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
            },
          ],
          courseItemID: 2209853,
        },
        name: 'John Bailey',
        locID: 2209853,
        ocType: 'ocPERSON',
        elementID: 2209853,
        elementName: 'John Bailey',
        elementType: 'ocPERSON',
        elementSubType: 'ocITEM',
        activeStatus: 'ocENABLED',
      },
    ],
    error: { sts: 0, msg: 'initialized' },
    links: [],
    session: {
      userID: 2209853,
      userName: 'John Bailey',
      changePassword: false,
      termsOfServiceSignatureRequired: false,
      adminID: 0,
      teamListSyncDate: '1900-01-01T00:00:00+00:00',
      koPermissionSyncDate: '2023-06-26T19:58:04.62+00:00',
      domainID: 1698652,
      timeOutMnts: 2160,
      onCourseURL: 'https://cardoneventuresceo.com',
      profileThumbPath:
        '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
      teamRootID: 1763850,
      roleID: 432,
      onlinePreference: 'ocAVAILABLE',
    },
  }
}

export const generateInboxGetMockRestHandlers = ({
  baseURL = 'https://localhost:4400/api',
}) => [
  rest.get<Endpoints.Tyto.Inbox.Post.Response>(
    `${baseURL}${TYTO_ENDPOINT_PATHS.INBOX}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fixtureInboxGetResponseEnabled()))
    }
  ),
]
