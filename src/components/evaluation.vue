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
      tableNav: "willreceive",
      // tabIndex: "home",
      tables: [
        {
          name: "willreceive",
          
          icon: "icon-gongwujiedai",
          content: "evaluation-willreceive",
          title: "待接待",
          isClose: false
        },
        // {
        //   title: "首页",
        //   name: "home",
        //   content: "evaluation-home",
        //   isClose: false
        // }
      ],
      navTable: [
        {
          name: "willreceive",
          
          icon: "icon-gongwujiedai",
          content: "evaluation-willreceive",
          title: "待接待"
        },
        {
          name: "receive",
          
          icon: "icon-ico_yuyueguanli_jiedaiyuyue",
          content: "evaluation-receive",
          title: "已接待"
        },
        {
          name: "ordermanage",
          
          icon: "icon-tubiao_dingdanguanli",
          content: "evaluation-order",
          title: "订单管理"
        },
        {
          name: "statistic",
          
          icon: "icon-tongjibaobiao",
          content: "evaluation-statistic",
          title: "统计报表"
        },
        {
          name: "product",
          
          icon: "icon-_dailijiameng",
          content: "evaluation-product",
          title: "测评加盟统计"
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
