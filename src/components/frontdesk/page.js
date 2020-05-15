
/**
 * 合并列表序号
 * @param {*} that 
 */
 function rowspan(that) {
    that.clientData.forEach((item, index) => {
      if (index === 0) {
        that.spanArr.push(1);
        that.position = 0;
        that.spanArr2.push(1);
        that.position2 = 0;
      } else {
        if (
          that.clientData[index].memberId ===
          that.clientData[index - 1].memberId
        ) {
          that.spanArr[that.position] += 1;
          that.spanArr.push(0);
        } else {
          that.spanArr.push(1);
          that.position = index;
        }
        if (
          that.clientData[index].orderNum ===
            that.clientData[index - 1].orderNum &&
          !!that.clientData[index - 1].orderNum &&
          !!that.clientData[index].orderNum
        ) {
          that.spanArr2[that.position2] += 1;
          that.spanArr2.push(0);
        } else {
          that.spanArr2.push(1);
          that.position2 = index;
        }
      }
    });
  }
  export default{
    rowspan
}