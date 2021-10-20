export default[
    {
        url: '/login',
        type: 'post',
        response: () => {
            return {
                success: true,
                data: {
                    token: 'asdfndsdf1243sdm2l34'
                }
            }
        }
    },

    {
        url: '/logout',
        type: 'get',
        response: () => {
            return {
                success: true,
                data: {}
            }
        }
    },

    {
        url: '/user/info',
        type: 'get',
        response: () => {
            return {
                success: true,
                data: {
                    username: 'Kyle',
                    userAvatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png'
                }
            }
        }
    }
]
