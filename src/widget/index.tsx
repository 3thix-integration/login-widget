import { useState } from 'react';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import './style.css';

type Props = {
  callback: (token: string) => void;
  url: string;
};

enum Page {
  SignIn = 1,
  SignUp,
}

const Widget = ({ callback, url }: Props) => {
  const [page, setPage] = useState<Page>(Page.SignIn);

  return (
    <div className="card">
      {page === Page.SignIn && (
        <>
          <SignIn callback={callback} url={url} />
          <button className="text-[#9190c2] mt-6 text-center w-full underline" onClick={() => setPage(Page.SignUp)}>
            create a new account
          </button>
        </>
      )}
      {page === Page.SignUp && (
        <>
          <SignUp success={() => setPage(Page.SignIn)} url={url} />
          <button className="text-[#9190c2] mt-6 text-center w-full underline" onClick={() => setPage(Page.SignIn)}>
            sign in with an existing account
          </button>
        </>
      )}
    </div>
  );
};

export default Widget;
