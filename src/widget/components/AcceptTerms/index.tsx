import { useCallback, useContext } from 'react';

import { ThemeContext } from '../../contexts/theme';

type Props = {
  acceptTermsCall: () => Promise<void>;
};

const AcceptTerms = ({ acceptTermsCall }: Props) => {
  const theme = useContext(ThemeContext);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      acceptTermsCall();
    },
    [acceptTermsCall]
  );

  return (
    <div>
      <h1 className="text-[24px] mt-4 mb-4 text-center" style={{ color: theme.TextColor }}>
        Terms and conditions
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-6 text-center">
          <div className="ml-1 flex flex-row items-center gap-2" style={{ color: theme.InputLabelColor }}>
            <div className="flex">
              <input
                required
                type="checkbox"
                className="h-[18px] w-[18px]"
                style={{ accentColor: theme.ButtonBackground }}
              />
            </div>
            <div className="text-[16px]">
              I accept the{' '}
              <a
                target="_blank"
                className="underline"
                href="https://3thix.com/terms-conditions/"
                style={{ color: theme.LinkColor }}
                rel="noreferrer"
              >
                terms and conditions
              </a>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 w-full py-[12px] rounded-[10px] text-lg font-[600]"
          style={{ color: theme.ButtonTextColor, backgroundColor: theme.ButtonBackground }}
        >
          Accept terms and conditions
        </button>
      </form>
    </div>
  );
};

export default AcceptTerms;
