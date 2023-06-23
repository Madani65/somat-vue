import request from '@/util/request'

const state = {
    roles : [],
    role: {
        role_id: '',
        name: '',
        slug: ''
    }
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.roles = payload.data
    },
    CLEAR_DATA(state) {
        state.roles = []
    },
    ASSIGN_FORM(state,payload) {
        state.role = {
            role_id: payload.role_id,
            name: payload.name,
            slug: payload.slug
        }
    },
    CLEAR_FORM(state) {
        state.role = {
            role_id : '',
            name: '',
            slug: ''
        }
    }
}

const getters = {}

const actions = {
    get( { commit } ) {
        return request({
            url : `/admin/role`,
            method: 'get',
        }).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    save( { commit, state } ){
        return request({
            url : `/admin/role/save`,
            method: 'post',
            data: { 'role' : state.role }
        }).then( (resp) => {
            commit('CLEAR_FORM')
            return resp
        })
    },
    delete( { commit, state } ){
        return request({
            url : `/admin/role/${state.role.role_id}/delete`,
            method: 'delete'
        }).then( (resp) => {
            commit('CLEAR_FORM')
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