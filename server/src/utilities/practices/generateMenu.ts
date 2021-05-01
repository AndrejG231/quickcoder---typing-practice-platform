import PracticeStrings, { categoryDesc } from "../../data/PracticeStrings";
import generatePracticeString from "./generatePracticeString";
import { MenuItem } from "../../types/responses/MenuResponse";

const generateMenu = () => {
  const menu = [];

  for (const category of Object.keys(PracticeStrings)) {
    const description = categoryDesc[category];
    const items: MenuItem[] = [];

    for (const practiceKey of Object.keys(PracticeStrings[category])) {
      const practice = PracticeStrings[category][practiceKey];
      items.push({
        name: practiceKey,
        description: practice.desc,
        overview: generatePracticeString(`${category}+${practiceKey}`, 15),
      });
    }

    menu.push({ category, description, items });
  }

  return menu;
};

const Menu = generateMenu();

export default Menu;
