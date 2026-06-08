import { Resource } from '../utils/helpers'

import { TeamToolsConfig } from './TeamTools.Config'
import { TeamToolsEmailLogin } from './TeamTools.EmailLogin'
import { TeamToolsInviteEmail } from './TeamToolsInvite.Email'
import { TeamToolsInviteTempSession } from './TeamToolsInvite.tempSession'
import { TeamToolsInvite } from './TeamToolsInvite'

export class TeamTools extends Resource {
  Config?: TeamToolsConfig
  EmailLogin?: TeamToolsEmailLogin
  InviteEmail?: TeamToolsInviteEmail
  InviteTempSession?: TeamToolsInviteTempSession
  Invite?: TeamToolsInvite

  protected override addResources(): void {
    this.Config = new TeamToolsConfig(this.axiosInstance)
    this.EmailLogin = new TeamToolsEmailLogin(this.axiosInstance)
    this.InviteEmail = new TeamToolsInviteEmail(this.axiosInstance)
    this.InviteTempSession = new TeamToolsInviteTempSession(this.axiosInstance)
    this.Invite = new TeamToolsInvite(this.axiosInstance)
  }
}
