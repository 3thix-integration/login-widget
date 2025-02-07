import { AppleFilled } from '@ant-design/icons';

import GoogleIcon from '../../assets/google-icon.svg';

type Props = {
  title: string;
  signInGoogle: () => void;
  signInApple: () => void;
};

const SSOAuth = ({ title, signInGoogle, signInApple }: Props) => {
  return (
    <div>
      <button
        className="w-full py-[12px] rounded-[10px] bg-[#fff] text-lg font-[600] text-[#333] flex justify-center items-center"
        onClick={signInGoogle}
      >
        <img src={GoogleIcon} className="mr-2 h-[18px]" />
        {title} with Google
      </button>
      <button
        className="mt-6 w-full py-[12px] rounded-[10px] bg-[#fff] text-lg font-[600] text-[#333] flex justify-center items-center"
        onClick={signInApple}
      >
        <AppleFilled className="mr-2" />
        {title} with Apple
      </button>
    </div>
  );
};

export default SSOAuth;
