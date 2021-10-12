import Vue from 'vue';
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";
import Root from "@/Root";


Vue.use(VueRouter);

const staticRoutes = [
    {
        path: '/',
        redirect: {
            name: 'home'
        },
        component: Root,
        children: [
            {
                path: '/home',
                component: Home,
                name: 'home',
                meta: {
                    title: '首页'
                }
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录'
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
