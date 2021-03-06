import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import storeConfigure from "./redux/storeConfigure";
import "antd/dist/antd.css";

const store = storeConfigure();
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  //</React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
