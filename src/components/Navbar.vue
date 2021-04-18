<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <span class="mr-2">Lazy Reminder</span>
    </div>

    <v-spacer></v-spacer>

    <v-btn to="/" text>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/configuration" text>
      <v-icon>mdi-settings</v-icon>
    </v-btn>

    <v-btn to="/about" text>
      <v-icon>mdi-help</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Navbar",

  data: () => ({}),
});
</script>
