import { createStore } from "vuex";
import { auth } from "./auth.module";
import { app } from "./app.module";

const store = createStore({
  modules: {
    app,
    auth,
  },
});

export default store;
