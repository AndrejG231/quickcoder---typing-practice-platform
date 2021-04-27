import { field, action } from "../../types/types_redux/animationsT";

const animateOut = (field: field): action => {
  return {
    type: "animeOut",
    field: field,
  };
};

export default animateOut;
