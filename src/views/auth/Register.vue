<template>
  <div class="register">
    <form @submit.prevent="validate">
      <md-card class="form-card">
        <md-field>
          <label for="name">Name</label>
          <md-input name="name" type="text" v-model="form.name"></md-input>
        </md-field>
        <md-field>
          <label for="email">Email</label>
          <md-input name="email" type="email" v-model="form.email"></md-input>
        </md-field>
        <md-field>
          <label for="password">Password</label>
          <md-input name="password" type="password" v-model="form.password"></md-input>
        </md-field>
        <md-field>
          <label for="password2">Confirm Password</label>
          <md-input name="password2" type="password" v-model="form.password2"></md-input>
        </md-field>
        <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  mixins: [validationMixin],
  data() {
    return {
      sending: false,
      form: {
        name: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(100)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      password2: {
        required,
        sameAs: sameAs("password")
      }
    }
  },
  methods: {
    validate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.register();
      }
    },
    register() {
      this.$store.dispatch("users/register", this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  @include page;
}
</style>