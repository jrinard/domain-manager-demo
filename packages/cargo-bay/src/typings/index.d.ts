export namespace Storage {
  export type StorageType = 'local' | 'session'

  export namespace Methods {
    export interface Opts {
      onError: (errorMsg: string) => void
      returnValue?: boolean
    }
  }
}
