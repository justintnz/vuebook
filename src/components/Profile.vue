<template>
  <div v-if="!!currentUser" class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.name ? currentUser.name : "" }}</strong>
        Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ stateToken.substring(0, 20) }} ...
      {{ stateToken.substr(stateToken.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Name:</strong>
      {{ currentUser.name ? currentUser.name : "" }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters({
      currentUser: "auth/stateUser",
      stateToken: "auth/stateToken",
    }),
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>