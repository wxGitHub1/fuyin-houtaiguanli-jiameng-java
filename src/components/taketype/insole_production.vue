  <!-- 鞋垫制作 -->
<template>
  <div>
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="下单类型">
        <el-select class="w-150" clearable v-model="seach.productOrderType" placeholder="请选择">
          <el-option
            v-for="item in seach.productOrderTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input class="w-150" v-model="seach.memberName" placeholder="请输入客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="医院名称">
        <el-select class="w-150" clearable v-model="seach.hospitalId" placeholder="请选择">
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品昵称">
        <el-select class="w-150" clearable v-model="seach.baseId" placeholder="请选择">
          <el-option
            v-for="item in seach.baseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单人">
        <el-input class="w-150" v-model="seach.orderUserName" placeholder="请输入下单人姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="下单日期">
        <el-date-picker
          class="w-250"
          v-model="seach.orderTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="交货日期">
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
          type="warning"
          icon="el-icon-search"
        >查询</el-button>
        <el-button type="danger" icon="el-icon-download" @click="exportExcels()">导出excel</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="clientData"
      max-height="680"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="orderTime" label="下单日期"></el-table-column>
      <el-table-column align="center" prop="deliveryTime" label="交货日期"></el-table-column>
      <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="demand" label="特殊要求"></el-table-column>
      <el-table-column align="center" prop="orderUserName" label="下单人"></el-table-column>
      <el-table-column align="center" prop="hospitalName" label="医院名称"></el-table-column>
      <el-table-column align="center" prop="footLength" label="足长"></el-table-column>
      <el-table-column align="center" prop="footWidth" label="足宽"></el-table-column>
      <el-table-column align="center" prop="height" label="身高"></el-table-column>
      <el-table-column align="center" prop="weight" label="体重"></el-table-column>
      <el-table-column align="center" prop="lzgxs" label="左足弓系数" width="100"></el-table-column>
      <el-table-column align="center" prop="rzgxs" label="右足弓系数" width="100"></el-table-column>
      <el-table-column align="center" prop="lggnfz" label="左跟骨内翻值" width="120"></el-table-column>
      <el-table-column align="center" prop="rggnfz" label="右跟骨内翻值" width="120"></el-table-column>
      <el-table-column align="center" prop="lggwfz" label="左跟骨外翻值" width="120"></el-table-column>
      <el-table-column align="center" prop="rggwfz" label="右跟骨外翻值" width="120"></el-table-column>
      <el-table-column align="center" prop="productOrderTypeCN" label="下单类型"></el-table-column>
      <el-table-column align="center" prop="actual" label="实际价格"></el-table-column>
      <el-table-column align="center" prop="refund" label="退款金额"></el-table-column>
      <el-table-column align="center" prop="orderNum" label="订单编号"></el-table-column>
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
import { makeInsole, getHospitalList } from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import { exportMethod } from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      //分页
      clientData: [],
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        memberName: null,
        phone: null,
        orderUserName: null,
        orderTime: null,
        deliveryTime: null,
        baseId: null,
        hospitalId: null,
        productOrderType: null,
        hospitalLists: [],
        baseList: [
          { name: "防护气垫C3", id: 978 },
          { name: "防护气垫C2", id: 982 },
          { name: "F1发育性防护气垫", id: 1401 }
        ],
        productOrderTypeList: [
          { name: "处方产品", id: 1 },
          { name: "新增产品", id: 2 },
          { name: "更换产品", id: 3 },
          { name: "赠送产品", id: 4 },
          { name: "服务产品", id: 5 }
        ]
      },
      loading: true
    };
  },
  mounted() {
    this.pageList();
    this.hospitalList();
  },
  methods: {
    //订单列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        orderUserName: this.seach.orderUserName || null,
        orderTimeBegin:
          this.seach.orderTime == null ? null : this.seach.orderTime[0],
        orderTimeEnd:
          this.seach.orderTime == null ? null : this.seach.orderTime[1],
        deliveryTimeBegin:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        deliveryTimeEnd:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        baseId: this.seach.baseId || null,
        hospitalId: this.seach.hospitalId || null,
        productOrderType: this.seach.productOrderType || null
      };
      this.loading = true;
      makeInsole(data)
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
    //导出excel
    exportExcels() {
      let data = {
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        orderUserName: this.seach.orderUserName || null,
        orderTimeBegin:
          this.seach.orderTime == null ? null : this.seach.orderTime[0],
        orderTimeEnd:
          this.seach.orderTime == null ? null : this.seach.orderTime[1],
        deliveryTimeBegin:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        deliveryTimeEnd:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        baseId: this.seach.baseId || null,
        hospitalId: this.seach.hospitalId || null,
        productOrderType: this.seach.productOrderType || null
      };
      const lsyObj = {
        method: "post",
        fileName: "鞋垫制作统计表",
        url: javaApi.makeInsoleExport,
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
    //获取医院名
    async hospitalList() {
      getHospitalList()
        .then(res => {
          this.seach.hospitalLists = res.data.data;
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
