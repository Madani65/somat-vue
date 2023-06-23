const state = {
  studentClass : [],
  totalStudentClass: 0
}

const mutations = {
  ASSIGN_DATA(){},
  CLEAR_DATA(state){
    state.studentClass = []
  },
  CLEAR_FORM(){},
  PUSH_DATA(state, payload){
    payload.forEach( function(data){
      if( state.studentClass.filter( function(list){ return list.nis == data.nis }).length == 0 ) {
        state.studentClass.push( {...data, updated: true })
        ++state.totalStudentClass
      }
    })
  },
  DELETED_BY_IDX(){}
}

const getters = {}

const actions = {
  get(){},
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