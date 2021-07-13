import mainPositions from "./mainPositions";
import englishWords from "./englishWords";
import coding from "./coding";
import { PracticeCategory } from "../../types";

const practices: {
  [key in string]: { description: string; items: PracticeCategory[] };
} = {
  "main positions": {
    description: "Practice major 10 finger typing positions...",
    items: mainPositions,
  },
  english: {
    description: "Practice typing most popular English words...",
    items: englishWords,
  },
  coding: {
    description:
      "Learn to code and practice typing popular programming languages.",
    items: coding,
  },
};

export default practices;
