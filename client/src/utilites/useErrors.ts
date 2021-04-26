import { useState } from "react";
import { formErrorT } from "../types/formTypes";

const useErrors = () => {
  return useState<formErrorT>({ field: "", value: "" });
};

export default useErrors;
