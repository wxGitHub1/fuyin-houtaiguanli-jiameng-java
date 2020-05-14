const seachProduct={
    name: null,
    productTypeValue: null,
    qualification: null,
    productTypes:[
        { name: "会员卡", id: 1 },
        { name: "测评服务", id: 2 },
        { name: "固定定制", id: 301 },
        { name: "固定成品", id: 302 },
        { name: "矫形定制", id: 303 },
        { name: "矫形成品", id: 304 },
        { name: "低温板", id: 305 },
        { name: "外购", id: 306 }
      ],
    qualificationList: [
      { name: "一类", id: 1 },
      { name: "二类", id: 2 },
      { name: "默认", id: 3 }
    ],
    origin: null,
    recordNumber: null,
    nickname: null,
    originList: [
      { name: "国产", id: 1 },
      { name: "进口", id: 2 }
    ]
  }  
const seach={
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
          type: "0",
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
          type: "0",
          name: "自然发病"
        },
        {
          type: 1,
          name: "体检"
        },
        {
          type: 2,
          name: "调研"
        },
        {
          type: 3,
          name: "其他"
        },
        {
          type: 4,
          name: "儿保"
        }
      ],
      value: ""
    },
    heimingdan: {
      select: [
        {
          type: 1,
          name: "是"
        },
        {
          type: "0",
          name: "否"
        }
      ],
      value: ""
    },
    siteLists: [],
    siteValue: null,
    provinceId: null,
    cityId: null,
    provinceIdList: [],
    cityIdList: []
  }
 const addData=[
    {
      number: "自动生成",
      hospitals: null,
      hospitalValue: null,
      doctors: null,
      doctorValue: null,
      departments: null,
      departmentValue: null,
      prescriptionValue: null,
      prescriptions: [
        { id: 0, name: "儿保" },
        { id: 1, name: "住院" },
        { id: 2, name: "门诊" }
      ],
      condition: null,
      obCondition: null,
      siteValue: null,
      provinceId: null,
      cityId: null
    }
  ]
export default{
    seachProduct,
    seach,
    addData
}