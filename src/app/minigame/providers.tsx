"use client";

import { ReactNode } from "react";
import { createContext, useContext } from "react";

export const GlobalVariableContext = createContext({
  blockSize: 44,
  gapX: 3.5,
  gapY: 3.0,
  startX: 7.5,
  startY: 9.0,
  validPositions: [
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 0, col: 4 },
    { row: 1, col: 1 },
    { row: 1, col: 4 },
    { row: 2, col: 0 },
    { row: 3, col: 0 },
    { row: 3, col: 4 },
    { row: 4, col: 0 },
    { row: 4, col: 1 },
    { row: 4, col: 2 },
    { row: 4, col: 3 },
    { row: 4, col: 4 },
  ],
});

export function Providers({ children }: { children: ReactNode }) {
  const globalVarContext = useContext(GlobalVariableContext);

  return (
    <GlobalVariableContext.Provider value={globalVarContext}>
      {children}
    </GlobalVariableContext.Provider>
  );
}
