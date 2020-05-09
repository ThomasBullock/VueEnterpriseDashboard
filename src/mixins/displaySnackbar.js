import { mapActions } from "vuex";

export const displaySnackbar = {
  methods: mapActions({ displaySnackbar: "ui/displaySnackbar" }),
};
