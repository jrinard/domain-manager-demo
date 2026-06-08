/* eslint @typescript-eslint/no-unsafe-member-access: 'warn' */
import type { Data, TytoData } from '@spacedock/manifest'
import type { TytoBaseResponse } from '@tyto/manifest'
import { InternalAxiosRequestConfig } from 'axios'
import {
  CatalogItemPostParameters,
  CatalogItemPostResponse,
  CatalogItemPutParameters,
  CatalogItemPutResponse,
} from '../resources/CatalogItem'
import type { FunctionName, OperationName } from '../constants/security-role'

export interface RequestInterceptor {
  name: string
  onFulfilled: (config: InternalAxiosRequestConfig) => Promise
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => any
}

export interface ResponseInterceptor {
  name: string
  id: number
}

export interface RegisteredInterceptor {
  name: string
  id: number
}

export interface TytoResponseNonGet extends TytoBaseResponse {
  recordsAffected: number
}

namespace Responses {
  export namespace Asset {
    export namespace Encoding {
      export interface Post extends Data.TytoResponse {
        job: {
          asset: TytoData.Asset
          status: 'Succeeded' | 'Failed'
          trasncodeSteps: {
            firstIn: boolean
            percentComplete: 1
            remoteInventory: {
              createdDate: string
              height: number
              isAborting: boolean
              label: string
              length: number
              productPath: string
              relativeProductPath: string
              sourceFileName: string
              specialInstructions: string
              status: string
              statusDate: string
              statusDetail: string
              technote: string
              width: number
              workType: string
            }
            status: string
            workType: string
          }[]
        }
      }
    }
  }

  export namespace Block {
    export interface Get extends Data.TytoResponse {
      block: TytoData.Blocks.Block
    }

    export namespace Enrollment {
      export interface Post extends Data.TytoResponse {
        recordsAffected: number
        registrationCount: number
      }
    }

    export namespace Prerequisites {
      export interface Get extends Data.TytoResponse {
        prerequisites: TytoData.Blocks.Prerequisite[]
      }
    }
  }

  export namespace CatalogCurriculumPublication {
    export interface Get extends Data.TytoResponse {
      catalogs: TytoData.Catalog.Category[]
      domains: TytoData.Catalog.DomainLabel[]
      primaryElements: TytoData.Catalog.PrimaryElement[]
      securityTraits: any[]
      links: any[]
    }
  }

  export namespace CurriculumPubCatalogItemsTrending {
    export interface Get extends Data.TytoResponse {
      CurriculumPubCatalogItemsTrending: TytoData.Catalog.TrendingCatalogItem[]
    }
  }

  export namespace DevPlan {
    export namespace Enrollment {
      export interface Post extends Data.TytoResponse {
        exceptions: any[]
        recordsAffected: number
        taskID: number
      }
    }
  }

  export namespace Enrollment {
    export namespace VerificationRequest {
      export interface Put extends Data.TytoResponse {
        recordsAffected: number
        noticeID: number
      }
    }
  }

  export namespace Exam {
    export namespace Take {
      export namespace Answer {
        export interface Post extends Data.TytoResponse {
          // * Successful Response is void of any specific data
        }
      }

      export namespace Complete {
        export interface Put {
          recordsAffected: number
        }
      }

      export namespace Evaluate {
        export namespace Response {
          export interface Put extends Data.TytoResponse {
            recordsAffected: number
          }
        }
      }

      export namespace InviteConfig {
        export interface Get extends Data.TytoResponse {
          examTakeConfiguration: TytoData.Exam.ExamTakeConfiguration
        }
      }

      export namespace Question {
        export interface Get extends Data.TytoResponse {
          invite: TytoData.Exam.QuestionInvite
          response: TytoData.Exam.Response
        }
      }

      // * Invite; Singular
      export namespace TrainingInvite {
        export interface Put extends Data.TytoResponse {
          recordsAffected: nunmber
          examTaskInviteID: number
          // * Successful Response is void of any specific data
        }
      }

      // * Invites; Plural
      export namespace TrainingInvites {
        export interface Get extends Data.TytoResponse {
          examTakeConfiguration: TytoData.Exam.ExamTakeConfiguration
        }
      }
    }
  }

  export namespace Identity {
    export namespace Authorization {
      export interface Get extends Data.TytoResponse {
        authRequestState: TytoData.OAuthResult.ThinSkippy.AuthRequestState
      }

      export namespace Login {
        export interface Get extends Data.TytoResponse {}
      }
    }
  }

  export namespace Launch {
    export namespace Enrollment {
      export interface Get extends Data.TytoResponse {
        enrollment: TytoData.Blocks.Enrollment
      }

      export interface Put extends Data.TytoResponse {
        recordsAffected: number
      }
    }
  }

  export namespace Lesson {
    export interface Get extends Data.TytoResponse {
      lesson: TytoData.Lesson
      session: Data.SessionData
    }

    export namespace ViewHistory {
      export interface Post extends Data.NonGetTytoResponse {
        lessonViewHistoryGUID: string
      }

      export namespace PageMarker {
        export interface Get extends Data.TytoResponse {
          pagemarkerSummary: any[]
        }

        export interface Post extends Data.NonGetTytoResponse {
          // * Response contains no details
        }
      }
    }
  }

  export namespace Person {
    export namespace AdvancedSearch {
      export interface Get extends Data.TytoResponse {
        ret: {
          people: Data.AdvancedPersonSearch.Person[]
        }
      }
    }
  }

  export namespace PrerequisiteEnrollments {
    export interface Get extends Data.TytoResponse {
      blockLogic: keyof typeof TytoData.TaskOrder
      prerequisiteEnrollments: TytoData.Blocks.PrerequisiteEnrollment[]
    }
  }

  export namespace ReportPreference {
    export interface Delete extends Data.TytoResponse {}

    export interface Post extends Data.TytoResponse {
      reportPreferenceID: number
    }

    export interface Put extends Data.TytoResponse {}
  }

  export namespace ReportPreferences {
    export interface Get extends Data.TytoResponse {
      reportPreferences: TytoData.ReportPreference[]
    }
  }

  export namespace Search {
    export namespace Lesson {
      export interface Get extends Data.TytoResponse {
        result: {
          resultCacheDate: string | Date
          permissionCacheDate: string | Date
          searchID: number
          resultCount: number
          assetNameExactFactor: number
          lessonNameExactFactor: number
          lessonNameContainsFactor: number
          lessonNameFreetextFactor: number
          lessonDescFreetextFactor: number
          lessonDescContainsFactor: number
          keywordExactFactor: number
          contentContainsFactor: number
          contentFreetextFactor: number
          halfLifeDaysFactor: number // * As Decimal
          hitPercentFactor: number
          results: Array<{
            relevanceRank: number
            lessonNameExact: number
            lessonNameContains: number
            lessonNameFreetext: number
            lessonDescFreetext: number
            lessonDescContains: number
            keywordExact: number
            scoreLesson: number
            scoreLessonDecayed: number
            assetNameExact: number
            contentContains: number
            contentFreetext: number
            scoreAsset: number
            scoreAssetDecayed: number
            hitsDecayed: number
            scoreHitMultiplier: number
            hasDelete: boolean
            hasChange: boolean
            permissionSources: {
              blocks: boolean
              catalogCurriculumPub: boolean
              devPlans: boolean
              devTask: boolean
              enrollment: boolean
              exam: boolean
              examTpa: boolean
              explicitPermission: boolean
              lessons: boolean
              libraryBackTeam: boolean
              libraryFrontPerson: boolean
              libraryFrontTeam: boolean
              newsTeam: boolean
              noticeTeam: boolean
              noticesPerson: boolean
              survey: boolean
            }
            assets: Array<Data.Asset>
            starRating: {
              countRatings: number
              sessionUsersRating: number
              sumAllRatings: number
            }
            element: {
              assetType: TytoData.AssetType
              createdBy: { ocType: keyof typeof TytoData.ocType }
              ocType: keyof typeof TytoData.ocType
              createdByID: number
              createdDate: string
              domainID: number
              expirationDate: string
              exposureCalc: 'ocSHARED'
              isAnswerKey: boolean
              itemType: keyof typeof TytoData.ItemType
              lessonDesc: string
              lessonID: number
              lessonItemType: keyof typeof TytoData.LessonItemType
              lessonName: string
              locID: number
              modifiedDate: string
              name: string
              ocType: keyof typeof TytoData.ocType
              primaryElementID: number
            }
          }> // TODO
        }
      }

      export interface Post extends Endpoints.Responses.Search.Lesson.Get {
        // TODO
      }
    }
  }

  export namespace Task {
    export namespace Structure {
      export interface Get extends Data.TytoResponse {
        task: {
          delegateParticipationRoles: any[]
          members: TytoData.Tasks.Member[]
          // session: Data.SessionData;
          taskRelations: TytoData.Tasks.TaskRelation[]
          tasks: TytoData.Tasks.Task[]
        }
      }
    }

    export namespace VerificationRequest {
      export interface Put extends Data.TytoResponse {
        recordsAffected: number
        noticeID: number
      }
    }
  }

  export namespace Tasks {
    export interface Put extends Data.TytoResponse {
      recordsAffected: number
      taskID: number
    }
  }

  export namespace TeamsByFunction {
    export interface Get extends Data.TytoResponse {
      teams: TytoData.Team[]
    }
  }

  export namespace TimeZones {
    export interface Get extends Data.TytoResponse {
      timeZones: TytoData.TimeZones.TimeZone[]
    }
  }

  export namespace Training {
    export interface Get extends Data.TytoResponse {
      hasAdd: boolean
      links: any[]
      subBlocks: Array<TytoData.Training.SubBlock>
      training: Array<TytoData.Training.Enrollment | TytoData.Training.Task>
      session: Data.SessionData
    }

    export namespace Detail {
      export interface Get extends Data.TytoResponse {
        trainingSummary: Array<TytoData.Training.Summary>
        daysActive: number
      }
    }

    export namespace Summary1482 {
      export interface Get {
        trainingSummary: TytoData.Training.Summary.Item[]
      }
    }
  }
}

export namespace TytoEndpoints {
  export namespace CatalogItem {
    export namespace Post {
      export type Parameters = CatalogItemPostParameters
      export type Response = CatalogItemPostResponse
    }
    export namespace Put {
      export type Parameters = CatalogItemPutParameters
      export type Response = CatalogItemPutResponse
    }
  }
}

/**
 * @deprecated Please see the generator for the new pattern (px g @spacedock/warp:tyto-resource)
 */
export namespace Endpoints {
  export namespace Tyto {
    export namespace AccountSession {
      export interface PostParameters {
        appBrand?: string
        appVersion?: string
        computerID?: string
        forceNew?: boolean
        personID?: number
        sessionKey?: string
        timeOutMinutes?: number
      }

      export namespace Get {
        export interface Parameters {
          sessionKey?: string
        }

        export interface Response extends Data.TytoResponse {}
      }
    }

    export namespace Asset {
      export namespace Encoding {
        export interface DeleteParameters {
          assetID: number
          reason: string // Actually optional, but lets make it required.
          assetAltEncodingID?: number
        }

        export namespace Delete {
          export interface Parameters
            extends Endpoints.Tyto.Asset.Encoding.DeleteParameters {}
          export interface Response
            extends Endpoints.Responses.Asset.Encoding.Delete {}
        }

        export interface PostParameters {
          assetID: number
        }

        export interface PostResponse
          extends Endpoints.Responses.Asset.Encoding.Post {}

        export namespace Post {
          export interface Parameters
            extends Endpoints.Tyto.Asset.Encoding.PostParameters {}
          export interface Response
            extends Endpoints.Responses.Asset.Encoding.PostResponse {}
        }
      }
    }

    export namespace Block {
      export interface GetParameters {
        blockID: number
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.Block.GetParameters {}
        export interface Response extends Endpoints.Responses.Block.Get {}
      }

      export namespace Enrollment {
        export interface PostParameters {
          blockID: number
          memberID: number
          isCascade?: boolean
          persistTeamRegistration?: boolean
          dueDate?: string
          roleID?: number
          isOnlyCount?: boolean
          suppressEmail?: boolean
          isNoticeDisabled?: boolean
          onlyNewMembers?: number
          outSideType?: string
        }

        export namespace Post {
          export interface Parameters
            extends Endpoints.Tyto.Block.Enrollment.PostParameters {
            blockID: number
            memberID: number
            isCascade?: boolean
            persistTeamRegistration?: boolean
            dueDate?: string
            roleID?: number
            isOnlyCount?: boolean
            suppressEmail?: boolean
            isNoticeDisabled?: boolean
            onlyNewMembers?: boolean
            outSideType?: string
            discardEnrollmentBeforeDate?: DateISO8601
          }
          export interface Response
            extends Endpoints.Responses.Block.Enrollment.Post,
              TytoBaseResponse {
            recordsAffected: number
            registrationCount: number
          }
        }
      }

      export namespace Prerequisites {
        export interface GetParameters {
          blockID: number
        }

        export namespace Get {
          export interface Parameters
            extends Endpoints.Tyto.Block.Prerequisites.GetParameters {}
          export interface Response
            extends Endpoints.Responses.Block.Prerequisites.Get {}
        }
      }
    }

    export namespace CatalogInbox {
      export namespace Delete {
        export interface Parameters {
          catalogID: number
          isSimpleViewDelete?: boolean
        }

        export interface Response {}
      }

      export namespace Get {
        export interface Parameters {
          parentCatalogID?: number
          primaryElementIDs?: number[]
          showExpired?: boolean
          catalogPathName?: string
          topItem?: number
          itemActiveStatus?: string
        }

        export interface Response extends TytoBaseResponse {
          catalogs: Array<Data.InboxCategory>
          securityTraits: Array<{
            traitID: number
            traitName: string
            traitDesc: string
            domainID: number
            teamRoot: number
            color: string
            aboutType: string
            traitCategory: string
            seq: number
            activeStatus: string
            modifiedByID: number
            modifiedDate: string
            createdByID: number
            createdDate: string
            iconPath: string
            ssoMethod: string
            onCourseUrl: string
          }>
          domains: Array<{
            domainID: number
            audienceDescLabel: string
            difficultyDescLabel: string
            expectationDescLabel: string
          }>
          primaryElements: Array<{
            teamID: number
            subDomainParentNamePath: string
            parentNamePath: string
            teamName: string
            iPath: string
          }>
        }
      }

      export namespace Post {
        export interface Parameters {
          parentCatalogID: number
          primaryElementID: number
          name: string
          thumbnailPath?: string
          description?: string
          siblingSeq?: number
        }

        export interface Response extends TytoBaseResponse {
          catalogID: number
          recordsAffected: number
        }
      }

      export namespace Put {
        export interface Parameters {
          catalogID: number
          parentCatalogID?: number
          name: string
          /**
           * The user ID that the catalog item belongs to
           */
          primaryElementID?: number
          isSimpleViewUpdate?: boolean
          thumbnailPath?: string
          description?: string
          siblingSeq?: number
        }

        export interface Response extends TytoBaseResponse {
          catalogID: number
        }
      }
    }

    export namespace CatalogCurriculumPublication {
      export interface GetParameters {
        parentCatalogID?: number
        primaryElementIDs?: number[]
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.CatalogCurriculumPublication.GetParameters {}
        export interface Response
          extends Endpoints.Responses.CatalogCurriculumPublication.Get {}
      }

      export namespace SearchLessonContent {
        export interface GetParameters {
          searchString: string
          parentCatalogID?: number
          domainID?: number
          isCrossDomain?: boolean
          top?: number
        }

        export namespace Get {
          export interface Parameters
            extends Endpoints.Tyto.CatalogCurriculumPublication
              .SearchLessonContent.GetParameters {}
          export interface Response
            extends Endpoints.Responses.CatalogCurriculumPublication.Get {}
        }
      }
    }

    export namespace CatalogVCEP {
      export namespace Get {
        export interface Parameters {
          parentCatalogID?: number
          primaryElementIDs?: number[]
          showExpired?: boolean
          catalogPathName?: string
          topItem?: number
          itemActiveStatus?: string
        }

        export interface Response extends Data.TytoResponse {
          catalogs: TytoData.Catalog.Category[]
          securityTraits: unknown[] // TODO
          domains: TytoData.Catalog.DomainLabel[]
          primaryElements: TytoData.Catalog.PrimaryElement[]
        }
      }

      export namespace Delete {
        export interface Parameters {
          catalogID: number
          isSimpleViewDelete?: boolean
        }

        export interface Response extends Data.NonGetTytoResponse {}
      }

      export namespace Post {
        export interface Parameters {
          parentCatalogID?: number
          thumbnailPath?: string
          name?: string
          description?: string
          primaryElementID?: number
          siblingSeq?: number
        }

        export interface Response extends Data.NonGetTytoResponse {
          catalogID: number
        }
      }

      export namespace Put {
        export interface Parameters {
          catalogID: number
          parentCatalogID?: number
          thumbnailPath?: string
          isSimpleViewUpdate?: boolean
          name?: string
          description?: string
          primaryElementID?: number
          siblingSeq?: number
        }

        export interface Response extends Data.NonGetTytoResponse {
          catalogID: number
        }
      }
    }

    export namespace Configuration {
      export namespace Client {
        export interface GetParameters {}

        export namespace Get {
          export interface Parameters
            extends Endpoints.Tyto.Configuration.Client.GetParameters {}

          export interface Response extends TytoData.Configuration.Client {}
        }
      }
    }

    export namespace CurriculumPubCatalogItemsTrending {
      export interface GetParameters {
        domainID?: number
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.CurriculumPubCatalogItemsTrending
            .GetParameters {}
        export interface Response
          extends Endpoints.Responses.CurriculumPubCatalogItemsTrending.Get {}
      }
    }

    export namespace DevPlanEnrollment {
      export interface PostRequest {
        memberID: number
        devPlanID: number
        enrollTeamAsParticipant?: boolean
        startDate?: string
        isNoticeDisabled?: boolean
        roleID?: number
        persistTeamReg?: number
        cascade?: boolean
        onlyNewMembers?: boolean
        outSideType?: boolean
      }

      export namespace Post {
        export interface Request
          extends Endpoints.Tyto.DevPlanEnrollment.PostRequest {}
        export interface Response
          extends Endpoints.Responses.DevPlan.Enrollment.Post {}
      }
    }

    export namespace Enrollment {
      export namespace Scorm {
        export namespace v1p2 {
          export interface PutParameters {
            enrollmentID: number
            cmi: {
              name: string
              value: string
            }
          }

          export namespace Put {
            export interface Parameters
              extends Endpoints.Tyto.Enrollment.Scorm.v1p2.PutParameters {}
            // TODO
            export interface Response {}
          }
        }

        export namespace v1p3 {
          export interface PutParameters {
            enrollmentID: number
            cmi: {
              name: string
              value: string
            }
          }

          export namespace Put {
            export interface Parameters
              extends Endpoints.Tyto.Enrollment.Scorm.v1p3.PutParameters {}
            // TODO
            export interface Response {}
          }
        }
      }

      export namespace VerificationRequest {
        export interface PutParameters {
          enrollmentID: number
          commentText?: string
          commentAboutIDs?: string
          commentAboutTypes?: string
          verifierMemberIDs?: string
        }

        export namespace Put {
          export interface Parameters
            extends Endpoints.Tyto.Enrollment.VerificationRequest
              .PutParameters {}
          export interface Response
            extends Endpoints.Responses.Enrollment.VerificationRequest.Put {}
        }
      }
    }

    export namespace Exam {
      export namespace Take {
        export namespace Answer {
          export interface PostParameters {
            examResponseID: number
            rTexts: string[]
            examTaskInviteID: number
          }

          export namespace Post {
            export interface Parameters
              extends Endpoints.Tyto.Exam.Take.Answer.PostParameters {}
            export interface Response
              extends Endpoints.Responses.Exam.Take.Answer.Post {}
          }
        }

        export namespace Complete {
          export interface PutParameters {
            examTaskInviteID: number
          }

          export namespace Put {
            export interface Parameters
              extends Endpoints.Tyto.Exam.Take.Complete.PutParameters {}
            export interface Response
              extends Endpoints.Responses.Exam.Take.Complete.Put {}
          }
        }

        export namespace Evaluate {
          export namespace Response {
            export interface PutParameters {
              examResponseID: number
              examTaskInviteID: number
            }

            export namespace Put {
              export interface Parameters
                extends Endpoints.Tyto.Exam.Take.Evaluate.Response
                  .PutParameters {}
              export interface Response
                extends Endpoints.Responses.Exam.Take.Evaluate.Response.Put {}
            }
          }
        }

        export namespace InviteConfig {
          export interface GetParameters {
            examTaskInviteID: number
          }

          export namespace Get {
            export interface Parameters
              extends Endpoints.Tyto.Exam.Take.InviteConfig.GetParameters {}
            export interface Response
              extends Endpoints.Responses.Exam.Take.InviteConfig.Get {}
          }
        }

        export namespace Question {
          export interface GetParameters {
            examTaskInviteID: number
            sequenceGreaterThan?: number
            unanswered?: boolean
            unasked?: boolean
          }

          export namespace Get {
            export interface Parameters
              extends Endpoints.Tyto.Exam.Take.Question.GetParameters {}
            export interface Response
              extends Endpoints.Responses.Exam.Take.Question.Get {}
          }
        }

        // * Invite; Singular
        export namespace TrainingInvite {
          export interface PutParameters {
            devTaskID?: number
            enrollmentID?: number
          }

          export namespace Put {
            export interface Parameters
              extends Endpoints.Tyto.Exam.Take.TrainingInvite.PutParameters {}
            export interface Response
              extends Endpoints.Responses.Exam.Take.TrainingInvite.Put {}
          }
        }

        // * Invites; Plural
        export namespace TrainingInvites {
          export interface GetParameters {
            devTaskID?: number
            enrollmentID?: number
          }

          export namespace Get {
            export interface Parameters
              extends Endpoints.Tyto.Exam.Take.TrainingInvites.GetParameters {}
            export interface Response
              extends Endpoints.Responses.Exam.Take.TrainingInvites.Get {}
          }
        }
      }
    }

    export interface MetaArgs {
      sessionKey?: string
    }

    export namespace DevPlan {
      export namespace Enrollment {
        export interface PostParameters {
          devPlanID: number
          memberID: number
          cascade?: boolean
          enrollTeamAsParticipant?: boolean
          isNoticeDisabled?: boolean
          onlyNewMembers?: number
          outSideType?: string
          persistTeamReg?: boolean
          roleID?: number
          startDate?: string
        }

        export namespace Post {
          export interface Parameters
            extends Endpoints.Tyto.DevPlan.Enrollment.PostParameters {}
          export interface Response
            extends Endpoints.Responses.DevPlan.Enrollment.Post {}
        }
      }
    }

    export namespace DevPlanVCE {
      export namespace Get {
        export interface Parameters {
          domainID?: number
          filterIsExpired?: boolean
          filterConstructionMode?: string
          filterGeneral?: string
          devPlanID?: number
        }

        export interface Response extends Data.TytoResponse {
          devPlanVCEs: TytoData.DevPlanVCE.DevPlanVCE[]
        }
      }

      export namespace Delete {
        export interface Parameters {
          devPlanID: number
          activeStatus?: keyof typeof TytoData.ActiveStatus
        }

        export interface Response extends Data.NonGetTytoResponse {}
      }

      export namespace Post {
        export interface Parameters {
          vceplanObject?: TytoData.DevPlanVCE.VCEPlanObject
          devplanName: string
          devplanDesc?: string
          devplanType?: string
          outsideID?: string
          forceSequential?: boolean
          useSimpleDuration?: boolean
          expirationDate?: string
          constructionMode?: TytoData.ConstructionMode
          primaryElementID?: Int
        }

        export interface Response extends Data.NonGetTytoResponse {
          devPlanID: number
        }
      }

      export namespace Put {
        export interface Parameters {
          vceplanObject?: TytoData.DevPlanVCE.VCEPlanObject
          devPlanID: number
          devplanName?: string
          devplanDesc?: string
          devplanType?: string
          outsideID?: string
          forceSequential?: boolean
          useSimpleDuration?: boolean
          expirationDate?: string
          constructionMode?: TytoData.ConstructionMode
          teamRoot?: number
          profileImageID?: number
          profileImageFeaturedID?: number
          profileImageUploadKey?: string
          profileImageFeaturedUploadKey?: string
          reminder?: TytoData.DevPlanVCE.ReminderState
          authorID?: number
          expectationDesc?: string
          audienceDesc?: string
          durationEstimate?: string
          difficultyDesc?: string
        }

        export interface Response extends Data.NonGetTytoResponse {}
      }

      export namespace Uncategorized {
        export namespace Get {
          export interface Parameters {
            domainID?: number
          }

          export interface Response extends Data.TytoResponse {
            plans: {
              elementID: number
              elementName: string
              elementDesc: string
              elementType: string
              elementSubType: string
              activeStatus: string
              domainID: number
              outsideID: string
              createdBy: number
              createdDate: string
              primaryElementID: number
              elementModifiedBy: number
              elementModifiedDate: string
              elementShareChangedDate: string
              elementShareChangedBy: number
            }[]
          }
        }
      }
    }

    export namespace DevPlanStep {
      export interface RecurrenceRule {
        period?:
          | 'ocVACANT'
          | 'ocSECONDLY'
          | 'ocMINUTELY'
          | 'ocINTRADAY'
          | 'ocHOURLY'
          | 'ocDAILY'
          | 'ocWEEKLY'
          | 'ocMONTHLY'
          | 'ocYEARLY'
        interval?: number
        isSunday?: boolean
        isMonday?: boolean
        isTuesday?: boolean
        isWednesday?: boolean
        isThursday?: boolean
        isFriday?: boolean
        isSaturday?: boolean
        ordinal?: TytoData.OrdinalRecurrence
        foo: TytoData.Ordinal
        untilCount?: number
        untilDate?: string
      }

      export namespace Delete {
        export interface Parameters {
          devPlanStepID: number
        }

        export interface Response extends Data.NonGetTytoResponse {}
      }

      export namespace Post {
        export interface Parameters {
          devPlanID: number
          stepName?: string
          stepDesc?: string
          stepType?: string
          isMentorOnlyCompletion?: boolean
          aboutID?: number
          aboutType?: string
          areChildrenSequential?: boolean
          isCompletionOptional?: boolean
          daysUntilDueFromSiblingCompletion?: number
          absoluteDueDate?: string
          isRecurrenceScheduledPriorToCompletion?: boolean
          setStatus?: number
          parentDevplanStepID?: number
          childDevplanStepID?: number
          durationMinutes?: number
          recurrenceRules?: Endpoints.Tyto.DevPlanStep.RecurrenceRule
        }

        export interface Response extends Data.NonGetTytoResponse {
          devPlanStepID: number
        }
      }

      export namespace Put {
        export interface Parameters {
          devPlanStepID: number
          stepName?: string
          stepDesc?: string
          stepType?: string
          isMentorOnlyCompletion?: boolean
          aboutID?: number
          aboutType?: string
          areChildrenSequential?: boolean
          isCompletionOptional?: boolean
          daysUntilDueFromSiblingCompletion?: number
          absoluteDueDate?: string
          isRecurrenceScheduledPriorToCompletion?: boolean
          setStatus?: number
          attemptCountMax?: number
          durationMinutes?: number
          recurrenceRules?: Endpoints.Tyto.DevPlanStep.RecurrenceRule
        }

        export interface Response extends Data.NonGetTytoResponse {}
      }
    }

    export namespace DevPlanStepRelation {
      export namespace Delete {
        export interface Parameters {
          parentDevplanStepID: number
          childDevplanStepID: number
        }

        export interface Response extends Data.NonGetTytoResponse {}
      }

      export namespace Post {
        export interface Parameters {
          parentDevplanStepID: number
          childDevplanStepID: number
          seq?: number
          afterDevplanStepID?: number
        }

        export interface Response extends Data.NonGetTytoResponse {}
      }

      export namespace Put {
        export interface Parameters {
          parentDevplanStepID: number
          childDevplanStepID: number
          seq?: number
          afterDevplanStepID?: number
        }

        export interface Response extends Data.NonGetTytoResponse {}
      }
    }

    export namespace DevPlanStepVCEP {
      export namespace Post {
        export interface Parameters {
          about: {
            assignTypeMember: string
            assignTypeMentor: string
            descExt: string
            effortMinutesMember: number
            effortMinutesMentor: number
            name: string
          }
          devPlanID: number
          parentDevplanStepID?: number
          childDevplanStepID?: number
          isMentorOnlyCompletion?: boolean
          areChildrenSequential?: boolean
          daysUntilDueFromSiblingCompletion?: number
        }

        export interface Response extends Data.NonGetTytoResponse {
          devPlanStepID: number
        }
      }

      export namespace Put {
        export interface Parameters {
          about?: {
            assignTypeMember: string
            assignTypeMentor: string
            descExt: string
            effortMinutesMember: number
            effortMinutesMentor: number
            name: string
            vcepItemID: number
          }
          devPlanStepID: number
          stepType?: 'ocVACANT'
          areChildrenSequential?: boolean
          isCompletionOptional?: boolean
          daysUntilDueFromSiblingCompletion?: number
          recurrenceRules?: Endpoints.Tyto.DevPlanStep.RecurrenceRule
        }

        export interface Response extends Data.NonGetTytoResponse {
          devPlanStepID: number
        }
      }
    }

    export namespace DevPlanSteps {
      export namespace Get {
        export interface Parameters {
          devPlanID: number
        }

        export interface Response extends Data.TytoResponse {
          stepRelations: TytoData.Tasks.StepRelation[]
          steps: TytoData.Tasks.VCEPStep[]
        }
      }

      export namespace Clone {
        export namespace Post {
          export interface Parameters {
            devplanMasterIDSource: number
            devplanMasterIDDestination: number
            isDeepClone?: boolean
          }

          export interface Response extends Data.NonGetTytoResponse {
            stepCount: number
          }
        }
      }
    }

    export namespace DISCProfiles {
      export interface GetParameters {
        activeStatus?: 'ocDISABLED' | 'ocENABLED'
        isCascade?: boolean
        personIDs?: string
        teamIDs?: string
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.DISCProfiles.GetParameters {}
        // TODO
        export interface Response {}
      }

      export namespace EmailViewReady {
        export interface PostParameters {
          memberID: number
          isCascade?: boolean
        }

        export namespace Post {
          export interface Parameters
            extends Endpoints.Tyto.DISCProfiles.EmailViewReady.PostParameters {}
          // TODO
          export interface Response {}
        }
      }
    }

    export namespace DISCProfile {
      export namespace Interactive {
        export interface GetParameters {
          personID: number
        }

        export namespace Get {
          export interface Parameters
            extends Endpoints.Tyto.DISCProfile.Interactive.GetParameters {}
          // TODO
          export interface Response {}
        }

        export namespace Mockup {
          export interface GetParameters {
            personID: number
            overRideD?: number
            overRideI?: number
            overRideS?: number
            overRideC?: number
            interactPersonID?: number
            overRideInteractD?: number
            overRideInteractI?: number
            overRideInteractS?: number
            overRideInteractC?: number
          }

          export namespace Get {
            export interface Parameters
              extends Endpoints.Tyto.DISCProfile.Interactive.Mockup
                .GetParameters {}
            // TODO
            export interface Response {}
          }
        }
      }

      export namespace Team {
        export interface GetParameters {
          styleKey: string
        }

        export namespace Get {
          export interface Parameters
            extends Endpoints.Tyto.DISCProfile.Team.GetParameters {}
          // TODO
          export interface Response {}
        }
      }
    }

    export namespace EmailQueueStatus {
      export interface GetParameters {
        emailKey: string
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.EmailQueueStatus.GetParameters {}
        // TODO
        export interface Response {}
      }

      export namespace User {
        export interface GetParameters {
          personID?: number
          top?: number
        }

        export namespace Get {
          export interface Parameters
            extends Endpoints.Tyto.EmailQueueStatus.User.GetParameters {}
          // TODO
          export interface Response {}
        }
      }
    }

    export namespace Teamboard {
      export interface GetParameters {
        teamIDs: string
        top?: number
        sort1?: string
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.Teamboard.GetParameters {}
        // TODO
        export interface Response {}
      }
    }

    export namespace DISCProfileMini {
      export interface PutParameters {
        discOptOut?: keyof typeof Tyto.DiscOptOut
        personID: number
        dischost?: string
        teamToolsPermit?: {
          mayTakeDisc: boolean
          mayImportDisc: boolean
          mayTakeBasicTrain: boolean
          mayTakeAdvTrain: boolean
          hasBasicViewDisc: boolean
          hasAdvViewDisc: boolean
          hasPermitChange: boolean
          hasGrantPermitChange: boolean
        }
        testDate?: string | Date
      }
    }

    export namespace DISCProfilesMini {
      type GetParameters = Get.Parameters

      export namespace Get {
        export interface Parameters {
          domainID?: number
          emails?: string[]
          isCascade?: boolean
          personIDs?: number[] | string
          teamID?: number
        }

        export interface Response {
          discProfiles: TytoData.DISCProfileMini[]
          permit: {
            hasAdvanceView: boolean
            hasBasicView: boolean
            isSelf: boolean
            optOutLevel: TytoData.DiscOptOut
            spoilerMode: string
            subjectReveal: boolean
          }
        }
      }
    }

    export namespace DomainBilling {
      export interface GetParameters {
        domainID: number
        billingPeriodBeginDate: Date | string
        billingPeriodEndDate?: Date | string
      }
    }

    export namespace DomainBillings {
      export interface GetParameters {}
    }

    export namespace Domain {
      export namespace Get {
        export interface Parameters {
          domainID: number
        }

        export interface Response {
          domain: TytoData.Domain
        }
      }

      export namespace Post {
        export interface Parameters {
          domainType?: 'ocKVAULT' | 'ocSUPPORT' | 'ocTEAMTOOLS' | 'ocTRYYB'
          adminRoleID?: number
          studentRoleID?: number
          primaryElementID: number
          teamName: string
        }

        export interface Response {
          recordsAffected: number
          domainID: number
        }
      }

      export namespace Put {
        export interface Parameters {
          domainID: number
          activateAccountLabel?: string
          activateAccountURI?: string
          achievementIconAlbumID?: number
          audienceDescLabel?: string
          autoMailURI?: string
          certificateAssetID?: number
          contactEmail?: string
          contactName?: string
          contactPhone?: string
          defaultRoleID?: number
          difficultyDescLabel?: string
          emailNoticeScreen?: string
          expectationDescLabel?: string
          forgotPWLabel?: string
          forgotPWURI?: string
          generalMessage?: string
          generalSubject?: string
          inviteMessage?: string
          inviteSubject?: string
          isSingleSignOn?: boolean
          labelPersonal1?: string
          labelPersonal2?: string
          labelPersonal3?: string
          labelPersonal4?: string
          loginDomainID?: string
          loginNameLabel?: string
          loginURI?: string
          logoutURI?: string
          onCourseURL?: string
          otherName?: string
          passwordExpiresDays?: number
          pkApiAuthID?: number
          personEditURL?: string
          showKeepMeLoggedIn?: boolean
          skinPath?: string
        }

        export interface Response {
          recordsAffected: number
        }
      }

      export namespace Image {
        export interface PostParameters {
          cancellationToken?: string
          domainID: number
          imageUploadKey: string
          selector?: string
          targetFileName?: string
          type: 'StartBackground' | 'LoginBackground' | 'Logo' | 'Style'
        }
      }

      export namespace Messages {
        export interface GetParameters {
          domainID: number
          messageType?: string
        }
      }

      export namespace Message {
        export interface PutParameters {
          domainID: number
          messageType: string
          headline?: string
          bodyHtml?: string
          bodyPlain?: string
        }
      }
    }

    export namespace DomainInvitationEmail {
      export interface PostParameters {
        cascade?: boolean
        memberID: number
        subject: string
        body: string
        fromName: string
        replyAddress: string
        sendOnlyHaveNotLoggedIn?: boolean
        useNewHttpLink?: boolean
      }

      export namespace Template {
        export interface GetParameters {
          domainID: number
        }
      }
    }

    export namespace Identity {
      export namespace Authorization {
        export namespace Login {
          export interface GetParameters {
            callbackURI: string
            identityProviderGUID: string
          }

          export namespace Get {
            export interface Parameters
              extends Endpoints.Tyto.Identity.Authorization.Login
                .GetParameters {}
            export interface Response
              extends Endpoints.Responses.Identity.Authorization.Login.Get {}
          }
        }
      }
    }

    export namespace Inbox {
      export namespace Delete {
        export interface Parameters {
          noticeID: number
          activeStatus?: 'ocDISABLED' | 'ocENABLED' | 'ocARCHIVE'
        }

        export interface Response extends TytoResponseNonGet {}
      }

      export namespace Get {
        export interface Parameters {
          toElementID?: number
          fromElementID?: number
          top?: number
          dateStart?: string
          dateEnd?: string
          sort1?: string
          isNew?: boolean
          isCritical?: boolean
          findText?: string
          activeStatus?: 'ocENABLED' | 'ocDISABLED' | 'ocARCHIVE' | 'ocDRAFT'
          noticeID?: number
          membersOfElementID?: number
          changeIsNewTo?: boolean
          excludeCategorized?: boolean
          categoryID?: number
          fetchArchives?: boolean
        }

        export interface Response extends TytoBaseResponse {
          notices: Array<Data.ConversationsNotice | Data.ConversationNotice>
          participants: Array<Data.Notice.Participant>
        }
      }

      export namespace Post {
        export interface Parameters {
          toElementIDs?: string
          fromElementID?: number
          noticeSubject: string
          noticeText: string
          aboutIDs?: string
          aboutTypes?: string
          isDraft?: boolean
          noticeID?: number
        }

        export interface Response extends Data.NonGetTytoResponse {
          noticeID: number
        }
      }

      export namespace Comment {
        export namespace Delete {
          export interface Parameters {
            noticeCommentID: number
          }

          export interface Response {}
        }

        export namespace Post {
          export interface Parameters {
            noticeID: number
            commentText: string
            aboutIDs?: string
            aboutTypes?: string
            isDraft?: boolean
          }

          export interface Response extends TytoBaseResponse {
            recordsAffected: number
            noticeCommentID: number
          }
        }

        export namespace Put {
          export interface Parameters {
            noticeCommentID: number
            commentText?: string
            aboutIDs?: string
            aboutTypes?: string
          }

          export interface Response extends Data.NonGetTytoResponse {}
        }

        export namespace Like {
          export namespace Put {
            export interface Parameters {
              noticeCommentID: number
            }

            export interface Response extends Data.NonGetTytoResponse {}
          }
        }

        export namespace Unlike {
          export namespace Put {
            export interface Parameters {
              noticeCommentID: number
            }

            export interface Response extends Data.NonGetTytoResponse {}
          }
        }
      }

      export namespace Member {
        export namespace Delete {
          export interface Parameters {
            noticeID: number
            memberID: number
          }

          export interface Response {}
        }

        export namespace Post {
          export interface Parameters {
            noticeID: number
            memberID: number
          }

          export interface Response extends Data.NonGetTytoResponse {
            noticeID: number
          }
        }
      }
    }

    export namespace ThinSkippy {
      export namespace Identity {
        export namespace Authorization {
          export interface GetParameters {
            StateCSRF: string
          }

          export namespace Get {
            export interface Parameters
              extends Endpoints.Tyto.ThinSkippy.Identity.Authorization
                .GetParameters {}
            export interface Response
              extends Endpoints.Responses.Identity.Authorization.Get {}
          }

          export namespace Login {
            export interface GetParameters {
              accountID: number | string
              callbackURI: string
              identityProviderGUID: string
            }

            export namespace Get {
              export interface Parameters
                extends Endpoints.Tyto.ThinSkippy.Identity.Authorization.Login
                  .GetParameters {}
              export interface Response
                extends Endpoints.Responses.Identity.Authorization.Login.Get {}
            }
          }
        }
      }
    }

    export namespace Launch {
      export namespace Enrollment {
        export interface GetParameters {
          enrollmentID?: number
          curriculumID?: number
          memberID?: number
        }

        export namespace Get {
          export interface Parameters
            extends Endpoints.Tyto.Launch.Enrollment.GetParameters {}
          export interface Response
            extends Endpoints.Responses.Launch.Enrollment.Get {}
        }

        export interface PutParameters {
          enrollmentID?: number
          completeStatus?:
            | 'ocVACANT'
            | 'ocNOTSTARTED'
            | 'ocINCOMPLETE'
            | 'ocCOMPLETE'
          passStatus?: keyof typeof TytoData.PassStatus
          score?: number
          bookMark?: string
          comment?: string
          mentorID?: number
          creditID?: number
          dueDate?: DateTime
          location?: string
          completedDate?: string
        }

        export namespace Put {
          export interface Parameters
            extends Endpoints.Tyto.Launch.Enrollment.PutParameters {}
          export interface Response
            extends Endpoints.Responses.Launch.Enrollment.Put {}
        }
      }
    }

    export namespace Lesson {
      export interface GetParameters {
        lessonID: number
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.Lesson.GetParameters {}
        export interface Response {
          lesson: TytoData.Lesson
        }
      }

      export namespace ViewHistory {
        export interface PostParameters {
          assetEncoding: keyof typeof TytoData.EncodingType
          assetID: number
          lessonID: number
        }

        export namespace Post {
          export interface Parameters
            extends Endpoints.Tyto.Lesson.ViewHistory.PostParameters {}
          export interface Response
            extends Endpoints.Responses.Lesson.ViewHistory.Post {}
        }

        export namespace PageMarker {
          export interface GetParameters {
            assetID: number
            beginHistoryDateUtc?: string
            endHistoryDateUtc?: string
          }

          export namespace Get {
            export interface Parameters
              extends Endpoints.Tyto.Lesson.ViewHistory.PageMarker
                .GetParameters {}
            export interface Response
              extends Endpoints.Responses.Lesson.ViewHistory.PageMarker.Get {}
          }

          export interface PostParameters {
            lessonViewHistoryGUID: string
            pagemarker: number
          }

          export namespace Post {
            export interface Parameters
              extends Endpoints.Tyto.Lesson.ViewHistory.PageMarker
                .PostParameters {}
            export interface Response
              extends Endpoints.Responses.Lesson.ViewHistory.PageMarker.Post {}
          }
        }
      }
    }

    export namespace LoginRecover {
      export interface PostParameters {
        emailAddress: string
        browserBrand?: string
        browserVersion?: string
        timeZoneOffset?: number
      }

      export namespace Post {
        export interface Parameters
          extends Endpoints.Tyto.LoginRecover.PostParameters {}
        export interface Response
          extends Endpoints.Responses.LoginRecover.Post {}
      }
    }

    export namespace Team {
      export interface GetParameters {
        teamID: number
      }

      export namespace Get {
        export interface Parameters {
          teamID: number
        }

        export interface Response {
          profileImages: Data.TeamProfileImage[]
          team: TytoData.TeamInfo
        }
      }

      export interface PostParameters {
        primaryElementID: number
        teamName: string
        teamDesc?: string
        address1?: string
        address2?: string
        city?: string
        state?: string
        country?: string
        postalCode?: string
        phone1?: string
        phone2?: string
        email?: string
        fax?: string
        teamLeaderID?: number
        teamLeaderOutsideID?: string
        teamLeaderName?: string
        profileImageID?: number
        dateFounded?: string | Date
        outsideType?: string
        website?: string
        outsideExpirationDate?: string | Date
      }

      export namespace Post {
        export interface Parameters
          extends Endpoints.Tyto.Team.PostParameters {}
        // TODO
        export interface Response {}
      }
      export namespace ProfileImage {
        export namespace Post {
          interface Parameters {
            teamID: number
            fileUploadKey?: string
            imageName?: string
          }

          interface Response {}
        }
      }
    }

    export namespace TeamsByFunction {
      export interface GetParameters {
        above?: boolean
        below?: boolean
        direct?: boolean
        operation: 'ocVIEW' | 'ocADD' | 'ocCHANGE' | 'ocDELETE'
        functionName: FunctionName
        teamType?: 'ocTEAM' | 'ocDOMAIN' | 'ocPROJECT'
        withProfileImage?: boolean
        withExtendedDetails?: boolean
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.TeamsByFunction.GetParameters {}
        export interface Response extends Data.NonGetTytoResponse {
          teams: TytoData.Team[]
        }
      }
    }

    export namespace Menu {
      export interface GetParameters {}

      export namespace Get {
        export interface Parameters extends Endpoints.Tyto.Menu.GetParameters {}
        // TODO
        export interface Response {}
      }
    }

    export namespace LoginAuthenticate {
      export interface GetParameters {}

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.LoginAuthenticate.GetParameters {}
        // TODO
        export interface Response {}
      }

      export interface PostParameters {
        username: string
        password: string
        appBrand?: string
        appVersion?: string
      }

      export namespace Post {
        export interface Parameters
          extends Endpoints.Tyto.LoginAuthenticate.PostParameters {}
        // TODO
        export interface Response {}
      }
    }

    export namespace Login {
      export namespace ResetPassword {
        export interface PostParameters {
          password: string
          sessionKey: string
        }

        export namespace Post {
          export interface Parameters
            extends Endpoints.Tyto.Login.ResetPassword.PostParameters {}
          // TODO
          export interface Response {}
        }

        export namespace Validate {
          export interface GetParameters {}

          export namespace Get {
            export interface Parameters
              extends Endpoints.Tyto.Login.ResetPassword.Validate
                .GetParameters {}
            // TODO
            export interface Response {}
          }
        }
      }
    }

    export namespace Person {
      export namespace MyPassword {
        export interface PutParameters {
          oldPassword: string
          password: string
        }

        export namespace Put {
          export interface Parameters
            extends Endpoints.Tyto.Person.MyPassword.PutParameters {}
          // TODO
          export interface Response {}
        }
      }

      export namespace Notices {
        export interface GetParameters {
          toElementID?: number
          top?: number
          newerThanDate?: string
          olderThanDate?: string
          includeFunctionLinks?: boolean
          isNew?: boolean
          functionNames?: string
        }

        export namespace Get {
          export interface Parameters
            extends Endpoints.Tyto.Person.Notices.GetParameters {}

          export interface Response {
            notices: {
              notices: Array<Data.PersonNotice>
            }
          }
        }
      }

      export namespace Password {
        export interface PutParameters {
          memberID: number
          password: string
          changePassword?: boolean
        }

        export namespace Put {
          export interface Parameters
            extends Endpoints.Tyto.Person.Password.PutParameters {}
          // TODO
          export interface Response {}
        }
      }

      export namespace ProfilePhoto {
        export namespace Post {
          export interface Parameters {
            profileUri?: string
            uploadKey?: string
            userID: number
          }
        }
      }

      export namespace Get {
        export interface Parameters {
          logonName?: string
          domainID?: number
          personID?: number
          outsideID?: string
        }
        export interface Response {
          domainTraits?: any[]
          traits?: any[]
          person: TytoData.Person
        }
      }

      export interface PostParameters {
        roleID?: number
        logonName?: string
        primaryElementID: number
        outsideID?: string
        givenName?: string
        familyName?: string
        familiarName?: string
        password?: string
        changePassword?: boolean
        email?: string
        address1?: string
        address2?: string
        city?: string
        state?: string
        country?: string
        postalCode?: string
        phone1?: string
        phone2?: string
        company?: string
        trainingClass?: string
        experience?: string
        yearsExperience?: Int
        jobTitle?: string
        nativeLanguage?: string
        outsideActiveStatus?: string
        outsideRenewalDate?: string | Date
        industry?: string
        profileImageID?: number
        outsideID?: string
        outsideJoinDate?: string | Date
        outsideTerminateDate?: string | Date
        sessionTimeoutMinutesPreference?: number
        outsideModifiedDate?: string | Date
        outsideType?: string
        urlFacebook?: string
        urlTwitter?: string
        urlLinkedIn?: string
        urlSnapChat?: string
        urlInstagram?: string
        department?: string
        timeZoneNameGeneral?: string
        urlYoutube?: string
        managerID?: number
      }

      export namespace Post {
        export interface Parameters
          extends Endpoints.Tyto.Person.PostParameters {}
        // TODO
        export interface Response {
          personID?: number
        }
      }

      export interface PutParameters {
        personID: number
        roleID?: number
        logonName?: string
        primaryElementID?: number
        outsideID?: string
        givenName?: string
        familyName?: string
        familiarName?: string
        password?: string
        changePassword?: boolean
        email?: string
        address1?: string
        address2?: string
        city?: string
        state?: string
        country?: string
        postalCode?: string
        phone1?: string
        phone2?: string
        company?: string
        trainingClass?: string
        experience?: string
        yearsExperience?: Int
        jobTitle?: string
        nativeLanguage?: string
        outsideActiveStatus?: string
        outsideRenewalDate?: string | Date
        industry?: string
        profileImageID?: number
        outsideID?: string
        outsideJoinDate?: string | Date
        outsideTerminateDate?: string | Date
        sessionTimeoutMinutesPreference?: number
        outsideModifiedDate?: string | Date
        outsideType?: string
        urlFacebook?: string
        urlTwitter?: string
        urlLinkedIn?: string
        urlSnapChat?: string
        urlInstagram?: string
        department?: string
        timeZoneNameGeneral?: string
        teamRoot_primaryElementID?: number
        urlYoutube?: string
        managerID?: number
        birthDate?: string
        website?: string
        personal1?: string
        personal2?: string
        personal3?: string
        personal4?: string
      }

      export namespace Put {
        export interface Parameters
          extends Endpoints.Tyto.Person.PutParameters {}
        export interface Response extends Data.NonGetTytoResponse {}
      }

      export interface DeleteParameters {
        activeStatus: string
        personID: number
        reason: string
      }

      export namespace Delete {
        export interface Parameters
          extends Endpoints.Tyto.Person.DeleteParameters {}
        export interface Response extends Data.NonGetTytoResponse {}
      }
    }

    export namespace PeopleAdvancedSearch {
      export namespace Get {
        export interface Parameters {
          functionName: FunctionName
          operation: OperationName
          generalName?: string
          top?: number
          teamIDs?: number[] | string // number[].join(',')
          roleIDs?: number[] | string
        }

        export interface Response extends TytoBaseResponse {
          cmdTimeSpan: string
          ret: {
            people: TytoData.AdvancedPerson[]
            memberships: TytoData.AdvancedPersonTeamMembership[]
            sessionUserTeams: TytoData.TeamMembership[]
            geographicDistances: unknown[]
            elementBadges: unknown[]
            itemTraits: unknown[]
            traits: unknown[]
          }
        }
      }
    }

    // TODO: This doesn't make sense. The Get type looks like it's the response
    export namespace PersonAdvanced {
      export interface GetParameters {
        email?: string
        excludeTerminateBefore?: string | Date
        functionName?: string
        generalName?: string
        name?: string
        operation?: 'ocVIEW' | 'ocCHANGE' | 'ocDELETE' | 'ocADD'
        teamIDs?: string
        top?: number
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.PersonAdvanced.GetParameters {
          ret: {
            people: TytoData.AdvancedPerson[]
            memberships: TytoData.AdvancedPersonTeamMembership[]
            sessionUserTeams: TytoData.TeamMembership[]
          }
        }
        export interface Response
          extends Endpoints.Responses.Person.AdvancedSearch.Get {}
      }
    }

    export namespace PrerequisiteEnrollments {
      export interface GetParameters {
        blockID: number
        memberID: number
        showContent?: boolean
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.PrerequisiteEnrollments.GetParameters {}
        export interface Response
          extends Endpoints.Responses.PrerequisiteEnrollments.Get {}
      }
    }

    export namespace ReportPreference {
      export interface DeleteParameters {
        reportPreferenceID: number
      }

      export namespace Delete {
        export interface Parameters
          extends Endpoints.Tyto.ReportPreference.DeleteParameters {}
        export interface Response
          extends Endpoints.Responses.ReportPreference.Delete {}
      }

      export interface PostParameters {
        emailPreference: keyof typeof TytoData.EmailPreference
        memberID: number
        reportName: string
      }

      export namespace Post {
        export interface Parameters
          extends Endpoints.Tyto.ReportPreference.PostParameters {}
        export interface Response
          extends Endpoints.Responses.ReportPreference.Post {}
      }

      export interface PutParameters {
        emailPreference: keyof typeof TytoData.EmailPreference
        reportPreferenceID: number
      }

      export namespace Put {
        export interface Parameters
          extends Endpoints.Tyto.ReportPreference.PutParameters {}
        export interface Response
          extends Endpoints.Responses.ReportPreference.Put {}
      }
    }

    export namespace ReportPreferences {
      export interface GetParameters {
        memberID: number
      }

      export namespace Get {
        export interface Parameters
          extends Endpoints.Tyto.ReportPreferences.GetParameters {}
        export interface Response
          extends Endpoints.Responses.ReportPreferences.Get {}
      }
    }

    export namespace SaveForLesson {
      export interface PostParameters {
        tempFileName?: string
        photoAlbumKey?: string
        lessonItemType?: string
        lessonName?: string
        lessonID?: number
        teamRoot?: string
        ignoreDuplicates?: boolean
      }

      export namespace Post {
        export interface Parameters
          extends Endpoints.Tyto.SaveForLesson.PostParameters {}
        export interface Response extends TytoResponseNonGet {
          asset: TytoData.Asset
          // ? I think that is right ?
          lesson: Omit<TytoData.Lesson, 'assets'>
        }
      }
    }

    export namespace Search {
      export namespace KnowledgeObjects {
        export interface GetParameters {
          // * Required Args
          searchString: string
          // * Optional Args
          elementTypes?: string
          cacheTimeOutMinutes?: number
          top?: number
          filterRank?: number
          filterDateStart?: string
          lessonItemTypes?: string
          elementSubTypes?: string
          domainID?: number
        }

        export namespace Get {
          export interface Parameters
            extends Tyto.Search.KnowledgeObjects.GetParameters {}
          export interface Response
            extends Endpoints.Responses.Search.KnowledgeObjects.Get {}
        }

        export interface PostParameters
          extends Tyto.Search.KnowledgeObjects.GetParameters {}

        export namespace Post {
          export interface Parameters
            extends Tyto.Search.KnowledgeObjects.PostParameters {}
          export interface Response
            extends Endpoints.Responses.Search.KnowledgeObjects.Post {}
        }
      }

      export namespace Lesson {
        export interface GetParameters {
          // * Required Args
          location: 'ocALL' | 'ocTRAINING' | 'ocLIBRARY' | 'ocEVENT' // * Not actually required, but ought to be.
          searchString: string
          // * Optional Args
          assetNameExactFactor?: number
          cacheTimeOutMinutes?: number
          contentContainsFactor?: number
          contentFreetextFactor?: number
          domainID?: number
          elementSubTypes?: string
          elementTypes?: string // * Doesn't actually show up in API explorer but is used in Tryyb /search/ko interface?
          filterRank?: number
          filterDateStart?: string | Date
          halfLifeDaysFactor?: number
          hitPercentFactor?: number
          keywordExactFactor?: number
          lessonDescFreetextFactor?: number
          lessonDescContainsFactor?: number
          lessonItemTypes?: string
          lessonNameExactFactor?: number
          lessonNameContainsFactor?: number
          lessonNameFreetextFactor?: number
          locationMemberID?: number
          searchFields?: string
          top?: number
          waitForPermission?: boolean
        }

        export namespace Get {
          export interface Parameters
            extends Tyto.Search.Lesson.GetParameters {}
          export interface Response
            extends Endpoints.Responses.Search.Lesson.Get {}
        }

        export interface PostParameters
          extends Tyto.Search.Lesson.GetParameters {}

        export namespace Post {
          export interface Parameters
            extends Tyto.Search.Lesson.PostParameters {}
          export interface Response
            extends Endpoints.Responses.Search.Lesson.Post {}
        }
      }
    }

    export namespace Task {
      export namespace Member {
        export namespace Delete {
          export interface Parameters {
            taskMemberID: number
            reason?: string
          }

          export interface Response extends TytoBaseResponse {}
        }

        export namespace Post {
          export interface Parameters {
            memberID: number
            taskID: number
            isRsvpExpected?: boolean
            icalPartRole?: TytoData.ICalRole
            icalPartStatus?: TytoData.ICalStatus
            emailPreference?: 'ocVACANT' | 'ocBATCHDAY' | 'ocBATCHWEEK'
            delgatedFromID?: number
          }

          export interface Response extends TytoBaseResponse {
            taskMemberID: number
          }
        }

        export namespace Put {
          export interface Parameters {
            taskMemberID: number
            /** Required by the API even though the member is identified by taskMemberID. */
            taskID?: number
            isRsvpExpected?: boolean
            icalPartRole?: TytoData.ICalRole
            icalPartStatus?: TytoData.ICalStatus
            emailPreference?: 'ocVACANT' | 'ocBATCHDAY' | 'ocBATCHWEEK'
            delgatedFromID?: number
          }

          export interface Response extends TytoBaseResponse {}
        }
      }

      export namespace Relation {
        export namespace Delete {
          export interface Parameters {
            parentTaskID: number
            childTaskID: number
            useCreditLedger?: boolean
            preserveEnrollmentState?: boolean
          }

          export interface Response extends TytoBaseResponse {}
        }

        export namespace Post {
          export interface Parameters {
            parentTaskID: number
            childTaskID?: number
            seq?: number
            afterTaskID?: number
          }

          export interface Response extends TytoBaseResponse {}
        }
      }

      /**
       * @deprecated
       */
      export namespace Structure {
        export namespace Get {
          export interface Parameters {
            taskID: number
          }
          export interface Response extends TytoBaseResponse {}
        }
      }

      export namespace VerificationRequest {
        export namespace Put {
          export interface Parameters {
            taskID: number
            commentText?: string
            commentAboutIDs?: string
            commentAboutTypes?: string
            verifierMemberIDs?: string
          }
          export interface Response extends TytoBaseResponse {}
        }
      }
    }

    export namespace Task {
      export namespace Get {
        export interface Parameters {
          taskID: number
        }

        export interface Response extends Data.TytoResponse {
          task: {
            delegateParticipationRoles: string[]
            taskRelations: TytoData.Tasks.TaskRelation[]
            members: TytoData.Tasks.Member[]
            tasks: TytoData.Tasks.TGPTask[]
          }
        }
      }

      export interface PutParameters {
        taskID: number
        percentComplete?: number
        taskName?: string
        taskDesc?: string
        taskType?: string
        memberID?: number
        mentorID?: number
        recurrenceID?: number
        completionNote?: string
        taskStatus?: keyof typeof TytoData.TaskStatus
        taskStatusDate?: string
        completedByID?: number
        dueDate?: string
        isMentorOnlyCompletion?: boolean
        aboutID?: number
        aboutType?: string
        sendNotice?: boolean
        parentTaskID?: number
        devplanStepID?: number
        areChildrenSequential?: boolean
        isCompletionOptional?: boolean
        setStatus?: number
        attemptCountMax?: number
        attemptCount?: number
        attemptLastStatus?: string
        multiplicityRestrictions?: string
        startDate?: string
        durationMinutes?: number
        daysUntilDueFromSiblingCompletion?: number
        displayInToDos?: boolean
        operation?: {
          operationID: number
          primaryElementID: number
          name: string
          desc: string
          outsideID: string
          operationType: string
        }
        completedAsOfDate?: string
        isConfidential?: boolean
        members?: any[]
      }

      export namespace Put {
        export interface Parameters extends Tyto.Tasks.PutParameters {}
        export interface Response extends Endpoints.Responses.Tasks.Put {}
      }
    }

    export namespace TGMTask {
      export namespace Post {
        export interface Parameters {
          memberID: number
          parentTaskID: number
          taskName: string
          taskDesc: string
          milestone: TytoData.Tasks.Milestone
          isConfidential?: boolean
          dueDate?: string
        }

        export interface Response extends Data.NonGetTytoResponse {
          taskID: number
        }
      }

      export namespace Put {
        export interface Parameters {
          taskID: number
          taskName?: string
          taskDesc?: string
          taskStatus?: keyof typeof TytoData.TaskStatus
          milestone?: TytoData.Tasks.Milestone
          isConfidential?: boolean
          dueDate?: string
        }

        export interface Response extends Data.NonGetTytoResponse {
          taskID: number
        }
      }
    }

    export namespace TGPTask {
      export namespace Post {
        export interface Parameters {
          memberID: number
          taskName: string
          taskDesc: string
        }

        export interface Response extends Data.NonGetTytoResponse {
          taskID: number
        }
      }

      export namespace Put {
        export interface Parameters {
          taskID: number
          taskName?: string
          taskDesc?: string
          taskStatus?: 'ocPREPUBLISH' | 'ocNOTSTARTED' | 'ocINPROGRESS' // TODO
        }

        export interface Response extends Data.NonGetTytoResponse {
          taskID: number
        }
      }
    }

    namespace TGPTasks {
      namespace Get {
        interface Parameters {
          memberID?: number
        }

        export interface Response extends Data.TytoResponse {
          tasks: {
            childTasks: TytoData.Tasks.TGPMilestoneTask[]
            mainTasks: TytoData.Tasks.TGPMainTask[]
            members: TytoData.Tasks.Member[]
            parentTasks: TytoData.Tasks.TGPMilestoneTask[] // TODO: Don't have real example at time of typing
            rootTasks: TytoData.Tasks.TGPMilestoneTask[] // TODO: Don't have real example at time of typing
            taskRelations: TytoData.Tasks.TaskRelation[]
          }
        }
      }
    }

    export namespace Tasks {
      export namespace Delete {
        export interface Parameters {
          taskID: number
          skipLibrary?: boolean
        }

        export interface Response extends Data.NonGetTytoResponse {
          // * No Specific Response Data
        }
      }
    }

    export namespace TeamMembership {
      export namespace Person {
        export interface DeleteParameters {
          memberID: number
          teamID: number
        }

        export namespace Delete {
          export interface Parameters
            extends Tyto.TeamMembership.Person.DeleteParameters {}

          export interface Response extends Data.NonGetTytoResponse {}
        }

        export interface PostParameters {
          memberID: number
          teamID: number
          isTeamLeader?: boolean
          memberTitle?: string
          suppressEnrollment?: boolean
          suppressTaskInvite?: boolean
        }

        export namespace Post {
          export interface Parameters
            extends Tyto.TeamMembership.Person.PostParameters {}
          // TODO
          export interface Response {}
        }

        export interface PutParameters {
          memberID: number
          teamID: number
          isCascade?: boolean
          isTeamLeader?: boolean
          memberTitle?: string
          suppressEnrollment?: boolean
          suppressTaskInvite?: boolean
        }

        export namespace Put {
          export interface Parameters
            extends Tyto.TeamMembership.Person.PutParameters {}
          // TODO
          export interface Response {}
        }
      }
    }

    export namespace TeamTools {
      export namespace Config {
        export interface DeleteParameters {
          teamRoot?: number
        }

        export namespace Delete {
          export interface Parameters
            extends Tyto.TeamTools.Config.DeleteParameters {}
          // TODO
          export interface Response {}
        }

        export interface GetParameters {
          teamRoot: number
        }

        export interface GetResponse extends TytoBaseResponse {
          teamRoot: number
          advTrainingID?: number
          basicTrainingID?: number
          certRepID?: number
          onInitialize?: {
            mayTakeDisc: boolean
            mayImportDisc: boolean
            mayTakeBasicTrain: boolean
            mayTakeAdvTrain: boolean
            hasBasicViewDisc: boolean
            hasAdvViewDisc: boolean
            hasPermitChange: boolean
            hasGrantPermitChange: boolean
          }
          onDiscComplete?: {
            mayTakeDisc: boolean
            mayImportDisc: boolean
            mayTakeBasicTrain: boolean
            mayTakeAdvTrain: boolean
            hasBasicViewDisc: boolean
            hasAdvViewDisc: boolean
            hasPermitChange: boolean
            hasGrantPermitChange: boolean
          }
          onBasicTrainingComplete?: {
            mayTakeDisc: boolean
            mayImportDisc: boolean
            mayTakeBasicTrain: boolean
            mayTakeAdvTrain: boolean
            hasBasicViewDisc: boolean
            hasAdvViewDisc: boolean
            hasPermitChange: boolean
            hasGrantPermitChange: boolean
          }
          onAdvTrainingComplete?: {
            mayTakeDisc: boolean
            mayImportDisc: boolean
            mayTakeBasicTrain: boolean
            mayTakeAdvTrain: boolean
            hasBasicViewDisc: boolean
            hasAdvViewDisc: boolean
            hasPermitChange: boolean
            hasGrantPermitChange: boolean
          }
        }

        export namespace Get {
          export interface Parameters
            extends Tyto.TeamTools.Config.GetParameters {}
          export interface Response extends Tyto.TeamTools.Config.GetResponse {}
        }

        export interface PutParameters {
          advTrainingID?: number
          basicTrainingID?: number
          certRepID?: number
          onAdvTrainingComplete: {
            mayTakeDisc: boolean
            mayImportDisc: boolean
            mayTakeBasicTrain: boolean
            mayTakeAdvTrain: boolean
            hasBasicViewDisc: boolean
            hasAdvViewDisc: boolean
            hasPermitChange: boolean
            hasGrantPermitChange: boolean
          }
          onBasicTrainingComplete?: {
            mayTakeDisc: boolean
            mayImportDisc: boolean
            mayTakeBasicTrain: boolean
            mayTakeAdvTrain: boolean
            hasBasicViewDisc: boolean
            hasAdvViewDisc: boolean
            hasPermitChange: boolean
            hasGrantPermitChange: boolean
          }
          onInitialize?: {
            mayTakeDisc: boolean
            mayImportDisc: boolean
            mayTakeBasicTrain: boolean
            mayTakeAdvTrain: boolean
            hasBasicViewDisc: boolean
            hasAdvViewDisc: boolean
            hasPermitChange: boolean
            hasGrantPermitChange: boolean
          }
          onDiscComplete?: {
            mayTakeDisc: boolean
            mayImportDisc: boolean
            mayTakeBasicTrain: boolean
            mayTakeAdvTrain: boolean
            hasBasicViewDisc: boolean
            hasAdvViewDisc: boolean
            hasPermitChange: boolean
            hasGrantPermitChange: boolean
          }
          teamRoot: number
        }

        export namespace Put {
          export interface Parameters
            extends Tyto.TeamTools.Config.PutParameters {}
          // TODO
          export interface Response {}
        }
      }

      export namespace EmailLogin {
        export interface PostParameters {
          memberID: number
          fromName?: string
          replyToAddress?: string
          replyToName?: string
          body?: string
        }

        export namespace Post {
          export interface Parameters {
            memberID: number
            fromName?: string
            replyToAddress?: string
            replyToName?: string
            body?: string
          }
          // TODO
          export interface Response {}
        }
      }
    }

    export namespace TeamToolsInvite {
      export interface PostParameters {
        memberID: number
      }

      export namespace Post {
        export interface Parameters
          extends Tyto.TeamToolsInvite.PostParameters {}
        // TODO
        export interface Response {}
      }

      export namespace Email {
        export namespace Post {
          export interface Parameters {
            memberID: number
            replyToAddress?: string
            replyToName?: string
          }
        }
      }

      export namespace TempSession {
        export interface PostParameters {
          timeOutMinutes?: string
          computerID?: string
          appBrand?: string
          appVersion?: string
          sessionKey?: string
        }

        export namespace Post {
          export interface Parameters
            extends Tyto.TeamToolsInvite.TempSession.PostParameters {}
          // TODO
          export interface Response {}
        }
      }
    }

    export namespace NoticeComment {
      export namespace Post {
        export interface Parameters {
          noticeID: number
          commentText: string
          aboutIDs?: string
          aboutTypes?: string
          isDraft?: boolean
        }

        export interface Response extends TytoBaseResponse {
          recordsAffected: number
          noticeCommentID: number
        }
      }
    }

    export namespace TimeZone {
      export namespace Get {
        export interface Parameters {
          timeZoneID?: number
          nameGeneral?: string
          filterDate?: string
        }
        export interface Response extends Endpoints.Responses.TimeZones.Get {
          timeZones?: TytoData.TimeZones
        }
      }
    }

    export namespace Training {
      export interface GetParameters {
        memberID?: number
      }

      export namespace Get {
        export interface Parameters {
          memberID?: number
        }
        export interface Response extends Endpoints.Responses.Training.Get {
          training: Training[]
        }
      }

      export namespace Detail {
        export interface GetParameters {
          catalogID?: number
          personID?: number
          beginDate: string
          endDate: string
          completeStatus: keyof typeof TytoData.CompleteStatus
        }

        export namespace Get {
          export interface Parameters
            extends Tyto.Training.Detail.GetParameters {}
          export interface Response
            extends Endpoints.Responses.Training.Detail.Get {}
        }
      }

      export namespace Summary1482 {
        export interface GetParameters {
          endDate?: string
          startDate?: string
          teamID?: number
          catalogID?: number
        }

        export namespace Get {
          export interface Parameters
            extends Tyto.Training.Summary1482.GetParameters {}
          export interface Response
            extends Endpoints.Responses.Training.Summary1482.Get {}
        }
      }
    }

    export namespace VCEPItem {
      export namespace Post {
        export interface Parameters {
          name: string
          primaryElementID?: number
          descExt?: string
          assignTypeMember?: string
          assignTypeMentor?: string
          effortMinutesMember?: number
          effortMinutesMentor?: number
        }

        export interface Response extends Data.NonGetTytoResponse {
          vcepItemID: number
        }
      }

      export namespace Put {
        export interface Parameters {
          vcepItemID: number
          name: string
          primaryElementID?: number
          descExt?: string
          assignTypeMember?: string
          assignTypeMentor?: string
          effortMinutesMember?: number
          effortMinutesMentor?: number
        }

        export interface Response extends Data.NonGetTytoResponse {
          vcepItemID: number
        }
      }
    }

    export namespace VCEPItemTasks {
      export namespace Get {
        export interface Parameters {
          memberID: number
        }

        export interface Response extends Data.NonGetTytoResponse {
          tasks: {
            childTasks: TytoData.Tasks.TGPMilestoneTask[]
            mainTasks: TytoData.Tasks.TGPMainTask[]
            members: TytoData.Tasks.Member[]
            parentTasks: TytoData.Tasks.TGPMilestoneTask[] // TODO: Don't have real example at time of typing
            rootTasks: TytoData.Tasks.TGPMilestoneTask[] // TODO: Don't have real example at time of typing
            taskRelations: TytoData.Tasks.TaskRelation[]
          }
        }
      }
    }

    export namespace VCEPlanEnrollment {
      export namespace Post {
        export interface Parameters {
          memberID: number
          devplanMasterID: number
          milestoneTaskID: number
          startDate?: string
        }

        export interface Response extends Data.NonGetTytoResponse {
          taskID: number
        }
      }
    }

    export namespace Upload {
      export namespace Post {
        export interface Parameters {
          endpointURL: string
          files: Array<File | Blob>
        }

        export interface Response extends TytoData.Upload {}
      }
    }

    export namespace Session {
      export namespace Logout {
        export namespace Get {
          export interface Parameters {}
          // TODO
          export interface Response extends Data.TytoResponse {}
        }
      }
    }
  }

  export interface ResponseError {
    sts: number
    msg: string
    technical: string
  }

  export interface GenericRespData {
    session: never
    error: Endpoints.ResponseError
  }
}

// Type alias for Search.Lesson result item
export type SearchLessonResult = NonNullable<
  NonNullable<Endpoints.Responses.Search.Lesson.Get['result']>['results']
>[number]
