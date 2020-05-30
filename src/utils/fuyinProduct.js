const isShow = {
  product_1: false,
  product_2: false,
  product_3: false,
  product_4: false,
  product_5: false,
  product_6: false,
  product_7: false,
  product_8: false,
  product_9: false,
  product_10: false,
  product_11: false,
  product_12: false,
  product_13: false,
  product_14: false,
  product_15: false,
  product_16: false,
  product_17: false,
  product_18: false,
  product_19: false,
  product_20: false,
  product_21: false,
  product_22: false,
  product_23: false,
  product_24: false,
  product_25: false,
  product_26: false,
  product_27: false,
  product_28: false,
  product_29: false,
  product_30: false,
  product_31: false,
  product_kaifa: false
};
// const fy_product = {
//   "膝关节固定器（FYKF-T-Y-HO-D-Ⅰ）": 1,
//   "膝关节矫形器（FYKF-S-XZ-KO-006）": 1,
//   "颈部矫形器（FYKF-S-JZ-CO-006）": 2,
//   "骨科保护支具（FYKF-J-Y-CTLO-D）": 2,
//   "脊椎矫形器（FYKF-S-JZ-TLSO-008）": 3,
//   "骨科保护支具（FYKF-J-Y-TLSO-D-Ⅰ）": 3,
//   "骨科保护支具（FYKF-J-Y-TLSO-D-Ⅳ）": 3,
//   "脊椎矫形器（FYKF-S-JZ-TLSO-013）": 3,
//   "膝关节矫形器（FYKF-S-XZ-KO-012）": 4,
//   "膝关节矫形器（FYKF-S-XZ-KO-013）": 4,
//   "骨科保护支具（FYKF-J-Y-KO-D-Ⅱ）": 4,
//   "骨科保护支具（FYKF-J-Y-KO-D-Ⅳ）": 4,
//   "足部矫形器（FYKF-R-XZ-FO-004）": 5,
//   "足部矫形器（FYKF-R-XZ-FO-005）": 5,
//   "足部矫形器（FYKF-R-XZ-FO-006）": 5,
//   "骨科保护支具（FYKF-J-R-FO-D-Ⅰ）": 5,
//   "骨科保护支具（FYKF-J-R-FO-D-Ⅱ）": 5,
//   "骨科保护支具（FYKF-J-R-FO-D-Ⅱ）": 5,
//   "踝关节矫形器（FYKF-S-XZ-AO-011）": 6,
//   "踝关节矫形器（FYKF-S-XZ-AO-012）": 6,
//   "骨科保护支具（FYKF-J-Y-KAFO-D-Ⅳ）": 6,
//   "骨科保护支具（FYKF-J-Y-KAFO-D-Ⅲ）": 6,
//   "踝关节矫形器（FYKF-S-XZ-AO-013）": 7,
//   "踝关节矫形器（FYKF-S-XZ-AO-014）": 7,
//   "骨科保护支具（FYKF-J-Y-AFO-D-Ⅱ）": 7,
//   "骨科保护支具（FYKF-J-Y-AFO-D-Ⅰ）": 7,
//   "踝关节矫形器（FYKF-S-XZ-AO-008）": 8,
//   "踝关节矫形器（FYKF-S-XZ-AO-009）": 8,
//   "踝关节矫形器（FYKF-S-XZ-AO-010）": 8,
//   "踝关节矫形器（FYKF-S-XZ-AO-007）": 8,
//   "踝关节矫形器（FYKF-S-XZ-AO-006）": 8,
//   "踝关节矫形器（FYKF-S-XZ-AO-006）": 8,
//   "足托固定器（FYKF-T-S-AO-D-Ⅰ）": 8,
//   "足托固定器（FYKF-G-S-AO-D）": 8,
//   "膝关节矫形器（FYKF-S-XZ-KO-010）": 8,
//   "骨科保护支具（FYKF-J-Y-KO-D-Ⅰ）": 8,
//   "膝关节矫形器（FYKF-S-XZ-KO-011）": 9,
//   "骨科保护支具（FYKF-J-Y-KO-D-Ⅲ）": 9,
//   "膝关节矫形器（FYKF-S-XZ-KO-015）": 10,
//   "膝关节固定器（FYKF-T-Y-HO-D-Ⅲ）": 10,
//   "长腿矫形器（FYKF-S-XZ-KAFO-005）": 11,
//   "医用外固定支具（FYKF-G-Y-KAFO-D）": 11,
//   "长腿矫形器（FYKF-S-XZ-KAFO-011）": 12,
//   "可调式固定支具（FYKF-T-Y-KAFO-D-Ⅲ）": 12,
//   "长腿矫形器（FYKF-S-XZ-KAFO-013）": 12,
//   "膝关节矫形器（FYKF-S-XZ-KO-005）": 13,
//   "膝关节固定器（FYKF-G-Y-HO-D）": 13,
//   "膝关节矫形器（FYKF-S-XZ-KO-007）": 13,
//   "膝关节固定器（FYKF-T-Y-HO-D-Ⅱ）": 13,
//   "长腿矫形器（FYKF-S-XZ-KAFO-006）": 14,
//   "可调式固定支具（FYKF-T-Y-KAFO-D-Ⅰ）": 14,
//   "可调式固定支具（FYKF-T-Y-KAFO-D-Ⅱ）": 14,
//   "长腿矫形器（FYKF-S-XZ-KAFO-007）": 14,
//   "长腿矫形器（FYKF-Z-XZ-KAFO-002）": 15,
//   "骨科保护支具（FYKF-J-Y-AFO-D-Ⅳ）": 15,
//   "足内旋扭转矫形器（带鞋）": 15,
//   "长腿矫形器（FYKF-S-XZ-KAFO-003）": 16,
//   "骨科保护支具（FYKF-J-Y-HKAFO-D）": 16,
//   "长腿矫形器（FYKF-S-XZ-KAFO-013）": 17,
//   "骨科保护支具（FYKF-J-Y-LSHKAFO-D）": 17,
//   "骨盆矫形器（FYKF-S-XZ-GPO-003）": 18,
//   "骨盆固定器（FYKF-G-Y-HO-D）": 18,
//   "髋关节矫形器（FYKF-S-XZ-HO-003）": 19,
//   "骨科保护支具（FYKF-J-Y-HO-D-Ⅰ）": 19,
//   "髋关节矫形器（FYKF-S-XZ-HO-012）": 20,
//   "可调式固定支具（FYKF-T-Y-HKAO-D-Ⅱ）": 20,
//   "髋关节矫形器（FYKF-S-XZ-HO-015）": 20,
//   "可调式固定支具（FYKF-T-Y-HKAFO-D-Ⅱ）": 20,
//   "髋关节矫形器（FYKF-S-XZ-HO-013）": 21,
//   "医用外固定支具（FYKF-G-Y-HKAFO-D）": 21,
//   "髋关节矫形器（FYKF-S-XZ-HO-014）": 22,
//   "可调式固定支具（FYKF-T-Y-HKAFO-D-Ⅰ）": 22,
//   "髋关节矫形器（FYKF-S-XZ-HO-018）": 23,
//   "骨科保护支具（FYKF-J-Y-AFO-D-Ⅲ）": 23,
//   "髋关节矫形器（FYKF-S-XZ-HO-006）": 24,
//   "骨科保护支具（FYKF-J-Y-HO-D-Ⅳ）": 24,
//   "髋关节矫形器（FYKF-S-XZ-HO-007）": 25,
//   "医用外固定支具（FYKF-G-Y-HO-D）": 25,
//   "髋关节矫形器（FYKF-S-XZ-HO-008）": 26,
//   "可调式固定支具（FYKF-T-Y-HO-D-Ⅱ）": 26,
//   "髋关节矫形器（FYKF-S-XZ-HO-009）": 26,
//   "髋关节矫形器（FYKF-S-XZ-HO-010）": 27,
//   "医用外固定支具（FYKF-G-Y-HKAO-D）": 27,
//   "丹尼斯布朗支具": 28,
//   "内旋带": 29,
//   "足部矫形器（FYKF-R-XZ-FO-009）": 29,
//   "骨科保护支具（FYKF-J-Y-AFO-D-Ⅳ）": 29,
//   "颈部矫形器（FYKF-S-JZ-CO-007）": 30,
//   "颈部矫形器（FYKF-S-JZ-CO-007）": 30,
//   "足部矫形器（FYKF-R-XZ-FO-009）": 31,
//   "骨科保护支具（FYKF-J-Y-AFO-D-Ⅳ）": 31,
//   isNo: "kaifa"
// }
const fy_product = {
  "FYKF-T-Y-HO-D-Ⅰ": 1,
  "FYKF-S-XZ-KO-006": 1,
  "FYKF-S-JZ-CO-006": 2,
  "FYKF-S-JZ-CO-005": 2,//新增
  "FYKF-G-Y-CTLSO-D": 2,//新增
  "FYKF-J-Y-CTLO-D": 2,
  "FYKF-S-JZ-TLSO-006": 3,//新增
  "FYKF-G-S-TLSO-D": 3,//新增
  "FYKF-S-JZ-TLSO-007": 3,//新增
  "FYKF-T-S-TLSO-FD": 3,//新增
  "FYKF-S-JZ-TLSO-009": 3,//新增
  "FYKF-S-JZ-TLSO-012": 3,//新增
  "FYKF-J-Y-CTLSO-D": 3,//新增
  "FYKF-S-JZ-TLSO-008": 3,
  "FYKF-J-Y-TLSO-D-Ⅰ": 3,
  "FYKF-J-Y-TLSO-D-Ⅳ": 3,
  "FYKF-S-JZ-TLSO-011": 3,//新增
  "FYKF-J-Y-TLSO-D-Ⅲ": 3,//新增
  "FYKF-S-JZ-TLSO-013": 3,
  "FYKF-S-JZ-TLSO-014": 3,
  "FYKF-J-Y-TLSO-D-Ⅴ": 3,//新增
  "FYKF-S-XZ-KO-012": 4,
  "FYKF-S-XZ-KO-013": 4,
  "FYKF-J-Y-KO-D-Ⅱ": 4,
  "FYKF-J-Y-KO-D-Ⅳ": 4,
  "FYKF-R-XZ-FO-004": 5,
  "FYKF-R-XZ-FO-005": 5,
  "FYKF-R-XZ-FO-006": 5,
  "FYKF-J-R-FO-D-Ⅰ": 5,
  "FYKF-J-R-FO-D-Ⅱ": 5,
  "FYKF-J-R-FO-D-Ⅱ": 5,
  "FYKF-S-XZ-AO-011": 6,
  "FYKF-S-XZ-AO-012": 6,
  "FYKF-J-Y-KAFO-D-Ⅳ": 6,
  "FYKF-J-Y-KAFO-D-Ⅲ": 6,
  "FYKF-S-XZ-AO-013": 7,
  "FYKF-S-XZ-AO-014": 7,
  "FYKF-J-Y-AFO-D-Ⅱ": 7,
  "FYKF-J-Y-AFO-D-Ⅰ": 7,
  "FYKF-S-XZ-AO-008": 8,
  "FYKF-S-XZ-AO-009": 8,
  "FYKF-S-XZ-AO-010": 8,
  "FYKF-S-XZ-AO-007": 8,
  "FYKF-S-XZ-AO-006": 8,
  "FYKF-T-S-AO-D-Ⅰ": 8,
  "FYKF-G-S-AO-D": 8,
  "FYKF-S-XZ-KO-010": 8,
  "FYKF-J-Y-KO-D-Ⅰ": 8,
  "FYKF-S-XZ-KO-011": 9,
  "FYKF-J-Y-KO-D-Ⅲ": 9,
  "FYKF-S-XZ-KO-015": 10,
  "FYKF-T-Y-HO-D-Ⅲ": 10,
  "FYKF-S-XZ-KAFO-005": 11,
  "FYKF-G-Y-KAFO-D": 11,
  "FYKF-S-XZ-KAFO-011": 12,
  "FYKF-T-Y-KAFO-D-Ⅲ": 12,
  "FYKF-S-XZ-KO-005": 13,
  "FYKF-G-Y-HO-D": 13,
  "FYKF-S-XZ-KO-007": 13,
  "FYKF-T-Y-HO-D-Ⅱ": 13,
  "FYKF-S-XZ-KAFO-006": 14,
  "FYKF-T-Y-KAFO-D-Ⅰ": 14,
  "FYKF-T-Y-KAFO-D-Ⅱ": 14,
  "FYKF-S-XZ-KAFO-007": 14,
  "FYKF-Z-XZ-KAFO-002": 15,
  "FYKF-J-Y-AFO-D-Ⅳ": 15,
  "FYKF-S-XZ-KAFO-003": 16,
  "FYKF-J-Y-HKAFO-D": 16,
  "FYKF-S-XZ-KAFO-013": 17,
  "FYKF-S-XZ-KAFO-001": 17,
  "FYKF-J-Y-KAFO-D-Ⅱ": 17,//新增
  "FYKF-J-Y-LSHKAFO-D": 17,
  "FYKF-S-XZ-GPO-003": 18,
  "FYKF-G-Y-HO-D": 18,
  "FYKF-S-XZ-HO-003": 19,
  "FYKF-J-Y-HO-D-Ⅰ": 19,
  "FYKF-S-XZ-HO-012": 20,
  "FYKF-S-XZ-HO-011": 20,//新增
  "FYKF-T-Y-HKAO-D-Ⅰ": 20,//新增
  "FYKF-T-Y-HKAO-D-Ⅱ": 20,
  "FYKF-S-XZ-HO-016": 20,//新增
  "FYKF-T-Y-HKAO-D-Ⅲ": 20,//新增
  "FYKF-S-XZ-HO-017": 20,//新增
  "FYKF-S-XZ-HO-015": 20,
  "FYKF-T-Y-HKAFO-D-Ⅱ": 20,
  "FYKF-S-XZ-HO-013": 21,
  "FYKF-G-Y-HKAFO-D": 21,
  "FYKF-S-XZ-HO-014": 22,
  "FYKF-T-Y-HKAFO-D-Ⅰ": 22,
  "FYKF-S-XZ-HO-018": 23,
  "FYKF-J-Y-AFO-D-Ⅲ": 23,
  "FYKF-S-XZ-HO-006": 24,
  "FYKF-J-Y-HO-D-Ⅳ": 24,
  "FYKF-S-XZ-HO-007": 25,
  "FYKF-G-Y-HO-D": 25,
  "FYKF-S-XZ-HO-008": 26,
  "FYKF-T-Y-HO-D-Ⅱ": 26,
  "FYKF-S-XZ-HO-009": 26,
  "FYKF-S-XZ-HO-010": 27,
  "FYKF-G-Y-HKAO-D": 27,
  "FYKF-R-XZ-FO-009": 29,
  "FYKF-S-JZ-CO-007": 30,
  "FYKF-J-Y-AFO-D-Ⅳ": 31,
  isNo: "kaifa"
}
export default {
  isShow,
  fy_product
}

/**
 * 移除标签
 * @param {*} targetName {content, isClose, name, title}  而发生打发是
 */
// function removeTab(that, targetName) {
//   let activeName = that.tableNav;
//   let tabs = that.tables;
//   if (activeName === targetName) {
//       tabs.forEach((tab, index) => {
//           if (tab.name === targetName) {
//               let nextTab = tabs[index + 1] || tabs[index - 1];
//               if (nextTab) {
//                   activeName = nextTab.name;
//               }
//           }
//       })
//   };
//   that.tableNav = activeName;
//   that.tables = tabs.filter(tab => tab.name !== targetName);
// }

/**
* 增加标签
* @param {*} that 
* @param {*} newTabName 
*/
// function newTitle(that,newTabName) {
//   that.tableNav = newTabName;
//   let Repeat = true;
//   that.tables.map(item => {
//       if (item.name === newTabName) {
//           Repeat = false
//       }
//   });
//   if (Repeat) {
//       that.navTable.forEach(obj => {
//           if (obj.name == newTabName) {
//               that.tables.push({
//                   title: obj.title,
//                   name: obj.name,
//                   content: obj.content,
//                   isClose: true
//               });
//           }
//       })
//   }
// }
// export default {
//   removeTab,
//   newTitle
// }