export const parseQuery = (query) => {
  let res = {};
  if (!query) return res;
  query.split('&').forEach(string => {
    let splitted = string.split('=');
    if (splitted[0] && splitted[1]) {
      res[splitted[0]] = splitted[1];
    }
  });
  return res;
};
export const stringifyQuery = (queryObj) => {
  if (!queryObj || !Object.keys(queryObj).length) return '';
  let res = [];
  Object.keys(queryObj).forEach(key => {
    if (queryObj[key]) {
      res.push(`${key}=${queryObj[key]}`)
    }
  });
  return res.length ? '?' + res.join('&') : '';
};

export const getQuery = (url) => {
  if (!url) return '';
  const splitted = url.split('?');
  return splitted[splitted.length -1];
};