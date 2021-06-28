<template>
  <div class="card border-0">
    <div class="card-header p-3">
      <h3>Sign In</h3>
    </div>
    <div class="card-body bg-light card-message">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="mail@gmail.com"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" />
            </div>
            <button class="btn btn-primary">Sign In</button>
            <router-link
              :to="{ name: 'views.signup' }"
              class="btn btn-success ms-2"
              >Sign Up</router-link
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>