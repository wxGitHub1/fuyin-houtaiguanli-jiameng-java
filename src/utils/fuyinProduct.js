// global.js复制文件
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