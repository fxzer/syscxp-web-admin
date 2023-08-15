

import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.news.APIQueryNewsMsg',
  create: 'com.syscxp.header.website.news.APICreateNewsMsg',
  delete: 'com.syscxp.header.website.news.APIDeleteNewsMsg',
  update: 'com.syscxp.header.website.news.APIUpdateNewsMsg',
}

export function createNews(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryNews(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updateNews(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function deleteNews(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, { uuid });
}