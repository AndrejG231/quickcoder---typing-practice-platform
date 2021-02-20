import PracticeStrings, {
  PracticeStringsKeys,
} from "../../data/PracticeStrings";

interface generatePracticeStringT {
  (name: PracticeStringsKeys, length: number): string;
}

const generatePracticeString: generatePracticeStringT = (name, length) => {
  let finalString = "";
  while (finalString.length < length) {
    finalString +=
      PracticeStrings[name][Math.floor(Math.random() * PracticeStrings[name].length)] + " ";
  }

  return finalString.slice(0, length);
};

export default generatePracticeString;
