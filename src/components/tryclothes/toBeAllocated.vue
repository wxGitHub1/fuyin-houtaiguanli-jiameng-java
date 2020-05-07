// 待分配
<template>
  <div>
    <!-- seach -->
    <el-row class="search">
      <el-col :span="2" class="input-title">
        <span class="time_style">客户姓名:</span>
      </el-col>
      <el-col :span="2">
        <el-input v-model="seach.memberName" style="width：100%" size="small" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">联系电话:</span>
      </el-col>
      <el-col :span="2">
        <el-input size="small" style="width：100%" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">交货日期:</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width:100%"
          size="small"
          v-model="seach.delivery"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">产品昵称：</span>
      </el-col>
      <el-col :span="2">
        <el-input
          size="small"
          style="width：100%"
          v-model="seach.saleProductName"
          placeholder="请输入产品昵称"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          size="small"
          @click="pageList(pages.currentPage,pages.pageSize)"
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
      </el-col>
    </el-row>
    <el-row class="client_info">
      <el-col :span="2" id="input-title">
        <span class="time_style">省份:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          size="small"
          clearable
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
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">城市:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          size="small"
          clearable
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
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">站点名称:</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.siteValue" placeholder="请先选择城市" @change="hospitalList(seach.siteValue)">
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">医院:</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.hospitalId" placeholder="请先选择站点">
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table
      border
      :data="clientData"
      max-height="650"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="countProduct" label="产品数量"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="details(scope.row.memberId)"
            type="primary"
            size="small"
            icon="el-icon-s-custom"
          >分配试穿人</el-button>
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
    <!-- 分配试穿人弹框 -->
    <el-dialog
      title="分配试穿人"
      :visible.sync="acceptanDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
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
  selectTryOnPendingAssignList,
  selectProductListInTryOnPendingAssign,
  userListByDept,
  insertTryOn
} from "../../api/javaApi";
import { exportMethod, province, city, site,allSite,hospital } from "../../utils/public";
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
        hospitalLists:[],
        hospitalId:null,
      },
      acceptanDialog: false,
      userDialog: false,
      productData: [],
      nameList: [],
      myValue: [],
      saleProductId: null,
      loading: true
    };
  },
  mounted() {
    this.pageList();
    this.personnel();
    this.provinceList();
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
            this.cancel();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
            this.$message({
              type: "success",
              message: "分配成功！",
              center: true
            });}
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
      this.personnel(obj.siteId)
    },
    cancel() {
      this.acceptanDialog = false;
    },
    details(id) {
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
      selectTryOnPendingAssignList(data)
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
          this.pages.total = dataList.total;}
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
    //根据市获取站点列表
    async siteList(id) {
      this.seach.siteLists = await allSite(null,id);
    },
    //根据站点获取医院列表
    async hospitalList(id) {
      this.seach.hospitalLists = await hospital(id);
    },
    //获取试穿人员列表
    personnel(siteId) {
      let data = {
        deptId: 6,
        siteId:siteId
      };
      userListByDept(data)
        .then(res => {
          console.log(res);
          let data = res.data.data;
          let list=[]
          data.forEach(element => {
            list.push({ label: element.username, key: element.id });
          });
          this.nameList=list
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
  .time_style {
    letter-spacing: 1px;
    font-size: 14px;
    color: #606266;
  }
}
.office_performance {
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  letter-spacing: 1px;
  color: #606266;
}
.client_table {
  margin-top: 10px;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
.total {
  background: #ff9800;
  color: #606266;
  height: 50px;
  line-height: 50px;
  span {
    margin-left: 20px;
  }
}
.input-title {
  width: 5.5%;
  line-height: 30px;
}
.box {
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
.box > div {
  width: 50%;
}
.client_info {
  text-align: center;
  padding: 10px 0;
  span {
    font-size: 14px;
    letter-spacing: 1px;
    color: #606266;
  }
}
.xc_box > div {
  display: inline-block;
  width: 49%;
}
// .font_b_14{
//   font-size: 14px;
//   font-weight: bold;
// }
</style>
