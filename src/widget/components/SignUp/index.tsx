import { useCallback, useRef, useState } from 'react';

import { client } from '../../clients';

type Props = {
  success: () => void;
  url: string;
};

const SignUp = ({ success, url }: Props) => {
  const apiRef = useRef(client(url));
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const submitLoginWithEmail = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { data, status } = await apiRef.current.signUp(form.first_name, form.last_name, form.email, form.password);
      if (status !== 201) {
        // TODO fails status
        console.error(status, data);
        return;
      }

      success();
    },
    [form, success]
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
          <input
            required
            name="password"
            type="password"
            placeholder="Type your password here"
            className="outline-none w-full p-4 bg-[#181745] text-[#EEE] border-2 border-[#181745] focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
            onChange={handleChange}
          />
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
