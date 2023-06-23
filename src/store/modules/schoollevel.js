import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    schoolLevels : [],
    schoolLevel: {
        school_level_id: '',
        name: '',
        description: '',
        active_flag: ''
    },
    totalSchoolLevels: 0,
    totalPageSchoolLevels: 0,
    selectedSchoolLevel: {},
    beforeSaveSchoolLevels: []
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.schoolLevels = []
        state.beforeSaveSchoolLevels = []
        payload.data.forEach( function(data) {
            state.schoolLevels.push({
                uuid: uuid.v1(),
                school_level_id: data.school_level_id,
                name: data.name,
                description: data.description,
                active_flag: data.active_flag,
                updated: false
            })
            state.beforeSaveSchoolLevels.push({
                uuid: uuid.v1(),
                school_level_id: data.school_level_id,
                name: data.name,
                description: data.description,
                active_flag: data.active_flag,
                updated: false
            })
        })
        if ('total' in payload) state.totalSchoolLevels = payload.total
        if ('last_page' in payload) state.totalPageSchoolLevels = payload.last_page
    },
    CLEAR_DATA(state) {
        state.schoolLevels = []
    },
    PUSH_BLANK_DATA(state){
        state.schoolLevels.push({
            uuid: uuid.v1(),
            school_level_id: '',
            name: '',
            description: '',
            active_flag: 'Y',
            updated: true
        })
        ++state.totalSchoolLevels
    },
    ASSIGN_FORM(state, payload) {
        state.schoolLevel = {
            school_level_id: payload.school_level_id,
            name: payload.name,
            description: payload.description,
            active_flag: payload.active_flag
        }
    },
    UPDATE_DATA(state, payload){
        state.schoolLevels.filter( function (item) { return item.updated}).some( function (row, idx) {
            state.schoolLevels.some( function (a,i) {
                if(a.uuid === row.uuid){
                    state.schoolLevels.splice(i, 1, { ...payload.data[idx], updated: false } )
                    if ( i in state.beforeSaveSchoolLevels )
                        state.beforeSaveSchoolLevels.splice(i, 1, { ...payload.data[idx], updated: false } )
                    else 
                        state.beforeSaveSchoolLevels.push( { ...payload.data[idx], updated: false } )
                    return true
                }
            })
        })
            
    },
    DELETED_DATA(state, payload){
        state.schoolLevels.some( function (a) {
            if(a.school_level_id === payload){
                let idx = state.schoolLevels.indexOf(a)
                state.schoolLevels.splice(idx, 1)
                state.beforeSaveSchoolLevels.splice(idx, 1)
                return true
            }
        })
        --state.totalSchoolLevels
    },
    DELETED_BY_IDX(state, payload){
        state.schoolLevels.splice(payload, 1)
        --state.totalSchoolLevels
    },
    SET_SELECTED_ITEM(state, payload){
        state.selectedSchoolLevel = payload
    },
    SET_SELECTED_BLANK(state){
        state.selectedSchoolLevel = ''
    },
    CLEAR_FORM(state) {
        state.schoolLevel = {
            school_level_id: '',
            name: '',
            description: '',
            active_flag: ''
        }
    }
}

const getters = {}

const actions = {
    getAll(){
        let header = {
            url : `/admin/schoollevel`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            return resp
        })
    },
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
        let header = {
            url : `/admin/schoollevel?per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    getActive() {
        let header = {
            url : `/admin/schoollevel/active`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            // commit('ASSIGN_DATA', resp)
            return resp
        })
    },
    save( { commit, state } ){
        let header = {
            url : `/admin/schoollevel/save`,
            method: 'post',
            data: { 
                //schoollevel : state.schoolLevels
                schoollevel : state.schoolLevels.filter( function (item) { return item.updated}) 
            }
        }
        return request(header).then( (resp) => {
            commit('UPDATE_DATA', resp)
            return resp
        })
    },
    delete( { commit }, payload ){
        let header = {
            url : `/admin/schoollevel/${payload.school_level_id}/delete`,
            method: 'delete'
        }
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.school_level_id)
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