import { requestWrapper } from './util';
import SHA512 from 'crypto-js/sha512';
const apiUrl = {
    baseUrl: '/account/api',
    query: 'com.syscxp.account.header.account.APIQueryAccountMsg',
    logout: 'com.syscxp.account.header.identity.APILogOutMsg',
    loginByAccount: 'com.syscxp.account.header.identity.APILogInByAccountMsg',
    loginByUser: 'com.syscxp.account.header.identity.APILogInByUserMsg',
    getImageCode: 'com.syscxp.sms.header.APIGetImageCodeMsg',
    querySubUser: 'com.syscxp.account.header.user.APIQueryUserMsg',
    getVerificationCode: "com.syscxp.sms.header.APIGetVerificationCodeMsg",
    validatePhoneCode: "com.syscxp.sms.header.APIValidateVerificationCodeMsg",
    getMailCode: "com.syscxp.sms.header.APIMailCodeSendMsg",
    validateMailCode: "com.syscxp.sms.header.APIValidateMailCodeMsg",
}

export function queryAccount(queryOptions) {
    return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function logout(sessionUuid) {
    return requestWrapper(apiUrl.baseUrl, apiUrl.logout, { sessionUuid });
}


export function loginByAccount(data) {
    const obj = {
        ...data,
        password: SHA512(data.password).toString(),
    };
    return requestWrapper(apiUrl.baseUrl, apiUrl.loginByAccount, obj);
}
export function loginByUser(data) {
    const obj = {
        ...data,
        password: SHA512(data.password).toString(),
    };
    return requestWrapper(apiUrl.baseUrl, apiUrl.loginByUser, obj);
}
export function getImageCode() {
    return requestWrapper(apiUrl.baseUrl, apiUrl.getImageCode, {});
}
//子用户
export function querySubUser(queryOptions) {
    return requestWrapper(apiUrl.baseUrl, apiUrl.querySubUser, queryOptions, true);
}