const seach={
    siteLists: [],
    siteValue: null,
    provinceId: null,
    cityId: null,
    provinceIdList: [],
    cityIdList: [],
    name: "",
    phone: "",
    createTime: null,
    createName: null,
    daofang: {
      select: [
        {
          type: 1,
          name: "已到访"
        },
        {
          type: 0,
          name: "未到访"
        }
      ],
      value: ""
    },
    xiadan: {
      select: [
        {
          type: 1,
          name: "下单"
        },
        {
          type: 0,
          name: "未下单"
        }
      ],
      value: ""
    },
    renzhi: {
      select: [
        {
          type: 0,
          name: "全部"
        },
        {
          type: 1,
          name: "AA"
        },
        {
          type: 2,
          name: "AB"
        },
        {
          type: 3,
          name: "BA"
        },
        {
          type: 4,
          name: "BB"
        }
      ],
      value: ""
    },
    laiyuan: {
      select: [
        {
          type: 0,
          name: "全部"
        },
        {
          type: 1,
          name: "自然发病"
        },
        {
          type: 2,
          name: "入托"
        },
        {
          type: 3,
          name: "入园"
        },
        {
          type: 4,
          name: "调研"
        },
        {
          type: 5,
          name: "体检"
        },
        {
          type: 6,
          name: "其他"
        }
      ],
      value: ""
    },
    heimingdans: [
      {
        type: 1,
        name: "是"
      },
      {
        type: "0",
        name: "否"
      }
    ],
    heimingdanValue: null
  };
const seach_PJ={
    memberName: null,
    phone: null,
    appraisalTime: null,
    serviceTime: null,
    evaluationValue: null,
    evaluations: [
      { name: "取型评价", id: 310 },
      { name: "测评评价", id: 201 },
      { name: "试穿评价", id: 360 },
      { name: "维修评价", id: 370 },
    ],
    servicePersonnel: null,
    EvaluationResultValue: null,
    EvaluationResults: [
      { name: "十分满意", id: 1 },
      { name: "满意", id: 2 },
      { name: "一般", id: 3 },
      { name: "不满意", id: 4 },
      { name: "十分不满意", id: 5 }
    ],
    siteLists: [],
    siteValue: null,
    provinceId: null,
    cityId: null,
    provinceIdList: [],
    cityIdList: [],
    userNameList:[],
};
const left_drawer_data={
  search:{
    time:null,
    timePeriod:null,
    memberName:null,
    phone:null,
    phone:null,
    reservedType:null,
    productName:null,
    user:null,
  },
  timePeriodList:[
    {name:"上午"},
    {name:"下午"},
  ],
  reservedTypeList:[
    {name:"复查"},
    {name:"试穿"},
  ],
  userList:[],
  clientData:[],
  pages: {
    total: 10,
    pageSize: 10,
    currentPage: 1
  },
  loading:true,
  isSearch:true,
  lef_drawer: false,
};
const assigned_reception_data={
  userList:[],
  user:[],
  userObj:{},
  fpjd_product:[]
}
export default{
    seach,
    seach_PJ,
    left_drawer_data,
    assigned_reception_data
}