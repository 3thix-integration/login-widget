import './index.css';

type Props = {
  callback: (token: string) => void;
  url: string;
};

const Widget = ({ callback, url }: Props) => {
  console.info(callback, url);
  return <div></div>;
};

export default Widget;
