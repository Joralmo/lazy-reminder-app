<style scoped lang="scss"></style>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-container>
        <v-row justify="center">
          <h3>{{ $t("nextBreak") }}</h3>
        </v-row>
        <v-row justify="center">
          <h2>14 minutos 2 segundos</h2>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {},
});
</script>
