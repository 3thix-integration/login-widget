import { useEffect, useRef, useState } from 'react';

import { client } from './clients';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { defaultTheme, ThemeContext, ThemeProps } from './contexts/theme';
import { deleteTokenFromURL, getTokenFromURL } from './utils';

import './style.css';

type Props = {
  callback: (token: string) => void;
  url: string;
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
}

let token = getTokenFromURL();

const Widget = ({ callback, url, style }: Props) => {
  const [theme, setTheme] = useState<ThemeProps>(defaultTheme);
  const [page, setPage] = useState<Page>(Page.SignIn);
  const apiRef = useRef(client(url, window.location.href));

  useEffect(() => {
    if (token) {
      callback(token);
      token = null;
      deleteTokenFromURL();
    }
  }, [callback]);

  useEffect(() => {
    if (style) {
      if (style.BackgroundColor) document.body.style.backgroundColor = style.BackgroundColor;
      setTheme((old) => ({ ...old, ...style }));
    }
  }, [style]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className="card" style={{ backgroundColor: theme.CardBackground }}>
        {page === Page.SignIn && (
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
        )}
        {page === Page.SignUp && (
          <>
            <SignUp callback={callback} api={apiRef.current} />
            <button
              className="mt-6 w-full py-[12px] rounded-[10px] text-lg font-[600] border-2"
              style={{ borderColor: theme.ButtonBackground, color: theme.ButtonBackground }}
              onClick={() => setPage(Page.SignIn)}
            >
              Sign in with an existing account
            </button>
          </>
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default Widget;
