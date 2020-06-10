// 产品配置清单
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
          placeholder="请选择"
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
          class="w-150"
          clearable
          v-model="seach.siteId"
          placeholder="请选择"
          @change="hospitals(seach.siteId)"
        >
          <el-option
            v-for="item in seach.siteIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院"> 
        <el-select
          class="w-150"
          clearable
          v-model="seach.hospitalId"
          placeholder="请先选择"
        >
          <el-option
            v-for="item in seach.hospitalList"
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
        <el-button
          type="danger"
          icon="el-icon-download"
          @click="exportExcels()"
        >导出excel</el-button>
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
      
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="batchNum" label="产品清单编号" width="130"></el-table-column>
      <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
      <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
      <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
      <el-table-column align="center" prop="hospitalName" label="医院名称"></el-table-column>
      <el-table-column align="center" prop="saleBaseNumber" label="产品数量"></el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="copy(scope.$index)" type="primary" class="tag-read" size="small">复制单号</el-button>
          <el-button @click="next_fuc(scope.row,'修改')" type="primary" size="small">修改</el-button>
          <el-button @click="deletesite_function(scope.row.batchNum)" type="danger" size="small">删除</el-button>
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
      <el-form :model="addSite" ref="dialogForm" :inline="true" size="mini" label-width="80px">
        <el-form-item label="省份">
          <el-select
            clearable
            v-model="addSite.provinceValue"
            placeholder="请选择"
            @change="addCityList(addSite.provinceValue)"
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
            v-model="addSite.citysValue"
            placeholder="请先选择省份"
            @change="siteList(addSite.citysValue,'新增')"
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
            v-model="addSite.siteId"
            @change="hospitals(addSite.siteId)"
            placeholder="请先选择省份"
          >
            <el-option
              v-for="item in seach.siteIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称">
          <el-select clearable v-model="addSite.hospitalId" placeholder="请先选择测评中心">
            <el-option
              v-for="item in seach.hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复用单号">
          <el-select clearable v-model="addSite.batch" placeholder="请选择">
            <el-option v-for="item in batchList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="comeBack()" type="success">取消</el-button>
        <el-button @click="next_fuc()" type="primary">下一步</el-button>
      </div>
    </el-dialog>
    <!-- dialog  产品列表-->
    <el-dialog
      title="产品列表"
      :visible.sync="batchpage"
      :close-on-click-modal="false"
      width="90%"
      :before-close="product_comeBack"
    >
      <h4>批次编号：{{only_batchNum}}</h4>
      <el-row class="search">
        <el-col :span="2" id="input-title">
          <span>产品名称</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="seachProduct.name"
            size="mini"
            placeholder="请输入产品名称"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品昵称</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="seachProduct.nickname"
            size="mini"
            placeholder="请输入产品昵称"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>备案编号</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="seachProduct.recordNumber"
            size="mini"
            placeholder="请输入备案编号"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品类型</span>
        </el-col>
        <el-col :span="2">
          <el-select
            clearable
            size="mini"
            v-model="seachProduct.productTypeValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in seachProduct.productTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品资质</span>
        </el-col>
        <el-col :span="2">
          <el-select clearable size="mini" v-model="seachProduct.qualification" placeholder="请选择">
            <el-option
              v-for="item in seachProduct.qualificationList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产地</span>
        </el-col>
        <el-col :span="2">
          <el-select clearable size="mini" v-model="seachProduct.origin" placeholder="请选择">
            <el-option
              v-for="item in seachProduct.originList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <el-button
            size="mini"
            @click="next_product_fuc(pagesProduct.currentPage,pagesProduct.pageSize)"
            icon="el-icon-search"
            type="warning"
            class="btns"
          >查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="productData" max-height="400">
        <el-table-column prop="recordNumber" label="备案编号"></el-table-column>
        <el-table-column prop="source" label="产品分类"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <el-table-column prop="model" label="产品型号"></el-table-column>
        <el-table-column prop="qualification" label="产品资质"></el-table-column>
        <el-table-column label="产品标价">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.price" placeholder="请输入" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="origin" label="产地"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deletebase_function(scope.row.id)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Pagination 分页 -->
      <el-pagination
        @size-change="handleSizeChangeProduct"
        @current-change="handleCurrentChangeProduct"
        :current-page="pagesProduct.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesProduct.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagesProduct.total"
        class="pagination"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="product_comeBack()" type="success">取消</el-button>
        <el-button @click="add_product_list()" type="primary">添加产品</el-button>
        <el-button @click="sbmint_fuc()" type="primary">提交</el-button>
      </div>
    </el-dialog>
    <!-- dialog  销售产品列表-->
    <el-dialog
      title="产品列表"
      :visible.sync="productlonding_two"
      :close-on-click-modal="false"
      width="90%"
      :before-close="product_comeBack_two"
    >
      <el-row class="search">
        <el-col :span="2" id="input-title">
          <span>产品名称</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="seachProduct_two.name"
            size="mini"
            placeholder="请输入产品名称"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品昵称</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="seachProduct_two.nickname"
            size="mini"
            placeholder="请输入产品昵称"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>备案编号</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="seachProduct_two.recordNumber"
            size="mini"
            placeholder="请输入备案编号"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品类型</span>
        </el-col>
        <el-col :span="2">
          <el-select
            clearable
            size="mini"
            v-model="seachProduct_two.productTypeValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in seachProduct_two.productTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品资质</span>
        </el-col>
        <el-col :span="2">
          <el-select
            clearable
            size="mini"
            v-model="seachProduct_two.qualification"
            placeholder="请选择"
          >
            <el-option
              v-for="item in seachProduct_two.qualificationList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产地</span>
        </el-col>
        <el-col :span="2">
          <el-select clearable size="mini" v-model="seachProduct_two.origin" placeholder="请选择">
            <el-option
              v-for="item in seachProduct_two.originList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <el-button
            size="mini"
            @click="add_product_list(pagesProduct_two.currentPage,pagesProduct_two.pageSize)"
            icon="el-icon-search"
            type="warning"
            class="btns"
          >查询</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="productData_two"
        @selection-change="handleSelectionChange"
        @row-click="dblclick_table_fuc"
        highlight-current-row
        max-height="500"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="recordNumber" label="备案编号"></el-table-column>
        <el-table-column prop="source" label="产品分类"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <el-table-column prop="model" label="产品型号"></el-table-column>
        <el-table-column prop="qualification" label="产品资质"></el-table-column>
        <el-table-column prop="origin" label="产地"></el-table-column>
      </el-table>
      <!-- Pagination 分页 -->
      <el-pagination
        @size-change="handleSizeChangeProduct_two"
        @current-change="handleCurrentChangeProduct_two"
        :current-page="pagesProduct_two.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesProduct_two.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagesProduct_two.total"
        class="pagination"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="product_comeBack_two()" type="success">取消</el-button>
        <el-button @click="add_product_list_two()" type="primary">提交</el-button>
      </div>
    </el-dialog>
    <!-- dialog 去重弹框-->
    <el-dialog
      title="以下产品已存在，请勿重复添加"
      :visible.sync="deduplicationDialog"
      :close-on-click-modal="false"
      :before-close="comeBack_deduplication"
    >
      <el-table :data="deduplication_data" center>
        <el-table-column prop="recordNumber" label="备案编号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="comeBack_deduplication()" type="success">取消</el-button>
        <el-button @click="next_deduplication_fuc()" type="primary">一键去重</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectHospitalAndSaleBaseBatch,
  insertNext,
  deleteHospitalAndSaleBase,
  selectHospitalSaleBaseList,
  selectSales,
  updateHospitalSaleBasePrice,
  insertHospitalAndSaleBase
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  personnel,
  province,
  city,
  hospital,
  site,
  allSite,
  batch,
  joinAllProvince,
  joinAllCity,
  tips
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import Clipboard from "clipboard";
import naVComponent from "../navComponent/page";
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
      //产品分页
      pagesProduct: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      pagesProduct_two: {
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
        hospitalId: null,
        hospitalList: []
      },
      // add: {
      //   provinceIdList: [],
      //   cityIdList: [],
      //   siteIdList: [],
      //   hospitalList: null,
      //   batch:null
      // },
      addSiteDialog: false,
      batchpage: false,
      addSite: {
        provinceValue: null,
        citysValue: null,
        siteId: null,
        hospitalId: null,
        batch: null
      },
      isShowAdd: true,
      isShowAddTitle: "新增测评中心信息",
      rowSiteId: null,
      //新增data
      batchList: [],
      productData: [],
      productData_two: [],
      seachProduct: {
        name: null,
        productTypeValue: null,
        qualification: null,
        productTypes: [
          { name: "会员卡", id: 1 },
          { name: "测评服务", id: 2 },
          { name: "固定定制", id: 301 },
          { name: "固定成品", id: 302 },
          { name: "矫形定制", id: 303 },
          { name: "矫形成品", id: 304 },
          { name: "低温板", id: 305 },
          { name: "外购", id: 306 }
        ],
        qualificationList: [
          { name: "一类", id: 1 },
          { name: "二类", id: 2 },
          { name: "默认", id: 3 }
        ],
        origin: null,
        recordNumber: null,
        nickname: null,
        originList: [
          { name: "国产", id: 1 },
          { name: "进口", id: 2 }
        ]
      },
      seachProduct_two: {
        name: null,
        productTypeValue: null,
        qualification: null,
        productTypes: [
          { name: "会员卡", id: 1 },
          { name: "测评服务", id: 2 },
          { name: "固定定制", id: 301 },
          { name: "固定成品", id: 302 },
          { name: "矫形定制", id: 303 },
          { name: "矫形成品", id: 304 },
          { name: "低温板", id: 305 },
          { name: "外购", id: 306 }
        ],
        qualificationList: [
          { name: "一类", id: 1 },
          { name: "二类", id: 2 },
          { name: "默认", id: 3 }
        ],
        origin: null,
        recordNumber: null,
        nickname: null,
        originList: [
          { name: "国产", id: 1 },
          { name: "进口", id: 2 }
        ]
      },
      only_batchNum: null,
      only_hospitalId: null,
      productlonding_two: false,
      multipleSelection: [],
      deduplicationDialog: false,
      deduplication_data: [],
      deduplication_data_tab: []
    };
  },
  mounted() {
    this.pageList();
    //获取新增加盟省列表
    this.addProvinceList();
  },
  methods: {
    dblclick_table_fuc(row, column, cell, event){
      naVComponent.dblclick_table_fuc(this,row)
    },
    comeBack_deduplication() {
      this.deduplicationDialog = false;
    },
    next_deduplication_fuc() {
      // debugger
      this.multipleSelection.forEach((obj, index) => {
        this.deduplication_data_tab.forEach(item => {
          if (obj.id == item) {
            this.$refs.multipleTable.toggleRowSelection(obj);
            this.multipleSelection.splice(index, 1);
          }
        });
      });
      this.comeBack_deduplication();
    },
    sbmint_fuc() {
      let saleBasesForm = [];
      this.productData.forEach(obj => {
        saleBasesForm.push({ id: obj.id, price: Number(obj.price) });
      });
      console.log(saleBasesForm);
      debugger;
      let data = {
        batchNum: this.only_batchNum,
        saleBasesForm: saleBasesForm
      };
      updateHospitalSaleBasePrice(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.product_comeBack();
            this.comeBack();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
            tips(this, "提交成功!", "success");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    add_product_list_two() {
      let saleBaseIds = [];
      this.multipleSelection.forEach((obj, index) => {
        saleBaseIds.push(obj.id);
      });
      let data = {
        hospitalId: this.only_hospitalId,
        batchNum: this.only_batchNum,
        saleBaseIds: saleBaseIds
      };
      insertHospitalAndSaleBase(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(res);
            if (res.data.data.baseIds.length == 0) {
              this.product_comeBack_two();
              tips(this, "添加成功!", "success");
              this.next_product_fuc(
                this.pagesProduct.currentPage,
                this.pagesProduct.pageSize
              );
            } else {
              this.deduplicationDialog = true;
              this.deduplication_data = res.data.data.dtos;
              this.deduplication_data_tab = res.data.data.baseIds;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    add_product_list(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        recordNumber: this.seachProduct_two.recordNumber || null,
        name: this.seachProduct_two.name || null,
        nickname: this.seachProduct_two.nickname || null,
        source: this.seachProduct_two.productTypeValue || null,
        qualification: this.seachProduct_two.qualification || null,
        origin: this.seachProduct_two.origin || null
      };
      selectSales(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            this.productData_two = dataList.data;
            this.pagesProduct_two.total = dataList.total;
            this.productlonding_two = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 复制订单号
    copy(index) {
      let copyText = this.clientData[index].batchNum;
      let clipboard = new Clipboard(".tag-read", {
        text: function() {
          return copyText;
        }
      });
      clipboard.on("success", e => {
        tips(this, "复制成功!", "success");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        tips(this, "该浏览器不支持自动复制!", "warning");
        // 释放内存
        clipboard.destroy();
      });
    },
    // modify_function(obj) {
    //   this.isShowAdd = false;
    //   this.isShowAddTitle = "修改测评中心信息";
    //   this.rowSiteId = obj.siteId;
    //   this.addSite.provinceValue = obj.provinceId;
    //   this.addCityList(obj.provinceId);
    //   this.addSite.citysValue = obj.cityId;
    //   this.addSite.siteType = obj.siteTypeInt;
    //   this.addSite.siteName = obj.siteName;
    //   this.addSite.siteAddress = obj.siteAddress;
    //   this.addSite.sitePhone = obj.sitePhone;
    //   this.addSiteDialog = true;
    // },
    //删除产品列表
    deletesite_function(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            batchNum: id
          };
          deleteHospitalAndSaleBase(data)
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
    //删除产品
    deletebase_function(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: id
          };
          deleteHospitalAndSaleBase(data)
            .then(res => {
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.next_product_fuc(
                  this.pagesProduct.currentPage,
                  this.pagesProduct.pageSize
                );
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
    next_fuc(obj, xiugai) {
      let data = {};
      if (xiugai == "修改") {
        (this.only_hospitalId = obj.hospitalId),
          (this.only_batchNum = obj.batchNum),
          (data.hospitalId = obj.hospitalId),
          (data.batchNumSelf = obj.batchNum);
      } else {
        (data.hospitalId = this.addSite.hospitalId),
          (data.batchNumCopy = this.addSite.batch);
      }
      insertNext(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(res);
            let data = res.data.data;
            this.only_batchNum = data.data.batchNum;
            this.only_hospitalId = data.data.hospitalId;
            this.productData = data.data.hospitalSaleBaseDTO;
            this.pagesProduct.total = data.total;
            this.batchpage = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    next_product_fuc(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        batchNum: this.only_batchNum,
        recordNumber: this.seachProduct.recordNumber || null,
        name: this.seachProduct.name || null,
        nickname: this.seachProduct.nickname || null,
        source: this.seachProduct.productTypeValue || null,
        qualification: this.seachProduct.qualification || null,
        origin: this.seachProduct.origin || null
      };
      selectHospitalSaleBaseList(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            this.productData = dataList.data;
            this.pagesProduct.total = dataList.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // addSite_fuc(formName, name) {
    //   // this.$refs[formName].validate(valid => {
    //   // if (valid) {
    //   if (name == "modify") {
    //     let data = {
    //       siteId: this.rowSiteId,
    //       provinceId: this.addSite.provinceValue, //省ID
    //       cityId: this.addSite.citysValue, //市ID
    //       siteName: this.addSite.siteName, //测评中心名
    //       siteType: this.addSite.siteType, //0-总部，1-独立，2-连锁
    //       sitePhone: this.addSite.sitePhone, //测评中心联系方式
    //       siteAddress: this.addSite.siteAddress //测评中心地址 address
    //     };
    //     updateSite(data)
    //       .then(res => {
    //         if (res.data.returnCode != 0) {
    //           this.$message({
    //             type: "warning",
    //             message: res.data.returnMsg,
    //             center: true
    //           });
    //         } else {
    //           this.comeBack();
    //           this.pageList(this.pages.currentPage, this.pages.pageSize);
    //           this.$message({
    //             type: "success",
    //             message: "修改成功！",
    //             center: true
    //           });
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   } else {
    //     let data = {
    //       provinceId: this.addSite.provinceValue, //省ID
    //       cityId: this.addSite.citysValue, //市ID
    //       siteName: this.addSite.siteName, //测评中心名
    //       siteType: this.addSite.siteType, //0-总部，1-独立，2-连锁
    //       sitePhone: this.addSite.sitePhone, //测评中心联系方式
    //       siteAddress: this.addSite.siteAddress //测评中心地址 address
    //     };
    //     insertSite(data)
    //       .then(res => {
    //         if (res.data.returnCode != 0) {
    //           this.$message({
    //             type: "warning",
    //             message: res.data.returnMsg,
    //             center: true
    //           });
    //         } else {
    //           this.comeBack();
    //           this.pageList(this.pages.currentPage, this.pages.pageSize);
    //           this.$message({
    //             type: "success",
    //             message: "添加成功！",
    //             center: true
    //           });
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    //   // } else {
    //   //   this.$message({
    //   //     type: "warning",
    //   //     message: "请填写表格！",
    //   //     center: true
    //   //   });
    //   //   return false;
    //   // }
    //   // });
    // },
    addSite_function() {
      this.isShowAdd = true;
      this.isShowAddTitle = "新增产品清单";
      this.addSiteDialog = true;
    },
    product_comeBack() {
      this.batchpage = false;
    },
    product_comeBack_two() {
      this.productlonding_two = false;
    },
    comeBack() {
      this.addSite.provinceValue = null;
      this.addSite.citysValue = null;
      this.addSite.siteId = null;
      this.addSite.hospitalId = null;
      this.addSite.batch = null;
      this.addSiteDialog = false;
    },
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        provinceId: this.seach.provinceId || null,
        cityId: this.seach.cityId || null,
        siteId: this.seach.siteId || null,
        hospitalId: this.seach.hospitalId || null
      };
      this.loading = true;
      selectHospitalAndSaleBaseBatch(data)
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
        provinceId: this.seach.provinceId || null,
        cityId: this.seach.cityId || null,
        siteId: this.seach.siteId || null,
        hospitalId: this.seach.hospitalId || null
      };
      const lsyObj = {
        method: "post",
        fileName: "产品配置清单信息",
        url: javaApi.exportHospitalAndSaleBase,
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
    //产品页面变化时
    handleCurrentChangeProduct(num) {
      this.pagesProduct.currentPage = num;
      let pageIndex = this.pagesProduct.currentPage;
      let pageSize = this.pagesProduct.pageSize;
      this.next_product_fuc(pageIndex, pageSize);
    },
    //产品条数发生变化时
    handleSizeChangeProduct(val) {
      this.pagesProduct.pageSize = val;
      let pageIndex = this.pagesProduct.currentPage;
      let pageSize = this.pagesProduct.pageSize;
      this.next_product_fuc(pageIndex, pageSize);
    },
    //全部产品页面变化时
    handleCurrentChangeProduct_two(num) {
      this.pagesProduct_two.currentPage = num;
      let pageIndex = this.pagesProduct_two.currentPage;
      let pageSize = this.pagesProduct_two.pageSize;
      this.add_product_list(pageIndex, pageSize);
    },
    //全部产品条数发生变化时
    handleSizeChangeProduct_two(val) {
      this.pagesProduct_two.pageSize = val;
      let pageIndex = this.pagesProduct_two.currentPage;
      let pageSize = this.pagesProduct_two.pageSize;
      this.add_product_list(pageIndex, pageSize);
    },

    //新增加盟获取省
    async addProvinceList() {
      let data = await province();
      // this.add.provinceIdList = data;
      this.seach.provinceIdList = data;
    },
    //新增加盟获取市
    async addCityList(id) {
      let data = await city(id);
      // this.add.cityIdList = data;
      this.seach.cityIdList = data;
    },
    //获取省
    // async provinceList() {
    //   this.seach.provinceIdList = await province();
    // },
    //获取市
    // async cityList(id) {
    //   this.seach.cityIdList = await city(id);
    // },
    //测评中心
    async siteList(id) {
      this.seach.siteIdList = await allSite(null, id);
    },
    //测评中心id获取医院
    async hospitals(id) {
      this.seach.hospitalList = await hospital(id);
      this.batchList = await batch(id);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
