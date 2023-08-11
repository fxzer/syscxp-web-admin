
import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.qualification.APIQueryQualificationMsg',
  create: 'com.syscxp.header.website.qualification.APICreateQualificationMsg',
  delete: 'com.syscxp.header.website.qualification.APIDeleteQualificationMsg',
  update: 'com.syscxp.header.website.qualification.APIUpdateQualificationMsg',
}

export function createQualification(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryQualification(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updateQualification(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function deleteQualification(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, { uuid });
}