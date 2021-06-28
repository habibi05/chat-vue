import axios from 'axios'
import { createStore } from 'vuex'

const API_URL = 'http://localhost:8000/api/';


const store = createStore({
    state() {
        const parse = JSON.parse(localStorage.getItem('user'));
        const token = parse ? parse.token : '';
        const person = parse ? parse.user : '';
        return {
            status: '',
            token: token,
            user: person,
            users: {},
            chat: [],
            isConnected: false,
            socketMessage: ''
        }
    },
    getters: {
        allUsers: (state) => state.users,
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: API_URL + 'signin', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        localStorage.setItem('user', JSON.stringify(resp.data));
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },

        logout() {
            localStorage.removeItem('user');
        },

        getUsers({ commit, state }) {
            axios.get(API_URL + 'users', {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
                .then(response => {
                    commit('set_users', response.data.data)
                })
        },

        detailChat({ commit, state }, id) {
            axios.get(API_URL + 'chat/' + state.user.id + '/' + id, {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
                .then(response => {
                    commit('set_chat', { id: id, chat: response.data.data })
                })
        },

        sendMessage({ state, commit }, data) {
            axios({
                url: API_URL + 'chat/' + state.user.id + '/' + data.id_user_receiver,
                data: data,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
                .then(response => {
                    commit('add_chat_sender', response.data.data)
                })
        },

        AddMessage({ commit }, data) {
            commit('add_chat_receiver', data)
        }
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        set_users(state, users) {
            state.users = users
        },
        set_chat(state, { id, chat }) {
            const data = {
                'id': parseInt(id),
                'data': [chat]
            }
            state.chat.push(data)
        },
        add_chat_sender(state, chat) {
            const find = state.chat.findIndex((item) => item.id === chat.id_user_receiver)
            state.chat[find].data[0].push(chat)
        },
        add_chat_receiver(state, chat) {
            const find = state.chat.findIndex((item) => item.id === chat.id_user_sender)
            state.chat[find].data[0].push(chat)
        },
    }
})

export default store;