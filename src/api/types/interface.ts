export interface IBaseResponse<T = any> {
  code: number
  data: T
  message: string
}