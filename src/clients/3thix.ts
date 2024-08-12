import axios, { AxiosError } from 'axios';

import { Error3thix, LoginSuccess } from '../types/3thix';

const instance = axios.create({
  baseURL: process.env.REACT_APP_3THIX_API,
  timeout: 10_000,
  headers: {},
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError): RespAPI<AxiosError> => {
    const errorData = error.response?.data as Error3thix | undefined;
    let errorMessage = error.message;

    if (errorData && 'message' in errorData && 'details' in errorData) {
      errorMessage = `${errorData.message}: ${errorData.details}`;
    } else if (errorData && 'message' in errorData) {
      errorMessage = errorData.message;
    }

    return {
      status: error.response?.status || 500,
      data: { message: errorMessage },
    };
  }
);

type RespAPI<Success> = {
  status: number;
  data: Success | Error3thix;
};

export function client(baseURL: string) {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10_000,
    headers: {},
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError): RespAPI<AxiosError> => {
      const errorData = error.response?.data as Error3thix | undefined;
      let errorMessage = error.message;

      if (errorData && 'message' in errorData && 'details' in errorData) {
        errorMessage = `${errorData.message}: ${errorData.details}`;
      } else if (errorData && 'message' in errorData) {
        errorMessage = errorData.message;
      }

      return {
        status: error.response?.status || 500,
        data: { message: errorMessage },
      };
    }
  );

  const login = async (pin: string, login: string, password: string): Promise<RespAPI<LoginSuccess>> => {
    const response = await instance.post('/entity/user/auth', { pin, login, password });

    return {
      status: response.status,
      data: response.data,
    };
  };

  return { login };
}
