import { ErrorInterceptor, TytoClient as TytoClientReal } from '@tyto/client'

export class TytoClient extends TytoClientReal {
  protected override setupRequestInterceptors() {
    return
  }

  protected override setupResponseInterceptors() {
    this.responseInterceptors.push(ErrorInterceptor.create(this.axiosInstance))
  }
}
