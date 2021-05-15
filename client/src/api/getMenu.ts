import { api } from "../static";
import { practiceMenu } from "../types/";

const userInfoQuery = `
  query getMenu {
    getMenu {
      category
      description
      items {
        name
        description
        overview
        index
      }
    }
  } 
`;

type getMenuQueryOptions = {
  onSuccess: (menu: practiceMenu) => void;
  onError: () => void;
};

const getMenu = async ({ onSuccess, onError }: getMenuQueryOptions) => {
  try {
    const data = await api.post("", {
      query: userInfoQuery,
    });

    const result: practiceMenu = data.data.data.getMenu;

    if (result.length > 0) {
      onSuccess(result);
    } else {
      onError();
    }
  } catch (error) {
    onError();
  }
};

export default getMenu;
