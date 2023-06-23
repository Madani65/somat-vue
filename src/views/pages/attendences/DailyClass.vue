<template>
  <div>
    <v-card elevation="0" class="mb-2">
      <v-card-text class="pa-0">
        <v-simple-table
          fixed-header
          height="500px"
          dense
          class="table-border table-sticky table-striped"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="px-2 text-center bgblue white--text col-freeze" style="left:0px;min-width:50px" rowspan="2">
                  No.
                </th>
                <th class="text-center bgblue white--text col-freeze" style="left:50px;" rowspan="2">
                  {{ $vuetify.lang.t('$vuetify.student.name') }}
                </th>
                <th :colspan="getLastDate" class="text-center bgblue white--text">
                  {{ $vuetify.lang.t('$vuetify.date') }}
                </th>
                <th colspan="3" class="text-center bgblue white--text">
                  {{ $vuetify.lang.t('$vuetify.total') }}
                </th>
              </tr>
              <tr>
                <th
                  v-for="d in getLastDate"
                  :key="d"
                  :class="getBgColor(d)"
                  style="min-width:40px"
                >
                  {{ d }}
                </th>
                <th
                  v-for="(list,t) in totalList"
                  :key="t"
                  class="px-1 text-center bgblue white--text"
                  style="min-width:40px"
                >
                  <v-icon size="20" v-text="list.icon" color="white" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,i) in tableData" :key="i">
                <td class="col-freeze text-center" style="left:0px;">
                  {{ i+1 }}
                </td>
                <td class="col-freeze" style="left:50px;">
                  {{ row.name }}
                </td>
                <td v-for="(val,j) in row.attendences" :key="j" :class="(getHoliday(j+1)? getBgColor(j+1) : null)+' px-1 text-center'">
                  <v-icon v-if="!getHoliday(j+1)" v-text="getIcon(val)" :color="getIconColor(val)" />
                </td>
                <td
                  v-for="(list,t) in totalList"
                  :key="t"
                  class="px-1 text-center"
                  style="min-width:40px"
                >
                  {{ row[list.key] }}
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
  props: {
    month: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    }
  },

  components: {
    
  },

  data() {
    return {
      loading: false,
      tableData: [],
      totalList: [
        { key: 'ttl_i', icon: 'mdi-email-newsletter' },
        { key: 'ttl_s', icon: 'mdi-plus-box' },
        { key: 'ttl_a', icon: 'mdi mdi-alpha-a-box' }
      ]
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapGetters( 'global', ['getErrorMessage']),
    lastDate(){
      return new Date((new Date(this.year, this.month+1, 1)) - 1)
    },
    getLastDate(){
      return this.lastDate.getDate()
    }
  },

  watch: {

  },

  created(){
    this.initTableData()
  },

  methods: {
    getDate(d){
      return new Date(new Date(this.year, this.month, d))
    },
    getHoliday(d){
      let day = this.getDate(d).getDay()
      if( (day === 0 || day === 6) )
        return true
      else
        return false
    },
    getBgColor(d){
      if(this.getHoliday(d)) return 'px-1 bgred white--text text-center'
      else return 'px-1 bggreen white--text text-center'
    },
    getIcon(type){
      if( type == 'H' )
        return 'mdi-fingerprint'
      else if( type == 'S' )
        return 'mdi-plus-box'
      else if( type == 'I' )  
        return 'mdi-email-newsletter'
      else if( type == 'A' )
        return 'mdi-alpha-a-box'
    },
    getIconColor(type){
      if( type == 'H' )
        return 'green'
      else if( type == 'I' )
        return 'amber'
      else if( type == 'A' )
        return 'blue'
      else if( type == 'S' )
        return 'red'
    },
    initTableData() {
      let data = []
      for (let i = 0; i < 40; i++) {
        let day = []
        // let day = { name: 'Noname '+i }
        // let attendenceday = [{ name: 'Noname '+i}]
        let ttl_i = 0
        let ttl_s = 0
        let ttl_a = 0
        for(let d=1; d<=this.getLastDate; d++){
          if(this.getHoliday(d)){
            day.push('-')
          }
          else if(d%4==1) {
            day.push('H')            
          }
          else if(d%4==2) {
            day.push('I')
            ++ttl_i
          }
          else if(d%4==3) {
            day.push('S')
            ++ttl_s
          }
          else {
            day.push('A')
            ++ttl_a
          }
        }
        data.push( {
          name: 'Noname Noname '+i,
          attendences: day,
          ttl_i: ttl_i,
          ttl_s: ttl_s,
          ttl_a: ttl_a,
        })
      } 
      this.tableData = data
    },
    get(){},
    addNew(){},
    doEdit(){},
    doDelete(){},
    doSave(){},
    doReset(){}
  }
}
</script>

<style>

</style>