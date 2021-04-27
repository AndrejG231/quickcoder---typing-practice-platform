import { field, action } from "../../types/types_redux/animationsT";

const animateIn = (field: field): action => {
  return {
    type: "animeIn",
    field: field,
  };
};

export default animateIn;
