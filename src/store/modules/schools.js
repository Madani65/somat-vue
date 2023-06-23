import request from '@/util/request'
// import * as dummy from "@/dummy"

const state = {
    schools : [],
    school: {
        school_id: '',
        name: '',
        registration_number: '',
        nis: '',
        nss: '',
        image: '',
        school_level_id: '',
        study_time: '',
        acreditation: '',
        email: '',
        website: '',
        phone_number: '',
        foundation_name: '',
        location_id: '',
        status: '',
        effective_start_date: '',
        effective_end_date: '',
        study_time_status: '',
        school_status: '',
        education_level: '',
        location:''
    },
    totalSchools: 0,
    totalPageSchools: 0
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.schools = payload.data
        // state.totalLookups = payload.total
        // state.totalPageLookups = payload.last_page
    },
    CLEAR_DATA(state) {
        state.schools = []
    },
    ASSIGN_FORM(state,payload) {
        state.school = {
            school_id: payload.school_id,
            name: payload.name,
            registration_number: payload.registration_number,
            nis: payload.nis,
            nss: payload.nss,
            image:payload.image,
            school_level_id: payload.school_level_id,
            study_time: payload.study_time,
            acreditation: payload.acreditation,
            curriculum: payload.curriculum,
            email: payload.email,
            website: payload.website,
            phone_number: payload.phone_number,
            foundation_name: payload.foundation_name,
            location_id: payload.location_id,
            status: payload.status,
            effective_start_date: payload.effective_start_date,
            effective_end_date: payload.effective_end_date,
            study_time_status: payload.study_time_status,
            school_status: payload.school_status,
            education_level: payload.education_level,
            location:payload.location
        }
    },
    PUSH_DATA(state, payload){
        state.schools.push(payload)
    },
    UPDATE_DATA(state, payload){
        state.schools.some( function (a) {
            if(a.school_id === payload.school_id){
                state.schools.splice(state.schools.indexOf(a), 1, payload )
                return true
            }
        })
            
    },
    DELETED_DATA(state){
        state.lookups.some( function (a) {
            if(a.school_id === state.school.school_id){
                state.schools.splice(state.schools.indexOf(a), 1)
                return true
            }
        })
    },
    CLEAR_FORM(state) {
        state.school = {
            school_id: '',
            name: '',
            registration_number: '',
            nis: '',
            nss: '',
            image: '',
            school_level_id: '',
            study_time: '',
            acreditation: '',
            email: '',
            website: '',
            phone_number: '',
            foundation_name: '',
            location_id: '',
            status: '',
            effective_start_date: '',
            effective_end_date: '',
            study_time_status: '',
            school_status: '',
            education_level: '',
            location:''
        }
    }
}

const getters = {}

const actions = {
    get( { commit } ) {
        let header = {
            url : `/admin/school`,
            method: 'get',
        }
        // console.log(header)
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp)
            return resp
        })
    },
    find( { commit }, payload ) {
        let header = {
            url : `/admin/school/${payload}/find`,
            method: 'get',
        }
        // console.log(header)
        return request(header).then( (resp) => {
            commit('ASSIGN_FORM', resp.data)
            commit('locations/ASSIGN_FORM', resp.data.location, { root: true })
            return resp
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/school/save`,
            method: 'post',
            data: { 
                school : state.school,
                location: rootState.locations.location
            }
        }
        // console.log(header)
        return request(header).then( (resp) => {
            if( state.school.school_id )
                commit('profiles/UPDATE_SCHOOL', resp.data, { root: true })
            else
                commit('profiles/PUSH_SCHOOL', resp.data, { root: true })
            // commit('CLEAR_FORM')
            return resp
        })
    },
    delete( { commit, state } ){
        let header = {
            url : `/admin/school/${state.school.school_id}/delete`,
            method: 'delete'
        }
        console.log(header)
        /* return request(header).then( (resp) => {
            commit('DELETED_DATA')
            commit('CLEAR_FORM')
            return resp
        }) */
        commit('DELETED_DATA')
        commit('CLEAR_FORM')
        return true
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}