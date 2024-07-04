import { AxiosError } from 'axios';
import HttpClient from '@src/util/HttpClient';

describe('HttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient('https://example.com');
  });

  it('should make a GET request to the specified URL', async () => {
    // Create instance.get method spy
    const getSpy = spyOn(httpClient.instance, 'get').and.resolveTo({ data: {} });
    
    // Call the get method with the URL and options
    const result = await httpClient.get('https://example.com', {});

    // Assert that the instance.get method was called with the correct URL
    expect(getSpy).toHaveBeenCalledWith('https://example.com', {});

    // Assert that the httpClient.get method returns the correct data
    expect(result.data).toEqual({});
  });

  it('should make a request with the specified config', async () => {
    // Create instance.request method spy
    const requestSpy = 
      spyOn(httpClient.instance, 'request').and.resolveTo({ data: {} });
  
    // Call the get method with the URL and options
    const result = await httpClient.request({});

    // Assert that the instance.request method was called with the correct URL
    expect(requestSpy).toHaveBeenCalledWith({});

    // Assert that the httpClient.request method returns the correct data
    expect(result.data).toEqual({});
  });

  it('should throw an error when the instance.get method fails', async () => {
    // Create instance.get method spy
    const getSpy = 
      spyOn(httpClient.instance, 'get')
        .and.rejectWith(new AxiosError('Network error!'));
  
    try {
      // Call the httpClient.get method with the URL and options
      await httpClient.get('https://example.com', {});
    } catch (error) {
      // Assert that the httpClient.get method throws an error
      expect(error).toBeInstanceOf(AxiosError);
    }

    // Assert that the instance.get method was called with the correct URL
    expect(getSpy).toHaveBeenCalledWith('https://example.com', {});
  });
});