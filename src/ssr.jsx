import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

export function render(url) {
  const appHtml = ReactDOMServer.renderToString(
    <StrictMode url={url}>
      <StaticRouter>
        <App />
      </StaticRouter>
    </StrictMode>
  );

  return appHtml;
}
