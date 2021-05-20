import { schemeCharacters, fingerKeys } from ".";

type rows = "r1" | "r2" | "r3" | "r4" | "r5";

type keyboardLayout = {
  [key in rows]: (
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
};

export default keyboardLayout;
