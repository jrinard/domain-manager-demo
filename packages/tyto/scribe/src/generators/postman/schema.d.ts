export interface GeneratorSchema {
  requestName: string
  responseName: string
  method: 'get' | 'put' | 'delete' | 'post'
}
