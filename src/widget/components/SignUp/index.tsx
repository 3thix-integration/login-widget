import { useCallback, useRef, useState } from 'react';

import { client } from '../../clients';

type Props = {
  success: () => void;
  url: string;
};

const SignUp = ({ success, url }: Props) => {
  const apiRef = useRef(client(url));
  const [form, setForm] = useState({ pin: '', email: '', passwrod: '' });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const submitLoginWithEmail = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { data, status } = await apiRef.current.pin(form.email);
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

export default SignUp;
