import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    lessonTimes: {
        study: [],
        extra: []
    },
    lessonTime: {
        lesson_time_id: '',
        start_time : '',
        end_time : '',
        study_time : '',
        active_flag: '',
        category_code: ''
    },
    totalLessonTimes: {
        study: 0,
        extra: 0
    },
    totalPageLessonTimes: {
        study: 0,
        extra: 0
    },
    studyTime: [
        {value: 'P', text: 'Pagi'},
        {value: 'S', text: 'Siang'},
    ]
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        // state.lessonCategories = payload.data
        state.lessonTimes[`${payload.type}`] = []
        payload.data.forEach( function(data) {
            state.lessonTimes[`${payload.type}`].push({
                uuid: uuid.v1(),
                lesson_time_id: data.lesson_time_id,
                start_time: data.start_time,
                end_time: data.end_time,
                study_time: data.study_time,
                active_flag: data.active_flag,
                category_code: data.category_code,
                updated: false
            })
        })
        if ('total' in payload) state.totalLessonTimes[`${payload.type}`] = payload.total
        if ('last_page' in payload) state.totalPageLessonTimes[`${payload.type}`] = payload.last_page
    },
    CLEAR_DATA(state, payload) {
        state.lessonTimes[`${payload}`] = []
    },
    ASSIGN_FORM(state,payload) {
        state.lessonTime = {
            lesson_time_id: payload.lesson_time_id,
            start_time: payload.start_time,
            end_time: payload.end_time,
            study_time: payload.study_time,
            active_flag: payload.active_flag,
            category_code: payload.category_code
        }
    },
    PUSH_BLANK_DATA(state, payload){
        state.lessonTimes[`${payload}`].push({
            uuid: uuid.v1(),
            lesson_time_id: '',
            start_time : '',
            end_time : '',
            study_time : '',
            active_flag: 'Y',
            category_code: payload == 'study' ? 'P':'E',
            updated: true
        })
        ++state.totalLessonTimes[`${payload}`]
    },
    PUSH_DATA(state, payload){
        state.lessonTimes[`${payload.type}`].push(payload.data)
        ++state.totalLessonTimes[`${payload.type}`]
    },
    UPDATE_DATA(state, payload){
        state.lessonTimes[`${payload.type}`].some( function (a) {
            if(a.lesson_time_id === payload.lesson_time_id){
                state.lessonTimes[`${payload.type}`].splice(state.lessonTimes[`${payload.type}`].indexOf(a), 1, payload.data )
                return true
            }
        })
            
    },
    DELETED_DATA(state, payload){
        state.lessonTimes[`${payload.type}`].some( function (a) {
            if(a.lesson_time_id === payload.lesson_time_id){
                state.lessonTimes[`${payload.type}`].splice(state.lessonTimes[`${payload.type}`].indexOf(a), 1)
                return true
            }
        })
        --state.totalLessonTimes[`${payload.type}`]
    },
    DELETED_BY_IDX(state, payload){
        state.lessonTimes[`${payload.type}`].splice(payload.index, 1)
        --state.totalLessonTimes[`${payload.type}`]
    },
    CLEAR_FORM(state) {
        state.lessonTime = {
            lesson_time_id: '',
            start_time : '',
            end_time : '',
            study_time : '',
            active_flag: '',
            category_code: ''
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
        let type = payload.type == 'study' ? 'P' : 'E'
        let header = {
            url : `/admin/lessontime/${type}?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', {
                ...resp.data,
                type: payload.type
            })
            return resp
        })
    },
    getNoPaging({ rootState }, payload){
        let schoolId = rootState.profiles.selectedSchool
        let header = {
            url : `/admin/lessontime/${payload}?school_id=${schoolId}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            return {
                data : resp.data.data.map( function (list) {
                    return {
                        lesson_time_id: list.lesson_time_id,
                        lesson_time_title : list.start_time.substring(0,5)+' - '+list.end_time.substring(0,5)
                    }
                })
            }
        })
    },
    save( { commit, state, rootState }, payload ){
        let header = {
            url : `/admin/lessontime/save`,
            method: 'post',
            data: { 
                lessontime : state.lessonTimes[payload],
                school_id : rootState.profiles.selectedSchool
            }
        }
        return request(header).then( (resp) => {
            /* if( state.lookup.lookup_id )
                commit('UPDATE_DATA', resp.data)
            else
                commit('PUSH_DATA', resp.data)
            commit('CLEAR_FORM') */
            commit('ASSIGN_DATA', {
                ...resp,
                type: payload
            })
            return resp
        })
    },
    delete( { commit }, payload ){
        let header = {
            url : `/admin/lessontime/${payload.lesson_time_id}/delete`,
            method: 'delete'
        }
        // console.log(header)
        return request(header).then( (resp) => {
            commit('DELETED_DATA', {
                ...payload,
                type: payload.type
            })
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