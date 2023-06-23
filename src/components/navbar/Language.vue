<template>
  <v-menu
    offset-y
    origin="center center"
    class="elelvation-1"
    transition="scroll-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon slot="activator" v-on="on">
        <span> {{ localeText }} </span>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="subtitle-2">
            {{ $vuetify.lang.t('$vuetify.translate') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item-group v-model="selectedLang">
        <v-list-item
          @click="handleChangeLocale(item)"
          v-for="item in availableLanguages"
          :key="item.value"
          :value="item.value"
        >
          <v-list-item-title v-text="item.text" />
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app', ['language']),
    availableLanguages() {
      const { locales } = this.$vuetify.lang
      return Object.keys(locales).map((lang) => {
        return {
          text: locales[lang].label,
          value: lang
        }
      })
    },
    localeText() {
      const find = this.availableLanguages.find(
        (item) => item.value === this.$vuetify.lang.current
      )
      return find.value
    },
    selectedLang: {
      get: function(){
        return this.language
      },
      set: function(value){
        this.$store.commit('app/setLanguage', value)
      }
    }
  },
  methods: {
    handleChangeLocale({ value }) {
      this.$vuetify.lang.current = value
      this.$store.commit('app/setLanguage', value)
    },
  },
  created(){
    this.$vuetify.lang.current = this.language
  }
}
</script>

<style>

</style>