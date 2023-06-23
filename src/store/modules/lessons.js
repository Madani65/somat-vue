import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    lessons: [],
    lesson: {
        uuid: '',
        lesson_id: '',
        lesson_category_id: '',
        name: '',
        active_flag: '',
        group_flag: ''
    },
    childLessons: [],
    totalLessons : 0,
    totalPageLessons: 0,
    beforeSaveLessons: []
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.lessons = []
        payload.data.forEach( function(data) {
            state.lessons.push({
                uuid: uuid.v1(),
                lesson_id: data.lesson_id,
                lesson_category_id: data.lesson_category_id,
                name: data.name,
                active_flag: data.active_flag,
                lesson_group: data.lesson,
                group_flag: 'N'
            })
        })
        if ('total' in payload) state.totalLessons = payload.total
        if ('last_page' in payload) state.totalPageLessons = payload.last_page
    },
    CLEAR_DATA(state) {
        state.lessons = []
    },
    CLEAR_FORM(state){
        state.lesson = {
            lesson_id: '',
            lesson_category_id: '',
            name: '',
            active_flag: 'Y',
            group_flag: 'N'
        }

        this.commit('lessons/CLEAR_CHILD')
    },
    CLEAR_CHILD(state){
        state.childLessons = [
            {
                lesson_id: '',
                name: '',
                active_flag: 'Y',
            }
        ]
    },
    ADD_NEW_CHILD(state){
        state.childLessons.push(
            {
                lesson_id: '',
                name: '',
                active_flag: 'Y',
            }
        )
    },
    ASSIGN_FORM(state,payload) {
        if ( payload.lesson_group ) {
            state.lesson = {
                uuid: uuid.v1(),
                lesson_id: payload.lesson_group.lesson_id,
                lesson_category_id: payload.lesson_group.lesson_category_id,
                name: payload.lesson_group.name,
                active_flag: payload.lesson_group.active_flag,
                group_flag: 'Y'
            }

            state.childLessons = [
                {
                    lesson_id: payload.lesson_id,
                    name: payload.name,
                    active_flag: payload.active_flag
                }
            ]
        }
        else
            state.lesson = {
                uuid: uuid.v1(),
                lesson_id: payload.lesson_id,
                lesson_category_id: payload.lesson_category_id,
                name: payload.name,
                active_flag: payload.active_flag,
                group_flag: payload.group_flag
            }
    },
    DELETED_DATA(state, payload){
        state.lessons.some( function (a) {
            if(a.lesson_id === payload){
                let idx = state.lessons.indexOf(a)
                state.lessons.splice(idx, 1)
                return true
            }
        })
        --state.totalLessons
    },
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
            url : `/admin/lesson?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
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
            url : `/admin/lesson/active?school_id=${schoolId}`,
            method: 'get'
        }
        return request(header).then( (resp) => {
            return {
                data : resp.map( function (list) {
                    return {
                        lesson_id : list.lesson_id,
                        lesson_name : list.lesson_name
                    }
                })
            }
        })
    },
    save( { /* commit, */ state, rootState } ){
        let header = {
            url : `/admin/lesson/save`,
            method: 'post',
            data: {
                lesson : state.lesson,
                group: state.childLessons,
                school_id : rootState.profiles.selectedSchool
            }
        }
        return request(header).then( (resp) => {
            // commit('UPDATE_DATA', resp)
            return resp
        })
    },
    delete( { commit }, payload ){
        let header = {
            url : `/admin/lesson/${payload.lesson_id}/delete`,
            method: 'delete'
        }
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.lesson_id)
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