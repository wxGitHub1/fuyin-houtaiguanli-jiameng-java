//address.js   获取地址

import ajax from '../utils/ajax';
/**
 * 
 * @param {*} param {  }
 * 
 */
// 上线接口
const envUrl = 'http://117.34.105.87:88';
//获取省份
export const getProvince = async params => ajax.post(envUrl + '/api/Provice/GetProvices', params);

//获取城市
export const getCity = async params => ajax.post(envUrl + '/api/City/GetCitys', params);

//获取区县
export const getCountys = async params => ajax.post(envUrl + '/api/County/GetCountys', params);

//获取社区
export const getCommunity = async params => ajax.post(envUrl + '/api/Community/GetCommunityList', params);

//获取外出体检下的社区
export const getOutCommunity = async params => ajax.post(envUrl + '/api/Community/GetCommunityList2', params);

//获取学校
export const getSchool = async params => ajax.post(envUrl + '/api/UserphysicalForGarden/Getschools', params)

//添加社区 删除  修改
export const addCommunity = async params => ajax.post(envUrl + '/api/Community/OperateCommunity', params);
