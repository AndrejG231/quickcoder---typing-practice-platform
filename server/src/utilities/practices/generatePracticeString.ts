import PracticeStrings from "../../data/PracticeStrings";

interface generatePracticeStringT {
  (name: string, length: number): string;
}

const generatePracticeString: generatePracticeStringT = (name, length) => {
  const [category, practice] = name.split("+") as string[];

  const practices = PracticeStrings[category][practice].parts;

  let finalString = "";

  while (finalString.length < length) {
    finalString +=
      practices[Math.floor(Math.random() * practices.length)].trim() + " ";
  }

  return finalString.slice(0, length);
};

export default generatePracticeString;
