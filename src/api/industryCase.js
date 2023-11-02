

import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.type.APIQueryTypeMsg',
  create: 'com.syscxp.header.website.type.APICreateTypeMsg',
  delete: 'com.syscxp.header.website.type.APIDeleteTypeMsg',
  update: 'com.syscxp.header.website.type.APIUpdateTypeMsg',
  queryTypeList:'com.syscxp.header.website.type.APIQueryTypeListMsg'
}

export function createCase(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryCase(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updateCase(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function deleteCase(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, { uuid });
}
export function queryTypeList() {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryTypeList, {  });
}

