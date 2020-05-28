//测评配置
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="省份">
        <el-select
          clearable
          class="w-150"
          v-model="seach.provinceId"
          placeholder="请选择"
          @change="addCityList(seach.provinceId)"
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
        <el-select class="w-150" clearable v-model="seach.siteId" placeholder="请先选择城市">
          <el-option
            v-for="item in seach.siteIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评项目">
        <el-select class="w-150" clearable v-model="seach.evaluationId" placeholder="请选择">
          <el-option
            v-for="item in seach.evaluationList"
            :key="item.baseId"
            :label="item.baseName"
            :value="item.baseId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评中心类型">
        <el-select class="w-150" clearable v-model="seach.siteType" placeholder="请先选择测评中心">
          <el-option
            v-for="item in seach.siteTypeList"
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
        <!-- <el-button
          type="danger"
          icon="el-icon-download"
          
          @click="exportExcels()"
        >导出excel</el-button>-->
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addSite_function()"
        >新增配置</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table
      border
      :data="clientData"
      max-height="670"
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
      <el-table-column align="center" prop="siteType" label="测评中心类型"></el-table-column>
      <el-table-column align="center" prop="sitePhone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="examinationCount" label="测评项目数"></el-table-column>
      <el-table-column align="center" prop="examinations" label="测评项目" min-width="250"></el-table-column>
      <el-table-column align="center" prop="examinationSiteTime" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="modify_function(scope.row)" type="primary" size="small">修改</el-button>
          <el-button @click="deletesite_function(scope.row.siteId)" type="danger" size="small">删除</el-button>
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
    <!-- dialog 新增测评中心-->
    <el-dialog
      :title="isShowAddTitle"
      :visible.sync="addSiteDialog"
      center
      :close-on-click-modal="false"
      :before-close="comeBack"
    >
      <el-form
        v-if="isShowForm"
        :model="addSite"
        ref="dialogForm"
        :inline="true"
        size="mini"
        label-width="80px"
      >
        <el-form-item label="省份">
          <el-select
            clearable
            v-model="addSite.provinceValue"
            placeholder="请选择"
            @change="addCityList(addSite.provinceValue)"
          >
            <el-option
              v-for="item in add.provinceIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select
            clearable
            v-model="addSite.citysValue"
            placeholder="请先选择省份"
            @change="siteList(addSite.citysValue,'新增')"
          >
            <el-option
              v-for="item in add.cityIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测评中心" prop="siteName">
          <el-select clearable v-model="addSite.siteId" placeholder="请先选择省份">
            <el-option
              v-for="item in add.siteIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="width:496px;margin:0 auto;">
        <el-transfer
          v-model="myValue"
          filterable
          filter-placeholder="请输入人员"
          :titles="['请选择测评项', '已选择项目']"
          :data="nameList"
        ></el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="comeBack()" type="success">取消</el-button>
        <el-button v-if="isShowAdd" @click="addSite_fuc()" type="primary">确认</el-button>
        <el-button v-else @click="addSite_fuc('modify')" type="primary">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectExaminationSiteList,
  insertExaminationSite,
  deleteExaminationSite,
  updateExaminationSite
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  // personnel,
  province,
  city,
  site,
  allSite,
  evaluation,
  evaluationList,
  joinAllProvince,
  joinAllCity
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      loading: false,
      clientData: [],
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        provinceId: null,
        provinceIdList: [],
        cityId: null,
        cityIdList: [],
        siteId: null,
        siteIdList: [],
        evaluationList: [],
        evaluationId: null,
        siteType: null,
        siteTypeList: [
          { name: "连锁加盟", id: 3 },
          { name: "独立加盟", id: 2 },
          { name: "总部", id: 1 }
        ],
        userName: null
      },
      add: {
        provinceIdList: [],
        cityIdList: [],
        siteIdList: []
      },
      addSiteDialog: false,
      addSite: {
        provinceValue: null,
        citysValue: null,
        siteId: null
      },
      isShowAdd: true,
      isShowAddTitle: "新增测评中心信息",
      rowSiteId: null,
      //新增data
      isShowForm: true,
      myValue: [],
      nameList: []
    };
  },
  mounted() {
    this.pageList();
    //获取省列表
    // this.provinceList();
    //获取新增加盟省列表
    this.addProvinceList();
    this.allEvaluationList();
  },
  methods: {
    modify_function(obj) {
      this.isShowAdd = false;
      this.isShowAddTitle = "修改测评配置";
      this.rowSiteId = obj.siteId;
      this.isShowForm = false;
      this.addSiteDialog = true;
      this.myValue = obj.examinationIds;
    },
    //删除测评中心配置测评 √
    deletesite_function(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            siteId: id
          };
          deleteExaminationSite(data)
            .then(res => {
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.pageList(this.pages.currentPage, this.pages.pageSize);
                this.$message({
                  type: "success",
                  message: "删除成功！",
                  center: true
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    addSite_fuc(name) {
      if (name == "modify") {
        let data = {
          siteId: this.rowSiteId,
          baseIds: this.myValue
        };
        updateExaminationSite(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.comeBack();
              this.pageList(this.pages.currentPage, this.pages.pageSize);
              this.$message({
                type: "success",
                message: "修改成功！",
                center: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let data = {
          siteId: this.addSite.siteId,
          baseIds: this.myValue
        };
        console.log(data);
        insertExaminationSite(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.comeBack();
              this.pageList(this.pages.currentPage, this.pages.pageSize);
              this.$message({
                type: "success",
                message: "添加成功！",
                center: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    addSite_function() {
      this.isShowAdd = true;
      this.isShowAddTitle = "新增测评配置";
      this.addSiteDialog = true;
      this.isShowForm = true;
    },
    comeBack() {
      this.isShowForm = true;
      (this.addSite.provinceValue = null),
        (this.addSite.citysValue = null),
        (this.addSite.siteId = null);
      this.myValue = [];
      this.addSiteDialog = false;
    },
    //统计列表 //查询 √
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        provinceId: this.seach.provinceId || null,
        cityId: this.seach.cityId || null,
        siteId: this.seach.siteId || null,
        siteType: this.seach.siteType || null,
        baseId: this.seach.evaluationId || null
      };
      this.loading = true;
      selectExaminationSiteList(data)
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
    //导出excel √
    // exportExcels() {
    //   let data = {
    //     provinceId: this.seach.provinceId || null,
    //     cityId: this.seach.cityId || null,
    //     siteId: this.seach.siteId || null,
    //     siteType: this.seach.siteType || null,
    //     baseId: this.seach.evaluationId || null
    //   };
    //   const lsyObj = {
    //     method: "post",
    //     fileName: "产品配置清单信息",
    //     url: javaApi.exportHospitalAndSaleBase,
    //     data: data
    //   };
    //   exportMethod(this, lsyObj);
    // },
    //当前页面变化时 √
    handleCurrentChange(num) {
      this.pages.currentPage = num;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.pageList(pageIndex, pageSize);
    },
    //页面条数发生变化时 √
    handleSizeChange(val) {
      this.pages.pageSize = val;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.pageList(pageIndex, pageSize);
    },

    //新增加盟获取省
    async addProvinceList() {
      this.add.provinceIdList = await province();
      this.seach.provinceIdList = this.add.provinceIdList;
    },
    //新增加盟获取市
    async addCityList(id) {
      this.add.cityIdList = await city(id);
      this.seach.cityIdList = this.add.cityIdList;
    },
    //获取省
    // async provinceList() {
    //   this.seach.provinceIdList = await province();
    // },
    // //获取市
    // async cityList(id) {
    //   this.seach.cityIdList = await city(id);
    // },
    //测评中心
    async siteList(id, xz) {
      let data = await allSite(null, id);
      if (xz == "新增") {
        this.add.siteIdList = data;
      } else {
        this.seach.siteIdList = data;
      }
    },
    //测评中心id查询配置的测评
    // async evaluations(id) {
    //   this.myValue = await evaluation(id);
    // },
    //查询全部配置的测评
    async allEvaluationList() {
      this.seach.evaluationList = await evaluationList();
      let list = [];
      this.seach.evaluationList.forEach(element => {
        list.push({ label: element.baseName, key: element.baseId });
      });
      this.nameList = list;
    }
  }
};
</script>

<style scoped lang="scss">

</style>
