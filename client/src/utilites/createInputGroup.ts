import { inputDataT } from "../types/InputDataT";

const createInputGroup = (keys: string[]) => {
  const inputGroup: inputDataT = {};

  for (const key of keys) {
    inputGroup[key] = { value: "", error: "" };
  }

  return inputGroup;
};

export default createInputGroup;
