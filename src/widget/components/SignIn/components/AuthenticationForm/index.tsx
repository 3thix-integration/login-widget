import { useCallback, useContext, useState } from 'react';

import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

import { ThemeContext } from '../../../../contexts/theme';
import Divisor from '../../../Divisor';
import SSOAuth from '../../../SSOAuth';

type Props = {
  signInGoogle: () => void;
  signInApple: () => void;
  onSubmit: () => Promise<void>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onClickForgetPassword: () => void;
  errorMsg?: string;
};

const AuthenticationForm = ({
  signInGoogle,
  signInApple,
  onSubmit,
  handleChange,
  onClickForgetPassword,
  errorMsg,
}: Props) => {
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
      <SSOAuth title="Sign In" signInApple={signInApple} signInGoogle={signInGoogle} />
      <Divisor />
      <form onSubmit={handleSubmit}>
        <input
          required
          name="email"
          type="email"
          placeholder="E-mail"
          className="mt-6 font-[600] outline-none w-full p-[14px] border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
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
            placeholder="Password"
            className="font-[600] outline-none w-full p-[14px] border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
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

        <div className="flex justify-end flex-row mt-4 ">
          <button
            style={{ color: theme.LinkColor }}
            className="text-[18px]"
            type="button"
            onClick={onClickForgetPassword}
          >
            Forget password ?
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 w-full border-[2px] text-center border-[#f37575] text-[#fa4747] bg-[#ffb8b8] p-[10px] rounded-[8px]">
            <p>{errorMsg}</p>
          </div>
        )}

        <button
          type="submit"
          className="mt-4 w-full py-[12px] rounded-[10px] text-lg font-[600]"
          style={{ color: theme.ButtonTextColor, backgroundColor: theme.ButtonBackground }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AuthenticationForm;
