// 系统管理操作日志
<template>
  <div>
    <!-- search -->
    <el-form :inline="true" size="small"  id="search" class="padding-LR-p10">
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
        <el-select clearable class="w-150" v-model="seach.siteValue" placeholder="请先选择城市">
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input class="w-150" v-model="seach.name" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select clearable class="w-150" v-model="seach.logValue" placeholder="请选择">
          <el-option v-for="item in seach.logs" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input class="w-150" v-model="seach.orderNum" placeholder="请输入订单编号"></el-input>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker
          class="w-250"
          v-model="seach.logTime"
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
      class="client_table"
      border
      :data="clientData"
      max-height="650"
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
      <el-table-column align="center" prop="createUserName" label="用户姓名"></el-table-column>
      <el-table-column align="center" prop="createUserRoleName" label="用户角色"></el-table-column>
      <el-table-column align="center" prop="name" label="操作类型"></el-table-column>
      <el-table-column align="center" prop="orderNum" label="订单编号"></el-table-column>
      <el-table-column align="center" prop="createTime" label="操作时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type != 2"
            @click="operationDetails(scope.row)"
            type="info"
            icon="el-icon-document"
            size="small"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- dialog 操作日志详情-->
    <el-dialog
      title="操作详情"
      :visible.sync="dialogOperation"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="logCancel"
    >
      <h3 class="b-b-p-1">基本信息</h3>
      <div>
        <span>订单编号:</span>
        <span class="margin-r-20">{{myRow.orderNum}}</span>
        <span>修改人:</span>
        <span class="margin-r-20">{{myRow.createUserName}}</span>
        <span>修改时间:</span>
        <span class="margin-r-20">{{myRow.createTime}}</span>
      </div>
      <div v-if="xgdd">
        <h3 class="b-b-p-1">修改订单操作详情</h3>
        <el-table class="client_table" border :data="xq.after" max-height="580">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="actualOld" label="应收金额前"></el-table-column>
          <el-table-column align="center" prop="actualNew" label="应收金额后"></el-table-column>
          <el-table-column align="center" prop="deliveryTimeOld" label="交货日期前"></el-table-column>
          <el-table-column align="center" prop="deliveryTimeNew" label="交货日期后"></el-table-column>
          <el-table-column align="center" prop="favorableOld" label="优惠价格前"></el-table-column>
          <el-table-column align="center" prop="favorableNew" label="优惠价格后"></el-table-column>
          <el-table-column align="center" prop="favorableRemarkOld" label="优惠原因前"></el-table-column>
          <el-table-column align="center" prop="favorableRemarkNew" label="优惠原因后"></el-table-column>
          <el-table-column align="center" prop="productOrderTypeOld" label="下单类型前"></el-table-column>
          <el-table-column align="center" prop="productOrderTypeNew" label="下单类型后"></el-table-column>
          <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
        </el-table>
        <el-table class="client_table" border :data="xq.before">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="actualOld" label="应收金额前"></el-table-column>
          <el-table-column align="center" prop="actualNew" label="应收金额后"></el-table-column>
          <el-table-column align="center" prop="cashOld" label="现金前"></el-table-column>
          <el-table-column align="center" prop="cashNew" label="现金后"></el-table-column>
          <el-table-column align="center" prop="lakalaOld" label="拉卡拉前"></el-table-column>
          <el-table-column align="center" prop="lakalaNew" label="拉卡拉后"></el-table-column>
          <el-table-column align="center" prop="quicklyOld" label="加急前"></el-table-column>
          <el-table-column align="center" prop="quicklyNew" label="加急后"></el-table-column>
          <el-table-column align="center" prop="transferOld" label="转账金额前"></el-table-column>
          <el-table-column align="center" prop="transferNew" label="转账金额后"></el-table-column>
        </el-table>
      </div>
      <div v-if="tk">
        <h3 class="b-b-p-1">退款操作详情</h3>
        <el-table class="client_table" border :data="xq.after" max-height="580">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="name" label="产品昵称"></el-table-column>
          <el-table-column align="center" prop="price" label="价格"></el-table-column>
          <el-table-column align="center" prop="reason" label="退款原因"></el-table-column>
        </el-table>
      </div>
      <div v-if="bj">
        <h3 class="b-b-p-1">补交欠款操作详情</h3>
        <el-table class="client_table" border :data="xq.after" max-height="580">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="all" label="合计"></el-table-column>
          <el-table-column align="center" prop="cash" label="现金"></el-table-column>
          <el-table-column align="center" prop="lakala" label="拉卡拉"></el-table-column>
          <el-table-column align="center" prop="transfer" label="转账"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { logList, logDetail } from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  province,
  city,
  site,
  allSite
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      xgdd: false,
      tk: false,
      bj: false,
      myRow: {
        orderNum: null,
        createUserName: null,
        createTime: null
      },
      xq: {
        before: [],
        after: []
      },
      clientData: [],
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        logTime: null,
        name: null,
        logs: [
          { name: "修改订单", id: 1 },
          { name: "取消订单", id: 2 },
          { name: "补交欠款", id: 3 },
          { name: "退款", id: 4 },
          { name: "退款确认", id: 5 },
          { name: "开发票", id: 6 }
        ],
        logValue: null,
        orderNum: null,
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      },
      dialogOperation: false,
      loading: true
    };
  },
  mounted() {
    this.pageList();
    this.provinceList();
  },
  methods: {
    logCancel() {
      this.dialogOperation = false;
      this.xgdd = false;
      this.tk = false;
      this.bj = false;
      this.qx = false;
      this.xq.after = [];
    },
    operationDetails(obj) {
      let data = {
        id: obj.id,
        type: obj.type
      };
      logDetail(data)
        .then(res => {
          this.dialogOperation = true;
          this.myRow = obj;
          if (obj.type === 1) {
            this.xq.after = res.data.data.updateSaleOrderDetails;
            this.xq.before[0] = res.data.data.updateSaleOrderRecord;
            this.xgdd = true;
          } else if (obj.type === 3) {
            this.xq.after[0] = res.data.data.addMoney;
            this.bj = true;
          } else if (obj.type === 4) {
            this.xq.after = res.data.data.refunds;
            this.tk = true;
          } else if (obj.type === 5) {
            // this.xq.before=res.data.data.confirmReason
            this.xq.after = res.data.data.confirmRefunds;
          }
        })
        .catch(res => {
          console.log(err);
        });
    },
    //订单列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        beginTime: this.seach.logTime == null ? null : this.seach.logTime[0],
        endTime: this.seach.logTime == null ? null : this.seach.logTime[1],
        userName: this.seach.name || null,
        type: this.seach.logValue || null,
        orderNum: this.seach.orderNum || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        site: this.seach.siteValue
      };
      this.loading = true;
      logList(data)
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
            this.clientData = dataList.data;
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
        beginTime: this.seach.logTime == null ? null : this.seach.logTime[0],
        endTime: this.seach.logTime == null ? null : this.seach.logTime[1],
        userName: this.seach.name || null,
        type: this.seach.logValue || null,
        orderNum: this.seach.orderNum || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        site: this.seach.siteValue
      };
      const lsyObj = {
        method: "post",
        fileName: "操作日志信息",
        url: javaApi.czrz_ExportUrl,
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
    }
  }
};
</script>

<style scoped lang="scss">
</style>
