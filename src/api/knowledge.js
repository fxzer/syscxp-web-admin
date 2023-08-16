

import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.knowledge.APIQueryKnowledgeMsg',
  create: 'com.syscxp.header.website.knowledge.APICreateKnowledgeMsg',
  delete: 'com.syscxp.header.website.knowledge.APIDeleteKnowledgeMsg',
  update: 'com.syscxp.header.website.knowledge.APIUpdateKnowledgeMsg',
}

export function createKnowledge(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryKnowledge(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updateKnowledge(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}

export function deleteKnowledge(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, { uuid });
}
