import { useRef, useState } from 'react';

import { client } from './clients';
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
  const apiRef = useRef(client(url));

  return (
    <div className="card">
      {page === Page.SignIn && (
        <>
          <SignIn callback={callback} api={apiRef.current} />
          <button className="text-[#9190c2] mt-10 text-center w-full underline" onClick={() => setPage(Page.SignUp)}>
            create a new account
          </button>
        </>
      )}
      {page === Page.SignUp && (
        <>
          <SignUp success={() => setPage(Page.SignIn)} api={apiRef.current} />
          <button className="text-[#9190c2] mt-10 text-center w-full underline" onClick={() => setPage(Page.SignIn)}>
            sign in with an existing account
          </button>
        </>
      )}
    </div>
  );
};

export default Widget;
