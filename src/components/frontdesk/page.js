/**
 * 表格合并行
 * @param {*} that 
 * @param {*} rowIndex 
 * @param {*} columnIndex 
 */
function objectSpanMethod(that, rowIndex, columnIndex) {
    if (columnIndex === 0) {
      const _row = that.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
    if (columnIndex === 1) {
      const _row = that.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
    if (columnIndex === 2) {
      const _row = that.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
    if (columnIndex === 3) {
      const _row = that.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
    if (columnIndex === 4) {
      const _row = that.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }

    if (columnIndex === 5) {
      const _row = that.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
    if (columnIndex === 8) {
      const _row = that.spanArr2[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
    if (columnIndex === 9) {
      const _row = that.spanArr2[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
    if (columnIndex === 10) {
      const _row = that.spanArr2[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
    if (columnIndex === 11) {
      const _row = that.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
  }
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
    objectSpanMethod,
    rowspan
}