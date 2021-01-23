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
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <md-card class="login__with form-card">
      <img
        class="google-logo"
        src="https://i.pinimg.com/originals/d7/e1/55/d7e15567a2a05aa8899486730d656441.png"
      />
      <md-button
        type="button"
        class="md-primary"
        :disabled="sending"
        @click="loginWithGoogle"
      >Login with Google</md-button>
    </md-card>
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
        email: "",
        password: ""
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
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login();
      }
    },
    login() {
      this.$store.dispatch("users/login", this.form).then(() => {
        this.$router.push("/");
      });
    },
    loginWithGoogle() {
      this.$store.dispatch("users/loginWithGoogle").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  @include page;

  flex-direction: column;
  align-items: center;

  &__with {
    margin-top: $base-spacing;
    display: flex;
    justify-content: space-between;
  }

  .google-logo {
    width: 48px;
  }
}
</style>
