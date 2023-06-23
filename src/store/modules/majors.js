import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    majors: [],
    major: {
        class_major_id: '',
        major_code: '',
        name: '',
        description: '',
        active_flag: '',
    },
    totalMajors : 0,
    totalPageMajors: 0,
    beforeSaveMajors: []
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.majors = []
        state.beforeSaveMajors = []
        payload.data.forEach( function(data) {
            state.majors.push({
                uuid: uuid.v1(),
                class_major_id: data.class_major_id,
                major_code: data.major_code,
                name: data.name,
                description: data.description,
                active_flag: data.active_flag,
                updated: false
            })
            state.beforeSaveMajors.push({
                uuid: uuid.v1(),
                class_major_id: data.class_major_id,
                major_code: data.major_code,
                name: data.name,
                description: data.description,
                active_flag: data.active_flag,
                updated: false
            })
        })
        if ('total' in payload) state.totalMajors = payload.total
        if ('last_page' in payload) state.totalPageMajors = payload.last_page
    },
    CLEAR_DATA(state) {
        state.majors = []
    },
    PUSH_BLANK_DATA(state){
        state.majors.push({
            uuid: uuid.v1(),
            class_major_id: '',
            major_code: '',
            name: '',
            description: '',
            active_flag: 'Y',
            updated: true
        })
        ++state.totalJobs
    },
    DELETED_DATA(state, payload){
        state.majors.some( function (a) {
            if(a.class_major_id === payload){
                let idx = state.majors.indexOf(a)
                state.majors.splice(idx, 1)
                state.beforeSaveMajors.splice(idx, 1)
                return true
            }
        })
        --state.totalMajors
    },
    DELETED_BY_IDX(state, payload){
        state.majors.splice(payload, 1)
        --state.totalMajors
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
            url : `/admin/classmajor?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    getActive( { commit, rootState } ){
        let schoolId = rootState.profiles.selectedSchool
        let header = {
            url : `/admin/classmajor/active?school_id=${schoolId}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp)
            return resp
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/classmajor/save`,
            method: 'post',
            data: { 
                classmajor : state.majors,
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
            url : `/admin/classmajor/${payload.class_major_id}/delete`,
            method: 'delete'
        }
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.class_major_id)
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