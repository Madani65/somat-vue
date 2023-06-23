import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    positions: [],
    position: {
        position_id: '',
        name: '',
        description: '',
        effective_start_date: '',
        effective_end_date: '',
    },
    totalPositions : 0,
    totalPagePositions: 0,
    selectedPosition: ''
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.positions = []
        payload.data.forEach( function(data) {
            state.positions.push({
                uuid: uuid.v1(),
                organization_id: data.organization_id,
                position_id: data.position_id,
                name: data.name,
                description: data.description,
                effective_start_date: data.effective_start_date,
                effective_end_date: data.effective_end_date,
                updated: false
            })
        })
        if ('total' in payload) state.totalPositions = payload.total
        if ('last_page' in payload) state.totalPagePositions = payload.last_page
    },
    CLEAR_DATA(state) {
        state.positions = []
    },
    PUSH_BLANK_DATA(state, payload){
        state.positions.push({
            uuid: uuid.v1(),
            organization_id: payload,
            position_id: '',
            name: '',
            description: '',
            effective_start_date: '',
            effective_end_date: '',
            updated: true
        })
        ++state.totalPositions
    },
    DELETED_DATA(state, payload){
        state.positions.some( function (a) {
            if(a.position_id === payload){
                state.positions.splice(state.positions.indexOf(a), 1)
                return true
            }
        })
        --state.totalPositions
    },
    DELETED_BY_IDX(state, payload){
        state.positions.splice(payload, 1)
        --state.totalPositions
    },
    SET_SELECTED_ITEM(state, payload){
        state.selectedPosition = payload
    },
    SET_SELECTED_BLANK(state){
        state.selectedPosition = ''
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
        let OrgId = rootState.organizations.selectedOrganization.organization_id
        let header = {
            url : `/admin/position/${OrgId}/organization?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    getNoPaging( { commit, rootState } ) {
        let schoolId = rootState.profiles.selectedSchool
        let OrgId = rootState.organizations.selectedOrganization.organization_id
        let header = {
            url : `/admin/position/${OrgId}/organization?school_id=${schoolId}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp)
            return resp
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/position/save`,
            method: 'post',
            data: { 
                position : state.positions,
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
            url : `/admin/position/${payload.position_id}/delete`,
            method: 'delete'
        }
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.position_id)
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