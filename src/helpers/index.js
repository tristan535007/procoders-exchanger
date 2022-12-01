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
