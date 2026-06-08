import type { AxiosInstance, AxiosStatic } from 'axios'
import { UnauthenticatedReason } from './exceptions'
import { ReAuthenticateInterceptor } from './interceptors/responses/ReAuthenticateInterceptor'
import { AuthCheckInterceptor } from './interceptors/responses/AuthInterceptor'

import { SessionInjectionInterceptor } from './interceptors/requests/SessionInjectionInterceptor'
import { PasswordCheckInterceptor } from './interceptors/responses/PasswordCheckInterceptor'
import { ErrorInterceptor } from './interceptors/responses/ErrorInterceptor'
import { RegisteredInterceptor } from './typings'

import ASP from './resources/ASP'
import { AccountSession } from './resources/AccountSession'
import { Asset } from './resources/Asset'
import { Block } from './resources/Block'
import { BlockEnrollment } from './resources/BlockEnrollment'
import { CatalogInbox } from './resources/Catalog.Inbox'
import { CatalogVCEP } from './resources/Catalog.VCEP'
import { CatalogCurriculumPublication } from './resources/CatalogCurriculumPublication'
import { CatalogCurriculumPublicationEnhancedPermissions } from './resources/CatalogCurriculumPublication/CatalogCurriculumPublicationEnhancedPermissions'
import { CatalogCurriculumPublicationEnhancedPermissionsPerson } from './resources/CatalogCurriculumPublication/CatalogCurriculumPublicationEnhancedPermissionsPerson'
import { Configuration } from './resources/Configuration'
import { ConfigurationClient } from './resources/Configuration.Client'
import { DevPlanEnrollment } from './resources/DevPlanEnrollment'
import { DevPlanStep } from './resources/DevPlanStep'
import { DevPlanSteps } from './resources/DevPlanSteps'
import { DevPlanStepRelation } from './resources/DevPlanStep.Relation'
import { DevPlanVCE } from './resources/DevPlan.VCE'
import { DevPlanStepVCEP } from './resources/DevPlanStep.VCEP'
import { DISCProfile } from './resources/DiscProfile'
import { DISCProfiles } from './resources/DiscProfiles'
import { EmailQueueStatus } from './resources/EmailQueueStatus'
import { Enrollment } from './resources/Enrollment'
import { Events } from './resources/Events'
import { Exam } from './resources/Exam'
import { Identity } from './resources/Identity'
import { Inbox } from './resources/Inbox'
import { Launch } from './resources/Launch'
import { Lesson } from './resources/Lesson'
import { Login } from './resources/Login'
import { Logout } from './resources/Session.Logout'
import { Menu } from './resources/Menu'
import { People } from './resources/People'
import { Person } from './resources/Person'
import { Plan } from './resources/Plan'
import { Report } from './resources/Report'
import { SaveForLesson } from './resources/SaveForLesson'
import { Search } from './resources/Search'
import { TaskMember } from './resources/Task.Member'
import { Task } from './resources/Task'
import { TaskRelation } from './resources/Task.Relation'
import { Team } from './resources/Team'
import { Teamboard } from './resources/Teamboard'
import { TeamsByFunction } from './resources/TeamsByFunction'
import { TeamIDsByFunction } from './resources/TeamIDsByFunction'
import { TeamMembership } from './resources/TeamMembership'
import { TeamProfileImage } from './resources/Team.ProfileImage'
import { TeamTools } from './resources/TeamTools'
import { TGMTask } from './resources/TGMTask'
import { TGPTask } from './resources/TGPTask'
import { TGPTasks } from './resources/TGPTasks'
import { TGP } from './resources/TGP'
import { ThinSkippy } from './resources/ThinSkippy'
import { TimeZone } from './resources/TimeZone'
import { Training } from './resources/Training'
import { Upload } from './resources/Upload'
import { VCEPItem } from './resources/VCEPItem'
import { VCEPItemTasks } from './resources/VCEPItemTasks'
import { VCEPlanEnrollment } from './resources/VCEPlanEnrollment'
import { CatalogItem } from './resources/CatalogItem'
import { Event } from './resources/Event'
import { EventAttendees } from './resources/EventAttendees'
import { EventAttendeesDiscProfiles } from './resources/EventAttendeesDiscProfiles'
import { Domain } from './resources/Domain'
import { Transcript } from './resources/Transcript'
import { EventRsvp } from './resources/EventRsvp'
import { TeamMembershipPerson } from './resources/TeamMembershipPerson'
import { PeopleAdvancedSearch } from './resources/PeopleAdvancedSearch'
import { CustomTab } from './resources/CustomTab'
import { CustomTabs } from './resources/CustomTabs'
import { TeamCustomTabs } from './resources/TeamCustomTabs'
import { TeamCustomTab } from './resources/TeamCustomTab'
import { PersonCustomTabs } from './resources/PersonCustomTabs'
import { PersonCustomTab } from './resources/PersonCustomTab'
import { EmailQueueStatusUser } from './resources/EmailQueueStatusUser'
import { PersonActivityLog } from './resources/PersonActivityLog'
import { TeamBanners } from './resources/TeamBanners'
import { TeamBanner } from './resources/TeamBanner'
import { PersonSubordinates } from './resources/PersonSubordinates'
import { Roles } from './resources/Roles'
import { Telecom } from './resources/Telecom'
import { PersonAbsence } from './resources/PersonAbsence'
import { EnrollmentHistory } from './resources/EnrollmentHistory'
import { LaunchEnrollment } from './resources/LaunchEnrollment'
import { DomainInvitationEmail } from './resources/DomainInvitationEmail'
import { PersonPassword } from './resources/PersonPassword'
import { LoginResetPasswordValidate } from './resources/LoginResetPasswordValidate'
import { Courses } from './resources/Courses'
import { Tasks } from './resources/Tasks'
import { TaskStructure } from './resources/TaskStructure'
import { EmailAddress } from './resources/EmailAddress'
import { EventAgenda } from './resources/EventAgenda'
import { EventAttendee } from './resources/EventAttendee'
import { PeopleSearch } from './resources/PeopleSearch'
import { PersonProfilePhoto } from './resources/PersonProfilePhoto'
import { Role } from './resources/Role'
import { TeamMembershipTeam } from './resources/TeamMembershipTeam'
import { PlatformReviewTeams } from './resources/PlatformReviewTeams'
import { PlatformReviewTask } from './resources/PlatformReviewTask'
import { PlatformReviewTeamInitialize } from './resources/PlatformReviewTeamInitialize'
import { PlatformReviewStats } from './resources/PlatformReviewStats'
import { BlockEnrollmentCompletionPerSubBlock } from './resources/BlockEnrollmentCompletionPerSubBlock'
import { PeopleByFunction } from './resources/PeopleByFunction'
import { PrerequisiteEnrollments } from './resources/PrerequisiteEnrollments'
import { TeamAdmin } from './resources/TeamAdmin'
import { DiscProfilesMini } from './resources/DiscProfilesMini'
import { PersonAccount } from './resources/PersonAccount'
import { ViewHistorySummary } from './resources/ViewHistorySummary'
import { ViewHistoryMostRecent } from './resources/ViewHistoryMostRecent'
import { BlockEnrollmentCompleteStatusForce } from './resources/BlockEnrollmentCompleteStatusForce'
import { ClientServiceNoteAttach } from './resources/ClientServiceNoteAttach'
import { DomainInvitationEmailTemplate } from './resources/DomainInvitationEmailTemplate'
import { ClientServiceNote } from './resources/ClientServiceNote'
import { ClientServiceNotesByElement } from './resources/ClientServiceNotesByElement'
import { SendEmailNoActivity } from './resources/SendEmailNoActivity'
import { Resource } from './utils/Resource'
import { FunctionOps } from './resources/FunctionOps'
import { TeamDefaultEnrollmentsTeam } from './resources/TeamDefaultEnrollmentsTeam'
import { TeamDefaultEnrollment } from './resources/TeamDefaultEnrollment'
import { LoginTOS } from './resources/LoginTOS'
import { Domainterms } from './resources/Domainterms'
import { BlockPrerequisites } from './resources/BlockPrerequisites'
import { EnrollmentCurriculumCompleteJob } from './resources/EnrollmentCurriculumCompleteJob'
import { EnrollmentCurriculumCompleteJobs } from './resources/EnrollmentCurriculumCompleteJobs'
import { PersonOutsideIdentityAll } from './resources/PersonOutsideIdentityAll'
import { PersonOutsideIdentity } from './resources/PersonOutsideIdentity'
import { IdentityAuthorizationConnect } from './resources/IdentityAuthorizationConnect'
import { IdentityProviders } from './resources/IdentityProviders'
import { RobotAccount } from './resources/RobotAccount'
import { RobotAccounts } from './resources/RobotAccounts'
import { SearchKnowledgeObjects } from './resources/SearchKnowledgeObjects'
import { PeopleBrowse } from './resources/PeopleBrowse'
import { CatalogPermission } from './resources/CatalogPermission'
import { PersonLogonName } from './resources/PersonLogonName'
import { Languages } from './resources/Languages'
import { TrainingSummary } from './resources/TrainingSummary'
import { CurriculumSummaryReport } from './resources/CurriculumSummaryReport'
import { CurriculumSubcomponentSummaryReport } from './resources/CurriculumSubcomponentSummaryReport'
import { TrainingCatalogLessonCompletionSummarySB2165 } from './resources/TrainingCatalogLessonCompletionSummarySB2165'
import { TrainingDetail } from './resources/TrainingDetail'
import { LessonViewHistoryPerson } from './resources/LessonViewHistoryPerson'
import { MenuManage } from './resources/MenuManage'
import { DomainUI } from './resources/DomainUI'
import { CatalogNews } from './resources/CatalogNews'
import { LibraryLegacy } from './resources/LibraryLegacy'
import { LibraryTeamFeatured } from './resources/LibraryTeamFeatured'
import { DomainUIConfiguration } from './resources/DomainUIConfiguration'
import { DomainUIConfigurationLibraryImageUpload } from './resources/DomainUIConfigurationLibraryImageUpload'
import { DomainUIConfigurations } from './resources/DomainUIConfigurations'
import { DomainUIConfigurationCurrent } from './resources/DomainUIConfigurationCurrent'
import { DomainUIImage } from './resources/DomainUIImage'
import { Library } from './resources/Library'
import { LibraryCategory } from './resources/LibraryCategory'
import { LibraryCategoryCopy } from './resources/LibraryCategoryCopy'
import { LibraryItem } from './resources/LibraryItem'
import { LibraryCategoryIcon } from './resources/LibraryCategoryIcon'
import { BlocksForEdit } from './resources/BlocksForEdit'
import { BlocksForEnrollment } from './resources/BlocksForEnrollment'
import { ProjectTeams } from './resources/ProjectTeams'
import { TaskProjectByTeam } from './resources/Task.Project.ByTeam'

export type ClientProps = {
  axiosStatic: AxiosStatic
  baseURL?: string
  onUnauthenticated?: (code: UnauthenticatedReason) => void
  refreshToken?: (client: TytoClient) => Promise<{ sessionKey: string }>
}

export default class TytoClient {
  protected axiosInstance: AxiosInstance
  protected requestInterceptors: RegisteredInterceptor[] = []
  protected responseInterceptors: RegisteredInterceptor[] = []
  protected onUnauthenticated?: (code: UnauthenticatedReason) => void
  protected refreshToken?: () => Promise<{ sessionKey: string } | undefined>

  // * ENDPOINT CLASSES
  AccountSession!: AccountSession
  ASP!: ASP
  Asset!: Asset
  /**
   * @deprecated Use `client.Course` instead
   */
  Block!: Block
  BlockEnrollment!: BlockEnrollment
  Course!: Block
  Courses!: Courses
  CatalogInbox!: CatalogInbox
  CatalogVCEP!: CatalogVCEP
  CatalogCurriculumPublication!: CatalogCurriculumPublication
  CatalogCurriculumPublicationEnhancedPermissions!: CatalogCurriculumPublicationEnhancedPermissions
  CatalogCurriculumPublicationEnhancedPermissionsPerson!: CatalogCurriculumPublicationEnhancedPermissionsPerson
  Configuration!: Configuration
  ConfigurationClient!: ConfigurationClient
  CreateLessonFromUpload!: SaveForLesson
  DevPlanEnrollment!: DevPlanEnrollment
  DevPlanStep!: DevPlanStep
  DevPlanSteps!: DevPlanSteps
  DevPlanStepRelation!: DevPlanStepRelation
  DevPlanStepVCEP!: DevPlanStepVCEP
  DevPlanVCE!: DevPlanVCE
  DISCProfile!: DISCProfile
  DiscProfiles!: DISCProfiles
  EmailQueueStatus!: EmailQueueStatus
  Enrollment!: Enrollment
  Events!: Events
  Exam!: Exam
  Identity!: Identity
  Inbox!: Inbox
  Launch!: Launch
  LaunchEnrollment!: LaunchEnrollment
  Lesson!: Lesson
  Login!: Login
  Logout!: Logout
  Menu!: Menu
  Person!: Person
  Plan!: Plan
  Report!: Report
  ResourcesHosts!: ConfigurationClient
  SaveForLesson!: SaveForLesson
  Search!: Search
  Tasks!: Tasks
  Task!: Task
  /**
   * @deprecated Use `Task.Member` instead
   */
  TaskMember!: TaskMember
  /**
   * @deprecated Use `Task.Relation` instead
   */
  TaskRelation!: TaskRelation
  /** Resolve a project team ID to its root taskID. GET /Task/Project/ByTeam */
  TaskProjectByTeam!: TaskProjectByTeam
  Team!: Team
  /** List project teams with health/status metadata. GET /ProjectTeams */
  ProjectTeams!: ProjectTeams
  Teamboard!: Teamboard
  TeamsByFunction!: TeamsByFunction
  TeamIDsByFunction!: TeamIDsByFunction
  TeamMembership!: TeamMembership
  TeamProfileImage!: TeamProfileImage
  TeamTools!: TeamTools
  /**
   * @deprecated Use `TGP.MilestoneTASK` instead
   */
  TGMTask!: TGMTask
  /**
   * @deprecated Use `TGP.TGPTask` instead
   */
  TGPTask!: TGPTask
  /**
   * @deprecated Use `TGP.TopLevelTasks` instead
   */
  TGPTasks!: TGPTasks
  /**
   * @alias For `TGPTasks`
   */
  TGPPlanOverview!: TGPTasks
  /**
   * @alias For `client.Vendasta`
   */
  TGP!: TGP
  ThinSkippy!: ThinSkippy
  TimeZone!: TimeZone
  Training!: Training
  Upload!: Upload
  VCEPItem!: VCEPItem
  VCEPItemTasks!: VCEPItemTasks
  VCEPlanEnrollment!: VCEPlanEnrollment
  Vendasta!: ThinSkippy
  People!: People
  CatalogItem!: CatalogItem
  Event!: Event
  EventAttendees!: EventAttendees
  EventAttendeesDiscProfiles!: EventAttendeesDiscProfiles
  Domain!: Domain
  Transcript!: Transcript
  EventRsvp!: EventRsvp
  PeopleAdvancedSearch!: PeopleAdvancedSearch
  CustomTab!: CustomTab
  CustomTabs!: CustomTabs
  TeamCustomTabs!: TeamCustomTabs
  TeamCustomTab!: TeamCustomTab
  PersonCustomTabs!: PersonCustomTabs
  PersonCustomTab!: PersonCustomTab
  TeamMembershipPerson!: TeamMembershipPerson
  EmailQueueStatusUser!: EmailQueueStatusUser
  Telecom!: Telecom
  PersonActivityLog!: PersonActivityLog
  TeamBanners!: TeamBanners
  TeamBanner!: TeamBanner
  PersonSubordinates!: PersonSubordinates
  Roles!: Roles
  EnrollmentHistory!: EnrollmentHistory
  DomainInvitationEmail!: DomainInvitationEmail
  PersonAbsence!: PersonAbsence
  PersonPassword!: PersonPassword
  LoginResetPasswordValidate!: LoginResetPasswordValidate
  PeopleSearch!: PeopleSearch
  PersonProfilePhoto!: PersonProfilePhoto
  TaskStructure!: TaskStructure
  EmailAddress!: EmailAddress
  EventAgenda!: EventAgenda
  EventAttendee!: EventAttendee
  Role!: Role
  TeamMembershipTeam!: TeamMembershipTeam
  PlatformReviewTeams!: PlatformReviewTeams
  PlatformReviewTask!: PlatformReviewTask
  PlatformReviewTeamInitialize!: PlatformReviewTeamInitialize
  PlatformReviewStats!: PlatformReviewStats
  BlockEnrollmentCompletionPerSubBlock!: BlockEnrollmentCompletionPerSubBlock
  PeopleByFunction!: PeopleByFunction
  PrerequisiteEnrollments!: PrerequisiteEnrollments
  TeamAdmin!: TeamAdmin
  DiscProfilesMini!: DiscProfilesMini
  PersonAccount!: PersonAccount
  ViewHistorySummary!: ViewHistorySummary
  ViewHistoryMostRecent!: ViewHistoryMostRecent
  BlockEnrollmentCompleteStatusForce!: BlockEnrollmentCompleteStatusForce
  ClientServiceNoteAttach!: ClientServiceNoteAttach
  DomainInvitationEmailTemplate!: DomainInvitationEmailTemplate
  ClientServiceNote!: ClientServiceNote
  ClientServiceNotesByElement!: ClientServiceNotesByElement
  SendEmailNoActivity!: SendEmailNoActivity
  FunctionOps!: FunctionOps
  TeamDefaultEnrollmentsTeam!: TeamDefaultEnrollmentsTeam
  TeamDefaultEnrollment!: TeamDefaultEnrollment
  LoginTOS!: LoginTOS
  Domainterms!: Domainterms
  BlockPrerequisites!: BlockPrerequisites
  EnrollmentCurriculumCompleteJob!: EnrollmentCurriculumCompleteJob
  EnrollmentCurriculumCompleteJobs!: EnrollmentCurriculumCompleteJobs
  PersonOutsideIdentityAll!: PersonOutsideIdentityAll
  PersonOutsideIdentity!: PersonOutsideIdentity
  IdentityAuthorizationConnect!: IdentityAuthorizationConnect
  IdentityProviders!: IdentityProviders
  RobotAccount!: RobotAccount
  RobotAccounts!: RobotAccounts
  SearchKnowledgeObjects!: SearchKnowledgeObjects
  PeopleBrowse!: PeopleBrowse
  CatalogPermission!: CatalogPermission
  PersonLogonName!: PersonLogonName
  Languages!: Languages
  TrainingSummary!: TrainingSummary
  CurriculumSummaryReport!: CurriculumSummaryReport
  CurriculumSubcomponentSummaryReport!: CurriculumSubcomponentSummaryReport
  TrainingCatalogLessonCompletionSummarySB2165!: TrainingCatalogLessonCompletionSummarySB2165
  TrainingDetail!: TrainingDetail
  LessonViewHistoryPerson!: LessonViewHistoryPerson
  MenuManage!: MenuManage
  DomainUI!: DomainUI
  CatalogNews!: CatalogNews
  LibraryLegacy!: LibraryLegacy
  LibraryTeamFeatured!: LibraryTeamFeatured

  DomainUIConfiguration!: DomainUIConfiguration

  DomainUIConfigurationLibraryImageUpload!: DomainUIConfigurationLibraryImageUpload

  DomainUIConfigurations!: DomainUIConfigurations

  DomainUIConfigurationCurrent!: DomainUIConfigurationCurrent

  DomainUIImage!: DomainUIImage

  Library!: Library

  LibraryCategory!: LibraryCategory

  LibraryCategoryCopy!: LibraryCategoryCopy

  LibraryItem!: LibraryItem

  LibraryCategoryIcon!: LibraryCategoryIcon

  BlocksForEdit!: BlocksForEdit

  BlocksForEnrollment!: BlocksForEnrollment

  constructor({
    axiosStatic,
    baseURL,
    onUnauthenticated,
    refreshToken,
  }: ClientProps) {
    this.axiosInstance = axiosStatic.create({
      baseURL,
    })
    this.onUnauthenticated = onUnauthenticated
    this.refreshToken = refreshToken ? () => refreshToken(this) : undefined

    this._setupInterceptors()
    this._addResources()
  }

  public wireResource(ResourceClass: typeof Resource) {
    return new ResourceClass(this.axiosInstance)
  }

  protected _setupInterceptors() {
    this.setupRequestInterceptors()
    this.setupResponseInterceptors()
  }

  protected setupRequestInterceptors() {
    this.requestInterceptors.push({
      id: this.axiosInstance.interceptors.request.use(
        SessionInjectionInterceptor.onFulfilled,
        SessionInjectionInterceptor.onError,
      ),
      name: SessionInjectionInterceptor.name,
    })
  }

  protected setupResponseInterceptors() {
    this.responseInterceptors.push(
      ErrorInterceptor.create(this.axiosInstance),
      PasswordCheckInterceptor.create(this.axiosInstance),
      ReAuthenticateInterceptor.create(this.axiosInstance, this.refreshToken),
      AuthCheckInterceptor.create(this.axiosInstance, this.onUnauthenticated),
    )
  }

  protected addResources() {
    // * Placeholder
  }

  public get unsafeAxiosInstance() {
    return this.axiosInstance
  }

  protected _addResources() {
    this.addResources()
    this.AccountSession = this.wireResource(AccountSession) as AccountSession
    this.ASP = new ASP(this.axiosInstance)
    this.Asset = new Asset(this.axiosInstance)
    this.Course = new Block(this.axiosInstance)
    this.Block = this.Course
    this.BlockEnrollment = new BlockEnrollment(this.axiosInstance)
    this.CatalogInbox = new CatalogInbox(this.axiosInstance)
    this.CatalogVCEP = new CatalogVCEP(this.axiosInstance)
    this.CatalogItem = new CatalogItem(this.axiosInstance)
    this.CatalogCurriculumPublication = new CatalogCurriculumPublication(
      this.axiosInstance,
    )
    this.CatalogCurriculumPublicationEnhancedPermissions =
      new CatalogCurriculumPublicationEnhancedPermissions(this.axiosInstance)
    this.CatalogCurriculumPublicationEnhancedPermissionsPerson =
      new CatalogCurriculumPublicationEnhancedPermissionsPerson(
        this.axiosInstance,
      )
    this.Configuration = new Configuration(this.axiosInstance)
    this.ConfigurationClient = new ConfigurationClient(this.axiosInstance)
    this.DevPlanEnrollment = new DevPlanEnrollment(this.axiosInstance)
    this.DevPlanStep = new DevPlanStep(this.axiosInstance)
    this.DevPlanSteps = new DevPlanSteps(this.axiosInstance)
    this.DevPlanStepRelation = new DevPlanStepRelation(this.axiosInstance)
    this.DevPlanStepVCEP = new DevPlanStepVCEP(this.axiosInstance)
    this.DevPlanVCE = new DevPlanVCE(this.axiosInstance)
    this.DISCProfile = new DISCProfile(this.axiosInstance)
    this.DiscProfiles = new DISCProfiles(this.axiosInstance)
    this.EmailQueueStatus = new EmailQueueStatus(this.axiosInstance)
    this.Enrollment = new Enrollment(this.axiosInstance)
    this.Events = new Events(this.axiosInstance)
    this.Exam = new Exam(this.axiosInstance)
    this.Identity = new Identity(this.axiosInstance)
    this.Inbox = new Inbox(this.axiosInstance)
    this.Lesson = new Lesson(this.axiosInstance)
    this.Login = new Login(this.axiosInstance)
    this.Logout = new Logout(this.axiosInstance)
    this.Menu = new Menu(this.axiosInstance)
    this.Person = new Person(this.axiosInstance)
    this.Plan = new Plan(this.axiosInstance)
    this.Report = new Report(this.axiosInstance)
    this.ResourcesHosts = new ConfigurationClient(this.axiosInstance)
    this.SaveForLesson = new SaveForLesson(this.axiosInstance)
    this.CreateLessonFromUpload = this.SaveForLesson
    this.Search = new Search(this.axiosInstance)
    this.Task = new Task(this.axiosInstance)
    this.Tasks = new Tasks(this.axiosInstance)
    this.TaskMember = new TaskMember(this.axiosInstance)
    this.TaskRelation = new TaskRelation(this.axiosInstance)
    this.TaskProjectByTeam = new TaskProjectByTeam(this.axiosInstance)
    this.Team = new Team(this.axiosInstance)
    this.ProjectTeams = new ProjectTeams(this.axiosInstance)
    this.Teamboard = new Teamboard(this.axiosInstance)
    this.TeamsByFunction = new TeamsByFunction(this.axiosInstance)
    this.TeamIDsByFunction = new TeamIDsByFunction(this.axiosInstance)
    this.TeamMembership = new TeamMembership(this.axiosInstance)
    /**
     * @deprecated - Use `Team.ProfileImage` instead
     */
    this.TeamProfileImage = new TeamProfileImage(this.axiosInstance)
    this.TGP = new TGP(this.axiosInstance)
    this.TGPTask = new TGPTask(this.axiosInstance)
    this.TGMTask = new TGMTask(this.axiosInstance)
    this.TGPTasks = new TGPTasks(this.axiosInstance)
    this.TGPPlanOverview = new TGPTasks(this.axiosInstance)
    this.TeamTools = new TeamTools(this.axiosInstance)
    this.ThinSkippy = new ThinSkippy(this.axiosInstance)
    this.TimeZone = new TimeZone(this.axiosInstance)
    this.Training = new Training(this.axiosInstance)
    this.Upload = new Upload(this.axiosInstance)
    this.VCEPItem = new VCEPItem(this.axiosInstance)
    this.VCEPItemTasks = new VCEPItemTasks(this.axiosInstance)
    this.VCEPlanEnrollment = new VCEPlanEnrollment(this.axiosInstance)
    this.Vendasta = this.ThinSkippy
    this.People = new People(this.axiosInstance)
    this.Event = new Event(this.axiosInstance)
    this.EventAttendees = new EventAttendees(this.axiosInstance)
    this.EventAttendeesDiscProfiles = new EventAttendeesDiscProfiles(
      this.axiosInstance,
    )
    this.Transcript = new Transcript(this.axiosInstance)
    this.EventRsvp = new EventRsvp(this.axiosInstance)
    this.Domain = new Domain(this.axiosInstance)
    this.PeopleAdvancedSearch = new PeopleAdvancedSearch(this.axiosInstance)
    this.TeamMembershipPerson = new TeamMembershipPerson(this.axiosInstance)
    this.CustomTab = new CustomTab(this.axiosInstance)
    this.CustomTabs = new CustomTabs(this.axiosInstance)
    this.TeamCustomTabs = new TeamCustomTabs(this.axiosInstance)
    this.TeamCustomTab = new TeamCustomTab(this.axiosInstance)
    this.PersonCustomTabs = new PersonCustomTabs(this.axiosInstance)
    this.PersonCustomTab = new PersonCustomTab(this.axiosInstance)
    this.EmailQueueStatusUser = new EmailQueueStatusUser(this.axiosInstance)
    this.PersonActivityLog = new PersonActivityLog(this.axiosInstance)
    this.TeamBanners = new TeamBanners(this.axiosInstance)
    this.TeamBanner = new TeamBanner(this.axiosInstance)
    this.Telecom = new Telecom(this.axiosInstance)
    this.Training = new Training(this.axiosInstance)
    this.PersonSubordinates = new PersonSubordinates(this.axiosInstance)
    this.PersonAbsence = new PersonAbsence(this.axiosInstance)
    this.Roles = new Roles(this.axiosInstance)
    this.EnrollmentHistory = new EnrollmentHistory(this.axiosInstance)
    this.LaunchEnrollment = new LaunchEnrollment(this.axiosInstance)
    this.DomainInvitationEmail = new DomainInvitationEmail(this.axiosInstance)
    this.PersonPassword = new PersonPassword(this.axiosInstance)
    this.LoginResetPasswordValidate = new LoginResetPasswordValidate(
      this.axiosInstance,
    )
    this.LoginResetPasswordValidate = new LoginResetPasswordValidate(
      this.axiosInstance,
    )
    this.PeopleSearch = new PeopleSearch(this.axiosInstance)
    this.PersonProfilePhoto = new PersonProfilePhoto(this.axiosInstance)
    this.Courses = new Courses(this.axiosInstance)
    this.TaskStructure = new TaskStructure(this.axiosInstance)
    this.EmailAddress = new EmailAddress(this.axiosInstance)
    this.EventAgenda = new EventAgenda(this.axiosInstance)
    this.EventAttendee = new EventAttendee(this.axiosInstance)
    this.CatalogCurriculumPublication = new CatalogCurriculumPublication(
      this.axiosInstance,
    )
    this.Role = new Role(this.axiosInstance)
    this.TeamMembershipTeam = new TeamMembershipTeam(this.axiosInstance)
    this.PlatformReviewTeams = new PlatformReviewTeams(this.axiosInstance)
    this.PlatformReviewTask = new PlatformReviewTask(this.axiosInstance)
    this.PlatformReviewTeamInitialize = new PlatformReviewTeamInitialize(
      this.axiosInstance,
    )
    this.PlatformReviewStats = new PlatformReviewStats(this.axiosInstance)
    this.BlockEnrollmentCompletionPerSubBlock =
      new BlockEnrollmentCompletionPerSubBlock(this.axiosInstance)
    this.PeopleByFunction = new PeopleByFunction(this.axiosInstance)
    this.TeamAdmin = new TeamAdmin(this.axiosInstance)
    this.PrerequisiteEnrollments = new PrerequisiteEnrollments(
      this.axiosInstance,
    )
    this.DiscProfilesMini = new DiscProfilesMini(this.axiosInstance)
    this.PersonAccount = new PersonAccount(this.axiosInstance)
    this.ViewHistorySummary = new ViewHistorySummary(this.axiosInstance)
    this.ViewHistoryMostRecent = new ViewHistoryMostRecent(this.axiosInstance)
    this.BlockEnrollmentCompleteStatusForce =
      new BlockEnrollmentCompleteStatusForce(this.axiosInstance)
    this.ClientServiceNoteAttach = new ClientServiceNoteAttach(
      this.axiosInstance,
    )
    this.ClientServiceNotesByElement = new ClientServiceNotesByElement(
      this.axiosInstance,
    )
    this.DomainInvitationEmailTemplate = new DomainInvitationEmailTemplate(
      this.axiosInstance,
    )
    this.ClientServiceNote = new ClientServiceNote(this.axiosInstance)
    this.SendEmailNoActivity = new SendEmailNoActivity(this.axiosInstance)
    this.FunctionOps = new FunctionOps(this.axiosInstance)
    this.TeamDefaultEnrollmentsTeam = new TeamDefaultEnrollmentsTeam(
      this.axiosInstance,
    )
    this.TeamDefaultEnrollment = new TeamDefaultEnrollment(this.axiosInstance)
    this.LoginTOS = new LoginTOS(this.axiosInstance)
    this.Domainterms = new Domainterms(this.axiosInstance)
    this.BlockPrerequisites = new BlockPrerequisites(this.axiosInstance)
    this.EnrollmentCurriculumCompleteJob = new EnrollmentCurriculumCompleteJob(
      this.axiosInstance,
    )
    this.EnrollmentCurriculumCompleteJobs =
      new EnrollmentCurriculumCompleteJobs(this.axiosInstance)
    this.PersonOutsideIdentityAll = new PersonOutsideIdentityAll(
      this.axiosInstance,
    )
    this.PersonOutsideIdentity = new PersonOutsideIdentity(this.axiosInstance)
    this.IdentityAuthorizationConnect = new IdentityAuthorizationConnect(
      this.axiosInstance,
    )
    this.IdentityProviders = new IdentityProviders(this.axiosInstance)
    this.RobotAccount = new RobotAccount(this.axiosInstance)
    this.RobotAccounts = new RobotAccounts(this.axiosInstance)
    this.SearchKnowledgeObjects = new SearchKnowledgeObjects(this.axiosInstance)
    this.RobotAccount = new RobotAccount(this.axiosInstance)
    this.RobotAccounts = new RobotAccounts(this.axiosInstance)
    this.PeopleBrowse = new PeopleBrowse(this.axiosInstance)
    this.CatalogPermission = new CatalogPermission(this.axiosInstance)
    this.PersonLogonName = new PersonLogonName(this.axiosInstance)
    this.TimeZone = new TimeZone(this.axiosInstance)
    this.Languages = new Languages(this.axiosInstance)
    this.TrainingSummary = new TrainingSummary(this.axiosInstance)
    this.CurriculumSummaryReport = new CurriculumSummaryReport(
      this.axiosInstance,
    )
    this.CurriculumSubcomponentSummaryReport =
      new CurriculumSubcomponentSummaryReport(this.axiosInstance)
    this.TrainingCatalogLessonCompletionSummarySB2165 =
      new TrainingCatalogLessonCompletionSummarySB2165(this.axiosInstance)
    this.TrainingDetail = new TrainingDetail(this.axiosInstance)
    this.LessonViewHistoryPerson = new LessonViewHistoryPerson(
      this.axiosInstance,
    )
    this.MenuManage = new MenuManage(this.axiosInstance)
    this.DomainUI = new DomainUI(this.axiosInstance)
    this.CatalogNews = new CatalogNews(this.axiosInstance)
    this.LibraryLegacy = new LibraryLegacy(this.axiosInstance)
    this.LibraryTeamFeatured = new LibraryTeamFeatured(this.axiosInstance)
    this.DomainUIConfiguration = new DomainUIConfiguration(this.axiosInstance)
    this.DomainUIConfigurationLibraryImageUpload =
      new DomainUIConfigurationLibraryImageUpload(this.axiosInstance)
    this.DomainUIConfigurations = new DomainUIConfigurations(this.axiosInstance)
    this.DomainUIConfigurationCurrent = new DomainUIConfigurationCurrent(
      this.axiosInstance,
    )
    this.DomainUIImage = new DomainUIImage(this.axiosInstance)
    this.Library = new Library(this.axiosInstance)
    this.LibraryCategory = new LibraryCategory(this.axiosInstance)
    this.LibraryCategoryCopy = new LibraryCategoryCopy(this.axiosInstance)
    this.LibraryItem = new LibraryItem(this.axiosInstance)
    this.LibraryCategoryIcon = new LibraryCategoryIcon(this.axiosInstance)
    this.BlocksForEdit = new BlocksForEdit(this.axiosInstance)
    this.BlocksForEnrollment = new BlocksForEnrollment(this.axiosInstance)
  }
}
