import { AxiosError } from 'axios';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import RouteError from '@src/common/RouteError';

/**
 * HTTP client error
 */

export class HttpClientError extends RouteError {

  public originalError: AxiosError;

  public constructor(message: string, originalError: AxiosError) {
    super(
      originalError.response?.status || HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message,
    );
    this.originalError = originalError;
  }
}

// **** Export default **** //

export default HttpClientError;
