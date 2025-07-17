import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import LoginWidget from "./widget";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <LoginWidget
      target="SANDBOX"
      onlySignUp={false}
      callback={({ entityId, name, email, token }) =>
        alert(
          `id: ${entityId}; name: ${name}; email: ${email}; token: ${token}`
        )
      }
      style={{
        TextColor: "#F8F8F8",
        LinkColor: "#cdcfd2",
        CardBackground: "#1F2A39",
        ButtonBackground: "#78F0A0",
        ButtonTextColor: "#1F2A39",
        InputLabelColor: "#F8F8F8",
        InputTextColor: "#EEEEEE",
        InputBackground: "#4b5561",
        InputBorderColor: "#4b5561",
        BackgroundColor: "#1F2A39",
      }}
    />
  </StrictMode>
);
