<template>
  <div class="container" style="height: 750px;overflow-y: scroll">
    <el-row>
      <el-col :span="24" style="border-bottom: 1px solid #EBEEF5;padding-bottom: 16px;text-align: center;">
        <el-row>
          <el-col :span="2" style="width: 5%;line-height: 30px;margin-left: 1%;">
            <span>省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
          </el-col>
          <el-col :span="2"  style="width: 7%;">
            <el-select size="small" v-model="search.province" :clearable="true" value-key="proviceId" @change="getCities(search.province, type=2)">
              <el-option v-for="item in provinces" :key="item.proviceId" :value="item" :label="item.proviceName">

              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 5%;line-height: 30px">
            <span>城市:</span>
          </el-col>
          <el-col :span="2"  style="width: 7%;">
            <el-select size="small" :clearable="true" value-key="cityId" v-model="search.city" @change="getCounty(search.city, type=2)">
                <el-option v-for="item in cities" :key="item.cityId" :value="item" :label="item.cityName">

                </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 5%;line-height: 30px">
            <span>区县:</span>
          </el-col>
          <el-col :span="2"  style="width: 7%;">
            <el-select :clearable="true" size="small" value-key="countyId" v-model="search.county" @change="getCountyId(search.county, type=2)">
                <el-option v-for="item in counties" :key="item.countyId" :value="item" :label="item.countyName">

                </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 5%;line-height: 30px">
            <span>社区:</span>
          </el-col>
          <el-col :span="2" style="width: 7%;">
            <el-select :clearable="true" size="small" value-key="communityId" v-model="search.community">
                <el-option v-for="item in communityList" :key="item.communityId" :value="item" :label="item.communityName">

                </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 5%;line-height: 30px">
            <span>查体人:</span>
          </el-col>
          <el-col :span="2" style="width: 7%;text-align: left">
            <el-input placeholder="输入查体人" v-model="search.examPeople" size="small"></el-input>     
          </el-col>
          <el-col :span="2" style="width: 7.5%;text-align: center;line-height: 30px;">
          查体时间：
          </el-col>
          <el-col :span="4">
            <el-date-picker
              v-model="search.examTime"
              type="daterange"
              range-separator="至"
              size="small"
              style="width: 100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="search">
          <el-col :span="2" style="width: 6%;line-height: 30px;">
            <span>查体类型:</span>
          </el-col>
          <el-col :span="2" style="width: 7%">
            <el-select size="small" :clearable="true" value-key="zoom" v-model="search.examType">
              <el-option v-for="item in examType" :key="item.zoom" :value="item" :label="item.type">

              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 5%;line-height: 30px">
            <span>季度:</span>
          </el-col>
          <el-col :span="2" style="text-align: left;width: 7%;">
            <el-select size="small" :clearable="true" value-key="zoom" v-model="search.quarter">
              <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type">

              </el-option>
            </el-select>    
          </el-col>
          <el-col :span="2" style="width: 7%;margin-left: 45.1%;">
              <el-button type="danger" style="width: 100%;" size="small" @click="outExcel()">
                导出Excel
              </el-button>
          </el-col>
          <el-col :span="2" style="width: 7%;text-align:center;margin-left: 1%">
            <el-button style="width: 100%;" type="success" size="small" @click="searchData()">
              查询
            </el-button>
          </el-col>
    </el-row>
      <el-row style="margin-top:20px;text-align: center;">
        
      </el-row>
    <el-row class="client_table" style="min-height: 470px;">
        <el-col :span="24">
          <el-table :border="true" :data="clientData" style="width: 100%">
            <el-table-column width="60" align="center" type="index" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="proviceName" label="省份" min-width="60"></el-table-column>
            <el-table-column align="center" prop="cityName" label="城市" min-width="80"></el-table-column>
            <el-table-column align="center" prop="countyName" label="区县" min-width="100"></el-table-column>
            <el-table-column align="center" prop="communityName" label="社区" min-width="60"></el-table-column>
            <el-table-column align="center" prop="sysUserName" label="体检人员" min-width="60"></el-table-column>
            <el-table-column align="center" prop="physicalType" label="体检类型" min-width="80"></el-table-column>
            <el-table-column align="center" prop="quarter" label="季度" min-width="80"></el-table-column>
            <!-- <el-table-column align="center" prop="physicalTime" label="体检时间" min-width="70"></el-table-column> -->
          </el-table>
        </el-col>

    </el-row>
    <el-row>
      <el-col :span="24" class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total">
        </el-pagination>
      </el-col>
    </el-row>
        <el-row class="statistic_row" style="margin-top: 15px;">
      <el-col :span="1" :offset="1">
        <span>合计：</span>
      </el-col>
      <el-col :span="3">
        <span>体检次数：{{totalStatistic.physicalCount}}</span>
      </el-col>
      <el-col :span="3">
        <span>入校：{{totalStatistic.enrolledCount}}</span>
      </el-col>
      <el-col :span="3">
        <span>入园：{{totalStatistic.entergardenCount}}</span>
      </el-col>
      <el-col :span="2">
          入托: {{totalStatistic.nurseryCount}}
      </el-col>
      <el-col :span="3" :offset="5">
          到访人数: {{totalStatistic.visitCount}}
      </el-col>
      <el-col :span="3">
          消费金额: {{totalStatistic.totalMoney}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getProvince, getCity, getCountys, addCommunity, getCommunity, getOutCommunity} from '../../../api/address';
import { outputNurseryData, addNurseryData, inputStatus, outExcelData, examStatistic, examStatisticUser } from '../../../api/datalist';
import session from '../../../utils/session';
import { all, Promise } from 'q';
import $axios from 'axios';
import { dateFormat } from '../../../utils/timeformat';


export default {
  name: 'App',
  data() {
      return {
        clientData: [],
        clientChoseDate: '',
        date: '',
        //分页
        pages: {
          total: 30,
          pageSize: 10,
          currentPage: 1,
        },
        //录入数据弹出框
        InputdialogVisible: false,
        // 详情弹出框
        InfodialogVisible: false,
        // 上传文件
        fileList: [],
        //选择性别
        radio: 'man',
        //病症
        checkList: [],
         //省份
        province: null,
        provinces: [],
        number: null,
        //城市
        city: null,
        cities: [],
        //区县
        county: null,
        counties: [],
        //社区
        community: null,
        //社区信息
        communityName: null,
        //社区列表
        communityList: null,
        //查询数据
        search: {
          clientName: null,
          phone: null,
          isArrive: null,
          inputPeople: null,
          illness: null,
          province: null,
          city: null,
          county: null,
          community: null,
          examPeople: null,
          examTime: null,
          // timeLength: null,
          // examCycle: null,
          inputTime: null,
          quarter: null,
          examType: null,
          examDevice: null,
        },
        //季度
        season: [
          { type: '春季', zoom: 1},
          { type: '秋季', zoom: 2 },
        ],
        //是否到访
        isVisit: [
          { type: '是', zoom: 1 },
          { type: '否', zoom: 2 },
        ],
        //体检设备
        examDevice: [
          { type: '便携台式', zoom: 1 },
          { type: '数据设备', zoom: 2 },
        ],
        examType: [
          { type: '入园', zoom: 1 },
          { type: '入校', zoom: 2 },
          { type: '入托', zoom: 3 },
        ],
        //病情
        illnessList: [
          "扁平足",
          "拇外翻",
          "足外旋",
          "足内旋",
          "足外翻",
          "足内翻",
          "跟骨外翻",
          "跟骨内翻",
          "膝外翻",
          "膝内翻",
          "膝过伸",
          "膝屈曲",
          "骨盆倾斜",
          "脊柱发育异常",
          "高低肩",
          "驼背",
        ],
        //体检时间
        examTime: null,
        //录入时间
        inputTime: null,
        // 录入数据
        inputData: {
          province: null,
          city: null,
          community: null,
          county: null,
          examPeople: null,
          inputPeople: null,
          examTime: null,
          clientName: null,
          sex: '1',
          phone: null,
          schoolName: null,
          sumNumber: null,
          illnessList: [],
        },
        //数据详情与修改
        modifyData: {
          province: null,
          city: null,
          community: null,
          county: null,
          examPeople: null,
          inputPeople: null,
          examTime: null,
          clientName: null,
          sex: '男',
          phone: null,
          schoolName: null,
          illnessList: [],
        },
        //问题人数添加状态
        countStatus: 0,
        //合计统计
        totalStatistic: {
          //体检次数
          physicalCount: null,
          //入校
          enrolledCount: null,
          //入园
          entergardenCount: null,
          //入托
          nurseryCount: null,
          //到访人数
          visitCount: null,
          //消费金额
          totalMoney: null,
        }
      }
  },
  mounted() {
    //获取列表
    this.getControlCommunities();
    //获取地址
    this.getAddress();
  },
  methods: {

    //导出Execl
    async outExcel() {
      let arg = {
        whereLambda: {
          
        }
      }
      if(this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId;     //省份
      } else {
        arg.whereLambda.proviceId = null;   
      }
      if(this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId;                 //城市
      } else {
        arg.whereLambda.cityId = null;   
      }
      if(this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId;  //社区     
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId;          //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      arg.whereLambda.userName = this.search.clientName || null;     //客户姓名

      arg.whereLambda.patriarchicPhone = this.search.phone || null;         //联系电话

      arg.whereLambda.isVisit = this.search.isArrive || null;        //是否到访

      
      if(this.search.examTime) {
        let result = dateFormat(this.search.examTime[0], this.search.examTime[1]);
        arg.whereLambda.physicalBeginTime = result.beginTimes || null;   //体检开始时间
        arg.whereLambda.physicalEndTime = result.endTimes || null;     //体检结束时间
      } else {
        arg.whereLambda.physicalBeginTime = null;
        arg.whereLambda.physicalEndTime = null;
      }

      if(this.search.inputTime) {
        let result = dateFormat(this.search.inputTime[0], this.search.inputTime[1])
        arg.whereLambda.inputBeginTime  = result.beginTimes || null;    //录入开始时间
        arg.whereLambda.inputEndTime = result.endTimes || null;       //录入结束时间   
      } else {
        arg.whereLambda.inputBeginTime = null;
        arg.whereLambda.inputEndTime = null;  
      }

      arg.whereLambda.sysUserName = this.search.examPeople || null;            //体检人

      if(this.search.quarter) {
        arg.whereLambda.quarter = this.search.quarter.zoom;                    //季度
      } else {
        arg.whereLambda.quarter = null;   
      }

      // if(this.search.isArrive) {
      //   arg.whereLambda.isVisit = this.search.isArrive.zoom;             //是否到访
      // } else {
      //   arg.whereLambda.isVisit = null;
      // }

      if(this.search.examDevice) {
        arg.whereLambda.physicalDevice = this.search.examDevice.zoom;                    //体检设备
      } else {
        arg.whereLambda.physicalDevice = null;   
      }

      if(this.search.examType) {
        arg.whereLambda.physicalType = this.search.examType.zoom;                 //体检类型
      } else {
        arg.whereLambda.physicalType = null;   
      }


      arg.whereLambda.bak = this.search.illness || null;


      // let baseUrl = 'http://192.168.3.220:83/api/Userphysical/ExportGetRepeatByUser';
      // let envUrl = 'http://117.34.105.87:88/api/Userphysical/ExportOutUserphysicals2';

      let envUrl = 'http://117.34.105.87:88/api/Userphysical/ExportGetRepeatByUser';

      let exportArg = '?proviceId=' + arg.whereLambda.proviceId + '&cityId=' + arg.whereLambda.cityId + '&countyId=' + arg.whereLambda.countyId + '&communityId=' + arg.whereLambda.communityId + '&sysUserName=' + arg.whereLambda.sysUserName + '&physicalType=' + arg.whereLambda.physicalType + '&physicalBeginTime=' + arg.whereLambda.physicalBeginTime + '&physicalEndTime=' + arg.whereLambda.physicalEndTime + '&quarter=' + arg.whereLambda.quarter;

      let endArg = envUrl + exportArg;

      window.location.href = endArg;

    },



    //获取列表
    async getControlCommunities(pageIndex=1, pageSize=10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {
           
        }
      }
      if(this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId;     //省份
      } else {
        arg.whereLambda.proviceId = null;   
      }
      if(this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId;                 //城市
      } else {
        arg.whereLambda.cityId = null;   
      }
      if(this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId;  //社区     
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId;          //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      arg.whereLambda.userName = this.search.clientName || null;     //客户姓名

      arg.whereLambda.telephone = this.search.phone || null;         //联系电话

      arg.whereLambda.isVisit = this.search.isArrive || null;        //是否到访

      
      if(this.search.examTime) {
        let result = dateFormat(this.search.examTime[0], this.search.examTime[1]);
        arg.whereLambda.physicalBeginTime = result.beginTimes || null;   //体检开始时间
        arg.whereLambda.physicalEndTime = result.endTimes || null;     //体检结束时间
      } else {
        arg.whereLambda.physicalStartTime = null;
        arg.whereLambda.physicalEndTime = null;
      }

      if(this.search.inputTime) {
        let result = dateFormat(this.search.inputTime[0], this.search.inputTime[1])
        arg.whereLambda.inputBeginTime  = result.beginTimes || null;    //录入开始时间
        arg.whereLambda.inputEndTime = result.endTimes || null;       //录入结束时间  
      } else {
        arg.whereLambda.inputBeginTime = null;
        arg.whereLambda.inputEndTime = null;  
      }

      arg.whereLambda.sysUserName = this.search.examPeople || null;            //体检人

      if(this.search.quarter) {
        arg.whereLambda.quarter = this.search.quarter.zoom;                    //季度
      } else {
        arg.whereLambda.quarter = null;   
      }
      if(this.search.examType) {
        arg.whereLambda.physicalType = this.search.examType.zoom;                    //体检类型
      } else {
        arg.whereLambda.physicalType = null;   
      }

      arg.whereLambda.bak = this.search.illness || null;

      try {
        return new Promise((resolve, reject) => {
          examStatisticUser(arg).then(res => {
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            resolve(res);
            let dataList = res.data.ResponseModel;
            if(dataList) {
              setTimeout(() => {
                loading.close();
                this.clientData = dataList.list;
                this.pages.total = dataList.total;
                this.totalStatistic.physicalCount = dataList.physicalCount;
                this.totalStatistic.enrolledCount = dataList.enrolledCount;
                this.totalStatistic.entergardenCount = dataList.entergardenCount;
                this.totalStatistic.nurseryCount = dataList.nurseryCount;
                this.totalStatistic.visitCount = dataList.visitCount;
                this.totalStatistic.totalMoney = dataList.totalMoney;

              }, 500);
            } else {
              this.clientData = null;
              this.pages.total = 0;
              loading.close();
            }
          }).catch(err => {
            reject(err);
          })
        })
      } catch(err) {
        console.log(err);
      }
    },

    //查询数据
    async searchData() {
      this.getControlCommunities(); 
    }, 

       //获取省份
    async getAddress() {
      try {
        return new Promise((resolve, reject) => {
          getProvince().then(res => {
            resolve(res);
            this.provinces = res.data.ResponseModel;
          }).catch(err => {
            reject(err);
          })
        })
      } catch(e) {
        console.log(e);
      }
    },
    //获取城市

    async getCities(item, type) {
      //根据类型判断重载机制
      switch(type) {
        case 1:
          this.modifyData.city = null;
          this.modifyData.county = null;
          this.modifyData.community = null;
          break;
        case 2:
          this.search.city = null;
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.inputData.city = null;
          this.inputData.county = null;
          this.inputData.community = null;
          break;
        default:
          console.log('wow');
          break;
      }
      if (item) {
        let proviceVal = item.proviceId;
        // this.addNewList.proviceId = item.proviceId;
        try {
          return new Promise((resolve, reject) => {
            getCity({"proviceId" : proviceVal}).then(res => {
              resolve(res);
              this.cities = res.data.ResponseModel;
            }).catch(err => {
              reject(err);
            })
          })
        } catch(err) {
          console.log(err);
        }
      }
    },
    //获取区县
    async getCounty(item, type) {
      switch(type) {
        case 1:
          this.modifyData.county = null;
          this.modifyData.community = null;
          break;
        case 2:
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.inputData.county = null;
          this.inputData.community = null;
          break;
        default:
          console.log('wow');
          break;
      }
      if (item) {
        let cityVal = item.cityId;
        // this.addNewList.cityId = item.cityId;
        try {
          return new Promise((resolve, reject) => {
            getCountys({ "cityId": cityVal }).then(res => {
              resolve(res);
              this.counties = res.data.ResponseModel;
            }).catch(err => {
              console.log(err);
            })
          }).catch(err => {
            reject(err);
          })
        } catch(err) {
          console.log(err);
        }
      }
    },

    //获取区县Id
    getCountyId(item, type) {
      switch(type) {
        case 1:
          this.modifyData.community = null;
          break;
        case 2:
          this.search.community = null;
          break;
        case 3:
          this.inputData.community = null;
          break;
        default:
          console.log('wow');
          break;
      }
      // this.addNewList.countyId = item.countyId;
      // 获取社区
      if (item) {
        let countyVal = item.countyId;

        try {
          return new Promise((resolve, reject) => {
            getOutCommunity({ "countyId": countyVal }).then(res => {
              resolve(res);
              if(res.data.Error){
                this.communityList = null;
                return null;
              } else {
                this.communityList = res.data.ResponseModel.list;
              }
            }).catch(err => {
              console.log(err);
            })
          }).catch(err => {
            reject(err);
          })
        } catch(err) {
          console.log(err);
        }
      }
    },

    //当前页面变化时
    handleCurrentChange(num) {
      this.pages.currentPage = num;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(pageIndex, pageSize);
    },
    //页面条数发生变化时
    handleSizeChange(val) {
      this.pages.pageSize = val;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(pageIndex, pageSize);
    },
    
    //上传文件
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    handlePreview(file) {
        // console.log(file);
    },

    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },

    //获取详情
    handleOrder(item) {
      this.InfodialogVisible = true;
      if(item) {
        this.modifyData.province = item.proviceName;
        this.modifyData.city = item.cityName;
        this.modifyData.community = item.communityName;
        this.modifyData.county = item.countyName;
        this.modifyData.examPeople = item.sysUserName;
        this.modifyData.inputPeople = item.inputPeople;
        this.modifyData.examTime = item.inputTime;
        this.modifyData.clientName = item.userName;
        this.modifyData.sex = item.sex;
        this.modifyData.sex = item.sex;
        this.modifyData.phone = item.patriarchicPhone;
        this.modifyData.schoolName = item.schoolId;
        if(item.bak) {
          this.modifyData.illnessList = item.bak.split(',');
        }
      }
    },

    //删除
    handleDelete(item) {
      this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },

    //录入数据
    async saveInputData(type) {
      let allData;
      if (type === "input") {
        allData = this.inputData;
      } else if(type === 'info') {
        allData = this.modifyData;
      }
      for(let name in allData) {
        if ( allData[name] === null || allData[name] === "") {
          this.$message({
            type: 'warning',
            message: '请正确填写表格！',
            center: true,
          })
          return false;
        }
      }
      let inputDatas = {
        proviceId: allData.province.proviceId,
        cityId: allData.city.cityId,
        countyId: allData.county.countyId,
        communityId: allData.community.communityId,
        physicalTime: allData.examTime,
        inputPeople: allData.inputPeople,
        sysUserName: allData.examPeople,
        userName: allData.clientName,
        sex: allData.sex,
        patriarchicPhone: allData.phone,
        schoolId: '1',
        physicalIdTotalCount: allData.sumNumber,
        bak: allData.illnessList.join(','),
      };
      try {
        return new Promise((resolve, reject) => {
          addNurseryData(inputDatas).then(res => {
            resolve(res);
            const loading = this.$loading({
                lock: true,
                text: '保存中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if(!res.data.Error) {
              let uid = session.getItem('user');
              let arg = {
                uId: uid,
                ope: 0,
              }
              setTimeout(() => {
                  loading.close();
                  this.getControlCommunities(pageIndex, pageSize);
                  this.$message({
                    type: 'success',
                    message: '保存成功！',
                    center: true,
                  })
                }, 1000);
                this.inputData.clientName = null;
                this.inputData.phone = null;
                this.inputData.schoolName = null;
                this.inputData.illnessList = [];
                if(type === 'input') {
                  try{
                    return new Promise((resolve, reject) => {
                      inputStatus(arg).then(res => {
                        resolve(res);
                        if(res){
                          let countState = res.data.ResponseModel.sCount;
                          this.countStatus = countState;
                        }
                      }).then(err => {
                        console.log(err);
                      })
                    }).then(err => {
                      reject(res);
                    })
                  } catch(err) {
                    console.log(err);
                  }
                } else if(type === 'info') {
                  this.InfodialogVisible = false;
                }
            }
          }).catch(err => {
            reject(err);
          })
        })
      } catch(err) {
        console.log(err)
      }
      
    },
    //结束本次录入
    async endInput() {
      let uid = session.getItem('user');
      let arg = {
        uId: uid,
        ope: 1,
      }
      this.$confirm('此操作将结束你的录入状态，是否继续？','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        try {
          return new Promise((resolve, reject) => {
            inputStatus(arg).then(res => {
              const loading = this.$loading({
                lock: true,
                text: '保存中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              resolve(res);
              if(!res.data.Error) {
                this.countStatus = 0;
                setTimeout(() => {
                    loading.close();
                    this.$message({
                      type: 'success',
                      message: '已结束录入！',
                      center: true,
                    });
                    this.InputdialogVisible = false;
                }, 1000);
              }    
            }).catch(err => {
              reject(err);
            })
          }) 
        } catch(err) {
          console.log(err)
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消！',
            center: true,
        })
      })
    }
  }
};
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  .search{
    text-align: center;
    padding-top: 16px;
  }
  .another_row{
    text-align: center;
    margin-top: 20px;
    span{
      line-height: 30px;
    }
  }
  .client_table{
    margin-top: 20px;
  }
  .statistic_row{
    background-color: rgba(251, 152, 0, 1);
    padding: 15px 0;
    color: #fff;
  }
  .pagination{
    margin-top: 0px;
    text-align: center;
  }
  .check_box{
    width: 13%;
  }
  .foot_btn{
    margin: 20px 0 0 0;
  }
}
</style>