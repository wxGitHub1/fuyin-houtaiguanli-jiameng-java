//待接待
<template>
  <div>
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input class="w-150" v-model="seach.memberName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="是否会员">
        <el-select class="w-150" clearable v-model="seach.vipValue" placeholder="请选择">
          <el-option v-for="item in seach.vips" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务人员">
        <el-select clearable class="w-150" v-model="seach.servicePersonnel" placeholder="请选择">
          <el-option
            v-for="item in userNameList"
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
        <el-select clearable class="w-150" v-model="seach.siteValue" placeholder="请先选择城市">
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="pageList(pages.currentPage,pages.pageSize)"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="clientData"
      max-height="980"
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
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="userName" label="服务人员"></el-table-column>
      <el-table-column align="center" prop="createTime" label="分配时间"></el-table-column>
      <el-table-column align="center" prop="vip" label="是否会员"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="details(scope.row.productId)" size="small">接待</el-button>
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
    <!-- dialog 接待详情-->
    <el-dialog
      title="接待详情"
      :visible.sync="dialogReceptionDetails"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="cancelJD"
    >
      <h3 class="b-b-p-1">客户信息</h3>
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
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
        <span class="margin-r-20">{{Details.memberName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{Details.phone}}</span>
        <span>客户来源:</span>
        <span class="margin-r-20">{{Details.source}}</span>
        <span>客户初始认知:</span>
        <span>{{Details.cognition}}</span>
      </div>
      <div class="margin-t-10">
        <span>性别:</span>
        <span class="margin-r-20">{{Details.sex}}</span>
        <span>黑名单:</span>
        <span class="margin-r-20">{{Details.black}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{Details.address}}</span>
        <span>就读学校:</span>
        <span class="margin-r-20">{{Details.school}}</span>
        <span>客户当前类型:</span>
        <span class="margin-r-20">{{Details.memberModeCN}}</span>
        <span>就诊类型:</span>
        <span>{{Details.memberTypeCN}}</span>
      </div> -->
      <h3 class="b-b-p-1">病情信息</h3>
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="condition" label="处方病情"></el-table-column>
        <el-table-column align="center" prop="illness" label="新增病情"></el-table-column>
      </el-table>
      <!-- <div>
        <span>处方病情:</span>
        <span class="margin-r-20">{{Details.condition}}</span>
        <span>新增病情:</span>
        <span>{{Details.illness}}</span>
      </div> -->
      <h3 class="b-b-p-1">订单信息</h3>
      <el-table :data="shapeDetails" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="nickname" label="产品名称" min-width="100"></el-table-column>
        <el-table-column prop="model" label="产品类型"></el-table-column>
        <el-table-column prop="orderUser" label="下单人员"></el-table-column>
        <el-table-column prop="deliveryTime" label="交货日期"></el-table-column>
        <el-table-column prop="quickly" label="是否加急"></el-table-column>
        <el-table-column prop="demand" label="特殊要求"></el-table-column>
        <el-table-column prop="orderNum" label="订单号"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="takeShape(scope.row)" type="primary">取型</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- dialog 产品尺寸-->
    <el-dialog
      title="产品尺寸"
      :visible.sync="dialogSizeDetails"
      center
      :close-on-click-modal="false"
      :before-close="clencRefund"
      width="70%"
    >
      <div class="clearfix">
        <div v-for="(item,index) in productSize.list" :key="item.name" class="cpSize">
          <div v-if="item.center==''">
            <span class="span">{{item.key}}</span>
            <div class="div">
              <el-input
                v-model="item.value"
                style="width：100%"
                size="small"
                placeholder="请输入"
                @input="changeSizeVal_fuc(item.value,index)"
              ></el-input>
            </div>
          </div>
          <div v-else>
            <span class="span2">{{item.key}}</span>
            <div class="div2">
              <el-input v-model="item.valueCenter" style="width：100%" size="small" placeholder="请输入"></el-input>
            </div>

            <span class="span2">{{item.center}}</span>

            <div class="div2">
              <el-input
                v-model="item.centerValue "
                style="width：100%"
                size="small"
                placeholder="请输入"
                @input="changeSizeVal_fuc(item.value,index)"
              ></el-input>
            </div>
          </div>
        </div>
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
                v-for="item in productSize.userList"
                :key="item.id"
                :label="item.name"
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
            <!-- <el-input
              type="textarea"
              :rows="1"
              placeholder="请输入内容"
              v-model="productSize.textarea_illness">
            </el-input>-->
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
  </div>
</template>

<script>
import {
  shapeAssignList,
  memberShapeProduct,
  baseShapeDetailNew,
  shapeInsert,
  getShapeUser
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
        vipValue: null,
        servicePersonnel: null,
        vips: [
          { name: "是", id: 1 },
          { name: "否", id: "0" }
        ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      },
      dialogReceptionDetails: false,
      Details: [],
      shapeDetails: [],
      dialogSizeDetails: false,
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
        userList: null,
        saleBaseId: null,
        saleProductId: null,
        textarea_illness: null,
        helpUserIds: []
      },
      saleProductId: null,
      userNameList: [],
      // only_siteId:null,
      fz_userList: []
    };
  },
  mounted() {
    this.pageList();
    this.provinceList();
    this.userNameList_fuc();
    // this.userList();
  },
  methods: {
    changeSizeVal_fuc(value,index){
       naVComponent.changeSizeVal_fuc(this,value,index);
    },
    // 查询取型产品人
    userList(id) {
      let data = {
        saleProductId: id
      };
      getShapeUser(data)
        .then(res => {
          console.log(res);
          this.productSize.userList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelJD() {
      this.dialogReceptionDetails = false;
      this.pageList(this.pages.currentPage, this.pages.pageSize);
    },
    clencRefund() {
      this.dialogSizeDetails = false;
      this.productSize.saleBaseId = null;
      this.productSize.saleProductId = null;
      // this.productSize.wc = [];
      // this.productSize.kd = [];
      // this.productSize.gd = [];
      // this.productSize.zb = [];
      // this.productSize.yq = null;
      this.productSize.user = null;
      this.productSize.fy = [];
      this.productSize.textarea_illness = null;
    },

    addRefund() {
      let user = {};
      this.productSize.userList.forEach(element => {
        if (element.id == this.productSize.user) {
          user[element.id] = element.name;
        }
      });
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
        saleBaseId: this.productSize.saleBaseId,
        saleProductId: this.productSize.saleProductId,
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
      // console.log(data.user)
      // debugger;
      if (
        !!this.productSize.radio &&
        JSON.stringify(user) != "{}" &&
        !!this.productSize.time
      ) {
        shapeInsert(data)
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
                message: "新增成功！",
                center: true
              });
              this.clencRefund();
              this.dialogReceptionDetails = false;
              this.details(this.saleProductId);
              this.clencRefund();
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
    takeShape(obj) {
      this.productSize.saleBaseId = obj.baseId;
      this.productSize.saleProductId = obj.id;
      let data = {
        saleBaseId: obj.baseId,
        saleProductId: obj.id
      };
      baseShapeDetailNew(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.productSize.list = res.data.data;
            this.productSize.time = obj.deliveryTime;
            this.productSize.textarea_illness = this.Details[0].illness;
            this.dialogSizeDetails = true;
            this.userList(obj.id);
            this.fz_userList_fuc(obj.siteId);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(id) {
      this.saleProductId = id;
      // this.only_siteId = obj.siteId;
      let data = {
        saleProductId: id
      };
      memberShapeProduct(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.dialogReceptionDetails = true;
            let data = res.data.data;
            this.Details[0] = data.memberDetailDto;
            this.shapeDetails = data.shapeDetails;
          }
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
        vip: this.seach.vipValue == "0" ? 0 : this.seach.vipValue,
        userName: this.seach.servicePersonnel || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        type: 310,
        status: 0
      };
      this.loading = true;
      shapeAssignList(data)
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
    //服务人员列表
    async userNameList_fuc() {
      this.userNameList = await personnel();
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
  .div2 {
    display: inline-block;
    width: 20%;
  }
  .span2 {
    display: inline-block;
    margin-bottom: 10px;
    width: 10%;
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
