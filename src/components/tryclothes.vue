<template>
  <div style="height:100%">
    <my-header :navTables="navTable" v-on:acceptTitle="newTitle"></my-header>
    <div class="child_page">
      <el-tabs v-model="tableNav" type="card" @tab-remove="removeTab">
        <el-tab-pane
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
import Global from "./global";
export default {
  name: "HelloWorld",
  data() {
    return {
      tableNav: "clientManage2",
      tables: [
        {
          title: "客户管理",
          name: "clientManage2",
          content: "front-client",
          isClose: false
        }
      ],
      navTable: [
        {
          name: "clientManage2",
          
          icon: "icon-kehuguanli",
          content: "front-client",
          title: "客户管理"
        },
        {
          name: "pendingTrialAcceptance",
          
          icon: "icon-shouhuoyanshou",
          content: "try-acceptance",
          title: "待试穿验收"
        },
        {
          name: "accepted",
          
          icon: "icon-wangongyanshou",
          content: "try-accepted",
          title: "已验收"
        },
        {
          name: "toBeAllocated",
          
          icon: "icon-zhengshifuwushangliebiao-",
          content: "to-be-allocated",
          title: "待分配"
        },
        {
          name: "willmessage",
          
          icon: "icon-dadianhua",
          content: "try-message",
          title: "待通知"
        },
        {
          name: "willtake",
          
          icon: "icon-3chuanyixiguan",
          content: "try-willtake",
          title: "待试穿"
        },
        {
          name: "take",
          
          icon: "icon-yiwancheng",
          content: "try-take",
          title: "已试穿"
        },

        {
          name: "willrepair",
          
          icon: "icon-baoxiu",
          content: "maintain-repair",
          title: "待报修"
        },

        {
          name: "willmaintain",
          
          icon: "icon-weixiu1",
          content: "will-maintain",
          title: "待维修"
        },

        {
          name: "maintain",
          
          icon: "icon-weixiujilu",
          content: "maintain",
          title: "已维修"
        },
        {
          name: "triedStatistics",
          
          icon: "icon-navicon-tjb1",
          content: "tried-statistics",
          title: "试穿统计"
        },
        {
          name: "repairedStatistics",
          
          icon: "icon-navicon-tjb",
          content: "repaired-statistics",
          title: "维修统计"
        }
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
