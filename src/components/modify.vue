<template>
  <div style="height:100%">
    <!-- <el-button type="danger" style="position:absolute; z-index:9999;top: 100px;"  @click="addTab('orderManage')">增加</el-button> -->
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
      // tabIndex: "home",
      tables: [
        {
          title: "首页",
          name: "home",
          content: "modify-home",
          isClose: false
        }
      ],
      navTable: [
        {
          name: "willvalidate",
          title: "待验收",
          content: "modify-validate",
        },
        {
          name: "willallot",
          title: "待分配",
          content: "modify-willallot",
        },
        {
          name: "alreadyallot",
          title: "已分配",
          content: "modify-alreadyallot",
        },
        {
          name: "reject",
          title: "已驳回",
          content: "modify-reject",
        },
        {
          name: "statistic",
          title: "统计报表",
          content: "modify-statistic",
        }
      ],
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
