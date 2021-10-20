const getters = {

    // ------------- user
    username: state => state.user.username || '',
    userAvatar: state => state.user.userAvatar || ''
}

export default getters
