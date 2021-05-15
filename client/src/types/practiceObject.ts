import characterScheme from "./schemeCharacters";

type practiceObject = {
  index: number;
  string: string;
  id: number;
  last_error: characterScheme;
  errors: { [key in string]: string };
  errors_count: number;
  is_active: boolean;
  is_finished: boolean;
  start_time: number;
};

export default practiceObject;
