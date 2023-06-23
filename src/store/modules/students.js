import request from '@/util/request'
import { uuid } from "vue-uuid"

const state = {
  students: [],
  student: {
    student_id: '',
    person_id: '',
    certificate_number: '',
    skhun: '',
    son_of: '',
    class_level: '',
    nisn: '',
    nis: '',
    effective_start_date: '',
    effective_end_date: '',
    passed_flag: '',
    mutation_flag: ''
  },
  profile: {
    user_profile_id: '',
    nik: '',
    kk: '',
    first_name: '',
    last_name: '',
    mobile_number: '',
    phone_no: '',
    place_of_birth:'',
    date_of_birth:'',
    gender: '',
    religion:'',
    blood_type: '',
    profile_image: '',
    status: '',
    citizenship: '',
    country: '',
    email: ''
  },
  location: {
    location_id: '',
    village_id: '',
    subdistrict_id: '',
    district_id: '',
    province_id: '',
    neighbourhood: '',
    hamlet: '',
    address: '',
    postal_code: '',
  },
  totalStudents: 0,
  totalPageStudents: 0
}

const mutations = {
  ASSIGN_DATA(state, payload){
    state.students = []
    if( 'data' in payload)
      payload.data.forEach( function(data) {
        state.students.push({
          uuid: uuid.v1(),
          student_id: data.student_id,
          person_id: data.person_id,
          certificate_number: data.certificate_number,
          skhun: data.skhun,
          son_of: data.son_of,
          class_level: data.class_level,
          nisn: data.nisn,
          nis: data.nis,
          effective_start_date: data.effective_start_date,
          effective_end_date: data.effective_end_date,
          passed_flag: data.passed_flag,
          mutation_flag: data.mutation_flag,
          profile: data.profile,
          location: data.profile.location,
          academic_start: data.academic_start,
          name: data.profile.first_name + ' ' + data.profile.last_name,
          dateofbirth: data.profile.date_of_birth,
          gender: data.profile.gender
        })
      })
    if ('total' in payload) state.totalStudents = payload.total
    if ('last_page' in payload) state.totalPageStudents = payload.last_page
  },
  CLEAR_DATA(state){
    state.students = []
  },
  ASSIGN_FORM(state, payload){
    state.student = {
      student_id: payload.student_id,
      person_id: payload.person_id,
      certificate_number: payload.certificate_number,
      skhun: payload.skhun,
      son_of: payload.son_of,
      class_level: payload.class_level,
      nisn: payload.nisn,
      nis: payload.nis,
      effective_start_date: payload.effective_start_date,
      effective_end_date: payload.effective_end_date,
      passed_flag: payload.passed_flag,
      mutation_flag: payload.mutation_flag
    }
    state.profile = {
      user_profile_id: payload.profile.user_profile_id,
      nik: payload.profile.nik,
      kk: payload.profile.kk,
      first_name: payload.profile.first_name,
      last_name: payload.profile.last_name,
      mobile_number: payload.profile.mobile_number,
      phone_no: payload.profile.phone_no,
      place_of_birth:payload.profile.place_of_birth,
      date_of_birth:payload.profile.date_of_birth,
      gender: payload.profile.gender,
      religion:payload.profile.religion,
      blood_type: payload.blood_type,
      profile_image: '',
      status: '',
      citizenship: payload.citizenship,
      country: payload.country,
      email: ''
    }
    this.commit('students/ASSIGN_LOCATION', payload.profile.location)
  },
  CLEAR_FORM(state){
    state.student = {
      student_id: '',
      person_id: '',
      certificate_number: '',
      skhun: '',
      son_of: '',
      class_level: '',
      nisn: '',
      nis: '',
      effective_start_date: '',
      effective_end_date: '',
      passed_flag: '',
      mutation_flag: ''
    }
    state.profile = {
      user_profile_id: '',
      nik: '',
      kk: '',
      first_name: '',
      last_name: '',
      mobile_number: '',
      phone_no: '',
      place_of_birth:'',
      date_of_birth:'',
      gender: '',
      religion:'',
      blood_type: '',
      profile_image: '',
      status: '',
      citizenship: '',
      country: '',
      email: ''
    }
    state.location = {
      location_id: '',
      village_id: '',
      subdistrict_id: '',
      district_id: '',
      province_id: '',
      neighbourhood: '',
      hamlet: '',
      address: '',
      postal_code: '',
    }
  },
  PUSH_DATA(){},
  DELETED_BY_ID(state, payload){
    state.students.some( function (a) {
      if(a.student_id === payload){
        let idx = state.students.indexOf(a)
        state.students.splice(idx, 1)
        return true
      }
    })
    --state.totalStudents
  },
  ASSIGN_LOCATION(state, payload){
    state.location = {
      location_id: payload.location_id,
      village_id: payload.village_id,
      subdistrict_id: payload.subdistrict.subdistrict_id,
      district_id: payload.district.district_id,
      province_id: payload.province.province_id,
      neighbourhood: payload.neighbourhood,
      hamlet: payload.hamlet,
      address: payload.address,
      postal_code: payload.village.postal_code
    }
  }
}

const getters = {}

const actions = {
  get( { commit, rootState }, payload ){
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
      url : `/admin/student?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
      method: 'get',
    }
    return request(header).then( (resp) => {
      commit('ASSIGN_DATA', resp.data)
      return resp
    })
  },
  getNoPaging(){},
  getActive(){},
  save( { state, rootState } ){
    let header = {
      url : `/admin/student/save`,
      method: 'post',
      data: { 
        student : state.student,
        profile : state.profile,
        location : state.location,
        parent : rootState.parents.parents,
        school_id : rootState.profiles.selectedSchool
      }
  }
  return request(header).then( (resp) => {
      //commit('ASSIGN_DATA', resp)
      return resp
  })
  },
  delete( {commit}, payload){
    let header = {
      url : `/admin/student/${payload.item.profile.relation_id}/delete`,
      method: 'delete'
    }
    return request(header).then( (resp) => {
      commit('DELETED_BY_IDX', payload.index)
      return resp
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}