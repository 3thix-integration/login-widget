type Props = {
    target: "PRODUCTION" | "SANDBOX";
    callback: (token: string) => void;
};
declare const LoginWidget: ({ callback, target }: Props) => import("react/jsx-runtime").JSX.Element;
export default LoginWidget;
