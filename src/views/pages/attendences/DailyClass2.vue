
<template>
  <ve-table
    fixed-header
    :max-height="500"
    :scroll-width="1600"
    border-y
    :columns="columns"
    :table-data="tableData"
    row-key-field-name="rowkey"
    :cell-style-option="cellStyleOption"
    :cell-selection-option="{ enable: false }"
  />
</template>

<script>
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

  data() {
    return {
      /* cellStyleOption: {
        headerCellClass: (cell) => {
          console.log(cell.column.field.substring(0,3))
          if(cell.column.key.substring(0,1) == 'd' && this.getDate(cell.column.key).getDay() > 5)
            return 'bggreen pa-1 white--text'
          else  
            return 'bgblue pa-1 white--text'
        },
      }, */
      virtualScrollOption: {
        enable: true,
      },
      tableData: []
    }
  },

  computed: {
    lastDate(){
      return new Date((new Date(this.year, this.month+1, 1)) - 1)
    },
    cellStyleOption(){
      return {
        headerCellClass: (cell) => {
          if(cell.column.key.substring(0,1) == 'd' )
            if( (this.getDate(cell.column.key.substring(1)).getDay() === 0 || this.getDate(cell.column.key.substring(1)).getDay() === 6) )
              return 'bgred pa-1 white--text'
            else
              return 'bggreen pa-1 white--text'
          else  
            return 'bgblue pa-1 white--text'
        },
        bodyCellClass: (cell) => {
          if(cell.column.key.substring(0,1) == 'd' )
            if( (this.getDate(cell.column.key.substring(1)).getDay() === 0 || this.getDate(cell.column.key.substring(1)).getDay() === 6) )
              return 'bgred pa-1 white--text'
        }
      }
    },
    columns(){
      let date = this.lastDate
      let listDate = []
      for(let d=1; d<=date.getDate(); d++){
        listDate.push({
          field: 'day'+d, key: 'd'+d, title: d, width: 30
        })
      }

      return [
        { field: 'no', key: 'no', title: 'No.', width: 35 },
        { field: 'name', key: 'a', title: this.$vuetify.lang.t('$vuetify.student.name'), width: 140, fixed: 'left' },
        {
          key: 'head1',
          title: this.$vuetify.lang.t('$vuetify.date'),
          children: listDate
        },
        {
          key: 'head2',
          title: this.$vuetify.lang.t('$vuetify.total'),
          children: [
            { field: 'total_i', key: 'ttl_i', title: 'I', width: 30, renderHeaderCell:() => {
              return (
                <i class="v-icon mdi mdi-email-newsletter" style="font-size: 18px;"></i>
              )
            }},
            { field: 'total_s', key: 'ttl_s', title: 'S', width: 30, renderHeaderCell:() => {
              return (
                <i class="v-icon mdi mdi-plus-box" style="font-size: 18px;"></i>
              )
            }},
            { field: 'total_a', key: 'ttl_a', title: 'A', width: 30, renderHeaderCell:() => {
              return (
                <i class="v-icon mdi mdi-alpha-a-box" style="font-size: 18px;"></i>
              )
            }},
          ]
        }
      ]
    }
  },

  methods: {
    getDate(d){
      return new Date(new Date(this.year, this.month, d))
    },
    getHoliday(d){
      let day = this.getDate(d).getDay()
      if( (day === 0 || day === 6) )
        return 'bgred pa-1 white--text'
      else
        return 'bggreen pa-1 white--text'
    },
    getIcon(type){
      if( type == 'H' )
        return <i class="v-icon mdi mdi-fingerprint green--text" style="font-size: 18px;"></i>
      else if( type == 'I' )
        return <i class="v-icon mdi mdi-fingerprint" style="font-size: 18px;"></i>
      else if( type == 'A' )
        return <i class="v-icon mdi mdi-fingerprint" style="font-size: 18px;"></i>
    },
    initTableData() {
      let data = []
      for (let i = 0; i < 40; i++) {
        let day = {"no": i+1,"name":"Noname "+i,"day1":"H","day2":"H","day3":"H","day4":"H","day5":"H","day6":"H","day7":"H","day8":"H","day9":"H","day10":"H","day11":"H","day12":"H","day13":"H","day14":"H","day15":"H","day16":"H","day17":"H","day18":"H","day19":"H","day20":"H","day21":"H","day22":"H","day23":"H","day24":"H","day25":"H","day26":"H","day27":"H","day28":"H","day29":"H","day30":"H","day31":"H","total_i":"0","total_s":"0","total_a":"0"}
        data.push(day)
      } 
      this.tableData = data
    },
  },
  mounted() {
    this.initTableData()
    console.log('test')
  },
}
</script>

<style>

</style>
            