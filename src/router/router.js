import Vue from 'vue';
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";
import Root from "@/Root";
import StaffHome from "@/views/StaffHome";
import Staff from "@/views/Staff";
import StaffCount from "@/views/StaffCount";


Vue.use(VueRouter);

export const staticRoutes = [
    {
        path: '/',
        redirect: {
            name: 'home'
        },
        name: 'root',
        component: Root,
        children: [
            {
                path: '/home',
                component: Home,
                name: 'home',
                meta: {
                    title: '首页',
                    isFather: true
                },
                redirect: {
                    name: 'staffHome'
                },
                children: [
                    {
                        path: '/staffhome',
                        name: 'staffHome',
                        component: StaffHome,
                        meta: {
                            title: '员工计件平台',
                            isFather: true
                        }
                    },
                    {
                        path: '/staff',
                        name: 'staff',
                        component: Staff,
                        meta: {
                            title: '员工列表',
                            isFather: true
                        }
                    },
                    {
                        path: '/staff/count/:staffId',
                        name: 'staffCount',
                        component: StaffCount,
                        meta: {
                            title: '员工计件',
                            father: 'home',
                            params: 'staffId'
                        }
                    }
                ]
            }
        ],
        meta: {
            isFather: true
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            title: '登录',
            isFather: true
        }
    }
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject){
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch(err => err);
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: staticRoutes
})

export default router
