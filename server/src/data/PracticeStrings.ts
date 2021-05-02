import topWords from "./topEnglishWords";

interface PracticeStringObject {
  parts: string[];
  desc: string;
}

type PracticeStringsObject = {
  [category in string]: {
    [practiceSession in string]: PracticeStringObject;
  };
};

export const categoryDesc: { [key in string]: string } = {
  "main positions": "Practice major 10 finger typing positions...",
  english: "Practice by typing most popular English words...",
};

const PracticeStrings: PracticeStringsObject = {
  //Basics
  "main positions": {
    "home row 1": {
      desc: "Main finger positions in Home Row",
      parts: ["fjf", "jfj", "ffj", "jff", "fjj", "jff", "fff", "jjj"],
    },
    "home row 2": {
      desc: "Main finger positions in Home Row",
      parts: ["dkd", "kdk", "ddk", "kdd", "dkk", "kdd", "ddd", "kkk"],
    },
    "home row 3": {
      desc: "Main finger positions in Home Row",
      parts: ["sls", "lsl", "ssl", "lss", "sll", "lss", "sss", "lll"],
    },
    "home row 4": {
      desc: "Main finger positions in Home Row",
      parts: ["a;a", ";a;", "aa;", ";aa", "a;;", ";aa", "aaa", ";;;"],
    },
    "upper row 1": {
      desc: "Main finger positions in Upper Row",
      parts: ["qpq", "pqp", "qqp", "pqq", "qpp", "pqq", "qqq", "ppp"],
    },
    "upper row 2": {
      desc: "Main finger positions in Upper Row",
      parts: ["wow", "owo", "wwo", "oww", "woo", "oww", "www", "ooo"],
    },
    "upper row 3": {
      desc: "Main finger positions in Upper Row",
      parts: ["eie", "iei", "eei", "iee", "eii", "iee", "eee", "iii"],
    },
    "upper row 4": {
      desc: "Main finger positions in Upper Row",
      parts: ["rur", "uru", "rru", "urr", "ruu", "urr", "rrr", "uuu"],
    },
    "upper row 5": {
      desc: "Main finger positions in Upper Row",
      parts: ["tyt", "yty", "tty", "ytt", "tyy", "ytt", "ttt", "yyy"],
    },
    "lower row 1": {
      desc: "Main finger positions in Lower Row",
      parts: ["vmv", "mvm", "vvm", "mvv", "vmm", "mvv", "vvv", "mmm"],
    },
    "lower row 2": {
      desc: "Main finger positions in Lower Row",
      parts: [",c,", "c,c", ",,c", "c,,", ",cc", "c,,", ",,,", "ccc"],
    },
    "lower row 3": {
      desc: "Main finger positions in Lower Row",
      parts: ["x.x", ".x.", "xx.", ".xx", "x..", ".xx", "xff", "..."],
    },
    "lower row 4": {
      desc: "Main finger positions in Lower Row",
      parts: ["z/z", "/z/", "zz/", "/zz", "z//", "/zz", "zzf", "///"],
    },
    "lower row 5": {
      desc: "Main finger positions in Lower Row",
      parts: ["bjb", "nbn", "bbn", "nbb", "bnn", "nbb", "bff", "nnn"],
    },
    "number row 1": {
      desc: "Main finger positions in Number Row",
      parts: ["565", "656", "556", "655", "566", "655", "555", "666"],
    },
    "number row 2": {
      desc: "Main finger positions in Number Row",
      parts: ["474", "747", "447", "744", "477", "744", "444", "777"],
    },
    "number row 3": {
      desc: "Main finger positions in Number Row",
      parts: ["383", "838", "338", "833", "388", "833", "333", "888"],
    },
    "number row 4": {
      desc: "Main finger positions in Number Row",
      parts: ["292", "929", "229", "922", "299", "922", "222", "999"],
    },
    "number row 5": {
      desc: "Main finger positions in Number Row",
      parts: ["101", "010", "110", "011", "100", "011", "111", "000"],
    },
  },
  english: {
    "top 50 english words": {
      desc: "Practice typing 50 most popular english words.",
      parts: topWords.slice(0, 50),
    },
    "top 100 english words": {
      desc: "Practice typing 100 most popular english words.",
      parts: topWords.slice(0, 100),
    },
    "top 200 english words": {
      desc: "Practice typing 200 most popular english words.",
      parts: topWords.slice(0, 200),
    },
    "top 500 english words": {
      desc: "Practice typing 500 most popular english words.",
      parts: topWords.slice(0, 500),
    },
    "top 1000 english words": {
      desc: "Practice typing 1000 most popular english words.",
      parts: topWords,
    },
  },
};

export default PracticeStrings;
