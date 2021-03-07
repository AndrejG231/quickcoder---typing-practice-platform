import {
  categoryActionT,
  addMenuItemActionT,
  addIndexActionT,
} from "../../types/redux/PracticeMenuT";

export const toggleCategoryAction: categoryActionT = (category) => {
  return {
    type: "categories/toggle",
    categoryName: category,
  };
};

export const setTrueCategoryAction: categoryActionT = (category) => {
  return {
    type: "categories/setTrue",
    categoryName: category,
  };
};

export const addMenuItemAction: addMenuItemActionT = (item) => {
  return {
    type: "items/add",
    menuItem: item,
  };
};

export const addIndexAction: addIndexActionT = () => {
  return {
    type: "index/add",
  };
};
