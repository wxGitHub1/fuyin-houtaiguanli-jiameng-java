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
        <el-select class="w-150" clearable v-model="seach.siteId" placeholder="请先选择城市">
          <el-option
            v-for="item in seach.siteIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评中心类型">
        <el-select class="w-150" clearable v-model="seach.siteType" placeholder="请选择">
          <el-option
            v-for="item in seach.siteTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input class="w-150" v-model="seach.userName" placeholder="请输入产品昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="pageList(pages.currentPage,pages.pageSize)"
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
        <el-button
          v-if="hasRole==1"
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addSite_function()"
        >新增测评中心</el-button>
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
      <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
      <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
      <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
      <el-table-column align="center" prop="siteType" label="测评中心类型"></el-table-column>
      <el-table-column align="center" prop="sitePhone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="siteAddress" label="测评中心地址"></el-table-column>
      <el-table-column align="center" prop="siteLeaders" label="负责人"></el-table-column>
      <el-table-column align="center" prop="siteUsers" show-overflow-tooltip label="员工"></el-table-column>
      <el-table-column align="center" prop="siteCreateTime" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="orderUserName" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="modify_function(scope.row)" type="primary" size="small">修改</el-button>
          <el-button
            @click="deletesite_function(scope.row.siteId)"
            type="danger"
            v-if="hasRole == 1"
            size="small"
          >删除</el-button>
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
      width="80%"
      :close-on-click-modal="false"
      :before-close="comeBack"
    >
      <el-form :model="addSite" ref="dialogForm" :inline="true" size="mini" :rules="rules">
        <el-form-item label="省份" prop="provinceValue">
          <el-select
            clearable
            v-model="addSite.provinceValue"
            placeholder="请选择"
            @change="addCityList(addSite.provinceValue)"
            :disabled="hasRole != 1"
          >
            <el-option
              v-for="item in add.provinceIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="citysValue">
          <el-select
            :disabled="hasRole != 1"
            clearable
            v-model="addSite.citysValue"
            placeholder="请先选择省份"
          >
            <el-option
              v-for="item in add.cityIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测评中心类型" prop="siteType">
          <el-select
            clearable
            :disabled="hasRole != 1"
            v-model="addSite.siteType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in seach.siteTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测评中心负责人" v-if="isShowAddTitle == '修改测评中心信息'">
          <el-select clearable multiple collapse-tags v-model="addSite.leaderIds" placeholder="请选择">
            <el-option
              v-for="item in leaderIdsList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测评中心" prop="siteName">
          <el-input
            v-model="addSite.siteName"
            autocomplete="off"
            placeholder="请输入测评中心"
            style="width:193px"
          ></el-input>
        </el-form-item>
        <el-form-item label="测评中心地址" prop="siteAddress">
          <el-input
            v-model="addSite.siteAddress"
            autocomplete="off"
            placeholder="请输入测评中心地址"
            style="width:193px"
          ></el-input>
        </el-form-item>
        <el-form-item label="测评中心电话" prop="sitePhone">
          <el-input
            v-model="addSite.sitePhone"
            autocomplete="off"
            placeholder="请输入测评中心电话"
            style="width:193px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="comeBack()" type="success">取消</el-button>
        <el-button v-if="isShowAdd" @click="addSite_fuc('dialogForm')" type="primary">确认</el-button>
        <el-button v-else @click="addSite_fuc('dialogForm','modify')" type="primary">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectSiteList,
  insertSite,
  deleteSite,
  updateSite
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  personnel,
  province,
  city,
  site,
  allSite,
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
        cityIdList: []
      },
      addSiteDialog: false,
      addSite: {
        provinceValue: null,
        citysValue: null,
        siteType: null,
        siteName: null,
        siteAddress: null,
        sitePhone: null,
        leaderIds: []
      },
      isShowAdd: true,
      isShowAddTitle: "新增测评中心信息",
      rowSiteId: null,
      //表单验证
      rules: {
        siteName: [
          { required: true, message: "请输入测评中心", trigger: "blur" }
        ],
        siteAddress: [
          { required: true, message: "请输入测评中心地址", trigger: "blur" }
        ],
        sitePhone: [
          { required: true, message: "请输入测评中心电话", trigger: "blur" }
        ],
        provinceValue: [
          {
            required: true,
            message: "请选择省份",
            trigger: "change",
            type: "number"
          }
        ],
        citysValue: [
          {
            required: true,
            message: "请选择城市",
            trigger: "change",
            type: "number"
          }
        ],
        siteType: [
          {
            required: true,
            message: "请选择测评中心类型",
            trigger: "change",
            type: "number"
          }
        ]
      },
      hasRole: 2,
      leaderIdsList: []
    };
  },
  mounted() {
    this.pageList();
    //获取省列表
    this.provinceList();
    //获取新增加盟省列表
    this.addProvinceList();
  },
  methods: {
    modify_function(obj) {
      this.isShowAdd = false;
      this.isShowAddTitle = "修改测评中心信息";
      this.rowSiteId = obj.siteId;
      this.addSite.leaderIds = obj.siteLeaderIds;
      this.addSite.provinceValue = obj.provinceId;
      this.addCityList(obj.provinceId);
      this.addSite.citysValue = obj.cityId;
      this.addSite.siteType = obj.siteTypeInt;
      this.addSite.siteName = obj.siteName;
      this.addSite.siteAddress = obj.siteAddress;
      this.addSite.sitePhone = obj.sitePhone;
      this.addSiteDialog = true;
      this.leaderIdsList_fuc(obj.siteId);
    },
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
          deleteSite(data)
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
    addSite_fuc(formName, name) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            provinceId: this.addSite.provinceValue, //省ID
            cityId: this.addSite.citysValue, //市ID
            siteName: this.addSite.siteName, //测评中心名
            siteType: this.addSite.siteType, //0-总部，1-独立，2-连锁
            sitePhone: this.addSite.sitePhone, //测评中心联系方式
            siteAddress: this.addSite.siteAddress //测评中心地址 address
          };
          if (name == "modify") {
            (data.siteId = this.rowSiteId),
              (data.leaderIds = this.addSite.leaderIds),
              updateSite(data)
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
            insertSite(data)
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
        } else {
          this.$message({
            type: "warning",
            message: "请填写表格！",
            center: true
          });
          return false;
        }
      });
    },
    addSite_function() {
      this.isShowAdd = true;
      this.isShowAddTitle = "新增测评中心信息";
      this.addSiteDialog = true;
    },
    comeBack() {
      this.$refs["dialogForm"].resetFields();
      this.addSite.provinceValue = null;
      this.addSite.citysValue = null;
      this.addSite.siteType = null;
      this.addSite.siteName = null;
      this.addSite.siteAddress = null;
      this.addSite.sitePhone = null;
      this.addSiteDialog = false;
    },
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteId,
        siteType: this.seach.siteType,
        userName: this.seach.userName
      };
      this.loading = true;
      selectSiteList(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            // this.clientData = dataList.data;
            this.clientData = dataList.data.siteListDTOs;
            this.pages.total = dataList.total;
            this.hasRole = dataList.data.hasRole;
            this.loading = false;
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

    //新增加盟获取省
    async addProvinceList() {
      this.add.provinceIdList = await joinAllProvince();
    },
    //新增加盟获取市
    async addCityList(id) {
      this.add.cityIdList = await joinAllCity(id);
    },
    //获取省
    async provinceList() {
      this.seach.provinceIdList = await province();
    },
    //获取市
    async cityList(id) {
      this.seach.cityIdList = await city(id);
    },
    //测评中心
    async siteList(id) {
      this.seach.siteIdList = await allSite(null, id);
    },
    //测评中心
    async leaderIdsList_fuc(id) {
      this.leaderIdsList = await personnel(null, id);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
