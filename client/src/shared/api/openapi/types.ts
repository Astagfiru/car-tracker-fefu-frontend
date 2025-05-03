import type { Statuses } from './config'
import type { Ref } from 'vue'

export interface FetchResponse<DataType, ErrorType> {
  data: DataType | undefined;
  error: ErrorType | undefined;
}

export interface ServerError<ErrorType> {
  errorInfo?: ErrorType | string;
  errorMessage?: string;
}

export interface ApiServiceErrorReturn<ErrorType> {
  error: Ref<ServerError<ErrorType> | null>;
}

export interface ApiServiceReturn<DataType, ErrorType> extends ApiServiceErrorReturn<ErrorType> {
  data: Ref<DataType | null>;
  status: Ref<Statuses>;
  isLoading: Ref<boolean>;
  clearError: () => void;
}

export type ServerErrorType = ServerError<unknown> | null

export interface GetUsingPaginationReturn<ErrorType> extends ApiServiceErrorReturn<ErrorType> {
  lastPage: Ref<number>;
  status: Ref<Statuses>;
  isLoading: Ref<boolean>;
}
