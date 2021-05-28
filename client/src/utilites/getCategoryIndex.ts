import { practiceMenu } from "../types/types_redux/practiceMenuT";

const getCategoryIndex = (
  category: string,
  menu: practiceMenu
): number | null => {
  if (!menu) {
    return null;
  }

  for (let i = 0; i < menu.length; i++) {
    if (menu[i].category === category) {
      return i;
    }
  }

  return null;
};

export default getCategoryIndex;
