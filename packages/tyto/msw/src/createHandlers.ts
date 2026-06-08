import { BlockEnrollmentEndpoint } from './endpoints/BlockEnrollment'
import { EventEndpoint } from './endpoints/Event'
import { EventAttendeesEndpoint } from './endpoints/EventAttendees'
import { EventAttendeesDiscProfilesEndpoint } from './endpoints/EventAttendeesDiscProfiles'
import { EventRsvpEndpoint } from './endpoints/EventRsvp'
import { EventsEndpoint } from './endpoints/events'
import { PersonEndpoint } from './endpoints/Person'
import { createTeamEndpoint } from './endpoints/team'
import { createTeamsByFunctionEndpoint } from './endpoints/TeamsByFunction'
import { TranscriptEndpoint } from './endpoints/Transcript'
import { TrainingEndpoint } from './endpoints/Training'
import { InboxConversationsEndpoint } from './endpoints/InboxConversations'
import { PeopleAdvancedSearchEndpoint } from './endpoints/PeopleAdvancedSearch'
import { DomainEndpoint } from './endpoints/Domain'
import { TeamMembershipPersonEndpoint } from './endpoints/TeamMembershipPerson'
import { CustomTabEndpoint } from './endpoints/CustomTab'
import { CustomTabsEndpoint } from './endpoints/CustomTabs'
import { TeamCustomTabsEndpoint } from './endpoints/TeamCustomTabs'
import { TeamCustomTabEndpoint } from './endpoints/TeamCustomTab'
import { PersonCustomTabsEndpoint } from './endpoints/PersonCustomTabs'
import { PersonCustomTabEndpoint } from './endpoints/PersonCustomTab'
import { EmailQueueStatusUserEndpoint } from './endpoints/EmailQueueStatusUser'
import { PersonActivityLogEndpoint } from './endpoints/PersonActivityLog'
import { TeamBannerEndpoint } from './endpoints/TeamBanner'
import { TeamBannersEndpoint } from './endpoints/TeamBanners'
import { PersonSubordinatesEndpoint } from './endpoints/PersonSubordinates'
import { RolesEndpoint } from './endpoints/Roles'
import { TelecomEndpoint } from './endpoints/Telecom'
import { EnrollmentHistoryEndpoint } from './endpoints/EnrollmentHistory'
import { PersonPasswordEndpoint } from './endpoints/PersonPassword'
import { LoginResetPasswordValidateEndpoint } from './endpoints/LoginResetPasswordValidate'
import { EnrollmentEndpoint } from './endpoints/Enrollment'
import { LaunchEnrollmentEndpoint } from './endpoints/LaunchEnrollment'
import { PersonAbsenceEndpoint } from './endpoints/PersonAbsence'
import { PeopleSearchEndpoint } from './endpoints/PeopleSearch'
import { PersonProfilePhotoEndpoint } from './endpoints/PersonProfilePhoto'
import { DomainInvitationEmailEndpoint } from './endpoints/DomainInvitationEmail'
import { CoursesEndpoint } from './endpoints/Courses'
import { TasksEndpoint } from './endpoints/Tasks'
import { EmailAddressEndpoint } from './endpoints/EmailAddress'
import { TaskStructureEndpoint } from './endpoints/TaskStructure'
import { EventAgendaEndpoint } from './endpoints/EventAgenda'
import { CatalogCurriculumPublicationEndpoint } from './endpoints/CatalogCurriculumPublication'
import { CatalogCurriculumPublicationEnhancedPermissionsEndpoint } from './endpoints/CatalogCurriculumPublicationEnhancedPermissions'
import { CatalogCurriculumPublicationEnhancedPermissionsPersonEndpoint } from './endpoints/CatalogCurriculumPublicationEnhancedPermissionsPerson'
import { DiscProfilesMiniEndpoint } from './endpoints/DiscProfilesMini'
import { EventAttendeeEndpoint } from './endpoints/EventAttendee'
import { RoleEndpoint } from './endpoints/Role'
import { TeamMembershipTeamEndpoint } from './endpoints/TeamMembershipTeam'
import { PlatformReviewTeamsEndpoint } from './endpoints/PlatformReviewTeams'
import { PlatformReviewTaskEndpoint } from './endpoints/PlatformReviewTask'
import { PlatformReviewTeamInitializeEndpoint } from './endpoints/PlatformReviewTeamInitialize'
import { PlatformReviewStatsEndpoint } from './endpoints/PlatformReviewStats'
import { BlockEnrollmentCompletionPerSubBlockEndpoint } from './endpoints/BlockEnrollmentCompletionPerSubBlock'
import { PeopleByFunctionEndpoint } from './endpoints/PeopleByFunction'
import { PrerequisiteEnrollmentsEndpoint } from './endpoints/PrerequisiteEnrollments'
import { PrerequisiteEnrollmentsEndpoint3 } from './endpoints/PrerequisiteEnrollments'
import { TeamAdminEndpoint } from './endpoints/TeamAdmin'
import { PersonAccountEndpoint } from './endpoints/PersonAccount'
import { ViewHistorySummaryEndpoint } from './endpoints/ViewHistorySummary'
import { ViewHistoryMostRecentEndpoint } from './endpoints/ViewHistoryMostRecent'
import { BlockEnrollmentCompleteStatusForceEndpoint } from './endpoints/BlockEnrollmentCompleteStatusForce'
import { ClientServiceNoteAttachEndpoint } from './endpoints/ClientServiceNoteAttach'
import { DomainInvitationEmailTemplateEndpoint } from './endpoints/DomainInvitationEmailTemplate'
import { ClientServiceNoteEndpoint } from './endpoints/ClientServiceNote'
import { ClientServiceNotesByElementEndpoint } from './endpoints/ClientServiceNotesByElement'
import { SendEmailNoActivityEndpoint } from './endpoints/SendEmailNoActivity'
import { FunctionOpsEndpoint } from './endpoints/FunctionOps'
import { TeamDefaultEnrollmentsTeamEndpoint } from './endpoints/TeamDefaultEnrollmentsTeam'
import { TeamDefaultEnrollmentEndpoint } from './endpoints/TeamDefaultEnrollment'
import { LoginTOSEndpoint } from './endpoints/LoginTOS'
import { DomaintermsEndpoint } from './endpoints/Domainterms'
import { BlockPrerequisitesEndpoint } from './endpoints/BlockPrerequisites'
import { EnrollmentCurriculumCompleteJobEndpoint } from './endpoints/EnrollmentCurriculumCompleteJob'
import { EnrollmentCurriculumCompleteJobsEndpoint } from './endpoints/EnrollmentCurriculumCompleteJobs'
import { PersonOutsideIdentityAllEndpoint } from './endpoints/PersonOutsideIdentityAll'
import { PersonOutsideIdentityEndpoint } from './endpoints/PersonOutsideIdentity'
import { IdentityAuthorizationConnectEndpoint } from './endpoints/IdentityAuthorizationConnect'
import { IdentityProvidersEndpoint } from './endpoints/IdentityProviders'
import { RobotAccountEndpoint } from './endpoints/RobotAccount'
import { RobotAccountsEndpoint } from './endpoints/RobotAccounts'
import { SearchKnowledgeObjectsEndpoint } from './endpoints/SearchKnowledgeObjects'
import { PeopleBrowseEndpoint } from './endpoints/PeopleBrowse'
import { CatalogPermissionEndpoint } from './endpoints/CatalogPermission'
import { PersonLogonNameEndpoint } from './endpoints/PersonLogonName'
import { TimeZoneEndpoint } from './endpoints/TimeZone'
import { LanguagesEndpoint } from './endpoints/Languages'
import { TrainingSummaryEndpoint } from './endpoints/TrainingSummary'
import { CurriculumSummaryReportEndpoint } from './endpoints/CurriculumSummaryReport'
import { CurriculumSubcomponentSummaryReportEndpoint } from './endpoints/CurriculumSubcomponentSummaryReport'
import { TrainingCatalogLessonCompletionSummarySB2165Endpoint } from './endpoints/TrainingCatalogLessonCompletionSummarySB2165'
import { TrainingDetailEndpoint } from './endpoints/TrainingDetail'
import { LessonViewHistoryPersonEndpoint } from './endpoints/LessonViewHistoryPerson'
import { MenuEndpoint } from './endpoints/Menu'
import { MenuManageEndpoint } from './endpoints/MenuManage'
import { DomainUIEndpoint } from './endpoints/DomainUI'
import { CatalogNewsEndpoint } from './endpoints/CatalogNews'
import { LibraryLegacyEndpoint } from './endpoints/LibraryLegacy'
import { DomainUIConfigurationEndpoint } from './endpoints/DomainUIConfiguration'
import { DomainUIConfigurationLibraryImageUploadEndpoint } from './endpoints/DomainUIConfigurationLibraryImageUpload'
import { DomainUIConfigurationsEndpoint } from './endpoints/DomainUIConfigurations'
import { DomainUIConfigurationCurrentEndpoint } from './endpoints/DomainUIConfigurationCurrent'
import { DomainUIImageEndpoint } from './endpoints/DomainUIImage'
import { LibraryEndpoint } from './endpoints/Library'
import { LibraryCategoryEndpoint } from './endpoints/LibraryCategory'
import { LibraryCategoryCopyEndpoint } from './endpoints/LibraryCategoryCopy'
import { LibraryItemEndpoint } from './endpoints/LibraryItem'
import { LibraryCategoryIconEndpoint } from './endpoints/LibraryCategoryIcon'
import { BlocksForEditEndpoint } from './endpoints/BlocksForEdit'
import { BlocksForEnrollmentEndpoint } from './endpoints/BlocksForEnrollment'

export const createHandlers = (baseUrl = 'http://localhost:4400') => [
  ...BlockEnrollmentEndpoint.createHandlers(baseUrl),
  ...EventAttendeesEndpoint.createHandlers(baseUrl),
  ...EventEndpoint.createHandlers(baseUrl),
  ...EventsEndpoint.createHandlers(baseUrl),
  ...createTeamEndpoint(baseUrl),
  ...createTeamsByFunctionEndpoint(baseUrl),
  ...EventAttendeesDiscProfilesEndpoint.createHandlers(baseUrl),
  ...PersonProfilePhotoEndpoint.createHandlers(baseUrl),
  ...PersonEndpoint.createHandlers(baseUrl),
  ...TranscriptEndpoint.createHandlers(baseUrl),
  ...TrainingEndpoint.createHandlers(baseUrl),
  ...EventRsvpEndpoint.createHandlers(baseUrl),
  ...InboxConversationsEndpoint.createHandlers(baseUrl),
  ...DomainEndpoint.createHandlers(baseUrl),
  ...PeopleAdvancedSearchEndpoint.createHandlers(baseUrl),
  ...CustomTabEndpoint.createHandlers(baseUrl),
  ...CustomTabsEndpoint.createHandlers(baseUrl),
  ...TeamCustomTabsEndpoint.createHandlers(baseUrl),
  ...TeamCustomTabEndpoint.createHandlers(baseUrl),
  ...PersonCustomTabsEndpoint.createHandlers(baseUrl),
  ...PersonCustomTabEndpoint.createHandlers(baseUrl),
  ...TeamMembershipPersonEndpoint.createHandlers(baseUrl),
  ...EmailQueueStatusUserEndpoint.createHandlers(baseUrl),
  ...PersonActivityLogEndpoint.createHandlers(baseUrl),
  ...TeamBannerEndpoint.createHandlers(baseUrl),
  ...TeamBannersEndpoint.createHandlers(baseUrl),
  ...TelecomEndpoint.createHandlers(baseUrl),
  ...PersonSubordinatesEndpoint.createHandlers(baseUrl),
  ...PersonAbsenceEndpoint.createHandlers(baseUrl),
  ...EnrollmentHistoryEndpoint.createHandlers(baseUrl),
  ...EnrollmentEndpoint.createHandlers(baseUrl),
  ...LaunchEnrollmentEndpoint.createHandlers(baseUrl),
  ...RolesEndpoint.createHandlers(baseUrl),
  ...DomainInvitationEmailEndpoint.createHandlers(baseUrl),
  ...PersonPasswordEndpoint.createHandlers(baseUrl),
  ...LoginResetPasswordValidateEndpoint.createHandlers(baseUrl),
  ...PeopleSearchEndpoint.createHandlers(baseUrl),
  ...PersonProfilePhotoEndpoint.createHandlers(baseUrl),
  ...CoursesEndpoint.createHandlers(baseUrl),
  ...TasksEndpoint.createHandlers(baseUrl),
  ...TaskStructureEndpoint.createHandlers(baseUrl),
  ...EmailAddressEndpoint.createHandlers(baseUrl),
  ...EventAgendaEndpoint.createHandlers(baseUrl),
  ...CatalogCurriculumPublicationEndpoint.createHandlers(baseUrl),
  ...CatalogCurriculumPublicationEnhancedPermissionsEndpoint.createHandlers(
    baseUrl,
  ),
  ...CatalogCurriculumPublicationEnhancedPermissionsPersonEndpoint.createHandlers(
    baseUrl,
  ),
  ...DiscProfilesMiniEndpoint.createHandlers(baseUrl),
  ...EventAttendeeEndpoint.createHandlers(baseUrl),
  ...RoleEndpoint.createHandlers(baseUrl),
  ...TeamMembershipTeamEndpoint.createHandlers(baseUrl),
  ...PlatformReviewTeamsEndpoint.createHandlers(baseUrl),
  ...PlatformReviewTaskEndpoint.createHandlers(baseUrl),
  ...PlatformReviewTeamInitializeEndpoint.createHandlers(baseUrl),
  ...PlatformReviewStatsEndpoint.createHandlers(baseUrl),
  ...BlockEnrollmentCompletionPerSubBlockEndpoint.createHandlers(baseUrl),
  ...PeopleByFunctionEndpoint.createHandlers(baseUrl),
  ...PrerequisiteEnrollmentsEndpoint.createHandlers(baseUrl),
  ...PrerequisiteEnrollmentsEndpoint3.createHandlers(baseUrl),
  ...TeamAdminEndpoint.createHandlers(baseUrl),
  ...PersonAccountEndpoint.createHandlers(baseUrl),
  ...ViewHistorySummaryEndpoint.createHandlers(baseUrl),
  ...ViewHistoryMostRecentEndpoint.createHandlers(baseUrl),
  ...BlockEnrollmentCompleteStatusForceEndpoint.createHandlers(baseUrl),
  ...ClientServiceNoteAttachEndpoint.createHandlers(baseUrl),
  ...DomainInvitationEmailTemplateEndpoint.createHandlers(baseUrl),
  ...ClientServiceNoteEndpoint.createHandlers(baseUrl),
  ...ClientServiceNotesByElementEndpoint.createHandlers(baseUrl),
  ...SendEmailNoActivityEndpoint.createHandlers(baseUrl),
  ...FunctionOpsEndpoint.createHandlers(baseUrl),
  ...FunctionOpsEndpoint.createHandlers(baseUrl),
  ...TeamDefaultEnrollmentsTeamEndpoint.createHandlers(baseUrl),
  ...TeamDefaultEnrollmentEndpoint.createHandlers(baseUrl),
  ...LoginTOSEndpoint.createHandlers(baseUrl),
  ...DomaintermsEndpoint.createHandlers(baseUrl),
  ...BlockPrerequisitesEndpoint.createHandlers(baseUrl),
  ...EnrollmentCurriculumCompleteJobEndpoint.createHandlers(baseUrl),
  ...PersonOutsideIdentityAllEndpoint.createHandlers(baseUrl),
  ...PersonOutsideIdentityEndpoint.createHandlers(baseUrl),
  ...IdentityAuthorizationConnectEndpoint.createHandlers(baseUrl),
  ...IdentityProvidersEndpoint.createHandlers(baseUrl),
  ...RobotAccountEndpoint.createHandlers(baseUrl),
  ...RobotAccountsEndpoint.createHandlers(baseUrl),
  ...SearchKnowledgeObjectsEndpoint.createHandlers(baseUrl),
  ...EnrollmentCurriculumCompleteJobsEndpoint.createHandlers(baseUrl),
  ...RobotAccountEndpoint.createHandlers(baseUrl),
  ...RobotAccountsEndpoint.createHandlers(baseUrl),
  ...PeopleBrowseEndpoint.createHandlers(baseUrl),
  ...CatalogPermissionEndpoint.createHandlers(baseUrl),
  ...PersonLogonNameEndpoint.createHandlers(baseUrl),
  ...TimeZoneEndpoint.createHandlers(baseUrl),
  ...LanguagesEndpoint.createHandlers(baseUrl),
  ...TrainingSummaryEndpoint.createHandlers(baseUrl),
  ...CurriculumSummaryReportEndpoint.createHandlers(baseUrl),
  ...CurriculumSubcomponentSummaryReportEndpoint.createHandlers(baseUrl),
  ...TrainingCatalogLessonCompletionSummarySB2165Endpoint.createHandlers(
    baseUrl,
  ),
  ...TrainingDetailEndpoint.createHandlers(baseUrl),
  ...LessonViewHistoryPersonEndpoint.createHandlers(baseUrl),
  ...MenuManageEndpoint.createHandlers(baseUrl),
  ...MenuEndpoint.createHandlers(baseUrl),
  ...DomainUIEndpoint.createHandlers(baseUrl),
  ...CatalogNewsEndpoint.createHandlers(baseUrl),
  ...LibraryLegacyEndpoint.createHandlers(baseUrl),
  ...DomainUIConfigurationEndpoint.createHandlers(baseUrl),
  ...DomainUIConfigurationLibraryImageUploadEndpoint.createHandlers(baseUrl),
  ...DomainUIConfigurationsEndpoint.createHandlers(baseUrl),
  ...DomainUIConfigurationCurrentEndpoint.createHandlers(baseUrl),
  ...DomainUIImageEndpoint.createHandlers(baseUrl),
  ...LibraryEndpoint.createHandlers(baseUrl),
  ...LibraryCategoryEndpoint.createHandlers(baseUrl),
  ...LibraryCategoryCopyEndpoint.createHandlers(baseUrl),
  ...LibraryItemEndpoint.createHandlers(baseUrl),
  ...LibraryCategoryIconEndpoint.createHandlers(baseUrl),
  ...BlocksForEditEndpoint.createHandlers(baseUrl),
  ...BlocksForEnrollmentEndpoint.createHandlers(baseUrl),
]
