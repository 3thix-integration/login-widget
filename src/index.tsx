import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import LoginWidget from "./widget";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <LoginWidget
      callback={(token) => alert(`token: ${token}`)}
      target="SANDBOX"
    />
  </StrictMode>
);
