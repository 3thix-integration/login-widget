import { useCallback, useContext, useState } from 'react';

import { EyeFilled, EyeInvisibleFilled, GoogleOutlined } from '@ant-design/icons';

import { ThemeContext } from '../../../../contexts/theme';

type Props = {
  signInGoogle: () => void;
  onSubmit: () => Promise<void>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onClickForgetPassword: () => void;
  errorMsg?: string;
};

const AuthenticationForm = ({ signInGoogle, onSubmit, handleChange, onClickForgetPassword, errorMsg }: Props) => {
  const theme = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((old) => !old);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await onSubmit();
    },
    [onSubmit]
  );

  return (
    <div>
      <h1 className="text-[24px] text-center" style={{ color: theme.TextColor }}>
        Sign in with
      </h1>
      <button
        className="mt-6 w-full py-[12px] rounded-[10px] bg-[#4c8bf5] text-lg font-[500] text-white flex justify-center items-center"
        onClick={signInGoogle}
      >
        <GoogleOutlined className="mr-2" />
        Enter with Google
      </button>
      <div className="flex flex-row justify-center items-center mt-6">
        <div className="flex-1 h-[1px]" style={{ backgroundColor: theme.LinkColor }}></div>
        <div className="p-2" style={{ color: theme.LinkColor }}>
          OR
        </div>
        <div className="flex-1 h-[1px]" style={{ backgroundColor: theme.LinkColor }}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          required
          name="email"
          type="email"
          placeholder="Type your email here"
          className="mt-6 outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
          style={{
            color: theme.InputTextColor,
            backgroundColor: theme.InputBackground,
            borderColor: theme.InputBorderColor,
          }}
          onChange={handleChange}
        />

        <div className="relative mt-6">
          <input
            required
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Type your password here"
            className="outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[12px]"
            style={{
              color: theme.InputTextColor,
              backgroundColor: theme.InputBackground,
              borderColor: theme.InputBorderColor,
            }}
            onChange={handleChange}
          />
          <button
            className="absolute top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
            type="button"
            style={{ color: theme.InputTextColor }}
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeInvisibleFilled /> : <EyeFilled />}
          </button>
        </div>

        <div className="flex justify-end flex-row mt-6">
          <button
            className="underline"
            style={{ color: theme.LinkColor }}
            type="button"
            onClick={onClickForgetPassword}
          >
            Forget password
          </button>
        </div>

        {errorMsg && (
          <div className="mt-6 w-full border-[2px] text-center border-[#f37575] text-[#fa4747] bg-[#ffb8b8] p-[10px] rounded-[12px]">
            <p>{errorMsg}</p>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full py-[12px] rounded-[10px] text-lg font-[500]"
          style={{ color: theme.ButtonTextColor, backgroundColor: theme.ButtonBackground }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AuthenticationForm;
