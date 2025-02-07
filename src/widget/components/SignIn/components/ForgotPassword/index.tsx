import { useCallback, useContext } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';

import { ThemeContext } from '../../../../contexts/theme';

type Props = {
  onSubmit: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  goBack: () => void;
  errorMsg?: string;
};
const ForgotPassword = ({ onSubmit, handleChange, goBack, errorMsg }: Props) => {
  const theme = useContext(ThemeContext);

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
            E-mail
          </div>
          <input
            required
            name="email"
            type="email"
            placeholder="Type your email here"
            className="font-[600] outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
            style={{
              color: theme.InputTextColor,
              backgroundColor: theme.InputBackground,
              borderColor: theme.InputBorderColor,
            }}
            onChange={handleChange}
          />
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
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
