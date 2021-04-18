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
                <v-radio-group v-model="showBreaksIn" class="d-flex">
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
              v-model="intervalForBreaks"
              :label="$t('intervalForBreaks')"
              thumb-label="always"
              min="5"
              max="60"
            ></v-slider>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    // startWithOs: false,
    showBreaksIn: null,
    intervalForBreaks: null,
  }),
  mounted: function () {
    const {
      electronTools: { showBreaksIn, intervalForBreaks },
    } = window;
    this.showBreaksIn = showBreaksIn;
    this.intervalForBreaks = intervalForBreaks;
  },
});
</script>
