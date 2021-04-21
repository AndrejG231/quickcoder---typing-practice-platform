export type MenuItemT = {
  type: string;

  name: string;

  category: string;

  description: string;

  overview?: string;

  userScore?: number;

  userPlayLength?: number;
};

export type MenuResponse = {
  hasMore?: boolean;

  item?: MenuItemT;

  error?: string;
};

export type practiceMenuStateObjectT = {
  categoriesDisplay: {
    [key in string]: boolean;
  };
  practiceData: MenuItemT[];
  index: number;
};

export const menuStateObject: practiceMenuStateObjectT = {
  categoriesDisplay: { "": false },
  practiceData: [],
  index: 0,
};

export type practiceMenuReducerT = {
  (
    state: practiceMenuStateObjectT,
    action: categoryActionObjectT | addMenuItemObjectT | addIndexActionObjectT
  ): practiceMenuStateObjectT;
};

export type categoryActionObjectT = {
  type: "categories/setTrue" | "categories/toggle";
  categoryName: string;
};

export type addMenuItemObjectT = {
  type: "items/add";
  menuItem: MenuItemT;
};

export type addMenuItemActionT = {
  (item: MenuItemT): addMenuItemObjectT;
};

export type categoryActionT = {
  (category: string): categoryActionObjectT;
};

export type addIndexActionObjectT = {
  type: "index/add";
};

export type addIndexActionT = {
  (): addIndexActionObjectT;
};

