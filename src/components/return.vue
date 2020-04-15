<template>
  <div style="height:100%">
    <!-- <el-button type="danger" style="position:absolute; z-index:9999;top: 100px;"  @click="addTab('orderManage')">增加</el-button> -->
    <!-- <v-header :navTabs="navTabs" :secNav="secNav" v-on:acceptTitle="newTitle"></v-header> -->
    <my-header :navTables="navTable" v-on:acceptTitle="newTitle"></my-header>
    <div class="child_page">
      <el-tabs class="table_style" v-model="tableNav" type="card" @tab-remove="removeTab">
        <el-tab-pane
          class="home_table"
          v-for="(item) in tables"
          :key="item.name"
          :closable="item.isClose"
          :label="item.title"
          :name="item.name"
        >
          <component :is="item.content"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      tableNav: "home",
      tabIndex: "home",
      tables: [
        {
          title: "首页",
          name: "home",
          content: "return-home",
          isClose: false
        }
      ],
      navTable: [
        {
          name: "will",
          title: "产品体验待回访"
        },
        {
          name: "productUseVisits",
          title: "产品使用待回访"
        },
        {
          name: "reviewInvitation",
          title: "复查邀约待回访"
        },
        {
          name: "log",
          title: "已回访"
        },
        {
          name: "remind",
          title: "待复查"
        },
        {
          name: "question",
          title: "已流失"
        },
        {
          name: "statistic",
          title: "产品体验统计"
        },
        {
          name: "productUsageStatistics",
          title: "产品使用统计"
        },
        {
          name: "reviewInvitationStatistics",
          title: "复查邀约统计"
        }
      ],
      // navTabs: [
      //     {
      //         title: '回访管理',
      //         key: 'harf',
      //         childItem: [
      //             {
      //                 title: '回访记录',
      //                 key: 'log',
      //             },
      //             {
      //                 title: '待人工回访',
      //                 key: 'will',
      //             },
      //             {
      //                 title: '问题反馈',
      //                 key: 'question',
      //             },
      //         ]
      //     },
      //     {
      //         title: '复查管理',
      //         key: 'all',
      //         childItem: [
      //             {
      //                 title: '复查已提醒',
      //                 key: 'remind',
      //             },
      //             {
      //                 title: '复查逾期未到',
      //                 key: 'notget',
      //             },
      //         ]
      //     },
      // ],
      // secNav: [
      //     {
      //         title: '统计报表',
      //         key: 'statistic',
      //     }
      // ],
      Repeat: false
    };
  },
  // directives: {
  //   noclose: {
  //     // 指令的定义
  //     inserted: function(el) {
  //       let domProperty = el.getAttribute("data");
  //       el.setAttribute("closable", false);
  //       if (domProperty === "homepage") {
  //         el.setAttribute("closable", true);
  //       } else {
  //         console.log(2);
  //       }
  //     }
  //   }
  // },
  methods: {
    // 增加标签
    newTitle(item, itemPath) {
      console.log(item);
      let newTabName = item + "";
      this.tableNav = newTabName;
      this.Repeat = true;
      this.tables.map(v => {
        if (v.name === item) {
          this.Repeat = false;
        }
      });
      if (this.Repeat) {
        switch (newTabName) {
          case "log":
            this.tables.push({
              title: "已回访",
              name: newTabName,
              content: "return-log",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "will":
            this.tables.push({
              title: "产品体验待回访",
              name: newTabName,
              content: "return-will",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "productUseVisits":
            this.tables.push({
              title: "产品使用待回访",
              name: newTabName,
              content: "return-productUseVisits",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "reviewInvitation":
            this.tables.push({
              title: "复查邀约待回访",
              name: newTabName,
              content: "return-reviewInvitation",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "question":
            this.tables.push({
              title: "已流失",
              name: newTabName,
              content: "return-question",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "remind":
            this.tables.push({
              title: "待复查",
              name: newTabName,
              content: "return-remind",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "statistic":
            this.tables.push({
              title: "产品体验统计",
              name: newTabName,
              content: "return-statistic",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "productUsageStatistics":
            this.tables.push({
              title: "产品使用统计",
              name: newTabName,
              content: "return-productUsageStatistics",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "reviewInvitationStatistics":
            this.tables.push({
              title: "复查邀约统计",
              name: newTabName,
              content: "return-reviewInvitationStatistics",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
        }
      } else {
        return;
      }
    },

    //移除标签
    /*
     * @param  {Object} targetName {content, isClose, name, title}
     */
    removeTab(targetName) {
      let activeName = this.tableNav;
      let tabs = this.tables;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.tableNav = activeName;
      this.tables = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.child_page {
  width: calc(100% - 180px);
  height: calc(100% - 60px);
  display: inline-block;
  position: absolute;
  top: 60px;
  left: 180px;
}
</style>
