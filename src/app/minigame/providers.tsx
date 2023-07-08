"use client";

import { ReactNode } from "react";
import { createContext, useContext } from "react";

export const GlobalVariableContext = createContext({
  blockSize: 44,
  gapX: 3.5,
  gapY: 3.0,
  startX: 7.5,
  startY: 9.0,
});

export function Providers({ children }: { children: ReactNode }) {
  const globalVarContext = useContext(GlobalVariableContext);

  return (
    <GlobalVariableContext.Provider value={globalVarContext}>
      {children}
    </GlobalVariableContext.Provider>
  );
}
