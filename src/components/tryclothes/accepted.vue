<template>
  <div>
    <!-- seach -->
    <el-row class="search">
      <el-col :span="2" class="input-title">
        <span class="time_style">客户姓名:</span>
      </el-col>
      <el-col :span="2">
        <el-input v-model="seach.memberName" style="width：100%" size="small" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">联系电话:</span>
      </el-col>
      <el-col :span="2">
        <el-input size="small" style="width：100%" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">交货日期:</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width:100%"
          size="small"
          v-model="seach.delivery"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">产品昵称：</span>
      </el-col>
      <el-col :span="2">
        <el-input
          size="small"
          style="width：100%"
          v-model="seach.saleProductName"
          placeholder="请输入产品昵称"
        ></el-input>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">验收人：</span>
      </el-col>
      <el-col :span="2">
        <el-input
          size="small"
          style="width：100%"
          v-model="seach.acceptedUserName"
          placeholder="请输入验收人"
        ></el-input>
      </el-col>
      <el-col :span="3">
        <el-button
          size="small"
          @click="pageList(pages.currentPage,pages.pageSize)"
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
        <el-button
          type="danger"
          icon="el-icon-download"
          @click="exportExcels()"
          size="small"
          :loading="excelLoad"
        >导出excel</el-button>
      </el-col>
    </el-row>
    <el-row class="client_info">
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
        <el-select clearable size="small" v-model="seach.siteValue" placeholder="请先选择城市" @change="hospitalList(seach.siteValue)">
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">医院:</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.hospitalId" placeholder="请先选择测评中心">
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="input-title">
        <span>验收结果：</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.result" placeholder="请选择">
          <el-option
            v-for="item in seach.resultList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="input-title">
        <span>验收日期：</span>
      </el-col>
      <el-col :span="5" style="text-align:left;">
        <el-date-picker
          style="width:100%"
          size="small"
          v-model="seach.accepted"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="acceptanceCreateTime" label="验收日期"></el-table-column>
      <el-table-column align="center" prop="acceptanceUserName" label="验收人"></el-table-column>
      <el-table-column align="center" prop="deliveryTime" label="交货日期"></el-table-column>
      <el-table-column align="center" prop="acceptanceResult" label="验收结果"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="details(scope.row.acceptanceId)"
            type="primary"
            size="small"
            icon="el-icon-s-order"
          >验收详情</el-button>
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
    <!-- 详情弹框 -->
    <el-dialog
      :title="acceptanDialogTitle"
      :visible.sync="acceptanDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
    >
      <div v-if="causeType == '验收合格'">
        <div class="font_b_14">其他验收情况</div>
        <div class="margin-t-10">{{remark}}</div>
      </div>
      <div v-if="causeType == '返厂调整'">
        <div class="font_b_14">返厂原因</div>
        <div class="margin-t-10">{{reason}}</div>
      </div>
      <div v-if="causeType == '现场调整'" class="xc_box">
        <div>
          <div class="font_b_14">现场调整原因</div>
          <div class="margin-t-10">{{reason}}</div>
        </div>
        <div>
          <div class="font_b_14">现场调整人员</div>
          <div class="margin-t-10">{{siteUserName}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectTryOnAcceptedList,
  selectTryOnAcceptedDetail
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import { exportMethod, province, city, site,hospital,allSite } from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      //列表数据
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
        delivery: null,
        saleProductName: null,
        acceptedUserName: null,
        result: null,
        resultList: [
          { name: "验收合格", id: 1 },
          { name: "返厂调整", id: 2 },
          { name: "现场调整", id: 3 }
        ],
        accepted: null,
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists:[],
        hospitalId:null,
      },
      acceptanDialog: false,
      excelLoad: false,
      acceptanDialogTitle: "验收详情",
      remark: null,
      siteUserName: null,
      reason: null,
      causeType: 1,
      loading: true
    };
  },
  mounted() {
    this.pageList();
    this.provinceList();
  },
  methods: {
    cancel() {
      this.acceptanDialog = false;
    },
    details(id) {
      let data = { acceptanceId: id };
      selectTryOnAcceptedDetail(data)
        .then(res => {
          console.log(res);
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let details = res.data.data;
            this.acceptanDialogTitle = "验收详情" + "(" + details.result + ")";
            this.causeType = details.result;
            this.remark = details.remark;
            this.reason = details.reason;
            this.siteUserName = details.siteUserName;
            this.acceptanDialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出excel
    exportExcels() {
      this.excelLoad = true;
      let data = {
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        deliveryBeginTime:
          this.seach.delivery == null ? null : this.seach.delivery[0],
        deliveryEndTime:
          this.seach.delivery == null ? null : this.seach.delivery[1],
        saleProductName: this.seach.saleProductName || null,
        acceptedUserName: this.seach.acceptedUserName || null,
        result: this.seach.result || null,
        acceptedBeginTime:
          this.seach.accepted == null ? null : this.seach.accepted[0],
        acceptedEndTime:
          this.seach.accepted == null ? null : this.seach.accepted[1],
          provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      const lsyObj = {
        method: "post",
        fileName: "已验收信息",
        url: javaApi.yys_ExportUrl,
        data: data
      };
      exportMethod(this, lsyObj);
    },
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        deliveryBeginTime:
          this.seach.delivery == null ? null : this.seach.delivery[0],
        deliveryEndTime:
          this.seach.delivery == null ? null : this.seach.delivery[1],
        saleProductName: this.seach.saleProductName || null,
        acceptedUserName: this.seach.acceptedUserName || null,
        result: this.seach.result || null,
        acceptedBeginTime:
          this.seach.accepted == null ? null : this.seach.accepted[0],
        acceptedEndTime:
          this.seach.accepted == null ? null : this.seach.accepted[1],
          provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectTryOnAcceptedList(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.loading = false;
            let dataList = res.data.data;
            this.clientData = dataList.data;
            this.pages.total = dataList.total;
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
  }
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
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
.input-title {
  width: 5.5%;
  line-height: 30px;
}
.box {
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
.box > div {
  width: 50%;
}
.client_info {
  text-align: center;
  padding: 10px 0;
  span {
    font-size: 14px;
    letter-spacing: 1px;
    color: #606266;
  }
}
.xc_box > div {
  display: inline-block;
  width: 49%;
}
.font_b_14 {
  font-size: 14px;
  font-weight: bold;
}
</style>
