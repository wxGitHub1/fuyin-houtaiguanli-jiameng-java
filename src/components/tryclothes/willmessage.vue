//待通知
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
      <el-form-item label="产品名称">
        <el-input v-model="seach.saleProductName" class="w-150" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="试穿人员">
        <el-select class="w-150" clearable v-model="seach.userId" placeholder="请选择">
          <el-option
            v-for="item in seach.scUserNameList"
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
      <el-form-item label="分配日期">
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
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="phone" label="电话"></el-table-column>
      <el-table-column align="center" prop="reflect" label="取型家长反应"></el-table-column>
      <el-table-column align="center" prop="address" label="地址"></el-table-column>
      <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="orderTime" label="下单日期"></el-table-column>
      <el-table-column align="center" prop="assignTime" label="分配日期"></el-table-column>
      <el-table-column align="center" prop="orderNum" label="订单编号"></el-table-column>
      <el-table-column align="center" prop="oweMoney" label="下欠金额"></el-table-column>
      <el-table-column align="center" prop="serviceUser" label="试穿人员"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="noticeToTryOn(scope.row.memberId)" type="primary" size="small">通知试穿</el-button>
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
    <!-- 选择用户弹框 -->
    <el-dialog
      title="试穿通知"
      width="70%"
      :visible.sync="userDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      center
    >
      <el-table border :data="tryOnProductData" max-height="480">
        <el-table-column align="center" prop="saleProductName" label="产品昵称"></el-table-column>
        <el-table-column align="center" prop="deliveryTime" label="交货日期"></el-table-column>
        <el-table-column align="center" prop="orderTime" label="下单日期"></el-table-column>
        <el-table-column align="center" prop="assignTime" label="分配日期"></el-table-column>
      </el-table>
      <div class="clearfix">
        <div class="left fp_box">
          <h3 class="b-b-p-1">试穿日期时间</h3>
          <el-date-picker
            v-model="tryOnDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div class="left fp_box">
          <h3 class="b-b-p-1">其他情况</h3>
          <el-input
            style="width:50%"
            type="textarea"
            :autosize="{ minRows: 1.3, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea"
          ></el-input>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="serve()" type="success" icon="el-icon-circle-check">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryWaitNotice,
  userList,
  noticeForTryOn,
  userListByDept,
  noticeWindow
} from "../../api/javaApi";
import {
  exportMethod,
  personnel,
  province,
  city,
  site,
  hospital,
  allSite
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      tryOnDate: null,
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
        saleProductName: null,
        scUserNameList: [],
        userId: null,
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists: [],
        hospitalId: null
      },
      userDialog: false,
      memberId: null,
      textarea: null,
      tryOnProductData: [],
      loading: true
    };
  },
  mounted() {
    this.pageList();
    this.userList();
    this.provinceList();
  },
  methods: {
    noticeToTryOn(id) {
      this.memberId = id;
      let data = {
        memberId: id
      };
      noticeWindow(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.tryOnProductData = res.data.data;
            this.userDialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消
    cancel() {
      this.userDialog = false;
      this.memberId = null;
      this.textarea = null;
      this.tryOnDate = null;
    },
    // 保存
    serve() {
      if (!!this.tryOnDate || !!this.textarea) {
        let data = {
          memberId: this.memberId,
          noticeTime: this.tryOnDate,
          note: this.textarea
        };
        debugger;
        noticeForTryOn(data)
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
                message: "通知成功！",
                center: true
              });
              this.cancel();
              this.pageList(this.pages.currentPage, this.pages.pageSize);
            }
          })
          .catch(errr => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请输入任意一项！",
          center: true
        });
      }
    },
    //列表 //查询
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
        saleProductName: this.seach.saleProductName || null,
        userId: this.seach.userId || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      queryWaitNotice(data)
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
    }
  }
};
</script>

<style scoped lang="scss">
.fp_box {
  width: 50%;
}
</style>
