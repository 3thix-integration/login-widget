import { useCallback, useMemo, useState } from 'react';

import { ArrowLeftOutlined, EyeFilled, EyeInvisibleFilled, GoogleOutlined } from '@ant-design/icons';

import { Error3thix, LoginSuccess, PinSuccess, RespAPI } from '../../clients/types';

type Props = {
  callback: (token: string) => void;
  api: apiClient;
};

interface apiClient {
  pin: (email: string) => Promise<RespAPI<PinSuccess>>;
  changePassword: (pin: string, email: string, password: string) => Promise<RespAPI<LoginSuccess>>;
  auth: (pin: string, email: string, password: string) => Promise<RespAPI<LoginSuccess>>;
  signInGoogle: () => void;
}

enum Step {
  LOGIN = 1,
  CHANGE_PASSWORD,
  PIN,
}

const SignIn = ({ callback, api }: Props) => {
  const [step, setStep] = useState<Step>(Step.LOGIN);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [form, setForm] = useState({ pin: '', email: '', password: '', new_password: '', repeat_new_password: '' });
  const [showPassword, setShowPassword] = useState({
    password: false,
    new_password: false,
    repeat_new_password: false,
  });

  const toggleShowPassword = (field: 'password' | 'new_password' | 'repeat_new_password') => () =>
    setShowPassword((old) => ({ ...old, [field]: !old[field] }));

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const requestPin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { data, status } = await api.pin(form.email);
      if (status !== 201) {
        console.error(status, data);
        setErrorMsg((data as Error3thix).message);
        return;
      }
      setErrorMsg(undefined);
      setStep(Step.PIN);
    },
    [form, api]
  );

  const handleLoginWithEmail = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let password = form.password;
      if (form.new_password) {
        password = form.new_password;
        const { data, status } = await api.changePassword(form.pin, form.email, form.new_password);
        if (status !== 204) {
          console.error(status, data);
          setErrorMsg((data as Error3thix).message);
          return;
        }
      }

      const { data, status } = await api.auth(form.pin, form.email, password);
      if (status !== 200) {
        console.error(status, data);
        setErrorMsg((data as Error3thix).message);
        return;
      }
      const sucess = data as LoginSuccess;
      callback(sucess.token);
    },
    [callback, form, api]
  );

  const errorComponent = useMemo(() => {
    if (!errorMsg) return null;
    return (
      <div className="mt-6 w-full border-[2px] text-center border-[#f37575] text-[#fa4747] bg-[#ffb8b8] p-[10px] rounded-[12px]">
        <p>{errorMsg}</p>
      </div>
    );
  }, [errorMsg]);

  if (step === Step.PIN) {
    return (
      <div>
        <h1 className="text-[24px] text-center text-[#fff]">Authorization pin</h1>
        <h1 className="text-[18px] text-center text-[#fff]">We sent an email with your pin</h1>
        <form onSubmit={handleLoginWithEmail}>
          <input
            required
            name="pin"
            type="text"
            placeholder="Type the PIN here"
            className="mt-6 outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
            onChange={handleChange}
          />

          {errorComponent}

          <button
            type="submit"
            className="mt-6 w-full py-[12px] rounded-[10px] bg-[#24D07E] text-lg font-[500] text-white"
          >
            Validate
          </button>
        </form>
      </div>
    );
  }

  if (step === Step.CHANGE_PASSWORD) {
    return (
      <div>
        <div className="flex flex-row justify-between items-center mb-8">
          <button className="text-[#fff] flex" onClick={() => setStep(Step.LOGIN)}>
            <ArrowLeftOutlined className="mr-2" />
          </button>
          <h1 className="flex-1 text-[24px] text-center text-[#fff]">Redefine Password</h1>
          <div className="flex"></div>
        </div>

        <form onSubmit={requestPin}>
          <div className="mt-4">
            <div className="text-[#68679d] ml-2">E-mail</div>
            <input
              required
              name="email"
              type="email"
              placeholder="Type your email here"
              className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <div className="text-[#68679d] ml-2">New password</div>
            <div className="relative">
              <input
                required
                name="new_password"
                type={showPassword.new_password ? 'text' : 'password'}
                placeholder="Type your new password here"
                className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
                onChange={handleChange}
              />
              <button
                className="absolute text-[#9190c2] top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
                type="button"
                onClick={toggleShowPassword('new_password')}
              >
                {showPassword.new_password ? <EyeInvisibleFilled /> : <EyeFilled />}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-[#68679d] ml-2">Repeat New password</div>
            <div className="relative">
              <input
                required
                name="repeat_new_password"
                type={showPassword.repeat_new_password ? 'text' : 'password'}
                placeholder="Type your new password here"
                className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
                style={{ borderColor: form.new_password !== form.repeat_new_password ? 'red' : undefined }}
                onChange={handleChange}
              />
              <button
                className="absolute text-[#9190c2] top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
                type="button"
                onClick={toggleShowPassword('repeat_new_password')}
              >
                {showPassword.repeat_new_password ? <EyeInvisibleFilled /> : <EyeFilled />}
              </button>
            </div>
          </div>

          {errorComponent}

          <button
            type="submit"
            className="mt-6 w-full py-[12px] rounded-[10px] bg-[#24D07E] text-lg font-[500] text-white"
          >
            Change my password
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-[24px] text-center text-[#fff]">Sign in with</h1>
      <button
        className="mt-6 w-full py-[12px] rounded-[10px] bg-[#4c8bf5] text-lg font-[500] text-white flex justify-center items-center"
        onClick={api.signInGoogle}
      >
        <GoogleOutlined className="mr-2" />
        Enter with Google
      </button>
      <div className="flex flex-row justify-center items-center mt-6">
        <div className="flex-1 bg-[#9190c2] h-[1px]"></div>
        <div className="text-[#9190c2] p-2">OR</div>
        <div className="flex-1 bg-[#9190c2] h-[1px]"></div>
      </div>
      <form onSubmit={requestPin}>
        <input
          required
          name="email"
          type="email"
          placeholder="Type your email here"
          className="mt-6 outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
          onChange={handleChange}
        />

        <div className="relative mt-6">
          <input
            required
            name="password"
            type={showPassword.password ? 'text' : 'password'}
            placeholder="Type your password here"
            className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
            onChange={handleChange}
          />
          <button
            className="absolute text-[#9190c2] top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
            type="button"
            onClick={toggleShowPassword('password')}
          >
            {showPassword.password ? <EyeInvisibleFilled /> : <EyeFilled />}
          </button>
        </div>

        <div className="flex justify-end flex-row mt-6">
          <button className="text-[#9190c2] underline" type="button" onClick={() => setStep(Step.CHANGE_PASSWORD)}>
            Forget password
          </button>
        </div>

        {errorComponent}

        <button
          type="submit"
          className="mt-6 w-full py-[12px] rounded-[10px] bg-[#24D07E] text-lg font-[500] text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
