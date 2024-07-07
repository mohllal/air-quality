/**
 * HTTP error messages declared here.
 */


/* eslint-disable max-len */

enum HttpErrorMessages {
  /**
   * An unknown error occurred. The client should try the request again later.
   * This generic error message is used when no specific information is available.
   */
  UNKNOWN_ERROR = 'Something went wrong, please try again later!',

  /**
   * An error occurred from a provider we are integrating with while processing your request.
   * This generic error message indicates an issue with an external service or provider.
   */
  
  PROVIDER_ERROR = 'An error occurred from a provider while processing the request with it.'
}

export default HttpErrorMessages;
