import { TYTO_ENDPOINT_PATHS } from '../../constants/index'
import { AxiosResponse } from 'axios'
import { Resource } from '../../utils/helpers'
import { DomainImage } from '../Domain.Image'
import { DomainMessage } from '../Domain.Message'
import { DomainMessages } from '../Domain.Messages'
import { DomainBilling } from '../DomainBilling'
import { DomainBillings } from '../DomainBillings'
import {
  PostParameters,
  PostResponse,
  PutParameters,
  PutResponse,
  GetParameters,
  GetResponse,
} from './DomainTypes'

export class Domain extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DOMAIN

  image?: DomainImage
  message?: DomainMessage
  messages?: DomainMessages
  billing?: DomainBilling
  billings?: DomainBillings

  protected override addResources(): void {
    this.image = new DomainImage(this.axiosInstance)
    this.message = new DomainMessage(this.axiosInstance)
    this.messages = new DomainMessages(this.axiosInstance)
    this.billing = new DomainBilling(this.axiosInstance)
    this.billings = new DomainBillings(this.axiosInstance)
  }

  post(params: PostParameters): Promise<PostResponse> {
    return new Promise((res, rej) => {
      this.axiosInstance
        .post<PostParameters, AxiosResponse<PostResponse>>(
          this.endpoint,
          params
        )
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }

  put(params: PutParameters): Promise<PutResponse> {
    return new Promise((res, rej) => {
      this.axiosInstance
        .put<PutParameters, AxiosResponse<PutResponse>>(this.endpoint, params)
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }

  get(params: GetParameters): Promise<GetResponse> {
    return new Promise((res, rej) => {
      this.axiosInstance
        .get<GetParameters, AxiosResponse<GetResponse>>(this.endpoint, {
          params,
        })
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }
}
