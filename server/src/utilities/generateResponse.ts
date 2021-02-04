import keyList from "../lang/typesKeyList";
import langList from "../lang/typesLangList";
import Messages from "../lang/Messages";
import ActionResponse from "../types/responses/ActionResponse";

interface genError {
  (success: boolean, key: keyList, lang: langList): ActionResponse; 
}

const generateResponse: genError = (success, key, lang) => {
  return {
      success: success,
      action: key.split('_')[0],
      info: key,
      message: Messages[lang][key],
  };
};

export default generateResponse;
