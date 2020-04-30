<template>
  <!-- 学校管理 -->
  <div class="container" style="height: 800px;overflow-y: scroll">
    <el-row class="search">
      <el-col :span="2" style="width: 5.5%;line-height: 30px">
        <!-- 新增社区 -->
        <el-button
          type="primary"
          size="small"
          @click="DatadialogVisible = true"
          :disabled="limit.add"
        >新增</el-button>
        <el-dialog
          :close-on-click-modal="false"
          title="数据录入"
          :visible.sync="DatadialogVisible"
          center
        >
          <el-row>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
              <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                v-model="province"
                :clearable="true"
                value-key="proviceId"
                @change="getCities(province, type=1)"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.proviceId"
                  :value="item"
                  :label="item.proviceName"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
              <span>城市:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                :clearable="true"
                value-key="cityId"
                v-model="city"
                @change="getCounty(city, type=1)"
              >
                <el-option
                  v-for="item in cities"
                  :key="item.cityId"
                  :value="item"
                  :label="item.cityName"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
              <span>区县:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                :clearable="true"
                size="small"
                value-key="countyId"
                v-model="county"
                @change="getCountyId(county, type=1)"
              >
                <el-option
                  v-for="item in counties"
                  :key="item.countyId"
                  :value="item"
                  :label="item.countyName"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
              <span>社区:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                :clearable="true"
                size="small"
                value-key="communityId"
                v-model="allData.community"
              >
                <el-option
                  v-for="item in communityList"
                  :key="item.communityId"
                  :value="item"
                  :label="item.communityName"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row
            style="margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
          >
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%">
              <span>负责人:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="allData.principal" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>学校类型:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                :clearable="true"
                value-key="zoom"
                v-model="allData.schoolType"
              >
                <el-option
                  v-for="item in schoolType"
                  :key="item.zoom"
                  :value="item"
                  :label="item.type"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 10.1%;line-height: 30px;margin-left: 1%;">
              <span>学校/幼儿园名称:</span>
            </el-col>
            <el-col :span="4" style="text-align: left">
              <el-input v-model="allData.schoolName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row class="foot_btn" style="margin-top:30px;">
            <el-col :span="2" :offset="10">
              <el-button
                @click="DatadialogVisible = false"
                type="success"
                style="width: 100%;"
                size="middle"
                icon="el-icon-back"
              >返回</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button
                style="width: 100%;"
                type="primary"
                @click="saveCommunity()"
                size="middle"
              >保存</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-col>
      <!-- 查询数据 -->
      <el-col :span="2" style="width: 5%;line-height: 30px;">
        <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          :clearable="true"
          size="small"
          v-model="search.province"
          value-key="proviceId"
          @change="getCities(search.province, type=2)"
        >
          <el-option
            v-for="item in provinces"
            :key="item.proviceId"
            :value="item"
            :label="item.proviceName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px;">
        <span>城市:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
          value-key="cityId"
          v-model="search.city"
          @change="getCounty(search.city, type=2)"
        >
          <el-option v-for="item in cities" :key="item.cityId" :value="item" :label="item.cityName"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px;">
        <span>区县:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
          value-key="countyId"
          v-model="search.county"
          @change="getCountyId(search.county, type=2)"
        >
          <el-option
            v-for="item in counties"
            :key="item.countyId"
            :value="item"
            :label="item.countyName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 4.5%;line-height: 30px">
        <span>社区</span>
      </el-col>
      <el-col :span="3">
        <el-select
          :clearable="true"
          size="small"
          value-key="communityId"
          v-model="search.community"
        >
          <el-option
            v-for="item in communityList"
            :key="item.communityId"
            :value="item"
            :label="item.communityName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px">
        <span>负责人</span>
      </el-col>
      <el-col :span="2" style="text-align: left">
        <el-input v-model="search.principal" placeholder="请输入姓名" size="small"></el-input>
      </el-col>
    </el-row>
    <!-- 修改数据 -->

    <el-dialog
      :close-on-click-modal="false"
      width="70%"
      title="数据修改"
      :visible.sync="ModifydialogVisible"
      center
    >
      <el-row style="text-align: center;">
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
          <span>省份:</span>
        </el-col>
        <el-col :span="3">
          <el-select
            :clearable="true"
            size="small"
            v-model="modifySelection.province"
            value-key="proviceId"
            @change="getCities(modifySelection.province, type=3)"
          >
            <el-option
              v-for="item in provinces"
              :key="item.proviceId"
              :value="item"
              :label="item.proviceName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
          <span>城市:</span>
        </el-col>
        <el-col :span="4">
          <el-select
            :clearable="true"
            size="small"
            value-key="cityId"
            v-model="modifySelection.city"
            @change="getCounty(modifySelection.city, type=3)"
          >
            <el-option
              v-for="item in cities"
              :key="item.cityId"
              :value="item"
              :label="item.cityName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
          <span>区县:</span>
        </el-col>
        <el-col :span="4">
          <el-select
            :clearable="true"
            size="small"
            value-key="countyId"
            v-model="modifySelection.county"
            @change="getCountyId(modifySelection.county, type=3)"
          >
            <el-option
              v-for="item in counties"
              :key="item.countyId"
              :value="item"
              :label="item.countyName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
          <span>社区:</span>
        </el-col>
        <el-col :span="3" style="text-align: left">
          <el-input v-model="modifySelection.communityName" placeholder="请输入社区" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row
        style="margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228); text-align: center"
      >
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%">
          <span>学校类型:</span>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            :clearable="true"
            value-key="zoom"
            v-model="modifySelection.schoolType"
          >
            <el-option v-for="item in schoolType" :key="item.zoom" :value="item" :label="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
          <span>学校名称:</span>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <el-input v-model="modifySelection.schoolName" placeholder="请输入联系电话" size="small"></el-input>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
          <span>负责人:</span>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <el-input v-model="modifySelection.principal" placeholder="请输入姓名" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row class="foot_btn" style="margin-top:30px;">
        <el-col :span="2" :offset="10">
          <el-button
            @click="ModifydialogVisible = false"
            type="success"
            style="width: 100%;"
            size="middle"
            icon="el-icon-back"
          >返回</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button style="width: 100%;" type="primary" @click="modifySave()" size="middle">保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <el-row style="margin-top: 20px;text-align: center">
      <el-col :span="2" style="width: 5%;line-height: 30px;margin-left: 5.4%">
        <span>学校类型:</span>
      </el-col>
      <el-col :span="3">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.schoolType">
          <el-option v-for="item in schoolType" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 9%;line-height: 30px">
        <span>学校/幼儿园名称:</span>
      </el-col>
      <el-col :span="4" style="text-align: left">
        <el-input v-model="search.schoolName" placeholder="请输入学校名称" size="small"></el-input>
      </el-col>
      <el-col :span="1" style="width: 5.8%">
        <el-button size="small" type="warning" class="btns" @click="searchData()">查询</el-button>
      </el-col>
    </el-row>
    <el-row class="client_table">
      <el-col :span="24">
        <el-table :border="true" :data="clientData" style="width: 100%">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="proviceName" label="省份" min-width="60"></el-table-column>
          <el-table-column align="center" prop="cityName" label="城市" min-width="60"></el-table-column>
          <el-table-column align="center" prop="countyName" label="区县" min-width="60"></el-table-column>
          <el-table-column align="center" prop="communityName" label="社区" min-width="80"></el-table-column>
          <el-table-column align="center" prop="principal" label="负责人" min-width="60"></el-table-column>
          <el-table-column align="center" prop="type" label="学校类型" min-width="100"></el-table-column>
          <el-table-column align="center" prop="schoolName" label="学校名称" min-width="60"></el-table-column>
          <el-table-column align="center" prop="addTime" label="录入时间" min-width="80"></el-table-column>
          <el-table-column align="center" prop="operation" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleModify(scope.row)" size="small">修改</el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.row)"
                size="small"
                :disabled="limit.delete"
              >删除</el-button>
            </template>
          </el-table-column>
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
          :total="pages.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getProvince,
  getCity,
  getCountys,
  addCommunity,
  getCommunity
} from "../../api/address";
import {
  getControlCommunity,
  schoolSelectData,
  schoolModifyData
} from "../../api/datalist";
import formatTime, { timeFormat } from "../../utils/timeformat";
import { isString } from "../../utils/types";
import { Promise } from "q";
import { setTimeout } from "timers";
import { dateFormat } from "../../utils/timeformat";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      //权限管理
      limit: {
        add: true,
        delete: true,
        update: true,
        select: true
      },
      clientName: "",
      clientPhone: "",
      isMember: "",
      //表格数据
      clientData: [],
      clientChoseDate: "",
      //录入数据弹出框
      DatadialogVisible: false,
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
      //新增学校
      allData: {
        proviceId: null,
        cityId: null,
        countyId: null,
        community: null,
        isDelete: 0,
        principal: null,
        schoolType: null,
        schoolName: null
      },
      fullscreenLoading: false,

      //查询条件
      search: {
        principal: null,
        province: null,
        city: null,
        county: null,
        community: null,
        schoolType: null,
        schoolName: null
      },
      //学校类型
      schoolType: [
        { type: "幼儿园", zoom: 1 },
        { type: "小学", zoom: 2 },
        { type: "初中", zoom: 3 },
        { type: "高中", zoom: 4 }
      ],
      //社区列表
      communityList: null,
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      //修改
      ModifydialogVisible: false,
      //修改条件
      modifySelection: {
        province: null,
        city: null,
        county: null,
        communityName: null,
        schoolType: null,
        schoolName: null,
        principal: null,
        // provinceId: null,
        cityId: null,
        countyId: null,
        schoolId: null,
        createTime: null,
        addTime: null
      }
    };
  },

  mounted() {
    //获取用户权限
    this.limit.add = !!!session.getItem("userlimit")[0];
    this.limit.delete = !!!session.getItem("userlimit")[1];
    this.limit.update = !!!session.getItem("userlimit")[2];
    this.limit.select = !!!session.getItem("userlimit")[3];
    this.getAddress();
    this.getControlCommunities();
  },

  methods: {
    //导出Execl
    outExcel() {
      let arg = {
        whereLambda: {}
      };
      if (this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId; //省份
      } else {
        arg.whereLambda.proviceId = null;
      }
      if (this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId; //城市
      } else {
        arg.whereLambda.cityId = null;
      }
      if (this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId; //社区
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId; //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      arg.whereLambda.sysUserName = this.search.principal || null; //负责人

      if (this.search.schoolType) {
        arg.whereLambda.schoolType = this.search.schoolType.zoom; //学校类型
      } else {
        arg.whereLambda.schoolType = null;
      }

      arg.whereLambda.schoolName = this.search.schoolName || null; //学校名称

      // let baseUrl = 'http://192.168.3.220:83/api/Userphysical/ExportOutUserphysicals';

      // let exportArg = '?userName=' + arg.whereLambda.userName + '&patriarchicPhone=' + arg.whereLambda.telephone + '&isVisit=' + arg.whereLambda.isVisit + '&inputPeople=' + arg.whereLambda.inputPeople + '&bak=' + arg.whereLambda.bak + '&proviceId=' + arg.whereLambda.proviceId + '&cityId=' + arg.whereLambda.cityId + '&countyId=' + arg.whereLambda.countyId + '&communityId=' + arg.whereLambda.communityId + '&sysUserName=' + arg.whereLambda.sysUserName + '&physicalPeriod=' + null + '&physicalBeginTime=' + arg.whereLambda.physicalStartTime + '&physicalEndTime=' + arg.whereLambda.physicalEndTime + '&inputBeginTime=' + arg.whereLambda.inputBeginTime + '&inputEndTime=' + arg.whereLambda.inputEndTime + '&quarter=' + arg.whereLambda.quarter;

      // let endArg = baseUrl + exportArg;

      // window.location.href = endArg;
    },
    //查询数据
    searchData() {
      this.getControlCommunities();
    },
    //获取社区列表
    async getControlCommunities(pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {}
      };
      if (this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId; //省份
      } else {
        arg.whereLambda.proviceId = null;
      }
      if (this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId; //城市
      } else {
        arg.whereLambda.cityId = null;
      }
      if (this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId; //社区
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId; //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      arg.whereLambda.principal = this.search.principal || null; //负责人

      if (this.search.schoolType) {
        arg.whereLambda.schoolType = this.search.schoolType.zoom; //学校类型
      } else {
        arg.whereLambda.schoolType = null;
      }

      arg.whereLambda.schoolName = this.search.schoolName || null; //学校名称

      try {
        return new Promise((resolve, reject) => {
          schoolSelectData(arg)
            .then(res => {
              const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              resolve(res);
              let dataList = res.data.ResponseModel;
              if (dataList) {
                loading.close();
                // console.log(dataList);
                this.clientData = dataList.list;
                this.pages.total = dataList.total;
              } else {
                this.clientData = null;
                this.pages.total = 0;
                loading.close();
              }
            })
            .catch(err => {
              reject(err);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
    //获取省份
    async getAddress() {
      try {
        return new Promise((resolve, reject) => {
          getProvince()
            .then(res => {
              resolve(res);
              this.provinces = res.data.ResponseModel;
            })
            .catch(err => {
              reject(err);
            });
        });
      } catch (e) {
        console.log(e);
      }
    },
    //获取城市

    async getCities(item, type) {
      //根据类型判断重载机制
      switch (type) {
        case 1:
          this.city = null;
          this.county = null;
          this.community = null;
          break;
        case 2:
          this.search.city = null;
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.modifySelection.city = null;
          this.modifySelection.county = null;
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let proviceVal = item.proviceId;
        this.allData.proviceId = item.proviceId;
        try {
          return new Promise((resolve, reject) => {
            getCity({ proviceId: proviceVal })
              .then(res => {
                resolve(res);
                this.cities = res.data.ResponseModel;
              })
              .catch(err => {
                reject(err);
              });
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    //获取区县
    async getCounty(item, type) {
      switch (type) {
        case 1:
          this.county = null;
          this.community = null;
          break;
        case 2:
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.modifySelection.county = null;
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let cityVal = item.cityId;
        this.allData.cityId = item.cityId;
        try {
          return new Promise((resolve, reject) => {
            getCountys({ cityId: cityVal })
              .then(res => {
                resolve(res);
                this.counties = res.data.ResponseModel;
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err => {
            reject(err);
          });
        } catch (err) {
          console.log(err);
        }
      }
    },

    //获取区县Id
    getCountyId(item, type) {
      switch (type) {
        case 1:
          this.community = null;
          break;
        case 2:
          this.search.community = null;
          break;
        case 3:
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      this.allData.countyId = item.countyId;
      // 获取社区
      if (item) {
        let countyVal = item.countyId;

        try {
          return new Promise((resolve, reject) => {
            getCommunity({ countyId: countyVal })
              .then(res => {
                resolve(res);
                if (res.data.Error) {
                  this.communityList = null;
                  return null;
                } else {
                  this.communityList = res.data.ResponseModel.list;
                }
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err => {
            reject(err);
          });
        } catch (err) {
          console.log(err);
        }
      }
    },

    // 保存社区
    async saveCommunity() {
      const self = this;

      if (
        !!self.allData.proviceId &&
        !!self.allData.cityId &&
        !!self.allData.countyId &&
        !!self.allData.principal &&
        !!self.allData.schoolType &&
        !!self.allData.schoolName &&
        !!self.allData.community
      ) {
        let inputData = {
          proviceId: self.allData.proviceId,
          cityId: self.allData.cityId,
          countyId: self.allData.countyId,
          communityId: self.allData.community.communityId,
          schoolName: self.allData.schoolName,
          type: self.allData.schoolType.zoom,
          person: self.allData.principal,
          isDelete: 0
        };

        try {
          return new Promise((resolve, reject) => {
            schoolModifyData(inputData)
              .then(res => {
                if(res.data.Error){
                  this.$message({
                    type: "warning",
                    message: res.data.ErrorMessage,
                    center: true
                  });
                }else{
                const loading = this.$loading({
                  lock: true,
                  text: "加载中",
                  spinner: "el-icon-loading",
                  background: "rgba(0, 0, 0, 0.7)"
                });
                resolve(res);
                setTimeout(() => {
                  loading.close();
                  self.$message({
                    type: "success",
                    message: "添加学校成功",
                    center: true
                  });
                  self.DatadialogVisible = false;
                  this.getControlCommunities(
                    this.pages.currentPage,
                    this.pages.pageSize
                  );
                }, 1000);
                }
              })
              .catch(err => {
                reject(res);
              });
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        self.$message({
          type: "warning",
          message: "都为必填项！",
          center: true
        });
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
    //修改
    handleModify(row) {
      // console.log(row);
      this.ModifydialogVisible = true;
      this.modifySelection.province = row.proviceName;
      this.modifySelection.city = row.cityName;
      this.modifySelection.county = row.countyName;
      this.modifySelection.community = row.communityName;
      this.modifySelection.communityId = row.communityId;
      this.modifySelection.communityName = row.communityName;
      this.modifySelection.schoolName = row.schoolName;
      this.modifySelection.principal = row.principal;
      this.modifySelection.schoolType = row.type;
      this.modifySelection.schoolId = row.schoolId;
      this.modifySelection.proviceId = row.proviceId;
      this.modifySelection.cityId = row.cityId;
      this.modifySelection.countyId = row.countyId;
      this.modifySelection.createTime = row.addTime;
      this.modifySelection.addTime = row.addTime;
    },
    // 修改保存
    async modifySave() {
      let modifyData = this.modifySelection;

      // console.log(modifyData);
      //第一步 验证是否为空
      for (let p in modifyData) {
        if (modifyData[p] === null || modifyData[p] === "") {
          this.$message({
            type: "warning",
            message: "信息不能为空",
            center: true
          });
          return false;
        }
      }

      // 第二步  整理后端接口数据

      //如果不改变省市区县
      let allSelects;
      if (isString(modifyData.province)) {
        allSelects = {
          proviceId: this.modifySelection.proviceId,
          cityId: this.modifySelection.cityId,
          countyId: this.modifySelection.countyId,
          isDelete: 0,
          person: this.modifySelection.principal,
          schoolId: this.modifySelection.schoolId,
          schoolName: this.modifySelection.schoolName,
          communityId: this.modifySelection.communityId,
          createTime: this.modifySelection.createTime,
          addTime: this.modifySelection.addTime
        };
      } else {
        allSelects = {
          proviceId: this.modifySelection.province.proviceId,
          cityId: this.modifySelection.city.cityId,
          countyId: this.modifySelection.county.countyId,
          isDelete: 0,
          person: this.modifySelection.principal,
          schoolId: this.modifySelection.schoolId,
          schoolName: this.modifySelection.schoolName,
          communityId: this.modifySelection.community.communityId,
          createTime: this.modifySelection.createTime,
          addTime: this.modifySelection.addTime
        };
      }

      if (isString(this.modifySelection.schoolType)) {
        switch (this.modifySelection.schoolType) {
          case "幼儿园":
            allSelects.type = 1;
            break;
          case "小学":
            allSelects.type = 2;
            break;
          case "初中":
            allSelects.type = 3;
            break;
          case "高中":
            allSelects.type = 4;
            break;
          default:
            allSelects.type = 1;
            break;
        }
      } else {
        allSelects.type = this.modifySelection.schoolType.zoom;
      }
      try {
        return new Promise((resolve, reject) => {
          schoolModifyData(allSelects)
            .then(res => {
              const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              resolve(res);
              setTimeout(() => {
                loading.close();
                this.$message({
                  type: "success",
                  message: "修改学校成功",
                  center: true
                });
                this.ModifydialogVisible = false;
                this.getControlCommunities(
                  this.pages.currentPage,
                  this.pages.pageSize
                );
              }, 1000);
            })
            .catch(err => {
              reject(res);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
    //删除
    async handleDelete(row) {
      if (row) {
        let deleteData = {
          isDelete: 1,
          schoolId: row.schoolId
        };
        this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            try {
              return new Promise((resolve, reject) => {
                schoolModifyData(deleteData)
                  .then(res => {
                    const loading = this.$loading({
                      lock: true,
                      text: "加载中",
                      spinner: "el-icon-loading",
                      background: "rgba(0, 0, 0, 0.7)"
                    });
                    resolve(res);
                    if (!res.Error) {
                      setTimeout(() => {
                        loading.close();
                        this.$message({
                          type: "success",
                          message: "删除成功！",
                          center: true
                        });
                        this.getControlCommunities(
                          this.pages.currentPage,
                          this.pages.pageSize
                        );
                      }, 500);
                    }
                  })
                  .catch(err => {
                    reject(err);
                  });
              });
            } catch (err) {
              console.log(err);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          });
      }
    }
    //修改社区信息
    //删除社区
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  scrollbar {
    width: 10px;
    height: 10px;
  }
  scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rosybrown;
    border-radius: 3px;
  }
  scrollbar-thumb {
    border-radius: 7px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #e8e8e8;
  }
  scrollbar-button {
    background-color: cyan;
  }
  scrollbar-corner {
    background: khaki;
  }
  .search {
    text-align: center;
  }
  .another_row {
    text-align: center;
    margin-top: 20px;
    span {
      line-height: 30px;
    }
  }
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
  .client_table {
    margin-top: 20px;
  }
}
</style>
