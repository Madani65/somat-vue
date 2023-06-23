// import request from '@/util/request'
import * as dummy from "@/dummy"

const state = {
    users : [],
    user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        roles: [],
        last_login: ''
    },
    totalUsers: 0,
    totalPageUsers: 0
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.users = payload.data
        state.totalUsers = payload.total
        state.totalPageUsers = payload.last_page
    },
    CLEAR_DATA(state) {
        state.users = []
    },
    ASSIGN_FORM(state,payload) {
        state.user = {
            id: payload.id,
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            roles: payload.roles,
            last_login: payload.last_login
        }
    },
    PUSH_DATA(state, payload){
        state.users.push(payload)
    },
    UPDATE_DATA(state){
        state.users.some( function (a) {
            if(a.id === state.user.id){
                state.users.splice(state.users.indexOf(a), 1, state.user)
                return true
            }
        })
            
    },
    DELETED_DATA(state){
        state.users.some( function (a) {
            if(a.id === state.user.id){
                state.users.splice(state.users.indexOf(a), 1)
                return true
            }
        })
    },
    CLEAR_FORM(state) {
        state.user = {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            roles: [],
            last_login: ''
        }
    }
}

const getters = {}

const actions = {
    get( { commit } ) {
        let header = {
            url : `/admin/user`,
            method: 'get',
        }
        console.log(header)
        /* return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        }) */
        commit('ASSIGN_DATA', {
            data: dummy.akun.akun,
            total: dummy.akun.akun.length,
            last_page: 5,
        })
        return true
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/user/save`,
            method: 'post',
            data: { 'user' : state.user }
        }
        console.log(header)
        /* return request().then( (resp) => {
            commit('CLEAR_FORM')
            return resp
        }) */
        // console.log(this.dispatch('global/getDummyId'))
        commit('global/IncreaseDummyId', null, {root:true})
        if( state.user.id )
            commit('UPDATE_DATA')
        else
            commit('PUSH_DATA', {
                ...state.user,
                id: rootState.global.dummyId
            })
        commit('CLEAR_FORM')
        return true
    },
    delete( { commit, state } ){
        let header = {
            url : `/admin/user/${state.user.id}/delete`,
            method: 'delete'
        }
        console.log(header)
        /* return request(header).then( (resp) => {
            commit('DELETED_DATA')
            commit('CLEAR_FORM')
            return resp
        }) */
        commit('DELETED_DATA')
        commit('CLEAR_FORM')
        return true
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}