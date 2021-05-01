import { action, practiceMenu } from "../../types/types_redux/practiceMenuT";

const loadMenu = (menu: practiceMenu): action => {
  return {
    type: "menu/set",
    menu,
  };
};

export default loadMenu;
