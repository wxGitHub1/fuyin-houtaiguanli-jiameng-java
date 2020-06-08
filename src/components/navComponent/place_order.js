/**
 * 下单产品判断
 * @param {*} that vue对象
 */
 function choose_product(that){
        if (that.detailFormList.length == 0) {
          // debugger;
          // that.multipleSelection.forEach(obj=>{})
          if (that.multipleSelection.length >= 2) {
            let isTrue;
            for (let index = 0; index < that.multipleSelection.length; index++) {
              const element = that.multipleSelection[index];
              const element2 =
                that.multipleSelection[index + 1] ||
                that.multipleSelection[that.multipleSelection.length - 1];
              if (element.productOrderType != element2.productOrderType) {
                // debugger;
                isTrue = false;
                break;
              } else {
                isTrue = true;
              }
            }
            if (isTrue) {
              that.multipleSelection.forEach(obj => {
                that.detailFormList.push(obj);
              });
              that.detailFormList.forEach(obj => {
                obj.deliveryTime = null;
                obj.number = 1;
                obj.actual = obj.price;
                obj.demand = null;
                // obj.favorable = null;
                obj.favorableRemark = null;
              });
              // that.dialogselectProduct = false;
              that.paymentMethod.totalAmountReceivable = that.ysMoney();
              that.paymentMethod.arrears = that.xqMoney();
              that.cancelSelection();
            }else{
                that.$message({
                    type: "warning",
                    message: "不支持同时选择两种类型的产品！",
                    center: true
                  });
            }
          } else {
            that.multipleSelection.forEach(obj => {
              that.detailFormList.push(obj);
            });
            that.detailFormList.forEach(obj => {
              obj.deliveryTime = null;
              obj.number = 1;
              obj.actual = obj.price;
              obj.demand = null;
              // obj.favorable = null;
              obj.favorableRemark = null;
            });
            // that.dialogselectProduct = false;
            that.paymentMethod.totalAmountReceivable = that.ysMoney();
            that.paymentMethod.arrears = that.xqMoney();
            that.cancelSelection();
          }
        } else {
          let isTrue;
          let id;
          let tishi;

          for (let index = 0; index < that.multipleSelection.length; index++) {
            const element = that.multipleSelection[index];
            const element2 =
              that.multipleSelection[index + 1] ||
              that.multipleSelection[that.multipleSelection.length - 1];
            if (element.productOrderType != element2.productOrderType) {
              isTrue = false;
              break;
            } else {
              isTrue = true;
              id = element.productOrderType;
            }
          }

          for (let index = 0; index < that.detailFormList.length; index++) {
            const element = that.detailFormList[index];
            if (element.productOrderType != id) {
              tishi = true;
              break;
            } else {
              tishi = false;
            }
          }

          if (tishi) {
            that.$message({
              type: "warning",
              message: "不支持同时选择两种类型的产品！",
              center: true
            });
          } else {
            that.multipleSelection.forEach(obj => {
              that.detailFormList.push(obj);
            });
            that.detailFormList.forEach(obj => {
              obj.deliveryTime = null;
              obj.number = 1;
              obj.actual = obj.price;
              obj.demand = null;
              // obj.favorable = null;
              obj.favorableRemark = null;
            });
            // that.dialogselectProduct = false;
            that.paymentMethod.totalAmountReceivable = that.ysMoney();
            that.paymentMethod.arrears = that.xqMoney();
            that.cancelSelection();
            console.log(that.detailFormList);
          }
        }
      
}

export default{
    choose_product
}