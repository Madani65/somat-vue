import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    activities: [],
    activity: {
        activity_id: '',
        activity_name : '',
        description: '',
        active_flag: '',
    },
    totalActivities: 0,
    totalPageActivities: 0
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        // state.activities = payload.data
        state.activities = []
        payload.data.forEach( function(data) {
            state.activities.push({
                uuid: uuid.v1(),
                activity_id: data.activity_id,
                activity_name: data.activity_name,
                description: data.description,
                active_flag: data.active_flag,
                updated: false
            })
        })
        if ('total' in payload) state.totalActivities = payload.total
        if ('last_page' in payload) state.totalPageActivities = payload.last_page
    },
    CLEAR_DATA(state) {
        state.activities = []
    },
    ASSIGN_FORM(state,payload) {
        state.activity = {
            activity_id: payload.activity_id,
            activity_name: payload.activity_name,
            description: payload.description,
            active_flag: payload.active_flag
        }
    },
    PUSH_BLANK_DATA(state){
        state.activities.push({
            uuid: uuid.v1(),
            activity_id: '',
            activity_name : '',
            description: '',
            active_flag: 'Y',
            updated: true
        })
        ++state.totalActivities
    },
    PUSH_DATA(state, payload){
        state.activities.push(payload)
        ++state.totalActivities
    },
    UPDATE_DATA(state, payload){
        state.activities.some( function (a) {
            if(a.activity_id === payload.activity_id){
                state.activities.splice(state.activities.indexOf(a), 1, payload )
                return true
            }
        })
            
    },
    DELETED_DATA(state, payload){
        state.activities.some( function (a) {
            if(a.activity_id === payload){
                state.activities.splice(state.activities.indexOf(a), 1)
                return true
            }
        })
        --state.totalActivities
    },
    DELETED_BY_IDX(state, payload){
        state.activities.splice(payload, 1)
        --state.totalActivities
    },
    CLEAR_FORM(state) {
        state.activity = {
            activity_id: '',
            activity_name : '',
            description: '',
            active_flag: '',
        }
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
            url : `/admin/activity?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    getActive( {rootState} ){
        let schoolId = rootState.profiles.selectedSchool
        let header = {
            url : `/admin/activity/active?school_id=${schoolId}`,
            method: 'get'
        }
        return request(header).then( (resp) => {
            return {
                data : resp.map( function (list) {
                    return {
                        activity_id : list.activity_id,
                        activity_name : list.activity_name
                    }
                })
            }
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/activity/save`,
            method: 'post',
            data: { 
                activity : state.activities,
                school_id : rootState.profiles.selectedSchool
            }
        }
        return request(header).then( (resp) => {
            /* if( state.lookup.lookup_id )
                commit('UPDATE_DATA', resp.data)
            else
                commit('PUSH_DATA', resp.data)
            commit('CLEAR_FORM') */
            commit('ASSIGN_DATA', resp)
            return resp
        })
    },
    delete( { commit }, payload ){
        let header = {
            url : `/admin/activity/${payload.activity_id}/delete`,
            method: 'delete'
        }
        // console.log(header)
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.activity_id)
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