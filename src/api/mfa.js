import { requestWrapper } from './util';
const apiUrl = {
    requestUrl: '/account/api',
    getAccountMfaInfo: 'com.syscxp.account.header.account.APIGetAccountMFADetailMsg',
    validateMfa: 'com.syscxp.account.header.account.APIValidateMFAFrontMsg',
    updateAccountMfa: 'com.syscxp.account.header.account.APIUpdateAccountMFAMsg',
    queryAccountGa: 'com.syscxp.account.header.account.APIQueryAccountGAMsg',
    bindGa: 'com.syscxp.account.header.account.APIBindGAMsg',
    unbindGa: 'com.syscxp.account.header.account.APIUnBindGAMsg',
    getGa: 'com.syscxp.account.header.user.APIGetGAMsg',
    getPhoneCode: 'com.syscxp.sms.header.APIGetVerificationCodeMsg',
};

export function getAccountMfaInfo(data) {
    return requestWrapper(apiUrl.requestUrl, apiUrl.getAccountMfaInfo, data);
}
export function validateMfa(data) {
    return requestWrapper(apiUrl.requestUrl, apiUrl.validateMfa, data);
}
export function updateAccountMfa(data) {
    return requestWrapper(apiUrl.requestUrl, apiUrl.updateAccountMfa, data);
}

export function queryAccountGa(queryOptions) {
    return requestWrapper(apiUrl.requestUrl, apiUrl.queryAccountGa, queryOptions, true);
}
export function bindGa(data) {
    return requestWrapper(apiUrl.requestUrl, apiUrl.bindGa, data);
}
export function unbindGa(data) {
    return requestWrapper(apiUrl.requestUrl, apiUrl.unbindGa, data);
}
export function getGa(data) {
    return requestWrapper(apiUrl.requestUrl, apiUrl.getGa, data);
}
export function getPhoneCode(data) {
    return requestWrapper(apiUrl.requestUrl, apiUrl.getPhoneCode, data);
}