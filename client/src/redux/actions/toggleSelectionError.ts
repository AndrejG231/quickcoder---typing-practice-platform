import { action } from "../../types/types_redux/practiceSelectionT";

const toggleSelectionError = (toggle: boolean): action => {
  return {
    type: "practiceSelect/setErrors",
    toggle: toggle,
  };
};

export default toggleSelectionError;
