import { useCallback, useContext } from 'react';

import { ThemeContext } from '../../../../contexts/theme';

type Props = {
  onSubmit: () => Promise<void>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errorMsg?: string;
};

const VerificationPin = ({ onSubmit, handleChange, errorMsg }: Props) => {
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
      <h1 className="text-[24px] text-center" style={{ color: theme.TextColor }}>
        Authorization pin
      </h1>
      <h1 className="text-[18px] text-center" style={{ color: theme.TextColor }}>
        We sent an email with your pin
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          name="pin"
          type="text"
          placeholder="Type the PIN here"
          className="font-[600] mt-6 outline-none w-full p-4 border-2 focus:border-[#24D07E] focus:border-solid focus:border-2 rounded-[8px]"
          style={{
            color: theme.InputTextColor,
            backgroundColor: theme.InputBackground,
            borderColor: theme.InputBorderColor,
          }}
          onChange={handleChange}
        />

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
          Validate
        </button>
      </form>
    </div>
  );
};

export default VerificationPin;
