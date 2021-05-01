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
  main_positions: "Practice major 10 finger typing positions...",
  english: "Practice by typing most popular English words...",
};

const PracticeStrings: PracticeStringsObject = {
  //Basics
  main_positions: {
    basic_home_row_1: {
      desc: "Main finger positions in Home Row",
      parts: ["fjf", "jfj", "ffj", "jff", "fjj", "jff", "fff", "jjj"],
    },
    basic_home_row_2: {
      desc: "Main finger positions in Home Row",
      parts: ["dkd", "kdk", "ddk", "kdd", "dkk", "kdd", "ddd", "kkk"],
    },
    basic_home_row_3: {
      desc: "Main finger positions in Home Row",
      parts: ["sls", "lsl", "ssl", "lss", "sll", "lss", "sss", "lll"],
    },
    basic_home_row_4: {
      desc: "Main finger positions in Home Row",
      parts: ["a;a", ";a;", "aa;", ";aa", "a;;", ";aa", "aaa", ";;;"],
    },
    basic_upper_row_1: {
      desc: "Main finger positions in Upper Row",
      parts: ["qpq", "pqp", "qqp", "pqq", "qpp", "pqq", "qqq", "ppp"],
    },
    basic_upper_row_2: {
      desc: "Main finger positions in Upper Row",
      parts: ["wow", "owo", "wwo", "oww", "woo", "oww", "www", "ooo"],
    },
    basic_upper_row_3: {
      desc: "Main finger positions in Upper Row",
      parts: ["eie", "iei", "eei", "iee", "eii", "iee", "eee", "iii"],
    },
    basic_upper_row_4: {
      desc: "Main finger positions in Upper Row",
      parts: ["rur", "uru", "rru", "urr", "ruu", "urr", "rrr", "uuu"],
    },
    basic_upper_row_5: {
      desc: "Main finger positions in Upper Row",
      parts: ["tyt", "yty", "tty", "ytt", "tyy", "ytt", "ttt", "yyy"],
    },
    basic_lower_row_1: {
      desc: "Main finger positions in Lower Row",
      parts: ["vmv", "mvm", "vvm", "mvv", "vmm", "mvv", "vvv", "mmm"],
    },
    basic_lower_row_2: {
      desc: "Main finger positions in Lower Row",
      parts: [",c,", "c,c", ",,c", "c,,", ",cc", "c,,", ",,,", "ccc"],
    },
    basic_lower_row_3: {
      desc: "Main finger positions in Lower Row",
      parts: ["x.x", ".x.", "xx.", ".xx", "x..", ".xx", "xff", "..."],
    },
    basic_lower_row_4: {
      desc: "Main finger positions in Lower Row",
      parts: ["z/z", "/z/", "zz/", "/zz", "z//", "/zz", "zzf", "///"],
    },
    basic_lower_row_5: {
      desc: "Main finger positions in Lower Row",
      parts: ["bjb", "nbn", "bbn", "nbb", "bnn", "nbb", "bff", "nnn"],
    },
    basic_number_row_1: {
      desc: "Main finger positions in Lower Row",
      parts: ["565", "656", "556", "655", "566", "655", "555", "666"],
    },
    basic_number_row_2: {
      desc: "Main finger positions in Lower Row",
      parts: ["474", "747", "447", "744", "477", "744", "444", "777"],
    },
    basic_number_row_3: {
      desc: "Main finger positions in Lower Row",
      parts: ["383", "838", "338", "833", "388", "833", "333", "888"],
    },
    basic_number_row_4: {
      desc: "Main finger positions in Lower Row",
      parts: ["292", "929", "229", "922", "299", "922", "222", "999"],
    },
    basic_number_row_5: {
      desc: "Main finger positions in Lower Row",
      parts: ["101", "010", "110", "011", "100", "011", "111", "000"],
    },
  },
  english: {
    top_50_english_words: {
      desc: "Practice typing 50 most popular english words.",
      parts: topWords.slice(0, 50),
    },
    top_100_english_words: {
      desc: "Practice typing 50 most popular english words.",
      parts: topWords.slice(0, 100),
    },
    top_200_english_words: {
      desc: "Practice typing 50 most popular english words.",
      parts: topWords.slice(0, 200),
    },
    top_500_english_words: {
      desc: "Practice typing 50 most popular english words.",
      parts: topWords.slice(0, 500),
    },
    top_1000_english_words: {
      desc: "Practice typing 50 most popular english words.",
      parts: topWords,
    },
  },
};

export default PracticeStrings;
