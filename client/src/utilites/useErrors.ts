import { useState } from "react";
import { formError } from "../types/";

const useErrors = () => {
  return useState<formError>({ field: "", value: "" });
};

export default useErrors;
