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
      tableNav: "home",
      tabIndex: "home",
      tables: [
        {
          title: "首页",
          name: "home",
          content: "front-home",
          isClose: false
        }
      ],
      navTable: [
        {
          name: "clientManage",
          title: "客户管理"
        },
        {
          name: "orderManage",
          title: "订单管理"
        },
        {
          name: "alreadyReceive",
          title: "已分配"
        },
        {
          name: "comment",
          title: "待评价"
        },
        {
          name: "evaluationManagement",
          title: "评价管理"
        },
        {
          name: "statistics",
          title: "统计报表"
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
          case "alreadyReceive":
            _this.tables.push({
              title: "已分配",
              name: "alreadyReceive",
              content: "front-receive",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "evaluationManagement":
            _this.tables.push({
              title: "评价管理",
              name: "evaluationManagement",
              content: "front-evaluation",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "comment":
            _this.tables.push({
              title: "待评价",
              name: "comment",
              content: "comment",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "orderManage":
            _this.tables.push({
              title: "订单管理",
              name: "orderManage",
              content: "front-order",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "statistics":
            _this.tables.push({
              title: "统计报表",
              name: "statistics",
              content: "front-statistic",
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
