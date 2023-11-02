import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuescroll from "vuescroll";
import ElementUI from "element-ui";
// import './assets/font/iconfont.css'
import "element-ui/lib/theme-chalk/index.css";
import "./main.scss";
import { COPY } from "@/utils/directives";
import {  registerFilter } from "./utils/registerToVue";
Vue.use(ElementUI);
Vue.directive("copy", COPY);
Vue.use(vuescroll, {
    ops: {
        bar: {
            background: "#c1c1c1",
        },
    },
    name: "vuescroll",
});
registerFilter(Vue);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
