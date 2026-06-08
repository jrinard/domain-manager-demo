// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TSHelpers {
  export type Und<T> = T | undefined
  export type Values<T> = T[keyof T]
  export type Prettify<T> = {
    [K in keyof T]: T[K]
  }

  // * These are Forked from Tryyb Codebase
  export type Diff<T, U> = T extends U ? never : T
  export type Filter<T, U> = T extends U ? T : never
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  export type Overwrite<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>> & T2
  export type Omit2<T, K> = Pick<T, Exclude<keyof T, K>>
  export type Subtract<T, K> = Omit2<T, keyof K>
  export type Nullable<T> = { [P in keyof T]: T[P] | null }

  export type UndefinedReturnValue = void | Promise<void>
  export type DateTime = string
  export type GUID = string
  // * END of Tryyb codebase Types Fork
}
