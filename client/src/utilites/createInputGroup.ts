import { inputDataT } from "../types/InputDataT";

const createInputGroup = (keys: string[], types?: string[]) => {
  const inputGroup: inputDataT = {};

  for (let i = 0; i < keys.length; i++) {
    inputGroup[keys[i]] = {
      value: "",
      error: "",
      type: types ? types[i] ?? "text" : "text",
    };
  }

  return inputGroup;
};

export default createInputGroup;
