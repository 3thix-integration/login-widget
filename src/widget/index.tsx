import Login from '../components/Login';

import './style.css';

type Props = {
  callback: (token: string) => void;
  url: string;
};

const Widget = ({ callback, url }: Props) => {
  console.info(callback, url);
  return (
    <div className="card">
      <Login callback={callback} url={url} />
    </div>
  );
};

export default Widget;
