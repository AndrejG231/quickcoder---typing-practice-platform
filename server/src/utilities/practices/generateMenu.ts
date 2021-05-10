import practices from "../../data/practices";
import generatePracticeString from "./generatePracticeString";
import { MenuItem } from "../../types/responses/menuResponse";

const generateMenu = () => {
  const menu = [];

  for (const [name, category] of Object.entries(practices)) {
    const items: MenuItem[] = [];

    for (let i = 0; i < category.items.length; i++) {
      const practice = category.items[i];
      items.push({
        name: practice.name,
        description: practice.desc,
        overview: generatePracticeString(category, i, 15),
        index: i,
      });
    }

    menu.push({ category: name, description: category.description, items });
  }

  return menu;
};

const Menu = generateMenu();

export default Menu;
