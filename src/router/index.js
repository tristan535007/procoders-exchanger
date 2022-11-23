import Vue from "vue";
import VueRouter from "vue-router";
import { HomeView, SuccessfulExchange } from "../views";
Vue.use(VueRouter);

const routes = [
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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
