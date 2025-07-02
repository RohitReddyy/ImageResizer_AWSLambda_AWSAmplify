import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Amplify, Auth} from "aws-amplify";
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);