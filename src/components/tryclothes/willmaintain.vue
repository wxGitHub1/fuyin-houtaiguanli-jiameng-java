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
        <span class="time_style">联系方式:</span>
      </el-col>
      <el-col :span="2">
        <el-input size="small" style="width：100%" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">报修日期:</span>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="seach.deliveryTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">维修方式:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          style="width:100%"
          size="small"
          clearable
          v-model="seach.repairType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.repairTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">维修人员:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          style="width:100%"
          size="small"
          clearable
          v-model="seach.doRepairUserId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.wxUserList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="input-title">
        <span class="time_style">报修人员:</span>
      </el-col>
      <el-col :span="2">
        <el-select
          style="width:100%"
          size="small"
          clearable
          v-model="seach.repairUserId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.scUserNameList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
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
    <el-row class="client_info margin-t-10">
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
        <span class="time_style">测评中心:</span>
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
        <el-select clearable size="small" v-model="seach.hospitalId" placeholder="请先选择测评中心">
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
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="repairType" label="维修方式"></el-table-column>
      <el-table-column align="center" prop="repairReason" label="维修说明"></el-table-column>
      <el-table-column align="center" prop="repairUserName" label="报修人员"></el-table-column>
      <el-table-column align="center" prop="doRepairUserName" label="维修人员"></el-table-column>
      <el-table-column align="center" prop="repairBeginTime" label="报修时间"></el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button @click="noticeToTryOn(scope.row.repairId)" type="primary" size="small">维修完成</el-button>
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
  </div>
</template>

<script>
import { selectPendingDoRepairList, overRepair } from "../../api/javaApi";
import { exportMethod, personnel, province, city, site,hospital,allSite  } from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
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
        repairTypeList: [
          { name: "现场维修", id: 1 },
          { name: "返厂维修", id: 2 },
          { name: "无法维修", id: 3 }
        ],
        repairType: null,
        scUserNameList: [],
        wxUserList: [],
        repairUserId: null,
        doRepairUserId: null,
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists:[],
        hospitalId:null,
      },
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
      this.$confirm("是否确认维修已完成?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          debugger;
          let data = {
            repairId: id
          };
          overRepair(data)
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
                  message: "提交完成!"
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
            message: "已取消!"
          });
        });
    },
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        repairBeginTime:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        repairEndTime:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        repairType: this.seach.repairType || null,
        repairUserId: this.seach.repairUserId || null,
        doRepairUserId: this.seach.doRepairUserId || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectPendingDoRepairList(data)
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
      this.seach.siteLists = await allSite(null,id);
    },
    //根据测评中心获取医院列表
    async hospitalList(id) {
      this.seach.hospitalLists = await hospital(id);
    },
    //人员
    async userList() {
      this.seach.scUserNameList = await personnel(6);
      this.seach.wxUserList = await personnel(12);
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 10px;
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
.input-title {
  width: 5.5%;
  line-height: 30px;
}
.client_table {
  margin-top: 10px;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
