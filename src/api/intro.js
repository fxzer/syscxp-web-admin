
import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/website/api',
  query: 'com.syscxp.header.website.introduction.APIQueryIntroductionMsg',
  update: 'com.syscxp.header.website.introduction.APIUpdateIntroductionMsg',
}

export function queryIntro(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function updateIntro(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
