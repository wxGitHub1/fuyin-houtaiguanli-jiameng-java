<template>
  <div style="height:100%">
    <my-header :navTables="navTable" v-on:acceptTitle="newTitle"></my-header>
    <div class="child_page">
      <el-tabs v-model="tableNav" type="card" @tab-remove="removeTab" @tab-click="handleClick">
        <el-tab-pane
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
import Global from "./global";
export default {
  name: "HelloWorld",
  data() {
    return {
      tableNav: "sys",
      // tabIndex: "sys",
      tables: [
        {
          title: "用户管理",
          name: "sys",
          content: "sys-home",
          isClose: true
        },
      ],
      navTable: [
        {
          name: "sys",
          icon: "icon-yonghuguanli",
          content: "sys-home",
          title: "用户管理"
        },
        {
          name: "ProductConfiguration",
          icon: "icon-chanpinpeizhi",
          content: "product-configuration",
          title: "产品配置清单"
        },
        {
          name: "testConfiguration",
          icon: "icon-Evaluation",
          title: "测评配置",
          content: "test-configuration"
        },
        {
          name: "role",
          title: "角色管理",
          icon: "icon-jiaoseguanli",
          content: "sys-role",
        },
        // {
        //   name: "configurationRole",
        //   title: "配置角色",
        //   content: "sys-configurationRole",
        // },
        {
          name: "hospital",
          icon: "icon-yiyuanguanli",
          content: "sys-hospital",
          title: "医院管理"
        },
        {
          name: "siteManagement",
          icon: "icon-flow-determine",
          content: "sys-siteManagement",
          title: "测评中心管理"
        },
        {
          name: "log",
          icon: "icon-caozuorizhi",
          title: "操作日志",
          content: "my-log"
        }
      ]
    };
  },
  methods: {
    newTitle(newTabName) {
      if (newTabName == "sys") {
        this.$refs.component[0].siteList();
      }
      Global.newTitle(this, newTabName);
    },
    removeTab(targetName) {
      Global.removeTab(this, targetName);
    },
    //点击加载测评中心列表
    handleClick(tab, event) {
      // console.log(tab)label: "用户管理"
      console.log(event)
      if (tab.index == 0) {
        this.$refs.component[0].siteList();
      }
    }
  }
};
</script>
<style scoped lang="scss">
</style>
