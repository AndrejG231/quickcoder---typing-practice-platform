import keyList from "../lang/typesKeyList";
import langList from "../lang/typesLangList";
import Messages from "../lang/Messages";
import ErrorReturn from "../types/ErrorReturn"

interface genError {
  (key: keyList, lang: langList): {error: ErrorReturn};
}

const generateError: genError = (key, lang) => {
  return {
    error: {
      at: key.split('_')[0],
      info: key,
      message: Messages[lang][key],
    },
  };
};

export default generateError;
