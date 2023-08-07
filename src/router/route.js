import store from '../store'
import hideRoutes from './hideRoutes.js'
const routes = []
store.state.leftMenuList.forEach(item => {
    if (item.subMenu) {
        item.subMenu.forEach(sub => {
            if (!sub.isDivider) {
                routes.push({
                    name: sub.name,
                    path: sub.path,
                    component: () =>
                        import('@/' + sub.componentPath),
                    meta: {
                        title: sub.label,
                        account: sub.account,
                    }
                });
            }
        });
    } else {
        routes.push({
            name: item.name,
            path: item.path,
            component: () =>
                import('@/' + item.componentPath),
            meta: {
                title: item.label,
                account: item.account,
            }
        });
    }
});
const firstPath = routes[0].path;

routes.push(...hideRoutes);
routes.push({
    path: '/',
    redirect: firstPath
});
routes.push({
    path: '*',
    redirect: firstPath
});

export default routes;