export default [
    {
        url: '/staff/list/introduction',
        type: 'get',
        response: () => {
            return {
                success: true,
                data: [
                    {
                        id: 0,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '张三'
                    },
                    {
                        id: 1,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '李四'
                    },
                    {
                        id: 2,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '王五'
                    },
                    {
                        id: 3,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '张三1'
                    },
                    {
                        id: 4,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '赵六'
                    },
                    {
                        id: 5,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '是否'
                    },
                    {
                        id: 6,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '阿斯蒂芬'
                    },
                    {
                        id: 7,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '测试的'
                    },
                    {
                        id: 8,
                        avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                        name: '插上电'
                    },
                ]
            }
        }
    },

    {
        url: '/staff/info/0',
        type: 'get',
        response: () => {
            return{
                success: true,
                data: {
                    id: 0,
                    avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                    name: '张三',
                    phone: '15513298436',
                    onboardingTime: '2020-03-15',
                    status: true,
                    statusDesc: '在职',
                    workTime: 19,
                    roles: [
                        {
                            role: 'Admin',
                            roleCn: '管理员'
                        }
                    ]
                }
            }
        }
    },
    {
        url: '/staff/info/1',
        type: 'get',
        response: () => {
            return{
                success: true,
                data: {
                    id: 1,
                    avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                    name: '李四',
                    phone: '15513298436',
                    onboardingTime: '2020-03-15',
                    status: false,
                    statusDesc: '离职',
                    workTime: 19,
                    roles: [
                        {
                            role: 'Finance',
                            roleCn: '财务人员'
                        },
                        {
                            role: 'Counter',
                            roleCn: '计数员'
                        }
                    ]
                }
            }
        }
    },
    {
        url: '/staff/info/2',
        type: 'get',
        response: () => {
            return{
                success: true,
                data: {
                    id: 2,
                    avatar: 'https://s2.ax1x.com/2020/01/17/1SCadg.png',
                    name: '王五',
                    phone: '15513298436',
                    onboardingTime: '2020-03-15',
                    status: false,
                    statusDesc: '在职',
                    workTime: 19,
                    roles: []
                }
            }
        }
    },
    {
        url: '/staff/info/3',
        type: 'get',
        response: () => {
            return{
                success: true,
                data: null,
                message: '未找到该员工'
            }
        }
    },

    {
        url: '/staff/product/work',
        type: 'post',
        response: () => {
            return {
                success: true,
                data: null
            }
        }
    }
]
