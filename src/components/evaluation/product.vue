//测评加盟统计
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input class="w-150" v-model="seach.memberName" placeholder="请输入姓名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入电话" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否会员">
        <el-select class="w-150" clearable v-model="seach.isVip" placeholder="请选择">
          <el-option
            v-for="item in seach.isVipList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="测评服务人员">
        <el-select class="w-150" clearable v-model="seach.recordValue" placeholder="请选择">
          <el-option
            v-for="item in seach.nameList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
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
          @change="evaluation_fuc(seach.siteValue)"
          v-model="seach.siteValue"
          placeholder="请先选择城市"
        >
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评项">
        <el-select class="w-150" clearable v-model="seach.examinationId" placeholder="请选择">
          <el-option
            v-for="item in seach.examinationIdList"
            :key="item.baseId"
            :label="item.baseName"
            :value="item.baseId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评时间">
        <el-date-picker
          class="w-250"
          v-model="seach.orderDate"
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
    <!-- table -->
    <el-table
      border
      :data="clientData"
      max-height="630"
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
      <el-table-column align="center" prop="user" label="测评人员"></el-table-column>
      <el-table-column align="center" prop="examinationTime" label="测评时间"></el-table-column>
      <el-table-column align="center" prop="baseName" label="测评项"></el-table-column>
      <el-table-column align="center" prop="isVip" label="是否会员"></el-table-column>
      <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
      <el-table-column align="center" prop="prescriptionType" label="病单类型"></el-table-column>
    </el-table>
    <div class="total">
      <span>体格测量：{{total.tgcl|| "暂无数据"}}</span>
      <span>矢状面测评：{{total.xgjszm || "暂无数据"}}</span>
      <span>脊柱活动趋势测评：{{total.jzhdqs || "暂无数据"}}</span>
      <span>下肢测评：{{total.xzfy || "暂无数据"}}</span>
      <span>足行进角测评：{{total.zxjj || "暂无数据"}}</span>
      <span>3D足部扫描：{{total.zbsm || "暂无数据"}}</span>
      <span>足弓发育测评：{{total.zgfy || "暂无数据"}}</span>
      <span>冠状面测评：{{total.xgjgzm || "暂无数据"}}</span>
      <span>脊柱发育测评：{{total.jzfy || "暂无数据"}}</span>
      <span>肩胛骨测评：{{total.jjg || "暂无数据"}}</span>
      <span>3D全身扫描：{{total.qssm || "暂无数据"}}</span>
      <span>骨盆测评：{{total.gp || "暂无数据"}}</span>
      <span>跟骨发育测评：{{total.ggfy || "暂无数据"}}</span>
      <span>颈部活动度测评：{{total.jbhdd || "暂无数据"}}</span>
      <span>胸部测评：{{total.xb || "暂无数据"}}</span>
      <span>骨密度测评：{{total.gmd || "暂无数据"}}</span>
      <span>足底压力测评：{{total.zdyl || "暂无数据"}}</span>
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
import { examineJoinStatistics, userListByDept } from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  province,
  city,
  site,
  allSite,
  evaluation
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
        phone: null,
        orderDate: null,
        recordValue: null,
        nameList: [],
        memberName: null,
        isVip: null,
        isVipList: [
          { name: "是", id: 1 },
          { name: "否", id: 2 }
        ],
        examinationId: null,
        examinationIdList: [
          //   { name: "体格测量", id: 1 },
          //   { name: "足弓发育测评", id: 2 },
          //   { name: "跟骨发育测评", id: 3 },
          //   { name: "足底压力分析", id: 4 },
          //   { name: "膝关节矢状面测评", id: 5 },
          //   { name: "膝关节冠状面测评", id: 6 },
          //   { name: "下肢发育测评", id: 7 },
          //   { name: "足部3D扫描测评", id: 8 },
          //   { name: "足行进角", id: 9 },
          //   { name: "肩胛骨测评", id: 10 },
          //   { name: "颈部活动度测评", id: 11 },
          //   { name: "骨盆测评", id: 12 },
          //   { name: "脊柱发育测评", id: 13 },
          //   { name: "3D全身扫描", id: 14 },
          //   { name: "胸部测评", id: 15 },
          //   { name: "脊柱活动趋势测评", id: 16 },
          //   { name: "骨密度测评", id: 17 }
        ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      },
      total: {},
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
        memberName: this.seach.memberName,
        phone: this.seach.phone,
        isVip: this.seach.isVip,
        userId: this.seach.recordValue,
        examinationId: this.seach.examinationId,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      const lsyObj = {
        method: "post",
        fileName: "测评加盟统计信息",
        url: javaApi.exportExamineJoinStatistics,
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
        memberName: this.seach.memberName,
        phone: this.seach.phone,
        isVip: this.seach.isVip,
        userId: this.seach.recordValue,
        examinationId: this.seach.examinationId,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      this.loading = true;
      examineJoinStatistics(data)
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
            this.clientData = dataList.data.dataList;
            this.total = dataList.data;
            this.pages.total = dataList.total;
          }
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
      this.seach.siteLists = await allSite(null, id);
    },
    //根据测评中心获取测评项
    async evaluation_fuc(id) {
      this.seach.examinationIdList = await evaluation(id);
    }
  }
};
</script>

<style scoped lang="scss">
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
