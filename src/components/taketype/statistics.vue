<template>
  <div>
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      
      <el-form-item label="产品名称">
        <el-input class="w-150" v-model="search.product" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="辅助人员">
        <el-input class="w-150" v-model="search.helpUser" placeholder="请输入人员"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-select
          clearable
          class="w-150"
          v-model="search.provinceId"
          placeholder="请选择"
          @change="cityList(search.provinceId)"
        >
          <el-option
            v-for="item in search.provinceIdList"
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
          v-model="search.cityId"
          placeholder="请先选择省份"
          @change="siteList(search.cityId)"
        >
          <el-option
            v-for="item in search.cityIdList"
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
          v-model="search.siteValue"
          placeholder="请先选择城市"
          @change="userList(search.siteValue)"
        >
          <el-option
            v-for="item in search.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主取型人">
        <el-select class="w-150" clearable v-model="search.userValue">
          <el-option
            v-for="(item,index) in search.userList"
            :key="index"
            :value="item.id"
            :label="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接待日期">
        <el-date-picker
          class="w-250"
          v-model="search.OrderTime"
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
      max-height="980"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="pUser" label="主取形人"></el-table-column>
      <el-table-column align="center" prop="helpUser" label="辅助人员"></el-table-column>
      <el-table-column align="center" prop="psCreateTime" label="取型时间"></el-table-column>
      <el-table-column align="center" prop="nickname" label="产品名称"></el-table-column>
      <el-table-column align="center" prop="backNumString" label="取型验收驳回"></el-table-column>
      <el-table-column align="center" prop="replyNumString" label="取型问题反馈"></el-table-column>
      <el-table-column align="center" prop="detailType" label="部位"></el-table-column>
    </el-table>
    <div class="total">
      <span>合计：</span>
      <span>支具数量：{{total.product}}</span>
      <span>取型验收驳回数：{{total.back}}</span>
      <span>取型问题反馈数：{{total.reply}}</span>
      <span>取型验收合格数：{{total.eligible}}</span>
      <span>脊柱：{{total.spine}}</span>
      <span>足部：{{total.foot}}</span>
      <span>下肢：{{total.leg}}</span>
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
import { shapeStatistics, userListByDept } from "../../api/javaApi";
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
      loading: true,
      clientData: [],
      total: {
        product: 0,
        back: 0,
        reply: 0,
        eligible: 0,
        spine: 0,
        foot: 0,
        leg: 0
      },
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      search: {
        OrderTime: null,
        product: null,
        userList: [],
        userValue: [],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      }
    };
  },
  mounted() {
    this.pageList();
    // this.userList();
    this.provinceList();
  },
  methods: {
    userList(siteId) {
      let data = {
        deptId: 8,
        site: siteId
      };
      userListByDept(data)
        .then(res => {
          // console.log(res);
          this.search.userList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出excel
    exportExcels() {
      let data = {
        beginTime:
          this.search.OrderTime == null ? null : this.search.OrderTime[0],
        endTime:
          this.search.OrderTime == null ? null : this.search.OrderTime[1],
        user: this.search.userValue || null,
        helpUser: this.search.helpUser || null,
        nickname: this.search.product || null,
        provinceId: this.search.provinceId,
        cityId: this.search.cityId,
        siteId: this.search.siteValue
      };
      const lsyObj = {
        method: "post",
        fileName: "统计报表信息",
        url: javaApi.exportShapeStatisticsExcel,
        data: data
      };
      exportMethod(this, lsyObj);
    },
    //订单列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        beginTime:
          this.search.OrderTime == null ? null : this.search.OrderTime[0],
        endTime:
          this.search.OrderTime == null ? null : this.search.OrderTime[1],
        user: this.search.userValue || null,
        helpUser: this.search.helpUser || null,
        nickname: this.search.product || null,
        provinceId: this.search.provinceId,
        cityId: this.search.cityId,
        siteId: this.search.siteValue
      };
      this.loading = true;
      shapeStatistics(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data;
            this.loading = false;
            this.clientData = dataList.data.detailDtos;
            this.pages.total = dataList.total;
            this.total = dataList.data;
          }
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
      this.search.provinceIdList = await province();
    },
    //获取市
    async cityList(id) {
      this.search.cityIdList = await city(id);
    },
    //根据市获取测评中心列表
    async siteList(id) {
      this.search.siteLists = await allSite(null, id);
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
