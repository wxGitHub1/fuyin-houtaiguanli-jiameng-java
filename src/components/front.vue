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
      tableNav: "clientManage",
      // tabIndex: "home",
      tables: [
        {
          name: "clientManage",
          
          icon: "icon-kehuguanli",
          content: "front-client",
          title: "客户管理",
          isClose: false
        },
        // {
        //   title: "首页",
        //   name: "home",
        //   content: "front-home",
        //   isClose: false
        // }
      ],
      navTable: [
        {
          name: "clientManage",
          icon: "icon-kehuguanli",
          content: "front-client",
          title: "客户管理"
        },
        {
          name: "orderManage",
          
          icon: "icon-tubiao_dingdanguanli",
          content: "front-order",
          title: "订单管理"
        },
        {
          name: "alreadyReceive",
          
          icon: "icon-fenpeijiaose",
          content: "front-receive",
          title: "已分配"
        },
        {
          name: "comment",
          
          icon: "icon-daipingjia",
          content: "comment",
          title: "待评价"
        },
        {
          name: "evaluationManagement",
          
          icon: "icon-pingjiaguanli",
          content: "front-evaluation",
          title: "评价管理"
        },
        {
          name: "statistics",
          
          icon: "icon-tongjibaobiao",
          content: "front-statistic",
          title: "统计报表"
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
