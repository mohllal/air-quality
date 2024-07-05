import { AxiosError } from 'axios';
import HttpClient from '@src/utils/HttpClient';

describe('HttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient('https://example.com');
  });

  it('should make a GET request to the specified URL', async () => {
    // Create axios.get method spy
    const axiosGetSpy = spyOn(httpClient.instance, 'get').and.resolveTo({ data: {} });
    
    // Call the HttpClient.get method with the URL and options
    const result = await httpClient.get('https://example.com', {});

    // Assert that the axios.get method was called with the correct URL
    expect(axiosGetSpy).toHaveBeenCalledWith('https://example.com', {});

    // Assert that the HttpClient.get method returns the correct data
    expect(result.data).toEqual({});
  });

  it('should make a request with the specified config', async () => {
    // Create axios.request method spy
    const axiosRequestSpy = 
      spyOn(httpClient.instance, 'request').and.resolveTo({ data: {} });
  
    // Call the HttpClient.get method with the URL and options
    const result = await httpClient.request({});

    // Assert that the axios.request method was called with the correct URL
    expect(axiosRequestSpy).toHaveBeenCalledWith({});

    // Assert that the HttpClient.request method returns the correct data
    expect(result.data).toEqual({});
  });

  it('should throw an error when the axios.get method fails', async () => {
    // Create axios.get method spy
    const axiosGetSpy = 
      spyOn(httpClient.instance, 'get')
        .and.rejectWith(new AxiosError('Network error!'));
  
    try {
      // Call the HttpClient.get method with the URL and options
      await httpClient.get('https://example.com', {});
    } catch (error) {
      // Assert that the HttpClient.get method throws an error
      expect(error).toBeInstanceOf(AxiosError);
    }

    // Assert that the axios.get method was called with the correct URL
    expect(axiosGetSpy).toHaveBeenCalledWith('https://example.com', {});
  });
});