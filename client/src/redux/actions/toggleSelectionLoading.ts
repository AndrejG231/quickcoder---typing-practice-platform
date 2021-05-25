import { action } from "../../types/types_redux/practiceSelectionT";

const toggleSelectionLoading = (toggle: boolean): action => ({
  type: "practiceSelect/setLoading",
  toggle,
});

export default toggleSelectionLoading;
