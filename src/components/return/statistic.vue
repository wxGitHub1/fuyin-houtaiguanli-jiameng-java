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
        <span class="time_style">是否会员:</span>
      </el-col>
      <el-col :span="2">
        <el-select style="width:100%" size="small" clearable v-model="seach.vip" placeholder="请选择">
          <el-option
            v-for="item in seach.vipList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">回访人员:</span>
      </el-col>
      <el-col :span="2">
        <el-input clearable size="small" v-model="seach.visitUserName" placeholder="请输入回访人"></el-input>
        <!-- <el-select
          style="width:100%"
          size="small"
          clearable
          v-model="seach.visitUserId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.visitUserList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select> -->
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">客户满意度:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          style="width:100%"
          size="small"
          clearable
          v-model="seach.satisfaction"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.satisfactionList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">产品类别:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          style="width:100%"
          size="small"
          clearable
          v-model="seach.productTypeInt"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.productTypeIntList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">回访时间:</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="seach.visitTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="office_performance">
      <el-col :span="2" class="input-title">
        <span class="time_style">产品昵称:</span>
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
        <span class="time_style">接通状态:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          style="width:100%"
          size="small"
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
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">有无问题:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          style="width:100%"
          size="small"
          clearable
          v-model="seach.problemHave"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.problemHaveList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="line-h-30">
        <span class="time_style">产品使用时间:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          style="width:100%"
          size="small"
          clearable
          v-model="seach.productUseTime"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.productUseTimeList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-button
          size="small"
          @click="pageList(pages.currentPage,pages.pageSize)"
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
        <el-button type="danger" @click="exportExcels()" size="small">导出excel</el-button>
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
        <span class="time_style">站点名称:</span>
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
        <el-select clearable size="small" v-model="seach.hospitalId" placeholder="请先选择站点">
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table
      border
      :data="clientData"
      max-height="550"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="vip" label="是否会员"></el-table-column>
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="backVisitUserName" label="回访人员"></el-table-column>
      <el-table-column align="center" prop="visitTime" label="回访时间"></el-table-column>
      <el-table-column align="center" prop="useTime" label="产品使用时间"></el-table-column>
      <el-table-column align="center" prop="outflow" label="是否流失"></el-table-column>
      <el-table-column align="center" prop="phoneStatus" label="接通状态"></el-table-column>
      <el-table-column align="center" prop="satisfaction" label="客户满意度"></el-table-column>
      <el-table-column align="center" prop="problemHave" label="有无问题"></el-table-column>
      <el-table-column align="center" prop="problemDo" label="问题详情"></el-table-column>
    </el-table>
    <div class="total">
      <span>合计：</span>
      <span>客户数量:{{total.visitMemberCount}}</span>
      <span>客户满意度占比:{{total.satisfied}}</span>
      <span>产品数量:{{total.saleProductCount}}</span>
      <span>流失客户数:{{total.outflowMemberCount}}</span>
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
import { selectExperienceStatistics } from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import { exportMethod, personnel, province, city, site,hospital } from "../../utils/public";
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
        satisfaction: null,
        satisfactionList: [
          { name: "满意" },
          { name: "一般" },
          { name: "不满意" }
        ],
        productTypeInt: null,
        productTypeIntList: [
          { name: "足弓垫" ,id:1},
          { name: "长腿类" ,id:2},
          { name: "膝外翻" ,id:3},
          { name: "膝内翻" ,id:8},
          { name: "扭转类" ,id:7},
          { name: "脊柱类" ,id:5},
          { name: "踝足类" ,id:4},
          { name: "丹尼斯" ,id:6}
        ],
        productUseTime: null,
        productUseTimeList: [
          { name: "未使用" },
          { name: "5小时以下" },
          { name: "5-12小时" },
          { name: "5-18小时" },
          { name: "18小时以上" }
        ],
        problemHave: null,
        problemHaveList: [{ name: "有" }, { name: "无" }],
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
        saleProductName: this.seach.saleProductName || null,
        phoneStatus: this.seach.phoneStatus || null,
        memberName: this.seach.memberName || null,
        satisfaction: this.seach.satisfaction || null,
        productTypeInt: this.seach.productTypeInt || null,
        productUseTime: this.seach.productUseTime || null,
        problemHave: this.seach.problemHave || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectExperienceStatistics(data)
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
            this.total=dataList.data
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
        saleProductName: this.seach.saleProductName || null,
        phoneStatus: this.seach.phoneStatus || null,
        memberName: this.seach.memberName || null,
        satisfaction: this.seach.satisfaction || null,
        productTypeInt: this.seach.productTypeInt || null,
        productUseTime: this.seach.productUseTime || null,
        problemHave: this.seach.problemHave || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      const lsyObj = {
        method: "post",
        fileName: "产品体验统计信息",
        url: javaApi.exportExperienceStatisticsExcel,
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
    //根据市获取站点列表
    async siteList(id) {
      this.seach.siteLists = await site(id);
    },
    //根据站点获取医院列表
    async hospitalList(id) {
      this.seach.hospitalLists = await hospital(id);
    },
    //人员
    async userList() {
      this.seach.visitUserList = await personnel(6);
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
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 10px;
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
.client_info {
  text-align: center;
  padding: 10px 0;
  span {
    font-size: 14px;
    color: #606266;
    letter-spacing: 1px;
  }
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
.line-h-30 {
  line-height: 30px;
}
</style>
