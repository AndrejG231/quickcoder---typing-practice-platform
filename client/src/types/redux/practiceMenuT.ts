export type practiceMenuStateObjectT = {
  categoriesDisplay: {
    [key in string]: boolean;
  };
};

export const menuStateObject: practiceMenuStateObjectT = {
  categoriesDisplay: { "": false },
};

export type practiceMenuReducerT = {
  (
    state: practiceMenuStateObjectT,
    action: categoryActionObjectT
  ): practiceMenuStateObjectT;
};

export type categoryActionObjectT = {
  type: string;
  categoryName: string;
};

export type categoryActionT = {
  (category: string): categoryActionObjectT;
};
