// 统计报表
<template>
  <div>
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="省份">
        <el-select
          clearable
          class="w-150"
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
      </el-form-item>
      <el-form-item label="城市">
        <el-select
          clearable
          class="w-150"
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
      </el-form-item>
      <el-form-item label="测评中心">
        <el-select
          clearable
          class="w-150"
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
      </el-form-item>
      <el-form-item label="医院">
        <el-select
          clearable
          class="w-150"
          @change="departmentList(seach.hospitalValue)"
          v-model="seach.hospitalValue"
          placeholder="请先选择测评中心"
        >
          <el-option
            v-for="item in seach.hospitals"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科室">
        <el-select
          clearable
          class="w-150"
          @change="doctorList(seach.departmentValue)"
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
      </el-form-item>
      <el-form-item label="医生">
        <el-select clearable class="w-150" v-model="seach.doctorValue" placeholder="请选择">
          <el-option
            v-for="item in seach.doctors"
            :key="item.doctorId"
            :label="item.doctorName"
            :value="item.doctorId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品">
        <el-input class="w-150" v-model="seach.product" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="下单人">
        <el-input class="w-150" v-model="seach.orderUserName" placeholder="请输入下单人"></el-input>
      </el-form-item>
      <el-form-item label="下单日期">
        <el-date-picker
          class="w-250"
          v-model="seach.OrderTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="pageList(pages.currentPage,pages.pageSize)"
          type="warning"
          icon="el-icon-search"
        >查询</el-button>
        <el-button type="danger" icon="el-icon-download" @click="exportExcels()">导出excel</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="clientData"
      max-height="600"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
      <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
      <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
      <el-table-column align="center" prop="name" label="产品名"></el-table-column>
      <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="qualification" label="产品资质"></el-table-column>
      <el-table-column align="center" prop="num" label="数量"></el-table-column>
      <el-table-column align="center" prop="hospitalName" label="医院"></el-table-column>
      <el-table-column align="center" prop="departmentName" label="科室"></el-table-column>
      <el-table-column align="center" prop="doctorName" label="医生"></el-table-column>
      <el-table-column align="center" prop="actualSum" label="实际价格"></el-table-column>
      <el-table-column align="center" prop="refundSum" label="退款额"></el-table-column>
    </el-table>
    <div class="total">
      <span>合计：</span>
      <span>产品总数量：{{total.num}}</span>
      <span>营业总额：{{total.actualSum}}</span>
      <span>退款总金额：{{total.refundSum}}</span>
      <span>加急费总金额：{{total.quicklySum}}</span>
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
  productStatistics
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
      total: {
        num: 0,
        actualSum: 0,
        refundSum: 0
      },
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        orderUserName: null,
        OrderTime: null,
        product: null,
        hospitals: [],
        hospitalValue: null,
        departments: [],
        departmentValue: null,
        doctors: [],
        doctorValue: null,
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      },
      loading: true
    };
  },
  mounted() {
    this.pageList();
    // this.hospitals();
    this.provinceList();
  },
  methods: {
    //订单列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        orderTimeBegin:
          this.seach.OrderTime == null ? null : this.seach.OrderTime[0],
        orderTimeEnd:
          this.seach.OrderTime == null ? null : this.seach.OrderTime[1],
        nickname: this.seach.product || null,
        hospitalId: this.seach.hospitalValue || null,
        departmentId: this.seach.departmentValue || null,
        doctorId: this.seach.doctorValue || null,
        orderUserName: this.seach.orderUserName || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      this.loading = true;
      productStatistics(data)
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
            this.clientData = dataList.data.productStatistics;
            this.pages.total = dataList.total;
            this.total = dataList.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出excel
    exportExcels() {
      let data = {
        orderTimeBegin:
          this.seach.OrderTime == null ? null : this.seach.OrderTime[0],
        orderTimeEnd:
          this.seach.OrderTime == null ? null : this.seach.OrderTime[1],
        nickname: this.seach.product || null,
        hospitalId: this.seach.hospitalValue || null,
        departmentId: this.seach.departmentValue || null,
        doctorId: this.seach.doctorValue || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      const lsyObj = {
        method: "post",
        fileName: "统计报表信息",
        url: javaApi.tjbb_ExportUrl,
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
    //医院
    // hospitals() {
    //   getHospitalList()
    //     .then(res => {
    //       console.log(res);
    //       this.seach.hospitals = res.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //科室
    departmentList(id) {
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
    //医生
    doctorList(id) {
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
    //根据市获取测评中心列表
    async siteList(id) {
      this.seach.siteLists = await allSite(null, id);
    },
    //根据测评中心获取医院列表
    async hospitalList(id) {
      this.seach.hospitals = await hospital(id);
    }
  }
};
</script>

<style scoped lang="scss">
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
