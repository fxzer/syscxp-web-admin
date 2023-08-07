import Vue from "vue"
import VueRouter from "vue-router"
import Cookies from "js-cookie"
import routes from './route'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
router.beforeEach((to, from, next) => {
    const sessionId = Cookies.get('sessionid');
    const isAdmin = Cookies.get('accountType') === 'SystemAdmin';
    if(sessionId && isAdmin) {
        next();
    }else {
        if (to.path !== '/login') {
            next({path: '/login'});
        }else {
            next();
        }
    }
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});
export default router
