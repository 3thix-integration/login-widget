import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { client } from './clients';
import { SuccessUserMe } from './clients/types';
import AcceptTerms from './components/AcceptTerms';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { defaultTheme, ThemeContext, ThemeProps } from './contexts/theme';
import { deleteTokenFromURL, getTokenFromURL } from './utils';

import './style.css';

type Props = {
  callback: (token: string) => void;
  url: string;
  onlySignUp?: boolean;
  style?: {
    TextColor?: string;
    LinkColor?: string;
    CardBackground?: string;
    ButtonBackground?: string;
    ButtonTextColor?: string;
    InputLabelColor?: string;
    InputBorderColor?: string;
    InputTextColor?: string;
    InputBackground?: string;
    BackgroundColor?: string;
  };
};

enum Page {
  SignIn = 1,
  SignUp,
  AcceptTerms,
}

const token = getTokenFromURL();

const Widget = ({ onlySignUp, callback, url, style }: Props) => {
  const [theme, setTheme] = useState<ThemeProps>(defaultTheme);
  const [page, setPage] = useState<Page>(onlySignUp ? Page.SignUp : Page.SignIn);
  const apiRef = useRef(client(url, window.location.href));

  const exec = useCallback(
    async (token: string) => {
      const { data, status } = await apiRef.current.userMe(token);
      if (status !== 200) {
        return;
      }

      const success = data as SuccessUserMe;
      if (success.term_conditions_signed_at) {
        callback(token);
        deleteTokenFromURL();
        return;
      }

      setPage(Page.AcceptTerms);
    },
    [callback]
  );

  const acceptTerms = useCallback(async () => {
    if (!token) return;

    const { status } = await apiRef.current.acceptTerms(token);
    if (status === 204) {
      callback(token);
      deleteTokenFromURL();
    }
  }, [callback]);

  useEffect(() => {
    if (token) {
      const timeout = setTimeout(() => exec(token), 100);

      // avoid duplicate calls
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [exec]);

  useEffect(() => {
    if (style) {
      if (style.BackgroundColor) document.body.style.backgroundColor = style.BackgroundColor;
      setTheme((old) => ({ ...old, ...style }));
    }
  }, [style]);

  const screen = useMemo(() => {
    switch (page) {
      case Page.SignIn:
        return (
          <>
            <SignIn callback={callback} api={apiRef.current} />
            <button
              className="mt-6 w-full py-[12px] rounded-[10px] text-lg font-[600] border-2"
              style={{ borderColor: theme.ButtonBackground, color: theme.ButtonBackground }}
              onClick={() => setPage(Page.SignUp)}
            >
              Sign Up
            </button>
          </>
        );
      case Page.SignUp:
        return (
          <>
            <SignUp callback={callback} api={apiRef.current} />
            {!onlySignUp && (
              <button
                className="mt-6 w-full py-[12px] rounded-[10px] text-lg font-[600] border-2"
                style={{ borderColor: theme.ButtonBackground, color: theme.ButtonBackground }}
                onClick={() => setPage(Page.SignIn)}
              >
                Sign in with an existing account
              </button>
            )}
          </>
        );
      case Page.AcceptTerms:
        return <AcceptTerms acceptTermsCall={acceptTerms} />;
      default:
        return null;
    }
  }, [callback, onlySignUp, page, theme.ButtonBackground, acceptTerms]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className="card" style={{ backgroundColor: theme.CardBackground }}>
        {screen}
      </div>
    </ThemeContext.Provider>
  );
};

export default Widget;
