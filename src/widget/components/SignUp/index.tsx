import { useCallback, useState } from 'react';

import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

import { PinSuccess, RespAPI } from '../../clients/types';

type Props = {
  success: () => void;
  api: apiClient;
};

interface apiClient {
  signUp: (first_name: string, last_name: string, email: string, password: string) => Promise<RespAPI<PinSuccess>>;
}

const SignUp = ({ success, api }: Props) => {
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
        // TODO fails status
        console.error(status, data);
        return;
      }

      success();
    },
    [api, form, success]
  );

  return (
    <div>
      <h1 className="text-[24px] text-center text-[#fff]">Create new account</h1>
      <form onSubmit={submitLoginWithEmail}>
        <div className="mt-4">
          <div className="text-[#68679d] ml-2">First name</div>
          <input
            required
            name="first_name"
            type="text"
            placeholder="Type your First Name"
            className=" outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <div className="text-[#68679d] ml-2">Last name</div>
          <input
            required
            name="last_name"
            type="text"
            placeholder="Type your Last name"
            className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
            onChange={handleChange}
          />
        </div>

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
          <div className="text-[#68679d] ml-2">Password</div>
          <div className="relative">
            <button
              className="absolute text-[#9190c2] top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
              type="button"
              onClick={toggleShowPassword('password')}
            >
              {showPassword.password ? <EyeInvisibleFilled /> : <EyeFilled />}
            </button>
            <input
              required
              name="password"
              type={showPassword.password ? 'text' : 'password'}
              placeholder="Type your new password here"
              className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[#68679d] ml-2">Repeat New password</div>
          <div className="relative">
            <button
              className="absolute text-[#9190c2] top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
              type="button"
              onClick={toggleShowPassword('repeat_password')}
            >
              {showPassword.repeat_password ? <EyeInvisibleFilled /> : <EyeFilled />}
            </button>
            <input
              required
              name="repeat_password"
              type={showPassword.repeat_password ? 'text' : 'password'}
              placeholder="Type your new password here"
              className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
              style={{ borderColor: form.password !== form.repeat_password ? 'red' : undefined }}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-[12px] rounded-[10px] bg-[#24D07E] text-lg font-[500] text-white"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
