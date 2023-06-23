import request from '@/util/request'

const state = {
    classifications : [],
    classification: {
        classification_id : '',
        classification_name: '',
        description: '',
        active_flag: '',
        classification_type: ''
    },
    totalClassifications: 0,
    totalPageClassifications: 0,
    selectedClassification: '',
    multipleSelectedClassification: []
}

const mutations = {
  ASSIGN_DATA(state, payload) {
    state.classifications = payload.data
    if ('total' in payload) state.totalClassifications = payload.total
    if ('last_page' in payload) state.totalPageClassifications = payload.last_page
  },
  CLEAR_FORM(state) {
    state.classification = {
      classification_id : '',
      classification_name: '',
      description: '',
      active_flag: '',
      classification_type: ''
    }
  },
  SET_SELECTED_ITEM(state, payload){
    state.selectedClassification = payload
  },
  SET_MULTISELECTED_ITEM(state, payload){
    state.multipleSelectedClassification = payload
  },
  SET_SELECTED_BLANK(state){
      state.selectedClassification = ''
      state.multipleSelectedClassification = []
  }
}

const getters = {}

const actions = {
  getNoPaging( { commit } ) {
    let header = {
        url : `/admin/classification/roleTeacher`,
        method: 'get',
    }
    return request(header).then( (resp) => {
        commit('ASSIGN_DATA', resp)
        return resp
    })
},
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}