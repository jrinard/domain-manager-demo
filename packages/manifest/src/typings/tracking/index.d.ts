export namespace Tracking {
  enum Identifier {
    'Menu Button' = 'Menu Button',
    'Menu Interface Link' = 'Menu Interface Link',
    'Menu Course Step' = 'Menu Course Step',
    'Menu Course Parent Context' = 'Menu Course Parent Context',
    'Menu Course Section' = 'Menu Course Section',
    'Nav Link' = 'Nav Link',
    'Nav Back Button' = 'Nav Back Button',
    'Nav Home Image' = 'Nav Home Image',
    'Nav User Thumb' = 'Nav User Thumb',
    'Nav User Search' = 'Nav User Search',
    'Home Welcome Video Button' = 'Home Welcome Video Button',
    'Training Tile' = 'Training Tile',
    'Training Tiles Scroll Button' = 'Training Tiles Scroll Button',
    'Course Asset Tile' = 'Course Asset Tile',
    'Asset Preview Image' = 'Asset Preview Image',
    'Asset Launch' = 'Asset Launch',
    'Asset Mark Complete Button' = 'Asset Mark Complete Button',
    'Asset Download Button' = 'Asset Download Button',
    'Asset File Upload' = 'Asset File Upload',
    'Next Course Button' = 'Next Course Button',
  }

  enum Interaction {
    Clicked = 'Clicked',
    Toggled = 'Toggled',
    Hovered = 'Hovered',
    Completed = 'Completed',
    Errorer = 'Errored',
  }

  enum InteractionType {
    Closed = 'Close',
    Ended = 'Ended',
    Launched = 'Launch',
    Play = 'Play',
    Paused = 'Pause',
  }

  enum RootOfEvent {
    Automated = 'Automated',
    Direct = 'Direct',
    Indirect = 'Indirect',
  }

  enum EventSubType {
    'Breadcrumb' = 'Breadcrumb',
  }

  // TODO: Ask Austin
  // enum StateIdentifier {
  //   "Page" = "Page",
  //   "Asset" = "Asset",
  // }

  // TODO: Ask Austin
  // enum StateEvent {
  //   Completed = "Completed",
  //   Enrolled = "Enrolled",
  //   Launched = "Launched",
  //   Loaded = "Loaded",
  //   Metric = "Metric",
  // }

  type InteractionEventType = `${Tracking.Identifier} ${Tracking.Interaction}`

  type StateEventType = 'User Session Acquired' | 'Network Request Resolved'

  namespace EventPaylods {
    interface GenericData {
      context?: 'homepage' | 'coursepage' | 'planpage' | 'search'
      rootOfEvent?: Tracking.RootOfEvent
      eventSubType?: Tracking.EventSubType
    }

    interface NavLink extends Tracking.EventPaylods.GenericData {
      text: string
      currentLength?: number
    }

    interface TrainingListScroll extends Tracking.EventPaylods.GenericData {
      trainingListTitle: string
      isFakeExpandedCategory?: boolean
      btnSide?: 'left' | 'right'
      newTargetIdx: number
    }

    interface TrainingMenuItem extends Tracking.EventPaylods.GenericData {
      blockID?: number
      planID?: number
      isViewingParentMenu?: boolean
      sequence: number
      stepPrerequisiteID?: number
      stepTaskID?: number
      currentScrollTop?: number
      windowHeight?: number
    }

    interface CourseTile extends Tracking.EventPaylods.GenericData {
      courseID: number
      courseName: string
      enrollmentFound: boolean
      href: string
    }

    interface CourseBreadcrumb extends Tracking.EventPaylods.GenericData {
      blockID: number | string
      parentID?: number
      placement?: 'top' | 'nav'
      type?: 'home' | 'parent'
    }

    interface MenuToggle extends Tracking.EventPaylods.GenericData {
      isNow: 'open' | 'closed'
    }

    interface MenuParentContext extends Tracking.EventPaylods.GenericData {
      isNow: 'parent' | 'current course'
    }
    interface AssetTile extends Tracking.EventPaylods.GenericData {
      assetID: number
      assetType?: TytoData.AssetType
      assetName?: string
      completeStatus?: keyof typeof TytoData.CompleteStatus
      parentContextID?: number
      parentID?: number
      prerequisiteID?: number
      interactionType?: Tracking.InteractionType
    }

    interface MarkComplete
      extends Omit<Tracking.EventPaylods.AssetTile, 'completeStatus'> {
      curCompleteStatus?: keyof typeof TytoData.CompleteStatus
    }

    interface NextCourse extends Tracking.EventPaylods.GenericData {
      parentBlockID?: number
      blockID: number
      nextStepPrerequisiteID: number
      nextStepType?: string
    }
  }
}
