import { Resource } from '../utils/helpers'

import { ExamTakeAnswer } from './Exam.Take.Answer'
import { ExamTakeQuestion } from './Exam.Take.Question'
import { ExamTakeTrainingInvite } from './Exam.Take.TrainingInvite'
import { ExamTakeTrainingInvites } from './Exam.Take.TrainingInvites'
import { ExamTakeEvaluate } from './ExamTakeEvaluate'

export class ExamTake extends Resource {
  Answer?: ExamTakeAnswer
  Evaluate?: ExamTakeEvaluate
  Question?: ExamTakeQuestion
  TrainingInvite?: ExamTakeTrainingInvite
  TrainingInvites?: ExamTakeTrainingInvites

  protected override addResources(): void {
    this.Answer = new ExamTakeAnswer(this.axiosInstance)
    this.Evaluate = new ExamTakeEvaluate(this.axiosInstance)
    this.Question = new ExamTakeQuestion(this.axiosInstance)
    this.TrainingInvite = new ExamTakeTrainingInvite(this.axiosInstance)
    this.TrainingInvites = new ExamTakeTrainingInvites(this.axiosInstance)
  }
}
