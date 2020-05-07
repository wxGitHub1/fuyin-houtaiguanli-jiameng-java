<template>
  <div>
    <!-- seach -->
    <el-row class="search">
      <el-col :span="2" id="input-title">
        <span class="time_style">省份:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          size="small"
          clearable
          v-model="seach.provinceId"
          placeholder="请选择"
          @change="cityList(seach.provinceId)"
        >
          <el-option
            v-for="item in seach.provinceIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">城市:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          size="small"
          clearable
          v-model="seach.cityId"
          placeholder="请先选择省份"
          @change="siteList(seach.cityId)"
        >
          <el-option
            v-for="item in seach.cityIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">站点名称:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          clearable
          size="small"
          v-model="seach.siteValue"
          placeholder="请先选择城市"
          @change="hospitalList(seach.siteValue)"
        >
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1" id="input-title">
        <span>医院：</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.hospitalValue" placeholder="请先选择站点">
          <el-option
            v-for="item in seach.hospitals"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">下单日期：</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="seach.orderDate"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button
          size="small"
          @click="pageList(pages.currentPage,pages.pageSize)"
          type="warning"
          icon="el-icon-search"
        >查询</el-button>
      </el-col>
    </el-row>
    <el-row class="office_performance">
      <el-col :span="2" id="input-title">
        <span>是否续会员：</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.haveVipOrderValue" placeholder="请选择">
          <el-option
            v-for="item in seach.haveVipOrders"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span>病单类型：</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.prescriptionType" placeholder="请选择">
          <el-option
            v-for="item in seach.prescriptionTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span>下单人：</span>
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="seach.userName"
          size="small"
          placeholder="请输入姓名"
        ></el-input>
      </el-col>
      <el-col :span="2" class="line-h-30">
        <span>是否办理会员：</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.haveVipOrder" placeholder="请选择">
          <el-option
            v-for="item in seach.haveVipOrders"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="1" id="input-title">
        <span>科室：</span>
      </el-col>
      <el-col :span="2">
        <el-select
          clearable
          @change="doctorList(seach.departmentValue)"
          size="small"
          v-model="seach.departmentValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.departments"
            :key="item.departmentId"
            :label="item.departmentName"
            :value="item.departmentId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1" id="input-title">
        <span>医生：</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.doctorValue" placeholder="请选择">
          <el-option
            v-for="item in seach.doctors"
            :key="item.doctorId"
            :label="item.doctorName"
            :value="item.doctorId"
          ></el-option>
        </el-select>
      </el-col>-->
      <el-col :span="2">
        <el-button
          type="danger"
          icon="el-icon-download"
          @click="exportExcels()"
          size="small"
        >导出excel</el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table
      border
      :data="clientData"
      max-height="650"
      class="client_table"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
      <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
      <el-table-column align="center" prop="siteName" label="站点"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户名"></el-table-column>
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="reVip" label="是否续会员"></el-table-column>
      <el-table-column align="center" prop="haveVipOrder" label="是否办理会员"></el-table-column>
      <!-- <el-table-column align="center" prop="hospitalName" label="医院"></el-table-column>
      <el-table-column align="center" prop="departmentName" label="科室"></el-table-column>
      <el-table-column align="center" prop="doctorName" label="医生"></el-table-column>-->
      <el-table-column align="center" prop="orderTime" label="会员下单日期"></el-table-column>
      <el-table-column align="center" prop="userName" label="会员人"></el-table-column>
    </el-table>
    <div class="total">
      <span>合计：</span>
      <span>办会员数：{{total.newVipCount}}</span>
      <span>办会员率：{{total.vipRatio}}</span>
      <span>续会员率：{{total.reNewVipRatio}}</span>
    </div>
    <!-- Pagination 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
      class="pagination"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getHospitalList,
  selectDepartmentByHospitalId,
  queryDoctorByDepartmentId,
  memberCardStatistics,
  queryMemberDetail,
  queryBlackHistory
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  province,
  city,
  site,
  allSite,
  hospital
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      clientData: [],
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        userName: null,
        haveVipOrder: null,
        prescriptionType: null,
        prescriptionTypeList: [
          { name: "儿保", id: "0" },
          { name: "住院", id: 1 },
          { name: "门诊", id: 2 }
        ],

        orderDate: null,
        // createTime:null,
        haveVipOrders: [
          { name: "是", id: 1 },
          { name: "否", id: 2 }
        ],
        haveVipOrderValue: null,
        hospitals: [],
        departments: [],
        doctors: [],
        hospitalValue: null,
        departmentttValue: null,
        doctorValue: null,

        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      },
      total: {},
      //详情
      dialogDepartmentDetails: false,
      Details: {
        address: null,
        birthday: null,
        cognition: null,
        isBlack: null,
        memberName: null,
        phone: null,
        school: null,
        sex: null,
        source: null,
        treatmentCycle: null,
        treatmentCycleTime: null
      },
      memberCard: {
        isVIP: null,
        partsNum: null,
        wholeNum: null,
        vipType: null,
        expireDate: null
      },
      prescriptions: null,
      evaluates: null,
      orders: null,
      currentNamberId: null,
      dialogBlacklistDetails: false,
      blacklistDetails: null,
      loading: true
    };
  },
  mounted() {
    this.pageList();
    // this.hospitalList();
    this.provinceList();
  },
  methods: {
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        beginTime:
          this.seach.orderDate == null ? null : this.seach.orderDate[0],
        endTime: this.seach.orderDate == null ? null : this.seach.orderDate[1],
        haveVipOrder: this.seach.haveVipOrder,
        userName: this.seach.userName,
        vipType: this.seach.haveVipOrderValue,
        prescriptionType:
          this.seach.prescriptionType == "0" ? 0 : this.seach.prescriptionType,
        hospitalId: this.seach.hospitalValue || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      this.loading = true;
      memberCardStatistics(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.loading = false;
            let dataList = res.data;
            this.clientData = dataList.data.statistics;
            this.total = dataList.data;
            this.pages.total = dataList.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出excel
    exportExcels() {
      let data = {
        beginTime:
          this.seach.orderDate == null ? null : this.seach.orderDate[0],
        endTime: this.seach.orderDate == null ? null : this.seach.orderDate[1],
        haveVipOrder: this.seach.haveVipOrder,
        userName: this.seach.userName,
        vipType: this.seach.haveVipOrderValue,
        prescriptionType:
          this.seach.prescriptionType == "0" ? 0 : this.seach.prescriptionType,
        hospitalId: this.seach.hospitalValue || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      const lsyObj = {
        method: "post",
        fileName: "会员统计信息",
        url: javaApi.hytj_ExportUrl,
        data: data
      };
      exportMethod(this, lsyObj);
    },
    //当前页面变化时
    handleCurrentChange(num) {
      this.pages.currentPage = num;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.pageList(pageIndex, pageSize);
    },
    //页面条数发生变化时
    handleSizeChange(val) {
      this.pages.pageSize = val;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.pageList(pageIndex, pageSize);
    },
    //获取医院名
    // async hospitalList(id) {
    //   getHospitalList()
    //     .then(res => {
    //       // debugger;
    //       this.seach.hospitals = res.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //获取科室
    async departmentList(id) {
      let data = {
        hospitalId: id
      };
      selectDepartmentByHospitalId(data)
        .then(res => {
          // debugger;
          this.seach.departments = res.data.data.departments;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取医生
    async doctorList(id) {
      let data = {
        departmentId: id
      };
      queryDoctorByDepartmentId(data)
        .then(res => {
          // debugger;
          this.seach.doctors = res.data.data.doctors;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取省
    async provinceList() {
      this.seach.provinceIdList = await province();
    },
    //获取市
    async cityList(id) {
      this.seach.cityIdList = await city(id);
    },
    //根据市获取站点列表
    async siteList(id) {
      this.seach.siteLists = await allSite(null,id);
    },
    //根据站点获取医院列表
    async hospitalList(id) {
      this.seach.hospitals = await hospital(id);
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 10px;
  .time_style {
    letter-spacing: 1px;
    font-size: 14px;
    color: #606266;
  }
}
.office_performance {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  letter-spacing: 1px;
  color: #606266;
}
.client_table {
  margin-top: 10px;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
.total {
  background: #ff9800;
  color: #606266;
  height: 50px;
  line-height: 50px;
  span {
    margin-left: 20px;
  }
}
</style>
