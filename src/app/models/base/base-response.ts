export interface BaseResponse<T> {
  isSucces: boolean;
  data: T | null;
  message: string | null;
}
