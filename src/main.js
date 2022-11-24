import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import uiComponents from "@/components/UI";
import "./assets/tailwind.css";

Vue.config.productionTip = false;

uiComponents.forEach((myComponent) => {
  Vue.component(myComponent.name, myComponent);
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
