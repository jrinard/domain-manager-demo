import { Resource } from '../utils/helpers'

import { Task } from './Task'
import { TGPTask } from './TGPTask'
import { TGMTask } from './TGMTask'
import { TGPTasks } from './TGPTasks'

export class TGP extends Resource {
  AllTasks!: Task
  TGPTask!: TGPTask
  MilestoneTask!: TGMTask
  TopLevelTasks!: TGPTasks

  protected override addResources(): void {
    this.AllTasks = new Task(this.axiosInstance)
    this.TGPTask = new TGPTask(this.axiosInstance)
    this.MilestoneTask = new TGMTask(this.axiosInstance)
    this.TopLevelTasks = new TGPTasks(this.axiosInstance)
  }
}
