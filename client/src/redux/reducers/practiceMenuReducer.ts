import {
  practiceMenuReducerT,
  menuStateObject,
} from "../../types/redux/practiceMenuT";

export const practiceMenuReducer: practiceMenuReducerT = (
  state = menuStateObject,
  action
) => {
  switch (action.type) {
    case "categories/toggle":
      return {
        ...state,
        categoriesDisplay: {
          ...state.categoriesDisplay,
          [action.categoryName]:
            state.categoriesDisplay[action.categoryName] === true
              ? false
              : true,
        },
      };

    case "categories/setTrue":
      if (state.categoriesDisplay.hasOwnProperty(action.categoryName)) {
        return state;
      }
      return {
        ...state,
        categoriesDisplay: {
          ...state.categoriesDisplay,
          [action.categoryName]: true,
        },
      };
    case "items/add":
      return {
        ...state,
        practiceData: [...state.practiceData, action.menuItem],
      };
    case "index/add":
      return {
        ...state,
        index: ++state.index,
      };
    default:
      return state;
  }
};
