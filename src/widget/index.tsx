import { useEffect } from "react";

type Props = {
  target: "PRODUCTION" | "SANDBOX";
  callback: (token: string) => void;
};

const productionUrl = "https://login.3thix.com/";
const sandboxUrl = "https://sandbox-login.3thix.com/";

const LoginWidget = ({ callback, target }: Props) => {
  // const url = "http://localhost:3001";
  const url = target === "PRODUCTION" ? productionUrl : sandboxUrl;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== url) return;

      if (event.data?.token) {
        callback(event.data.token);
      }
      // TODO: implement sso login from url
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [callback, url]);

  return (
    <iframe
      src={url}
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
