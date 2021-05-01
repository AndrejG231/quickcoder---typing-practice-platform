import { practiceMenu as menu } from "../";

export type practiceMenu = menu;

export type action = {
  type: "menu/set";
  menu: practiceMenu;
};

export type reducer = {
  (state: practiceMenu | null, acrtion: action): practiceMenu | null;
};
