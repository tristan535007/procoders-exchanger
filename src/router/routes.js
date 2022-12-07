export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("@/views/HomeView"),
  },
  {
    path: "/success-exchange",
    name: "SuccessfulExchange",
    component: () => import("@/views/SuccessfulExchange"),
  },
];
