<template>
  <div style="height:100%">
    <!-- <el-button type="danger" style="position:absolute; z-index:9999;top: 100px;"  @click="addTab('orderManage')">增加</el-button> -->
    <v-header :navTabs="navTabs" :secNav="secNav" v-on:acceptTitle="newTitle"></v-header>
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
        content: 'warehouse-home',
        isClose: false,
      }],
      navTabs: [
          {
              title: '库房订单管理',
              key: 'harf',
              childItem: [
                  {
                      title: '库房订单',
                      key: 'houseorder',
                  },
                  {
                      title: '待入库订单',
                      key: 'inhouseorder',
                  },
                  {
                      title: '待出库订单',
                      key: 'outhouseorder',
                  },
              ]
          },
          {
              title: '自制成品备货',
              key: 'all',
              childItem: [
                  {
                      title: '待入库',
                      key: 'inhouse',
                  },
                  {
                      title: '已入库',
                      key: 'outhouse',
                  },
              ]
          },
      ],
      secNav: [
          {
              title: '统计报表',
              key: 'statistic',
          }
      ],
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
    newTitle(item, itemPath) {
      console.log(item);
      let _this = this;
      let newTabName = item + '';
      this.tableNav = newTabName;
      _this.Repeat = true;
      _this.tables.map((v) => {
        if (v.name === item) {
          _this.Repeat = false;
        }
      });
      if(_this.Repeat) {
        switch(newTabName) {
          case 'houseorder':
            _this.tables.push({
              title: '库房订单',
              name: newTabName,
              content: 'warehouse-order',
              isClose: true,
            });
            this.tableNav = newTabName;
            break;
          case 'inhouseorder':
            _this.tables.push(
              {
                title: '待入库订单',
                name: newTabName,
                content: 'warehouse-inhouse',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'outhouseorder':
            _this.tables.push(
              {
                title: '待出库订单',
                name: newTabName,
                content: 'warehouse-outhouse',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'inhouse':
            _this.tables.push(
              {
                title: '待入库',
                name: newTabName,
                content: 'warehouse-in',
                isClose: true,
              }
            );
            this.tableNav = newTabName;
            break;
          case 'outhouse':
            _this.tables.push(
              {
                title: '已出库',
                name: newTabName,
                content: 'warehouse-out',
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
                content: 'warehouse-statistic',
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
.child_page {
 width: calc(100% - 180px);
  height: calc(100% - 60px);
  display: inline-block;
  position: absolute;
  top: 60px;
  left:180px;
}
</style>
