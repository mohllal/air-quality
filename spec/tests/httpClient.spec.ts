import { AxiosError } from 'axios';
import EnvVars from '@src/common/EnvVars';
import HttpClient from '@src/utils/HttpClient';
import nock from 'nock';

describe('HttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient('http://example.com');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should make a GET request to the specified URL', async () => {
    // Register nock HTTP requests interceptor
    nock('http://example.com').get('/test').reply(200, 'Ok');

    // Create axios.get method spy
    const axiosGetSpy = spyOn(httpClient.instance, 'get').and.callThrough();
    
    // Call the HttpClient.get method with the URL and options
    const result = await httpClient.get('/test');

    // Assert that the axios.get method was called with the correct URL
    expect(axiosGetSpy).toHaveBeenCalledWith('/test', undefined);

    // Assert that the HttpClient.get method returns the correct status and data
    expect(result.status).toEqual(200);
    expect(result.data).toEqual('Ok');
  });

  it('should make a request with the specified config', async () => {
    // Register nock HTTP requests interceptor
    nock('http://example.com').get('/test').reply(200, 'Ok');

    // Create axios.request method spy
    const axiosRequestSpy = spyOn(httpClient.instance, 'request').and.callThrough();
  
    // Call the HttpClient.get method with the URL and options
    const result = await httpClient.request({ url: '/test', method: 'get' });

    // Assert that the axios.request method was called with the correct data
    expect(axiosRequestSpy).toHaveBeenCalledWith({ url: '/test', method: 'get'});

    // Assert that the HttpClient.request method returns the correct status and data
    expect(result.status).toEqual(200);
    expect(result.data).toEqual('Ok');
  });

  it('should throw an error when the axios.get method fails', async () => {
    // Create axios error
    const NETWORK_ERROR = new AxiosError('Some connection error');
    NETWORK_ERROR.code = 'ECONNRESET';

    // Register nock HTTP requests interceptor
    nock('http://example.com').get('/test').replyWithError(NETWORK_ERROR);

    // Create axios.get method spy
    const axiosGetSpy = spyOn(httpClient.instance, 'get').and.callThrough();
  
    // Call the HttpClient.get method and assert that it is rejected
    await expectAsync(httpClient.get('/test')).toBeRejected();
   
    // Assert that the axios.get method was called with the correct URL
    expect(axiosGetSpy).toHaveBeenCalledWith('/test', undefined);
  });

  it(`should be retried ${EnvVars.HTTP_REQUEST_MAX_RETRIES} times and succeeds ` + 
    'when the axios.get method fails less than or equal to ' +
    `${EnvVars.HTTP_REQUEST_MAX_RETRIES} times`
  , async () => {
    // Create axios error
    const NETWORK_ERROR = new AxiosError('Some connection error');
    NETWORK_ERROR.code = 'ECONNRESET';

    // Register nock HTTP requests interceptor
    nock('http://example.com').get('/test').times(EnvVars.HTTP_REQUEST_MAX_RETRIES).replyWithError(NETWORK_ERROR);
    nock('http://example.com').get('/test').reply(200, 'Ok');
  
    const result = await httpClient.get('/test');

    // Assert that the HttpClient.get method returns the correct status and data
    expect(result.status).toEqual(200);
    expect(result.data).toEqual('Ok');
  });

  it(`should be retried ${EnvVars.HTTP_REQUEST_MAX_RETRIES} times and fails ` + 
  'when the axios.get method fails more than ' +
  `${EnvVars.HTTP_REQUEST_MAX_RETRIES} times`
  , async () => {
    // Create axios error
    const NETWORK_ERROR = new AxiosError('Some connection error');
    NETWORK_ERROR.code = 'ECONNRESET';

    // Register nock HTTP requests interceptor
    nock('http://example.com').get('/test').times(EnvVars.HTTP_REQUEST_MAX_RETRIES + 1).replyWithError(NETWORK_ERROR);
    nock('http://example.com').get('/test').reply(200, 'Ok');
  
    // Call the HttpClient.get method and assert that it is rejected
    await expectAsync(httpClient.get('/test')).toBeRejected();
  });
});