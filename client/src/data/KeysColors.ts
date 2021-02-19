import { Keys, Colors } from "../types/practice/KeyBoardT";
export const ColorScheme: { [color in Colors]: string } = {
  L1: "#5b00d1",
  R1: "#5b00d1",
  L2: "#e08312",
  R2: "#e08312",
  L3: "#22c71c",
  R3: "#22c71c",
  L4: "#2c99c7",
  R4: "#1c72c7",
  SPACE: "#f8ff33",
  ERROR: "#d11100"
};

export const UsColors: { [key in Keys]: Colors } = {
  //L1
  "`": "L1",
  "1": "L1",
  TAB: "L1",
  q: "L1",
  CAPS: "L1",
  a: "L1",
  LShift: "L1",
  z: "L1",
  //L2
  "2": "L2",
  w: "L2",
  s: "L2",
  x: "L2",
  //L3
  "3": "L3",
  e: "L3",
  d: "L3",
  c: "L3",
  //L4
  "4": "L4",
  "5": "L4",
  r: "L4",
  t: "L4",
  f: "L4",
  g: "L4",
  v: "L4",
  b: "L4",
  //R1
  "0": "R1",
  "-": "R1",
  "=": "R1",
  BSpace: "R1",
  p: "R1",
  "[": "R1",
  "]": "R1",
  ";": "R1",
  "'": "R1",
  "\\": "R1",
  Enter: "R1",
  "/": "R1",
  RShift: "R1",
  //R2
  "9": "R2",
  o: "R2",
  l: "R2",
  ".": "R2",
  //R3
  "8": "R3",
  i: "R3",
  k: "R3",
  ",": "R3",
  //R4
  "6": "R4",
  "7": "R4",
  y: "R4",
  u: "R4",
  h: "R4",
  j: "R4",
  n: "R4",
  m: "R4",
  //Space
  " ": "SPACE",
};
