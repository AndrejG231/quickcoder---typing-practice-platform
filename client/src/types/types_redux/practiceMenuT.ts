import { practiceMenu } from "../";

export type action = {
  type: "menu/set";
  menu: practiceMenu;
};

export type reducer = {
  (state: practiceMenu | null, acrtion: action): practiceMenu | null;
};
