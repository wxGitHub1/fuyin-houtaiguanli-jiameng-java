//已验收
<template>
  <div>
    <!-- search -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input class="w-150" v-model="seach.memberName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="产品名">
        <el-input class="w-150" v-model="seach.nickName" placeholder="请输入名称"></el-input>
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
          @change="userList(seach.siteValue)"
        >
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主取型人">
        <el-select class="w-150" clearable v-model="seach.user" placeholder="请选择">
          <el-option
            v-for="item in seach.userList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接待日期">
        <el-date-picker
          class="w-250"
          v-model="seach.time"
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
          type="primary"
          icon="el-icon-search"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table
      :border="true"
      :data="clientData"
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
      <el-table-column align="center" prop="pUser" label="主取型人"></el-table-column>
      <el-table-column align="center" prop="nickname" label="产品名称"></el-table-column>
      <el-table-column align="center" prop="createTime" label="验收时间"></el-table-column>
      <el-table-column align="center" prop="spStatus" label="模型状态"></el-table-column>
      <el-table-column align="center" prop="pUser" label="验收人"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="details(scope.row.spId,scope.row.spStatus)"
            size="small"
          >详情</el-button>
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
    <!-- dialog 详情-->
    <el-dialog
      title="客户详情"
      :visible.sync="dialogDepartmentDetails"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="xiangxifanhui"
    >
      <h3 class="new-title">客户信息</h3>
      <el-table :border="true" :data="memberDetailDto" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
        <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="source" label="客户来源"></el-table-column>
        <el-table-column align="center" prop="cognition" label="客户初始认知"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
        <el-table-column align="center" prop="black" label="黑名单"></el-table-column>
        <el-table-column align="center" prop="address" label="家庭住址"></el-table-column>
        <el-table-column align="center" prop="school" label="就读学校"></el-table-column>
        <el-table-column align="center" prop="memberModeCN" label="客户当前类型"></el-table-column>
        <el-table-column align="center" prop="memberTypeCN" label="就诊类型"></el-table-column>
      </el-table>
      <!-- <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{memberDetailDto.memberName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{memberDetailDto.birthday}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{memberDetailDto.phone}}</span>
        <span>客户来源:</span>
        <span class="margin-r-20">{{memberDetailDto.source}}</span>
        <span>客户初始认知:</span>
        <span>{{memberDetailDto.cognition}}</span>
      </div>
      <div class="margin-t-10">
        <span>性别:</span>
        <span class="margin-r-20">{{memberDetailDto.sex}}</span>
        <span>黑名单:</span>
        <span class="margin-r-20">{{memberDetailDto.black}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{memberDetailDto.address}}</span>
        <span>就读学校:</span>
        <span class="margin-r-20">{{memberDetailDto.school}}</span>
        <span>客户当前类型:</span>
        <span class="margin-r-20">{{memberDetailDto.memberModeCN}}</span>
        <span>就诊类型:</span>
        <span>{{memberDetailDto.memberTypeCN}}</span>
      </div> -->
      <h3 class="new-title">病情信息</h3>
      <el-table :border="true" :data="memberDetailDto" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="condition" label="处方病情"></el-table-column>
        <el-table-column align="center" prop="illness" label="新增病情"></el-table-column>
      </el-table>
      <!-- <div>
        <span>处方病情:</span>
        <span class="margin-r-20">{{memberDetailDto.condition}}</span>
        <span>新增病情:</span>
        <span class="margin-r-20">{{memberDetailDto.illness}}</span>
      </div> -->
      <h3 class="new-title">订单详情</h3>
      <el-table :data="saleProductDto" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="nickname" label="产品名称" min-width="100"></el-table-column>
        <el-table-column prop="model" label="产品类型"></el-table-column>
        <el-table-column prop="orderUser" label="下单人员"></el-table-column>
        <el-table-column prop="deliveryTime" label="交货日期"></el-table-column>
        <el-table-column prop="quickly" label="是否加急"></el-table-column>
        <el-table-column prop="demand" label="特殊要求"></el-table-column>
        <el-table-column prop="orderNum" label="订单号"></el-table-column>
      </el-table>
      <h3 class="new-title">取型信息</h3>
      <div>
        <span>主取型人:</span>
        <span class="margin-r-20">{{productShapeDto[0].user}}</span>
        <span>辅助人员:</span>
        <span class="margin-r-20">{{productShapeDto[0].helpUser}}</span>
      </div>
      <div class="margin-t-10">
        <div class="display-i-b" v-for="item in productSize" :key="item.name">
          <span>{{item.key}}:</span>
          <span class="margin-r-20">{{item.value || "暂无数据"}}</span>
        </div>
        <!-- <div class="display-i-b" v-for="item in productSize.kd" :key="item.name">
          <span>{{item.name}}:</span>
          <span class="margin-r-20">{{item.value || "暂无数据"}}</span>
        </div>
        <div class="display-i-b" v-for="item in productSize.gd" :key="item.name">
          <span>{{item.name}}:</span>
          <span class="margin-r-20">{{item.value || "暂无数据"}}</span>
        </div>
        <div class="display-i-b" v-for="item in productSize.zb" :key="item.name">
          <span>{{item.name}}:</span>
          <span class="margin-r-20">{{item.value || "暂无数据"}}</span>
        </div>-->
      </div>
      <h3 class="new-title">家长反应</h3>
      <div>
        <span class="margin-r-20">{{productShapeDto[0].reflect}}</span>
      </div>
      <h3 class="new-title">取型自检信息</h3>
      <el-table :data="productShapeDto" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="checkSelfUser" label="自检人" min-width="100"></el-table-column>
        <el-table-column prop="checkSelfTime" label="自检时间"></el-table-column>
        <el-table-column prop="checkSelfResult" label="自检结果">
          <template slot-scope="scope">
            <span v-if="!!scope.row.checkSelfTime">自检合格</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="new-title">取型验收信息</h3>
      <el-table :data="acceptanceDtos" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="createUserName" label="验收人" min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="验收时间"></el-table-column>
        <el-table-column prop="result" label="验收结果"></el-table-column>
        <el-table-column prop="remark" label="问题反馈"></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="xiangxifanhui" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="warning" @click="printFormDatas(isRowSpId)">打印订货单</el-button>
        <el-button
          v-if="czBut_isShow"
          type="danger"
          @click="cz_function(isRowSpId)"
          icon="el-icon-warning-outline"
        >重做</el-button>
      </span>
    </el-dialog>
    <!-- dialog 打印订单表-->
    <el-dialog
      title="订单表"
      :visible.sync="dialogOrderFrom"
      center
      :close-on-click-modal="false"
      width="80%"
      :before-close="cancelPrinting"
    >
      <fuyinProduct-html
        :productTitle="productTitle"
        :printFormData="printFormData"
        :sizeMapList="sizeMapList"
      ></fuyinProduct-html>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPrinting()" type="success">取消</el-button>
        <el-button v-print="'#printTest'" type="primary">立即打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  shapeAcceptance,
  userListByDept,
  shapeDetail,
  printProduct,
  shapeRedo
} from "../../api/javaApi";
import {
  exportMethod,
  province,
  city,
  site,
  allSite
} from "../../utils/public";
// import fuyinProduct from "../../utils/fuyinProduct";
import fuyinProduct_html from "../commonComponent/fuyinProduct";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  data() {
    return {
      // product: fuyinProduct.isShow,
      dialogOrderFrom: false,
      productTitle: {},
      printFormData: {},
      // printFormDataMap: null,
      sizeMapList: [],
      //
      isRowSpId: null,
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
        nickname: null,
        time: null,
        reflect: null,
        fyList: [
          { name: "配合" },
          { name: "理智" },
          { name: "心疼" },
          { name: "抱怨" },
          { name: "嫌弃" },
          { name: "暴躁" }
        ],
        status: null,
        statusList: [
          { name: "成功", id: 0 },
          { name: "待自检", id: 1 },
          { name: "待验收", id: 2 },
          { name: "驳回", id: 3 }
        ],
        user: null,
        userList: [],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      },
      dialogDepartmentDetails: false,
      memberDetailDto: [{
        memberName: null
      }],
      acceptanceDtos: null,
      saleProductDto: [],
      productShapeDto: [
        {
          user: null,
          size: null
        }
      ],
      productSize: [],
      loading: true,
      czBut_isShow: true
    };
  },
  components: {
    "fuyinProduct-html": fuyinProduct_html
  },
  mounted() {
    this.pageList();
    // this.userList();
    this.provinceList();
  },
  methods: {
    cz_function(id) {
      this.$confirm("此操作将重做该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            saleProductId: id
          };
          shapeRedo(data)
            .then(res => {
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.xiangxifanhui();
                this.pageList(this.pages.currentPage, this.pages.pageSize);
                this.$message({
                  type: "success",
                  message: "重做成功!"
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
            message: "已取消"
          });
        });
    },
    cancelPrinting() {
      this.dialogOrderFrom = false;
      // this.product.product_kaifa = false;
      // for (let key in this.product) {
      //   this.product[key] = false;
      // }
    },
    printFormDatas(id) {
      let data = {
        saleProductId: Number(id)
      };
      printProduct(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            // debugger
            // this.product.product_3 = true;
            // let myObj = fuyinProduct.fy_product;
            // let id = myObj[res.data.data.recordNumber] || myObj.isNo;
            // this.product["product_" + id] = true;
            this.printFormData = res.data.data.memberDetailDto;
            this.productTitle = res.data.data;
            // this.productTitle.baseProductName = res.data.data.baseProductName;
            // this.productTitle.baseProductNickname =res.data.data.baseProductNickname;
            // this.printFormDataMap = res.data.data.map["取型"];
            this.sizeMapList = res.data.data.sizeMapList;
            this.dialogOrderFrom = true;
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    xiangxifanhui() {
      this.dialogDepartmentDetails = false;
      this.productShapeDt0Id = null;
      this.productSize = [];
      // this.productSize.kd = [];
      // this.productSize.gd = [];
      // this.productSize.zb = [];
      // this.productSize.yq = [];
    },
    // handleModify() {},
    details(id, type) {
      if (type === "验收驳回") {
        this.czBut_isShow = true;
      } else {
        this.czBut_isShow = false;
      }
      this.isRowSpId = id;
      let data = {
        saleProductId: id
      };
      shapeDetail(data)
        .then(res => {
          console.log(res);
          this.dialogDepartmentDetails = true;
          this.memberDetailDto[0] = res.data.data.memberDetailDto;
          this.acceptanceDtos = res.data.data.acceptanceDtos;
          this.saleProductDto[0] = res.data.data.saleProductDto;
          this.productShapeDto[0] = res.data.data.productShapeDto;
          this.productSize = res.data.data.productShapeDto.sizeMaps;

          // let qxwc = res.data.data.productShapeDto.size["取型"]["围长"];
          // let qxkd = res.data.data.productShapeDto.size["取型"]["宽度"];
          // let qxgd = res.data.data.productShapeDto.size["取型"]["高度"];
          // let qxzb = res.data.data.productShapeDto.size["取型"]["足部"];
          // this.productSize.yq = res.data.data.productShapeDto.size["取型"]["要求"];
          // for (let i in qxwc) {
          //   this.productSize.wc.push({ name: i, value: qxwc[i] });
          // }
          // for (let i in qxzb) {
          //   this.productSize.zb.push({ name: i, value: qxzb[i] });
          // }
          // for (let i in qxkd) {
          //   this.productSize.kd.push({ name: i, value: qxkd[i] });
          // }
          // for (let i in qxgd) {
          //   this.productSize.gd.push({ name: i, value: qxgd[i] });
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    userList(siteId) {
      let data = {
        deptId: 8,
        site: siteId
      };
      userListByDept(data)
        .then(res => {
          console.log(res);
          this.seach.userList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        nickname: this.seach.nickName || null,
        beginTime: this.seach.time == null ? null : this.seach.time[0],
        endTime: this.seach.time == null ? null : this.seach.time[1],
        status: 0,
        user: this.seach.user || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      this.loading = true;
      shapeAcceptance(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.loading = false;
            let dataList = res.data;
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
      this.seach.siteLists = await allSite(null, id);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
