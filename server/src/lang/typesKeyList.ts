import messages from "./Messages";

const messageKeys = Object.keys(messages["en"]);

type keyList = typeof messageKeys[number];

export default keyList;
