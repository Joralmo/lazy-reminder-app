import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import es from "vuetify/src/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#ff6347",
        secondary: "#e54e77",
        accent: "#b15394",
        error: "#735895",
        info: "#40547c",
        success: "#2f4858",
        warning: "#FFC107",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
