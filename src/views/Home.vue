<style scoped lang="scss"></style>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-container>
        <v-row justify="center">
          <h3>{{ $t("nextBreak") }}</h3>
        </v-row>
        <v-row justify="center">
          <h2>{{ date }}</h2>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { LocalStorage } from "@/electron/store";
import moment from "moment";
import { defaultLocale } from "@/i18n";
const { Store }: { Store: LocalStorage } = window.electronTools;

export default Vue.extend({
  name: "Home",
  components: {},
  data: () => ({
    interval: 0,
    date: "",
  }),
  mounted: function () {
    moment.locale(defaultLocale);
    this.getDate();
  },
  methods: {
    getDate: function () {
      this.interval = window.setInterval(() => {
        const nextDate = Store.get("nextDate") as number;
        this.date = moment(nextDate).fromNow();
      }, 1000);
    },
  },
  destroyed: function () {
    clearInterval(this.interval);
  },
});
</script>
