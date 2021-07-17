import { api } from "../static";

const getUnfinishedCountQuery = `
  query getUnfinishedCount {
    getUnfinishedCount
}
`;

type getUnfinishedCountOptions = {
  onSuccess: (count: number) => void;
  onError: () => void;
};

const getUnfinishedPracticesCount = async ({
  onSuccess,
  onError,
}: getUnfinishedCountOptions) => {
  try {
    const result = await api.post("", { query: getUnfinishedCountQuery });

    const count = result.data.data?.getUnfinishedCount;

    if (typeof count === "number") {
      return onSuccess(count);
    }

    onError();
  } catch (error) {
    onError()
  }
};

export default getUnfinishedPracticesCount;
