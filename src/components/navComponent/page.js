import {
    getProvinceList,
    getCityList,
    selectSiteListByCity,
    getHospitalList,
    examinePadZb3d,
    changeSite,
    orderInsert
} from "../../api/javaApi";
// 下单默认选择第一项
/**
 * 
 * @param {*} that 
 */
function default_PCSH(that) {
    let addDataList = that.addData
    // console.log(addDataList)
    getProvinceList()
        .then(res => {
            let data1 = res.data.data;
            // console.log(data1[0].id);
            that.transferSite.provinceIdList = data1;
            addDataList[0].provinceId = data1[0].id;
            // console.log(addDataList[0])
            let data_a = { provinceId: data1[0].id };
            getCityList(data_a)
                .then(res => {
                    let data2 = res.data.data;
                    // console.log(data2[0].id);
                    that.seach.cityIdList = data2;
                    addDataList[0].cityId = data2[0].id;
                    // console.log(addDataList[0])
                    let data_b = { cityId: data2[0].id };
                    selectSiteListByCity(data_b)
                        .then(res => {
                            let data3 = res.data.data;
                            that.seach.siteLists = data3;
                            addDataList[0].siteValue = data3[0].id;
                            let data_c = { siteId: data3[0].id };
                            getHospitalList(data_c)
                                .then(res => {
                                    let data4 = res.data.data;
                                    addDataList[0].hospitals = data4;
                                    addDataList[0].hospitalValue = data4[0].id;
                                    that.departmentList(data4[0].id)
                                    that.addData = addDataList
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}
/**
 * 修改足长足宽
 * @param {*} that 
 */
function threeD_func(that){
    let data = {
      recordId: that.only_recordId,
      footLength:
        that.threeD_ObjFrom.list[1].name == "足长"
          ? that.threeD_ObjFrom.list[1].value
          : that.threeD_ObjFrom.list[0].value,
      footWidth:
        that.threeD_ObjFrom.list[0].name == "足宽"
          ? that.threeD_ObjFrom.list[0].value
          : that.threeD_ObjFrom.list[1].value
    };
    examinePadZb3d(data)
      .then(res => {
        if (res.data.returnCode != 0) {
          that.$message({
            type: "warning",
            message: res.data.returnMsg,
            center: true
          });
        } else {
          that.threeDDialg = false;
          that.dialogEvaluationDetails = false;
          that.$message({
            type: "success",
            message: "下单成功！",
            center: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  /**
   * 新增客户是否需要固定矫形类产品
   * @param {*} that 
   * @param {*} val 
   */
 function isRequired(that,val) {
    that.isShowVal = val;
    if (val == 2) {
      that.rules.phone[0].required = false;
      that.rules.birthday[0].required = false;
    } else {
      that.rules.phone[0].required = true;
      that.rules.birthday[0].required = true;
    }
  }
  /**
   * 转移测评中心
   * @param {*} that 
   */
 function confirmTransferSite_func(that) {
    let data = {
      memberId: that.currentNamberId,
      siteId: that.transferSite.siteId,
      phone: that.transferSite.sitePhone
    };
    changeSite(data)
      .then(res => {
        if (res.data.returnCode != 0) {
          that.$message({
            type: "warning",
            message: res.data.returnMsg,
            center: true
          });
        } else {
          that.cancelTransfer_func();
          that.pageList(that.pages.currentPage, that.pages.pageSize);
          that.$message({
            type: "success",
            message: "转移成功！",
            center: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
 function calculation(that) {
    that.paymentMethod.total =
      Number(that.paymentMethod.xj || 0) +
      Number(that.paymentMethod.zz || 0) +
      Number(that.paymentMethod.lkl || 0);
    that.paymentMethod.arrears = that.xqMoney();
    if (that.paymentMethod.total > that.paymentMethod.totalAmountReceivable) {
      that.$message({
        type: "warning",
        message: "实收金额大于应收金额！请重新输入金额!",
        center: true
      });
      that.paymentMethod.arrears = that.ysMoney();
      that.paymentMethod.total = 0;
    }

    if (that.paymentMethod.xj > 0 && that.paymentMethod.zz > 0) {
      that.paymentMethod.lx = 0;
    } else if (that.paymentMethod.xj > 0 && that.paymentMethod.lkl > 0) {
      that.paymentMethod.lx = 0;
    } else if (that.paymentMethod.zz > 0 && that.paymentMethod.lkl > 0) {
      that.paymentMethod.lx = 0;
    } else if (that.paymentMethod.zz > 0) {
      that.paymentMethod.lx = 3;
    } else if (that.paymentMethod.xj > 0) {
      that.paymentMethod.lx = 2;
    } else if (that.paymentMethod.lkl > 0) {
      that.paymentMethod.lx = 1;
    } else {
      that.paymentMethod.lx = null;
    }
  }
 function orderingStart(that) {
    let priceTatol = [];
    for (let index = 0; index < that.detailFormList.length; index++) {
      const element = that.detailFormList[index];
      priceTatol.push(element.price);
    }
    let price = eval(priceTatol.join("+"));
    let data = {
      customerId: that.currentNamberId,
      prescriptionId: that.currentPrescriptions[0].prescriptionId,
      quickly: that.jjChecked == true ? 1 : 0,
      price: price,
      should: that.paymentMethod.totalAmountReceivable,
      actual: that.paymentMethod.total,
      lakala: that.paymentMethod.lkl,
      cash: that.paymentMethod.xj,
      transfer: that.paymentMethod.zz,
      payType: that.paymentMethod.lx,
      hospital: 1,
      orderUserName: that.orderingPerson,
      detailFormList: that.detailFormList
    };
    //判断交货日期必填
    let jhrq = true;
    that.detailFormList.forEach(obj => {
      if (
        obj.process == 1
        // ||
        // obj.source == "定制产品" ||
        // obj.source == "试穿成品" ||
        // obj.source == "外购产品"
      ) {
        if (!obj.deliveryTime) {
          jhrq = false;
          return jhrq;
        }
      }
    });
    // debugger;
    if (data.actual < data.lakala + data.cash + data.transfer) {
      that.$message({
        type: "warning",
        message: "支付金额大于应收金额请从新输入！",
        center: true
      });
    } else if (jhrq === false) {
      that.$message({
        type: "warning",
        message: "请填写交货日期！",
        center: true
      });
    } else {
      orderInsert(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            that.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            that.readyOrderCancel();
            that.handleInfo(that.currentNamberId);
            that.$message({
              type: "success",
              message: "下单成功！",
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
export default{
    default_PCSH,
    threeD_func,
    isRequired,
    confirmTransferSite_func,
    calculation,
    orderingStart
}