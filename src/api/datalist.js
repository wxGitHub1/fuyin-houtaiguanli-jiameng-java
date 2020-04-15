// 获取各种列表
import ajax from '../utils/ajax';
/**
 * 
 * @param {*} param {  }
 * 
 */
// 上线接口
// const envUrl = 'http://117.34.105.87:88';
// 调试接口 二龙接口
const envUrl = 'http://192.168.3.220:83';
//大客户获取社区管理列表

export const getControlCommunity = async params => ajax.post(envUrl + '/api/Community/GetCommunitys', params);

//大客户管理 入托体检  新增
export const addPhysicalExamination = async params => ajax.post(envUrl + '/api/Userphysical/OperateUserphysical', params);

//大客户管理 入托查询
export const selectNurseryData = async params => ajax.post(envUrl + '/api/Userphysical/GetUserphysicals', params);

//大客户管理  学校管理 修改数据
export const schoolModifyData = async params => ajax.post(envUrl + '/api/School/Operateschool', params);

// 大客户管理  学校管理 查询数据
export const schoolSelectData = async params => ajax.post(envUrl + '/api/School/Getschools', params);

//大客户 合作机构
export const organisationSeach = async params => ajax.post(envUrl + '/FuYinApiServer/api/Organization/GetOrganization', params);

//大客户  合作机构增删改  
export const OrganizationOperate = async params => ajax.post('http://192.168.3.109:9081/hospital/test', params);

//大客户管理  入园管理 查询
export const kindergardenSelect = async params => ajax.post(envUrl + '/api/UserphysicalForGarden/GetGardenUserphysicals', params);
//大客户管理  入园管理 增加 修改 删除
export const kindergardenAdd = async params => ajax.post(envUrl + '/api/UserphysicalForGarden/OperateGardenUserphysical', params);
//大客户管理  入园管理 导出excel
export const ExportOutGardenUserphysicals = async params => ajax.post(envUrl + '/api/UserphysicalForGarden/ExportGardenUserphysical', params);

//大客户管理  入校管理 大客户角色下的入校体检
export const OperateSchoolUserphysical = async params => ajax.post(envUrl + '/api/UserphysicalForSchool/OperateSchoolUserphysical', params);
//大客户管理  入校管理 列表查询
export const GetSchoolUserphysicals = async params => ajax.post(envUrl + '/api/UserphysicalForSchool/GetSchoolUserphysicals', params);



//外出体检管理 便携设备体检查询
export const outputNurseryData = async params => ajax.post(envUrl + '/api/Userphysical/GetOutUserphysicals', params);

//外出体检管理 入托新增
export const addNurseryData = async params => ajax.post(envUrl + '/api/Userphysical/OperateOutUserphysical', params);

//外出体检管理 入托便携设备批量删除
export const outworkNursePortableDelete = async params => ajax.post(envUrl + '/api/Userphysical/DeleteAllOutUserphysical', params);

//外出体检管理  入托数据管理批量删除
export const outworkNurseDataDelete = async params => ajax.post(envUrl + '/api/Userphysical/DeleteAllUserphysical', params);

//外出体检管理  录入数据状态
export const inputStatus = async params => ajax.post(envUrl + '/api/Userphysical/OpeState', params);

//外出体检管理  数据设备 录入查重判断
export const inputRepeat = async params => ajax.post(envUrl + '/api/Userphysical/IsAllowImport', params);

//外出体检管理  数据设备获取数据
export const getDataDevice = async params => ajax.post(envUrl + '/api/Userphysical/GetCSV', params);

//外出体检管理  便携设备 导出Excel
export const outExcelData = async params => ajax.post(envUrl + '/api/Userphysical/ExportOutUserphysicals', params);


//外出体检管理   体检统计查询
export const examStatistic = async params => ajax.post(envUrl + '/api/Userphysical/GetRepeat', params);

//外出体检管理   入园查体查询
export const gardenSelect = async params => ajax.post(envUrl + '/api/UserphysicalForGarden/GetOutGardenUserphysicals', params);

//外出体检管理   入园增删改
export const gardenOperate = async params => ajax.post(envUrl + '/api/UserphysicalForGarden/OperateOutGardenUserphysical', params);

//外出体检   入园获取问题人数
export const getKinderNum = async params => ajax.post(envUrl + '/api/UserphysicalForGarden/OpeGardenState', params);

//外出体检管理  批量删除
export const gardenDeleteAll = async params => ajax.post(envUrl + '/api/UserphysicalForGarden/DeleteAllOutUserphysical', params);

//外出体检管理  体检人员统计
export const examStatisticUser = async params => ajax.post(envUrl + '/api/Userphysical/GetRepeatByUser', params);


//用户管理 菜单列表
export const GetMenus = async params => ajax.post(envUrl + '/api/Menus/GetMenus', params);
//用户管理 角色列表和搜索
export const GetRoles = async params => ajax.post(envUrl + '/api/Roles/GetRoles', params);
//超级 用户管理 角色的增加修改和删除接口
export const OperateRole = async params => ajax.post(envUrl + '/api/Roles/OperateRole', params);
//超级 用户管理 角色的修改列表
export const GetRolesDetail = async params => ajax.post(envUrl + '/api/Roles/GetRolesDetail', params);

//超级 系统用户管理 用户的增加修改和删除
export const OperateSysusers = async params => ajax.post(envUrl + '/api/Sysusers/OperateSysusers', params);
//超级 系统用户管理 重置密码
export const UpdatePassWord = async params => ajax.post(envUrl + '/api/Sysusers/UpdatePassWord', params);
//超级 系统用户管理 获取用户列表
export const GetSysusers = async params => ajax.post(envUrl + '/api/Sysusers/GetSysusers', params);
//超级 系统用户管理 获取医院列表
export const GetHospitals = async params => ajax.post(envUrl + '/api/Hospital/GetHospitals', params);
//超级 系统用户管理 获取用户角色下拉框
export const GetRoleList = async params => ajax.post(envUrl + '/api/Roles/GetRoleList', params);

