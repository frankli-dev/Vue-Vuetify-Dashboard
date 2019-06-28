<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img
          src="/static/m.png"
          alt="Vue Material Admin"
          width="120"
          height="120"
        />
        <h1 class="flex my-4 primary--text">Material Admin Template</h1>
      </div>
      <v-form>
        <v-text-field
          append-icon="person"
          name="login"
          label="Login"
          type="text"
          v-model="model.username"
        ></v-text-field>
        <v-text-field
          append-icon="lock"
          name="password"
          label="Password"
          id="password"
          type="password"
          v-model="model.password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div class="login-btn">
      <v-btn block color="primary" @click="login" :loading="loading"
        >Login</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    model: {
      username: "andres@ctm.app",
      password: "L3tM31n@"
    }
  }),

  methods: {
    login() {
      this.loading = true;
      let username = this.model.username;
      let password = this.model.password;
      console.log(this.$store);
      this.$store
        .dispatch("app/login", { username, password })
        .then(() => {
          this.loading = false;
          this.$router.push("/");
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="css"></style>
