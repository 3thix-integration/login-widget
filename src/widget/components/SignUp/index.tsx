import { useCallback, useContext, useMemo, useState } from 'react';

import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

import { Error3thix, PinSuccess, RespAPI } from '../../clients/types';
import { ThemeContext } from '../../contexts/theme';

type Props = {
  success: () => void;
  api: apiClient;
};

interface apiClient {
  signUp: (first_name: string, last_name: string, email: string, password: string) => Promise<RespAPI<PinSuccess>>;
}

const SignUp = ({ success, api }: Props) => {
  const theme = useContext(ThemeContext);
  const [errorMsg, setErrorMsg] = useState<string>();
  // const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', repeat_password: '' });
  const [showPassword, setShowPassword] = useState({
    password: false,
    repeat_password: false,
  });

  const toggleShowPassword = (field: 'password' | 'repeat_password') => () =>
    setShowPassword((old) => ({ ...old, [field]: !old[field] }));

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const submitLoginWithEmail = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { data, status } = await api.signUp(form.first_name, form.last_name, form.email, form.password);
      if (status !== 201) {
        console.error(status, data);
        setErrorMsg((data as Error3thix).message);
        return;
      }

      success();
    },
    [api, form, success]
  );

  const errorComponent = useMemo(() => {
    if (!errorMsg) return null;
    return (
      <div className="mt-6 w-full text-center border-[2px] border-[#f37575] text-[#fa4747] bg-[#ffb8b8] p-[10px] rounded-[8px]">
        <p>{errorMsg}</p>
      </div>
    );
  }, [errorMsg]);

  return (
    <div>
      <h1 className="text-[24px] text-center" style={{ color: theme.TextColor }}>
        Create new account
      </h1>
      <form onSubmit={submitLoginWithEmail}>
        <div className="mt-4">
          <div className="ml-1" style={{ color: theme.InputLabelColor }}>
            First name
          </div>
          <input
            required
            name="first_name"
            type="text"
            placeholder="First Name"
            className="font-[600] outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
            style={{
              color: theme.InputTextColor,
              backgroundColor: theme.InputBackground,
              borderColor: theme.InputBorderColor,
            }}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <div className="ml-1" style={{ color: theme.InputLabelColor }}>
            Last name
          </div>
          <input
            required
            name="last_name"
            type="text"
            placeholder="Last name"
            className="font-[600] outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
            style={{
              color: theme.InputTextColor,
              backgroundColor: theme.InputBackground,
              borderColor: theme.InputBorderColor,
            }}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <div className="ml-1" style={{ color: theme.InputLabelColor }}>
            E-mail
          </div>
          <input
            required
            name="email"
            type="email"
            placeholder="email@email.com"
            className="font-[600] outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
            style={{
              color: theme.InputTextColor,
              backgroundColor: theme.InputBackground,
              borderColor: theme.InputBorderColor,
            }}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <div className="ml-1" style={{ color: theme.InputLabelColor }}>
            Password
          </div>
          <div className="relative">
            <input
              required
              name="password"
              type={showPassword.password ? 'text' : 'password'}
              placeholder="Password"
              className="font-[600] outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
              style={{
                color: theme.InputTextColor,
                backgroundColor: theme.InputBackground,
                borderColor: theme.InputBorderColor,
              }}
              onChange={handleChange}
            />
            <button
              className="absolute top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
              style={{ color: theme.InputTextColor }}
              type="button"
              onClick={toggleShowPassword('password')}
            >
              {showPassword.password ? <EyeInvisibleFilled /> : <EyeFilled />}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="ml-1" style={{ color: theme.InputLabelColor }}>
            Repeat your password
          </div>
          <div className="relative">
            <input
              required
              name="repeat_password"
              type={showPassword.repeat_password ? 'text' : 'password'}
              placeholder="Repeat your password"
              className="font-[600] outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
              style={{
                color: theme.InputTextColor,
                backgroundColor: theme.InputBackground,
                borderColor: form.password !== form.repeat_password ? 'red' : theme.InputBorderColor,
              }}
              onChange={handleChange}
            />
            <button
              className="absolute top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
              style={{ color: theme.InputTextColor }}
              type="button"
              onClick={toggleShowPassword('repeat_password')}
            >
              {showPassword.repeat_password ? <EyeInvisibleFilled /> : <EyeFilled />}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="ml-1 flex flex-row items-center gap-2" style={{ color: theme.InputLabelColor }}>
            <div className="flex">
              <input
                required
                type="checkbox"
                className="h-[18px] w-[18px]"
                style={{ accentColor: theme.ButtonBackground }}
              />
            </div>
            <div className="text-[16px]">
              I accept the{' '}
              <a
                target="_blank"
                className="underline"
                href="https://3thix.com/terms-conditions/"
                style={{ color: theme.LinkColor }}
                rel="noreferrer"
              >
                terms and conditions
              </a>
            </div>
          </div>
        </div>

        {errorComponent}

        <button
          type="submit"
          className="mt-8 w-full py-[12px] rounded-[10px] text-lg font-[600]"
          style={{ color: theme.ButtonTextColor, backgroundColor: theme.ButtonBackground }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
