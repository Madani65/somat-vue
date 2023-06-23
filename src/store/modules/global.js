import request from '@/util/request'

const state = {
    errors: {},
    dummyId: 10001,
    propsFooterTable:  {
      itemsPerPageOptions: [2,5,10,15,20],
      showCurrentPage:true,
      // showFirstLastPage: true,
    },
    propsConfirmDelete: {
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }
}

// getters
const getters = {
  getDummyId: state => {
    return state.dummyId
  },
  getErrorMessage: state => key => {
    return ( key in state.errors ) ? state.errors[key] : [] 
  },
  getErrorMessageByUUID: state => ( key, uuid, field, data ) => {
    let msg = []
    if( data.length > 0 )
      data.some( function(item, idx) {
        if(item.uuid == uuid && ( key+'.'+idx+'.'+field in state.errors )) {
          msg = state.errors[key+'.'+idx+'.'+field]
          return true
        }
      })
    return msg
  }
}

// actions
const actions = {
  setArrayErrorState ({
    commit
  }, payload) {
    // eslint-disable-next-line no-console
    // console.log(payload)
    commit('setErrors', payload.errors)
  },
  getApi({commit}, payload){
    commit('clearErrors')
    return request({
        url: payload.url,
        method: payload.method,
        data: payload.data
      }).then((resp) => {
          return resp
      })
  }
}

// mutations
const mutations = {
  setErrors (state, payload) {
    state.errors = payload
  },
  clearErrors (state) {
    state.errors = []
  },
  IncreaseDummyId(state) {
    ++state.dummyId
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
