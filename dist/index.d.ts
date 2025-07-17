import * as react_jsx_runtime from 'react/jsx-runtime';

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
    callback: (props: {
        entityId: string;
        name: string;
        email: string;
        token?: string;
    }) => void;
};
declare const LoginWidget: ({ callback, target, onlySignUp, style }: Props) => react_jsx_runtime.JSX.Element;

export { LoginWidget as default };
