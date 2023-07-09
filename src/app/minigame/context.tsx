"use client";

import iconStyles from "./icons.module.scss";
import { ReactNode, Context, createContext, useContext } from "react";
import { useImmer, Updater } from "use-immer";

export const GlobalVariableContext = createContext({
  blockSize: 44,
  gapX: 3.5,
  gapY: 3.0,
  startX: 7.5,
  startY: 9.0,
  validPositions: [
    { row: 4, col: 4 },
    { row: 4, col: 3 },
    { row: 4, col: 2 },
    { row: 4, col: 1 },
    { row: 4, col: 0 },
    { row: 3, col: 0 },
    { row: 2, col: 0 },
    { row: 1, col: 1 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 0, col: 4 },
    { row: 1, col: 4 },
    { row: 3, col: 4 },
  ],
});

interface ItemI {
  weight: number;
  className: string;
}

export const ItemsContext: Context<[ItemI[], Updater<ItemI[]>]> = createContext(
  [[] as ItemI[], null as unknown as Updater<ItemI[]>]
);

function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, updateItems] = useImmer([
    { weight: 11, className: iconStyles.diamond_x100_5000 },
    { weight: 58, className: iconStyles.diamond_x500 },
    { weight: 75, className: iconStyles.emerald_x150 },
    { weight: 90, className: iconStyles.emerald_x30_1500 },
    { weight: 23, className: iconStyles.white_feather_x1 },
    { weight: 99, className: iconStyles.white_feather_x1_3 },
    { weight: 45, className: iconStyles.purple_feather_x1 },
    { weight: 14, className: iconStyles.green_feather_x1 },
    { weight: 42, className: iconStyles.wind_stone_x1000 },
    { weight: 87, className: iconStyles.earth_stone_x1000 },
    { weight: 77, className: iconStyles.fire_stone_x1000 },
    { weight: 17, className: iconStyles.water_stone_x1000 },
    { weight: 34, className: iconStyles.event_dice_x1 },
  ]);

  return (
    <ItemsContext.Provider value={[items, updateItems]}>
      {children}
    </ItemsContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const globalVarContext = useContext(GlobalVariableContext);

  return (
    <GlobalVariableContext.Provider value={globalVarContext}>
      <ItemsProvider>{children}</ItemsProvider>
    </GlobalVariableContext.Provider>
  );
}
