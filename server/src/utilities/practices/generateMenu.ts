import PracticeStrings, { categoryDesc } from "../../data/PracticeStrings";
import generatePracticeString from "./generatePracticeString";
import { Menu } from "../../resolvers/MenuResolver";

const generateMenu: { (): [Menu] } = () => {
  const menu: [Menu] = [{ type: "", name: "", description: "" }];
  const categories = Object.keys(PracticeStrings);
  categories.forEach((category) => {
    menu.push({
      type: "category",
      name: category,
      description: categoryDesc[category],
    });
    const categoryObject = PracticeStrings[category];
    Object.keys(categoryObject).forEach((practice) => {
      menu.push({
        type: "practice",
        name: practice,
        description: categoryObject[practice].desc,
        overview: generatePracticeString(`${category}+${practice}`, 11) + "...",
      });
    });
  });

  menu.shift();
  return menu;
};

const MenuArray = generateMenu();

export default MenuArray;
