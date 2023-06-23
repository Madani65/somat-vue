import request from '@/util/request'
import * as dummy from "@/dummy"

const state = {
  access_token: null,
  expires_in: 3600,
  token_type: 'bearer',
  username: null,
  avatar: null,
  profile: null,
  access_menu: []
}

const mutations = {
  SET_LOGIN(state, payload) {
    state.access_token = payload.access_token
    state.expires_in = payload.expires_at
  },
  SET_ACCESS_TOKEN(state, token) {
    state.access_token = token
  },
  SET_LOGIN_PROFILE(state, payload) {
    state.username = payload.username
    state.email = payload.email
    state.profile = payload
    // state.avatar = payload.avatar
  },
  SET_MENU(state, payload){
    state.access_menu = payload
  }
}

const getters = {
  getAccessToken: (state) => {
    return state.access_token
  },
  getAvatar: (state) => state.avatar,
  getUsername: (state) => state.username,
  getUserProfile: (state) =>state.user_profile,
  getChild: state => key => {
    return state.access_menu.filter(function (menu) { return menu.parent_id == key || ( key == false && menu.parent_id == null ) })
  },
  getMenuParentChild: (state, getters) => {
      return getters.getChild(false).map( (row) => {
          let child = getters.getChild(row.id).map( (mid) => {
              return {
                  ...mid,
                  children : getters.getChild(mid.id)
              }
          })
          return {
              ...row,
              children : child
          }
      })
  },
}

const actions = {
  login({ commit, dispatch }, { username, password }) {
    return request({
      url: '/auth/login',
      method: 'post',
      data: {
        username,
        password
      }
    }).then((resp) => {
        commit('SET_LOGIN', resp.data)
        // dispatch('fetchProfile')
        commit('SET_LOGIN_PROFILE', resp.data.profile)
        dispatch('rolemenu')
    })
  },
  logout({ commit }) {
    return request({
      url: '/auth/logout',
      method: 'get'
    }).then((resp) => {
      commit('SET_ACCESS_TOKEN', null)
      commit('profiles/CLEAR_DATA', null, { root: true })
      commit('app/clearLookupData', null, { root: true })
      return resp
    })
  },
  rolemenu({ commit }){
    commit('SET_MENU', dummy.menu.listMenu )
  },
  // get current login user info
  fetchProfiles( {commit} ){
    let header = {
        url : `/auth/user`,
        method: 'get',
    }
    // console.log(header)
    return request(header).then( (resp) => {
        commit('SET_LOGIN_PROFILE', resp.data)
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
