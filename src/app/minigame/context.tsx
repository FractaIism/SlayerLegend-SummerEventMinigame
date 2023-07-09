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

export interface ItemI {
  indexes: number[];
  weight: number;
  className: string;
}

export const ItemsContext: Context<[ItemI[], Updater<ItemI[]>]> = createContext(
  [[] as ItemI[], null as unknown as Updater<ItemI[]>]
);

function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, updateItems] = useImmer([
    { indexes: [9, 14], weight: 11, className: iconStyles.diamond_x100_5000 },
    { indexes: [1], weight: 58, className: iconStyles.diamond_x500 },
    { indexes: [15], weight: 75, className: iconStyles.emerald_x150 },
    { indexes: [2, 7], weight: 90, className: iconStyles.emerald_x30_1500 },
    { indexes: [10], weight: 23, className: iconStyles.white_feather_x1 },
    { indexes: [6], weight: 99, className: iconStyles.white_feather_x1_3 },
    { indexes: [12], weight: 45, className: iconStyles.purple_feather_x1 },
    { indexes: [4], weight: 14, className: iconStyles.green_feather_x1 },
    { indexes: [5], weight: 42, className: iconStyles.wind_stone_x1000 },
    { indexes: [13], weight: 87, className: iconStyles.earth_stone_x1000 },
    { indexes: [11], weight: 77, className: iconStyles.fire_stone_x1000 },
    { indexes: [3], weight: 17, className: iconStyles.water_stone_x1000 },
    { indexes: [0, 8], weight: 34, className: iconStyles.event_dice_x1 },
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
