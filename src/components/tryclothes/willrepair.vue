// 待报修
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
        <el-select class="w-150" clearable v-model="seach.repairUserName" placeholder="请选择">
          <el-option
            v-for="item in seach.repairUserNameList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
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
        <el-select clearable class="w-150" v-model="seach.hospitalId" placeholder="请先选择测评中心">
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试穿日期">
        <el-date-picker
          class="w-250"
          v-model="seach.deliveryTime"
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
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="repairUserName" label="报修人员"></el-table-column>
      <el-table-column align="center" prop="warrantyDate" label="保修期"></el-table-column>
      <el-table-column align="center" prop="assignTime" label="分配时间"></el-table-column>
      <el-table-column align="center" prop="tryOnUser" label="试穿人员"></el-table-column>
      <el-table-column align="center" prop="tryOnBeginTime" label="试穿时间"></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="seeDetails(scope.row.saleProductId)" type="primary" size="small">查看详情</el-button>
          <el-button
            @click="seeDetails(scope.row.saleProductId,'接待')"
            type="warning"
            size="small"
          >接待</el-button>
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
      title="待报修详情"
      :visible.sync="repairedDialog"
      center
      :close-on-click-modal="false"
      width="80%"
      :before-close="comeBack"
    >
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.memberName || "暂无数据"}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday || "暂无数据"}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{Details.phone || "暂无数据"}}</span>
        <span>客户来源:</span>
        <span class="margin-r-20">{{Details.source || "暂无数据"}}</span>
        <span>客户初始认知:</span>
        <span>{{Details.cognition || "暂无数据"}}</span>
      </div>
      <div class="margin-t-10">
        <span>性别:</span>
        <span class="margin-r-20">{{Details.sex || "暂无数据"}}</span>
        <span>黑名单:</span>
        <span class="margin-r-20">{{Details.isBlack || "暂无数据"}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{Details.address || "暂无数据"}}</span>
        <span>就读学校:</span>
        <span class="margin-r-20">{{Details.school || "暂无数据"}}</span>
        <span>客户当前类型:</span>
        <span class="margin-r-20">{{Details.memberModeCN || "暂无数据"}}</span>
        <span>就诊类型:</span>
        <span>{{Details.memberTypeCN || "暂无数据"}}</span>
      </div>

      <h3 class="b-b-p-1">会员信息</h3>
      <el-table :data="memberCard" border>
        <el-table-column prop="isVIP" label="当前是否会员" min-width="100"></el-table-column>
        <el-table-column prop="partsNum" label="部位剩余次数"></el-table-column>
        <el-table-column prop="wholeNum" label="全身剩余次数"></el-table-column>
        <el-table-column prop="vipType" label="是否续会员"></el-table-column>
        <el-table-column prop="expireDate" label="会员到期时间"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">病单信息</h3>
      <el-table :data="prescriptions" border>
        <el-table-column prop="prescriptionNum" label="病单编号" min-width="100"></el-table-column>
        <el-table-column prop="hospitalName" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
        <el-table-column prop="updateTime" label="创建时间" min-width="100"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">试穿信息</h3>
      <el-table :data="tryOnInformationData" border max-height="500">
        <el-table-column prop="tryBeginTime" label="试穿时间" min-width="100"></el-table-column>
        <el-table-column prop="tryOnMinute" label="试穿时长"></el-table-column>
        <el-table-column prop="appraisal" label="试穿评价"></el-table-column>
        <el-table-column prop="answer" label="是否学会穿戴"></el-table-column>
        <el-table-column prop="answer2" label="是否清楚注意事项"></el-table-column>
        <el-table-column prop="serviceUser" label="试穿人员"></el-table-column>
        <el-table-column prop="imageNum" label="试穿照片"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column align="center" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              @click="lookAtPhotos(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-picture"
            >查看照片</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="b-b-p-1">铆接信息</h3>
      <el-table :data="tryOnInformationData" border max-height="500">
        <el-table-column prop="rivetUser" label="铆接人" min-width="100"></el-table-column>
        <el-table-column prop="rivetBeginTime" label="铆接开始时间"></el-table-column>
        <el-table-column prop="rivetEndTime" label="铆接完成时间"></el-table-column>
        <el-table-column prop="rivetMinute" label="铆接时长"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">取型信息</h3>
      <div>
        <span>主取型人:</span>
        <span class="margin-r-20">{{productShapeDto[0].shapeUser}}</span>
        <span>辅助人员:</span>
        <span class="margin-r-20">{{productShapeDto[0].shapeHelpUser}}</span>
      </div>
      <div class="margin-t-10">
        <div class="display-i-b" v-for="item in productShapeDto[0].sizeMapList" :key="item.name">
          <span>{{item.key}}:</span>
          <span class="margin-r-20">{{item.value || "暂无数据"}}</span>
        </div>
      </div>
      <h3 class="b-b-p-1">维修信息</h3>
      <el-table :data="repairInformation" border max-height="500">
        <el-table-column prop="repairBeginTime" label="报修时间" min-width="100"></el-table-column>
        <el-table-column prop="repairEndTime" label="维修完成时间"></el-table-column>
        <el-table-column prop="repairUser" label="报修人"></el-table-column>
        <el-table-column prop="doRepairUser" label="维修人"></el-table-column>
        <el-table-column prop="repairType" label="维修方式"></el-table-column>
        <el-table-column prop="reason" label="原因"></el-table-column>
        <el-table-column prop="duration" label="维修时长"></el-table-column>
        <el-table-column label="邮寄信息">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.repairType == '返厂维修'"
              @click="YJ_details(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-location"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="comeBack()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          @click="xcwx_fuction()"
          :disabled="isShow"
          type="primary"
          icon="el-icon-refresh"
          plain
        >现场报修</el-button>
        <el-button
          @click="fcwx_fuction()"
          :disabled="isShow"
          type="primary"
          icon="el-icon-refresh-left"
          plain
        >返厂报修</el-button>
        <el-button
          @click="wfwx_fuction()"
          :disabled="isShow"
          type="warning"
          icon="el-icon-warning"
        >无法维修</el-button>
        <el-button @click="cz_fuction()" :disabled="isShow" type="danger" icon="el-icon-question">重做</el-button>
      </div>
    </el-dialog>
    <!-- 邮寄信息弹框 -->
    <el-dialog
      title="邮寄详细信息"
      :visible.sync="mailingInformationDialog"
      :close-on-click-modal="false"
      :before-close="cancel_YJ"
      width="30%"
    >
      <div>收货人姓名：{{receiver.consigneeName || "暂无数据"}}</div>
      <div>收货人电话：{{receiver.consigneePhone || "暂无数据"}}</div>
      <div>收货人地址：{{receiver.consigneeAddress || "暂无数据"}}</div>
    </el-dialog>
    <!-- 现场维修弹框 -->
    <el-dialog
      title="现场维修"
      :visible.sync="fieldRepairDialog"
      :close-on-click-modal="false"
      :before-close="cancel_XCWX"
      width="30%"
    >
      <el-row>
        <el-col :span="7">
          <div class="line_h_30">请选择维修人员：</div>
        </el-col>
        <el-col :span="17">
          <el-select size="mini" v-model="doRepairUser" placeholder="请选择">
            <el-option
              v-for="item in doRepairUserList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <h3 class="b-b-p-1">维修信息</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 5}"
        placeholder="请输入内容"
        v-model="textarea"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_XCWX()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="confirm_XC()" type="success" icon="el-icon-circle-check">确认</el-button>
      </div>
    </el-dialog>
    <!-- 返厂维修弹框 -->
    <el-dialog
      title="返厂维修"
      :visible.sync="returnToFactoryDialog"
      :close-on-click-modal="false"
      :before-close="cancel_FCWX"
      width="30%"
    >
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="line_h_30">收货人：</div>
        </el-col>
        <el-col :span="8">
          <el-input v-model="returnToFactory.name" size="mini" placeholder="请输入姓名"></el-input>
        </el-col>
        <el-col :span="4">
          <div class="line_h_30">收货电话：</div>
        </el-col>
        <el-col :span="8">
          <el-input v-model="returnToFactory.phone" size="mini" placeholder="请输入电话"></el-input>
        </el-col>
      </el-row>
      <div class="margin-b-10 margin-t-10">收货地址</div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 5}"
        placeholder="请输入内容"
        v-model="returnToFactory.address"
      ></el-input>
      <h3 class="b-b-p-1">请输入存在问题，及维修部位</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 5}"
        placeholder="请输入内容"
        v-model="returnToFactory.textarea2"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_FCWX()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="confirm_FC()" type="success" icon="el-icon-circle-check">确认</el-button>
      </div>
    </el-dialog>
    <!-- 无法维修弹框 -->
    <el-dialog
      title="无法维修"
      :visible.sync="cannotBeRepairedDialog"
      :close-on-click-modal="false"
      :before-close="cancel_WFWX"
      width="30%"
    >
      <h3 class="b-b-p-1">无法维修原因</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 5}"
        placeholder="请输入内容"
        v-model="textarea3"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_WFWX()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="confirm_WF()" type="success" icon="el-icon-circle-check">确认</el-button>
      </div>
    </el-dialog>
    <!-- 重做弹框 -->
    <el-dialog
      title="重做"
      :visible.sync="redoDialog"
      :close-on-click-modal="false"
      :before-close="cancel_CZ"
      width="30%"
    >
      <h3 class="b-b-p-1">重做原因</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 5}"
        placeholder="请输入内容"
        v-model="textarea4"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_CZ()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="confirm_CZ()" type="success" icon="el-icon-circle-check">确认</el-button>
      </div>
    </el-dialog>
    <!-- 查看试穿照片 -->
    <!-- 查看试穿照片 -->
    <el-dialog title="试穿照片" :visible.sync="photo_Dialog" :close-on-click-modal="false">
      <h3 class="b-b-p-1">试穿前</h3>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in sc_srcList_before" :key="index">
          <div>
            <el-image :src="item" :preview-src-list="sc_srcList_before">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-col>
      </el-row>
      <h3 class="b-b-p-1">试穿后</h3>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in sc_srcList_after" :key="index">
          <div>
            <el-image :src="item" :preview-src-list="sc_srcList_after">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-col>
      </el-row>
      <h3 class="b-b-p-1">试穿备注</h3>
      <div class="margin-t-20">{{sc_remark || "暂无数据"}}</div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectPendingRepairList,
  userListByDept,
  selectPendingRepairDetail,
  insertRepairSite,
  insertRepairBack,
  insertRepairUnable,
  pendingRepairAdmit,
  insertRepairRedo
} from "../../api/javaApi";
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
      loading: true,
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
        deliveryTime: null,
        repairUserName: null,
        repairUserNameList: [],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists: [],
        hospitalId: null
      },
      repairedDialog: false,
      isShow: false,
      //客户信息
      Details: {},
      memberCard: [],
      prescriptions: [],
      tryOnInformationData: [],
      productShapeDto: [{}],
      repairInformation: [],
      // productSize: [],
      //邮寄
      mailingInformationDialog: false,
      receiver: {},
      //现场维修弹框
      fieldRepairDialog: false,
      textarea: null,
      doRepairUserList: [],
      doRepairUser: null,
      mySaleProductId: null,
      //返厂
      returnToFactoryDialog: false,
      returnToFactory: {
        name: null,
        phone: null,
        address: null,
        textarea2: null
      },
      //无法维修
      cannotBeRepairedDialog: false,
      textarea3: null,
      //重做
      redoDialog: false,
      textarea4: null,
      //查看照片
      photo_Dialog: false,
      sc_srcList_before: [],
      sc_srcList_after: [],
      sc_remark: null
    };
  },
  mounted() {
    this.pageList();
    this.userList();
    this.provinceList();
  },
  methods: {
    lookAtPhotos(obj) {
      this.sc_srcList_before = obj.imageBefore;
      this.sc_srcList_after = obj.imageAfter;
      this.sc_remark = obj.remark;
      this.photo_Dialog = true;
    },
    cancel_CZ() {
      this.redoDialog = false;
      this.textarea4 = null;
    },
    confirm_CZ() {
      if (!!this.textarea4) {
        let data = {
          saleProductId: this.mySaleProductId,
          reason: this.textarea4
        };
        insertRepairRedo(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancel_CZ();
              this.comeBack();
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
          message: "请填写原因！",
          center: true
        });
      }
    },
    cancel_WFWX() {
      this.cannotBeRepairedDialog = false;
      this.textarea3 = null;
    },
    confirm_WF() {
      if (!!this.textarea3) {
        let data = {
          saleProductId: this.mySaleProductId,
          reason: this.textarea3
        };
        insertRepairUnable(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancel_WFWX();
              this.comeBack();
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
          message: "请填写原因！",
          center: true
        });
      }
    },
    cancel_FCWX() {
      this.returnToFactoryDialog = false;
      this.returnToFactory.name = null;
      this.returnToFactory.phone = null;
      this.returnToFactory.address = null;
      this.returnToFactory.textarea2 = null;
    },
    confirm_FC() {
      if (
        !!this.returnToFactory.name &&
        !!this.returnToFactory.textarea2 &&
        !!this.returnToFactory.phone &&
        !!this.returnToFactory.address
      ) {
        let data = {
          saleProductId: this.mySaleProductId,
          reason: this.returnToFactory.textarea2,
          consigneeName: this.returnToFactory.name,
          consigneePhone: this.returnToFactory.phone,
          consigneeAddress: this.returnToFactory.address
        };
        insertRepairBack(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancel_FCWX();
              this.comeBack();
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
          message: "请填写全部表格！",
          center: true
        });
      }
    },
    confirm_XC() {
      if (!!this.doRepairUser && !!this.textarea) {
        let data = {
          saleProductId: this.mySaleProductId,
          doRepairUserId: this.doRepairUser,
          reason: this.textarea
        };
        insertRepairSite(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancel_XCWX();
              this.comeBack();
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
          message: "请填写全部表格！",
          center: true
        });
      }
    },
    xcwx_fuction() {
      this.fieldRepairDialog = true;
    },
    cz_fuction() {
      this.redoDialog = true;
    },
    fcwx_fuction() {
      this.returnToFactoryDialog = true;
    },
    wfwx_fuction() {
      this.cannotBeRepairedDialog = true;
    },
    cancel_XCWX() {
      this.fieldRepairDialog = false;
      this.textarea = null;
    },
    cancel_YJ() {
      this.mailingInformationDialog = false;
    },
    YJ_details(obj) {
      this.receiver = obj;
      this.mailingInformationDialog = true;
    },
    comeBack() {
      this.repairedDialog = false;
    },
    seeDetails(id, jd) {
      this.mySaleProductId = id;
      let data = {
        saleProductId: id
      };
      if (jd != "接待") {
        this.isShow = true;
        selectPendingRepairDetail(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              console.log(res);
              let dataList = res.data.data;
              this.Details = dataList.memberDetail;
              this.memberCard[0] = dataList.memberDetail;
              this.prescriptions[0] = dataList.prescriptionDetail;
              this.tryOnInformationData[0] = dataList.tryOnDetail;
              this.productShapeDto[0] = dataList.shapeDetail;
              this.repairInformation = dataList.productRepairDTOs;
              this.repairedDialog = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.isShow = false;
        pendingRepairAdmit(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              console.log(res);
              let dataList = res.data.data;
              this.Details = dataList.memberDetail;
              this.memberCard[0] = dataList.memberDetail;
              this.prescriptions[0] = dataList.prescriptionDetail;
              this.tryOnInformationData[0] = dataList.tryOnDetail;
              this.productShapeDto[0] = dataList.shapeDetail;
              this.repairInformation = dataList.productRepairDTOs;
              this.repairedDialog = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        tryOnBeginTime:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        tryOnEndTime:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        repairUserName: this.seach.repairUserName || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      selectPendingRepairList(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            this.loading = false;
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
    // 试穿人员
    async userList() {
      this.seach.repairUserNameList = await personnel(6);
      this.doRepairUserList = await personnel(12);
    }
  }
};
</script>

<style scoped lang="scss">
.line_h_30 {
  line-height: 30px;
}
</style>
