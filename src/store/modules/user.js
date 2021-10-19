import {getToken, removeToken, setToken} from "@/main/cookiesJs";
import {getUserInfo, login, logout} from "@/api/user";

const user = {
    state: {
        token: getToken(),
        refreshToken: '',
        tokenType: '',
        username: '',
        userAvatar: ''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_REFRESH_TOKEN: (state, refreshToken) => {
            state.refreshToken = refreshToken;
        },
        SET_TOKEN_TYPE: (state, tokenType) => {
            state.tokenType = tokenType;
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
                    setToken(data.access_token);
                    commit('SET_TOKEN', data.access_token);
                    commit('SET_REFRESH_TOKEN', data.refresh_token);
                    commit('SET_TOKEN_TYPE', data.token_type);
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
                    commit('SET_NAME', '')
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
