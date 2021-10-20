// 组装菜单数据
export const menuData = [
    {
        id: 1,
        title: '员工计件',
        icon: '',
        key: 'staffhome',
        path: '/staffhome',
        children: []
    },
    {
        id: 2,
        title: '管理',
        icon: '',
        key: 'user',
        path: '',
        children: [
            {
                id: 21,
                title: '员工列表',
                icon: '',
                key: 'staff',
                path: '/staff'
            },
            {
                id: 22,
                title: '菜单1-2',
                icon: '',
                key: 'menu12',
                path: '/menu1_2'
            },
            {
                id: 23,
                title: '菜单1-3',
                icon: '',
                key: 'menu13',
                path: '/menu1_3'
            }
        ]
    }
];
