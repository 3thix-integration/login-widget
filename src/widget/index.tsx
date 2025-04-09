import { useEffect } from "react";
import { deleteTokenFromURL, getTokenFromURL } from "./utils";

type Props = {
  target: "PRODUCTION" | "SANDBOX";
  callback: (token: string) => void;
};

const token = getTokenFromURL();

const productionUrl = "https://login.3thix.com/";
const sandboxUrl = "https://sandbox-login.3thix.com/";

const LoginWidget = ({ callback, target }: Props) => {
  // const url = "http://localhost:3001";
  const url = target === "PRODUCTION" ? productionUrl : sandboxUrl;
  const urlWithToken = !!token ? `${url}?token=${token}` : url;

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
      src={urlWithToken}
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
