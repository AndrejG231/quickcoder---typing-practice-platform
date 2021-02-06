interface getCookieValue {
  (stringOfCookies: string, cookieName: string): string | null;
}
const getCookieValue: getCookieValue = (stringOfCookies, cookieName) => {
  const startIndex = stringOfCookies.match(cookieName)?.index;

  if (typeof startIndex !== 'number') {
    return null;
  }

  let cookie = stringOfCookies.slice(
    startIndex + cookieName.length + 1,
    stringOfCookies.length
  );

  const endIndex = cookie.match(';')?.index;
  
  if (endIndex){
    return cookie.slice(0, endIndex)
  }

  return cookie;
};

export default getCookieValue;
