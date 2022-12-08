import { useRoute } from "vue-router/composables";

export function urlQueryCreator(params) {
  const { path } = useRoute();

  history.pushState(
    {},
    null,
    path +
      "?" +
      Object.keys(params)
        .map((key) => {
          return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        })
        .join("&")
  );
}

export function getUrlQuery() {
  const { query: urlQuery } = useRoute();
  const query = Object.entries(urlQuery);

  if (query.length === 0) {
    return;
  }

  return query;
}

export const roundAmount = (num) => {
  return +num.toFixed(3).toString();
};
