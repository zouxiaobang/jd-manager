export default [
    {
        url: '/product/list',
        type: 'get',
        response: () => {
            return {
                success: true,
                data: [
                    {
                        id: 0,
                        name: 'k-986',
                        desc: '基带11'
                    },
                    {
                        id: 1,
                        name: 'f-69',
                        desc: '基带24'
                    },
                    {
                        id: 2,
                        name: '蛋糕',
                        desc: '基带21'
                    },
                    {
                        id: 3,
                        name: 'm-ssfo'
                    },
                    {
                        id: 4,
                        name: '西红柿'
                    }
                ]
            }
        }
    }
]
