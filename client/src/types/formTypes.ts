export type inputDataT = {
  [key in string]: {
    value: string;
    type: string;
  };
};

export type formErrorT = {
  field: string;
  value: string;
};
