import characterScheme from "./schemeCharacters";

type practiceObject= {
  index: number;
  string: string;
  id: number;
  lastError: characterScheme;
  errors: {[key in string]: string};
  errorsCount: number;
  isActive: boolean;
  isFinished: boolean;
  startTime: number;
};

export default practiceObject