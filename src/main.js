import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = "http://bot2.test/graphql";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["CX-REQUEST-TYPE"] = "GraphQL";
let auth = JSON.parse(localStorage.getItem("auth"));
if (auth && auth.access_token) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + auth.access_token;
}
import { FontAwesomeIcon } from "./plugins/font-awesome";
import "./index.css";

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
