import router from "@/router/router";
import {getToken} from "@/main/cookiesJs";
import store from "@/store/store";
import {Message} from "element-ui";

const TITLE = 'JD';
const whiteList = ['/login', '/register'];

router.beforeEach((to, from, next) => {
    /** 设置页面标题 **/
    let title = TITLE;
    if (to.meta.params) {
        title = `${to.meta.title}: ${to.params[to.meta.params] || ''} - ${TITLE}`
    } else {
        title = `${to.meta.title} - ${TITLE}`
    }
    document.title = title;

    /** 需要判断是否已经登录 **/
    if (getToken()) {
        if (to.path === '/login') {
            next('/');
        } else {
            // todo 已经登录，没有路由权限时
            if (!store.getters.username) {
                store.dispatch('getUserInfo').then(() => {
                    next({...to, replace: true});
                }).catch(err => {
                    Message.error(err);
                })
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 存在免登陆白名单中
            next();
        } else {
            next(`/login?redirect=${to.fullPath}`);
        }
    }
})
