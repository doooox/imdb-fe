import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      headers: {
        XMLHttpRequest: "HMLHttpRequest",
      },
    });
  }

  request = <T, R = T>(requestConfig: AxiosRequestConfig): Promise<R> =>
    this.httpClient.request(requestConfig).then(({ data }) => data);

  attachHeaders = (headers: { [key: string]: string }) =>
    Object.assign(this.httpClient.defaults.headers, headers);
  withCredentials = true;
  headers = {
    XMLHttpRequest: "HMLHttpRequest",
  };
  addRequestInterceptor = (
    callback:
      | ((
          value: AxiosRequestConfig
        ) => AxiosRequestConfig | Promise<AxiosRequestConfig>)
      | undefined
  ) => this.httpClient.interceptors.request.use(callback);

  removeRequestInterceptor = (interceptorId: number) =>
    this.httpClient.interceptors.request.eject(interceptorId);

  addResponseInterceptors = (
    successCallback:
      | ((
          value: AxiosResponse<unknown>
        ) => AxiosResponse<unknown> | Promise<AxiosResponse<unknown>>)
      | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorCallback: ((error: any) => any) | undefined
  ) =>
    this.httpClient.interceptors.response.use(successCallback, errorCallback);

  removeResponseInterceptors = (interceptorId: number) =>
    this.httpClient.interceptors.response.eject(interceptorId);
}

export const httpService = new HttpService();
