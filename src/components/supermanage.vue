<template>
  <div style="height:100%">
    <my-header :navTables="navTable" v-on:acceptTitle="newTitle"></my-header>
    <div class="child_page">
      <el-tabs v-model="tableNav" type="card" @tab-remove="removeTab" @tab-click="handleClick">
        <el-tab-pane
          class="home_table"
          v-for="(item) in tables"
          :key="item.name"
          :closable="item.isClose"
          :label="item.title"
          :name="item.name"
        >
          <component ref="component" :is="item.content"></component>
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
      tableNav: "sys",
      tabIndex: "sys",
      tables: [
        {
          title: "用户管理",
          name: "sys",
          content: "sys-home",
          isClose: false
        }
      ],
      navTable: [
        {
          name: "sys",
          iconfont:'iconfont',
          icon:'icon-yonghuguanli',
          title: "用户管理"
        },
        {
          name: "ProductConfiguration",
          iconfont:'iconfont',
          icon:'icon-chanpinpeizhi',
          title: "产品配置清单"
        },
        {
          name: "testConfiguration",
          iconfont:'iconfont',
          icon:'icon-Evaluation',
          title: "测评配置"
        },
        // {
        //   name: "role",
        //   title: "角色管理"
        // },
        // {
        //   name: "configurationRole",
        //   title: "配置角色"
        // },
        {
          name: "hospital",
          iconfont:'iconfont',
          icon:'icon-yiyuanguanli',
          title: "医院管理"
        },
        {
          name: "siteManagement",
          iconfont:'iconfont',
          icon:'icon-flow-determine',
          title: "测评中心管理"
        },
        {
          name: "log",
          iconfont:'iconfont',
          icon:'icon-caozuorizhi',
          title: "操作日志"
        }
      ],
      Repeat: false
    };
  },
  directives: {
    noclose: {
      // 指令的定义
      // inserted: function(el) {
      //   let domProperty = el.getAttribute("data");
      //   el.setAttribute("closable", false);
      //   if (domProperty === "homepage") {
      //     el.setAttribute("closable", true);
      //   } else {
      //     console.log(2);
      //   }
      // }
    }
  },
  methods: {
    // 增加标签
    newTitle(prop) {
        //点击加载测评中心列表
        if(prop=='sys'){
          this.$refs.component[0].siteList()
        }
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
          case "sys":
            this.tableNav = newTabName;
            break;
          case "role":
            _this.tables.push({
              title: "角色管理",
              name: "role",
              content: "sys-role",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "configurationRole":
            _this.tables.push({
              title: "配置角色",
              name: "configurationRole",
              content: "sys-configurationRole",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "hospital":
            _this.tables.push({
              title: "医院管理",
              name: "hospital",
              content: "sys-hospital",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "siteManagement":
            _this.tables.push({
              title: "测评中心管理",
              name: "siteManagement",
              content: "sys-siteManagement",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "log":
            _this.tables.push({
              title: "操作日志",
              name: "log",
              content: "my-log",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "ProductConfiguration":
            _this.tables.push({
              title: "产品配置清单",
              name: "ProductConfiguration",
              content: "product-configuration",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
          case "testConfiguration":
            _this.tables.push({
              title: "测评配置",
              name: "testConfiguration",
              content: "test-configuration",
              isClose: true
            });
            this.tableNav = newTabName;
            break;
        }
      } else {
        return;
      }
    },
    /**
     * tab, event
     */
    handleClick(tab, event) {
      //点击加载测评中心列表
      if(tab.index == 0){
          this.$refs.component[0].siteList()
        }
      // console.log(tab, event);
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
