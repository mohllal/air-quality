import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import HttpClientError from '@src/common/HttpClientError';
import HttpErrorMessages from '@src/common/HttpErrorMessages';

// **** Types **** //

interface IHttpClient {
  request<T = unknown, R = AxiosResponse<T>>(
    config?: AxiosRequestConfig
  ): Promise<R>;

  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
}

// **** Classes **** //

export default class HttpClient implements IHttpClient {
  public instance: AxiosInstance;

  public constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Credentials': true,
      },
    });
    
    // Register response interceptors
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return this.handleError(error);
      },
    );
  }

  public async request<T = unknown, R = AxiosResponse<T>>(
    conf: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.request(conf);
  }

  public async get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    conf?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.get<T, R>(url, conf);
  }

  private handleError(error: AxiosError) {
    const httpError = new HttpClientError(HttpErrorMessages.PROVIDER_ERROR, error);
    return Promise.reject(httpError);
  }
}
