<template>
  <div>
    <!-- seach -->
    <el-row class="search">
      <el-col :span="2" id="input-title">
        <span class="time_style">到访类型</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.visitTypeValue" placeholder="请选择">
          <el-option
            v-for="item in seach.visitType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="line-height: 30px">
        <span class="time_style">测评接待时间：</span>
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
      <el-col :span="2" style="line-height: 30px">
        <span class="time_style">测评服务人员</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.recordValue" placeholder="请选择">
          <el-option
            v-for="item in seach.nameList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
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
        <span class="time_style">测评中心:</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.siteValue" placeholder="请先选择城市">
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">下单类型:</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.productOrderType" placeholder="请先选择城市">
          <el-option
            v-for="item in seach.productOrderTypeList"
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
      max-height="630"
      class="client_table"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="user" label="测评服务人员"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="createTime" label="测评接待时间"></el-table-column>
      <el-table-column align="center" prop="repeat" label="到访类型"></el-table-column>
      <el-table-column align="center" prop="memberVip" label="是否会员"></el-table-column>
      <el-table-column align="center" prop="vipType" label="是否续会员"></el-table-column>
      <el-table-column align="center" prop="productOrderTypeCN" label="下单类型"></el-table-column>
      <el-table-column align="center" prop="replaceProduct" label="是否换产品"></el-table-column>
    </el-table>
    <div class="total">
      <span>合计：</span>
      <span>营业金额合计：{{total.money }}</span>
      <span>办会员：{{total.subVipNum }}</span>
      <span>续会员：{{total.reVipNum }}</span>
      <span>续会员率：{{total.reVipRatio }}</span>
      <span>会员率：{{total.vipRatio }}</span>
      <span>初诊客户数：{{total.firstNum }}</span>
      <span>复查客户数：{{total.reviewNum }}</span>
      <span>换产品客户数：{{total.replaceNum }}</span>
      <span>换产品率：{{total.replaceRatio }}</span>
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
import { examineStatistics, userListByDept } from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import { exportMethod, province, city, site,allSite } from "../../utils/public";
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
        orderDate: null,
        recordValue: null,
        nameList: [],
        visitTypeValue: null,
        visitType: [
          { name: "初诊", id: "0" },
          { name: "复查", id: 1 }
        ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        productOrderType:null,
        productOrderTypeList:[
          {name:"处方产品",id:1},
          {name:"新增产品",id:2},
          {name:"更换产品",id:3},
          {name:"赠送产品",id:4},
          {name:"服务产品",id:5}
        ]
      },
      total: {},
      nameList: [],
      loading: true
    };
  },
  mounted() {
    this.pageList();
    this.personnel();
    this.provinceList();
  },
  methods: {
    //导出excel
    exportExcels() {
      let data = {
        beginDate:
          this.seach.orderDate == null ? null : this.seach.orderDate[0],
        endDate: this.seach.orderDate == null ? null : this.seach.orderDate[1],
        userId: this.seach.recordValue,
        repeat:
          this.seach.visitTypeValue == "0" ? 0 : this.seach.visitTypeValue,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      const lsyObj = {
        method: "post",
        fileName: "测评统计信息",
        url: javaApi.exportExamineStatistics,
        data: data
      };
      exportMethod(this, lsyObj);
    },
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        beginDate:
          this.seach.orderDate == null ? null : this.seach.orderDate[0],
        endDate: this.seach.orderDate == null ? null : this.seach.orderDate[1],
        userId: this.seach.recordValue,
        repeat:
          this.seach.visitTypeValue == "0" ? 0 : this.seach.visitTypeValue,
        provinceId: this.seach.provinceId || null,
        cityId: this.seach.cityId || null,
        siteId: this.seach.siteValue || null,
        productOrderType: this.seach.productOrderType || null,
      };
      this.loading = true;
      examineStatistics(data)
        .then(res => {
          this.loading = false;
          let dataList = res.data;
          this.clientData = dataList.data.statistics;
          this.total = dataList.data;
          this.pages.total = dataList.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取测评人员列表
    personnel() {
      let data = {
        deptId: 9
      };
      userListByDept(data)
        .then(res => {
          this.seach.nameList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
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
      this.seach.siteLists = await allSite(null,id);
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
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-wrap: wrap;
  span {
    margin-left: 20px;
    height: 50px;
    line-height: 50px;
  }
}
</style>
