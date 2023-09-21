import { moment,  duration} from './common';
export function registerComponents(Vue) {
    console.log("[ Vue ]-30", Vue);
}

export function registerFilter(Vue) {
    Vue.filter('date', moment);
    Vue.filter('durationFilter', duration);
    // 统一注册过滤器
    const filters = [
        // {
        //     name: 'accelExportTypeFilter',
        //     constant: ACCEL_EXPORT_TYPE
        // },
    ]

    // 循环注册过滤器
    filters.forEach((filter) => {
        Vue.filter(filter.name, (value) => {
            const text = filter.constant[value];
            return text ? text : value;
        })
    })
}
