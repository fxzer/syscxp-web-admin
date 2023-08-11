
import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.banner.APIQueryBannerMsg',
  create: 'com.syscxp.header.website.banner.APICreateBannerMsg',
  delete: 'com.syscxp.header.website.banner.APIDeleteBannerMsg',
  update: 'com.syscxp.header.website.banner.APIUpdateBannerMsg',
}

export function createBanner(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryBanner(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updateBanner(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function deleteBanner(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.delete, { uuid });
}

