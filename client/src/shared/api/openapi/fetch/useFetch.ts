import { watch, ref, shallowRef } from "vue";

import { Statuses } from "../config";
import type { FetchResponse, ServerError, ApiServiceReturn } from "../types";

interface FetchReturn<ParamsType, DataType, ErrorType>
  extends ApiServiceReturn<DataType, ErrorType> {
  sendRequest: (params: ParamsType) => Promise<void>;
}

export function useFetch<ParamsType, RequestBodyType, DataType, ErrorType>(
  requestMethod: (
    requestBody: RequestBodyType
  ) => Promise<FetchResponse<DataType, ErrorType>>,
  mapper: (params: ParamsType) => RequestBodyType,
  preprocessor?: (params?: ParamsType) => void
): FetchReturn<ParamsType, DataType, ErrorType> {
  const responseData = shallowRef<DataType | null>(null);
  const responseError = shallowRef<ServerError<ErrorType> | null>(null);
  const responseStatus = ref<Statuses>(Statuses.none);
  const isLoading = ref<boolean>(false);

  const clearError = (): void => {
    responseError.value = null;
  };

  const sendRequest = async (params: ParamsType): Promise<void> => {
    clearError();

    preprocessor?.(params);

    responseStatus.value = Statuses.pending;

    const requestBody = mapper(params);

    const { data, error } = await requestMethod(requestBody);

    responseStatus.value = error ? Statuses.error : Statuses.success;
    responseData.value = data ?? null;
    responseError.value = error ? { errorInfo: error } : null;
  };

  const checkIsLoading = (): void => {
    if (responseStatus.value === Statuses.pending) {
      isLoading.value = true;

      return;
    }

    isLoading.value = false;
  };

  watch(responseStatus, checkIsLoading);

  return {
    sendRequest,
    clearError,
    data: responseData,
    error: responseError,
    status: responseStatus,
    isLoading,
  };
}
