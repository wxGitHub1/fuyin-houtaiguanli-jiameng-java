<template>
  <div class="container">
    <el-row>
        <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="体检统计" name="first">
                    <outwork-first></outwork-first>
                </el-tab-pane>
                <!-- <el-tab-pane label="体检关注" name="second">
                    <outwork-second></outwork-second>
                </el-tab-pane> -->
                <el-tab-pane label="体检人员统计" name="third">
                    <StatisticThird></StatisticThird>
                </el-tab-pane>
                <!-- <el-tab-pane label="体检匹配" name="fouth">
                    <StatisticFouth></StatisticFouth>
                </el-tab-pane> -->
            </el-tabs>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import StatisticThird from './child/statisticthird';
import StatisticFouth from './child/statisticfouth';


export default {
  name: 'App',
  components: {
      StatisticThird,
      StatisticFouth,
  },
  data() {
      return {
          msg: '主页',
          orgOptions: {},
          activeName: 'first',
      }
  },
  methods: {
    handleClick(tab, event) {
        // console.log(tab, event);
    },
  }
};
</script>

<style scoped lang="scss">
.container{
    width: 100%;
    .statistic{
        margin: 15px 0;
        text-align: center;
        .box{
            margin-left: 3%;
            border: 1px solid rgba(187, 187, 187, .5);
        }
    }
    .graph_pool{
        height: 900px;
        .graph_area{
            width: 95.3%;
            height: 100%;
            background: rgba(244, 244, 244, 1);
            margin-left: 3%;
            padding-top: 30px;
            .echarts{
                width: 100%;
                height: 600px;
                position: relative;
                left: 0px;
            }
        }
    }
}
</style>
