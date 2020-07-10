// 已接待
<template>
  <div>
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input class="w-150" v-model="seach.memberName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
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
      <el-form-item label="产品昵称">
        <el-input class="w-150" v-model="seach.nickName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="模型状态">
        <el-select class="w-150" clearable v-model="seach.status" placeholder="请选择">
          <el-option
            v-for="item in seach.statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="家长反应">
        <el-select class="w-150" clearable v-model="seach.reflect" placeholder="请选择">
          <el-option
            v-for="item in seach.fyList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
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
        <el-select clearable class="w-150" v-model="seach.siteValue" placeholder="请先选择城市">
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
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
      max-height="660"
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
      <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="createTime" label="取型时间"></el-table-column>
      <el-table-column align="center" prop="spStatus" label="模型状态"></el-table-column>
      <el-table-column align="center" prop="reflect" label="家长反应"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="details(scope.row.spId)" size="small">详情</el-button>
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
      <h3 class="b-b-p-1">客户信息</h3>
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
      <h3 class="b-b-p-1">病情信息</h3>
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
      <h3 class="b-b-p-1">订单详情</h3>
      <el-table :data="saleProductDto" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="nickname" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="model" label="产品类型"></el-table-column>
        <el-table-column prop="orderUser" label="下单人员"></el-table-column>
        <el-table-column prop="deliveryTime" label="交货日期"></el-table-column>
        <el-table-column prop="quickly" label="是否加急"></el-table-column>
        <el-table-column prop="demand" label="特殊要求"></el-table-column>
        <el-table-column prop="orderNum" label="订单号"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">取型信息</h3>
      <div>
        <span>主取型人:</span>
        <span class="margin-r-20">{{productShapeDto[0].user}}</span>
        <span>辅助人员:</span>
        <span class="margin-r-20">{{productShapeDto[0].helpUser || "暂无数据"}}</span>
        <span>是否有X光片:</span>
        <span class="margin-r-20">{{productShapeDto[0].xRay}}</span>
      </div>
      <div class="margin-t-10">
        <div class="display-i-b" v-for="item in productSize.list" :key="item.name">
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
      <h3 class="b-b-p-1">家长反应</h3>
      <div>
        <span class="margin-r-20">{{productShapeDto[0].reflect}}</span>
      </div>
      <h3 class="b-b-p-1">取型评价</h3>
      <div>
        <span class="margin-r-20">{{"暂无信息"}}</span>
      </div>
      <h3 class="b-b-p-1">取型自检信息</h3>
      <el-table :data="productShapeDto" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="checkSelfUser" label="自检人" min-width="100"></el-table-column>
        <el-table-column prop="checkSelfTime" label="自检时间"></el-table-column>
        <el-table-column prop="checkSelfResult" label="自检结果">
          <template slot-scope="scope">
            <span v-if="!!scope.row.checkSelfTime">自检合格</span>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="b-b-p-1">取型验收信息</h3>
      <el-table :data="acceptanceDtos" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="createUserName" label="验收人" min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="验收时间"></el-table-column>
        <el-table-column prop="result" label="验收结果"></el-table-column>
        <el-table-column prop="remark" label="问题反馈"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-back" @click="xiangxifanhui()">返回</el-button>
        <el-button type="success" @click="handleModify(saleProductDto)">修改</el-button>
        <el-button
          type="warning"
          v-if="!!productShapeDto[0].checkSelfTime == false"
          @click="dialogSelftest = true"
        >模型自检</el-button>
        <!-- <el-button type="warning" @click="printOrderForm()">打印订单</el-button> -->
      </div>
    </el-dialog>
    <!-- dialog 产品尺寸-->
    <el-dialog
      title="修改取型信息"
      :visible.sync="dialogSizeDetails"
      center
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="clearfix">
        <div v-for="item in productSize.list" :key="item.name" class="cpSize">
          <span class="span">{{item.key}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入"></el-input>
          </div>
        </div>
        <!-- <div v-for="item in productSize.kd" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入"></el-input>
          </div>
        </div>
        <div v-for="item in productSize.gd" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入"></el-input>
          </div>
        </div>
        <div v-for="item in productSize.zb" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入"></el-input>
          </div>
        </div>-->
        <div class="cpSize">
          <span class="span">是否有X光片：</span>
          <div class="div">
            <el-radio v-model="productSize.radio" label="1">是</el-radio>
            <el-radio v-model="productSize.radio" label="0">否</el-radio>
          </div>
        </div>
        <div class="cpSize">
          <span class="span">主取型人：</span>
          <div class="div">
            <el-select
              style="width:100%"
              size="small"
              clearable
              v-model="productSize.user"
              placeholder="请选择"
            >
              <el-option
                v-for="item in seach.userList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="cpSize">
          <span class="span">辅助取型人：</span>
          <div class="div">
            <el-select
              style="width:100%"
              size="small"
              clearable
              multiple
              collapse-tags
              v-model="productSize.helpUserIds"
              placeholder="请选择"
            >
              <el-option
                v-for="item in fz_userList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="cpSize">
          <span class="span">交货日期：</span>
          <div class="div">
            <el-date-picker
              size="small"
              v-model="productSize.time"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </div>
        <div class="cpSize">
          <span class="span">新增病情：</span>
          <div class="div">
            <el-input
              v-model="productSize.textarea_illness"
              style="width：100%"
              size="small"
              placeholder="请输入"
            ></el-input>
          </div>
        </div>
        <div class="jzfy">
          <span class="span">家长反应</span>
          <div class="div">
            <el-checkbox-group v-model="productSize.fy">
              <el-checkbox v-for="item in productSize.fyList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clencRefund()" type="success">取消</el-button>
        <el-button type="primary" @click="addRefund()">确认</el-button>
      </div>
    </el-dialog>
    <!-- dialog 取型自检-->
    <el-dialog title="取型自检" :visible.sync="dialogSelftest" center :close-on-click-modal="false">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" type="success">取消</el-button>
        <el-button :disabled="selftestBut" @click="completeSelfTest()" type="primary">完成自检</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  shapeAdmit,
  userListByDept,
  shapeDetail,
  baseShapeDetail,
  shapeUpdate,
  goUpdateShape
} from "../../api/javaApi";
import {
  exportMethod,
  province,
  city,
  site,
  allSite,
  personnel
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  data() {
    return {
      loading: true,
      chanping: "暂无数据",
      //自检
      checkAll: false,
      checkedCities: [],
      cities: [
        "姓名准确无误",
        "符合订单病情",
        "骨骼标志准确清晰",
        "表面平整光滑",
        "符合订单特殊要求",
        "功能位清晰",
        "核对模型与量型尺寸",
        "左右大小高度一致"
      ],
      isIndeterminate: true,
      clientData: [],
      selftestBut: true,
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
          { name: "取型验收合格", id: "0" },
          { name: "取型待自检", id: 1 },
          { name: "取型待验收", id: 2 },
          { name: "取型问题驳回", id: 3 },
          { name: "取型验收反馈", id: 4 }
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
      dialogOrderFrom: false,
      dialogSelftest: false,
      dialogSizeDetails: false,
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
      productSize: {
        // wc: [],
        // kd: [],
        // gd: [],
        // zb: [],
        // yq: null,
        list: [],
        radio: null,
        fy: [],
        fyList: ["配合", "理智", "心疼", "抱怨", "嫌弃", "暴躁"],
        time: null,
        user: null,
        userList: [],
        saleBaseId: null,
        saleProductId: null,
        textarea_illness: null,
        helpUserIds: null
      },
      productShapeDt0Id: null,
      fz_userList: []
      // only_siteId:null
    };
  },
  mounted() {
    this.pageList();
    this.userList();
    this.provinceList();
  },
  methods: {
    printOrderForm() {
      this.dialogOrderFrom = true;
    },
    cancel() {
      this.dialogSelftest = false;
      this.checkedCities = [];
      this.selftestBut = true;
      // this.productShapeDt0Id = null;
    },
    completeSelfTest() {
      let data = {
        id: this.productShapeDt0Id,
        checkSelfResult: this.checkedCities
      };
      shapeUpdate(data)
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
              message: "自检成功！",
              center: true
            });
            this.cancel();
            this.xiangxifanhui();

            // this.details(this.productSize.saleProductId)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
      if (val) {
        this.selftestBut = false;
      } else {
        this.selftestBut = true;
      }
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.selftestBut = checkedCount !== this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    xiangxifanhui() {
      // debugger;
      this.dialogDepartmentDetails = false;
      this.productShapeDt0Id = null;
      // this.productSize.wc = [];
      // this.productSize.kd = [];
      // this.productSize.gd = [];
      // this.productSize.zb = [];
      // this.productSize.yq = [];
      this.pageList(this.pages.currentPage, this.pages.pageSize);
      // this.productShapeDto = [];
    },
    clencRefund() {
      this.dialogSizeDetails = false;
      // this.productSize.wc=[];
      // this.productSize.kd=[];
      // this.productSize.gd=[];
      // this.productSize.zb=[];
      // this.productSize.yq=null;
    },
    addRefund() {
      let user = {};
      if (this.seach.userList.length > 0) {
        this.seach.userList.forEach(element => {
          if (element.id == this.productSize.user) {
            // user.id = element.id;
            // user.name = element.username;
            user[element.id] = element.username;
          }
        });
      }

      // let wc = this.productSize.wc;
      // let wcList = {};
      // for (let i in wc) {
      //   wcList[wc[i].name] = wc[i].value;
      // }
      // let kd = this.productSize.kd;
      // let kdList = {};
      // for (let i in kd) {
      //   kdList[kd[i].name] = kd[i].value;
      // }
      // let gd = this.productSize.gd;
      // let gdList = {};
      // for (let i in gd) {
      //   gdList[gd[i].name] = gd[i].value;
      // }
      // let zb = this.productSize.zb;
      // let zbList = {};
      // for (let i in zb) {
      //   zbList[zb[i].name] = zb[i].value;
      // }
      // let cpxq = {
      //   取型: {
      //     围长: wcList,
      //     宽度: kdList,
      //     高度: gdList,
      //     足部: zbList,
      //     要求: this.productSize.yq
      //   }
      // };
      // console.log(cpxq);
      let data = {
        id: this.productShapeDt0Id,
        user: user,
        sizeMapList: this.productSize.list,
        xRay:
          this.productSize.radio == "1"
            ? 1
            : this.productSize.radio == "0"
            ? 0
            : null,
        deliveryTime: this.productSize.time,
        reflect: this.productSize.fy,
        illness: this.productSize.textarea_illness,
        helpUserIds: this.productSize.helpUserIds
      };
      // debugger;
      shapeUpdate(data)
        .then(res => {
          console.log(res);
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
            this.clencRefund();
            this.xiangxifanhui();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleModify(obj) {
      // console.log(obj)
      let data = {
        id: this.productShapeDt0Id
      };
      goUpdateShape(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(res);
            let objData = res.data.data;
            if (!!objData.user) {
              this.productSize.user = Number(objData.user);
            } else {
              this.productSize.user = null;
            }
            this.productSize.radio = objData.xRay;
            this.productSize.fy = objData.reflectList;
            this.productSize.helpUserIds = objData.helpUsers;
            this.productSize.time = obj[0].deliveryTime;
            this.productSize.textarea_illness = this.memberDetailDto[0].illness;
            this.dialogSizeDetails = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(id) {
      this.productSize.saleProductId = id;
      let data = {
        saleProductId: id
      };
      shapeDetail(data)
        .then(res => {
          console.log(res);
          // debugger;
          this.memberDetailDto[0] = res.data.data.memberDetailDto;
          this.acceptanceDtos = res.data.data.acceptanceDtos;
          this.saleProductDto[0] = res.data.data.saleProductDto;
          this.productShapeDto[0] = res.data.data.productShapeDto;
          this.productShapeDt0Id = res.data.data.productShapeDto.id;
          this.productSize.list = res.data.data.productShapeDto.sizeMaps;
          this.fz_userList_fuc(res.data.data.saleProductDto.siteId);
          // if (!!res.data.data.productShapeDto.size) {
          //   let qxwc = res.data.data.productShapeDto.size["取型"]["围长"];
          //   let qxkd = res.data.data.productShapeDto.size["取型"]["宽度"];
          //   let qxgd = res.data.data.productShapeDto.size["取型"]["高度"];
          //   let qxzb = res.data.data.productShapeDto.size["取型"]["足部"];
          //   this.productSize.yq =
          //     res.data.data.productShapeDto.size["取型"]["要求"];
          //   for (let i in qxwc) {
          //     this.productSize.wc.push({ name: i, value: qxwc[i] });
          //   }
          //   for (let i in qxzb) {
          //     this.productSize.zb.push({ name: i, value: qxzb[i] });
          //   }
          //   for (let i in qxkd) {
          //     this.productSize.kd.push({ name: i, value: qxkd[i] });
          //   }
          //   for (let i in qxgd) {
          //     this.productSize.gd.push({ name: i, value: qxgd[i] });
          //   }
          // }
          this.dialogDepartmentDetails = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    userList() {
      let data = {
        deptId: 8
      };
      userListByDept(data)
        .then(res => {
          console.log(res);
          this.seach.userList = res.data.data || [];
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
        reflect: this.seach.reflect || null,
        user: this.seach.user || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      if (this.seach.status == 1 || this.seach.status == 2) {
        data.status = this.seach.status;
      } else {
        data.paStatus =
          this.seach.status == "0"
            ? 0
            : this.seach.status == 3
            ? 1
            : this.seach.status == 4
            ? 2
            : this.seach.status;
      }
      this.loading = true;
      shapeAdmit(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data;
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
    //辅助取型人员列表
    async fz_userList_fuc(id) {
      this.fz_userList = await personnel(8, id);
    }
  }
};
</script>

<style scoped lang="scss">
.cpSize {
  float: left;
  width: 46%;
  height: 40px;
  margin: 10px 2%;
  .span {
    display: inline-block;
    margin-bottom: 10px;
    width: 30%;
  }
  .div {
    display: inline-block;
    width: 69%;
  }
}
.jzfy {
  float: left;
  height: 40px;
  line-height: 40px;
  margin: 10px 2%;
  width: 95%;
  box-sizing: border-box;
  .span {
    display: inline-block;
    margin-bottom: 10px;
    width: 9%;
  }
  .div {
    display: inline-block;
    width: 79%;
  }
}
</style>
