import { useEffect } from "react";

interface useAuthMutation {
  (options: {
    data: any;
    error: any;
    field: string;
    setErrors: (error: { field: string; value: string }) => void;
    onSuccess: () => void;
    onError: () => void;
  }): void;
}

const useAuthMutation: useAuthMutation = ({
  data,
  error,
  field,
  onSuccess,
  onError,
  setErrors,
}) => {
  return useEffect(() => {
    if (data) {
      if (data[field].success) {
        onSuccess();
      } else {
        const errField = data[field].info.split("_")[1];
        setErrors({ field: errField, value: data[field].message });
      }
    } else if (error) {
      onError();
    }
  }, [data, field, setErrors]);
};

export default useAuthMutation;
