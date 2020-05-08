<template>
  <div>
    <el-row class="query_hurdle">
      <el-col :span="2" style="width: 5%;" class="center">
        <span>产品名:</span>
      </el-col>
      <el-col :span="2" style="width: 7%;">
        <el-input placeholder="输入查体人" v-model="search.nickname" size="small"></el-input>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px" class="center">
        <span>主取型人:</span>
      </el-col>
      <el-col :span="2" style="width: 7%;">
        <el-select size="small" clearable  v-model="search.userValue">
          <el-option v-for="(item,index) in search.userList" :key="index" :value="item.id" :label="item.username"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 8%;" class="center">接待日期：</el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="search.date"
          type="daterange"
          range-separator="至"
          size="small"
          style="width:100%"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" style="width: 5.33%;" class="center">
        <el-button
          type="primary"
          size="small"
          style="margin-left: 10px"
          icon="el-icon-search"
          @click="getControlCommunities()"
        >查询</el-button>
      </el-col>
    </el-row>
    <el-row class="statistics">
      <el-col class="module" :span="3">
        <p>取型数量</p>
        <h2>{{totalStatistic.shapes || 0}}</h2>
      </el-col>
      <el-col class="module" :span="3">
        <p>取型验收驳回数量</p>
        <h2>{{totalStatistic.visitCount || 0}}</h2>
      </el-col>
      <el-col class="module" :span="3">
        <p>取型问题反馈次数</p>
        <h2>{{totalStatistic.totalMoney || 0}}</h2>
      </el-col>
      <el-col class="module" :span="3">
        <p>取型验收驳回次数</p>
        <h2>{{totalStatistic.totalMoney || 0}}</h2>
      </el-col>
    </el-row>
    <el-row class="graph">
      <el-col class="graph_box">
        <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userListByDept,shapeHome } from "../../api/javaApi";
// import { Promise, all, async } from "q";
export default {
  name: "App",
  data() {
    return {
      search: {
        date: null,
        nickname: null,
        userValue: null,
        userList:[]
      },
      totalStatistic: {
        shapes: null, 
        rejectNumNum: null,
        backNumBout: null,
        rejectNumBout: null, 
      },
      totalStatistic2:[0,0,0]
    };
  },
  created(){
    this.getControlCommunities();
  },
  mounted() {
    this.userList();
  },
  methods: {
    userList() {
      let data = {
        deptId: 8
      };
      userListByDept(data)
        .then(res => {
          // console.log(res);
          this.search.userList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取列表
    getControlCommunities() {
      let data = {
                  beginTime:this.search.date == null ? null : this.search.date[0],
                  endTime: this.search.date == null ? null : this.search.date[1],
                  nickname : this.search.nickname || null,
                  userId : this.search.userValue || null
                };
          // const loading = this.$loading({
          //   lock: true,
          //   text: "加载中",
          //   spinner: "el-icon-loading",
          //   background: "rgba(0, 0, 0, 0.7)"
          // });
      shapeHome(data)
        .then(res => {
          console.log(res);
         this.totalStatistic.shapes = res.data.data.shapeNum.shapes;
         this.totalStatistic.rejectNumNum = res.data.data.rejectNum.num;
         this.totalStatistic.backNumBout = res.data.data.backNum.bout;
         this.totalStatistic.rejectNumBout = res.data.data.rejectNum.bout;
            this.totalStatistic2[0] = res.data.data.shapeNum.shapes;///待开发
            this.totalStatistic2[1] = res.data.data.shapeNum.shapes;
            this.totalStatistic2[2] = res.data.data.shapeNum.shapes;
          
          setTimeout(() => {
              // loading.close();
              this.drawLine();
            }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //echart
    drawLine() {
      //  debugger
      // 基于准备好的dom，初始化echarts实例
     var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('myChart2'));
      // let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      // var  tatolData= this.totalStatistic2
      console.log(this.totalStatistic2);
      // debugger
      let option = {
        // color: ['#3398DB'],
        title: {
          // text: "入托、入园、入校可视化图表"
          //textStyle: {
          //    color: '#fff'
          //}
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          padding: 10,
          // formatter: "{b}体检<br> 总人数: {c}次"
          formatter: params => {
            // console.log(params)
            let pct =
              (params[0].value / this.totalStatistic.problemCount) * 100;
            let content =
              params[0].name +
              "体检" +
              "<br/>" +
              "体检总人数：" +
              params[0].value +
              "人" +
              "<br>" +
              "问题人数：" +
              0 +
              "人" +
              "<br>" +
              "到访人数：" +
              0 +
              "人" +
              "<br>" +
              "营业额：" +
              0 +
              "元"
            return content;
          }
        },
        /*legend: {
              data: [date]
          },*/
        grid: {
            left: '3%',
            right: '8%',
            // bottom: '2%',
            // containLabel: true
        },
        xAxis: {
          type: "value",
          name: "人数（人次）",
          nameTextStyle: {
            fontStyle: "oblique",
            fontWeight: "bolder",
            fontSize: 15
          },
          // boundaryGap: [0, 0.01],
          //           min: 0,
          max: function(value) {
            return value.max + 2;
          },
          // interval: 20,
          axisLabel: {
            // formatter: "{value}%",
            textStyle: {
              //color: '#fff',
              // fontWeight: "80"
            }
          }
        },
        yAxis: {
          type: "category",
          name: "查体类型",
          nameTextStyle: {
            fontStyle: "oblique",
            fontWeight: "bolder",
            fontSize: 15
          },
          data: ["数据1", "数据2", "数据3"],
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            margin: 10,
            inside: false,
            textStyle: {
              //color: '#fff',
              fontWeight: "50"
            }
          }
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                // formatter: '{c}',
                formatter: function(v) {
                  var val = v.data;
                  if (val == 0) {
                    return "";
                  }
                  return val + "人";
                },
                color: "#fff"
              }
            },
            itemStyle: {
              normal: {
                //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                color: function(params) {
                  // 根据需要构建色彩
                  var colorList = [
                    "#8fd3f4",
                    "#e0c3fc",
                    "#FCCE10",
                    "#fa709a",
                  ];
                  return colorList[params.dataIndex];
                } //以下为是否显示，显示位置和显示格式的设置了
                //                         label: {
                //                             show: true,
                //                             position: 'right',
                // //                             formatter: '{c}'
                //                             formatter: '{b}\n{c}',
                //                             color:"#000"
                //                         }
              }
            },
            data: this.totalStatistic2
          }
        ]
      };
      myChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize();
        };
      }, 200);
    }
  }
};
</script>

<style scoped lang="scss">
.query_hurdle {
  //   font-size: 14px;
  //   letter-spacing: 1px;
  color: #606266;
  line-height: 30px;
  //   text-align: left;
  //   cursor: pointer;
  padding: 10px 0;
  padding-top: 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #eeeeee;
}
.statistics {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0);
  padding-top: 20px;
  .module {
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 0.5);
    margin-left: 3%;
  }
}
.graph_box {
  width: 90%;
  height: 550px;
  // background: rgba(244, 244, 244, 1);
  margin-left: 3%;
  margin-top: 20px;
}
</style>
