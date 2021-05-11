import { generateResponse } from "../../utilities";
import { Practices } from "../../entities";

const deletePractice = async (practiceId: number) => {
  try {
    await Practices.delete({ id: practiceId });
    return generateResponse(true, "updatePracticeObject_practice_updated");
  } catch (error) {
    console.log(error);
    return generateResponse(false, "updatePracticeObject_practice_failed");
  }
};

export default deletePractice;
