import request from '@/util/request'

const state = {
  class: [],
  teacher: [],
  schedule: {}
}

const mutations = {
  ASSIGN_DATA_CLASS(state, payload){
    state.class = []
    payload.schedule.forEach( function(data){
      state.class.push({
        schedule_class_id : data.schedule_class_id,
        study_day : data.study_day,
        lesson_time_name: data.lesson_time_name,
        lesson_name: data.lesson_name,
        teacher_name: data.teacher_name
      })
    })
  },
  ASSIGN_DATA_TEACHER(state, payload){
    state.teacher = []
    payload.forEach( function(data){
      state.teacher.push({
        schedule_class_id : data.schedule_class_id,
        study_day : data.study_day,
        lesson_time_name: data.lesson_time_name,
        lesson_name: data.lesson_name,
        teacher_name: data.teacher_name,
        class_name: data.schedule.class_name
      })
    })
  },
  CLEAR_DATA(){},
  CLEAR_FORM(){},
  PUSH_DATA(){},
  DELETED_BY_IDX(){}
}

const getters = {}

const actions = {
  getByClass({ commit, rootState }){
    let schoolId = rootState.profiles.selectedSchool
    let header = {
      url : `/admin/schedule/34/33?school_id=${schoolId}`,
      method: 'get',
    }
    return request(header).then( (resp) => {
        commit('ASSIGN_DATA_CLASS', resp.data)
        return resp
    })
  },
  getByTeacher({ commit, rootState }, payload){
    let schoolId = rootState.profiles.selectedSchool
    let schoolYearId = rootState.profiles.selectedAcademicYear
    let header = {
      url : `/admin/schedule/teacher/${schoolYearId}/${payload}?school_id=${schoolId}`,
      method: 'get',
    }
    return request(header).then( (resp) => {
        commit('ASSIGN_DATA_TEACHER', resp)
        return resp
    })
  },
  getNoPaging(){},
  getActive(){},
  save(){},
  delete(){}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}