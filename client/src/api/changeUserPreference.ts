import { api } from "../static";

const changeUserPreferenceMutation = `
  mutation changeUserPreference($field:String!, $value:String, $toggleTo: Boolean){
  changePreference(toggleTo: $toggleTo, value: $value, field:$field){
    success
    info
    message
  }
}
`;

type changeUserPreferenceOptions = {
  onSuccess: () => void;
  onError: () => void;
  field: string;
  value: string | boolean;
};

const changeUserPreference = async ({
  onSuccess,
  onError,
  field,
  value,
}: changeUserPreferenceOptions) => {
  try {
    const result = await api.post("", {
      query: changeUserPreferenceMutation,
      variables:
        typeof value === "string"
          ? { field, value }
          : { field, toggleTo: value },
    });

    console.log(result);

    const data = result.data?.data?.changePreference;

    if (data?.success) {
      return onSuccess();
    }

    return onError();
  } catch (error) {
    return onError();
  }
};

export default changeUserPreference;
