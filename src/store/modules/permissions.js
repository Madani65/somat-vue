const state = {
    permissions: [],
    permission: {
        id: '',
        name: '',
        slug: '',
        http_path: '',
        menu_flag: 'Y'
    },
    totalPermissions: 0,
    totalPagePermissions: 0,
    deletedPermissions: []
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.permissions = []
        payload.forEach(function (data) {
            state.permissions.push({
                id: data.id,
                name: data.name,
                slug: data.slug,
                http_path: data.http_path,
                menu_flag: data.menu_flag
            })
        })
    },
    CLEAR_DATA(state) {
        state.permissions = []
        state.deletedPermissions = []
        // state.totalPermissions = 0
    },
    DELETED_DATA(state, payload){
        state.deletedPermissions.push(payload.id)
        state.permissions.splice(state.permissions.indexOf(payload), 1)
    },
    UPDATE_DATA(state, payload){
        if (payload === -1) state.permissions.push(state.permission)
        else state.permissions.splice(payload, 1, state.permission)
    },
    ASSIGN_FORM(state,payload) {
        state.permission = {
            id: payload.id,
            name: payload.name,
            slug: payload.slug,
            http_path: payload.http_path,
            menu_flag: 'Y'
        }
    },
    CLEAR_FORM(state) {
        state.permission = {
            id : '',
            name: '',
            slug: '',
            http_path: '',
            menu_flag: 'Y'
        }
    }
}

const getters = {}

const actions = {
    get(){},
    save( {commit}, payload){
        // console.log(payload)
        commit('UPDATE_DATA', payload)
        // console.log(state.permissions)
        commit('CLEAR_FORM')
        return true
    },
    delete(){}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}