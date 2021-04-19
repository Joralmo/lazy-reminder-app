<style scoped lang="scss">
.configuration {
  padding: 30px;
  display: flex;
  justify-content: center;
}
.no-margin {
  display: flex;
  align-items: center;
  .col {
    margin: 0;
    padding: 0;
  }
}
</style>

<template>
  <div class="configuration">
    <v-container>
      <!--
      <v-row class="no-margin">
        <v-col cols="10">{{ $t("iniWithSO") }}</v-col>
        <v-col cols="2"><v-switch v-model="startWithOs"></v-switch></v-col>
      </v-row>
      -->
      <v-row class="no-margin">
        <v-container>
          <v-row>
            <v-col cols="12">{{ $t("showBreaksIn") }}:</v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-container fluid>
                <v-radio-group
                  v-model="showBreaksIn"
                  class="d-flex"
                  @change="onChangeChekBoxes"
                >
                  <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="4"
                      ><v-radio :label="$t('window')" :value="1"></v-radio
                    ></v-col>
                    <v-col cols="5"
                      ><v-radio :label="$t('fullScreen')" :value="2"></v-radio
                    ></v-col>
                  </v-row>
                </v-radio-group>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row class="no-margin mt-7">
        <v-container>
          <v-row>
            <v-slider
              @change="onChangeSliderInterval"
              v-model="intervalForBreaks"
              :label="$t('intervalForBreaks')"
              thumb-label="always"
              min="5"
              max="60"
            ></v-slider>
          </v-row>
        </v-container>
      </v-row>
      <v-row class="no-margin mt-7">
        <v-container>
          <v-row>
            <v-slider
              @change="onChangeSliderBreakDuration"
              v-model="breakDuration"
              :label="$t('breakDuration')"
              thumb-label="always"
              min="5"
              max="60"
            ></v-slider>
          </v-row>
        </v-container>
      </v-row>
      <v-row class="no-margin">
        <v-container>
          <v-row>
            <v-checkbox
              @change="onChangeShowOnAllMonitors"
              v-model="showOnAllMonitors"
              :label="$t('showOnAllMonitors')"
            ></v-checkbox>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { LocalStorage } from "@/electron/store";
import Vue from "vue";
const { Store }: { Store: LocalStorage } = window.electronTools;

export default Vue.extend({
  data: () => ({
    // startWithOs: false,
    showBreaksIn: 0,
    intervalForBreaks: 0,
    breakDuration: 0,
    showOnAllMonitors: false,
  }),
  mounted: function () {
    this.showBreaksIn = Store.get("showBreaksIn") as number;
    this.intervalForBreaks = Store.get("intervalForBreaks") as number;
    this.breakDuration = Store.get("breakDuration") as number;
    this.showOnAllMonitors = Store.get("showOnAllMonitors") as boolean;
  },
  methods: {
    onChangeSliderInterval: function (value: number) {
      Store.set("intervalForBreaks", value);
    },
    onChangeChekBoxes: function (value: number) {
      Store.set("showBreaksIn", value);
    },
    onChangeSliderBreakDuration: function (value: number) {
      Store.set("breakDuration", value);
    },
    onChangeShowOnAllMonitors: function (value: number) {
      Store.set("showOnAllMonitors", value);
    },
  },
});
</script>
