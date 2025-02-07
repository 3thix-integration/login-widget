import { useCallback, useState } from 'react';

import { Error3thix, LoginSuccess, PinSuccess, RespAPI } from '../../clients/types';
import VerificationPin from '../VerificationPin';
import AuthenticationForm from './components/AuthenticationForm';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';

type Props = {
  callback: (token: string) => void;
  api: apiClient;
};

interface apiClient {
  changePassword: (email: string) => Promise<RespAPI<PinSuccess>>;
  changePasswordPin: (pin: string, email: string, new_password: string) => Promise<RespAPI<LoginSuccess>>;
  auth: (email: string, password: string) => Promise<RespAPI<PinSuccess>>;
  authPin: (email: string, pin: string) => Promise<RespAPI<LoginSuccess>>;
  signInGoogle: () => void;
  signInApple: () => void;
}

enum Step {
  LOGIN = 1,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  PIN,
  CHANGE_PASSWORD_PIN,
}

const SignIn = ({ callback, api }: Props) => {
  const [step, setStep] = useState<Step>(Step.LOGIN);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [form, setForm] = useState({ pin: '', email: '', password: '', new_password: '', repeat_new_password: '' });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const requestAuthPin = useCallback(async () => {
    const { data, status } = await api.auth(form.email, form.password);
    if (status !== 200) {
      console.error(status, data);
      setErrorMsg((data as Error3thix).message);
      return;
    }
    setErrorMsg(undefined);
    setStep(Step.PIN);
  }, [form, api]);

  const requestChangePasswordPin = useCallback(async () => {
    const { data, status } = await api.changePassword(form.email);
    if (status !== 200) {
      console.error(status, data);
      setErrorMsg((data as Error3thix).message);
      return;
    }
    setErrorMsg(undefined);
    setStep(Step.CHANGE_PASSWORD_PIN);
  }, [form, api]);

  const handleLoginWithEmail = useCallback(async () => {
    const { data, status } = await api.authPin(form.email, form.pin);
    if (status !== 200) {
      console.error(status, data);
      setErrorMsg((data as Error3thix).message);
      return;
    }
    const sucess = data as LoginSuccess;
    callback(sucess.token);
  }, [callback, form, api]);

  const changePassword = useCallback(async () => {
    const { data, status } = await api.changePasswordPin(form.pin, form.email, form.new_password);
    if (status !== 204) {
      console.error(status, data);
      setErrorMsg((data as Error3thix).message);
      return;
    }

    setStep(Step.LOGIN);
  }, [form, api]);

  if (step === Step.PIN) {
    return <VerificationPin handleChange={handleChange} errorMsg={errorMsg} onSubmit={handleLoginWithEmail} />;
  }

  if (step === Step.CHANGE_PASSWORD_PIN) {
    return (
      <VerificationPin
        handleChange={handleChange}
        errorMsg={errorMsg}
        onSubmit={async () => {
          setStep(Step.CHANGE_PASSWORD);
        }}
      />
    );
  }

  if (step === Step.FORGOT_PASSWORD) {
    return (
      <ForgotPassword
        handleChange={handleChange}
        goBack={() => setStep(Step.LOGIN)}
        errorMsg={errorMsg}
        onSubmit={requestChangePasswordPin}
      />
    );
  }

  if (step === Step.CHANGE_PASSWORD) {
    return (
      <ChangePassword
        repeatPasswordDoesNotMatch={form.new_password !== form.repeat_new_password}
        handleChange={handleChange}
        goBack={() => setStep(Step.LOGIN)}
        errorMsg={errorMsg}
        onSubmit={changePassword}
      />
    );
  }

  return (
    <AuthenticationForm
      signInGoogle={api.signInGoogle}
      signInApple={api.signInApple}
      handleChange={handleChange}
      errorMsg={errorMsg}
      onSubmit={requestAuthPin}
      onClickForgetPassword={() => setStep(Step.FORGOT_PASSWORD)}
    />
  );
};

export default SignIn;
