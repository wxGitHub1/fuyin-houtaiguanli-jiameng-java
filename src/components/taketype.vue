<template>
  <div style="height:100%">
    <!-- <el-button type="danger" style="position:absolute; z-index:9999;top: 100px;"  @click="addTab('orderManage')">增加</el-button> -->
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
      tableNav: "willReceive",
      // tabIndex: "home",
      tables: [
        {
          name: "willReceive",
          content: "take-willReceive",
          title: "待接待",
          isClose: false
        },
        // {
        //   title: "首页",
        //   name: "home",
        //   content: "take-home",
        //   isClose: false
        // }
      ],
      navTable: [
        {
          name: "willReceive",
          icon: "icon-gongwujiedai",
          content: "take-willReceive",
          title: "待接待"
        },
        {
          name: "receive",
          icon: "icon-ico_yuyueguanli_jiedaiyuyue",
          content: "take-receive",
          title: "已接待"
        },
        {
          name: "willSelfTest",
          
          icon: "icon-shouhuoyanshou",
          content: "take-willSelfTest",
          title: "待验收"
        },
        {
          name: "alreadyReject",
          
          icon: "icon-wangongyanshou",
          content: "take-alreadyReject",
          title: "已验收"
        },
        {
          name: "statistics",
          
          icon: "icon-tongjibaobiao",
          content: "take-statistics",
          title: "统计报表"
        },
        {
          name: "InsoleProduction",
          
          icon: "icon-xiedian",
          content: "insole-production",
          title: "鞋垫制作"
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
