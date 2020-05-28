// 待试穿
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
      <el-form-item label="是否逾期">
        <el-select class="w-150" clearable v-model="seach.isOverdue" placeholder="请选择">
          <el-option
            v-for="item in seach.isOverdueList"
            :key="item.id"
            :label="item.name"
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
      <el-form-item label="试穿人员">
        <el-select class="w-150" clearable v-model="seach.repairUserId" placeholder="请选择">
          <el-option
            v-for="item in seach.scUserNameList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品昵称">
        <el-input class="w-150" v-model="seach.saleProductName" placeholder="请输入产品昵称"></el-input>
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
      <el-table-column align="center" prop="reflect" label="取型家长反应"></el-table-column>
      <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="deliveryTime" label="交货日期"></el-table-column>
      <el-table-column align="center" prop="noticeTime" label="预约试穿日期"></el-table-column>
      <el-table-column align="center" prop="serviceUser" label="试穿人员"></el-table-column>
      <el-table-column align="center" prop="arriveTime" label="到访时间">
        <template slot-scope="scope">
          <div :class="scope.row.arriveTime == '逾期未到'?'color-red':''">{{scope.row.arriveTime}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="oweMoney" label="下欠金额"></el-table-column>
      <el-table-column align="center" label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.buttonType === 2"
            @click="details(scope.row.saleProductId,'接待')"
            type="success"
            size="small"
          >接待</el-button>
          <el-button @click="details(scope.row.saleProductId,'详情')" type="primary" size="small">详情</el-button>
          <el-button
            v-if="scope.row.buttonType === 1"
            @click="modifyDate(scope.row.saleProductId,scope.row.memberId)"
            type="danger"
            size="small"
          >修改日期</el-button>
          <el-button
            v-else
            @click="uploadPhotos(scope.row.saleProductId)"
            type="warning"
            size="small"
          >上传照片</el-button>
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
      title="待试穿详情"
      :visible.sync="dialogPendingDetails"
      center
      :close-on-click-modal="false"
      :before-close="detailsReturn"
      width="70%"
    >
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{memberDetailDto.memberName || "暂无数据"}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{memberDetailDto.birthday || "暂无数据"}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{memberDetailDto.phone || "暂无数据"}}</span>
        <span>客户来源:</span>
        <span class="margin-r-20">{{memberDetailDto.source || "暂无数据"}}</span>
        <span>客户初始认知:</span>
        <span>{{memberDetailDto.cognition || "暂无数据"}}</span>
      </div>
      <div class="margin-t-10">
        <span>性别:</span>
        <span class="margin-r-20">{{memberDetailDto.sex || "暂无数据"}}</span>
        <span>黑名单:</span>
        <span class="margin-r-20">{{memberDetailDto.isBlack || "暂无数据"}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{memberDetailDto.address || "暂无数据"}}</span>
        <span>就读学校:</span>
        <span class="margin-r-20">{{memberDetailDto.school || "暂无数据"}}</span>
        <span>客户当前类型:</span>
        <span class="margin-r-20">{{memberDetailDto.memberModeCN || "暂无数据"}}</span>
        <span>就诊类型:</span>
        <span>{{memberDetailDto.memberTypeCN || "暂无数据"}}</span>
      </div>
      <h3 class="b-b-p-1">会员信息</h3>
      <el-table :data="memberCard" border>
        <el-table-column prop="isVIP" label="当前是否会员" min-width="100"></el-table-column>
        <el-table-column prop="wholeNum" label="全身剩余次数"></el-table-column>
        <el-table-column prop="partsNum" label="部位剩余次数"></el-table-column>
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
        <el-table-column prop="updateTime" label="创建时间"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">产品信息</h3>
      <el-table :data="pickupServiceInformation" border>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <el-table-column prop="qualification" label="产品资质"></el-table-column>
        <el-table-column prop="deliveryTime" label="交货日期"></el-table-column>
        <el-table-column prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column prop="oweMoney" label="下欠金额"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">试穿分配信息</h3>
      <el-table :data="tryOn" border>
        <el-table-column prop="noticeTime" label="预约试穿日期"></el-table-column>
        <el-table-column prop="serviceUser" label="试穿人"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">取型信息</h3>
      <div>
        <span>主取型人:</span>
        <span class="margin-r-20">{{shapeDetail.shapeUser || "暂无数据"}}</span>
        <span>辅助人员:</span>
        <span class="margin-r-20">{{shapeDetail.shapeHelpUser || "暂无数据"}}</span>
        <span>取型时间:</span>
        <span class="margin-r-20">{{shapeDetail.shapeTime || "暂无数据"}}</span>
        <span>取型家长反应:</span>
        <span class="margin-r-20">{{shapeDetail.reflect || "暂无数据"}}</span>
      </div>
      <div class="margin-t-10">
        <div class="display-i-b" v-for="item in shapeDetail.sizeMapList" :key="item.name">
          <span>{{item.key}}:</span>
          <span class="margin-r-20">{{item.value || "暂无数据"}}</span>
        </div>
      </div>
      <div v-if=" but_xq === '接待' " slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-back" @click="detailsReturn()">返回</el-button>
        <el-button type="primary" @click="uploadPhotos(saleProductId)">上传照片</el-button>
        <el-button
          type="primary"
          v-if="tryOn[0].rivetStatus === 1"
          @click="rivetStart_function(memberDetailDto.siteId) "
        >开始铆接</el-button>
        <el-button type="success" v-if="tryOn[0].rivetStatus === 2" @click="rivetOver()">完成铆接</el-button>
        <el-button type="info" v-if="tryOn[0].rivetStatus === 0">已铆接</el-button>
        <el-button type="success" @click="trialComplete()">试穿完成</el-button>
        <el-button
          type="warning"
          @click="express_func(pickupServiceInformation[0].saleProductId)"
          icon="el-icon-s-promotion"
        >快递邮递</el-button>
      </div>
      <div v-else slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-back" @click="detailsReturn()">返回</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="modifyDate(pickupServiceInformation[0].saleProductId,memberDetailDto.memberId)"
        >修改日期</el-button>
        <el-button type="danger" icon="el-icon-warning-outline" @click="redoDialog=true">重做</el-button>
      </div>
    </el-dialog>
    <!-- 选择用户弹框 -->
    <el-dialog
      title="选择用户"
      width="70%"
      :visible.sync="userDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      center
    >
      <div style="width:496px;margin:0 auto;">
        <h3 class="b-b-p-1">试穿日期时间</h3>
        <el-date-picker
          v-model="tryOnDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
        <h3 class="b-b-p-1">试穿人员分配</h3>
        <el-transfer
          v-model="myValue"
          filterable
          filter-placeholder="请输入人员"
          :titles="['待选择人员', '被选择人员']"
          :data="nameList"
        ></el-transfer>
      </div>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="serve()" type="success" icon="el-icon-circle-check">保存</el-button>
      </span>
    </el-dialog>
    <!-- 重做弹框 -->
    <el-dialog
      title="重做信息"
      width="30%"
      :visible.sync="redoDialog"
      :close-on-click-modal="false"
      :before-close="cz_cancel"
    >
      <h3 class="b-b-p-1">重做原因</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 4}"
        placeholder="请输入重做原因"
        v-model="cz_textarea"
      ></el-input>
      <span slot="footer">
        <el-button @click="cz_cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="cz_serve()" type="success" icon="el-icon-circle-check">确认重做</el-button>
      </span>
    </el-dialog>
    <!-- 开始铆接 -->
    <el-dialog
      title="铆接信息"
      width="30%"
      :visible.sync="rivetingDialog"
      :close-on-click-modal="false"
      :before-close="mj_cancel"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="line-h-30">请选择铆接人员：</div>
        </el-col>
        <el-col :span="18">
          <div>
            <el-select
              style="width:100%"
              size="small"
              clearable
              v-model="rivetingStaff"
              placeholder="请选择"
            >
              <el-option
                v-for="item in rivetingStaffList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="mj_cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="mj_serve()" type="success" icon="el-icon-circle-check">确认</el-button>
      </span>
    </el-dialog>
    <!-- 上传照片 -->
    <el-dialog
      title="上传照片"
      width="70%"
      :visible.sync="uploadPhotosDialog"
      :close-on-click-modal="false"
      :before-close="cloPicForm"
      center
    >
      <h3 class="b-b-p-1">试穿前照片（最多4张最少1张）</h3>
      <el-upload
        :action="upImgUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :http-request="uploadFile1"
        ref="upload"
        multiple
        :auto-upload="false"
        :before-upload="beforeAvatarUpload"
        :limit="4"
        :file-list="fileListBefore"
      >
        <i class="el-icon-plus"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg文件</div>
      </el-upload>
      <h3 class="b-b-p-1">试穿后照片（最多4张最少1张）</h3>
      <el-upload
        :action="upImgUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :auto-upload="false"
        :http-request="uploadFile2"
        ref="upload2"
        multiple
        :before-upload="beforeAvatarUpload"
        :limit="4"
        :file-list="fileListAfter"
      >
        <i class="el-icon-plus"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg文件</div>
      </el-upload>
      <h3 class="b-b-p-1">试穿备注</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 4}"
        placeholder="请输入内容"
        v-model="sc_textarea"
      ></el-input>
      <span slot="footer">
        <el-button @click="cloPicForm()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="subPicForm()" type="success" icon="el-icon-circle-check">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import {
  queryWaitTryOnByPage,
  queryWaitTryOnDetail,
  userList,
  queryTryOnImage,
  selectAdvanceUser,
  updateNoticeTime,
  tryOnFinish,
  rivetStart,
  rivetEnd,
  tryOnRedo,
  tryOnAdmit,
  deleteTryOnImage,
  postExpress
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  personnel,
  TimeDifference,
  province,
  city,
  allSite,
  site,
  hospital
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import axios from "../../utils/ajax";
export default {
  name: "App",
  data() {
    return {
      //上传图片
      productId: null,
      isJPG: true,
      upImgUrl: javaApi.tryOnUploadImage,
      fileListAfter: [],
      fileListBefore: [],
      dialogImageUrl: "",
      dialogVisible: false,
      ///
      dialogPendingDetails: false,
      memberDetailDto: {
        memberName: null
      },
      memberCard: [],
      prescriptions: [],
      tryOn: [{}],
      shapeDetail: {},
      pickupServiceInformation: [],
      userDialog: false,
      uploadPhotosDialog: false,
      tryOnDate: null,
      nameList: [],
      myValue: [],
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
        isOverdueList: [
          { name: "是", id: 1 },
          { name: "否", id: "0" }
        ],
        isOverdue: null,
        repairUserId: null,
        scUserNameList: null,
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
      memberId: null,
      loading: true,
      //重做
      redoDialog: false,
      cz_textarea: null,
      //铆接
      rivetingDialog: false,
      rivetingStaffList: [],
      rivetingStaff: null,
      but_xq: "详情",
      //试穿备注
      sc_textarea: null
    };
  },
  mounted() {
    this.pageList();
    this.userList();
    this.provinceList();
  },
  methods: {
    express_func(id) {
      let data = {
        saleProductId: id
      };
      postExpress(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.detailsReturn();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async rivetStart_function(siteId) {
      this.rivetingStaffList = await personnel(13, siteId);
      this.rivetingDialog = true;
    },
    rivetOver() {
      let timeCost = TimeDifference(this.tryOn[0].rivetBeginTime);
      this.$confirm("用时" + timeCost + "分钟, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let data = {
            saleProductId: this.saleProductId
          };
          rivetEnd(data)
            .then(res => {
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.detailsReturn();
                this.$message({
                  type: "success",
                  message: "操作成功!"
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
            message: "取消"
          });
        });
    },
    detailsReturn() {
      this.dialogPendingDetails = false;
    },
    trialComplete() {
      this.$confirm("请确认试穿完成, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            saleProductId: this.saleProductId
          };
          tryOnFinish(data)
            .then(res => {
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.detailsReturn();
                this.pageList(this.pages.currentPage, this.pages.pageSize);
                this.$message({
                  type: "success",
                  message: "操作成功!"
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
            message: "已取消！"
          });
        });
    },
    mj_cancel() {
      this.rivetingDialog = false;
      this.rivetingStaff = null;
    },
    mj_serve() {
      let data = {
        saleProductId: this.saleProductId,
        rivetUser: this.rivetingStaff
      };
      rivetStart(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.mj_cancel();
            this.detailsReturn();
            this.$message({
              type: "success",
              message: "铆接开始！",
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cz_cancel() {
      this.redoDialog = false;
      this.cz_textarea = null;
    },
    cz_serve() {
      let data = {
        saleProductId: this.saleProductId,
        reason: this.cz_textarea
      };
      tryOnRedo(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.cz_cancel();
            this.detailsReturn();
            this.$message({
              type: "success",
              message: "重做成功！",
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    modifyDate(id, id2) {
      this.memberId = id2;
      this.saleProductId = id;
      let data = {
        productId: id,
        type: 360
      };
      selectAdvanceUser(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.myValue = res.data.data;
            this.userDialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cloPicForm() {
      this.uploadPhotosDialog = false;
      this.fileListAfter = [];
      this.fileListBefore = [];
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      this.isJPG = isJPG;
      return isJPG;
    },
    uploadPhotos(id) {
      this.saleProductId = id;
      let data = {
        saleProductId: id
      };
      queryTryOnImage(data)
        .then(res => {
          let imageAfter = res.data.data.imageAfter;
          let imageBefore = res.data.data.imageBefore;
          for (let index = 0; index < imageBefore.length; index++) {
            const element = imageBefore[index];
            this.fileListBefore.push({ url: element });
          }
          for (let index = 0; index < imageAfter.length; index++) {
            const element = imageAfter[index];
            this.fileListAfter.push({ url: element });
          }
          this.uploadPhotosDialog = true;
          this.sc_textarea = res.data.data.remark;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上传前图片
    uploadFile1(file) {
      this.formDate.append("beforeImages", file.file);
    },
    // 上传后图片
    uploadFile2(file) {
      this.formDate.append("afterImages", file.file);
    },
    //自定义上传图片
    subPicForm() {
      this.formDate = new FormData();
      this.$refs.upload.submit();
      this.$refs.upload2.submit();
      this.formDate.append("saleProductId", this.saleProductId);
      this.formDate.append("remark", this.sc_textarea);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(this.upImgUrl, this.formDate, config)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(this.fileList);
            // debugger;
            if (this.isJPG) {
              this.cloPicForm();
              this.$message({
                type: "success",
                message: "上传成功！",
                center: true
              });
            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
      if (!!file.name) {
        // this.$message({
        //   type: "success",
        //   message: "删除成功！",
        //   center: true
        // });
      } else {
        let data = {
          saleProductId: this.saleProductId,
          imageUrl: file.url
        };
        deleteTryOnImage(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
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
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 取消
    cancel() {
      this.userDialog = false;
      this.myValue = [];
      this.productId = null;
      this.tryOnDate = null;
    },
    // 保存
    serve() {
      let data = {
        saleProductId: this.saleProductId,
        noticeTime: this.tryOnDate,
        serviceUser: this.myValue
      };
      // debugger;
      updateNoticeTime(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.$message({
              type: "success",
              message: "修改成功！",
              center: true
            });
            this.cancel();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
          }
        })
        .catch(errr => {
          console.log(err);
        });
    },
    details(id, butName) {
      this.but_xq = butName;
      this.saleProductId = id;
      // this.productId = id;
      let data = { saleProductId: id };
      if (butName === "详情") {
        queryWaitTryOnDetail(data)
          .then(res => {
            console.log(res);
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.memberDetailDto = res.data.data.memberDetail;
              this.memberCard[0] = res.data.data.memberDetail;
              this.prescriptions[0] = res.data.data.prescriptionDetail;
              this.pickupServiceInformation[0] = res.data.data.productDetailDTO;
              this.tryOn[0] = res.data.data.tryOnDetail;
              this.shapeDetail = res.data.data.shapeDetail;
              this.dialogPendingDetails = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        tryOnAdmit(data)
          .then(res => {
            console.log(res);
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.memberDetailDto = res.data.data.memberDetail;
              this.memberCard[0] = res.data.data.memberDetail;
              this.prescriptions[0] = res.data.data.prescriptionDetail;
              this.pickupServiceInformation[0] = res.data.data.productDetailDTO;
              this.tryOn[0] = res.data.data.tryOnDetail;
              this.shapeDetail = res.data.data.shapeDetail;
              this.dialogPendingDetails = true;
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
        beginDate:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        endDate:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        isOverDate: this.seach.isOverdue == "0" ? 0 : this.seach.isOverdue,
        userId: this.seach.repairUserId || null,
        nickname: this.seach.saleProductName || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      queryWaitTryOnByPage(data)
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
    //人员
    async userList() {
      this.seach.scUserNameList = await personnel(6);
      this.seach.scUserNameList.forEach(element => {
        this.nameList.push({ label: element.username, key: element.id });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.color-red {
  color: #fb5b3c;
}
</style>
