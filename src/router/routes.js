import { HomeView, SuccessfulExchange } from "@/views";

export default [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/success-exchange",
    name: "SuccessfulExchange",
    component: SuccessfulExchange,
    props: true,
  },
];
