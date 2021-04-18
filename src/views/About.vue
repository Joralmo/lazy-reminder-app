<style scoped lang="scss">
b {
  color: var(--v-primary-base);
}
</style>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-container>
        <v-row justify="center">
          <h3>{{ $t("madeBy") }} <b>JoralmoPro</b></h3>
        </v-row>
        <v-row justify="center">
          <v-icon>mdi-linkedin</v-icon>
          <!-- https://www.linkedin.com/in/joralmopro/ -->
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "About",
  components: {},
});
</script>
