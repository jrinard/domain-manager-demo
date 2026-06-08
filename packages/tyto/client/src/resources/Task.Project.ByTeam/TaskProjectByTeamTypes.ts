import type { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  teamID: number
}

interface ProjectTeamMember {
  memberName: string
  memberID: number
  memberTitle: string
  thumbPath: string
}

export interface GetResponse extends TytoBaseResponse {
  /** Root task ID for the project's task hierarchy. */
  taskID: number;
  projectTitle: string;
  projectDesc: string;
  createdDate: string;
  memberID: number;
  profileImageID: number;
  viewAccess: boolean;
  changeAccess: boolean;
  members: ProjectTeamMember[];
}
