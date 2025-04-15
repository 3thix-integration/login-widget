type Props = {
    target: "PRODUCTION" | "SANDBOX";
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
    callback: (token: string) => void;
};
declare const LoginWidget: ({ callback, target, onlySignUp, style }: Props) => import("react/jsx-runtime").JSX.Element;
export default LoginWidget;
