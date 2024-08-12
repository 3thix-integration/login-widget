import { useCallback, useRef, useState } from 'react';

import { GoogleOutlined } from '@ant-design/icons';

import { client } from '../../clients/3thix';
import { LoginSuccess } from '../../types/3thix';

type Props = {
  callback: (token: string) => void;
  url: string;
};

const Login = ({ callback, url }: Props) => {
  const apiRef = useRef(client(url));
  const [form, setForm] = useState({ email: '', passwrod: '' });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const submitLoginWithEmail = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { data, status } = await apiRef.current.login('pin', form.email, form.passwrod);
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

  return (
    <div>
      <button className="mt-6 w-full py-[12px] rounded-[10px] bg-[#4c8bf5] text-lg font-[500] text-white flex justify-center items-center">
        <GoogleOutlined className="mr-2" />
        Enter with Google
      </button>
      <div className="flex flex-row justify-center items-center mt-6">
        <div className="flex-1 bg-[#9190c2] h-[1px]"></div>
        <div className="text-[#9190c2] p-2">OR</div>
        <div className="flex-1 bg-[#9190c2] h-[1px]"></div>
      </div>
      <form onSubmit={submitLoginWithEmail}>
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

export default Login;
