import request from '@/util/request'
import { uuid } from "vue-uuid"

const state = {
  teacherAssignments : [],
  teacherAssignment : {
    teacher_assignment_id : '',
    teacher_id : '',
    decree_number : '',
    effective_start_date : '',
    effective_end_date : '',
    decree_attachment: ''
  },
  teacherAssigmentClass : [
    {
      teacher_assignment_class_id: '',
      lesson_id: '',
      class_id: [],
    }
  ],
  totalTeacherAssignments : 0,
  totalPageTeacherAssigments : 0
}

const mutations = {
  ASSIGN_DATA( state, payload ) {
    state.teacherAssignments = []

    if('data' in payload)
      payload.data.forEach(function(data) {
        state.teacherAssignments.push({
          uuid: uuid.v1(),
          teacher_assignment_id : data.teacher_assignment_id,
          teacher_id : data.teacher_id,
          decree_number: data.decree_number,
          effective_start_date: data.effective_start_date,
          effective_end_date : data.effective_end_date,
          decree_attachment: data.decree_attachment
        })
      })

    if('total' in payload) state.totalTeacherAssignments = payload.total
    if('last_page' in payload) state.totalPageTeacherAssigments = payload.last_page
  },
  CLEAR_DATA(state) {
    state.teacherAssignments = []
  },
  CLEAR_FORM(state){
    state.teacherAssignment = {
      teacher_assignment_id : '',
      teacher_id : '',
      decree_number : '',
      effective_start_date : '',
      effective_end_date : '',
      decree_attachment: ''
    }
    this.commit('teacherassignment/CLEAR_CHILD')
  },
  CLEAR_CHILD(state){
    state.teacherAssigmentClass = [
      {
        teacher_assignment_class_id: '',
        lesson_id: '',
        class_id: [],
      }
    ]
  },
  ADD_NEW_CHILD(state){
    state.teacherAssigmentClass.push(
      {
        teacher_assignment_class_id: '',
        lesson_id: '',
        class_id: [],
      }
    )
  },
  ASSIGN_FORM(state, payload){
    state.teacherAssignment = {
      teacher_assignment_id : payload.teacher_assignment_id,
      teacher_id : payload.teacher_id,
      decree_number: payload.decree_number,
      effective_start_date: payload.effective_start_date,
      effective_end_date : payload.effective_end_date,
      decree_attachment: payload.decree_attachment
    }
  },
  DELETED_DATA(state, payload){
      state.teacherAssignments.some( function (a) {
          if(a.teacher_assignment_id === payload){
              let idx = state.teacherAssignments.indexOf(a)
              state.teacherAssignments.splice(idx, 1)
              return true
          }
      })
      --state.totalTeacherAssignments
  },
}

const getters = {}

const actions = {
  get( {commit, rootState}, payload ) {
    console.log(payload)
    const {
      sortBy,
      sortDesc,
      page,
      itemsPerPage
    } = payload.options

    let sort = []
    if (sortBy)
      sortBy.forEach(function(item, index) {
        let row = {
          [item]: (sortDesc[index]) ? 'desc' : 'asc'
        }
        sort.push(row)
      })
    let schoolId = rootState.profiles.selectedSchool
    let header = {
      url : `/admin/teacherassignment?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
      method: 'get',
    }
    return request(header).then( (resp) => {
      commit('ASSIGN_DATA', resp.data)
      return resp
    })
  },
  save( {state, rootState }){
    let header = {
      url: `/admin/teacherassignment/save`,
      method: 'post',
      data: {
        school_id : rootState.profiles.selectedSchool,
        school_year_id : rootState.profiles.selectedAcademicYear,
        teacherassignment : state.teacherAssignment,
        teacherassignmentclass : state.teacherAssigmentClass
      }
    }
    return request(header).then( (resp) => {
      return resp
    })
  },
  delete( { commit }, payload ){
    let header = {
      url : `/admin/teacherassignment/${payload.teacher_assignment_id}/delete`,
      method: 'delete'
    }
    return request(header).then( (resp) => {
      commit('DELETED_DATA', payload.teacher_assignment_id)
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