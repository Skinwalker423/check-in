import React from "react";
import ReactDOM from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import App from "./App.jsx";
import DarkModeProvider from "./context/DarkModeContext.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() =>
        window.location.replace("http://localhost:5173")
      }
    >
      <StyleSheetManager
        shouldForwardProp={shouldForwardProp}
      >
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </StyleSheetManager>
    </ErrorBoundary>
  </React.StrictMode>
);
