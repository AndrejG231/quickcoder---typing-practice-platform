import { Practices } from "../../entities";
import { generateResponse } from "../../utilities/";

const getPractice = async (id: number) => {
  const practice = await Practices.findOne({ id: id });

  if (practice && practice.category !== "test") {
    return {
      result: generateResponse(true, "getPracticesObject_practice_received"),
      practice: practice,
    };
  }

  return {
    result: generateResponse(false, "getPracticesObject_practice_received"),
    practice: null,
  };
};

export default getPractice;
