import { keyboardMap } from "../../types/";
import jsonUs from "./keymap_us.json";

export const us = jsonUs as keyboardMap;

export default { us } as { [key in string]: keyboardMap };
