import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface MenuState {
  menu: number;
  selectMenu: (newMenu: number) => void;
}

export const useMenuState = create<MenuState>()(
  devtools(
    persist((set) => ({
        menu: 1,
        selectMenu: (newMenu) => set({ menu: newMenu }),
      }),
      {
        name: "menu-storage",
      },
    ),
  ),
);
