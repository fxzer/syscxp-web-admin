
import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.history.APIQueryHistoryMsg',
  create: 'com.syscxp.header.website.history.APICreateHistoryMsg',
  batchCreate:'com.syscxp.header.website.history.APIBatchCreateHistoryMsg',
  delete: 'com.syscxp.header.website.history.APIDeleteHistoryMsg',
  update: 'com.syscxp.header.website.history.APIUpdateHistoryMsg',
}

export function createHistory(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function batchCreateHistory(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.batchCreate, data);
}
export function queryHistory(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updateHistory(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function deleteHistory(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, { uuid });
}
