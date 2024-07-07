import { AxiosError } from 'axios';

/**
 * HTTP client error
 */

export class HttpClientError extends Error {

  public cause: AxiosError;

  public constructor(message: string, cause: AxiosError) {
    super(message);
    this.cause = cause;
  }
}

// **** Export default **** //

export default HttpClientError;
