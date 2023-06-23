import request from '@/util/request'

const state = {
  parents: [],
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
    job: '',
    blood_type: '',
    salary: '',
    graduated: '',
    profile_image: '',
    status: '',
    citizenship: '',
    email: '',
    relationship: '',
    primary_flag: '',
    relation_id: ''
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
  totalParents: 0,
  totalPageParents: 0
}

const mutations = {
  ASSIGN_DATA(state, payload){
    state.parents = []
    payload.forEach( function(data) {
      state.parents.push({
        profile : {
          user_profile_id: data.user_profile_id,
          nik: data.nik,
          kk: data.kk,
          first_name: data.first_name,
          last_name: data.last_name,
          mobile_number: data.mobile_number,
          phone_no: data.phone_no,
          place_of_birth:data.place_of_birth,
          date_of_birth:data.date_of_birth,
          gender: data.gender,
          religion:data.religion,
          job: data.job,
          blood_type: data.blood_type,
          salary: data.salary,
          graduated: data.graduated,
          profile_image: data.profile_image,
          status: data.status,
          citizenship: data.citizenship,
          email: data.email,
          relationship: data.pivot.related_type_name,
          primary_flag: data.primary_flag,
          relation_id : data.pivot.id
        },
        location: {
          location_id: data.location.location_id,
          village_id: data.location.village_id,
          subdistrict_id: data.location.subdistrict.subdistrict_id,
          district_id: data.location.district.district_id,
          province_id: data.location.province.province_id,
          neighbourhood: data.location.neighbourhood,
          hamlet: data.location.hamlet,
          address: data.location.address,
          postal_code: data.location.village.postal_code
        }
      })
    })
  },
  CLEAR_DATA(state){
    state.parents = []
  },
  CLEAR_FORM(state){
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
      job: '',
      blood_type: '',
      salary: '',
      graduated: '',
      profile_image: '',
      status: '',
      citizenship: '',
      email: '',
      relationship: '',
      primary_flag: '',
      relation_id: '',
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
  ASSIGN_FORM(state, payload){
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
      job: payload.profile.job,
      blood_type: payload.profile.blood_type,
      salary: payload.profile.salary,
      graduated: payload.profile.graduated,
      profile_image: payload.profile.profile_image,
      status: payload.profile.status,
      citizenship: payload.profile.citizenship,
      email: payload.profile.email,
      relationship: payload.profile.relationship,
      primary_flag: payload.profile.primary_flag,
      relation_id : payload.profile.relation_id
    }
    this.commit('parents/ASSIGN_LOCATION', payload.location)
  },
  PUSH_DATA(state){
    state.parents.push({
      profile: state.profile,
      location: state.location
    })
  },
  UPDATE_DATA(state, payload){
    console.log(payload)
    state.parents.splice(payload, 1, { profile: state.profile, location: state.location })
  },
  DELETED_BY_IDX(state, payload){
    state.parents.splice(payload, 1)
  },
  ASSIGN_LOCATION(state, payload){
    state.location = {
      location_id: payload.location_id,
      village_id: payload.village_id,
      subdistrict_id: payload.subdistrict_id,
      district_id: payload.district_id,
      province_id: payload.province_id,
      neighbourhood: payload.neighbourhood,
      hamlet: payload.hamlet,
      address: payload.address,
      postal_code: payload.postal_code
    }
  },
}

const getters = {}

const actions = {
  get(){},
  getNoPaging(){},
  getActive(){},
  validation( {state} ){
    let header = {
      url: `/admin/parent/validation`,
      method: 'post',
      data: {
        parent : [
          {
            profile: state.profile,
            location: state.location
          }
        ]
      }
    }
    return request(header).then( (resp) => {
      return resp
    })
  },
  save(){},
  delete( {commit}, payload){
    let header = {
      url : `/admin/parent/${payload.item.profile.relation_id}/delete`,
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