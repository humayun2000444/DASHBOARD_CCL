import { createContext, useContext, useReducer } from "react";
import { cclReducer } from "./reducer/cclReducer";
import { initialState } from "./reducer/initialState";

export const CCLContext = createContext(initialState);
export const CCLContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cclReducer, initialState);
  const values = {
    dispatch,
    sidebarTitle: state.sidebarTitle,
  };
  return <CCLContext.Provider value={values}>{children}</CCLContext.Provider>;
};

export const useCCLContext = () => useContext(CCLContext);
