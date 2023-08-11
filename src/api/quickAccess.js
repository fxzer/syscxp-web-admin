import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.access.APIQueryQuickAccessMsg',
  create: 'com.syscxp.header.website.access.APICreateQuickAccessMsg',
  querySolution:'com.syscxp.header.website.solution.APIQuerySolutionMsg',
  delete: 'com.syscxp.header.website.access.APIDeleteQuickAccessMsg',
  update: 'com.syscxp.header.website.access.APIUpdateQuickAccessMsg',
}


export function createQuickAccess(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryQuickAccess(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function querySolution(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.querySolution, queryOptions, true);
}
export function updateQuickAccess(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function deleteQuickAccess(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, {uuid});
}

