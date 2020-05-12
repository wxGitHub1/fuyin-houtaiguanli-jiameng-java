import axios from 'axios'
import {
  userListByDept,
  getProvinceList,
  getCityList,
  selectSiteListByCity,
  selectSiteListByCityAndUser,
  getHospitalList,
  getAllProvinceList,
  getAllCityList,
  selectExaminationBaseBySiteId,
  selectExaminationBaseList,
  selectBatchNumBySiteId,
  GetHospitalTypeList,
  getTechnicalList,
  getUserListForUserHospital,
} from "../api/javaApi";
//import { Promise, all, async } from "q";
// 导出Excel公用方法
/**
 * 
 * @param {*} lsyObj 李思雨导出文件集合
 * @param {*} self vue this对象
 *  method   方法
 *  url      路径
 *  data     数据
 */
export function exportMethod(self, lsyObj) {
  axios({
    method: lsyObj.method,
    url: lsyObj.url,
    data: lsyObj.data,
    responseType: 'blob'
  }).then((res) => {
    // debugger
    const link = document.createElement('a')
    let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    // link.download = res.headers['content-disposition'] //下载后文件名
    link.download = lsyObj.fileName //下载的文件名
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    self.$message({
      type: "success",
      message: "导出成功！",
      center: true
    });
    self.excelLoad = false
  }).catch(error => {
    self.$message({
      type: "error",
      message: "导出错误！",
      center: true
    });
    console.log(error)
  })
}
/**
 * 获取当前时间
 * @param {*} sf 是否精确到时分秒
 */
export function getTime(sf) {     	//获取时间
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  let x = date.getDay();//获取星期
  if (sf == "时分") {
    let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    return time
  } else {
    let time = year + '/' + month + '/' + day + '/' + hour + ':' + minute + ':' + second
    return time
  }

}
// getTime();
// setInterval(getTime, 1000);
//获取试穿6、测评9、取型8、维修人员12列表
/**
 * 
 * @param {*} id 试穿对应id：试穿6、测评9、取型8、维修人员12
 */
export function personnel(id = null, siteId = null) {
  let data = {
    deptId: id,
    siteId: siteId
  };
  if (id != null || siteId != null) {
    return new Promise((resolve) => {
      userListByDept(data)
        .then(res => {
          const myData = res.data.data;
          resolve(myData)
        })
        .catch(err => {
          console.log(err);
        });
    })
  }else{
    return new Promise((resolve) => {
      userListByDept()
        .then(res => {
          const myData = res.data.data;
          resolve(myData)
        })
        .catch(err => {
          console.log(err);
        });
      })
  }
}
//新增加盟获取全部省
export function joinAllProvince() {
  return new Promise((resolve) => {
    getAllProvinceList()
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//新增加盟获取全部市
export function joinAllCity(id) {
  let data = { provinceId: id };
  return new Promise((resolve) => {
    getAllCityList(data)
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//获取省
export function province() {
  return new Promise((resolve) => {
    getProvinceList()
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//获取市
export function city(id) {
  let data = { provinceId: id };
  return new Promise((resolve) => {
    getCityList(data)
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//根据市获取测评中心
export function site(id) {
  let data = { cityId: id };
  return new Promise((resolve) => {
    selectSiteListByCity(data)
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//根据测评中心获取测评项
export function evaluation(id) {
  let data = { siteId: id };
  return new Promise((resolve) => {
    selectExaminationBaseBySiteId(data)
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//获取全部测评项
export function evaluationList() {
  return new Promise((resolve) => {
    selectExaminationBaseList()
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//根据测评中心获取医院
export function hospital(id) {
  let data = { siteId: id };
  return new Promise((resolve) => {
    getHospitalList(data)
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//根据测评中心获取医院
export function batch(id) {
  let data = { siteId: id };
  return new Promise((resolve) => {
    selectBatchNumBySiteId(data)
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}
//根据各个信息获取测评中心
//siteId  siteName siteType  siteIdSelf   userId userName provinceId cityId
/**
 * 
 * @param {*} pId 省份id
 * @param {*} cId 城市id
 */
export function allSite(pId, cId) {
  let data = {
    provinceId: pId,
    cityId: cId
  };
  return new Promise((resolve) => {
    selectSiteListByCityAndUser(data)
      .then(res => {
        const myData = res.data.data;
        resolve(myData)
      })
      .catch(err => {
        console.log(err);
      });
  })
}

/**
 * 计算时间差函数
 * @param {*} startDate 开始时间  时间格式 2020-01-02 12:03
 */
export function TimeDifference(startDate) {
  //定义两个变量time1,time2分别保存开始和结束时间
  let time1 = startDate;
  let time2 = getTime('时分');
  //判断开始时间是否大于结束日期
  if (time1 > time2) {
    alert("开始时间不能大于结束时间！");
    return false;
  }
  //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
  let begin1 = time1.substr(0, 10).split("-");
  let end1 = time2.substr(0, 10).split("-");
  //将拆分的数组重新组合，并实例成化新的日期对象
  let date1 = new Date(begin1[1] + - + begin1[2] + - + begin1[0]);
  let date2 = new Date(end1[1] + - + end1[2] + - + end1[0]);
  //得到两个日期之间的差值m，以分钟为单位
  //Math.abs(date2-date1)计算出以毫秒为单位的差值
  //Math.abs(date2-date1)/1000得到以秒为单位的差值
  //Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
  let m = parseInt(Math.abs(date2 - date1) / 1000 / 60);
  //小时数和分钟数相加得到总的分钟数
  //time1.substr(11,2)截取字符串得到时间的小时数
  //parseInt(time1.substr(11,2))*60把小时数转化成为分钟
  let min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
  let min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));
  //两个分钟数相减得到时间部分的差值，以分钟为单位
  let n = min2 - min1;
  //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
  let minutes = m + n;
  return minutes
}
/**
 * element 提示消息封装函数
 * @param {*} that vue对象
 * @param {*} text 提示文字
 * @param {*} type 提示类型
 */
export function tips(that, text, type) {
  that.$message({
    type: type,
    message: text,
    center: true
  });
}
/**
 * 数组去重
 * @param {*} arr 数组
 */
export function arrayDeduplication(arr) {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    if (hash.indexOf(arr[i]) == -1) {
      hash.push(arr[i]);
    }
  }
  return hash;
}
/**
 * 网络图片转换base64编码
 * @param {*} img 
 */
export function getBase64Image(img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  let dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
}
/*****封装打印测评报告页面图片转化base64函数 */
/**
 * 
 * @param {*} that vue对象
 * @param {*} res 数据
 */
export function img_base64(that, res) {
  let img1 = res.zgRight;
  let img2 = res.zgLeft;
  let img3 = res.ggLeft;
  let img4 = res.ggRight;
  let image1 = new Image();
  image1.crossOrigin = "";
  image1.src = img1;
  let image2 = new Image();
  image2.crossOrigin = "";
  image2.src = img2;
  let image3 = new Image();
  image3.crossOrigin = "";
  image3.src = img3;
  image1.onload = () => {
    that.testReport.zgRight = getBase64Image(image1);
  };
  image2.onload = () => {
    that.testReport.zgLeft = getBase64Image(image2);
  };
  image3.onload = () => {
    that.testReport.ggLeft = getBase64Image(image3);
  };
  if (img4 != null || img4 != undefined) {
    let image4 = new Image();
    image4.crossOrigin = "";
    image4.src = img4;
    image4.onload = () => {
      that.testReport.ggRight = getBase64Image(image4);
    };
    that.isTwo = true;
  } else {
    that.isTwo = false;
  }

} 
