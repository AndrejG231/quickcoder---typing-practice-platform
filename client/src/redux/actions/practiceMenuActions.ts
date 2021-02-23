import { categoryActionT } from "../../types/redux/practiceMenuT";

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
