import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/hybridwan/api',
  create: 'com.syscxp.header.hybridwan.site.APICreateSiteMsg',
  query: 'com.syscxp.header.hybridwan.site.APIQuerySiteMsg',
  queryArea: 'com.syscxp.header.hybridwan.site.APIQueryAreaMsg',
  remove: 'com.syscxp.header.hybridwan.site.APIDeleteSiteMsg',
  update: 'com.syscxp.header.hybridwan.site.APIUpdateSiteMsg',
  changeBandwidth: 'com.syscxp.header.hybridwan.site.APIChangeSiteBandwidthMsg',
  enabledSiteHa: 'com.syscxp.header.hybridwan.site.APIEnableSiteHaMsg',
  changeHaToMaster: 'com.syscxp.header.hybridwan.cpe.APIChangeCpeRoleToMasterMsg',
  changeHaToSlave: 'com.syscxp.header.hybridwan.cpe.APIChangeCpeRoleToSlaveMsg',
  bindCpe: 'com.syscxp.header.hybridwan.site.APISiteBindingCpeMsg',
  unbindCpe: 'com.syscxp.header.hybridwan.site.APISiteUnboundCpeMsg',
  querySiteVpe: 'com.syscxp.header.hybridwan.site.APIQuerySiteVpePoolMsg',
  selectSiteVpe: 'com.syscxp.header.hybridwan.site.APISiteSelectVpePoolMsg',
  queryCpePreConfig: 'com.syscxp.header.hybridwan.site.APIQuerySiteCpePreconfigMsg',
  queryCpeLinkPreConfig: 'com.syscxp.header.hybridwan.site.APIQuerySiteCpeLinkPreconfigMsg',
  queryAvailableSite:'com.syscxp.header.hybridwan.site.APIListAvailableSiteMsg',
  queryHubConfig:'com.syscxp.header.hybridwan.site.APIQueryHubConfigMsg',
}


export function createSite(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.create, data);
}
export function queryAvailableSite(hybridwanNetworkUuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryAvailableSite,  {hybridwanNetworkUuid}  );
}
export function querySite(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function selectSiteVpe(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.selectSiteVpe, data);
}
export function querySiteVpe(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.querySiteVpe, queryOptions, true);
}
export function queryCpePreConfig(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryCpePreConfig, queryOptions, true);
}
export function queryCpeLinkPreConfig(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryCpeLinkPreConfig, queryOptions, true);
}
export function queryArea(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryArea, queryOptions, true);
}
export function updateSite(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.update, data);
}
export function removeSite(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.remove, data);
}

export function changeBandwidth(data) {
    return requestWrapper(apiUrl.baseUrl, apiUrl.changeBandwidth, data);
}

export function enabledSiteHa(data) {
    return requestWrapper(apiUrl.baseUrl, apiUrl.enabledSiteHa, data);
}


export function bindCpe(data) { // {uuid,cpeUuid, }
  return requestWrapper(apiUrl.baseUrl, apiUrl.bindCpe, data);
}
export function unbindCpe(data) { // {uuid,cpeUuid, }
  return requestWrapper(apiUrl.baseUrl, apiUrl.unbindCpe, data);
}
export function changeHaToMaster(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.changeHaToMaster, {uuid});
}

export function changeHaToSlave(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.changeHaToSlave, { uuid });
}

export function queryHubConfig(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryHubConfig, queryOptions, true);
}
