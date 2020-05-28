 //维修统计
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input v-model="seach.memberName" class="w-150" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="报修人员">
        <el-select class="w-150" clearable v-model="seach.repairUserId" placeholder="请选择">
          <el-option
            v-for="item in seach.scUserNameList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修人员">
        <el-select class="w-150" clearable v-model="seach.doRepairUserId" placeholder="请选择">
          <el-option
            v-for="item in seach.wxUserList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修方式">
        <el-select class="w-150" clearable v-model="seach.repairType" placeholder="请选择">
          <el-option
            v-for="item in seach.repairTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
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
        <el-select class="w-150" clearable v-model="seach.hospitalId" placeholder="请先选择测评中心">
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品昵称">
        <el-input class="w-150" v-model="seach.saleProductName" placeholder="请输入产品昵称"></el-input>
      </el-form-item>
      <el-form-item label="维修日期">
        <el-date-picker
          class="w-250"
          v-model="seach.repairDate"
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
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
        <el-button type="danger" icon="el-icon-download" @click="exportExcels()">导出excel</el-button>
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
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="repairType" label="维修方式"></el-table-column>
      <el-table-column align="center" prop="repairReason" label="原因"></el-table-column>
      <el-table-column align="center" prop="repairUserName" label="报修人员"></el-table-column>
      <el-table-column align="center" prop="doRepairUserName" label="维修人员"></el-table-column>
      <el-table-column align="center" prop="repairBeginTime" label="报修时间"></el-table-column>
    </el-table>
    <div class="total">
      <span>合计：</span>
      <span>报修产品数量:{{total.productNum}}</span>
      <span>脊柱:{{total.spine}}</span>
      <span>下肢:{{total.legs}}</span>
      <span>足部:{{total.foot}}</span>
      <span>维修次数:{{total.repairNum}}</span>
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
import { selectRepairStatistics, rivetEnd } from "../../api/javaApi";
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
        memberName: null,
        phone: null,
        repairDate: null,
        repairTypeList: [
          { name: "现场维修", id: 1 },
          { name: "返厂维修", id: 2 },
          { name: "无法维修", id: 3 }
        ],
        repairType: null,
        repairUserId: null,
        doRepairUserId: null,
        saleProductName: null,
        wxUserList: [],
        scUserNameList: [],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists: [],
        hospitalId: null
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
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        repairBeginTime:
          this.seach.repairDate == null ? null : this.seach.repairDate[0],
        repairEndTime:
          this.seach.repairDate == null ? null : this.seach.repairDate[1],
        repairType: this.seach.repairType || null,
        repairUserId: this.seach.repairUserId || null,
        doRepairUserId: this.seach.doRepairUserId || null,
        saleProductName: this.seach.saleProductName || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectRepairStatistics(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            this.clientData = dataList.data.dataList;
            this.pages.total = dataList.total;
            this.total.foot = dataList.data.foot;
            this.total.legs = dataList.data.legs;
            this.total.productNum = dataList.data.productNum;
            this.total.repairNum = dataList.data.repairNum;
            this.total.spine = dataList.data.spine;
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
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        repairBeginTime:
          this.seach.repairDate == null ? null : this.seach.repairDate[0],
        repairEndTime:
          this.seach.repairDate == null ? null : this.seach.repairDate[1],
        repairType: this.seach.repairType || null,
        repairUserId: this.seach.repairUserId || null,
        doRepairUserId: this.seach.doRepairUserId || null,
        saleProductName: this.seach.saleProductName || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      const lsyObj = {
        method: "post",
        fileName: "已维修统计信息",
        url: javaApi.ywxtj_ExportUrl,
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
      this.seach.scUserNameList = await personnel(6);
      this.seach.wxUserList = await personnel(12);
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
