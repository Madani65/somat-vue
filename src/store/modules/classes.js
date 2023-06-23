import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    classes: [],
    classRoom: {
        uuid: '',
        class_id: '',
        class_code: '',
        class_name: '',
        auto_class_name: true,
        class_level_id: '',
        class_level: '',
        class_major_id: '',
        major_name: '',
        category_class_id: '',
        active_flag: '',
        updated: true
    },
    totalClasses : 0,
    totalPageClasses: 0,
    beforeSaveClasses: []
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.classes = []
        state.beforeSaveClasses = []
        payload.data.forEach( function(data) {
            state.classes.push({
                uuid: uuid.v1(),
                class_id: data.class_id,
                class_code: data.class_code,
                class_name: data.class_name,
                auto_class_name: false,
                class_level_id: data.class_level_id,
                class_level: data.class_level,
                class_major_id: data.class_major_id,
                major_name: data.major.name,
                category_class_id: data.category_class_id,
                active_flag: data.active_flag,
                updated: false
            })
            state.beforeSaveClasses.push({
                uuid: uuid.v1(),
                class_id: data.class_id,
                class_code: data.class_code,
                class_name: data.class_name,
                auto_class_name: false,
                class_level_id: data.class_level_id,
                class_level: data.class_level,
                class_major_id: data.class_major_id,
                major_name: data.major.name,
                category_class_id: data.category_class_id,
                active_flag: data.active_flag,
                updated: false
            })
        })
        if ('total' in payload) state.totalClasses = payload.total
        if ('last_page' in payload) state.totalPageClasses = payload.last_page
    },
    CLEAR_DATA(state) {
        state.classes = []
    },
    PUSH_BLANK_DATA(state){
        state.classes.push({
            uuid: uuid.v1(),
            class_id: '',
            class_code: '',
            class_name: '',
            auto_class_name: true,
            class_level_id: '',
            class_level: '',
            class_major_id: '',
            major_name: '',
            category_class_id: '',
            active_flag: 'Y',
            updated: true
        })
        ++state.totalClasses
    },
    UPDATE_DATA(state, payload){
        state.classes.filter( function (item) { return item.updated}).some( function (row, idx) {
            state.classes.some( function (a,i) {
                if(a.uuid === row.uuid){
                    state.classes.splice(i, 1, { ...payload.data[idx], updated: false } )
                    if ( i in state.beforeSaveClasses )
                        state.beforeSaveClasses.splice(i, 1, { ...payload.data[idx], updated: false } )
                    else 
                        state.beforeSaveClasses.push( { ...payload.data[idx], updated: false } )
                    return true
                }
            })
        })
    },
    DELETED_DATA(state, payload){
        state.classes.some( function (a) {
            if(a.class_id === payload){
                let idx = state.classes.indexOf(a)
                state.classes.splice(idx, 1)
                return true
            }
        })
        --state.totalMajors
    },
    DELETED_BY_IDX(state, payload){
        state.classes.splice(payload, 1)
        --state.totalClasses
    },
    ASSIGN_FORM(state,payload) {
        state.classRoom = payload
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
            url : `/admin/class?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
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
            url : `/admin/class/active?school_id=${schoolId}`,
            method: 'get'
        }
        return request(header).then( (resp) => {
            return {
                data : resp.map( function (list) {
                    return {
                        class_id : list.class_id,
                        class_name : list.class_name
                    }
                })
            }
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/class/save`,
            method: 'post',
            data: { 
                // class : state.classes,
                class : state.classes.filter( function(item) { return item.updated}),
                school_id : rootState.profiles.selectedSchool
            }
        }
        return request(header).then( (resp) => {
            commit('UPDATE_DATA', resp)
            return resp
        })
    },
    delete( { commit }, payload ){
        let header = {
            url : `/admin/class/${payload.class_id}/delete`,
            method: 'delete'
        }
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.class_id)
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