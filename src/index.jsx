import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MetaMaskProvider } from "@metamask/sdk-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const easClient = new ApolloClient({
  uri: "https://sepolia.easscan.org/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Shlinger",
          url: window.location.host,
        },
      }}
    >
      <ApolloProvider client={easClient}>
        <App />
      </ApolloProvider>
    </MetaMaskProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
