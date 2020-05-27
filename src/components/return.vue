<template>
  <div style="height:100%">
    <!-- <v-header :navTabs="navTabs" :secNav="secNav" v-on:acceptTitle="newTitle"></v-header> -->
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
          title: "产品体验待回访",
          content: "return-will"
        },
        {
          name: "productUseVisits",
          content: "return-productUseVisits",
          title: "产品使用待回访"
        },
        {
          name: "reviewInvitation",
          content: "return-reviewInvitation",
          title: "复查邀约待回访"
        },
        {
          name: "log",
          content: "return-log",
          title: "已回访"
        },
        {
          name: "remind",
          content: "return-remind",
          title: "待复查"
        },
        {
          name: "question",
          content: "return-question",
          title: "已流失"
        },
        {
          name: "statistic",
          content: "return-statistic",
          title: "产品体验统计"
        },
        {
          name: "productUsageStatistics",
          content: "return-productUsageStatistics",
          title: "产品使用统计"
        },
        {
          name: "reviewInvitationStatistics",
          content: "return-reviewInvitationStatistics",
          title: "复查邀约统计"
        }
      ]
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
