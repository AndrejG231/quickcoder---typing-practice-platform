import practices from "../data/practices";

const generatePracticeString = (
  category: string,
  practiceIndex: number,
  length: number
): string => {
  let practiceString = "";

  while (practiceString.length < length) {
    practiceString +=
      practices[category].items[practiceIndex].parts[
        Math.floor(Math.random() * practices[category].items.length)
      ].trim() + " ";
  }

  return practiceString.slice(0, length);
};

export default generatePracticeString;
