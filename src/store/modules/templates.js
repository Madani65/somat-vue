import request from '@/util/request'

const state = {
    templates : [],
    template: {
        template_id: '',
        name: '',
        description: ''
    },
    totalTemplates: 0,
    totalPageTemplates: 0
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.templates = payload.data
        state.totalTemplates = payload.total
        state.totalPageTemplates = payload.last_page
    },
    CLEAR_DATA(state) {
        state.templates = [],
        state.totalTemplates = 0
    },
    ASSIGN_FORM(state,payload) {
        state.template = {
            template_id: payload.template_id,
            name: payload.name,
            description: payload.description
        }
    },
    CLEAR_FORM(state) {
        state.template = {
            template_id : '',
            name: '',
            description: ''
        }
    }
}

const getters = {}

const actions = {
    get( { commit }, payload ) {
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

        return request({
            url : `/admin/template?per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    save( { commit, state, rootState } ){
        return request({
            url : `/admin/template/save`,
            method: 'post',
            data: { 'template' : state.template, 'permission' : rootState.permissions.permissions, 'delete_permission' : rootState.permissions.deletedPermissions }
        }).then( (resp) => {
            commit('CLEAR_FORM')
            return resp
        })
    },
    delete( { commit, state } ){
        return request({
            url : `/admin/template/${state.template.template_id}/delete`,
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