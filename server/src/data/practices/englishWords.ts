import { topEnglishWords } from "../texts";

const englishWords = [
  {
    name: "top 50 english words",
    desc: "Practice typing 50 most popular english words.",
    parts: topEnglishWords.slice(0, 50),
  },
  {
    name: "top 100 english words",
    desc: "Practice typing 100 most popular english words.",
    parts: topEnglishWords.slice(0, 100),
  },
  {
    name: "top 200 english words",
    desc: "Practice typing 200 most popular english words.",
    parts: topEnglishWords.slice(0, 200),
  },
  {
    name: "top 500 english words",
    desc: "Practice typing 500 most popular english words.",
    parts: topEnglishWords.slice(0, 500),
  },
  {
    name: "top 1000 english words",
    desc: "Practice typing 1000 most popular english words.",
    parts: topEnglishWords,
  },
];

export default englishWords;
