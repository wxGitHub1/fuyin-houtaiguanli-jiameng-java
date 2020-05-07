<template>
  <div>
    <!-- seach -->
    <el-row class="search">
      <el-col :span="2" id="input-title">
        <span class="time_style">客户姓名</span>
      </el-col>
      <el-col :span="2">
        <el-input v-model="seach.memberName" style="width：100%" size="small" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">联系方式</span>
      </el-col>
      <el-col :span="2">
        <el-input size="small" style="width：100%" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">产品类型</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.sourceValue" placeholder="请选择">
          <el-option
            v-for="item in seach.sources"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">下单日期：</span>
      </el-col>
      <el-col :span="4">
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
    <el-row class="search margin-t-10">
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
        <el-select
          clearable
          @change="departmentList(seach.hospitalValue)"
          size="small"
          v-model="seach.hospitalValue"
          placeholder="请先选择站点"
        >
          <el-option
            v-for="item in seach.hospitals"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1" id="input-title">
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
      </el-col>
    </el-row>
    <el-row class="office_performance">
      <el-col :span="2" id="input-title">
        <span>付款类型：</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.payValue" placeholder="请选择">
          <el-option v-for="item in seach.pays" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span>产品昵称</span>
      </el-col>
      <el-col :span="2">
        <el-input size="small" style="width：100%" v-model="seach.nickname" placeholder="请输入昵称"></el-input>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">订单类型</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.recordValue" placeholder="请选择">
          <el-option
            v-for="item in seach.records"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>

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
      max-height="620"
      class="client_table"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="createTime" label="下单时间"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="actual" label="实际价格"></el-table-column>
      <el-table-column align="center" prop="source" label="产品分类"></el-table-column>
      <el-table-column align="center" prop="payType" label="付款类型"></el-table-column>
      <el-table-column align="center" prop="orderUserName" label="下单人员"></el-table-column>
    </el-table>
    <div class="total">
      <span>合计：</span>
      <span>客户总数：{{total.mCount}}</span>
      <span>订单总数：{{total.rCount}}</span>
      <span>营业金额：{{total.rShould}}</span>
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
  assignStatistics
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
      loading: true,
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        memberName: null,
        phone: null,
        orderDate: null,
        records: [
          { name: "成人", id: 1 },
          { name: "儿童", id: 0 }
        ],
        recordValue: null,
        hospitals: [],
        departments: [],
        doctors: [],
        hospitalValue: null,
        departmentValue: null,
        doctorValue: null,
        pays: [
          { name: "混付", id: 0 },
          { name: "拉卡拉", id: 1 },
          { name: "现金", id: 2 },
          { name: "转账", id: 3 }
        ],
        payValue: null,
        nickname: null,
        sourceValue: null,
        sources: [
          { name: "测评服务", id: 201 },
          { name: "定制产品", id: 301 },
          { name: "自制成品", id: 303 },
          { name: "外购成品", id: 302 },
          { name: "会员", id: 101 }
        ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      },
      total: {
        rCount: 0,
        mCount: 0,
        rShould: 0
      }
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
        memberName: this.seach.memberName,
        phone: this.seach.phone,
        beginTime:
          this.seach.orderDate == null ? null : this.seach.orderDate[0],
        endTime: this.seach.orderDate == null ? null : this.seach.orderDate[1],
        recordType: this.seach.recordvalue,
        payType: this.seach.payValue,
        nickname: this.seach.nickname,
        source: this.seach.sourceValue,
        hospitalId: this.seach.hospitalValue || null,
        departmentId: this.seach.departmentValue || null,
        doctorId: this.seach.doctorValue || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      this.loading = true;
      assignStatistics(data)
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
            this.clientData = dataList.data.dtos;
            this.total.rCount = dataList.data.count.rCount;
            this.total.mCount = dataList.data.count.mCount;
            this.total.rShould = dataList.data.count.rShould;
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
        memberName: this.seach.memberName,
        phone: this.seach.phone,
        beginTime:
          this.seach.orderDate == null ? null : this.seach.orderDate[0],
        endTime: this.seach.orderDate == null ? null : this.seach.orderDate[1],
        recordType: this.seach.recordvalue,
        payType: this.seach.payValue,
        nickname: this.seach.nickname,
        source: this.seach.sourceValue,
        hospitalId: this.seach.hospitalValue || null,
        departmentId: this.seach.departmentValue || null,
        doctorId: this.seach.doctorValue || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      const lsyObj = {
        method: "post",
        fileName: "前台统计信息",
        url: javaApi.qt_ExportUrl,
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
    //       debugger;
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
          debugger;
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
          debugger;
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
