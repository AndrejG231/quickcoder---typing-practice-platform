type actionResponseResult = {
  data?: {
    register: {
      success: boolean;
      action: string;
      info: string;
      message: string;
    };
  } | null;

  fetching?: boolean;
  error?: any;
};

export default actionResponseResult;
