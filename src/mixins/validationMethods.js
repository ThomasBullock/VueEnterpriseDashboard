export default {
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    validateForm(successFunction) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        successFunction.call(this);
      }
    },
  },
};
