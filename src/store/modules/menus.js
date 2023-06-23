// import request from '@/util/request'
import * as dummy from "@/dummy"

const state = {
    menus : [],
    menu: {
        id: '',
        parent_id: '',
        title: '',
        icon: '',
        path: '',
        permission: []
    }
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.menus = payload
    },
    CLEAR_DATA(state) {
        state.menus = []
    },
    ASSIGN_FORM(state,payload) {
        state.menu = {
            id: payload.id,
            parent_id: payload.parent_id,
            title: payload.title,
            icon: payload.icon,
            path: payload.path,
            permission: payload.permission
        }
    },
    PUSH_DATA(state, payload){
        state.menus.push(payload)
    },
    UPDATE_DATA(state){
        state.menus.some( function (a) {
            if(a.id === state.menu.id){
                state.menus.splice(state.menus.indexOf(a), 1, state.menu)
                return true
            }
        })
            
    },
    DELETED_DATA(state){
        state.menus.some( function (a) {
            if(a.id === state.menu.id){
                state.menus.splice(state.menus.indexOf(a), 1)
                return true
            }
        })
    },
    CLEAR_FORM(state) {
        state.menu = {
            id: '',
            parent_id: '',
            title: '',
            icon: '',
            path: '',
            permission: []
        }
    }
}

const getters = {
    getChild: state => key => {
        return state.menus.filter(function (menu) { return menu.parent_id == key || ( key == false && menu.parent_id == null ) })
    },
    getParentChild: (state, getters) => {
        return getters.getChild(false).map( (row) => {
            let child = getters.getChild(row.id).map( (mid) => {
                return {
                    ...mid,
                    children : getters.getChild(mid.id)
                }
            })
            return {
                ...row,
                children : child
            }
        })
    },
    getParent: (state, getters) => {
        let data = []
        getters.getChild(false).forEach( (row) => {
            data.push({
                ...row,
                level:0
            })
            getters.getChild(row.id).forEach( (mid) => {
                data.push({
                    ...mid,
                    level:1
                })
            })
        })
        return data
    }
}

const actions = {
    get( { commit } ) {
        let header = {
            url : `/admin/menu`,
            method: 'get',
        }
        console.log(header)
        /* return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        }) */
        commit('ASSIGN_DATA', dummy.menu.listMenu)
        return true
    },
    save( { commit, state, rootState } ){
        let header = {
            url : `/admin/menu/save`,
            method: 'post',
            data: { 'menu' : state.menu }
        }
        console.log(header)
        /* return request().then( (resp) => {
            commit('CLEAR_FORM')
            return resp
        }) */
        // console.log(this.dispatch('global/getDummyId'))
        commit('global/IncreaseDummyId', null, {root:true})
        if( state.menu.id )
            commit('UPDATE_DATA')
        else
            commit('PUSH_DATA', {
                ...state.menu,
                id: rootState.global.dummyId
            })
        commit('CLEAR_FORM')
        return true
    },
    delete( { commit, state } ){
        let header = {
            url : `/admin/menu/${state.menu.id}/delete`,
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