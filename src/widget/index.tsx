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
              className="mt-10 text-center w-full underline"
              style={{ color: theme.LinkColor }}
              onClick={() => setPage(Page.SignUp)}
            >
              create a new account
            </button>
          </>
        )}
        {page === Page.SignUp && (
          <>
            <SignUp success={() => setPage(Page.SignIn)} api={apiRef.current} />
            <button
              className="mt-10 text-center w-full underline"
              style={{ color: theme.LinkColor }}
              onClick={() => setPage(Page.SignIn)}
            >
              sign in with an existing account
            </button>
          </>
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default Widget;
