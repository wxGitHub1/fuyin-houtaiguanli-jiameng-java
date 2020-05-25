<template>
  <div style="height:100%">
    <!-- <el-button type="danger" style="position:absolute; z-index:9999;top: 100px;"  @click="addTab('orderManage')">增加</el-button> -->
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
      tableNav: "clientManage",
      tabIndex: "clientManage",
      tables: [
        {
          title: "客户管理",
          name: "clientManage",
          content: "front-client",
          isClose: false
        }
      ],
      navTable: [
         {
          name: "clientManage",
          iconfont:'iconfont',
          icon:'icon-kehuguanli',
          title: "客户管理"
        },
        {
          name: "pendingTrialAcceptance",
          iconfont:'iconfont',
          icon:'icon-shouhuoyanshou',
          title: "待试穿验收"
        },
        {
          name: "accepted",
          iconfont:'iconfont',
          icon:'iicon-wangongyanshou',
          title: "已验收"
        },{
          name: "toBeAllocated",
          iconfont:'iconfont',
          icon:'icon-zhengshifuwushangliebiao-',
          title: "待分配"
        },
        {
          name: "willmessage",
          iconfont:'iconfont',
          icon:'icon-dadianhua',
          title: "待通知"
        },
        {
          name: "willtake",
          iconfont:'iconfont',
          icon:'icon-3chuanyixiguan',
          title: "待试穿"
        },
        {
          name: "take",
          iconfont:'iconfont',
          icon:'icon-yiwancheng',
          title: "已试穿"
        },
        
        {
          name: "willrepair",
          iconfont:'iconfont',
          icon:'icon-baoxiu',
          title: "待报修"
        },

        {
          name: "willmaintain",
          iconfont:'iconfont',
          icon:'icon-weixiu1',
          title: "待维修"
        },

        {
          name: "maintain",
          iconfont:'iconfont',
          icon:'icon-weixiujilu',
          title: "已维修"
        },
        {
          name: "triedStatistics",
          iconfont:'iconfont',
          icon:'icon-navicon-tjb1',
          title: "试穿统计"
        },
        {
          name: "repairedStatistics",
          iconfont:'iconfont',
          icon:'icon-navicon-tjb',
          title: "维修统计"
        }
      ],
      Repeat: false
    };
  },
  directives: {
    noclose: {
      // 指令的定义
      inserted: function(el) {
        let domProperty = el.getAttribute("data");
        el.setAttribute("closable", false);
        if (domProperty === "homepage") {
          el.setAttribute("closable", true);
        } else {
          console.log(2);
        }
      }
    }
  },
  methods: {
    // 增加标签
    newTitle(prop) {
      let _this = this;
      let newTabName = prop + "";
      this.tableNav = newTabName;
      _this.Repeat = true;
      _this.tables.map(item => {
        if (item.name === prop) {
          _this.Repeat = false;
        }
      });
      if (_this.Repeat) {
        switch (newTabName) {
          case "clientManage":
            _this.tables.push({
              title: "客户管理",
              name: newTabName,
              content: "front-client",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "willmessage":
             _this.tables.push({
              title: "待通知",
              name: newTabName,
              content: "try-message",
              isClose: true
            });
            _this.tableNav = newTabName;
            break;
          case "pendingTrialAcceptance":
            _this.tables.push({
              title: "待试穿验收",
              name: newTabName,
              content: "try-acceptance",
              isClose: true
            });
            _this.tableNav = newTabName;
            break;
          case "accepted":
            _this.tables.push({
              title: "已验收",
              name: newTabName,
              content: "try-accepted",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "toBeAllocated":
            _this.tables.push({
              title: "待分配",
              name: newTabName,
              content: "to-be-allocated",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "willtake":
            _this.tables.push({
              title: "待试穿",
              name: newTabName,
              content: "try-willtake",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "willrepair":
            _this.tables.push({
              title: "待报修",
              name: newTabName,
              content: "maintain-repair",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "willtake":
            _this.tables.push({
              title: "待试穿",
              name: newTabName,
              content: "try-willtake",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "willmaintain":
            _this.tables.push({
              title: "待维修",
              name: newTabName,
              content: "will-maintain",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "take":
            _this.tables.push({
              title: "已试穿",
              name: newTabName,
              content: "try-take",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "maintain":
            _this.tables.push({
              title: "已维修",
              name: newTabName,
              content: "maintain",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "repairedStatistics":
            _this.tables.push({
              title: "维修统计",
              name: newTabName,
              content: "repaired-statistics",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "triedStatistics":
            _this.tables.push({
              title: "试穿统计",
              name: newTabName,
              content: "tried-statistics",
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
// .child_page {
//   width: calc(100% - 180px);
//   height: calc(100% - 60px);
//   display: inline-block;
//   position: absolute;
//   top: 60px;
//   left: 180px;
// }
</style>
