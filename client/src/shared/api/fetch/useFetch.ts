import { ref, Ref } from 'vue'

interface UseFetchReturn<ResponseData, RequestData> {
  responseData: Ref<ResponseData | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  sendRequest: (params: RequestData) => Promise<void>;
}

export function useFetch<ResponseData, RequestData = void>(
  apiMethod: (params: RequestData) => Promise<ResponseData>
): UseFetchReturn<ResponseData, RequestData> {
    
  const data = ref<ResponseData | null>(null)
  const error = ref<unknown | null>(null)
  const isLoading = ref<boolean>(false)

  const sendRequest = async (params: RequestData): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiMethod(params)

      data.value = response
    } catch (err) {

      error.value = err
    } finally {
      
      isLoading.value = false
    }
  }

  return {
    responseData : data.value,
    error,
    isLoading,
    sendRequest
  }
}
