import request from '@/util/request'
// import * as dummy from "@/dummy"

const state = {
    lookups : [],
    lookup: {
        lookup_id: '',
        lookup_name: '',
        description: '',
        effective_start_date: '',
        effective_end_date: ''
    },
    totalLookups: 0,
    totalPageLookups: 0
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.lookups = payload.data
        state.totalLookups = payload.total
        state.totalPageLookups = payload.last_page
    },
    CLEAR_DATA(state) {
        state.lookups = []
    },
    ASSIGN_FORM(state,payload) {
        state.lookup = {
            lookup_id: payload.lookup_id,
            lookup_name: payload.lookup_name,
            description: payload.description,
            effective_start_date: payload.effective_start_date,
            effective_end_date: payload.effective_end_date
        }
    },
    PUSH_DATA(state, payload){
        state.lookups.push(payload)
    },
    UPDATE_DATA(state, payload){
        state.lookups.some( function (a) {
            if(a.lookup_id === payload.lookup_id){
                state.lookups.splice(state.lookups.indexOf(a), 1, payload )
                return true
            }
        })
            
    },
    DELETED_DATA(state){
        state.lookups.some( function (a) {
            if(a.lookup_id === state.lookup.lookup_id){
                state.lookups.splice(state.lookups.indexOf(a), 1)
                return true
            }
        })
    },
    CLEAR_FORM(state) {
        state.lookup = {
            lookup_id: '',
            lookup_name: '',
            description: '',
            effective_start_date: '',
            effective_end_date: ''
        }
    }
}

const getters = {}

const actions = {
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
            url : `/admin/lookup?per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        // console.log(header)
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
        /* commit('ASSIGN_DATA', {
            data: dummy.lookups.lookups,
            total: dummy.lookups.lookups.length,
            last_page: 5,
        })
        return true */
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/lookup/save`,
            method: 'post',
            data: { 
                lookup : state.lookup,
                lookupcode : rootState.lookupcodes.lookupCodes
            }
        }
        console.log(header)
        return request(header).then( (resp) => {
            if( state.lookup.lookup_id )
                commit('UPDATE_DATA', resp.data)
            else
                commit('PUSH_DATA', resp.data)
            commit('CLEAR_FORM')
            return resp
        })
        // console.log(this.dispatch('global/getDummyId'))
        // commit('global/IncreaseDummyId', null, {root:true})
        /* if( state.lookup.lookup_id )
            commit('UPDATE_DATA', {
                ...state.lookup,
                lookup_codes : rootState.lookupcodes.lookupCodes
            })
        else
            commit('PUSH_DATA', {
                ...state.lookup,
                id: rootState.global.dummyId,
                lookup_codes : rootState.lookupcodes.lookupCodes
            })
        commit('CLEAR_FORM')
        return true */
    },
    delete( { commit, state } ){
        let header = {
            url : `/admin/lookup/${state.lookup.lookup_id}/delete`,
            method: 'delete'
        }
        // console.log(header)
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