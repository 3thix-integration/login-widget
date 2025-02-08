import { AppleFilled } from '@ant-design/icons';

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
        <svg
          className="mr-2 h-[18px]"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1690_1926)">
            <path
              d="M24.266 12.2764C24.266 11.4607 24.1999 10.6406 24.0588 9.83807H12.74V14.4591H19.2217C18.9528 15.9494 18.0885 17.2678 16.823 18.1056V21.1039H20.69C22.9608 19.0139 24.266 15.9274 24.266 12.2764Z"
              fill="#4285F4"
            />
            <path
              d="M12.7401 24.0008C15.9766 24.0008 18.7059 22.9382 20.6945 21.1039L16.8276 18.1055C15.7517 18.8375 14.3627 19.252 12.7445 19.252C9.61388 19.252 6.95946 17.1399 6.00705 14.3003H2.0166V17.3912C4.05371 21.4434 8.2029 24.0008 12.7401 24.0008Z"
              fill="#34A853"
            />
            <path
              d="M6.00253 14.3003C5.49987 12.8099 5.49987 11.1961 6.00253 9.70575V6.61481H2.01649C0.31449 10.0056 0.31449 14.0004 2.01649 17.3912L6.00253 14.3003Z"
              fill="#FBBC04"
            />
            <path
              d="M12.7401 4.74966C14.4509 4.7232 16.1044 5.36697 17.3434 6.54867L20.7695 3.12262C18.6001 1.0855 15.7208 -0.034466 12.7401 0.000808666C8.2029 0.000808666 4.05371 2.55822 2.0166 6.61481L6.00264 9.70575C6.95064 6.86173 9.60947 4.74966 12.7401 4.74966Z"
              fill="#EA4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_1690_1926">
              <rect width="24" height="24" fill="white" transform="translate(0.5)" />
            </clipPath>
          </defs>
        </svg>
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
