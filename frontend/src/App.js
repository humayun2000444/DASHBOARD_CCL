import React, { useEffect } from "react";

import "./components/core/rippleButton/RippleButton";
import Router from "./Router";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import "./components/core/rippleButton/RippleButton";

import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import toast, { Toaster } from "react-hot-toast";

const App = (props) => {
  return (
    <>
      <Router />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
