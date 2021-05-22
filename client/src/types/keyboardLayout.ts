import { schemeCharacters, fingerKeys } from ".";

type rows = "r1" | "r2" | "r3" | "r4" | "r5";

type layoutElement = (
  | {
      finger: fingerKeys;
      char: schemeCharacters;
      ratio?: undefined;
    }
  | {
      finger: fingerKeys;
      char: schemeCharacters;
      ratio: number;
    }
)[];

type keyboardLayout = {
  [key in rows]: layoutElement;
};

export default keyboardLayout;
