import axios, { AxiosError } from 'axios';

import { Error3thix, LoginSuccess, PinSuccess } from './types';

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

  const auth = async (pin: string, email: string, password: string): Promise<RespAPI<LoginSuccess>> => {
    const response = await instance.post(
      '/entity/user/auth',
      { pin, email, password },
      { headers: { 'Accept-version': 'v2' } }
    );

    return {
      status: response.status,
      data: response.data,
    };
  };

  const pin = async (email: string): Promise<RespAPI<PinSuccess>> => {
    const response = await instance.post('/entity/user/auth/pin', { email });

    return {
      status: response.status,
      data: response.data,
    };
  };

  const signUp = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<RespAPI<PinSuccess>> => {
    const response = await instance.post('/entity/user/sign-up', {
      first_name,
      last_name,
      email,
      password,
    });

    return {
      status: response.status,
      data: response.data,
    };
  };

  return { auth, pin, signUp };
}
