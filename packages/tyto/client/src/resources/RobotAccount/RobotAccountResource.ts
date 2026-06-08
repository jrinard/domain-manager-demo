import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  PutParameters,
  PutResponse,
} from './RobotAccountTypes'

export class RobotAccount extends Resource {
  override endpoint = '/robot/account'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
