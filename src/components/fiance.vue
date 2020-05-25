<template>
  <div style="height:100%">
    <!-- <el-button type="danger" style="position:absolute; z-index:9999;top: 100px;"  @click="addTab('orderManage')">增加</el-button> -->
    <my-header :navTables="navTable" v-on:acceptTitle="newTitle"></my-header>
    <div class="child_page">
      <el-tabs class="table_style" v-model="tableNav" type="card" @tab-remove="removeTab">
        <el-tab-pane class="home_table" v-for="(item) in tables" :key="item.name" :closable="item.isClose" :label="item.title" :name="item.name">
          <component :is="item.content"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      tableNav: 'home',
      tabIndex: 'home',
      tables: [{
        title: '首页',
        name: 'home',
        content: 'fiance-home',
        isClose: false,
      }],
      navTable: [{
        name: 'ordersearch',
        title: '订单查询',
      },{
        name: 'willback',
        title: '待退款',
      },{
        name: 'statistic',
        title: '财务统计',
      }],
      Repeat: false,
    };
  },
  directives: {
      noclose: {
        // 指令的定义
        inserted: function (el) {
          let domProperty = el.getAttribute('data');
          el.setAttribute('closable', false);
          if (domProperty === 'homepage') {
            el.setAttribute('closable', true);
          } else {
            console.log(2);
          }
        }
      }
  },
  methods: {
    // 增加标签
    newTitle(prop) {
      let _this = this;
      let newTabName = prop + '';
      this.tableNav = newTabName;
      _this.Repeat = true;
      _this.tables.map((item) => {
        if (item.name === prop) {
          _this.Repeat = false;
        }
      });
      if(_this.Repeat) {
        switch(newTabName) {
          case 'ordersearch':
            _this.tables.push({
              title: '订单查询',
              name: newTabName,
              content: 'fiance-order',
              isClose: true,
            });
            this.tableNav = newTabName;
            break;
          case 'willback':
            _this.tables.push(
              {
                title: '待退款',
                name: newTabName,
                content: 'fiance-back',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'statistic':
            _this.tables.push(
              {
                title: '财务统计',
                name: newTabName,
                content: 'fiance-statistic',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
        }
      } else {
        return;
      }
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
        })
      };
      this.tableNav = activeName;
      this.tables = tabs.filter(tab => tab.name !== targetName);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .child_page {
//  width: calc(100% - 180px);
//   height: calc(100% - 60px);
//   display: inline-block;
//   position: absolute;
//   top: 60px;
//   left:180px;
// }
</style>
