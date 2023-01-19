import { createStore } from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Cookies from 'js-cookie'

export default createStore ({
    state: {
        employeeData: null,
    },

    getters: {
        getEmployeDataId: state => state.employeeData.id,
    },

    mutations: {
        getEmployeeData(state, payload) {
            state.employeeData = payload
        },
        setEmployeeDataId(state, id) {
            state.employeeData.id = id
        },
    },


    actions: {
        async getProfile({ commit }) {
            const token = Cookies.get('token');

            await axios
            .get('http://127.0.0.1:8000/api/admin/profile', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                commit("getEmployeeData", response.data)
            })
      }
    }
})