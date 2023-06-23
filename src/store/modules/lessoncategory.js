import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    lessonCategories : [],
    lessonCategory: {
        lesson_category_id: '',
        name: '',
        description: '',
        active_flag: ''
    },
    totallessonCategories: 0,
    totalPagelessonCategories: 0
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        // state.lessonCategories = payload.data
        state.lessonCategories = []
        payload.data.forEach( function(data) {
            state.lessonCategories.push({
                uuid: uuid.v1(),
                lesson_category_id: data.lesson_category_id,
                name: data.name,
                description: data.description,
                active_flag: data.active_flag,
                updated: false
            })
        })
        if ('total' in payload) state.totallessonCategories = payload.total
        if ('last_page' in payload) state.totalPagelessonCategories = payload.last_page
    },
    CLEAR_DATA(state) {
        state.lessonCategories = []
    },
    ASSIGN_FORM(state,payload) {
        state.lessonCategory = {
            lesson_category_id: payload.lesson_category_id,
            name: payload.name,
            description: payload.description,
            active_flag: payload.active_flag
        }
    },
    PUSH_BLANK_DATA(state){
        state.lessonCategories.push({
            uuid: uuid.v1(),
            lesson_category_id: '',
            name: '',
            description: '',
            active_flag: 'Y',
            updated: true
        })
        ++state.totallessonCategories
    },
    PUSH_DATA(state, payload){
        state.lessonCategories.push(payload)
        ++state.totallessonCategories
    },
    UPDATE_DATA(state, payload){
        state.lessonCategories.some( function (a) {
            if(a.lesson_category_id === payload.lesson_category_id){
                state.lessonCategories.splice(state.lessonCategories.indexOf(a), 1, payload )
                return true
            }
        })
            
    },
    DELETED_DATA(state, payload){
        state.lessonCategories.some( function (a) {
            if(a.lesson_category_id === payload){
                state.lessonCategories.splice(state.lessonCategories.indexOf(a), 1)
                return true
            }
        })
        --state.totallessonCategories
    },
    DELETED_BY_IDX(state, payload){
        state.lessonCategories.splice(payload, 1)
        --state.totallessonCategories
    },
    CLEAR_FORM(state) {
        state.lessonCategory = {
            lesson_category_id: '',
            name: '',
            description: '',
            active_flag: ''
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
            url : `/admin/lessoncategory?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
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
            url : `/admin/lessoncategory?school_id=${schoolId}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp.data
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/lessoncategory/save`,
            method: 'post',
            data: { 
                category : state.lessonCategories,
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
            url : `/admin/lessoncategory/${payload.lesson_category_id}/delete`,
            method: 'delete'
        }
        // console.log(header)
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.lesson_category_id)
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