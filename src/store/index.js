import Vue from "vue"
import Vuex from "vuex"
import { logout } from '../api/account';
import leftMenuList from './leftMenuList'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        leftMenuOpen: true,
        userName: 'admin',
        accountUuid: '',
        sessionid: '',
        searchAccount: null,
        pageOptions: {
            background: true,
            layout: 'prev, pager, next, jumper, sizes, total',
            pageSizes: [10, 15,20, 30, 50, 100]
        },
        headerCellLayout: { textAlign: 'center', padding: '8px 0', color: '#505050', backgroundColor: '#F5F7FA' },
        headerCellBg: { textAlign: 'center', backgroundColor: '#F5F7FA' },
        cellLayout: { textAlign: 'center', padding: '6px 0' },
        leftMenuList ,
    },

    getters: {},

    mutations: {
        setSearchAccount(state, val) {
            state.searchAccount = val;
        },
        toggleLeftMenu(state, val) {
            state.leftMenuOpen = val;
        },
        setUserName(state, name) {
            state.userName = name;
        },
        setAccountUuid(state, uuid) {
            state.accountUuid = uuid;
        },
        setSessionId(state, uuid) {
            state.sessionid = uuid;
        }
    },
    actions: {
        logout({ commit, state }) {
            return logout(state.sessionid).then((res) => {
                if (res.success) {
                    commit('setUserName', '');
                    commit('setAccountUuid', '');
                    commit('setSessionId', '');
                    return true;
                }else {
                    return false;
                }
            });
        }
    },
    modules: {
    },
})