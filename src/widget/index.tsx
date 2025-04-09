import { useEffect } from "react";
import { deleteTokenFromURL, getTokenFromURL } from "./utils";

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

const token = getTokenFromURL();

const productionUrl = "https://login.3thix.com/";
const sandboxUrl = "https://sandbox-login.3thix.com/";

const LoginWidget = ({ callback, target, onlySignUp, style }: Props) => {
  // const url = "http://localhost:3001";
  const url = target === "PRODUCTION" ? productionUrl : sandboxUrl;

  const params = new URLSearchParams();
  if (onlySignUp) params.append("onlySignUp", "true");
  if (style) params.append("style", JSON.stringify(style));
  if (token) params.append("token", token);

  const urlWithParams = `${url}?${params.toString()}`;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== url) return;

      if (event.data?.token) {
        callback(event.data.token);
        deleteTokenFromURL();
        return;
      }

      if (event.data?.ssoUrl) {
        const url = new URL(event.data.ssoUrl);
        url.searchParams.append("callbackUrl", window.location.href);
        window.location.replace(url.href);
        return;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [callback, url]);

  return (
    <iframe
      src={urlWithParams}
      title="Ethix Login"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
    />
  );
};

export default LoginWidget;
