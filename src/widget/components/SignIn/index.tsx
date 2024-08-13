import { useCallback, useRef, useState } from 'react';

import { ArrowLeftOutlined, GoogleOutlined } from '@ant-design/icons';

import { client } from '../../clients';
import { LoginSuccess } from '../../clients/types';

type Props = {
  callback: (token: string) => void;
  url: string;
};

enum Step {
  LOGIN = 1,
  CHANGE_PASSWORD,
  PIN,
}

const SignIn = ({ callback, url }: Props) => {
  const [step, setStep] = useState<Step>(Step.LOGIN);
  const apiRef = useRef(client(url));
  const [form, setForm] = useState({ pin: '', email: '', password: '', new_password: '' });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const requestPin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { data, status } = await apiRef.current.pin(form.email);
      if (status !== 201) {
        // TODO fails status
        console.error(status, data);
        return;
      }
      setStep(Step.PIN);
    },
    [form]
  );

  const handleLoginWithEmail = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let password = form.password;
      if (form.new_password) {
        password = form.new_password;
        const { data, status } = await apiRef.current.changePassword(form.pin, form.email, form.new_password);
        if (status !== 204) {
          // TODO fails status
          console.error(status, data);
          return;
        }
      }

      const { data, status } = await apiRef.current.auth(form.pin, form.email, password);
      if (status !== 200) {
        // TODO fails status
        console.error(status, data);
        return;
      }
      const sucess = data as LoginSuccess;
      callback(sucess.token);
    },
    [callback, form]
  );

  if (step === Step.PIN) {
    return (
      <div>
        <h1 className="text-[24px] text-center text-[#fff]">Althorization pin</h1>
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
            <input
              required
              name="new_password"
              type="password"
              placeholder="Type your new password here"
              className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
              onChange={handleChange}
            />
          </div>

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
      <button className="mt-6 w-full py-[12px] rounded-[10px] bg-[#4c8bf5] text-lg font-[500] text-white flex justify-center items-center">
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

        <input
          required
          name="password"
          type="password"
          placeholder="Type your password here"
          className="mt-6 outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
          onChange={handleChange}
        />
        <button className="text-[#9190c2] mt-6 float-right underline" onClick={() => setStep(Step.CHANGE_PASSWORD)}>
          Forget password
        </button>

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
