<template>
  <div style="height:100%">
    <my-header :navTables="navTable" v-on:acceptTitle="newTitle"></my-header>
    <div class="child_page">
      <el-tabs v-model="tableNav" type="card" @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in tables"
          :key="item.name"
          :closable="item.isClose"
          :label="item.title"
          :name="item.name"
        >
          <component :is="item.content" v-on:acceptTitle="newTitle" v-if="item.title == item.title"></component>
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
      tableNav: "clientManage",
      // tabIndex: "clientManage",
      tables: [
        {
          name: "clientManage",
          content: "my-client",
          icon:'icon-kehuguanli',
          title: "客户管理",
          isClose: false
        }
        // {
        //   title: "首页",
        //   name: "home",
        //   content: "my-home",
        //   isClose: false
        // }
      ],
      navTable: [
        {
          name: "clientManage",
          icon: "icon-kehuguanli",
          content: "my-client",
          title: "客户管理"
        },
        {
          name: "orderManage",
          icon: "icon-tubiao_dingdanguanli",
          content: "my-order",
          title: "订单管理"
        },
        {
          name: "market",
          icon: "icon-tongjibaobiao",
          content: "my-market",
          title: "统计报表"
        },
        {
          name: "member",
          icon: "icon-huiyuan",
          content: "my-member",
          title: "会员统计"
        }
        // {
        //   name: "log",
        // content: "my-log",
        //   title: "操作日志"
        // }
      ]
    };
  },
  methods: {
    newTitle(newTabName) {
      Global.newTitle(this, newTabName);
    },
    removeTab(targetName) {
      Global.removeTab(this, targetName);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
