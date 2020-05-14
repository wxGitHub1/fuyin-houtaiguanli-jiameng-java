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


const Support = resolve => require(['@/components/support'], resolve)
const LoginPage = resolve => require(['../components/login'], resolve)
const Evaluation = resolve => require(['../components/evaluation'], resolve)
const Front = resolve => require(['../components/front'], resolve)
const TakeType = resolve => require(['../components/taketype'], resolve)
const Modify = resolve => require(['../components/modify'], resolve)
const BigClient = resolve => require(['../components/bigclient'], resolve)
const OutWork = resolve => require(['../components/outwork'], resolve)
const Process = resolve => require(['../components/process'], resolve)
const Quality = resolve => require(['../components/quality'], resolve)
const TryClothes = resolve => require(['../components/tryclothes'], resolve)
const Fiance = resolve => require(['../components/fiance'], resolve)
const Warehouse = resolve => require(['../components/warehouse'], resolve)
const Return = resolve => require(['../components/return'], resolve)
const Theory = resolve => require(['../components/theory'], resolve)
const SuperManage = resolve => require(['../components/supermanage'], resolve)
const Error = resolve => require(['../components/error'], resolve)
const FrontUser = resolve => require(['../components/frontUser'], resolve)


export { Support, LoginPage, Evaluation, Front, TakeType, Modify, BigClient, OutWork, Process, Quality, TryClothes, Fiance, Warehouse, Return, Theory, SuperManage, Error, FrontUser };
//根据当前链接地址 显示界面信息
export function viewPage_function(arg) {
  let outworks = new RegExp("outwork");
  let bigclients = new RegExp("bigclient");
  let supermanage = new RegExp("supermanage");
  let Support = new RegExp("Support");
  let Front = new RegExp("Front");
  let TakeType = new RegExp("TakeType");
  let clothes = new RegExp("clothes");
  let Evaluation = new RegExp("Evaluation");
  let Return = new RegExp("return");
  let FrontUser = new RegExp("specialUser");
  if (outworks.test(arg)) {
    let witchPage = "外出体检";
    return witchPage
  } else if (bigclients.test(arg)) {
    witchPage = "大客户";
  } else if (supermanage.test(arg)) {
    let witchPage = "超级管理员";
    return witchPage
  } else if (Front.test(arg)) {
    let witchPage = "前台";
    return witchPage
  } else if (Support.test(arg)) {
    let witchPage = "支具室";
    return witchPage
  } else if (TakeType.test(arg)) {
    let witchPage = "取型";
    return witchPage
  } else if (clothes.test(arg)) {
    let witchPage = "试穿";
    return witchPage
  } else if (Evaluation.test(arg)) {
    let witchPage = "测评";
    return witchPage
  } else if (Return.test(arg)) {
    let witchPage = "回访管理";
    return witchPage
  } else if (FrontUser.test(arg)) {
    let witchPage = "前台统计员";
    return witchPage
  }
}
export const actions_data = {
  超级管理员: "/supermanage",
  大客户: "/bigclient",
  外出体检: "/outwork",
  前台: "/Front",
  支具室: "/Support",
  取型: "/TakeType",
  试穿: "/clothes",
  测评: "/Evaluation",
  回访管理: "/return",
  前台统计员: "/specialUser",
  "404": "/404"
};