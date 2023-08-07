import { requestWrapper } from './util';
const apiUrl = {
  baseUrl: '/hybridwan/api',
  query: 'com.syscxp.header.hybridwan.cpe.APIQueryCpeMsg',
  updateCpeName:'com.syscxp.header.hybridwan.cpe.APIUpdateCpeNameMsg',
  enableCpe: 'com.syscxp.header.hybridwan.cpe.APIEnableCpeMsg',
  disableCpe: 'com.syscxp.header.hybridwan.cpe.APIDisableCpeMsg',
  initCpe: 'com.syscxp.header.hybridwan.cpe.APIInitCpeMsg',
  restartCpe: 'com.syscxp.header.hybridwan.cpe.APIRestartCpeMsg',
  queryCpeLink: 'com.syscxp.header.hybridwan.cpe.APIQueryCpeLinkMsg',
  upgradeAgent: 'com.syscxp.header.hybridwan.cpe.APIUpgradeCpeAgentMsg',
  upgradeSystem: 'com.syscxp.header.hybridwan.cpe.APIUpgradeCpeSystemMsg',
  switchLink: 'com.syscxp.header.hybridwan.cpe.APISwitchCpeLinkMsg',
  changeLinkType: 'com.syscxp.header.hybridwan.cpe.APIChangeLinkTypeMsg',
  assignWan: 'com.syscxp.header.hybridwan.cpe.APIAssignWanToLinkMsg',
  updateLinkStrategy: 'com.syscxp.header.hybridwan.cpe.APIUpdateCpeLinkSwitchInfoMsg',
  queryLinkStatus: 'com.syscxp.header.hybridwan.cpe.APIQueryCpeLinkStatusMsg',
  queryCpeNic: 'com.syscxp.header.hybridwan.cpe.APIQueryCpeNicMsg',
  enabledWanNat: 'com.syscxp.header.hybridwan.cpe.APIEnableCpeNicWanNatMsg',
  disabledWanNat: 'com.syscxp.header.hybridwan.cpe.APIDisableCpeNicWanNatMsg',
  detachCpe: 'com.syscxp.header.hybridwan.cpe.APIDetachAccountToCpeMsg',
  queryHubTunnels: 'com.syscxp.header.hybridwan.cpe.APIQueryHubMstpMsg',
  getHubTunnels: 'com.syscxp.header.hybridwan.cpe.APIListHubMstpMsg',
  createHubTunnel: 'com.syscxp.header.hybridwan.cpe.APICreateHubMstpMsg',
  removeHubTunnel: 'com.syscxp.header.hybridwan.cpe.APIDeleteHubMstpMsg',
  enableTrafficAnalysis: 'com.syscxp.header.hybridwan.cpe.APIEnableCpeTrafficAnalysisMsg',
  disableTrafficAnalysis: 'com.syscxp.header.hybridwan.cpe.APIDisableCpeTrafficAnalysisMsg',
  flushCpeWan: 'com.syscxp.header.hybridwan.cpe.APIFlushCpeWanMsg',
  removeLink: 'com.syscxp.header.hybridwan.cpe.APIRemoveCpeLinkMsg',
  getMonitorInfo: 'com.syscxp.header.hybridwan.monitor.APIGetMonitorInfoMsg',
  updateLinkBandwidth: 'com.syscxp.header.hybridwan.cpe.APIUpdateCpeLinkMstpBandwidthMsg',
  updateHubBandwidth: 'com.syscxp.header.hybridwan.cpe.APIUpdateHubMstpBandwidthMsg',
  listVpeForCpeLink: 'com.syscxp.header.hybridwan.cpe.APIListAvailableVpeForCpeLinkMsg',
  execCmd: 'com.syscxp.header.hybridwan.cpe.APICpeExecCommandMsg',
  queryListCpeLanIp:'com.syscxp.header.hybridwan.cpe.APIListCpeLanIpMsg',
  getFrpUrl: 'com.syscxp.header.hybridwan.cpe.APIGetCpeFrpInfoMsg',
  getDhcpInfo: 'com.syscxp.header.hybridwan.cpe.APIGetCpeDhcpInfoMsg',
  updatePurpose: 'com.syscxp.header.hybridwan.cpe.APIUpdateCpePurposeMsg',
  changeQosIngress:'com.syscxp.header.hybridwan.cpe.APIChangeQosIngressMsg',
  getCpeWwanInfo:'com.syscxp.header.hybridwan.cpe.APIGetCpeWwanInfoMsg',
  getCpeAvailablePublicNic:'com.syscxp.header.hybridwan.cpe.APIGetCpeAvailablePublicNicMsg',
  configCpePublicIpMap:'com.syscxp.header.hybridwan.cpe.APIConfigCpePublicIpMapMsg',
  cpeLinkSwitchInfo:'com.syscxp.header.hybridwan.cpe.APIQueryCpeLinkSwitchInfoMsg',
}
export function queryCpe(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.query, queryOptions, true);
}
export function queryListCpeLanIp(cpeUuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryListCpeLanIp, {cpeUuid});
}
export function getCpeWwanInfo(cpeUuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.getCpeWwanInfo,  cpeUuid );
}
export function getCpeAvailablePublicNic(cpeUuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.getCpeAvailablePublicNic,  {cpeUuid} );
}
export function queryCpeLink(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryCpeLink, queryOptions, true);
}
export function queryCpeNic(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryCpeNic, queryOptions, true);
}
export function queryHubTunnels(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryHubTunnels, queryOptions, true);
}
export function queryLinkStatus(queryOptions) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.queryLinkStatus, queryOptions, true);
}
export function enableCpe(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.enableCpe, {uuid});
}
export function disableCpe(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.disableCpe, {uuid});
}
export function resetSshPwd(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.resetSshPwd, {uuid});
}
export function initCpe(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.initCpe, {uuid});
}
export function restartCpe(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.restartCpe, {uuid});
}
export function switchLink(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.switchLink, {uuid});
}

export function queryCpeLinkSwitchInfo(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.cpeLinkSwitchInfo, data);
}
export function upgradeVersion(data, type) {
  const postData = {
    uuid: data.uuid,
    cpeSystemUuid: '',
    cpeAgentUuid: ''
  };
  let postUrl = '';
  if(type === 'agent') {
    postUrl = apiUrl.upgradeAgent;
    postData.cpeAgentUuid = data.cpeVersionUuid;
  }else {
    postUrl = apiUrl.upgradeSystem;
    postData.cpeSystemUuid = data.cpeVersionUuid;
  }
  return requestWrapper(apiUrl.baseUrl, postUrl, postData);
}
export function changeLinkType(data) { // {uuid,linkType, }
  return requestWrapper(apiUrl.baseUrl, apiUrl.changeLinkType, data);
}
export function assignWan(data) { // {cpeLinkUuid,cpeNicUuid, }
  return requestWrapper(apiUrl.baseUrl, apiUrl.assignWan, data);
}
export function updateLinkStrategy(data) { // {uuid,lossLimit,disConnLimit,autoBack }
  return requestWrapper(apiUrl.baseUrl, apiUrl.updateLinkStrategy, data);
}

export function detachCpe(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.detachCpe, {uuid});
} 
export function getHubTunnels(cpeUuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.getHubTunnels, { cpeUuid });
}

export function createHubTunnel(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.createHubTunnel, data);
}
export function removeHubTunnel(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.removeHubTunnel, { uuid });
}

export function enableTrafficAnalysis(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.enableTrafficAnalysis, { uuid });
}

export function disableTrafficAnalysis(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.disableTrafficAnalysis, { uuid });
}

export function flushCpeWan(uuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.flushCpeWan, { uuid });
}
export function removeLink(cpeLinkUuid) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.removeLink, { cpeLinkUuid });
}
export function getMonitorInfo(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.getMonitorInfo, data);
}
export function updateLinkBandwidth(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.updateLinkBandwidth, data);
} 
export function updateHubBandwidth(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.updateHubBandwidth, data);
}
export function updateCpeName(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.updateCpeName, data);
}
export function updatePurpose(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.updatePurpose, data);
}

export function listVpeForCpeLink(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.listVpeForCpeLink, data);
} 
export function execCmd(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.execCmd, data);
}
export function getFrpUrl(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.getFrpUrl, data);
}
export function getDhcpInfo(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.getDhcpInfo, data);
}
export function changeQosIngress(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.changeQosIngress, data);
}
export function configCpePublicIpMap(data) {
  return requestWrapper(apiUrl.baseUrl, apiUrl.configCpePublicIpMap, data);
}

