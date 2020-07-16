import axios from '../utils/ajax';
/**
 * 
 * @param {*} params {}
 * baseUrl  接口路径
 */
// const baseUrl  = 'http://117.34.105.87:8088';//服务器IP
const baseUrl  = 'http://117.34.105.87:8087';//测试服务器IP
// const baseUrl = 'http://192.168.1.108:8088';//杨腾飞加盟IP
/*
*
*用户登录 
修改接口地址
接口名                 原接口                   修改为
试穿客户管理    /member/queryMemberByPage  /member/receptionQueryMemberTryOn
取型已接待      /shape/shapeAdmit      /shape/shapeAdmit
取型待验收      /shape/shapeAdmit      /shape/shapeWaitAcceptance
取型已验收      /shape/shapeAdmit      /shape/shapeAcceptance
*
*/
export const login = async params => axios.post(baseUrl + '/login/login', params); //登录
export const logout = async params => axios.post(baseUrl + '/login/logout', params); //退出
export const checkLogine = async params => axios.get(baseUrl + '/login/checkLogin', params); //验证是否登录
export const selectMenuModuleWhenChangeRole = async params => axios.get(baseUrl + '/sys/menu/selectMenuModuleWhenChangeRole', params); //切换角色
/*
*
*系统管理 
*
*/
//医院管理
export const selectSiteList = async params => axios.post(baseUrl + '/sys/site/selectSiteList', params);//查询站点清单
//医院管理
export const getAllProvinceList = async params => axios.get(baseUrl + '/common/getAllProvinceList', params);//新增加盟查询省清单
export const getAllCityList = async params => axios.get(baseUrl + '/common/getAllCityList', params);//新增加盟查询市清单
export const getProvinceList = async params => axios.get(baseUrl + '/common/getProvinceList', params);//查询省清单
export const selectSiteListByCity = async params => axios.post(baseUrl + '/sys/site/selectSiteListByCity', params);//查询站点清单
export const insertSite = async params => axios.post(baseUrl + '/sys/site/insertSite', params);//新增站点
export const deleteSite = async params => axios.post(baseUrl + '/sys/site/deleteSite', params);//删除新增
export const updateSite = async params => axios.post(baseUrl + '/sys/site/updateSite', params);//修改站点
export const selectSiteListByCityAndUser = async params => axios.post(baseUrl + '/sys/site/selectSiteListByCityAndUser', params);//根据省市和当前登录人查询站点列表
export const getCityList = async params => axios.get(baseUrl + '/common/getCityList', params);//查询城清单
export const getHospitalList = async params => axios.get(baseUrl + '/hospital/getHospitalList', params);//查询医院清单
export const getHospitalListByUser = async params => axios.get(baseUrl + '/hospital/getHospitalListByUser', params);//根据站点查询医院清单
export const getTechnicalList = async params => axios.get(baseUrl + '/doctor/getTechnicalList', params);//查询职称清单
export const GetHospitalTypeList = async params => axios.get(baseUrl + '/hospital/getHospitalTypeList', params);//查询医院类型清单
export const selectByPage = async params => axios.get(baseUrl + '/hospital/selectByPage', params);//查询医院管理列表
export const getUserListForUserHospital = async params => axios.get(baseUrl + '/hospital/getUserListForUserHospital', params);//医院负责人清单
export const deleteUserHospitalById = async params => axios.post(baseUrl + '/hospital/deleteUserHospitalById', params);//医院负责人删除
export const addSysUserHospital = async params => axios.post(baseUrl + '/hospital/addSysUserHospital', params);//医院负责人新增
export const addHospital = async params => axios.post(baseUrl + '/hospital/addHospital', params);//新增医院
export const updateHospital = async params => axios.post(baseUrl + '/hospital/updateHospital', params);//修改医院
export const deleteHospital = async params => axios.post(baseUrl + '/hospital/deleteHospital', params);//删除医院
export const addDepartment = async params => axios.post(baseUrl + '/department/addDepartment', params);//新增科室
export const updateDepartment = async params => axios.post(baseUrl + '/department/updateDepartment', params);//修改科室
export const deleteDepartment = async params => axios.post(baseUrl + '/department/deleteDepartment', params);//删除科室
export const addDoctor = async params => axios.post(baseUrl + '/doctor/addDoctor', params);//新增医生
export const deleteDoctor = async params => axios.post(baseUrl + '/doctor/deleteDoctor', params);//删除医生
export const updateDoctor = async params => axios.post(baseUrl + '/doctor/updateDoctor', params);//修改医生
export const selectDepartmentByHospitalId = async params => axios.get(baseUrl + '/department/selectDepartmentByHospitalId', params);//根据医院ID查询科室信息
export const queryDoctorByDepartmentId = async params => axios.get(baseUrl + '/doctor/queryDoctorByDepartmentId', params);//根据科室ID查询医生信息
export const hospitalDetail = async params => axios.get(baseUrl + '/hospital/hospitalDetail', params);//查询医院详细信息
export const exportExcel = async params => axios.get(baseUrl + '/hospital/exportExcel', params);//导出医院Excel
//用户管理
export const userList = async params => axios.get(baseUrl + '/sys/user/userDetailList', params);//查询用户管理列表
export const department = async params => axios.get(baseUrl + '/sys/user/department', params);//查询部门列表
export const addUser = async params => axios.post(baseUrl + '/sys/user/userInsert', params);//新增用户
export const modfiyUser = async params => axios.post(baseUrl + '/sys/user/userUpdate', params);//修改用户
export const userDetail = async params => axios.get(baseUrl + '/sys/user/userDetail', params);//根据Id查询用户详情
export const deleteUser = async params => axios.post(baseUrl + '/sys/user/userDelete', params);//删除用户
export const ConfigurationPassword = async params => axios.post(baseUrl + '/sys/user/password', params);//重置密码
export const ConfiguringRolesList = async params => axios.post(baseUrl + '/sys/user/userRole', params);//配置角色
export const roleUser = async params => axios.post(baseUrl + '/sys/user/roleUser', params);//配置角色
export const deleteRoleUser = async params => axios.post(baseUrl + '/sys/user/deleteRoleUser', params);//删除配置角色
export const roleTree = async params => axios.get(baseUrl + '/sys/role/roleTree', params);//查询角色列表
//角色管理
export const roleList = async params => axios.get(baseUrl + '/sys/role/roleMenuModelList', params);//角色管理列表
export const selectRoleDetail = async params => axios.post(baseUrl + '/sys/role/selectRoleDetail', params);//角色详情
export const roleDelete = async params => axios.post(baseUrl + '/sys/role/roleDelete', params);//删除角色
export const moduleTree = async params => axios.get(baseUrl + '/sys/menu/moduleTree', params);//获取角色管理菜单
export const roleModuleUpdate = async params => axios.post(baseUrl + '/sys/role/roleModuleUpdate', params);//新增角色
export const selectMenuByModel = async params => axios.post(baseUrl + '/sys/menu/selectMenuByModel', params);//获取角色权限
export const roleMenuUpdate = async params => axios.post(baseUrl + '/sys/role/roleMenuUpdate', params);//保存角色权限
export const roleMenuTree = async params => axios.get(baseUrl + '/sys/menu/roleMenuTree', params);//修改选择菜单接口
export const changeRoleList = async params => axios.post(baseUrl + '/sys/role/changeRoleList', params);//角色配置列表
export const updateRoleUserPermission = async params => axios.post(baseUrl + '/sys/role/updateRoleUserPermission', params);//新增，修改用户角色的权限级别
//产品配置清单
export const selectHospitalAndSaleBaseBatch = async params => axios.post(baseUrl + '/hospital/selectHospitalAndSaleBaseBatch', params);//查询产品配置清单列表
export const deleteHospitalAndSaleBase = async params => axios.post(baseUrl + '/hospital/deleteHospitalAndSaleBase', params);//删除医院和产品绑定关系
export const selectBatchNumBySiteId = async params => axios.post(baseUrl + '/hospital/selectBatchNumBySiteId', params);//根据站点id查询复用批次清单
export const insertNext = async params => axios.post(baseUrl + '/hospital/insertNext', params);//新增配置点击下一步
export const selectHospitalSaleBaseList = async params => axios.post(baseUrl + '/hospital/selectHospitalSaleBaseList', params);//选择产品页面的查询列表
export const selectSales = async params => axios.post(baseUrl + '/hospital/selectSales', params);//查询销售项
export const insertHospitalAndSaleBase = async params => axios.post(baseUrl + '/hospital/insertHospitalAndSaleBase', params);//绑定医院和基础产品
export const updateHospitalSaleBasePrice = async params => axios.post(baseUrl + '/hospital/updateHospitalSaleBasePrice', params);//新增/修改医院绑定的产品价格
//站点测评配置
export const selectExaminationSiteList = async params => axios.post(baseUrl + '/examination/selectExaminationSiteList', params);//查询站点测评配置列表
export const deleteExaminationSite = async params => axios.post(baseUrl + '/examination/deleteExaminationSite', params);//删除站点测评配置
export const selectExaminationBaseList = async params => axios.get(baseUrl + '/examination/selectExaminationBaseList', params);//查询全部测评项
export const selectExaminationBaseBySiteId = async params => axios.post(baseUrl + '/examination/selectExaminationBaseBySiteId', params);//根据站点id查询配置的测评
export const insertExaminationSite = async params => axios.post(baseUrl + '/examination/insertExaminationSite', params);//新增站点测评配置
export const updateExaminationSite = async params => axios.post(baseUrl + '/examination/updateExaminationSite', params);//修改站点测评配置
/*
*
*
*儿院支具室
*
*/
//客户管理
export const changeSite = async params => axios.post(baseUrl + '/member/changeSite', params);//站站点
export const queryMemberByPage = async params => axios.get(baseUrl  + '/member/queryMemberByPage', params);//客户列表

export const addMember = async params => axios.post(baseUrl + '/member/addMember', params);//新增客户
export const updateMemberInfo = async params => axios.post(baseUrl + '/member/updateMemberInfo', params);//修改客户
export const addPrescription = async params => axios.post(baseUrl + '/member/addPrescription', params);//新增病单
export const updatePrescription = async params => axios.post(baseUrl + '/member/updatePrescription', params);//修改病单
export const queryForUpdate = async params => axios.get(baseUrl + '/member/queryForUpdate', params);//修改客户
export const queryMemberDetail = async params => axios.get(baseUrl + '/member/queryMemberDetail', params);//客户详情
export const blackOperation = async params => axios.post(baseUrl + '/member/blackOperation', params);//移入黑名单
export const queryBlackHistory = async params => axios.get(baseUrl + '/member/queryBlackHistory', params);//黑名单详细
export const orderInsert = async params => axios.post(baseUrl + '/sale/order/orderInsertNew', params);//下单
export const selectUserListByHospitalId = async params => axios.get(baseUrl + '/hospital/selectUserListByHospitalId', params);//根据医院查询取型人列表
export const sales = async params => axios.post(baseUrl + '/sale/base/sales', params);//下单产品列表
export const memberCardStatistics = async params => axios.get(baseUrl + '/member/memberCardStatistics', params);//会员统计列表
export const queryExamineDetail = async params => axios.get(baseUrl + '/examination/queryExamineDetail', params);//查询测评详情
//订单管理
export const orderList = async params => axios.post(baseUrl + '/sale/order/orderList', params);//订单列表
export const orderDetail = async params => axios.get(baseUrl + '/sale/order/orderDetail', params);//订单详情
export const addMoney = async params => axios.post(baseUrl + '/sale/money/addMoney', params);//补交欠款
export const refundMoney = async params => axios.post(baseUrl + '/sale/money/refundMoney', params);//退款
export const cp_orderList = async params => axios.post(baseUrl + '/sale/order/examination/orderList', params);//测评订单查询
// export const orderUpdate = async params => axios.post(baseUrl  + '/sale/order/orderUpdate', params);//取消订单 && 修改订单 修改前↓
export const orderUpdateNew = async params => axios.post(baseUrl + '/sale/order/orderUpdateNew', params);//取消订单 && 修改订单 修改后
export const productShape = async params => axios.get(baseUrl + '/sale/order/productShape', params);//订单取型尺寸
export const printOrderDetail = async params => axios.get(baseUrl + '/sale/order/printOrderDetail', params);//打印小票信息
export const printAddMoney = async params => axios.get(baseUrl + '/sale/money/printAddMoney', params);//打印补交小票信息
//操作日志
export const logList = async params => axios.post(baseUrl + '/sale/order/log/logList', params);//操作日志列表
export const logDetail = async params => axios.post(baseUrl + '/sale/order/log/logDetail', params);//操作日志详情
//统计报表
export const productStatistics = async params => axios.get(baseUrl + '/sale/order/productStatistics', params);//统计报表列表
/*
*
*
*前台接待
*
*/
//统计报表
export const assignStatistics = async params => axios.post(baseUrl + '/member/assign/assignStatistics', params);//统计报表列表
//评价管理
export const waitAppraisalList = async params => axios.post(baseUrl + '/member/assign/waitAppraisalList', params);//待评价列表 
//评价管理
export const assignList = async params => axios.post(baseUrl + '/member/assign/assignList', params);//已分配列表 
export const appraisalList = async params => axios.post(baseUrl + '/member/assign/appraisalList', params);//评价管理列表
//已分配
export const updateAssign = async params => axios.post(baseUrl + '/member/assign/updateAssign', params);//取消分配 //从新分配
export const assignAppraisal = async params => axios.post(baseUrl + '/member/assign/assignAppraisal', params);//保存客户评价信息
export const endAdmit = async params => axios.post(baseUrl + '/member/assign/endAdmit', params);//完成接待
//客户管理
export const receptionQueryMember = async params => axios.get(baseUrl + '/member/selectReceptionMemberList', params);//客户默认查询列表
export const backVisitRemainingToday = async params => axios.post(baseUrl + '/member/backVisitRemainingToday', params);//今日复查剩余查询列表
export const shapeRemainingToday = async params => axios.post(baseUrl + '/member/shapeRemainingToday', params);//今日取型剩余查询列表
export const tryOnRemainingToday = async params => axios.post(baseUrl + '/member/tryOnRemainingToday', params);//今日试穿剩余查询列表
// export const  = async params => axios.get(baseUrl + '', params);//今日维修剩余查询列表
export const selectMemberReserved = async params => axios.post(baseUrl + '/member/selectMemberReserved', params);//左侧抽屉查询列表
export const userAssignListByDept = async params => axios.post(baseUrl + '/sys/user/userAssignListByDept', params);//根据部门查询用户和今天已经分配的人数
export const product = async params => axios.post(baseUrl + '/sale/product/product', params);//根据客户id和产品状态查询产品
export const insertAssign = async params => axios.post(baseUrl + '/member/assign/insertAssign', params);//新增分配
export const userListByDept = async params => axios.get(baseUrl + '/sys/user/userListByDept', params);//人员列表
export const userListByDepts = async params => axios.post(baseUrl + '/sys/user/userListByDepts', params);//数组人员列表
export const setPjType = async params => axios.get(baseUrl + '/member/assign/setPjType', params);//开始测评
export const getPjInfo = async params => axios.get(baseUrl + '/member/assign/getPjInfo', params);//获取评价信息
export const firstAssess = async params => axios.post(baseUrl + '/member/firstAssess', params);//保存客户评价信息
export const insertAssignList = async params => axios.post(baseUrl + '/member/assign/insertAssignList', params);//提交分配接待信息
/*
*
*
*取型
*
*/
//待接待
export const shapeAssignList = async params => axios.post(baseUrl + '/member/assign/shape/assignList', params);//取型待接待列表
export const memberShapeProduct = async params => axios.post(baseUrl + '/shape/memberShapeProduct', params);//待接待详情
// export const baseShapeDetail = async params => axios.post(baseUrl  + '/shape/baseShapeDetail', params);//根据配置id查询取型项 修改前↓
export const baseShapeDetailNew = async params => axios.post(baseUrl + '/shape/baseShapeDetailNew', params);//根据配置id查询取型项 修改后
export const shapeInsert = async params => axios.post(baseUrl + '/shape/shapeInsert', params);//新增取型详情
export const getShapeUser = async params => axios.get(baseUrl + '/member/assign/getShapeUser', params);//查询产品对应取型人
//已接待
export const shapeAdmit = async params => axios.post(baseUrl + '/shape/shapeAdmit', params);//已接待列表
export const shapeDetail = async params => axios.post(baseUrl + '/shape/shapeDetail', params);//已接待详情
export const shapeUpdate = async params => axios.post(baseUrl + '/shape/shapeUpdate', params);//修改取型信息、取型自检
export const goUpdateShape = async params => axios.post(baseUrl + '/shape/goUpdateShape', params);//已接待修改取型详情
//首页
export const shapeHome = async params => axios.post(baseUrl + '/shape/shapeHome', params);//取型首页信息
//已验收
export const shapeAcceptance = async params => axios.post(baseUrl + '/shape/shapeAcceptance', params);//取型已验收列表
export const shapeRedo = async params => axios.post(baseUrl + '/shape/shapeRedo', params);//重做
//统计报表
export const shapeStatistics = async params => axios.post(baseUrl + '/shape/shapeStatistics', params);//统计列表
//待验收
export const shapeWaitAcceptance = async params => axios.post(baseUrl + '/shape/shapeWaitAcceptance', params);//取型待验收列表
export const acceptanceInsert = async params => axios.post(baseUrl + '/acceptance/acceptanceInsert', params);//合格、驳回、问题反馈
export const printProduct = async params => axios.post(baseUrl + '/shape/printProduct', params);//打印订货单信息
//鞋垫制作
export const makeInsole = async params => axios.post(baseUrl + '/shape/makeInsole', params);//鞋垫制作查询列表
/*
*
*
*试穿
*
*/
//待试穿验收
export const receptionQueryMemberTryOn = async params => axios.get(baseUrl + '/member/receptionQueryMemberTryOn', params);//客户列表
export const selectTryOnPendingAcceptanceList = async params => axios.post(baseUrl + '/acceptance/selectTryOnPendingAcceptanceList', params);//查看试穿待验收列表
export const selectTryOnPendingAcceptanceDetail = async params => axios.post(baseUrl + '/acceptance/selectTryOnPendingAcceptanceDetail', params);//查看试穿待验收详情
export const tryOnAcceptanceInsertEligible = async params => axios.post(baseUrl + '/acceptance/tryOnAcceptanceInsertEligible', params);//试穿验收合格
export const tryOnAcceptanceInsertBack = async params => axios.post(baseUrl + '/acceptance/tryOnAcceptanceInsertBack', params);//试穿返厂调整
export const tryOnAcceptanceInsertSite = async params => axios.post(baseUrl + '/acceptance/tryOnAcceptanceInsertSite', params);//试穿现场调整
//待通知
export const queryWaitNotice = async params => axios.post(baseUrl + '/tryOn/queryWaitNotice', params);//试穿待通知查询
export const noticeWindow = async params => axios.post(baseUrl + '/tryOn/noticeWindow', params);//试穿待通知个人产品查询
export const noticeForTryOn = async params => axios.post(baseUrl + '/tryOn/noticeForTryOn', params);//发起试穿通知
//待试穿
export const queryWaitTryOnByPage = async params => axios.post(baseUrl + '/tryOn/queryWaitTryOnByPage', params);//待试穿查询
export const queryWaitTryOnDetail = async params => axios.post(baseUrl + '/tryOn/queryWaitTryOnDetail', params);//待试穿查询详情
export const selectAdvanceUser = async params => axios.post(baseUrl + '/member/assign/selectAdvanceUser', params);//待试穿查询预分配服务人员
export const updateNoticeTime = async params => axios.post(baseUrl + '/tryOn/updateNoticeTime', params);//修改试穿时间
export const tryOnRedo = async params => axios.post(baseUrl + '/tryOn/tryOnRedo', params);//重做
export const tryOnAdmit = async params => axios.post(baseUrl + '/tryOn/tryOnAdmit', params);//待试穿接待
export const queryTryOnImage = async params => axios.post(baseUrl + '/tryOn/queryTryOnImage', params);//待试穿图片查询
export const deleteTryOnImage = async params => axios.post(baseUrl + '/tryOn/deleteTryOnImage', params);//删除照片
export const rivetStart = async params => axios.post(baseUrl + '/tryOn/rivetStart', params);//铆接开始
export const rivetEnd = async params => axios.post(baseUrl + '/tryOn/rivetEnd', params);//铆接完成
export const tryOnFinish = async params => axios.post(baseUrl + '/tryOn/tryOnFinish', params);//完成试穿
export const postExpress = async params => axios.post(baseUrl + '/tryOn/postExpress', params);//快递邮递
//待维修
export const selectPendingDoRepairList = async params => axios.post(baseUrl + '/tryOn/selectPendingDoRepairList', params);//待维修查询列表
export const overRepair = async params => axios.post(baseUrl + '/tryOn/overRepair', params);//待维修完成
//待报修
export const selectPendingRepairList = async params => axios.post(baseUrl + '/tryOn/selectPendingRepairList', params);//待报修查询列表
export const selectPendingRepairDetail = async params => axios.post(baseUrl + '/tryOn/selectPendingRepairDetail', params);//待报修查询详情
export const pendingRepairAdmit = async params => axios.post(baseUrl + '/tryOn/pendingRepairAdmit', params);//待报修接待
export const insertRepairSite = async params => axios.post(baseUrl + '/tryOn/insertRepairSite', params);//现场维修
export const insertRepairBack = async params => axios.post(baseUrl + '/tryOn/insertRepairBack', params);//返厂维修
export const insertRepairUnable = async params => axios.post(baseUrl + '/tryOn/insertRepairUnable', params);//无法维修
export const insertRepairRedo = async params => axios.post(baseUrl + '/tryOn/insertRepairRedo', params);//重做
//待分配
export const selectTryOnPendingAssignList = async params => axios.post(baseUrl + '/tryOn/selectTryOnPendingAssignList', params);//待分配查询列表
export const selectProductListInTryOnPendingAssign = async params => axios.post(baseUrl + '/tryOn/selectProductListInTryOnPendingAssign', params);//查询试穿待分配页面弹出框产品列表
export const insertTryOn = async params => axios.post(baseUrl + '/tryOn/insertTryOn', params);//新增分配
//已维修
export const selectRepairFinishList = async params => axios.post(baseUrl + '/tryOn/selectRepairFinishList', params);//已维修查询列表
export const selectRepairFinishDetail = async params => axios.post(baseUrl + '/tryOn/selectRepairFinishDetail', params);//已维修详情查询
//已验收
export const selectTryOnAcceptedList = async params => axios.post(baseUrl + '/acceptance/selectTryOnAcceptedList', params);//已验收查询列表
export const selectTryOnAcceptedDetail = async params => axios.post(baseUrl + '/acceptance/selectTryOnAcceptedDetail', params);//产看试穿已验收详情
//已试穿
export const queryTriedOn = async params => axios.post(baseUrl + '/tryOn/queryTriedOn', params);//已试穿查询
export const triedOnDetail = async params => axios.post(baseUrl + '/tryOn/triedOnDetail', params);//已试穿详情
//已试穿统计
export const queryTryOnStatistics = async params => axios.post(baseUrl + '/tryOn/queryTryOnStatistics', params);//试穿统计查询
//已维修统计
export const selectRepairStatistics = async params => axios.post(baseUrl + '/tryOn/selectRepairStatistics', params);//维修统计查询
/*
*
*
*测评
*
*/
//待接待
export const examinationWaitAdmit = async params => axios.post(baseUrl + '/member/assign/examinationWaitAdmit', params);//查询列表
export const printMakeParam = async params => axios.get(baseUrl + '/examination/printMakeParam', params);//检测报告查询基本信息
//已接待
export const examineAdmit = async params => axios.post(baseUrl + '/examination/examineAdmit', params);//测评已接待查询
export const examinePadZb3d = async params => axios.post(baseUrl + '/examination/examinePadZb3d', params);//3d足部扫描增加修改足长足宽接口
export const getExaminationDetailUrls = async params => axios.get(baseUrl + '/examination/getExaminationDetailUrls', params);//测评文件列表
// export const download3Dqs = async params => axios.get(baseUrl  + '/examination/download3Dqs', params);//3D全身扫描_下载测评设备的文件  
// export const download3Dzb = async params => axios.get(baseUrl  + '/examination/download3Dzb', params);//3D足部扫描_下载测评设备的文件              
// export const downloadZdyl = async params => axios.get(baseUrl  + '/examination/downloadZdyl', params);//足底压力_下载测评设备的文件            
//测评统计
export const examineStatistics = async params => axios.get(baseUrl + '/examination/examineStatistics', params);//测评统计查询
//测评加盟统计
export const examineJoinStatistics = async params => axios.post(baseUrl + '/examination/examineJoinStatistics', params);//测评加盟统计查询
/*
*
*
*回访管理
*
*/
//客户档案
export const selectMemberFile = async params => axios.post(baseUrl + '/back/visit/selectMemberFile', params);//查询列表
//已流失
export const selectBackVisitOutflowList = async params => axios.post(baseUrl + '/back/visit/selectBackVisitOutflowList', params);//查询已流失列表
export const confirmOutflow = async params => axios.post(baseUrl + '/back/visit/confirmOutflow', params);//确认流失
export const cancelOutflow = async params => axios.post(baseUrl + '/back/visit/cancelOutflow', params);//取消流失
//产品体验统计
export const selectExperienceStatistics = async params => axios.post(baseUrl + '/back/visit/selectExperienceStatistics', params);//查询体验统计列表
//产品使用统计
export const selectUseStatistics = async params => axios.post(baseUrl + '/back/visit/selectUseStatistics', params);//查询使用统计列表
//产品邀约统计
export const selectBackStatistics = async params => axios.post(baseUrl + '/back/visit/selectBackStatistics', params);//查询产品邀约统计列表
//待复查
export const selectWaitReviewByPage = async params => axios.post(baseUrl + '/back/visit/selectWaitReviewByPage', params);//查询列表
//逾期未到
export const selectOverdueByPage = async params => axios.post(baseUrl + '/back/visit/selectOverdueByPage', params);//查询列表
//已复查
export const selectWaitReviewList = async params => axios.post(baseUrl + '/back/visit/selectWaitReviewList', params);//查询已复查列表
export const selectWaitReviewDetail = async params => axios.post(baseUrl + '/back/visit/selectWaitReviewDetail', params);//查询待复查详情
export const selectUpdateBackWaitVisitDetail = async params => axios.post(baseUrl + '/back/visit/selectUpdateBackWaitVisitDetail', params);//修改确认到访时间
//已回访
export const selectVisitFinishList = async params => axios.post(baseUrl + '/back/visit/selectVisitFinishList', params);//查询已回访列表
export const selectVisitFinishDetail = async params => axios.post(baseUrl + '/back/visit/selectVisitFinishDetail', params);//查询已回访详情
//复查邀约待回访
export const selectBackWaitVisitList = async params => axios.post(baseUrl + '/back/visit/selectBackWaitVisitList', params);//查询复查邀约待回访列表
export const selectBackWaitVisitDetail = async params => axios.post(baseUrl + '/back/visit/selectBackWaitVisitDetail', params);//查询复查邀约待回访详情
export const insertBackVisit = async params => axios.post(baseUrl + '/back/visit/insertBackVisit', params);//新增复查邀约回访
//产品使用待回访
export const selectUseWaitVisitList = async params => axios.post(baseUrl + '/back/visit/selectUseWaitVisitList', params);//查询使用待回访列表
export const selectUseWaitVisitDetail = async params => axios.post(baseUrl + '/back/visit/selectUseWaitVisitDetail', params);//查询使用待回访详情
export const insertUseVisit = async params => axios.post(baseUrl + '/back/visit/insertUseVisit', params);//新增使用回访
export const selectVisitDetailByVisitIdAndType = async params => axios.post(baseUrl + '/back/visit/selectVisitDetailByVisitIdAndType', params);//查询产品回访详情
//产品体验待回访
export const selectExperienceWaitVisitList = async params => axios.post(baseUrl + '/back/visit/selectExperienceWaitVisitList', params);//查询体验待回访列表
export const selectExperienceWaitVisitDetail = async params => axios.post(baseUrl + '/back/visit/selectExperienceWaitVisitDetail', params);//查询体验待回访详情
export const insertExperienceVisit = async params => axios.post(baseUrl + '/back/visit/insertExperienceVisit', params);//新增体验回访
export const insertOutflow = async params => axios.post(baseUrl + '/back/visit/insertOutflow', params);//新增流失
export const selectBackupPhoneByMemberId = async params => axios.post(baseUrl + '/member/selectBackupPhoneByMemberId', params);//查询用户电话号码
export const insertBackupPhone = async params => axios.post(baseUrl + '/member/insertBackupPhone', params);//新增备用手机
export const selectOrderDetailByMemberId = async params => axios.post(baseUrl + '/sale/order/selectOrderDetailByMemberId', params);//根据客户id查询历史订单详情
/* */
export const selectPrincipalVisitListWhenExperience = async params => axios.post(baseUrl + '/back/visit/selectPrincipalVisitListWhenExperience', params);//体验数据指派列表
export const updatePrincipalUser = async params => axios.post(baseUrl + '/back/visit/updatePrincipalUser', params);//数据指派
export const selectPrincipalVisitListWhenUse = async params => axios.post(baseUrl + '/back/visit/selectPrincipalVisitListWhenUse', params);//使用数据指派列表
export const selectPrincipalVisitListWhenBack = async params => axios.post(baseUrl + '/back/visit/selectPrincipalVisitListWhenBack', params);//邀约数据指派列表
export const queryWaitReviewDetail = async params => axios.post(baseUrl + '/back/visit/queryWaitReviewDetail', params);//待复查详情

/*
*
*
*导出文件路径
*
*/
const ExportUrl = baseUrl + "/files/"
const kh_ExportUrl = baseUrl + "/member/exportExcel"
const dd_ExportUrl = baseUrl + "/sale/order/orderListExcel"
const cp_ExportUrl = baseUrl + "/sale/order/examination/orderListExcel"
const qt_ExportUrl = baseUrl + "/member/assign/assignStatisticsExcel"
const czrz_ExportUrl = baseUrl + "/sale/order/log/logListExcel"
const tjbb_ExportUrl = baseUrl + "/sale/order/exportStatistics"
const hytj_ExportUrl = baseUrl + "/member/exportStatistics"
const yy_ExportUrl = baseUrl + "/hospital/exportExcel"
const ywx_ExportUrl = baseUrl + "/tryOn/exportRepairFinishListExcel"
const yys_ExportUrl = baseUrl + "/acceptance/exportTryOnAcceptedListExcel"
const ywxtj_ExportUrl = baseUrl + "/tryOn/exportRepairStatisticsExcel"
const ysctj_ExportUrl = baseUrl + "/tryOn/exportTriedOn"
const userInsert = baseUrl + "/sys/user/userInsert"
const userUpdate = baseUrl + "/sys/user/userUpdate"
const tryOnUploadImage = baseUrl + "/tryOn/tryOnUploadImage"
const exportExperienceStatisticsExcel = baseUrl + "/back/visit/exportExperienceStatisticsExcel"
const exportUseStatisticsExcel = baseUrl + "/back/visit/exportUseStatisticsExcel"
const exportBackStatisticsExcel = baseUrl + "/back/visit/exportBackStatisticsExcel"
const exportBackVisitOutflowExcel = baseUrl + "/back/visit/exportBackVisitOutflowExcel"
const exportVisitFinishExcel = baseUrl + "/back/visit/exportVisitFinishExcel"
const exportAppraisalExcel = baseUrl + "/member/assign/exportAppraisalExcel"
const exportExamineStatistics = baseUrl + "/examination/exportExamineStatistics"
const exportExamineJoinStatistics = baseUrl + "/examination/exportExamineJoinStatistics"
const exportShapeStatisticsExcel = baseUrl + "/shape/exportShapeStatisticsExcel"
const makeInsoleExport = baseUrl + "/shape/makeInsoleExport"
const exportHospitalAndSaleBase = baseUrl + "/hospital/exportHospitalAndSaleBase"
const download3Dqs = baseUrl + '/examination/download3Dqs'
const download3Dzb = baseUrl + '/examination/download3Dzb'
const downloadZdyl = baseUrl + '/examination/downloadZdyl'
export default {
    baseUrl,
    ExportUrl,
    kh_ExportUrl,
    dd_ExportUrl,
    cp_ExportUrl,
    qt_ExportUrl,
    czrz_ExportUrl,
    tjbb_ExportUrl,
    hytj_ExportUrl,
    yy_ExportUrl,
    yys_ExportUrl,
    ywxtj_ExportUrl,
    ysctj_ExportUrl,
    userInsert,
    userUpdate,
    tryOnUploadImage,
    ywx_ExportUrl,
    exportExperienceStatisticsExcel,
    exportUseStatisticsExcel,
    exportBackStatisticsExcel,
    exportBackVisitOutflowExcel,
    exportVisitFinishExcel,
    exportAppraisalExcel,
    exportExamineStatistics,
    exportExamineJoinStatistics,
    exportShapeStatisticsExcel,
    makeInsoleExport,
    exportHospitalAndSaleBase,
    downloadZdyl,
    download3Dzb,
    download3Dqs
}