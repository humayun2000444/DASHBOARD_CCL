import React, { useEffect } from "react";

import "./components/core/rippleButton/RippleButton";
import Router from "./Router";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import "./components/core/rippleButton/RippleButton";

import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import toast, { Toaster } from "react-hot-toast";
import { Notifications } from "react-push-notification";

const App = (props) => {
  return (
    <>
      <Notifications />
      <Router />
      <Toaster />
    </>
  );
};

export default App;
