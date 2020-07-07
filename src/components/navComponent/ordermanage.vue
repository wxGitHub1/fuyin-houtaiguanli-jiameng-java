<!-- 订单管理 -->
<template>
  <div>
    <el-form :inline="true" size="mini" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input v-model="seach.userName" class="w-150" placeholder="请输入姓名" @input="listenKey()"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话" @input="listenKey()"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select
          clearable
          class="w-150"
          v-model="seach.status"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="病单类型">
        <el-select
          clearable
          class="w-150"
          v-model="seach.prescriptionType"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.prescriptionTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="折扣优惠">
        <el-select
          clearable
          class="w-150"
          v-model="seach.favorable"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.favorableList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input class="w-150" v-model="seach.orderNum" placeholder="请输入订单编号" @input="listenKey()"></el-input>
      </el-form-item>

      <el-form-item label="付款类型">
        <el-select
          clearable
          class="w-150"
          v-model="seach.payType"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.payTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否欠款">
        <el-select
          clearable
          class="w-150"
          v-model="seach.owe"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.oweList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="下单人">
        <el-input
          class="w-150"
          v-model="seach.createUserName"
          placeholder="请输入下单人姓名"
          @input="listenKey()"
        ></el-input>
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
      <el-form-item label="医院名称">
        <el-select
          clearable
          class="w-150"
          v-model="seach.hospitalId"
          placeholder="请先选择测评中心"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.hospitalLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单日期">
        <el-date-picker
          class="w-250"
          v-model="seach.createTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="listenKey()"
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
          @change="listenKey()"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="是否加急">
        <el-select
          clearable
          class="w-150"
          v-model="seach.quickly"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.quicklyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
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
    <!-- table -->
    <el-table
      border
      :data="clientData"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
      sizi="mini"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="orderNum" label="订单编号" min-width="150"></el-table-column>
      <el-table-column align="center" prop="userName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="status" label="订单状态"></el-table-column>
      <el-table-column align="center" prop="createOrderTime" label="下单时间"></el-table-column>
      <el-table-column align="center" prop="createUserName" label="下单人"></el-table-column>
      <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
      <el-table-column align="center" prop="hospitalName" label="医院"></el-table-column>
      <el-table-column align="center" prop="type" label="订单类型"></el-table-column>
      <el-table-column align="center" prop="payType" label="付款类型"></el-table-column>
      <el-table-column align="center" prop="owe" label="是否欠款"></el-table-column>
      <el-table-column align="center" prop="prescriptionType" label="病单类型"></el-table-column>
      <el-table-column align="center" prop="oweMoney" label="下欠金额"></el-table-column>
      <el-table-column align="center" prop="favorable" label="折扣优惠金额" width="130"></el-table-column>
      <el-table-column align="center" prop="should" label="应收金额"></el-table-column>
      <el-table-column align="center" prop="refund" label="是否退款"></el-table-column>
      <el-table-column align="center" prop="refundSum" label="退款金额"></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            @click="printTicket(scope.row.orderNum)"
            type="primary"
            size="mini"
            icon="el-icon-receiving"
          >打印小票</el-button>
          <el-button
            @click="details(scope.row.orderNum)"
            size="mini"
            type="info"
            icon="el-icon-document"
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
      title="订单详情"
      :visible.sync="dialogDepartmentDetails"
      center
      :close-on-click-modal="false"
      width="80%"
      :before-close="returnOn"
    >
      <h3 class="new-title">客户信息</h3>
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="customerName" label="客户姓名"></el-table-column>
        <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="source" label="客户来源"></el-table-column>
        <el-table-column align="center" prop="cognition" label="客户初始认知"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
        <el-table-column align="center" prop="isBlack" label="黑名单"></el-table-column>
        <el-table-column align="center" prop="address" label="家庭住址"></el-table-column>
        <el-table-column align="center" prop="school" label="就读学校"></el-table-column>
        <el-table-column align="center" prop="memberModeCN" label="客户当前类型"></el-table-column>
        <el-table-column align="center" prop="memberTypeCN" label="就诊类型"></el-table-column>
      </el-table>
      <!-- <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.customerName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{Details.phone}}</span>
        <span>客户来源:</span>
        <span class="margin-r-20">{{Details.source || "暂无数据"}}</span>
      </div>
      <div class="margin-t-10">
        <span>性别:</span>
        <span class="margin-r-20">{{Details.sex}}</span>
        <span>黑名单:</span>
        <span class="margin-r-20">{{Details.isBlack}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{Details.address}}</span>
        <span>就读学校:</span>
        <span class="margin-r-20">{{Details.school}}</span>
        <span>客户当前类型:</span>
        <span class="margin-r-20">{{Details.memberModeCN}}</span>
        <span>就诊类型:</span>
        <span>{{Details.memberTypeCN}}</span>
      </div> -->

      <h3 class="new-title">病单信息</h3>
      <el-table :data="PatientInformation" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="prescriptionId" label="病单编号" min-width="100"></el-table-column>
        <el-table-column align="center" prop="pProvinceName" label="省份"></el-table-column>
        <el-table-column align="center" prop="pCityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="prescriptionSiteName" label="测评中心"></el-table-column>
        <el-table-column prop="hospitalNmae" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
        <el-table-column prop="pCreateTime" label="创建时间" min-width="100"></el-table-column>
      </el-table>
      <h3 class="new-title">
        订单信息
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="bujiaoManey()"
          size="mini"
          class="right"
          id="margin-l-20"
          v-if="orderInformation.oweMoney > 0"
        >补交欠款</el-button>
        <el-button
          type="primary"
          icon="el-icon-receiving"
          size="mini"
          class="right"
          v-if="orderInformation.printAddMoney === 1"
          @click="printTicket_bj(paymentMethod.orderNum)"
        >打印补交小票</el-button>
      </h3>
      <div>
        <span>订单编号:</span>
        <span class="margin-r-20">{{orderInformation.orderNum}}</span>
        <span>订单状态:</span>
        <span class="margin-r-20">{{orderInformation.oStatus}}</span>
        <span>下单人员:</span>
        <span class="margin-r-20">{{orderInformation.oCreateUser}}</span>
        <span>下单时间:</span>
        <span class="margin-r-20">{{orderInformation.oCreateTime}}</span>
      </div>
      <div class="margin-t-10">
        <span>应收金额合计:</span>
        <span class="margin-r-20">{{orderInformation.should}}</span>
        <span>下欠金额:</span>
        <span class="margin-r-20">{{orderInformation.oweMoney}}</span>
        <span>拉卡拉:</span>
        <span class="margin-r-20">{{orderInformation.lakala}}</span>
        <span>现金:</span>
        <span class="margin-r-20">{{orderInformation.cash}}</span>
        <span>转账:</span>
        <span class="margin-r-20">{{orderInformation.transfer}}</span>
      </div>
      <div class="margin-t-10">
        <span>是否加急:</span>
        <span class="margin-r-20">{{orderInformation.quickly || "暂无数据"}}</span>
        <span>订单备注:</span>
        <span class="margin-r-20">{{orderInformation.remark || "暂无数据"}}</span>
      </div>
      <h3 class="new-title">退款信息</h3>
      <el-table :data="refundRecordDto" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="nickname" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="price" label="退款金额"></el-table-column>
        <el-table-column prop="createTime" label="退款时间"></el-table-column>
        <el-table-column prop="createUserName" label="退款人员"></el-table-column>
        <el-table-column prop="reason" label="退款原因"></el-table-column>
      </el-table>
      <h3 class="new-title">折扣优惠</h3>
      <el-table :data="favorableDto" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="productName" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="sum" label="折扣金额"></el-table-column>
        <el-table-column prop="refundTime" label="折扣时间"></el-table-column>
        <el-table-column prop="user" label="折扣人员"></el-table-column>
        <el-table-column prop="reason" label="折扣原因"></el-table-column>
      </el-table>
      <el-table class="margin-t-20" :data="prescriptions" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="name" label="产品名" min-width="230"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="type" label="产品分类"></el-table-column>
        <el-table-column prop="productOrderTypeCN" label="下单类型"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <!-- <el-table-column prop="number" label="产品数量"></el-table-column> -->
        <el-table-column label="产品尺寸" align="center" min-width="90">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.print === 1 ? true : false "
              @click="orderDetails(scope.row)"
              size="mini"
              type="info"
              icon="el-icon-document"
            >详情</el-button>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="标准价格"></el-table-column>
        <el-table-column prop="actual" label="实际价格"></el-table-column>
        <el-table-column prop="favorable" label="折扣金额"></el-table-column>
        <!-- <el-table-column prop="recordActual" label="退款金额"></el-table-column> -->
        <el-table-column prop="favorableRemark" label="特殊要求"></el-table-column>
        <el-table-column prop="deliveryTime" label="交货时间" min-width="200"></el-table-column>
        <el-table-column label="操作" min-width="130">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.print === 1"
              size="mini"
              type="primary"
              @click="printFormDatas(scope.row.saleProductId)"
              icon="el-icon-document"
            >打印订货单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <h3 class="new-title">客户确认签字</h3>
      <div class="signatureImg">
         <img :src="imgUrl" alt="图片"/> 
         <el-image :src="imgUrl">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image> 
      </div>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="returnOn()" type="primary" icon="el-icon-back">返回</el-button>
        <el-button
          type="success"
          icon="el-icon-receiving"
          @click="printTicket(paymentMethod.orderNum)"
        >打印小票</el-button>
        <el-button type="warning" @click="dialogRefund=true" icon="el-icon-bank-card">退款</el-button>
        <el-button
          type="primary"
          :disabled="Details[0].updateOrder === 0"
          icon="el-icon-circle-close"
          @click="cancelOrder"
        >取消订单</el-button>
        <el-button :disabled="Details[0].updateOrder === 0" type="warning" @click="changeOrder()">修改订单</el-button>
      </div>
    </el-dialog>
    <!-- dialog 补交欠款-->
    <el-dialog
      title="补交欠款"
      :visible.sync="dialogMakeUpTheArrears"
      center
      :close-on-click-modal="false"
      width="70%"
    >
      <h3 class="new-title">付款方式</h3>
      <el-row>
        <el-col :span="2" id="input-title">
          <span>现金金额：</span>
        </el-col>
        <el-col :span="3">
          <el-input-number
            :min="0"
            style="width：100%"
            size="small"
            v-model="paymentMethod.xj"
            @change="calculation"
          ></el-input-number>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>转账金额：</span>
        </el-col>
        <el-col :span="3">
          <el-input-number
            :min="0"
            style="width：100%"
            size="small"
            v-model="paymentMethod.zz"
            @change="calculation"
          ></el-input-number>
        </el-col>
        <el-col :span="2" style="width: 7%;line-height: 30px">
          <span>拉卡拉金额：</span>
        </el-col>
        <el-col :span="3">
          <el-input-number
            :min="0"
            style="width：100%"
            size="small"
            v-model="paymentMethod.lkl"
            @change="calculation"
          ></el-input-number>
        </el-col>
      </el-row>
      <div class="clearfix margin-t-10">
        <span class="left">合计：{{paymentMethod.total}}</span>
        <span class="right">当前下欠：{{orderInformation.oweMoney}}</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMakeUp()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-circle-check" @click="addMakeUp()">确认补交</el-button>
      </div>
    </el-dialog>
    <!-- dialog 退款-->
    <el-dialog
      title="退款"
      :visible.sync="dialogRefund"
      center
      :close-on-click-modal="false"
      width="70%"
    >
      <el-table :data="refundData" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="name" label="产品名" min-width="100"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="type" label="产品分类"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <el-table-column prop="model" label="产品型号"></el-table-column>
        <el-table-column prop="price" label="标准价格" min-width="100"></el-table-column>
        <el-table-column prop="actual" label="实际价格" min-width="100"></el-table-column>
        <el-table-column label="退款金额" min-width="150" align="center">
          <template slot-scope="scope">
            <!-- <el-input-number
              :min="0"
              @change="handleChange"
              style="width：100%"
              size="small"
              v-model="scope.row.amount"
            ></el-input-number>-->
            <input
              class="input"
              type="text"
              v-model="scope.row.amount"
              @change="handleChange"
              oninput="value=value.replace(/[^\d.]/g,'')"
            />
          </template>
        </el-table-column>
      </el-table>
      <h3 class="new-title">是否退加急费</h3>
      <el-radio-group v-model="refund.quickly">
        <el-radio label="1">退加急</el-radio>
        <el-radio label="0">不退</el-radio>
      </el-radio-group>
      <h3 class="new-title">退款原因</h3>
      <el-input type="textarea" v-model="refund.reason" placeholder="请输入退款原因" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRefund()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-circle-check" @click="addRefund()">确认退款</el-button>
      </div>
    </el-dialog>
    <!-- dialog 产品尺寸-->
    <el-dialog
      title="产品尺寸"
      :visible.sync="dialogSizeDetailsView"
      center
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="clearfix">
        <div v-for="(item,index) in productSizeList" :key="index" class="cpSize">
          <span class="span">{{item.key}}：</span>
          <span class="span">{{item.value || "暂无数据"}}</span>
        </div>
      </div>
    </el-dialog>
    <!-- dialog 打印小票-->
    <el-dialog
      title="打印小票详情"
      :visible.sync="dialogPrintTicket"
      center
      :close-on-click-modal="false"
      top="4%"
      :before-close="quxiao"
    >
      <el-row>
        <el-col :span="8" class="outBox">
          <div id="printTest1">
            <div class="xiaopiao" v-if="dyxp.fw">
              <h2>服务收费清单</h2>
              <div class="border-tb"></div>
              <div class="clearfix">
                <span class="left">客户姓名：{{receipt.memberName}}</span>
                <span class="right">性别：{{receipt.sex}}</span>
              </div>
              <div>出生日期：{{receipt.birthday}}</div>
              <hr class="dashed" />
              <div>医院：{{receipt.hospitalName}}</div>
              <hr />
              <h3>检测项目</h3>
              <hr class="dashed" />
              <div class="clearfix" v-for="(item,index) in isXiangMu" :key="index">
                <div class="left">{{item.name}}</div>
                <div class="right font-b">金额：{{item.price}}</div>
              </div>
              <hr />
              <h3>会员</h3>
              <hr class="dashed" />
              <div class="clearfix" v-for="(item,index) in isVip" :key="index">
                <span class="left">{{item.name}}</span>
                <span class="right font-b">{{item.price}}</span>
              </div>
              <hr />
              <div class="clearfix">
                <span class="left">应收金额合计：</span>
                <span class="right font-b">{{receipt.moneyPrintOrderDetailDtos[isIndex].should}}</span>
              </div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">已收金额合计：</span>
                <span
                  class="right font-b"
                >{{transactionType_fw.lakala+transactionType_fw.cash+transactionType_fw.transfer}}</span>
              </div>
              <div>拉卡拉：{{transactionType_fw.lakala}}</div>
              <div>现金：{{transactionType_fw.cash}}</div>
              <div>转账：{{transactionType_fw.transfer}}</div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">下欠金额：</span>
                <span class="right font-b">{{transactionType_fw.oweMoney}}</span>
              </div>
              <hr />
              <div>订单编号：{{receipt.orderNum}}</div>
              <div>打印时间：{{realTime}}</div>
              <hr />
              <div>该产品不在医保、合疗、商业保险报销范围内，如有需求可提供正式增值税发票</div>
              <!-- <div>地址：西安市莲湖区西关正街晨光御苑A座24楼</div>
              <div>咨询电话:029-88651627</div>-->
              <hr />
              <div>客户签字确认</div>
              <div class="qzUrlImg">
                <!-- <el-image :src="qianziImg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>-->
              </div>
            </div>
            <div class="xiaopiao margin-t-20" v-if="dyxp.cp">
              <h2>产品收费清单</h2>
              <div class="border-tb"></div>
              <div class="clearfix">
                <span class="left">客户姓名：{{receipt.memberName}}</span>
                <span class="right">性别：{{receipt.sex}}</span>
              </div>
              <div>出生日期：{{receipt.birthday}}</div>
              <hr class="dashed" />
              <div>医院：{{receipt.hospitalName}}</div>
              <hr />
              <h3 class="margin-0">产品</h3>
              <div
                class="clearfix"
                v-for="(item,index) in receipt.moneyPrintOrderDetailDtos[isIndex].bases"
                :key="index"
              >
                <hr class="dashed" />
                <div>{{item.name}}-{{item.nickname}}</div>
                <div class="font-b">金额：{{item.price}}</div>
              </div>
              <hr />
              <div class="clearfix">
                <span class="left">应收金额合计：</span>
                <span class="right font-b">{{receipt.moneyPrintOrderDetailDtos[isIndex].should}}</span>
              </div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">已收金额合计：</span>
                <span
                  class="right font-b"
                >{{transactionType_cp.lakala+transactionType_cp.cash+transactionType_cp.transfer}}</span>
              </div>
              <div>拉卡拉：{{transactionType_cp.lakala}}</div>
              <div>现金：{{transactionType_cp.cash}}</div>
              <div>转账：{{transactionType_cp.transfer}}</div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">下欠金额：</span>
                <span class="right font-b">{{transactionType_cp.oweMoney}}</span>
              </div>
              <hr />
              <div>订单编号：{{receipt.orderNum}}</div>
              <div>打印时间：{{realTime}}</div>
              <hr />
              <div>该产品不在医保、合疗、商业保险报销范围内，如有需求可提供正式增值税发票</div>
              <!-- <div>地址：西安市莲湖区西关正街晨光御苑A座24楼</div>
              <div>咨询电话:029-88651627</div>-->
              <hr />
              <div>客户签字确认</div>
              <div class="qzUrlImg">
                <!-- <el-image :src="qianziImg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>-->
              </div>
            </div>
            <div class="xiaopiao margin-t-20" v-if="dyxp.jj">
              <h2>加急收费清单</h2>
              <div class="border-tb"></div>
              <div class="clearfix">
                <span class="left">客户姓名：{{receipt.memberName}}</span>
                <span class="right">性别：{{receipt.sex}}</span>
              </div>
              <div>出生日期：{{receipt.birthday}}</div>
              <hr class="dashed" />
              <div>医院：{{receipt.hospitalName}}</div>
              <hr />
              <div
                class="clearfix"
                v-for="(item,index) in receipt.moneyPrintOrderDetailDtos[0].bases"
                :key="index"
              >
                <span class="left">{{item.name}}</span>
                <span class="right font-b">金额：{{item.price}}</span>
              </div>
              <hr />
              <div class="clearfix">
                <span class="left">应收金额合计：</span>
                <span class="right font-b">{{receipt.moneyPrintOrderDetailDtos[0].should}}</span>
              </div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">已收金额合计：</span>
                <span
                  class="right font-b"
                >{{transactionType_jj.lakala+transactionType_jj.cash+transactionType_jj.transfer}}</span>
              </div>
              <div>拉卡拉：{{transactionType_jj.lakala}}</div>
              <div>现金：{{transactionType_jj.cash}}</div>
              <div>转账：{{transactionType_jj.transfer}}</div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">下欠金额：</span>
                <span class="right font-b">{{transactionType_jj.oweMoney}}</span>
              </div>
              <hr />
              <div>订单编号：{{receipt.orderNum}}</div>
              <div>打印时间：{{realTime}}</div>
              <hr />
              <div>该产品不在医保、合疗、商业保险报销范围内，如有需求可提供正式增值税发票</div>
              <!-- <div>地址：西安市莲湖区西关正街晨光御苑A座24楼</div>
              <div>咨询电话:029-88651627</div>-->
              <hr />
              <div>客户签字确认</div>
              <div class="qzUrlImg">
                <!-- <el-image :src="qianziImg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>-->
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16" style="padding:0 20px;">
          <!-- <div> -->
          <span class="dd">订单备注：</span>
          <!-- <el-input  v-model="remarks" placeholder="请输入内容"></el-input> -->
          <el-input
            size="mini"
            style="width:83%"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="remarks"
          ></el-input>
          <div class="signature">
            <span>请在设备上签字确认</span>
          </div>
          <div class="clearfix margin-t-20">
            <el-button class="left">清空</el-button>
            <el-button type="success" class="right">确认</el-button>
          </div>
          <!-- </div> -->
          <!-- <div style="page-break-after:always">我是第一个分页</div>
          <div style="page-break-after:always">我是第二个分页</div>-->
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-receiving" v-print="'#printTest1'">打印</el-button>
      </div>
    </el-dialog>
    <!-- dialog 打印补交小票-->
    <el-dialog
      title="打印补交小票详情"
      :visible.sync="dialogPrintTicketBj"
      center
      :close-on-click-modal="false"
      top="4%"
      :before-close="quxiao_bj"
    >
      <el-row>
        <el-col :span="8" class="outBox">
          <div id="printTest2">
            <div class="xiaopiao margin-t-20">
              <h2>补交收费清单</h2>
              <div class="border-tb"></div>
              <div class="clearfix">
                <span class="left">客户姓名：{{bj_obj.memberName}}</span>
                <span class="right">性别：{{bj_obj.sex}}</span>
              </div>
              <div>出生日期：{{bj_obj.birthday}}</div>
              <hr class="dashed" />
              <div>医院：{{bj_obj.hospitalName}}</div>
              <hr />
              <h3 class="margin-0">{{bj_obj.moneyPrintOrderDetailDtos[0].type}}</h3>
              <div
                class="clearfix"
                v-for="(item,index) in bj_obj.moneyPrintOrderDetailDtos[0].bases"
                :key="index"
              >
                <hr class="dashed" />
                <div>{{item.name}}-{{item.nickname}}</div>
                <div>交付日期：{{item.deliveryTime}}</div>
                <div class="font-b">金额：{{item.price}}</div>
              </div>
              <hr />
              <div class="clearfix">
                <span class="left">应收金额合计：</span>
                <span class="right font-b">{{bj_obj.moneyPrintOrderDetailDtos[0].should}}</span>
              </div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">已收金额合计：</span>
                <span
                  class="right font-b"
                >{{bj_obj.moneyPrintOrderDetailDtos[0].lakala + bj_obj.moneyPrintOrderDetailDtos[0].cash + bj_obj.moneyPrintOrderDetailDtos[0].transfer}}</span>
              </div>
              <div>拉卡拉：{{bj_obj.moneyPrintOrderDetailDtos[0].lakala}}</div>
              <div>现金：{{bj_obj.moneyPrintOrderDetailDtos[0].cash}}</div>
              <div>转账：{{bj_obj.moneyPrintOrderDetailDtos[0].transfer}}</div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">下欠金额：</span>
                <span class="right font-b">{{bj_obj.moneyPrintOrderDetailDtos[0].oweMoney}}</span>
              </div>
              <hr />
              <div>下单时间：{{bj_obj.orderCreateTime}}</div>

              <div>订单编号：{{bj_obj.orderNum}}</div>
              <div>打印时间：{{bj_obj.printTime}}</div>
              <hr />
              <div v-for="(item,index) in bj_obj.printAddMoneyDTO" :key="index">
                <div>补交时间：{{item.addMoneyTime}}</div>
                <!-- <div class="clearfix">
                <span class="left">应收下欠金额：</span>
                <span class="right font-b">{{bj_obj.printAddMoneyDTO.oweMoneyOld}}</span>
                </div>-->
                <div>拉卡拉：{{item.lakala}}</div>
                <div>现金：{{item.cash}}</div>
                <div>转账：{{item.transfer}}</div>
                <!-- <hr class="dashed" /> -->
                <!-- <div class="clearfix">
                <span class="left">补交金额：</span>
                <span class="right font-b">{{bj_obj.printAddMoneyDTO.addMoney}}</span>
                </div>-->
                <div class="clearfix">
                  <span class="left">补交后下欠金额：</span>
                  <span class="right font-b">{{item.oweMoneyNew}}</span>
                </div>
                <hr />
              </div>
              <div>该产品不在医保、合疗、商业保险报销范围内，如有需求可提供正式增值税发票</div>
              <hr />
              <div>客户签字确认</div>
              <div class="qzUrlImg">
                <!-- <el-image :src="qianziImg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>-->
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16" class="padding-t-20">
          <span class="dd">订单备注：</span>
          <el-input
            size="mini"
            style="width:83%"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="remarks"
          ></el-input>
          <div class="signature">
            <span>请在设备上签字确认</span>
          </div>
          <div class="clearfix margin-t-20">
            <el-button class="left">清空</el-button>
            <el-button type="success" class="right">确认</el-button>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao_bj()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-receiving" v-print="'#printTest2'">打印</el-button>
      </div>
    </el-dialog>
    <!-- dialog 修改订单-->
    <el-dialog
      title="修改订单"
      :visible.sync="dialogreadyOrder"
      center
      :close-on-click-modal="false"
      width="90%"
      :before-close="readyOrderCancel"
    >
      <h3 class="new-title">客户信息</h3>
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="customerName" label="客户姓名"></el-table-column>
        <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      </el-table>
      <!-- <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.customerName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>性别:</span>
        <span class="margin-r-20">{{Details.sex}}</span>
      </div> -->

      <h3 class="new-title">病单信息</h3>
      <el-table :data="currentPrescriptions" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="prescriptionId" label="病单编号" min-width="100"></el-table-column>
        <el-table-column prop="hospitalNmae" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
        <el-table-column prop="pCreateTime" label="创建时间" min-width="100"></el-table-column>
      </el-table>
      <el-row class="margin-t-10">
        <el-col :span="2">
          <el-button
            size="mini"
            style="width：100%"
            @click="salesList()"
            icon="el-icon-s-grid"
            type="primary"
            disabled
          >选择产品</el-button>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>下单人:</span>
        </el-col>
        <el-col :span="3">
          <el-input
            style="width：100%"
            v-model="orderingPerson"
            size="small"
            placeholder="请输入姓名"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="5" style="line-height: 30px;margin-left:20px">
          <el-checkbox v-model="jjChecked" @change="isJiaJi">加急费300元</el-checkbox>
        </el-col>
      </el-row>
      <el-table class="margin-t-10" :data="detailFormList" border max-height="500" :header-row-class-name="'headerClass-two'">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="source" label="产品分类"></el-table-column>
        <el-table-column prop="recordNumber" label="备案编号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <el-table-column prop="model" label="产品型号"></el-table-column>
        <el-table-column prop="price" label="标准价格"></el-table-column>
        <el-table-column prop="actual" label="实际价格" min-width="100">
          <template slot-scope="scope">
            <input
              class="input"
              type="text"
              v-model="scope.row.actual"
              @change="changeMoney()"
              oninput="value=value.replace(/[^\d.]/g,'')"
            />
          </template>
        </el-table-column>
        <el-table-column prop="deliveryTime" label="交货日期" min-width="150">
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row.orderType  == 3 ? true : false"
              v-model="scope.row.deliveryTime"
              @blur="deliveryTimeDate(scope.row,scope.$index)"
              style="width:100%"
              :clearable="false"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="qualification" label="产品资质"></el-table-column>
        <el-table-column prop="price" label="下单类型" min-width="100">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.productOrderType == 5 ? false : true"
              clearable
              v-model="scope.row.productOrderType"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in productOrderTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <div v-else>服务产品</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="290">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.source =='会员卡' || scope.row.source =='测评服务' ? false:true"
              @click="tsyq(scope)"
              type="primary"
            >特殊要求</el-button>
            <el-button
              size="mini"
              v-if="scope.row.process < 3 ? true : false "
              @click="sizeEntry(scope)"
              type="primary"
            >尺寸录入</el-button>
            <el-button size="mini" @click="zkyh(scope)" type="primary">折扣优惠</el-button>
            <!-- <el-button
              size="mini"
              @click.native.prevent="deleteRow(scope.$index,detailFormList)"
              type="danger"
            >删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <h3 class="new-title">付款方式</h3>
      <el-row>
        <el-col :span="2" id="input-title">
          <span>现金金额：</span>
        </el-col>
        <el-col :span="3">
          <el-input-number
            :min="0"
            style="width：100%"
            size="small"
            v-model="paymentMethod.xj"
            @change="calculation"
          ></el-input-number>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>转账金额：</span>
        </el-col>
        <el-col :span="3">
          <el-input-number
            :min="0"
            style="width：100%"
            size="small"
            v-model="paymentMethod.zz"
            @change="calculation"
          ></el-input-number>
        </el-col>
        <el-col :span="2" style="width: 7%;line-height: 30px">
          <span>拉卡拉金额：</span>
        </el-col>
        <el-col :span="3">
          <el-input-number
            :min="0"
            style="width：100%"
            size="small"
            v-model="paymentMethod.lkl"
            @change="calculation"
          ></el-input-number>
        </el-col>
      </el-row>
      <div class="clearfix margin-t-10">
        <span class="left margin-r-20">实收金额合计：{{paymentMethod.total}}</span>
        <span class="left margin-r-20">应收金额合计：{{paymentMethod.totalAmountReceivable}}</span>
        <span class="left margin-r-20">下欠金额：{{paymentMethod.arrears}}</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="readyOrderCancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="modefiy_orderingStart()" type="success" icon="el-icon-circle-check">确认</el-button>
      </div>
    </el-dialog>
    <!-- dialog 特殊要求-->
    <el-dialog
      title="特殊要求"
      :visible.sync="dialogSpecialRequirements"
      center
      :close-on-click-modal="false"
      :before-close="specialRequirementsCancel"
    >
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="specialRequirements"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="specialRequirementsCancel()"
          type="primary"
          icon="el-icon-circle-close"
        >取消</el-button>
        <el-button
          @click="specialRequirementsConfirm()"
          type="success"
          icon="el-icon-circle-check"
        >保存</el-button>
      </div>
    </el-dialog>
    <!-- dialog 折扣优惠-->
    <el-dialog
      title="折扣优惠"
      :visible.sync="dialogDiscount"
      center
      :close-on-click-modal="false"
      :before-close="specialRequirementsCancel"
    >
      <div>标准价格：{{zhekouyouhui.price}}</div>
      <div class="margin-t-20">
        优惠折扣：
        <el-select
          size="mini"
          @change="discount_fuc(discount)"
          v-model="discount"
          placeholder="请选择"
        >
          <el-option
            v-for="item in discountList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="margin-t-20">
        折扣后价格：
        <input
          type="text"
          class="input"
          v-model="zhekouyouhui.favorable"
          oninput="value=value.replace(/[^\d.]/g,'')"
        />
      </div>
      <h3 class="margin-b-20">折扣原因</h3>
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="favorableRemark"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="specialRequirementsCancel()"
          type="primary"
          icon="el-icon-circle-close"
        >取消</el-button>
        <el-button @click="discountConfirm()" type="success" icon="el-icon-circle-check">确认</el-button>
      </div>
    </el-dialog>
    <!-- dialog 产品尺寸-->
    <el-dialog
      title="产品尺寸"
      :visible.sync="dialogSizeDetails"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="sizeCancel"
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
          <span class="span">取型人：</span>
          <div class="div">
            <el-select clearable v-model="productSize.shapeUser" placeholder="请选择" size="mini">
              <el-option
                v-for="item in productSize.shapeUserList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sizeCancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-circle-check" @click="entrySize()">确认</el-button>
      </div>
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
  orderList,
  cp_orderList,
  orderDetail,
  addMoney,
  refundMoney,
  orderUpdateNew,
  productShape,
  printOrderDetail,
  printAddMoney,
  sales,
  printProduct,
  selectUserListByHospitalId
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  getTime,
  province,
  city,
  site,
  allSite,
  hospital
} from "../../utils/public";
// import fuyinProduct from "../../utils/fuyinProduct";
import fuyinProduct_html from "../commonComponent/fuyinProduct";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import naVComponent from "./page";
import naVComponent_variable from "./page_variable";
export default {
  data() {
    return {
      discount: null,
      discountList: naVComponent_variable.discount,
      isCancel: false, //详情中退款、取消、修改按钮状态   :disabled="isCancel" 按钮加入显示状态
      //
      dialogreadyOrder: false,
      // dialogselectProduct: false,
      seachProduct: {
        name: null,
        productTypeValue: null,
        qualification: null,
        productTypes: [
          { name: "会员年卡", id: 101 },
          { name: "测评服务", id: 201 },
          { name: "定制产品", id: 301 },
          { name: "自制成品", id: 303 },
          { name: "外购成品", id: 302 }
        ],
        qualificationList: [
          { name: "一类", id: 1 },
          { name: "二类", id: 2 }
        ]
      },
      jjChecked: false,
      orderingPerson: null,
      productData: [],
      detailFormList: [],
      currentPrescriptions: [],
      pagesProduct: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      dialogSpecialRequirements: false,
      dialogDiscount: false,
      dialogSizeDetails: false,
      specialRequirements: null,
      zhekouyouhui: {
        favorable: null
      },
      favorableRemark: null,
      currentNamberId: null,
      //
      isVip: [],
      isXiangMu: [],
      isIndex: 1,
      receipt: {},
      dyxp: {
        fw: false,
        cp: false,
        jj: false
      },
      realTime: null,
      remarks: null,
      qianziImg: null,
      refund: {
        sum: null,
        quickly: null,
        reason: null
      },
      refundReason: null,
      refundData: [],
      paymentMethod: {
        orderNum: null,
        orderId: null,
        xj: 0,
        zz: 0,
        lkl: 0,
        total: 0,
        lx: null,
        totalAmountReceivable: 0,
        arrears: 0
      },
      imgUrl: javaApi.ExportUrl + "1b6101a5-0d6b-40df-9a85-e401c63e4283_1.jpg",
      clientData: [],
      seach: {
        userName: null,
        phone: null,
        status: null,
        statusList: [
          { name: "已确认", id: "0" },
          { name: "处理中", id: 1 },
          { name: "已取消", id: 2 },
          { name: "已结单", id: 3 },
          { name: "取型", id: 310 },
          { name: "修型", id: 320 },
          { name: "加工", id: 330 },
          { name: "入库", id: 340 },
          { name: "出库", id: 350 },
          { name: "试穿", id: 360 }
        ],
        createTime: null,
        deliveryTime: null,
        payType: null,
        payTypeList: [
          { name: "混付", id: "0" },
          { name: "拉卡拉", id: 1 },
          { name: "现金", id: 2 },
          { name: "转账", id: 3 }
        ],
        owe: null,
        oweList: [
          { name: "是", id: 1 },
          { name: "否", id: "0" }
        ],
        orderNum: null,
        createUserName: null,
        prescriptionType: null,
        prescriptionTypeList: [
          { name: "其他", id: "0" },
          { name: "住院", id: 1 },
          { name: "门诊", id: 2 }
        ],
        favorable: null,
        favorableList: [
          { name: "有", id: 1 },
          { name: "没有", id: "0" }
        ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalId: null,
        hospitalLists: [],
        quickly: null,
        quicklyList: [
          { id: 0, name: "否" },
          { id: 1, name: "是" }
        ]
      },
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      dialogDepartmentDetails: false,
      dialogPrintTicket: false,
      dialogPrintTicketBj: false,
      dialogMakeUpTheArrears: false,
      dialogSizeDetailsView: false,
      dialogRefund: false,
      Details: [{
        address: null,
        birthday: null,
        isBlack: null,
        memberName: null,
        phone: null,
        school: null,
        sex: null,
        source: null
      }],
      prescriptions: [],
      favorableDto: [],
      refundRecordDto: [],
      PatientInformation: [],
      orderInformation: {
        should: null,
        oStatus: null,
        oCreateUser: null,
        oCreateTime: null,
        orderNum: null,
        oweMoney: null,
        lakala: null,
        cash: null,
        transfer: null,
        remark: null
      },
      productSizeList: [],
      // productSize: {
      //   wc: [],
      //   kd: [],
      //   gd: [],
      //   yq: [],
      //   zb: []
      // },
      productSize: {
        list: [],
        radio: "",
        shapeUserList: [],
        shapeUser: ""
      },
      loading: true,
      //打印订货单
      // product: fuyinProduct.isShow,
      dialogOrderFrom: false,
      productTitle: {},
      printFormData: {},
      // printFormDataMap: null,
      sizeMapList: [],
      bj_obj: {
        printAddMoneyDTO: {},
        moneyPrintOrderDetailDtos: [{}]
      },
      transactionType_jj: null,
      transactionType_cp: null,
      transactionType_fw: null,
      /**新增data */
      productOrderTypeList: [
        { name: "处方产品", id: 1 },
        { name: "新增产品", id: 2 },
        { name: "更换产品", id: 3 },
        { name: "赠送产品", id: 4 }
      ],
      cpOnly_show: false
    };
  },
  components: {
    "fuyinProduct-html": fuyinProduct_html
  },
  mounted() {
    this.init();
    this.pageList();
    this.provinceList();
  },
  methods: {
    changeSizeVal_fuc(value, index) {
      naVComponent.changeSizeVal_fuc(this, value, index);
    },
    discount_fuc(value) {
      naVComponent.discount_fuc(this, value);
    },
    // 取消打印
    cancelPrinting() {
      this.dialogOrderFrom = false;
      // this.product.product_kaifa = false;
      // for (let key in this.product) {
      //   this.product[key] = false;
      // }
    },
    // 打印订货单
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
    //监听按键
    listenKey() {
      document.onkeydown = e => {
        let key = window.event.keyCode;
        if (key === 13) {
          this.pageList(this.pages.currentPage, this.pages.pageSize);
          document.onkeydown = undefined;
          // return false
        }
      };
    },
    //修改实际价格改变价格
    changeMoney() {
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    entrySize() {
      naVComponent.entrySize(this);
    },
    sizeCancel() {
      this.dialogSizeDetails = false;
      this.productSize.list = [];
      this.productSize.shapeUserList = [];
      this.productSize.radio = null;
      this.productSize.shapeUser = null;
      // for (let key in this.productSize) {
      //   this.productSize[key] = [];
      // }
    },
    bujiaoManey() {
      this.dialogMakeUpTheArrears = true;
      this.paymentMethod.totalAmountReceivable = this.orderInformation.oweMoney;
    },
    deliveryTimeDate(value, index) {
      this.$set(this.detailFormList, index, value);
      console.log(value);
    },
    specialRequirementsConfirm() {
      this.detailFormList.forEach((obj, index) => {
        if (index == this.cpIndex) {
          obj.demand = this.specialRequirements;
        }
      });
      this.specialRequirementsCancel();
      console.log(this.detailFormList[0]);
    },
    discountConfirm() {
      naVComponent.discountConfirm(this);
    },
    specialRequirementsCancel() {
      naVComponent.specialRequirementsCancel(this);
    },
    sizeEntry(obj) {
      naVComponent.sizeEntry(this, obj);
    },
    tsyq(obj) {
      this.dialogSpecialRequirements = true;
      this.cpIndex = obj.$index;
      console.log(obj.$index);
      this.specialRequirements = obj.row.demand;
    },
    zkyh(obj) {
      naVComponent.zkyh(this, obj);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    readyOrderCancel() {
      this.dialogreadyOrder = false;
      this.currentPrescriptions = [];
      this.detailFormList = [];
      this.jjChecked = null;
      this.paymentMethod.total = 0;
      this.paymentMethod.totalAmountReceivable = 0;
      this.paymentMethod.arrears = 0;
      this.paymentMethod.xj = 0;
      this.paymentMethod.zz = 0;
      this.paymentMethod.lkl = 0;
    },
    modefiy_orderingStart() {
      naVComponent.modefiy_orderingStart(this);
    },
    changeOrder() {
      // debugger;
      this.currentNamberId = this.orderInformation.orderId;
      this.currentPrescriptions = this.PatientInformation;
      this.orderingPerson = this.orderInformation.oCreateUser;
      this.paymentMethod.xj = this.orderInformation.cash;
      this.paymentMethod.lkl = this.orderInformation.lakala;
      console.log(this.paymentMethod.lkl);
      this.paymentMethod.zz = this.orderInformation.transfer;
      this.paymentMethod.total =
        parseFloat(this.orderInformation.lakala) +
        parseFloat(this.orderInformation.cash) +
        parseFloat(this.orderInformation.transfer);
      this.paymentMethod.totalAmountReceivable = this.orderInformation.should;
      this.paymentMethod.arrears = this.orderInformation.oweMoney;
      let productObj = this.prescriptions;
      productObj.forEach(obj => {
        obj.source = obj.type;
        obj.sourceType = obj.orderType;
      });
      this.detailFormList = productObj;
      if (this.orderInformation.quickly == "是") {
        this.jjChecked = true;
      } else {
        this.jjChecked = false;
      }
      this.dialogreadyOrder = true;
    },
    salesList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        qualification: this.seachProduct.qualification,
        name: this.seachProduct.name || null,
        type: this.seachProduct.productTypeValue || null
      };
      sales(data)
        .then(res => {
          // debugger
          this.productData = res.data.data;
          this.pagesProduct.total = res.data.total;
          this.dialogselectProduct = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    quxiao() {
      this.dialogPrintTicket = false;
      this.isVip = [];
      this.isXiangMu = [];
    },
    quxiao_bj() {
      this.dialogPrintTicketBj = false;
    },
    returnOn() {
      this.dialogDepartmentDetails = false;
      this.PatientInformation = [];
      this.isCancel = false;
    },
    handleChange(value) {
      console.log(value);
    },
    // switchTitle(item,index) {
    //   this.$emit("acceptTitle", item);
    // },
    orderDetails(obj) {
      if (obj.sizeMapList == []) {
        this.$message({
          type: "warning",
          message: "暂无尺寸信息！",
          center: true
        });
      } else {
        this.productSizeList = obj.sizeMapList;
        this.dialogSizeDetailsView = true;
      }
    },
    cancelOrder() {
      this.$confirm("是否取消此订单, 是否继续?", "提示", {
        center: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: this.paymentMethod.orderId,
            status: 2
          };
          orderUpdateNew(data)
            .then(res => {
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.returnOn();
                this.details(this.paymentMethod.orderNum);
                this.$message({
                  type: "success",
                  message: "取消订单成功！"
                });
              }
            })
            .then(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "未取消订单！"
          // });
        });
    },
    cancelRefund() {
      this.dialogRefund = false;
      this.refund.reason = null;
      this.refund.quickly = null;
      // this.refundData.forEach((obj,index) => {
      //   obj.amount = 0;
      //   });
    },
    addRefund() {
      naVComponent.addRefund(this);
    },
    cancelMakeUp() {
      this.dialogMakeUpTheArrears = false;
      this.paymentMethod.lx = null;
      this.paymentMethod.xj = 0;
      this.paymentMethod.zz = 0;
      this.paymentMethod.lkl = 0;
      this.paymentMethod.total = 0;
    },
    addMakeUp() {
      let data = {
        orderNum: this.paymentMethod.orderNum,
        payType: this.paymentMethod.lx,
        lakala: this.paymentMethod.lkl,
        cash: this.paymentMethod.xj,
        transfer: this.paymentMethod.zz,
        all: this.paymentMethod.total
      };
      if (data.lakala + data.cash + data.transfer > data.all) {
        this.$message({
          type: "warning",
          message: "支付金额大于下欠金额请重新输入！",
          center: true
        });
      } else {
        addMoney(data)
          .then(res => {
            this.cancelMakeUp();
            this.returnOn();
            this.details(this.paymentMethod.orderNum);
            this.$message({
              type: "success",
              message: "补交成功！",
              center: true
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    calculation() {
      naVComponent.calculation(this);
    },
    printTicket_bj(num) {
      this.realTime = getTime();
      printAddMoney({ orderNum: num })
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.bj_obj = res.data.data;
            this.dialogPrintTicketBj = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    printTicket(num) {
      this.realTime = getTime();
      printOrderDetail({ orderNum: num })
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.dialogPrintTicket = true;
            console.log(res);
            this.receipt = res.data.data;
            let isShow = res.data.data.moneyPrintOrderDetailDtos;
            // debugger;
            if (isShow.length > 1) {
              if (isShow[0].type == "加急费") {
                this.dyxp.jj = true;
                this.transactionType_jj = isShow[0];
              } else {
                this.dyxp.jj = false;
              }
              if (isShow[1].type == "产品") {
                this.dyxp.cp = true;
                this.isIndex = 1;
                this.transactionType_cp = isShow[1];
              } else {
                this.dyxp.cp = false;
              }
              if (isShow[1].type == "服务") {
                this.dyxp.fw = true;
                this.isIndex = 1;
                this.transactionType_fw = isShow[1];
                isShow[1].bases.forEach(obj => {
                  if (obj.saleType == "会员卡") {
                    this.isVip.push({ name: obj.name, price: obj.price });
                  }
                  if (obj.saleType == "测评") {
                    this.isXiangMu.push({ name: obj.name, price: obj.price });
                  }
                });
              } else {
                this.dyxp.fw = false;
              }
            } else {
              this.dyxp.jj = false;
              if (isShow[0].type == "产品") {
                this.dyxp.cp = true;
                this.isIndex = 0;
                this.transactionType_cp = isShow[0];
              } else {
                this.dyxp.cp = false;
              }
              if (isShow[0].type == "服务") {
                this.dyxp.fw = true;
                this.isIndex = 0;
                this.transactionType_fw = isShow[0];
                isShow[0].bases.forEach(obj => {
                  if (obj.saleType == "会员卡") {
                    this.isVip.push({ name: obj.name, price: obj.price });
                  }
                  if (obj.saleType == "测评") {
                    this.isXiangMu.push({ name: obj.name, price: obj.price });
                  }
                });
              } else {
                this.dyxp.fw = false;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(orderNum) {
      this.paymentMethod.orderNum = orderNum;
      let data = {
        orderNum: orderNum
      };
      orderDetail(data)
        .then(res => {
          console.log(res);
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.Details[0] = res.data.data.orderDetailDto;
            // this.Details.address = res.data.data.orderDetailDto.address;
            // this.Details.birthday = res.data.data.orderDetailDto.birthday;
            // this.Details.isBlack = res.data.data.orderDetailDto.black;
            // this.Details.phone = res.data.data.orderDetailDto.phone;
            // this.Details.sex = res.data.data.orderDetailDto.sex;
            // this.Details.school = res.data.data.orderDetailDto.school;
            // this.Details.source = res.data.data.orderDetailDto.source;
            this.prescriptions = res.data.data.saleDetailDtos;
            this.refundData = res.data.data.saleDetailDtos;
            this.PatientInformation.push(res.data.data.orderDetailDto);
            this.orderInformation = res.data.data.orderDetailDto;
            this.favorableDto = res.data.data.favorableDtos;
            this.refundRecordDto = res.data.data.refundDetails;
            this.paymentMethod.orderId = res.data.data.orderDetailDto.orderId;
            this.imgUrl = javaApi.ExportUrl + res.data.data.orderDetailDto.url;
            console.log(this.imgUrl);
            this.refundData.forEach(obj => {
              obj.amount = 0;
            });
            if (
              this.orderInformation.oStatus == "已取消" ||
              this.orderInformation.oStatus == "已结单"
            ) {
              this.isCancel = true;
            } else {
              this.isCancel = false;
            }
            this.dialogDepartmentDetails = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //订单列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = naVComponent_variable.orderSearchData_fuc(
        this,
        pageIndex,
        pageSize
      );
      this.loading = true;
      if (this.cpOnly_show) {
        orderList(data)
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
      } else {
        cp_orderList(data)
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
      }
    },
    //导出excel
    exportExcels() {
      let data = naVComponent_variable.orderSearchData_fuc(this);
      const lsyObj = {
        method: "post",
        fileName: "订单信息",
        // url: javaApi.dd_ExportUrl,
        data: data
      };
      if (this.cpOnly_show) {
        lsyObj.url = javaApi.dd_ExportUrl;
      } else {
        lsyObj.url = javaApi.cp_ExportUrl;
      }
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
    //当前页面变化时
    handleCurrentChangeProduct(num) {
      this.pagesProduct.currentPage = num;
      let pageIndex = this.pagesProduct.currentPage;
      let pageSize = this.pagesProduct.pageSize;
      this.salesList(pageIndex, pageSize);
    },
    //页面条数发生变化时
    handleSizeChangeProduct(val) {
      this.pagesProduct.pageSize = val;
      let pageIndex = this.pagesProduct.currentPage;
      let pageSize = this.pagesProduct.pageSize;
      this.salesList(pageIndex, pageSize);
    },
    isJiaJi() {
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    ysMoney() {
      let s = 0;
      this.detailFormList.forEach(val => {
        s += Number(val.actual);
      }, 0);
      if (this.jjChecked == true) {
        s += 300;
      }
      return s;
    },
    xqMoney() {
      let s =
        this.paymentMethod.totalAmountReceivable - this.paymentMethod.total;
      return s.toFixed(2);
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
    init() {
      if (this.$route.name == "evaluationPage") {
        this.cpOnly_show = false;
      } else {
        this.cpOnly_show = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.signatureImg {
  width: 328px;
  height: 117px;
}
.cpSize {
  float: left;
  width: 46%;
  margin: 10px 2%;
  .span {
    display: inline-block;
    margin-bottom: 10px;
    width: 140px;
  }
  .span2 {
    display: inline-block;
    margin-bottom: 10px;
    width: 140px;
  }
  .div {
    display: inline-block;
    width: 69%;
    
  }
  .div2 {
    display: inline-block;
    width: 20%;
  }
}
.xiaopiao {
  padding: 10px;
  border: 1px solid #bbbbbb;
  box-sizing: border-box;
  div {
    padding: 1.5px 0;
  }
  h2 {
    margin: 10px auto;
    font-weight: bold;
    text-align: center;
  }
  .border-tb {
    padding-top: 2px;
    padding-bottom: 0px;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .dashed {
    border: 1px dashed #000;
    margin: 1px;
  }
  .qzUrlImg {
    // width: 100%;
    // height: 50px;
    // background: url(../../images/qianzi.png) no-repeat center;
    // background-size:100% 100%;
    text-align: center;
    img {
      width: 100%;
    }
  }
}
.margin-t-20 {
  margin-top: 20px;
}
.outBox {
  max-height: 600px;
  overflow-x: hidden;
}
#printTest {
  font-size: 12px;
}
.font-b {
  font-weight: bold;
}
.dd {
  display: inline-block;
  width: 15%;
  line-height: 50px;
  text-align: center;
}
.signature {
  width: 100%;
  height: 460px;
  line-height: 460px;
  text-align: center;
  border: 1px solid #bbbbbb;
  margin-top: 20px;
}
.margin-0 {
  margin: 0;
}
.input-title {
  width: 5.5%;
  line-height: 30px;
}
.input {
  border: 1px solid #ebeef5;
  color: #606266;
  padding: 5px;
  width: 80%;
}
//打印订货单
.title {
  color: #000;
  text-align: center;
}
.border {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #000000;
  color: #000;
  font-size: 14px;
  tr td {
    border: 1px solid #000;
    padding: 8.5px;
    text-align: center;
  }
  .background-y {
    background: #e26b0a;
  }
  .border-b {
    font-weight: 600;
    font-size: 14px;
  }
  .first-tr {
    width: 80px;
  }
}
#margin-l-20 {
  margin-left: 20px;
}
hr {
  margin: 1px;
}
</style>
