import axios, { AxiosError } from 'axios';

import { Error3thix, LoginSuccess, PinSuccess, RespAPI, SuccessUserMe } from './types';

export function client(baseUrl: string, callbackUrl: string) {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10_000,
    headers: {},
  });

  instance.interceptors.request.use(async (request) => {
    const lang = navigator.language || 'en-US';
    request.headers['Accept-Language'] = lang;
    return request;
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

  const authPin = async (email: string, pin: string): Promise<RespAPI<LoginSuccess>> => {
    const response = await instance.post(
      '/entity/user/auth/pin',
      { pin, email },
      { headers: { 'Accept-version': 'v2' } }
    );

    return {
      status: response.status,
      data: response.data,
    };
  };

  const auth = async (email: string, password: string): Promise<RespAPI<PinSuccess>> => {
    const response = await instance.post(
      '/entity/user/auth',
      { email, password },
      { headers: { 'Accept-version': 'v2' } }
    );

    return {
      status: response.status,
      data: response.data,
    };
  };

  const changePasswordPin = async (
    pin: string,
    email: string,
    new_password: string
  ): Promise<RespAPI<LoginSuccess>> => {
    const response = await instance.put('/entity/user/password/update/pin', { pin, email, new_password });

    return {
      status: response.status,
      data: response.data,
    };
  };

  const userMe = async (token: string): Promise<RespAPI<SuccessUserMe>> => {
    const response = await instance.get('/entity/user/me', { headers: { Authorization: `Bearer ${token}` } });

    return {
      status: response.status,
      data: response.data,
    };
  };

  const acceptTerms = async (token: string): Promise<RespAPI<null>> => {
    const response = await instance.put('/entity/user/terms-conditions/sign', null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      status: response.status,
      data: response.data,
    };
  };

  const changePassword = async (email: string): Promise<RespAPI<PinSuccess>> => {
    const response = await instance.post('/entity/user/password/update', { email });

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

  const signInGoogle = () => {
    const url = new URL(`${baseUrl}/entity/user/auth/google/signin`);
    url.searchParams.append('callbackUrl', callbackUrl);
    window.location.replace(url.href);
  };

  const signInApple = () => {
    const url = new URL(`${baseUrl}/entity/user/auth/apple/signin`);
    url.searchParams.append('callbackUrl', callbackUrl);
    window.location.replace(url.href);
  };

  return { authPin, auth, changePassword, signUp, changePasswordPin, signInGoogle, signInApple, userMe, acceptTerms };
}
