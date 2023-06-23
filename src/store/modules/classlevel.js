import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    classLevels : [],
    classLevel: {
        class_level_id: '',
        class_level: '',
        description: '',
        active_flag: '',
        order: 0
    },
    totalClassLevels: 0,
    totalPageClassLevels: 0,
    selectedClasslLevel: '',
    beforeSaveClassLevels: []
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.classLevels = []
        state.beforeSaveClassLevels = []
        payload.data.forEach( function(data) {
            state.classLevels.push({
                uuid: uuid.v1(),
                class_level_id: data.class_level_id,
                class_level: data.class_level,
                description: data.description,
                active_flag: data.active_flag,
                order: 0,
                updated: false
            })
            state.beforeSaveClassLevels.push({
                uuid: uuid.v1(),
                class_level_id: data.class_level_id,
                class_level: data.class_level,
                description: data.description,
                active_flag: data.active_flag,
                order: 0,
                updated: false
            })
        })
        if ('total' in payload) state.totalClassLevels = payload.total
        else state.totalClassLevels = payload.data.length
        if ('last_page' in payload) state.totalPageClassLevels = payload.last_page
    },
    CLEAR_DATA(state) {
        state.classLevels = []
    },
    PUSH_BLANK_DATA(state){
        state.classLevels.push({
            uuid: uuid.v1(),
            class_level_id: '',
            class_level: '',
            description: '',
            active_flag: 'Y',
            order: 0,
            updated: true
        })
        ++state.totalClassLevels
    },
    UPDATE_DATA(state, payload){
        state.classLevels.filter( function (item) { return item.updated}).some( function (row, idx) {
            state.classLevels.some( function (a,i) {
                if(a.uuid === row.uuid){
                    state.classLevels.splice(i, 1, { ...payload.data[idx], updated: false } )
                    if ( i in state.beforeSaveClassLevels )
                        state.beforeSaveClassLevels.splice(i, 1, { ...payload.data[idx], updated: false } )
                    else 
                        state.beforeSaveClassLevels.push( { ...payload.data[idx], updated: false } )
                    return true
                }
            })
        })   
    },
    DELETED_DATA(state, payload){
        state.classLevels.some( function (a) {
            if(a.class_level_id === payload){
                let idx = state.classLevels.indexOf(a)
                state.classLevels.splice(idx, 1)
                state.beforeSaveClassLevels.splice(idx, 1)
                return true
            }
        })
        --state.totalClassLevels
    },
    DELETED_BY_IDX(state, payload){
        state.classLevels.splice(payload, 1)
        --state.totalClassLevels
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
        let schoolLevelId = rootState.schoollevel.selectedSchoolLevel.school_level_id
        let header = {
            url : `/admin/classlevel/findBySchoolLevel?school_level_id=${schoolLevelId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    findBySchoolLevel( { commit }, payload ){
        let header = {
            url : `/admin/classlevel/findBySchoolLevel?school_level_id=${payload}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    getActive( { rootState } ){
        let schoolLevelId = rootState.profiles.selectedSchoolLevel
        let header = {
            url : `/admin/classlevel/active?school_level_id=${schoolLevelId}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            // commit('ASSIGN_DATA', resp)
            return { data: resp }
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/classlevel/save`,
            method: 'post',
            data: { 
                // classlevel : state.classLevels,
                classlevel : state.classLevels.filter( function (item) { return item.updated}) ,
                school_level_id : rootState.schoollevel.selectedSchoolLevel.school_level_id
            }
        }
        return request(header).then( (resp) => {
            commit('UPDATE_DATA', resp)
            return resp
        })
    },
    delete( { commit }, payload ){
        let header = {
            url : `/admin/classlevel/${payload.class_level_id}/delete`,
            method: 'delete'
        }
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.class_level_id)
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