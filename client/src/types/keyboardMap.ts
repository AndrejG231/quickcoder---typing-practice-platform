import { schemeCharacters } from "./";

type keyboardMap = {
  [key in schemeCharacters]: string[]
}

export default keyboardMap;