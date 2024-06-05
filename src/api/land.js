
import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.banner.APIQueryLandMsg',
  create: 'com.syscxp.header.website.banner.APICreateLandMsg',
  delete: 'com.syscxp.header.website.banner.APIDeleteLandMsg',
  update: 'com.syscxp.header.website.banner.APIUpdateLandMsg',
  createDetails: 'com.syscxp.header.website.banner.APICreateLandDetailsMsg',
  updateDetails: 'com.syscxp.header.website.banner.APIUpdateLandDetailsMsg',
  deleteDetails: 'com.syscxp.header.website.banner.APIDeleteLandDetailsMsg',
  queryDetails: 'com.syscxp.header.website.banner.APIQueryLandDetailsMsg',

}

export function createLand(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryLand(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updateLand(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function deleteLand(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, { uuid });
}

export function createDetails(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.createDetails, data);
}
export function queryDetails(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryDetails, queryOptions, true);
}
export function updateDetails(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.updateDetails, data);
}
export function deleteDetails(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.deleteDetails, { uuid });
}

