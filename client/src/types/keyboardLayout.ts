import { schemeCharacters } from ".";

type keyboardLayout = {
  r1: ({
    char: schemeCharacters;
    ratio?: undefined;
  } | {
    char: schemeCharacters;
    ratio: number;
  })[];
  r2: ({
    char: schemeCharacters;
    ratio: number;
  } | {
    char: schemeCharacters;
    ratio?: undefined;
  })[];
  r3: ({
    char: schemeCharacters;
    ratio: number;
  } | {
    char: schemeCharacters;
    ratio?: undefined;
  })[];
  r4: ({
    char: schemeCharacters;
    ratio: number;
  } | {
    char: schemeCharacters;
    ratio?: undefined;
  })[];
}

export default keyboardLayout;