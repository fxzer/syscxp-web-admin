
import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.paper.APIQueryPaperMsg',
  create: 'com.syscxp.header.website.paper.APICreatePaperMsg',
  delete: 'com.syscxp.header.website.paper.APIDeletePaperMsg',
  update: 'com.syscxp.header.website.paper.APIUpdatePaperMsg',
}

export function createPaper(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryPaper(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updatePaper(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function deletePaper(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, { uuid });
}

