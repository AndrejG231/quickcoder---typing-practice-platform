import layouts from "../static/layouts";
import keymaps from "../static/keymaps";
import { schemeCharacters } from "../types";

const useNextColors = (layout: string, next: schemeCharacters) => {
  let nextColors: string[] = [];

  for (const row of Object.values(layouts[layout])) {
    for (const element of row) {
      if (keymaps[layout][next].indexOf(element.char) > -1) {
        nextColors.push(element.finger);
      }
    }
  }

  return nextColors;
};

export default useNextColors;
