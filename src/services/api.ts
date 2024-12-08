import api from './interceptor'
export interface ApiParams<
  PathParams = Record<string, unknown>,
  QueryParams = Record<string, unknown>,
  Body = unknown,
> {
  pathParams?: PathParams
  queryParams?: QueryParams
  body?: Body
}

const generateUrl = (url: string, pathParams?: Record<string, unknown>): string => {
  if (!pathParams) return url
  return url.replace(/:([a-zA-Z]+)/g, (_, key) => encodeURIComponent(String(pathParams[key])))
}

const generateQueryString = (queryParams?: Record<string, unknown>): string =>
  queryParams ? `?${new URLSearchParams(Object.entries(queryParams).map(([k, v]) => [k, String(v)])).toString()}` : ''

const apiRequest = async <TResponse>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  { pathParams, queryParams, body }: ApiParams = {},
): Promise<TResponse> => {
  const fullUrl = `${generateUrl(url, pathParams)}${generateQueryString(queryParams)}`
  const response = await api({
    method,
    url: fullUrl,
    data: body,
  })
  console.log(`[${method.toUpperCase()}] ${fullUrl} - Response:`, response)
  return response.data
}

export const Api = {
  Get: <TResponse>(url: string, params?: ApiParams): Promise<TResponse> => apiRequest<TResponse>('get', url, params),
  Post: <TResponse>(url: string, params?: ApiParams): Promise<TResponse> => apiRequest<TResponse>('post', url, params),
  Put: <TResponse>(url: string, params?: ApiParams): Promise<TResponse> => apiRequest<TResponse>('put', url, params),
  Patch: <TResponse>(url: string, params?: ApiParams): Promise<TResponse> =>
    apiRequest<TResponse>('patch', url, params),
  Delete: <TResponse>(url: string, params?: ApiParams): Promise<TResponse> =>
    apiRequest<TResponse>('delete', url, params),
}
