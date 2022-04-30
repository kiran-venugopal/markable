import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Tracker from "@openreplay/tracker";

const tracker = new Tracker({
  projectKey: process.env.REACT_APP_OR_KEY || "",
  __DISABLE_SECURE_MODE: true,
});
tracker.start();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
reportWebVitals();


// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
serviceWorkerRegistration.register();
