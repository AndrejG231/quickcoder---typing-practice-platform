import mainPositions from "./mainPositions";
import englishWords from "./englishWords";
import { practiceCategory } from "../../types";

const practices: {
  [key in string]: { description: string; items: practiceCategory[] };
} = {
  "main positions": {
    description: "Practice major 10 finger typing positions...",
    items: mainPositions,
  },
  english: {
    description: "Practice typing most popular English words...",
    items: englishWords,
  },
};

export default practices;
