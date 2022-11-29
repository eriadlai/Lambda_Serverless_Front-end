import React from "react";
import ReactDOM from "react-dom/client";
import store, { persistor } from "../src/redux/Campus";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
