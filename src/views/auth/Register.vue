<template>
  <div class="register">
    <form @submit.prevent="validateForm(register)">
      <md-card class="form-card">
        <md-field :class="getValidationClass('name')">
          <label for="name">Name</label>
          <md-input name="name" type="text" v-model="form.name"></md-input>
          <span class="md-error" v-if="!$v.form.name.required"
            >Name is required</span
          >
        </md-field>
        <md-field :class="getValidationClass('email')">
          <label for="email">Email</label>
          <md-input name="email" type="email" v-model="form.email"></md-input>
          <span
            class="md-error"
            v-if="!$v.form.email.required || !$v.form.email.email"
            >{{
              !$v.form.email.email ? "Must be valid email" : "Email is required"
            }}</span
          >
        </md-field>
        <md-field :class="getValidationClass('password')">
          <label for="password">Password</label>
          <md-input
            name="password"
            type="password"
            v-model="form.password"
          ></md-input>
          <span class="md-error" v-if="!$v.form.password.required"
            >Password is required</span
          >
        </md-field>
        <md-field :class="getValidationClass('password2')">
          <label for="password2">Confirm Password</label>
          <md-input
            name="password2"
            type="password"
            v-model="form.password2"
          ></md-input>
          <span class="md-error" v-if="!$v.form.password2.required"
            >Confirm Password is required</span
          >
        </md-field>
        <md-button type="submit" class="md-primary" :disabled="sending"
          >Register</md-button
        >
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
  sameAs,
} from "vuelidate/lib/validators";
import validationMethods from "@/mixins/validationMethods";

export default {
  name: "Register",
  mixins: [validationMixin, validationMethods],
  data() {
    return {
      sending: false,
      form: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(100),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      password2: {
        required,
        sameAs: sameAs("password"),
      },
    },
  },
  methods: {
    register() {
      this.$store.dispatch("users/register", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  @include page;
}
</style>
