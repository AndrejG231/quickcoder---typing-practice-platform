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
      return {
        ...state,
        categoriesDisplay: {
          ...state.categoriesDisplay,
          [action.categoryName]: true,
        },
      };
    default:
      return state;
  }
};
