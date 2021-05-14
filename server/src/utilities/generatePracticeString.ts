import practices from "../data/practices";

const generatePracticeString = (
  category: string,
  practiceIndex: number,
  length: number
): string => {
  let practiceString = "";

  while (practiceString.length < length) {
    const items = practices[category].items[practiceIndex].parts;

    practiceString +=
      items[Math.floor(Math.random() * items.length)].trim() + " ";
  }

  return practiceString.slice(0, length);
};

export default generatePracticeString;
