import colors from 'vuetify/es5/util/colors'

const state = {
    mode: 'light',
    themeColor: 'pink',
    language: 'en',
    lookupData: []
}

// getters
const getters = {
    getThemeColor: (state) => {
        return colors[state.themeColor].base
    },
    getLookupData: state => key => {
      let code =  state.lookupData.filter(function (data) { return data.name == key })
      // console.log('test',code[0].data)
      if (code.length) return code[0].data
      else return []
  }
}

// mutations
const mutations = {
  setThemeColor(state, payload) {
    state.themeColor = payload
  },
  setLanguage(state, payload){
    state.language = payload
  },
  pushLookupData(state, payload) {
    let data = state.lookupData.filter( function (row) { return row.name == payload.name})

    if (data.length)
      state.lookupData.some( function (a) {
        if(a.name === payload.name){
            state.lookupData.splice(state.lookupData.indexOf(a), 1, payload)
            return true
        }
      })
    else 
      state.lookupData.push(payload)
  },
  clearLookupData(state){
    state.lookupData = []
  }
}

// actions
const actions = {
  setLookupData({ dispatch, commit }, payload){
      return dispatch('lookupcodes/get', payload, {root:true}).then( (resp) => {
          let response = {
            name: payload,
            data: resp.data.map( function(item) { return {value:item.code, text:item.value} })
          }
          commit('pushLookupData', response)
          return response
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
