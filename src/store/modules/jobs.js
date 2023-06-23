import request from '@/util/request'
import { uuid } from 'vue-uuid'

const state = {
    jobs: [],
    job: {
        job_id: '',
        job_name: '',
        description: '',
        grade: '',
        effective_start_date: '',
        effective_end_date: '',
    },
    totalJobs : 0,
    totalPageJobs: 0,
    selectedJob: ''
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.jobs = []
        payload.data.forEach( function(data) {
            state.jobs.push({
                uuid: uuid.v1(),
                job_id: data.job_id,
                position_id: data.position_id,
                job_name: data.job_name,
                description: data.description,
                grade: data.grade,
                effective_start_date: data.effective_start_date,
                effective_end_date: data.effective_end_date,
                updated: false
            })
        })
        if ('total' in payload) state.totalJobs = payload.total
        if ('last_page' in payload) state.totalPageJobs = payload.last_page
    },
    CLEAR_DATA(state) {
        state.jobs = []
    },
    PUSH_BLANK_DATA(state, payload){
        state.jobs.push({
            uuid: uuid.v1(),
            job_id: '',
            position_id: payload,
            job_name: '',
            description: '',
            grade: '',
            effective_start_date: '',
            effective_end_date: '',
            updated: true
        })
        ++state.totalJobs
    },
    DELETED_DATA(state, payload){
        state.jobs.some( function (a) {
            if(a.job_id === payload){
                state.jobs.splice(state.jobs.indexOf(a), 1)
                return true
            }
        })
        --state.totalJobs
    },
    DELETED_BY_IDX(state, payload){
        state.jobs.splice(payload, 1)
        --state.totalJobs
    },
    SET_SELECTED_ITEM(state, payload){
        state.selectedjob = payload
    },
    SET_SELECTED_BLANK(state){
        state.selectedJob = ''
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
        let PosId = rootState.positions.selectedPosition.position_id
        let header = {
            url : `/admin/job/${PosId}/position?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/job/save`,
            method: 'post',
            data: { 
                job : state.jobs,
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
            url : `/admin/job/${payload.job_id}/delete`,
            method: 'delete'
        }
        return request(header).then( (resp) => {
            commit('DELETED_DATA', payload.job_id)
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