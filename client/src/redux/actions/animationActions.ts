import { animationObjectsList } from "../../types/redux/AnimeT";

export const AnimeIn = (field: animationObjectsList) => {
  return {
    type: "animeIn",
    field: field,
  };
};

export const AnimeOut = (field: animationObjectsList) => {
  return {
    type: "animeOut",
    field: field,
  };
};
