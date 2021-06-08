import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
var querystring = require('querystring');

async function post(
  data: any,
  url: string,
  header: any,
): Promise<AxiosResponse<any>> {
  console.log(`POST: ${url}`);
  console.log(data);
  try {
    const response = await axios.post(url, querystring.stringify(data), {
      headers: header,
    });
    console.log('AXIOS POST RESPONSE: ');
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
}

async function get(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<any>> {
  console.log(`GET: ${url}`);
  try {
    const response = await axios.get(url, config);
    ('AXIOS GET RESPONSE: ');
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
}

export { post, get };
