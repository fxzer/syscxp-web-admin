

import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.cases.APIQueryCaseMsg',
  create: 'com.syscxp.header.website.cases.APICreateCaseMsg',
  delete: 'com.syscxp.header.website.cases.APIDeleteCaseMsg',
  update: 'com.syscxp.header.website.cases.APIUpdateCaseMsg',
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
