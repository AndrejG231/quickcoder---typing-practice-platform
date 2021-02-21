import PracticeStrings from "../../data/PracticeStrings";

interface generatePracticeStringT {
  (name: string, length: number): string;
}

const generatePracticeString: generatePracticeStringT = (name, length) => {
  let finalString = "";
  while (finalString.length < length) {
    finalString +=
      PracticeStrings[name]["parts"][
        Math.floor(Math.random() * PracticeStrings[name]["parts"].length)
      ].trim() + " ";
  }

  return finalString.slice(0, length);
};

export default generatePracticeString;
