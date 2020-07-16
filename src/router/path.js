/**
 * @param {LoginPage}    登录页面 
 * @param {Support}      支具页面 
 * @param {Evaluation}   测评页面 
 * @param {Front}        前台页面 
 * @param {Modify}       修型页面 
 * @param {TakeType}     取型页面 
 * @param {bigClient}    大客户页面
 * @param {outWork}      外出体检
 * @param {Process}      加工车间
 * @param {Quality}      质检部
 * @param {tryclothes}   试穿 + 维修
 * @param {Warehouse}    库房
 * @param {Return}       回访
 * @param {Theory}       理论
 * @param {SuperManage}  超级管理员
 * 
 */


// const Support = resolve => require(['@/components/support'], resolve)
const LoginPage = resolve => require(['../components/login'], resolve)
// const Evaluation = resolve => require(['../components/evaluation'], resolve)
// const Front = resolve => require(['../components/front'], resolve)
// const TakeType = resolve => require(['../components/taketype'], resolve)
// const Modify = resolve => require(['../components/modify'], resolve)
// const BigClient = resolve => require(['../components/bigclient'], resolve)
// const OutWork = resolve => require(['../components/outwork'], resolve)
// const Process = resolve => require(['../components/process'], resolve)
// const Quality = resolve => require(['../components/quality'], resolve)
// const TryClothes = resolve => require(['../components/tryclothes'], resolve)
// const Fiance = resolve => require(['../components/fiance'], resolve)
// const Warehouse = resolve => require(['../components/warehouse'], resolve)
// const Return = resolve => require(['../components/return'], resolve)
// const Theory = resolve => require(['../components/theory'], resolve)
// const SuperManage = resolve => require(['../components/supermanage'], resolve)
const Error = resolve => require(['../components/error'], resolve)
// const FrontUser = resolve => require(['../components/frontUser'], resolve)
const Home = resolve => require(['../components/home'], resolve)

const menuList_data = [
  { name: "super", text: "超级管理员" },
  { name: "frontdesk", text: "前台" },
  { name: "supports", text: "支具室" },
  { name: "take", text: "取型" },
  { name: "tryclothes", text: "试穿" },
  { name: "evaluationPage", text: "测评" },
  { name: "return", text: "回访管理" },
  { name: "specialUser", text: "前台统计员" },
  { name: "bigClient", text: "大客户" },
  { name: "outwork", text: "外出体检" },
]
//根据当前链接地址 显示界面信息
function viewPage_function(arg, list) {
  let data = list
  let witchPage = null
  data.forEach(element => {
    if (element.name == arg) {
      witchPage = element.text;
    }
  });
  return witchPage
}
export default {
  menuList_data,
  viewPage_function,
  // Support,
  LoginPage,
  // Evaluation,
  // Front,
  // TakeType,
  // Modify,
  // BigClient,
  // OutWork,
  // Process,
  // Quality,
  // TryClothes,
  // Fiance,
  // Warehouse,
  // Return,
  // Theory,
  // SuperManage,
  Error,
  // FrontUser,
  Home
}