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
        content: 'outwork-home',
        isClose: false,
      }],
      navTable: [{
        name: 'nursery',
        title: '入托查体',
      },{
        name: 'kindergarten',
        title: '入园查体',
      },{
        name: 'statistic',
        title: '统计报表',
      }],
      // navTable: [{
      //   name: 'kindergarten',
      //   title: '入园体检',
      // },{
      //   name: 'nursery',
      //   title: '入托体检',
      // },{
      //   name: 'school',
      //   title: '入校体检',
      // },{
      //   name: 'controlschool',
      //   title: '学校管理',
      // },{
      //   name: 'statistic',
      //   title: '统计报表',
      // }],
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
  mounted() {
    console.log(this.$store.state.login);
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
          case 'kindergarten':
            _this.tables.push({
              title: '入园查体',
              name: newTabName,
              content: 'outwork-kindergarten',
              isClose: true,
            });
            this.tableNav = newTabName;
            break;
          case 'nursery':
            _this.tables.push(
              {
                title: '入托查体',
                name: newTabName,
                content: 'outwork-nursery',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'school':
            _this.tables.push(
              {
                title: '入校体检',
                name: newTabName,
                content: 'outwork-school',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'controlschool':
            _this.tables.push(
              {
                title: '学校管理',
                name: newTabName,
                content: 'outwork-control',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'statistic':
            _this.tables.push(
              {
                title: '统计报表',
                name: newTabName,
                content: 'outwork-statistic',
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
