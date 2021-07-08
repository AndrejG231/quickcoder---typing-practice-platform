import "styled-components";
import { theme } from "./static";

declare module "styled-components" {
  export type DefaultTheme = typeof theme;
}
