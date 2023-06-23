<template>
  <v-select 
    v-model="itemSelected"
    :label="$vuetify.lang.t('$vuetify.month')"
    :items="listItem"
    :multiple="multiple"
    :return-object="returnObject"
    hide-details="auto"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip small v-if="index === 0">
        <span>{{ item.text }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >
        (+{{ itemSelected.length - 1 }} {{ $vuetify.lang.t('$vuetify.others') }})
      </span>
    </template>
  </v-select>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: {
    value: {
      type: [ Object, Number, String, Array ],
      default: null
    },
    errorMessages: {
      type: Array,
      default: function() {
        return []
      }
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },

  components: {
    
  },

  data() {
    return {
      loading: false,
      items: []
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'periodacademic', ['periodYears',]),
    ...mapState( 'profiles', ['selectedAcademicYear']),
    ...mapGetters( 'global', ['getErrorMessage']),
    ...mapGetters( 'periodacademic', ['getListMonths']),
    monthsInYear(){
      return [
        this.$vuetify.lang.t('$vuetify.months_in_year.jan'),
        this.$vuetify.lang.t('$vuetify.months_in_year.feb'),
        this.$vuetify.lang.t('$vuetify.months_in_year.mar'),
        this.$vuetify.lang.t('$vuetify.months_in_year.apr'),
        this.$vuetify.lang.t('$vuetify.months_in_year.may'),
        this.$vuetify.lang.t('$vuetify.months_in_year.jun'),
        this.$vuetify.lang.t('$vuetify.months_in_year.jul'),
        this.$vuetify.lang.t('$vuetify.months_in_year.aug'),
        this.$vuetify.lang.t('$vuetify.months_in_year.sep'),
        this.$vuetify.lang.t('$vuetify.months_in_year.oct'),
        this.$vuetify.lang.t('$vuetify.months_in_year.nov'),
        this.$vuetify.lang.t('$vuetify.months_in_year.dec'),
      ]
    },
    listItem(){
      let _vue = this
      return this.getListMonths(this.selectedAcademicYear).map( function(list){
        if(list.header)
          return list
        else
          return {
            value: list.year+'-'+(list.month+1).toString().padStart(2,"0"), month: list.month, year: list.year, text: _vue.monthsInYear[list.month]
          }
      })
    },
    itemSelected: {
      get(){ return this.value },
      set(val) { this.$emit('input', val)}
    }
  },

  watch: {},

  created(){},

  methods: {}
}
</script>

<style>

</style>