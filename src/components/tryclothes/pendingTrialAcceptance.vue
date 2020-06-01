// 待试穿验收
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input class="w-150" v-model="seach.memberName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="产品昵称">
        <el-input class="w-150" v-model="seach.saleProductName" placeholder="请输入产品昵称"></el-input>
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
      <el-form-item label="交货日期">
        <el-date-picker
          class="w-250"
          v-model="seach.delivery"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
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
      <el-table-column align="center" prop="hospitalName" label="医院"></el-table-column>
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="orderRecordCreateTime" label="下单时间"></el-table-column>
      <el-table-column align="center" prop="quickly" label="是否加急"></el-table-column>
      <el-table-column align="center" prop="deliveryTime" label="交货日期"></el-table-column>
      <el-table-column align="center" prop="xRay" label="X光片"></el-table-column>
      <el-table-column align="center" prop="demand" label="特殊要求"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="details(scope.row.saleProductId)" type="primary" size="small">验收</el-button>
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
      title="待验收详情"
      :visible.sync="dialogPendingAcceptanceDetails"
      center
      :close-on-click-modal="false"
      :before-close="cancel_XQ"
      width="70%"
    >
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
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
        <span class="margin-r-20">{{memberDetailDto.isBlack}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{memberDetailDto.address}}</span>
        <span>就读学校:</span>
        <span class="margin-r-20">{{memberDetailDto.school}}</span>
        <span>客户当前类型:</span>
        <span class="margin-r-20">{{memberDetailDto.memberModeCN || "暂无数据"}}</span>
        <span>就诊类型:</span>
        <span>{{memberDetailDto.memberTypeCN || "暂无数据"}}</span>
      </div>
      <h3 class="b-b-p-1">会员信息</h3>
      <el-table :data="memberCard" border style="width: 100%">
        <el-table-column prop="isVIP" label="当前是否会员" min-width="100"></el-table-column>
        <el-table-column prop="wholeNum" label="全身剩余次数"></el-table-column>
        <el-table-column prop="partsNum" label="部位剩余次数"></el-table-column>
        <el-table-column prop="vipType" label="是否续会员"></el-table-column>
        <el-table-column prop="expireDate" label="会员到期时间"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">病单信息</h3>
      <el-table :data="prescriptions" border style="width: 100%">
        <el-table-column prop="prescriptionNum" label="病单编号" min-width="100"></el-table-column>
        <el-table-column prop="hospitalName" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
        <el-table-column prop="updateTime" label="创建时间"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">产品信息</h3>
      <el-table :data="productDetailDTO" border style="width: 100%">
        <el-table-column prop="nickname" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="qualification" label="产品资质"></el-table-column>
        <el-table-column prop="demand" label="特殊要求"></el-table-column>
        <el-table-column prop="quickly" label="是否加急"></el-table-column>
        <el-table-column prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column prop="oweMoney" label="下欠金额"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">取型信息</h3>
      <div>
        <span>主取型人:</span>
        <span class="margin-r-20">{{shapeDetail.shapeUser}}</span>
        <span>辅助人员:</span>
        <span class="margin-r-20">{{shapeDetail.shapeHelpUser}}</span>
        <span>取型时间:</span>
        <span class="margin-r-20">{{shapeDetail.shapeTime}}</span>
      </div>
      <div class="margin-t-10">
        <div class="display-i-b" v-for="(item,index) in shapeDetail.sizeMapList" :key="index">
          <span>{{item.key}}:</span>
          <span class="margin-r-20">{{item.value}}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel_XQ()" icon="el-icon-back">返回</el-button>
        <el-button type="warning" @click="acceptanceDialog=true" icon="el-icon-s-check">验收</el-button>
      </div>
    </el-dialog>
    <!-- 验收产品要求 -->
    <el-dialog
      title="验收产品要求"
      width="30%"
      :visible.sync="acceptanceDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
    >
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
        style="width:50%;margin:0 auto;"
      >
        <el-checkbox v-for="city in cities" :label="city" :key="city" style="width:35%">{{city}}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        class="margin-b-10"
      >全选</el-checkbox>
      <hr style="border-top:1px solid #DCDFE6" />
      <div class="margin-b-10">其他</div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 9}"
        placeholder="请输入其他验收情况"
        v-model="otherContent"
      ></el-input>
      <span slot="footer">
        <el-button @click="acceptanceFcDialog = true" icon="el-icon-refresh-right">返厂调整</el-button>
        <el-button @click="xc_tz()" icon="el-icon-refresh">现场调整</el-button>
        <el-button :disabled="!checkAll" @click="serve()" type="success" icon="el-icon-finished">合格</el-button>
      </span>
    </el-dialog>
    <!-- 返厂调整弹框 -->
    <el-dialog
      title="返厂调整"
      width="30%"
      :visible.sync="acceptanceFcDialog"
      :close-on-click-modal="false"
      :before-close="cancel_FC"
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 9}"
        placeholder="请输入返厂调整原因"
        v-model="otherContent_FC"
      ></el-input>
      <span slot="footer">
        <el-button @click="serve_FC()" type="success" icon="el-icon-finished">确认返厂</el-button>
      </span>
    </el-dialog>
    <!-- 返厂调整弹框 -->
    <el-dialog
      title="现场调整"
      width="30%"
      :visible.sync="acceptanceXcDialog"
      :close-on-click-modal="false"
      :before-close="cancel_XC"
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 9}"
        placeholder="请输入现场调整原因"
        v-model="otherContent_XC"
      ></el-input>
      <div class="margin-t-10">
        <span class="margin-r-10">选择人员</span>
        <el-select clearable size="mini" v-model="userValue" placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer">
        <el-button @click="serve_XC()" type="success" icon="el-icon-finished">确认现场调整</el-button>
      </span>
    </el-dialog>
    <!-- 分配试穿人弹框 -->
    <el-dialog
      title="分配试穿人"
      :visible.sync="acceptanDialog"
      :close-on-click-modal="false"
      :before-close="cancel_two"
    >
      <el-table border :data="productData" max-height="580">
        <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
        <el-table-column align="center" prop="deliveryTime" label="交货日期"></el-table-column>
        <el-table-column align="center" prop="acceptanceResult" label="试穿验收结果"></el-table-column>
        <el-table-column align="center" prop="acceptanceCreateTime" label="试穿验收时间"></el-table-column>
        <el-table-column align="center" prop="acceptanceUserName" label="试穿验收人"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.button == '1'"
              @click="distribution(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-s-custom"
            >分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 选择用户弹框 -->
    <el-dialog
      title="试穿人员分配"
      :visible.sync="userDialog"
      :close-on-click-modal="false"
      :before-close="cancel_YH"
      center
       width="1000px"
    >
      <div style="width:496px;margin:0 auto;">
        <el-transfer
          v-model="myValue"
          filterable
          filter-placeholder="请输入人员"
          :titles="['待选择人员', '被选择人员']"
          :data="nameList"
        ></el-transfer>
      </div>
      <span slot="footer">
        <el-button @click="cancel_YH()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="add_distribution()" type="success" icon="el-icon-circle-check">新增分配</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectTryOnPendingAcceptanceList,
  selectTryOnPendingAcceptanceDetail,
  tryOnAcceptanceInsertEligible,
  tryOnAcceptanceInsertBack,
  userListByDept,
  tryOnAcceptanceInsertSite,
  selectProductListInTryOnPendingAssign,
  insertTryOn
} from "../../api/javaApi";
import {
  exportMethod,
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
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists: [],
        hospitalId: null
      },
      saleProductId: null,
      dialogPendingAcceptanceDetails: false,
      memberDetailDto: {},
      memberCard: [],
      prescriptions: [],
      productDetailDTO: [],
      shapeDetail: {},
      acceptanceDialog: false,
      acceptanceFcDialog: false,
      acceptanceXcDialog: false,
      checkAll: false,
      checkedCities: [],
      cities: [
        "订货单",
        "尺寸一致",
        "取型接待表",
        "外观对称",
        "姓名匹配",
        "力线",
        "产品包装",
        "光滑度",
        "说明书",
        "特殊要求"
      ],
      isIndeterminate: false,
      otherContent: null,
      otherContent_FC: null,
      otherContent_XC: null,
      userList: [],
      userValue: null,
      loading: true,
      //新增data
      only_memberId: null,
      productData: [],
      acceptanDialog: false,
      userDialog: false,
      nameList: [],
      myValue: []
    };
  },
  mounted() {
    this.pageList();
    this.provinceList();
    this.personnel();
  },
  methods: {
    cancel_YH() {
      this.userDialog = false;
      this.saleProductId = null;
      this.myValue = [];
    },
    add_distribution() {
      if (this.myValue.length != 0) {
        let data = {
          saleProductId: this.saleProductId,
          tryOnUserIds: this.myValue
        };
        insertTryOn(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancel_YH();
              this.cancel_two();
              this.pageList(this.pages.currentPage, this.pages.pageSize);
              this.$message({
                type: "success",
                message: "分配成功！",
                center: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请选择分配人员",
          center: true
        });
      }
    },
    distribution(obj) {
      this.saleProductId = obj.saleProductId;
      this.userDialog = true;
      this.personnel(obj.siteId);
    },
    cancel_two() {
      this.acceptanDialog = false;
    },
    details_two(id) {
      let data = { memberId: id };
      selectProductListInTryOnPendingAssign(data)
        .then(res => {
          console.log(res);
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(res);
            let details = res.data.data;
            this.productData = details;
            this.acceptanDialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    xc_tz() {
      this.acceptanceXcDialog = true;
      this.user();
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    cancel() {
      this.acceptanceDialog = false;
      this.otherContent = null;
      this.checkedCities = [];
      this.checkAll = false;
    },
    cancel_XC() {
      this.acceptanceXcDialog = false;
      this.otherContent_XC = null;
    },
    cancel_FC() {
      this.acceptanceFcDialog = false;
      this.otherContent_FC = null;
    },
    serve() {
      // if (!!this.otherContent) {
      let data = {
        saleProductId: this.saleProductId,
        remark: this.otherContent
      };
      tryOnAcceptanceInsertEligible(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.cancel();
            this.cancel_XQ();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
            this.$message({
              type: "success",
              message: "提交成功！",
              center: true
            });
            this.details_two(this.only_memberId);
          }
        })
        .catch(err => {
          console.log(err);
        });
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: "请输入合格内容！",
      //     center: true
      //   });
      // }
    },
    serve_FC() {
      if (!!this.otherContent_FC) {
        let data = {
          saleProductId: this.saleProductId,
          reason: this.otherContent_FC
        };
        tryOnAcceptanceInsertBack(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancel();
              this.cancel_XQ();
              this.cancel_FC();
              this.pageList(this.pages.currentPage, this.pages.pageSize);
              this.$message({
                type: "success",
                message: "提交成功！",
                center: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请输入合格内容！",
          center: true
        });
      }
    },
    serve_XC() {
      if (!!this.otherContent_XC && !!this.userValue) {
        let data = {
          saleProductId: this.saleProductId,
          reason: this.otherContent_XC,
          siteUserId: this.userValue
        };
        tryOnAcceptanceInsertSite(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancel();
              this.cancel_XQ();
              this.cancel_XC();
              this.pageList(this.pages.currentPage, this.pages.pageSize);
              this.$message({
                type: "success",
                message: "提交成功！",
                center: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请填写表格！",
          center: true
        });
      }
    },
    cancel_XQ() {
      this.dialogPendingAcceptanceDetails = false;
      this.saleProductId = null;
    },
    details(id) {
      this.saleProductId = id;
      let data = { saleProductId: id };
      selectTryOnPendingAcceptanceDetail(data)
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
            this.memberDetailDto = details.memberDetail;
            this.memberCard[0] = details.memberDetail;
            this.prescriptions[0] = details.prescriptionDetail;
            this.productDetailDTO[0] = details.productDetailDTO;
            this.shapeDetail = details.shapeDetail;
            this.dialogPendingAcceptanceDetails = true;
            this.only_memberId = details.memberDetail.memberId;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectTryOnPendingAcceptanceList(data)
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
      this.seach.siteLists = await allSite(null, id);
    },
    //根据测评中心获取医院列表
    async hospitalList(id) {
      this.seach.hospitalLists = await hospital(id);
    },
    user() {
      let data = {
        deptId: 12
      };
      userListByDept(data)
        .then(res => {
          debugger;
          this.userList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取试穿人员列表
    personnel(siteId) {
      let data = {
        deptId: 6,
        siteId: siteId
      };
      userListByDept(data)
        .then(res => {
          console.log(res);
          let data = res.data.data;
          let list = [];
          data.forEach(element => {
            list.push({ label: element.username, key: element.id });
          });
          this.nameList = list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
