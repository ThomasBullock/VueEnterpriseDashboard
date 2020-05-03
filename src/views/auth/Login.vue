<template>
  <div class="login">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="form-card">
        <md-field>
          <label for="email">Email</label>
          <md-input name="email" type="email" v-model="form.email"></md-input>
        </md-field>
        <md-field>
          <label for="password">Password</label>
          <md-input name="password" type="password" v-model="form.password"></md-input>
        </md-field>
        <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      sending: false,
      form: {
        email: "barry@barry.com",
        password: "password"
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateUser() {
      console.log("validate");
      this.$v.$touch();
      console.log(this.$v.$invalid);
      if (!this.$v.$invalid) {
        console.log("login");
        this.login();
      }
    },
    login() {
      this.$store.dispatch("users/login", this.form).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  @include page;
}
</style>
