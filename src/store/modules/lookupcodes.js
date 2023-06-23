import request from '@/util/request'

const state = {
    lookupCodes : [],
    lookupCode: {
        lookup_code_id: '',
        lookup_name: '',
        code: '',
        value: '',
        description: '',
        effective_start_date: '',
        effective_end_date: '',
        sequence: ''
    },
    totalLookupCodes: 0,
    totalPageLookupCodes: 0
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.lookupCodes = []
        payload.forEach(function (data) {
            state.lookupCodes.push({
                lookup_code_id: data.lookup_code_id,
                lookup_name: data.lookup_name,
                code: data.code,
                value: data.value,
                description: data.description,
                effective_start_date: data.effective_start_date,
                effective_end_date: data.effective_end_date,
                sequence: data.sequence
            })
        })
        // state.totalLookupCodes = payload.total
        // state.totalPageLookupCodes = payload.last_page
    },
    CLEAR_DATA(state) {
        state.lookupCodes = []
        state.deletedLookupCodes = []
    },
    ASSIGN_FORM(state,payload) {
        state.lookupCode = {
            lookup_code_id: payload.lookup_code_id,
            lookup_name: payload.lookup_name,
            code: payload.code,
            value: payload.value,
            description: payload.description,
            effective_start_date: payload.effective_start_date,
            effective_end_date: payload.effective_end_date,
            sequence: payload.sequence
        }
    },
    PUSH_DATA(state, payload){
        state.lookupCodes.push(payload)
    },
    UPDATE_DATA(state, payload){
        state.lookupCodes.some( function (a) {
            if(a.lookup_code_id === payload.lookup_code_id){
                state.lookupCodes.splice(state.lookupCodes.indexOf(a), 1, payload )
                return true
            }
        })
            
    },
    DELETED_DATA(state){
        state.lookupCodes.some( function (a) {
            if(a.lookup_code_id === state.lookupCode.lookup_code_id){
                state.lookupCodes.splice(state.lookupCodes.indexOf(a), 1)
                return true
            }
        })
    },
    CLEAR_FORM(state) {
        state.lookupCode = {
            lookup_code_id: '',
            lookup_name: '',
            code: '',
            value: '',
            description: '',
            effective_start_date: '',
            effective_end_date: '',
            sequence: ''
        }
    }
}

const getters = {}

const actions = {
    get( { commit }, payload ) {
        let header = {
            url : `/admin/lookup/lookupcode?name=${payload}`
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    getActive( { commit }, payload ) {
        let header = {
            url : `/admin/lookup/lookupcode?name=${payload}`
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    save( { commit, state } ){
        if( state.lookupCode.lookup_code_id )
            commit('UPDATE_DATA', state.lookupCode)
        else
            commit('PUSH_DATA', state.lookupCode)
        commit('CLEAR_FORM')
        return true
    },
    delete( { commit, state } ){
        let header = {
            url : `/admin/lookupcode/${state.lookupCode.lookup_code_id}/delete`,
            method: 'delete'
        }
        console.log(header)
        return request(header).then( (resp) => {
            commit('DELETED_DATA')
            commit('CLEAR_FORM')
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