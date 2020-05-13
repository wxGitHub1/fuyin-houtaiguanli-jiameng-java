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
  }
export default{
    seach
}