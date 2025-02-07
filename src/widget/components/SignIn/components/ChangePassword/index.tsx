import { useCallback, useContext, useState } from 'react';

import { ArrowLeftOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

import { ThemeContext } from '../../../../contexts/theme';

type Props = {
  onSubmit: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  repeatPasswordDoesNotMatch?: boolean;
  goBack: () => void;
  errorMsg?: string;
};
const ChangePassword = ({ onSubmit, handleChange, goBack, repeatPasswordDoesNotMatch, errorMsg }: Props) => {
  const theme = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState({
    new_password: false,
    repeat_new_password: false,
  });

  const toggleShowPassword = (field: 'new_password' | 'repeat_new_password') => () =>
    setShowPassword((old) => ({ ...old, [field]: !old[field] }));

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await onSubmit();
    },
    [onSubmit]
  );

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-8">
        <button className="flex" style={{ color: theme.TextColor }} onClick={goBack}>
          <ArrowLeftOutlined className="mr-2" />
        </button>
        <h1 className="flex-1 text-[24px] text-center" style={{ color: theme.TextColor }}>
          Redefine Password
        </h1>
        <div className="flex"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <div className="ml-2" style={{ color: theme.InputLabelColor }}>
            New password
          </div>
          <div className="relative">
            <input
              required
              name="new_password"
              type={showPassword.new_password ? 'text' : 'password'}
              placeholder="Type your new password here"
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
              onClick={toggleShowPassword('new_password')}
            >
              {showPassword.new_password ? <EyeInvisibleFilled /> : <EyeFilled />}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="ml-2" style={{ color: theme.InputLabelColor }}>
            Repeat New password
          </div>
          <div className="relative">
            <input
              required
              name="repeat_new_password"
              type={showPassword.repeat_new_password ? 'text' : 'password'}
              placeholder="Type your new password here"
              className="font-[600] outline-none w-full p-4 style={{ color: theme.InputPlaceholderColor, backgroundColor: theme.InputBackground }} border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
              style={{
                color: theme.InputTextColor,
                backgroundColor: theme.InputBackground,
                borderColor: repeatPasswordDoesNotMatch ? 'red' : theme.InputBorderColor,
              }}
              onChange={handleChange}
            />
            <button
              className="absolute top-[calc(50%_-_14px)] right-5 text-[16px] z-[1]"
              style={{ color: theme.InputTextColor }}
              type="button"
              onClick={toggleShowPassword('repeat_new_password')}
            >
              {showPassword.repeat_new_password ? <EyeInvisibleFilled /> : <EyeFilled />}
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-6 w-full border-[2px] text-center border-[#f37575] text-[#fa4747] bg-[#ffb8b8] p-[10px] rounded-[8px]">
            <p>{errorMsg}</p>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full py-[12px] rounded-[10px] text-lg font-[600]"
          style={{ color: theme.ButtonTextColor, backgroundColor: theme.ButtonBackground }}
        >
          Change my password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
