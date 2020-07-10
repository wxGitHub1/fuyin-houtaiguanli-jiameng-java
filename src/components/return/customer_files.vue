//客户档案
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
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
        <el-select clearable class="w-150" v-model="seach.hospitalId" placeholder="请先选择测评中心">
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评日期">
        <el-date-picker
          class="w-250"
          v-model="seach.examinationTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
      <el-form-item label="客户类型">
        <el-select class="w-150" clearable v-model="seach.memberMode" placeholder="请选择">
          <el-option
            v-for="item in seach.memberModeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评状态">
        <el-select class="w-150" clearable v-model="seach.examinationStatus" placeholder="请选择">
          <el-option
            v-for="item in seach.examinationStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="seach.memberName" class="w-150" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input class="w-150" v-model="seach.productName" placeholder="请输入产品昵称"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          class="w-250"
          v-model="seach.birthday"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker
          class="w-250"
          v-model="seach.createTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="测评人员">
        <el-select class="w-150" clearable v-model="seach.examinationUser" placeholder="请选择">
          <el-option
            v-for="item in seach.examinationUserList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="流失时间">
       <el-date-picker
         class="w-250"
          v-model="seach.outflowTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="回访类型">
       <el-select
          class="w-150"
          clearable
          v-model="seach.examinationUser"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.examinationUserList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button
          @click="pageList(pages.currentPage,pages.pageSize)"
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
        <!-- <el-button type="danger" @click="exportExcels()">导出excel</el-button> -->
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table
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
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="vip" label="是否会员"></el-table-column>
      <el-table-column align="center" prop="memberCreateTime" label="创建日期"></el-table-column>
      <el-table-column align="center" prop="examinationStatus" label="测评状态"></el-table-column>
      <el-table-column align="center" prop="examinationUser" label="初次测评人员"></el-table-column>
      <el-table-column align="center" prop="memberMode" label="客户当前类型"></el-table-column>
      <el-table-column align="center" prop="talkResult" label="沟通结果"></el-table-column>
      <el-table-column align="center" prop="examinationCreateTime" label="初次测评时间"></el-table-column>
    </el-table>
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
import { selectMemberFile } from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  personnel,
  province,
  city,
  allSite,
  site,
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
        // outflowTime: null,
        // visitUserName: null,
        // visitUserList: [],
        // saleProductName: null,
        // visitTypeInt: null,
        // visitTypeIntList: [
        //   { name: "产品体验回访", id: 1 },
        //   { name: "产品使用回访", id: 2 },
        //   { name: "复查邀约回访", id: 3 },
        //   { name: "复查确认回访", id: 4 }
        // ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists: [],
        hospitalId: null,
        examinationTime: null,
        vip: null,
        vipList: [
          { name: "否", id: "0" },
          { name: "是", id: 1 }
        ],
        memberMode: null,
        memberModeList: [
          { name: "产品客户", id: 1 },
          { name: "核心客户", id: 2 },
          { name: "持续客户", id: 3 }
        ],
        examinationStatus: null,
        examinationStatusList: [
          { name: "已测评", id: 1 },
          { name: "未测评", id: "0" }
        ],
        memberName: null,
        productName: null,
        birthday: null,
        createTime: null,
        examinationUser: null,
        examinationUserList: []
      },
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
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId,
        examinationTimeBegin:
          this.seach.examinationTime == null
            ? null
            : this.seach.examinationTime[0],
        examinationTimeEnd:
          this.seach.examinationTime == null
            ? null
            : this.seach.examinationTime[1],
        vip: this.seach.vip,
        memberMode: this.seach.memberMode,
        examinationStatus:
          this.seach.examinationStatus == "0"
            ? 0
            : this.seach.examinationStatus,
        memberName: this.seach.memberName,
        productName: this.seach.productName,
        birthdayBegin:
          this.seach.birthday == null ? null : this.seach.birthday[0],
        birthdayEnd:
          this.seach.birthday == null ? null : this.seach.birthday[1],
        createTimeBegin:
          this.seach.createTime == null ? null : this.seach.createTime[0],
        createTimeEnd:
          this.seach.createTime == null ? null : this.seach.createTime[1],
        examinationUser: this.seach.examinationUser
        // outflowTimeBegin:
        //   this.seach.outflowTime == null ? null : this.seach.outflowTime[0],
        // outflowTimeEnd:
        //   this.seach.outflowTime == null ? null : this.seach.outflowTime[1],
        // vip: this.seach.vip == "0" ? 0 : this.seach.vip || null,
        // visitUserName: this.seach.visitUserName || null,
        // saleProductName: this.seach.saleProductName || null,
        // visitTypeInt: this.seach.visitTypeInt || null,
        // memberName: this.seach.memberName || null,
        // provinceId: this.seach.provinceId,
        // cityId: this.seach.cityId,
        // siteId: this.seach.siteValue,
        // hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectMemberFile(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            this.clientData = dataList.data;
            this.pages.total = dataList.total;
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
        outflowTimeBegin:
          this.seach.outflowTime == null ? null : this.seach.outflowTime[0],
        outflowTimeEnd:
          this.seach.outflowTime == null ? null : this.seach.outflowTime[1],
        vip: this.seach.vip == "0" ? 0 : this.seach.vip || null,
        visitUserName: this.seach.visitUserName || null,
        saleProductName: this.seach.saleProductName || null,
        visitTypeInt: this.seach.visitTypeInt || null,
        memberName: this.seach.memberName || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      const lsyObj = {
        method: "post",
        fileName: "已流失客户信息",
        url: javaApi.exportBackVisitOutflowExcel,
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
    },
    //根据测评中心获取医院列表
    async hospitalList(id) {
      this.seach.hospitalLists = await hospital(id);
    },
    //人员
    async userList() {
      this.seach.examinationUserList = await personnel(9);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
