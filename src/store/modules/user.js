import {getToken, removeToken, setToken} from "@/main/cookiesJs";
import {getUserInfo, login, logout} from "@/api/user";
import store from "@/store/store";

const user = {
    state: {
        token: getToken(),
        username: '',
        userAvatar: ''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, username) => {
            state.username = username;
        },
        SET_AVATAR: (state, userAvatar) => {
            state.userAvatar = userAvatar;
        }
    },

    actions: {
        // 登录
        signIn({commit}, userForm) {
            let username = userForm.username;
            let password = userForm.password;
            return new Promise((resolve, reject) => {
                login(username, password).then(data => {
                    setToken(data.token);
                    commit('SET_TOKEN', data.token);
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            })
        },

        // 获取用户信息
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(data => {
                    let username = data.username;
                    let avatar = data.userAvatar;

                    commit('SET_NAME', username);
                    commit('SET_AVATAR', avatar);
                    console.log(store.state.username);
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        // 登出
        signOut({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_USERNAME', '')
                    commit('SET_AVATAR', '')
                    removeToken()
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default user;
