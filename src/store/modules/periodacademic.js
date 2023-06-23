import request from '@/util/request'

const state = {
  periodYears : [],
  periodYear : {
    academic_year_id: '',
    name: '',
    curriculum_name: '',
    start_year: '',
    end_year: '',
  },
  periodAcademics : [],
  periodAcademic : {
    academic_period_id: '',
    period_name: '',
    effective_start_date: '',
    effective_end_date: ''
  } 
}

const mutations = {
  ASSIGN_DATA( state, payload ) {
    state.periodYears = []

    if('data' in payload)
      payload.data.forEach(function(data) {
        state.periodYears.push({
          academic_year_id : data.academic_year_id,
          name : data.name,
          curriculum_name: data.curriculum_name,
          start_year: data.start_year,
          end_year : data.end_year,
          academic_period: ('academic_period' in data) ? data.academic_period : []
        })
      })
  },
  CLEAR_DATA(state) {
    state.periodYears = []
  },
  CLEAR_FORM(state){
    state.periodYear = {
      academic_year_id: '',
      name: '',
      curriculum_name: '',
      start_year: '',
      end_year: '',
    }
  },
  PUSH_DATA(state, payload){
    state.periodYears.push({
      ...payload,
      academic_period: [
        {
          academic_period_id : '',
          period_name: '',
          effective_start_date: '',
          effective_end_date: '',
          updated: true,
          datepicker_start: false,
          datepicker_end: false
        }
      ]
    })
  },
  ASSIGN_CHILD_DATA(state, payload){
    state.periodAcademics = []
    if('academic_period' in payload)
      payload.academic_period.forEach( function(data) {
        state.periodAcademics.push({
          academic_period_id: data.academic_period_id,
          period_name: data.period_name,
          effective_start_date: data.effective_start_date,
          effective_end_date: data.effective_end_date,
          updated: false,
          datepicker_start: false,
          datepicker_end: false
        })
      })
  },
  ADD_NEW_CHILD(state){
    state.periodAcademics.push(
      {
        academic_period_id : '',
        period_name: '',
        effective_start_date: '',
        effective_end_date: '',
        updated: true,
        datepicker_start: false,
        datepicker_end: false
      }
    )
  }
}

const getters = {
  getListMonths: state => key => {
    let data = state.periodYears.filter( function(row) { return row.academic_year_id == key })
    let months = []
    let fromDate = ''
    let toDate = ''
    if(data.length){
      console.log(data)
      data[0].academic_period.forEach( function(list) {
        fromDate = new Date(list.effective_start_date)
        toDate = new Date(list.effective_end_date)
        const fromYear = fromDate.getFullYear()
        const fromMonth = fromDate.getMonth()
        const toYear = toDate.getFullYear()
        const toMonth = toDate.getMonth()
        months.push( { header: list.period_name } )
        for(let year = fromYear; year <= toYear; year++) {
          let month = year === fromYear ? fromMonth : 0
          const monthLimit = year === toYear ? toMonth : 11
          for(month; month <= monthLimit; month++) {
            months.push({ month, year })
          }
        }
      })
    }
    return months
  }
}

const actions = {
  get( {commit, rootState} ) {
    let schoolId = rootState.profiles.selectedSchool
    let header = {
      url : `/admin/academicyear?school_id=${schoolId}&order=[{"start_year":"asc"}]`,
      method: 'get',
    }
    return request(header).then( (resp) => {
      commit('ASSIGN_DATA', resp.data)
      return resp
    })
  },
  getSelectList( {rootState} ) {
    let schoolId = rootState.profiles.selectedSchool
    let header = {
      url : `/admin/academicyear?school_id=${schoolId}&order=[{"start_year":"asc"}]`,
      method: 'get',
    }
    return request(header).then( (resp) => {
      return {
        data : resp.data.data.map( function (list) {
            return {
              academic_year_id : list.academic_year_id,
              title : list.start_year+ '/'+ list.end_year
            }
        })
      }
    })
  },
  save( {state, rootState}, payload ){
    let header = {
      url : `/admin/academicyear/save`,
      method: 'post',
      data: {
        academicyear : {
          academic_year_id : state.periodYears[payload].academic_year_id,
          name: state.periodYears[payload].name,
          curriculum_name : state.periodYears[payload].curriculum_name,
          start_year: state.periodYears[payload].start_year,
          end_year: state.periodYears[payload].end_year
        },
        academicperiod: state.periodAcademics,
        school_id : rootState.profiles.selectedSchool
      }
    }
    return request(header).then( (resp) => {
      // commit('UPDATE_DATA', resp)
      return resp
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}