<template>
  <div>
    <v-card elevation="0" class="mb-2">
      <v-card-text class="px-0 pt-1">
        <v-simple-table dense class="table-border">
          <template v-slot:default>
            <thead>
              <tr v-for="(row,i) in headers" :key="i">
                <th
                  class="text-center bgblue white--text"
                  v-for="(col, j) in row.cols"
                  :key="j"
                  :colspan="col.colspan"
                  :rowspan="col.rowspan"
                  :width="col.width"
                >
                  <v-icon
                    size="18"
                    v-if="col.icon"
                    color="white"
                    class="mx-1"
                  >
                    {{ col.icon }}
                  </v-icon>{{ col.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="x in 30" :key="x">
                <td class="text-center">
                  {{ x }}.
                </td>
                <td class="text-center">
                  123000{{ x }}
                </td>
                <td class="text-center">
                  Noname {{ x }}
                </td>
                <td class="text-center">
                  {{ x%2==1? 'L':'P' }}
                </td>
                <td>
                  <v-radio-group v-model="radioGroup[x]" hide-details class="mt-0">
                    <v-radio value="H" class="ml-2" />
                  </v-radio-group>
                </td>
                <td>
                  <v-radio-group v-model="radioGroup[x]" hide-details class="mt-0">
                    <v-radio value="I" class="ml-2" />
                  </v-radio-group>
                </td>
                <td>
                  <v-radio-group v-model="radioGroup[x]" hide-details class="mt-0">
                    <v-radio value="S" class="ml-2" />
                  </v-radio-group>
                </td>
                <td>
                  <v-radio-group v-model="radioGroup[x]" hide-details class="mt-0">
                    <v-radio value="A" class="ml-2" />
                  </v-radio-group>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    
  },

  data() {
    return {
      loading: false,
      radioGroup: {}
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [ 
        {
          cols: [
            { text: 'No.', rowspan: 2, colspan: 1, width: 20  },
            { text: this.$vuetify.lang.t('$vuetify.student.nis'), rowspan: 2, colspan: 1, width: 150},
            { text: this.$vuetify.lang.t('$vuetify.student.name'), rowspan: 2, colspan: 1},
            { text: this.$vuetify.lang.t('$vuetify.personal.gender'), rowspan: 2, colspan: 1, width:90},
            { text: this.$vuetify.lang.t('$vuetify.attendence.status'), rowspan: 1 , colspan: 4},
          ]
        },
        {
          cols: [
            { icon: "mdi-fingerprint", text: this.$vuetify.lang.t('$vuetify.attendence.present'), rowspan: 1, colspan: 1, width:60},
            { icon: "mdi-email-newsletter", text: this.$vuetify.lang.t('$vuetify.attendence.permit'), rowspan: 1, colspan: 1, width:60},
            { icon: "mdi-plus-box", text: this.$vuetify.lang.t('$vuetify.attendence.sick'), rowspan: 1, colspan: 1, width:60},
            { icon: "mdi-alpha-a-box", text: this.$vuetify.lang.t('$vuetify.attendence.absence'), rowspan: 1, colspan: 1, width:60},
          ]
        },
      ]
    },
  },

  watch: {

  },

  created(){

  },

  methods: {
    get(){},
    attendAll(){},
    doEdit(){},
    doDelete(){},
    doSave(){},
    doReset(){}
  }
}
</script>

<style>

</style>