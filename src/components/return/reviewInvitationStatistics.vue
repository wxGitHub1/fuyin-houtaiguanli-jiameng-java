//复查邀约统计
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="mini" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input v-model="seach.memberName" class="w-150" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="是否会员">
        <el-select class="w-150" clearable v-model="seach.vip" placeholder="请选择">
          <el-option
            v-for="item in seach.vipList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回访人员">
        <el-input clearable class="w-150" v-model="seach.visitUserName" placeholder="请输入回访人"></el-input>
      </el-form-item>
      <el-form-item label="是否流失">
        <el-select
          class="w-150"
          clearable
          v-model="seach.outflow"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.outflowList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回访时间">
        <el-date-picker
          class="w-250"
          v-model="seach.visitTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="产品昵称">
        <el-input
          class="w-150"
          v-model="seach.saleProductName"
          placeholder="请输入产品昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="沟通结果">
        <el-select
         class="w-150"
          clearable
          v-model="seach.backTalkResult"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.backTalkResultList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否到访">
         <el-select
          class="w-150"
          clearable
          v-model="seach.visitFlag"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.visitFlagList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接通状态">
        <el-select
          class="w-150"
          clearable
          v-model="seach.phoneStatus"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.phoneStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="复查邀约结果">
        <el-select
          class="w-150"
          clearable
          v-model="seach.backInviteResult"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.backInviteResultList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省份">
        <el-select
         class="w-150"
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
      </el-form-item>
      <el-form-item label="城市">
        <el-select
          class="w-150"
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
      </el-form-item>
      <el-form-item label="测评中心">
         <el-select clearable class="w-150" v-model="seach.siteValue" placeholder="请先选择城市" @change="hospitalList(seach.siteValue)">
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院">
        <el-select clearable class="w-150" v-model="seach.hospitalId" placeholder="请先选择测评中心">
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="pageList(pages.currentPage,pages.pageSize)"
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
        <el-button type="danger" @click="exportExcels()">导出excel</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table
      border
      :data="clientData"
      max-height="550"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="vip" label="是否会员"></el-table-column>
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="backVisitUserName" label="回访人员"></el-table-column>
      <el-table-column align="center" prop="visitTime" label="回访时间"></el-table-column>
      <el-table-column align="center" prop="backTalkResult" label="沟通结果"></el-table-column>
      <el-table-column align="center" prop="outflow" label="是否流失"></el-table-column>
      <el-table-column align="center" prop="phoneStatus" label="接通状态"></el-table-column>
      <el-table-column align="center" prop="backInviteResult" label="复查邀约结果"></el-table-column>
      <el-table-column align="center" prop="visitFlag" label="是否到访"></el-table-column>
    </el-table>
    <div class="total">
      <span>合计：</span>
      <span>客户总数量:{{total.visitMemberCount}}</span>
      <span>到访客户总数量:{{total.visitFlag}}</span>
      <span>流失客户数:{{total.outflowMemberCount}}</span>
      <span>到访次数:{{total.visitFlag}}</span>
      <span>到访率:{{total.visitFlagRatio}}</span>
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
import { selectBackStatistics } from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import { exportMethod, personnel, province, city,allSite, site,hospital } from "../../utils/public";
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
        visitTime: null,
        vip: null,
        vipList: [{ name: "否", id: "0" }, { name: "是", id: 1 }],
        backTalkResult: null,
        backTalkResultList: [{ name: "配合" }, { name: "不配合" }],
        visitUserName: null,
        visitUserList: [],
        saleProductName: null,
        phoneStatus: null,
        phoneStatusList: [
          { name: "接通" },
          { name: "未接通" },
          { name: "接通挂断" },
          { name: "联系方式错误" }
        ],
        memberName: null,
        outflow: null,
        outflowList: [{ name: "是", id: 1 }, { name: "否", id: "0" }],
        backInviteResult: null,
        backInviteResultList: [
          { name: "拒绝不来" },
          { name: "没时间" },
          { name: "时间自己定" },
          { name: "时间不定" }
        ],
        visitFlag: null,
        visitFlagList: [{ name: "已到访",id:1 }, { name: "未到访",id:"0" }],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists:[],
        hospitalId:null,
      },
      total: {},
      loading: true
    };
  },
  mounted() {
    this.pageList();
    this.userList();
    this.provinceList();
  },
  methods: {
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        visitTimeBegin:
          this.seach.visitTime == null ? null : this.seach.visitTime[0],
        visitTimeEnd:
          this.seach.visitTime == null ? null : this.seach.visitTime[1],
        vip: this.seach.vip == "0" ? 0 : this.seach.vip || null,
        visitUserName: this.seach.visitUserName || null,
        backTalkResult: this.seach.backTalkResult || null,
        saleProductName: this.seach.saleProductName || null,
        phoneStatus: this.seach.phoneStatus || null,
        memberName: this.seach.memberName || null,
        outflow: this.seach.outflow == "0" ? 0 : this.seach.outflow || null,
        backInviteResult: this.seach.backInviteResult || null,
        visitFlag: this.seach.visitFlag== "0" ? 0 : this.seach.visitFlag || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectBackStatistics(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            this.clientData = dataList.data.dtos;
            this.pages.total = dataList.total;
            this.total = dataList.data;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出excel
    exportExcels() {
      let data = {
        visitTimeBegin:
          this.seach.visitTime == null ? null : this.seach.visitTime[0],
        visitTimeEnd:
          this.seach.visitTime == null ? null : this.seach.visitTime[1],
        vip: this.seach.vip == "0" ? 0 : this.seach.vip || null,
        visitUserName: this.seach.visitUserName || null,
        backTalkResult: this.seach.backTalkResult || null,
        saleProductName: this.seach.saleProductName || null,
        phoneStatus: this.seach.phoneStatus || null,
        memberName: this.seach.memberName || null,
        outflow: this.seach.outflow == "0" ? 0 : this.seach.outflow || null,
        backInviteResult: this.seach.backInviteResult || null,
        visitFlag: this.seach.visitFlag== "0" ? 0 : this.seach.visitFlag || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      const lsyObj = {
        method: "post",
        fileName: "产品邀约统计信息",
        url: javaApi.exportBackStatisticsExcel,
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
      this.seach.siteLists = await allSite(null,id);
    },
    //根据测评中心获取医院列表
    async hospitalList(id) {
      this.seach.hospitalLists = await hospital(id);
    },
    //人员
    async userList() {
      this.seach.visitUserList = await personnel(9);
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
