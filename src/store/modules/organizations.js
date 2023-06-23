import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    organizations: [],
    organization: {
        organization_id: '',
        name: '',
        description: '',
        effective_start_date: '',
        effective_end_date: '',
    },
    totalOrganizations : 0,
    totalPageOrganizations: 0,
    selectedOrganization: ''
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        // state.organizations = payload.data
        state.organizations = []
        payload.data.forEach( function(data) {
            state.organizations.push({
                uuid: uuid.v1(),
                organization_id: data.organization_id,
                name: data.name,
                description: data.description,
                effective_start_date: data.effective_start_date,
                effective_end_date: data.effective_end_date,
                updated: false
            })
        })
        if ('total' in payload) state.totalOrganizations = payload.total
        if ('last_page' in payload) state.totalPageOrganizations = payload.last_page
    },
    CLEAR_DATA(state) {
        state.organizations = []
    },
    PUSH_BLANK_DATA(state){
        state.organizations.push({
            uuid: uuid.v1(),
            organization_id: '',
            name: '',
            description: '',
            effective_start_date: '',
            effective_end_date: '',
            updated: true
        })
        ++state.totalOrganizations
    },
    DELETED_DATA(state, payload){
        state.organizations.some( function (a) {
            if(a.organization_id === payload){
                state.organizations.splice(state.organizations.indexOf(a), 1)
                return true
            }
        })
        --state.totalActivities
    },
    DELETED_BY_IDX(state, payload){
        state.organizations.splice(payload, 1)
        --state.totalOrganizations
    },
    SET_SELECTED_ITEM(state, payload){
        state.selectedOrganization = payload
    },
    SET_SELECTED_BLANK(state){
        state.selectedOrganization = ''
    }
}

const getters = {}

const actions = {
    get( { commit, rootState }, payload ) {
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
        let schoolId = rootState.profiles.selectedSchool
        let header = {
            url : `/admin/organization?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    getNoPaging( { commit, rootState } ) {
        let schoolId = rootState.profiles.selectedSchool
        let header = {
            url : `/admin/organization?school_id=${schoolId}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp)
            return resp
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/organization/save`,
            method: 'post',
            data: { 
                organization : state.organizations,
                school_id : rootState.profiles.selectedSchool
            }
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp)
            return resp
        })
    },
    delete( { commit }, payload ){
        let header = {
            url : `/admin/organization/${payload.organization_id}/delete`,
            method: 'delete'
        }
        // console.log(header)
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.organization_id)
            return resp
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}