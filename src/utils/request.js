import axios from 'axios';
import { Notification } from 'element-ui';
import Cookies from 'js-cookie';
import { toLogin } from './common';
const firstItem = (obj) => {
    return obj[Object.keys(obj)[0]];
};

const request = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 120000,
});

request.interceptors.request.use(config => {
    if (config.method === 'post' && config.headers['Content-Type'] === 'application/json') {
        const requestObj = config.data;
        const sessionId = Cookies.get('sessionid');
        if (sessionId) {
                const requestApi = firstItem(requestObj);
                requestApi.session = {
                    uuid: sessionId
                }
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

request.interceptors.response.use((response) => {
    if (response.status >= 200 && response.status < 300 || response.status === 304) {
        const res = response.data;
        if (typeof res === 'string') {
            Notification.error({
                title: '请求错误',
                message: res
            });
            return Promise.resolve({ success: false });
        } else {
            if (res.state === 'Processing') {
                return poll(response);
            } else if (res.state === 'Done') {
                const reply = firstItem(JSON.parse(res.result));
                if (!reply.success) {
                    if (reply.error) {
                        if (reply.error.code === 'ID.1000') {
                            Notification.error({
                                title: '登录认证错误',
                                message: reply.error.details
                            });
                        } else if (reply.error.code === 'ID.1001') {
                            Notification.error({
                                title: '请求错误',
                                message: reply.error.details
                            });
                            toLogin();
                        } else if (reply.error.code === 'ID.1002') {
                            Notification.error({
                                title: '权限不足',
                                message: reply.error.details
                            })
                        } else if (reply.error.code !== 'ID.2000') {
                            Notification.error({
                                title: '请求错误',
                                message: reply.error.details
                            })
                        }
                    }
                }
                return reply;
            }else {
                return res;
            }
        }
    } else {
        return response;
    }
}, () => {
    
    return {success: false, message: '服务端错误'};
});

function getUrl(receipt) {
    const suffix = receipt.data.uuid && receipt.config.url.indexOf('/result') === -1 ? '/result/' + receipt.data.uuid : '';
    return receipt.config.url + suffix ;
}

function poll(receipt) {
    const path = getUrl(receipt);
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    }).then(() => {
        return request.get(path);
    });
}

export default request;