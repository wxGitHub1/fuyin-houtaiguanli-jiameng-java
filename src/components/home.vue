<template>
  <div style="height:100%">
    <my-header-two :navTables="navTable" v-on:acceptTitle="newTitle" v-on:menuTitle="menuTitle"></my-header-two>
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
import { Promise, all, async } from "q";
import session from "../utils/session";
export default {
  data() {
    return {
      tableNav: '',
      // tabIndex: "sys",
      tables: [],
      navTable: []
    };
  },
  mounted(){
    Global.menuTitle(this,0)
  },
  methods: {
    menuTitle(index){
      Global.menuTitle(this,index)
    },
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
      // console.log(tab)//label: "用户管理",name:receive2
      // console.log(event)
      if (tab.index == 0) {
        this.$refs.component[0].siteList();
      }
    }
  }
};
</script>
<style scoped lang="scss">

</style>
