import characterScheme from "./schemeCharacters";

type practiceObject = {
  index: number;
  string: string;
  id: number;
  last_error: characterScheme;
  category: string;
  practice_index: number;
  errors: { [key in string]: string };
  is_active: boolean;
  is_finished: boolean;
  start_time: number;
  time_spent: number;
};

export default practiceObject;
