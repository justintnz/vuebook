<template>
  <div class="w-full md:w-1/2 flex flex-col">
    <div
      class="
        flex flex-col
        justify-center
        md:justify-start
        my-auto
        pt-8
        md:pt-0
        px-8
        md:px-24
        lg:px-32
      "
    >
      <Form
        @submit="handleLogin"
        :validation-schema="schema"
        class="flex flex-col pt-3 md:pt-8"
      >
        <div class="form-group flex flex-col pt-4">
          <label for="username" class="text-lg">Username</label>
          <Field
            name="username"
            type="text"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              mt-1
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
          />
          <ErrorMessage name="username" class="alert alert-error" />
        </div>
        <div class="form-group flex flex-col pt-4">
          <label for="password" class="text-lg">Password</label>
          <Field
            name="password"
            type="password"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              mt-1
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
          />
          <ErrorMessage name="password" class="alert alert-error" />
        </div>

        <div class="form-group flex flex-col pt-4">
          <button class="btn btn-primary" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-error" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
</style>