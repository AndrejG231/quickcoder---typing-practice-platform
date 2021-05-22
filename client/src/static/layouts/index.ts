import usLayout from "./layout_us.json";
import { keyboardLayout } from "../../types";

const us = usLayout as keyboardLayout;

export default { us } as { [key in string]: keyboardLayout };
