export function urlQueryCreator(params) {
  history.pushState(
    {},
    null,
    this.$route.path +
      "?" +
      Object.keys(params)
        .map((key) => {
          return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        })
        .join("&")
  );
}

export function getUrlQuery() {
  const query = Object.entries(this.$route.query);
  if (query.length === 0) {
    return;
  }

  query.forEach(([key, value]) => {
    this[key] = value;
  });
}

export const roundAmount = (num) => {
  return +num.toFixed(3).toString();
};
