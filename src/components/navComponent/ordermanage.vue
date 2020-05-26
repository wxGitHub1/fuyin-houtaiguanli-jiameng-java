<!-- 订单管理 -->
<template>
  <div>
    <el-form :inline="true" size="mini" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input
          v-model="seach.userName"
          style="width：100%"
          placeholder="请输入姓名"
          @input="listenKey()"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input
          style="width：100%"
          v-model="seach.phone"
          placeholder="请输入联系电话"
          @input="listenKey()"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select clearable v-model="seach.status" placeholder="请选择" @change="listenKey()">
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
        <el-select clearable v-model="seach.favorable" placeholder="请选择" @change="listenKey()">
          <el-option
            v-for="item in seach.favorableList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input
          style="width：100%"
          v-model="seach.orderNum"
          placeholder="请输入订单编号"
          @input="listenKey()"
        ></el-input>
      </el-form-item>
      
      <el-form-item label="付款类型">
        <el-select clearable v-model="seach.payType" placeholder="请选择" @change="listenKey()">
          <el-option
            v-for="item in seach.payTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否欠款">
        <el-select clearable v-model="seach.owe" placeholder="请选择" @change="listenKey()">
          <el-option
            v-for="item in seach.oweList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="下单人">
        <el-input v-model="seach.createUserName" placeholder="请输入下单人姓名" @input="listenKey()"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-select
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
      </el-form-item>
      <el-form-item label="城市">
        <el-select
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
      </el-form-item>
      <el-form-item label="测评中心">
        <el-select
          clearable
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
          style="width: 100%"
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
          style="width: 100%"
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
      max-height="620"
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
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            @click="printTicket(scope.row.orderNum)"
            type="primary"
            size="small"
            icon="el-icon-receiving"
          >打印小票</el-button>
          <el-button
            @click="details(scope.row.orderNum)"
            size="small"
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
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
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
      </div>
      <h3 class="b-b-p-1">病单信息</h3>
      <el-table :data="PatientInformation" border style="width: 100%">
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
      <h3 class="b-b-p-1">
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
      <h3 class="b-b-p-1">退款信息</h3>
      <el-table :data="refundRecordDto" border style="width: 100%">
        <el-table-column prop="nickname" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="price" label="退款金额"></el-table-column>
        <el-table-column prop="createTime" label="退款时间"></el-table-column>
        <el-table-column prop="createUserName" label="退款人员"></el-table-column>
        <el-table-column prop="reason" label="退款原因"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">折扣优惠</h3>
      <el-table :data="favorableDto" border style="width: 100%">
        <el-table-column prop="productName" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="sum" label="折扣金额"></el-table-column>
        <el-table-column prop="refundTime" label="折扣时间"></el-table-column>
        <el-table-column prop="user" label="折扣人员"></el-table-column>
        <el-table-column prop="reason" label="折扣原因"></el-table-column>
      </el-table>
      <el-table class="margin-t-20" :data="prescriptions" border>
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
        <el-table-column prop="recordActual" label="退款金额"></el-table-column>
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
      <!-- <h3 class="b-b-p-1">客户确认签字</h3>
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
          :disabled="Details.updateOrder === 0"
          icon="el-icon-circle-close"
          @click="cancelOrder"
        >取消订单</el-button>
        <el-button :disabled="Details.updateOrder === 0" type="warning" @click="changeOrder()">修改订单</el-button>
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
      <h3 class="b-b-p-1">付款方式</h3>
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
      <el-table :data="refundData" border>
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
      <h3 class="b-b-p-1">是否退加急费</h3>
      <el-radio-group v-model="refund.quickly">
        <el-radio label="1">退加急</el-radio>
        <el-radio label="0">不退</el-radio>
      </el-radio-group>
      <h3 class="b-b-p-1">退款原因</h3>
      <el-input type="textarea" v-model="refund.reason" placeholder="请输入退款原因" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRefund()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-circle-check" @click="addRefund()">确认退款</el-button>
      </div>
    </el-dialog>
    <!-- dialog 订单详情-->
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
          <div id="printTest">
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
        <el-button type="success" icon="el-icon-receiving" v-print="'#printTest'">打印</el-button>
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
          <div id="printTest">
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
              <div class="clearfix">
                <span class="left">应收下欠金额：</span>
                <span class="right font-b">{{bj_obj.oweMoneyOld}}</span>
              </div>
              <div>拉卡拉：{{bj_obj.lakala}}</div>
              <div>现金：{{bj_obj.cash}}</div>
              <div>转账：{{bj_obj.transfer}}</div>
              <hr class="dashed" />
              <div class="clearfix">
                <span class="left">补交金额：</span>
                <span class="right font-b">{{bj_obj.addMoney}}</span>
              </div>
              <div class="clearfix">
                <span class="left">下欠金额：</span>
                <span class="right font-b">{{bj_obj.oweMoneyNew}}</span>
              </div>
              <hr />
              <div>补交时间：{{bj_obj.addMoneyTime}}</div>
              <div>订单编号：{{bj_obj.orderNum}}</div>
              <div>打印时间：{{bj_obj.printTime}}</div>
              <hr />
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
        <el-button type="success" icon="el-icon-receiving" v-print="'#printTest'">打印</el-button>
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
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.customerName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>性别:</span>
        <span class="margin-r-20">{{Details.sex}}</span>
      </div>
      <h3 class="b-b-p-1">病单信息</h3>
      <el-table :data="currentPrescriptions" border>
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
        <el-col :span="2" class="input-title">
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
      <el-table class="margin-t-10" :data="detailFormList" border max-height="500">
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
      <h3 class="b-b-p-1">付款方式</h3>
      <el-row>
        <el-col :span="2" class="input-title">
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
        <el-col :span="2" class="input-title">
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
        <input
          type="text"
          class="input"
          v-model="discount"
          oninput="value=value.replace(/[^\d.]/g,'')"
          @change="discount_fuc(discount)"
        />
      </div>
      <!-- <div>
        折扣价格：
        <input
          type="text"
          class="input"
          v-model="zhekouyouhui.favorable"
          oninput="value=value.replace(/[^\d.]/g,'')"
        />
      </div>-->
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
        <div v-for="item in productSize.list" :key="item.name" class="cpSize">
          <span class="span">{{item.key}}</span>
          <div class="div">
            <el-input
              v-model="item.value"
              style="width：100%"
              size="small"
              placeholder="请输入"
              oninput="value=value.replace(/[^\d.]/g,'')"
            ></el-input>
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
import { viewPage_function } from "../../router/path";
import naVComponent from "./page";
export default {
  data() {
    return {
      discount: 0,
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
      //qianziImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoMAAAEBCAYAAAAD/q/AAAAgAElEQVR4Xu2dCdh961z3vyUzJzKUyOw1F5JMkXmWN/M8HGMiEeEgkhJSmTnkmI7xNRcylxCvDBkTmVIos/KK6vpc733XstvP8+y99lprr+FzX9e5zv+c/95r3ffnXnut7/qNPxCHBCQgAQlIQAISkMBiCfzAYlfuwiUgAQlIQAISkIAEohj0IpCABCQgAQlIQAILJqAYXPDmu3QJSEACEpCABCSgGPQakIAEJCABCUhAAgsmoBhc8Oa7dAlIQAISkIAEJKAY9BqQgAQkIAEJSEACCyagGFzw5rt0CUhAAhKQgAQkoBj0GpCABCQgAQlIQAILJqAYXPDmu3QJSEACEpCABCSgGPQakIAEJCABCUhAAgsmoBhc8Oa7dAlIQAISkIAEJKAY9BqQgAQkIAEJSEACCyagGFzw5rt0CUhAAhKQgAQkoBj0GpCABCQgAQlIQAILJqAYXPDmu3QJSEACEpCABCSgGPQakIAEJCABCUhAAgsmoBhc8Oa7dAlIQAISkIAEJKAY9BqQgAQkIAEJSEACCyagGFzw5rt0CUhAAhKQgAQkoBj0GpCABCQgAQlIQAILJqAYXPDmu3QJSEACEpCABCSgGPQakIAEJCABCUhAAgsmoBhc8Oa7dAlIQAISkIAEJKAY9BqQgAQkIAEJSEACCyagGFzw5rt0CUhAAhKQgAQkoBj0GpCABCQgAQlIQAILJqAYXPDmu3QJSEACEpCABCSgGPQakIAEJCABCUhAAgsmoBhc8Oa7dAlIQAISkIAEJKAY9BqQgAQkIAEJSEACCyagGFzw5rt0CUhAAhKQgAQkoBj0GpCABCQgAQlIQAILJqAYXPDmu3QJSEACEpCABCSgGPQakIAEJCABCUhAAgsmoBhc8Oa7dAlIQAISkIAEJKAY9BqQgAQkIAEJSEACCyagGFzw5rt0CUhAAhKQgAQkoBj0GpCABCQgAQlIQAILJqAYnO7mfyTJ2ZN8O8m3kjw8yfHTXY4zl4AEJCABCUhgHwQUg/ugvvs5P5Dkwkma+/fvSf4jCf9mfK/88+4kV979lB5BAhKQgAQkIIE5ElAMTnNXqxj8wSOmjzisAhFx+G9J7pXkGdNctrOWgAQkIAEJSKBrAorBrokOdzzcxOdIcpJySoQh+9kUiKv7W4UhovA9Sa5UBOJws/ZMEpCABCQgAQmMioBicFTbsfNk7pTkwUmOSXKyIgwRi1UoNvcbYfjdJP+S5B5JnrPz2T2ABCQgAQlIQAKTI6AYnNyWbT3hkyZ5fZJLFoH4QyuxhorCrZH6BQlIQAISkMB8CCgG57OXm6wEYfjmJD+dhD9XiyHfVRRuQtDPSEACEpCABGZGQDE4sw3dYjl3TfLoJCdP0rQWNkXhLyd57hbH9KMSkIAEJCABCUyMgGJwYhvWw3RvneTxSU51gCj8aLEkknTikIAEJCABCUhgZgQUgzPb0B2Wc5go/E6SeyZ52g7H96sSkIAEJCABCYyQgGJwhJuy5ylVUXiaRkxhLUnzzSR3T/K8Pc/R00tAAhKQgAQk0BEBxWBHIGd4mDsneVzJQK7XCaIQd/FdkpwwwzW7JAlIQAISkMDiCCgGF7flWy2YjGOKU1+gEU+IIKSbydtK0eqtDuiHJSABCUhAAhIYFwHF4Lj2Y6yzuVWSJyY5baNGIaLwG0nuluTEsU7ceUlAAhKQgAQkcDgBxaBXyDYEqFF4+WIl5HvVbYxL+VnbHMjPSkACEpCABCQwDgKKwXHsw5RmcbskTy1Fq7l+qtv4rUmuOqWFOFcJTJjAzcrcXzDhNTh1CUhgJAQUgyPZiIlN45ZJnpSkZhwz/X8vbmOykV81sfU4XQlMicCxjTJPWOWfMaXJO1cJSGB8BBSD49uTKc3oDUmuuOI2/pckN1cQTmkbnevECLypJG9hlX9JkptMbP5OVwISGBkBxeDINmSC07lFkmeuuI0VhBPcSKc8GQIfKRn+iEEs9LSNdEhAAhJoTUAx2BqdX2wQQBAen+SUJduYh5SC0EtEAv0Q+HSSs5d43fsleUw/p/GoEpDAUggoBpey0/2v85rFZUWP45pYoiDsn7tnWB6BLyY5U4nTJWmLLP8ljncluciMF47o/6UF7++Mt3Z8S1MMjm9PpjwjBeGUd8+5T4HA6ZJ8Lsmpk9AektqfSxwUvb9Mo+7pHBngYfmbJBec4+Jc07gIKAbHtR9zmM06QfiZJOecw+JcgwT2TOBKSUjc+sEkX0py5j3PZ1+n/3CS889YDFbvyreT4G1xSKBXAorBXvEu9uDXS0L9sxpDSD9jSs68cLFEXLgEuiHwa0keVUQQL1nn6OawkzvKtUtXpB+d3MyPnjBtQE9SPqYYPJqXn+iAgGKwA4geYi2BmyZ5Tskyxt3x5SRnlJUEJLATgSeUODLu3R/VhbgTy7F+mVjrUygGx7o985yXYnCe+zqWVdG7mNgmrrPvJDn5WCbmPCQwUQKvTHLd8psibu7nJroOp30wAcWgV8fgBBSDgyNf1AkflORhJb6JDiUPSfKIRRFwsRLolsBrklyjHJIs4qt0e3iPNgICisERbMLSpqAYXNqOD7/e/5fkZKUm2rcWnP04PHnPOEcCr28IwDcmudocF7nwNSkGF34B7GP5isF9UF/WOXUVL2u/XW2/BBSD/fIdw9EVg2PYhYXNQTG4sA3fw3IfmOThDVfxcUkeuYd5eEoJzIGAYnAOu3j4GprelK8nobakQwK9ElAM9orXgxcCuoq9FCTQDYE/TULXEQbCsMYPdnN0j7JvAndLQsY4dSSJs6bv9JP3PSnPP38CisH57/EYVqjbYwy74BzmQOB1jThBhCFF3h3zIfDVJMdYgWE+GzqVlSgGp7JT056nYnDa++fsx0PgtUmuXqajGBzPvnQ1E13EXZH0OFsRUAxuhcsPtySgGGwJzq9JYIWAYnC+l4Qu4vnu7ehXphgc/RbNYoKKwVlso4sYAQHF4Ag2oacpfCXJD+si7omuhz2UgGLQC2QIAorBISh7jiUQUAzOd5ebLuKvJTn9fJfqysZGQDE4th2Z53wUg/PcV1c1PIFmBxKSSa41/BQ8Yw8E7prkiY0s4rsneUoP5/GQElhLQDHohTEEAcXgEJQ9xxII/Ekjgxgr4bWXsOgFrPGfiyXQPu4L2OwxLlExOMZdmd+cFIPz21NX9P0ErpfkSUnOMACYU5RzfDvJ3yf5dJIHJHn3AOf2FP0Q8B7ZD1ePuiEBxeCGoPzYTgS80e2Ezy+PmMCpS1HgmyX5oT3N8z9KgWL+Xf/8b0mwIjIvx/gJeI8c/x7NeoaKwVlv72gW541uNFvhRDokgDXwhUmw1NV7KWJsqHHY/bsKw+8l4Z/PFOvhS4eanOfZioD3yK1w+eGuCSgGuybq8dYR8EbndTEnAlcq1sDzJDlJQwjSPgyLHP/uc1Q38XfKubmP8w8tzOo9ffXejjiswpDv0crutkm+2edEPfbGBLxHbozKD/ZBQDHYB1WPuUrAG53XxFwIkPF5bJKTrVgDEVjPSEIWaJ/j1Y2kEdzA1y0nQ6Ael+RcSc5SRCrisClW67yq9bKKw88lIZv1DX1O3GMfSsB7pBfIXgkoBveKfzEn90a3mK2e7UJPk+QTJUEEgcWo1raPFxH45gFWf5AYXHdq2tY9PsnZiyiswnCd1fC7Sb6Q5PaKwgF28X+egmSgk5drisziM+1lFp50sQQUg4vd+kEXrhgcFLcn64HAO5L87IpLmCLBJGi8sofzHXTIVyW5TvlLznuDLc79gmJVxKqJMKyithnviCjk9/qgJE/Y4th+dDcChBeQgESIwYlJbr3b4fy2BLYjoBjcjpefbkdAMdiOm98aD4G3JblMEYMIphOS3HkP08M1TKFprJLPT3LLlnPA0vmsJNcoLm+ESFMUcnzW+aEk90kyhNWz5VIm/7XnJLlFifmE+UknvyIXMDkCisHJbdkkJ6wYnOS2OekGAcQTSRf0jv31JFjo9jH+Msmlihh8ZJIHdjCJqxZxe+ZinWo+FxCF/H7JnFYQdgB7zSG+VMIP4I61uSYI9XM2jyqBNQQUg14WQxBQDA5B2XMsgQCWugsVMYhl8ukdLhpR+NQkZ2uIQp4RCMJvJbm+grBD2v99qGa8IPdKXjwcEhiUgGJwUNyLPZlicLFb78I7JvB3Sc5ZYssun4RYxj7GPZP8bklqqIJQC2EfpBMy0XENI7rfn+Ti/ZzGo0rgYAKKQa+OIQgoBoeg7DmWQOCfikuRjNMz9rxg3NH0Pz5diSdErLwnyc/0fN4lHf7nS/gBMZvEC14tyVuWBMC1joOAYnAc+zD3WSgG577Drm8IAiSwkMhC/cBPlZqCfZ8X4Yc4OWURhGS9UrJGwdIN+fcm+akGWzK9HRIYnIBicHDkizyhYnCR2+6iOyZwxyRPK8Lhw0ku3PHxDzoc1qs/bbgyP5bkgjue+8rl+2/a8ThT//o3ktDf2uSRqe/kxOevGJz4Bk5k+orBiWyU0xw1gd9Ocv8iHN5V6h4ONeEuf8MIQXoknzbJLyShkPZSRzN5hCQdmDgkMDgBxeDgyBd5wi4fJIsE6KIlkOTZSW5VxCD1Bmvx6SHgdPkbvl2SPyrrwDJ4lSEWMNJzNJNH3pfkEiOdp9OaOQHF4Mw3eCTL6/JBMpIlOQ0JDE6AjiPU+yORA2GIqBpqdPkbplYjWdC4mlkLJW22dRc/LMkNS8FsGCCqOObvJPnkUFB2PM8VS+u/mjwCh7fueEy/LoFWBBSDrbDN5ksXKz1VecDU1lQsrjay589kuP1Vkgck+euWK+/yQdJyCn5NApMnQPLI5crv87eSPGTAFXX9Gz4uycOLdfBFSW66xVoQgrTLW/f8+mqSY5O8bIvj7euj3Fe5B7MOEnNMHtnXTnjetT8msSyDALWsiNU5y4bLRRT+RZJ7JPnght+pH+v6QbLl6f24BGZBgBp0P1nEIILnmQOuquvf8NmTkARD8gT9eC+d5N0brgd3Khxq/cP6tSoOOR4lcG5Ssq43POzgHzN5ZHDknvAgAloGl3ltvLw0rK/9SJuWwHVEVhvZIwp/ufQt3YSgQdKbUPIzEjicwN8mOU8RT5dNQmu6oUbXYpB5Ezd4+7IAOp/cdcPFYFHEsljF4NeT8M9ZS9kdDsM9DVGIy/gxJQt7w8MP9jGYUrKHuXKPPNVgZ/ZEElghoBhc3iWBNeG2K03pcVFwM61jVRxSdHa1kT2Wwicn+ZUNEHJ8vs/NmZ6uN9jgO35EAhL4fgJfTHKmJPSypY/wkKMPMUgNw3cWAffNUirnMxss6rwlG/ki5T5GvCB/5p9nNIpk10Nx3+H4by8xhX+2wTmG+Ah9iHENc7/9bJJzDHFSzyGBdQQUg8u7LppN0b+XhKD030yC6+WgwU328SVeqSkKucl+LcnPHWIlxApJTCKFchGQtF1ySEAC2xH42SJm+B19IgmCaMjRhxhk/i8s7lwE0f2KFW+TdZ2vhKtUMcVLJmVqzpWEeMrrlh6/8KqDc/DPl5NQmod2e/sUhk0xaBu6TXbdz/RGQDHYG9rRHvgrScjmYyDkTr/FTKsoRPxxk61uGkQhLiwyHKmF1hzGxWwB2I9K4AACuFOxevGb+0DpWjEkrL7EIIkjzy/r4oWUAtfclzYZrygvmjCp1sGPN7545yS/luTcjfvVOmGIu/2RpbvLJudt8xlegmuiSPW81LIy3D8Rpg9sc2C/I4EuCCgGu6A4rWOQbXdMmTKuYVzA2w46H/x5EZX1zbu+dWNt5BxkPpLxR8bcycsbuUVVtyXt5yXw/wlgva8ZtMTsXn5gMH2JQV5M8U5codwj7pDkhA3XtmodpEVe7WzSPMQ5kzwlySXLyy/Pveazr967vpDk+CRPL27bDadx5McQglhyb1xiF7k/YhVEDNayMnpMjsToB/okoBjsk+44j92FGKwr+8Mkd1uJJ2y+eSMMucYoW2O84DivB2c1DQIkW1BXkN8TLtHrDzztphj815IF3NUUfjXJ75W1IcTutMWBYUHxbbhwj7lvksce8n1E568nuVSSHynfWxWGr09C6z/i+LoYCL27FMsf5yJu+xQl3pqXacvKdEHZY+xEQDG4E75JfrlLMQgArISPKF0EuMEh/NZdV9yoeRv+SLFwvGaS9Jy0BPZDgN/LNYv17Eklm3/ImTQrArT1KBw03wuVGqYII4ou4yredPyvUpKmejuIS+ae9DcbHKAKQxJZztAQhlgKX5cEN3NXgpDYRsTnPUsGNf9NiE51cZNVzD3SIYG9EFAM7gX7Xk9KPE7tf0k8X40f7GJS3NQJ3saFhfsZYdgM4OYc1SWDMKSlFq6vj3Zxco8hgRkTaNYYpH7eSwZeazPZ4b1Jfrrj8+PipSMHguiipQbhpqdAEH6oeCi4v3Bfw/L3sU0PUO5ZlLehK0qNhe5aEHJcQma4NzI37sNVDCJIyaRGaCsKt9g4P9oNAcVgNxyndJQ+xeAqh+YDhJv0ulgd3uTfmARXkaJwSleScx2KAFYrEiOwJJEARqzcPw918nKeWh6K0A/c1c/t+PyUqaLOIPcJXKrE7m0z7p3k0eXlk2MgtihhtY0g/IkS03eNhiB8bbEQfm6byRzxWe6DxE/jSanubb5CIgsMFIUdwvZQmxFQDG7GaU6f4s3zNGVB1N6q7pU+1tgUgwRnf768efN23BSG3LwVhX3sgMecAwESDyjBsq9M4tuUAtFY+vsqD/XQRns9vAWrVQk22cc3F+titezhWieecJuxThDiwUCkdSkIm253/kwmNeWDqiikqD/nQ/QjwB0S6JWAYrBXvKM8+JBisGlNwPJHrULGtYo7GXfQumLWWArvteVb/ShhOykJdECARC3aQHK/RphsK3B2nUKzhy4ZsLzMdT3os4wgZPBvsqe3HecvVQ7O2LC4kSxCB5JtBoIQlzExmlVYPrjERm9znMM+23xRpuc7LnJa9JH1XEUhXhyyo/l7BWFX5D3OWgKKweVdGLXuHyvvs9QLb7Z/UOIGD7ImXCDJ75fkk3WikL/jZu6QwJIJ/HFpH4kFnReqTbr+dMmrJp3xvMCKRbJD16MLMcicEISI19raDRGFeCb+b5txtlLiBjHGunHP8/L699sc5JDPNmsM1q5MxFfjqaEu4ptKPDe8KdpPOSGyuB0S6IWAYrAXrKM+aLPodJ9ikJ6g1PeqAdKHWRMOEoUEUuMmocj1NrE/o94AJyeBLQmMKXnkH0oP4C2XcOTHuxKDVRB+sHgd+G9eRimYv+09BEHIcUiyQ4hTmLqLwtCXKPGBtcYglkAEbB2IQs5drZPcB/GUPK90TzkSph+QwLYEFIPbEpv+5z+dBDcIe4+rgiDmPgZCEwvCNuepovBqazqc8GaPq3mTkhF9rMdjSmAfBPadPHLZUu4F4YKVjfp7mxaF3oZXl2KQ85IEgkWVOEcGdRIRYdsKQvoZX7oc46Ci1tusk882W3QeVmOQUjS3LB4WBCLJLMQuYp1E4Dok0BkBxWBnKCdzoCeUQtF99wpeDZCubptNQNXYHx6EzQ4n3AARhfdRFG6C0c/MgMCNkrxoj8kj70ly8UYrNerj9TGwuFGWinFckt/p4CS0oqPNG/cQLHtfLDUMt6laQKely5W54KrFS7HrwNKLy3kTrwkv1JwfVzIv7riX2Q9eihWEu+6E3/8vAorBZV4MNbED9wMlHYjv63o0A6Q/VeJgtj0HN3LcI7WvJ9+vmcd0ZOAt2SGBORPYd/IIcWrVe8Cft3mp22Zf7t/IIH5AEXHbfP+gz2IdJGGtJoLg9qVO46aC8M8arf9osUmh6l0HVRzguKnXBOsmAhAxihj/chGlCsJdd8LvKwYXfg00rXaULyCLrevRDJDmJtb2JoqVkPZSuI5Xk0yepiDsets83sgIYBG6bnkJelx5ORpyis3fMW7KvjKZSRSr1sAuxSD3j1ckoTB1s5g0AnGTQUeUag2kygH3oV1Hmz7P3PtYC+IU97GCcNdd8PvfR0DL4DIviBrPx+q77kLCMSnJwEOsBkjTR3XX9nPczOlfyrFryzvcPj+6zC101QshgJuWWDcs4r9Y4s2GWjovW8cWNysuySslwTrWx+hLDDJXYpFx99aWc3hEEJyPOmIhP1bKulCqBv4PK//suv42YpBzcj/lPshaqiCkdR8tPnUZ77orC/++YnCZF0BTDHbddB6ivL0S59JHE3bcxojCvmMel3lluOoxEeCBjysQEUNWPUIAi9BQg0SFs2zhztxlXn2KwSoIP1BCTvhvkmGwuGLtPGiQPXy/sn6K5l8syT/ussjy3bZicJ0gbNO+r4MleIi5EVAMzm1HN1tP32Jwm7Iym834+z/VjHkkmYR6hg4JzI0A7dReWsQIpUe67gd8FK8aL4hVrM8yVMyD3zHt5BgkfhAa0vXAq/DqRoYx95GfPCB+cNUqiBWRuMYuxi5isApC5v3u8lJMTDZhOJ/tYnIeY5kEFIPL3Pdmf+I+LIP1ZrdpgPS2u/ClJNV1w0PyktsewM9LYAIEsIBTTonfEXFviMMhRzMJ7L09i1HWyXoZ9Bnu6wUPSx+xiTXDuMbe4Wqtg9ATWtvhXoY91kASOLqwCnKOXcUgxyCp7uolHIc50sv5vkm4tzsksDUBxeDWyGbxBd4gz9qj+6eZoNKH2Hxukls0SjNcOMnfzmJnXIQE/psA9eh+ocSr0Y0H69mQo5k88rIklLnpaxD+Ua2BfYpB5k/8MnUIa0LJJ5IQ14wgJFnkxUnO3Ph7hCpZ3V2NLsRgFYR3KC3s+G+qK1BlAYunQwJbEVAMboVrNh+m/+Wdeoy7a1oUcBmft2NyHO9DpcwCLqznJLltx+fwcBLYNwGs3lik9pE8QqFlEhVqEhhuyHf0CGRIMYjF75XlvlQF4euLNZBah7VQNfF4Tyw9iYkZ7Gp0JQaZD91RcK9zP+c6uWFxhSsIu9qthRxHMbiQjV6zzGbcHS6GLmv21WMTpE0fVW6oXQ8sgfTwZFAz7EJdn8DjSWCPBPadPIJ1jOzlPpLA1mEdUgxy/gs2snJ5DiL8GLXIPfcu5kSR/q5Hl2KQudFRiixvSoQhCIktxa3vkMDGBBSDG6Oa3QebrtzPl16YXSzy7sWlwts15Q6IbeljNMVgH9bHPubsMSWwKYF9J4/831LSZpMuGZuu6bDPDS0GqyCkG0jzHlU7ldy4iMUu1rZ6jK7FIMenvzGWW/aLlnuUnOkqxrEPBh5zZAQUgyPbkAGnQ7HpH9+wJdI206oire+HyMeTnKdMjJif820zST8rgZETeExJpNhX8sjXk5ym3B94caQtWp+Dl8jHlxPQEelJfZ6sHJu4wOcluUpZJ/8bi+BVk9CHuK/RhxikM8nNG32jH5HkN0v7ur7W4XFnREAxOKPN3HIpJGAQa4dbBBfJrZOcuOUx1n28lq3h2urzIUL9tRqLiAClBptDAnMhQEzb9Yrbj4f6QwdeWDPul3qDuCL7HHdrhJP8UiMpoq9zIgSpI3i7RqJIjR/8SmlB18ww7nIefYhB5ocgfEjp7YyFkzhC7vEkAjkkcCgBxeCyL5DmDb8rV3HzmH3WJlMMLvvanfvqP1zi2nhRI3mDlo5Djb5eFA+bPzHL1RrYtxhcJwQRvLXCAkLqnUku2xPwvsQg06U+Ii30eDlmHT+ThC42DgkoBr0GDiTQtauYmziunmptvEeP7h7iYqprmAfnRdxnCcyEAN176OLD7wjr1NDJUc3SU1iVTj4A16YYrPcNxEzXAyFIDcObNSyCJ5SMXFpokpRWE0oenOS3u55AR3UGD5vWpYqYrfUH4clLukMCBxLQMrjsi6NrCwB9jk/dQxziul3iTZ6YRx4YbypxPsveTVc/FwK4+nAL7ytecGgXMftWxSBrJl7yuB7cm4jqF5QXx+oSRgjSWYQ+5/w9XT2Ij+TvSYD7qSS8bHY5+rQMMk/EO11cKJPD/ZGyW7iLHRJQDHoNHEigeeP/h+IqaYtrKBcx86vZ0LjRCD6ndqJDAnMg0Cw2jSgkZnCoccskz25Y929Tkiz6Pv+xpYsGIowaotQ5/GZHJz1TKd6NyKQuHwOR1BSC9VQIQjKMqa/IZyiaj6u1S0HYtxhkLVg4qVPJeulKcokkVF1wSGAtAS2DXhjNZvS7uISGdBFjRaB2IW60PpNUvDoksA8C+4wX3IeLGMa3L90z+DPrRwziadh1IASxBl6pkTHMCyQC+8nFIrh6jgcmeXijZV3X8YNDiEHWRFLgs8q6fyMJ/ZW5Xzok8D8IKAa9KLqyBAzpIqZbQC0HgZg9m9sogZkQ2He84D5cxGwdWb3PLHvYlRi8TJKXJqHXcHUL00mEYtpHdVN5exGkfcQPDiUGcRfz0ozVtXYnoRWfgnAmN4sul6EY7JLmdI/VhasYd8opGq4VYgf7GlgvEIDc4CiOS8C0QwJzIEDSwsP2FC+4+mKIQBsq1qwpBkmaoYhyW8vgGUsf5/s1Oopwr3hzSRz50gYXSo0fPFX5bJfxg0OJQaaOhRVhy7OeGor0Xj5KCG+Ax4/MjYBicG472m49XbiKm4Ky77p/xMAcU8Qgrh5iBh0SmAOB/1MsV4gXXJW494Ya/5zk9I0EsPpyN8T5m2KQIvLE6VHvb5uBCLxjqa93roZbmPsFCRWvSLKJEKzn7Ct+cEgxyB6SQMJ9kuc99/rLJ/nUNmD97PwJKAbnv8ebrLALV3GzHzEdBPpK6DhnErqPEODN2zrlZbyxbbLLfmYKBLB001uWuLZrJiEkYoiB6CSLmThchCi16RBkQ42mGCSR7cJbiMEqAhGCtTQM82Ydf106c7RNAFmNH3xXsbbtwmVIMcg8EYTsL1nTjJcUwfzVXRbhd+dFQDE4r/3cZTVNyx49LSnbsukgoYOG7n33I2Y+xMDQrYBrl5ZZNTtw07n6OQmMlcBFSwYoLzoUVb9gEYV9zxeXLJKTvGgAACAASURBVHUN6WDBIJHsiqVWXd/nrsfnhfS55T+wjlL26qjOGYeJwL8rCSlP29IauG69uFVhVOMHud8dvwOYocUgUz1dqaWIYGZwv76v8YM77OLMvqoYnNmG7rAcyhBcrNzwsPJdOcnbNjxe7QbSdz/ic5Tm8cQLci5u+FgCHBKYAwEy8nlIc21jEbz6QItq9hOvmbbELQ45bprk+WXtd0mCiDtonKFYuW6UhHtCfY5hCaR8ytPLP//U0QKwUmIprcW3eXHGeksJnDZjH2KQedKdBKFdO6tQtuh3FYRttnB+31EMzm9P266IOBKKN5+0uFcQeBfY8GDNfsTcKHFLdD246f9Ro0QEN35uZA/o+kQeTwJ7IoAAop8sgzALLOB9j1X3MPF6tbNP3+duHp8MX9yXPJNukuTFa06O25oQlGskoZNI3yKwOQX2hT2pbvRd3MX7EoOshzZ1JNLUgv1YOakraYbxkFf7CM+lGBzhpuxxSh8tNwuui22sg7UAdC3S2nUm8TohSP9N4ow+vUdenloCXRJ4QymZxO/ozsW61eXxV4+1zj1MH+S/7POkBxz7+kkots24QZJXlj9jBbxWKY/C3Lg3DSkCm9Ol3iCVC3Z1F+9TDLIeSu78eQnr4VrDyvnePey5pxwRAcXgiDZjBFNpax0ktqdaFEnuOH+Ha0EInlhuYLVWGG+2d1AIdkjZQ+2bALGvuB3PWl7E+A0RBtHn4Ld6noa4oRDz0O7huj4E3x+X/7h2EixvZABjMcSa1XxWIWB4caWg8jOSdOUOPop1V+7ifYvB1Qxj+sn/eum2chQD/36mBBSDM93YHZa1rXUQl82rG9m9103yuh3O3/zqdUohWgLFFYIdQfUwoyTQdJNigcJ60+cgcxgXcXV77ss9XNdIfORry39w//jJJGdZsQIiAkl0QQBSPJlSOEOPVXdxmzqn+xaDMKP/MjUkb1iSlC6pdXDoS2lc51MMjms/xjCbVevgUZa+j5UYo+parhmJu6zl7KV10o3XFI3VIrgLWb87VgJPSkL8Fr8j4uWIm+trjMk9zBp/JMm9k1DGpY6mK/iL5QWT5Jp39wVli+PiRid+sbqLSfx56hbfH4MYZLqE2RCHzToelOQRW6zBj86MgGJwZhva0XKaAo+q9fT1JMZk3eg6eQRrIDcoeorW65MMR4KcyX4zRrCjTfYwoyFACRliYLnmsX7hHn1sj7Oj9h4uzypmcA3jIh56UOCa/rm0S6OszqormE4kxA4+Zk9WwIN4XKRkFzdL8RB398ENAY5FDBKS8L4keF5wtVNNgqLUjgUSUAwucNM3WDIti97YiAMkJvCgDOGukkd+otTBWrUG0jEAa2CNJ9pg+n5EApMiQOwbooj78ftLjT+6ZvQxsApSMopahgjPfbmHiQukw8rF17iCmR8dM/40yZf7gNDBMSl/gzW3utm3cRePRQyC4bgkv1WuBe6zJ3TAxkNMkIBicIKbNtCUiQMkqJubHZY5YnSIB1wdzeSRbcrR1OMgAnFR3CzJaVesgbjL6C/6mYHW7GkkMDQBMmRJiKqigtZhffYDpsUbySo1rIMXvyGzh7EG4lIlVo01MxCldB3BOko8IC+iUxgkuRBrt627eExiEDGOkGUvXpaE4t/0mXcsjIBicGEbvuVysfrhCqkPjqusuIsJ+sZiV1vD4eLlbX6TcZAI5MGgNXATgn5m6gR4+eEBzO+KgQj630m+0dPCsALhDq4veLxs8RI2xKADBiVjiEuriSH81r9QxO8jR2wFPIhPW3dxDa3huAivrktxbbOfJJLghifukf1ApHNNOhZGQDG4sA3fcrlYDbBa0GaOG8XnkpDcUcdq5vEmySOHiUAegjygeGBpDdxys/z45AjcqsTCVssSsblky/YxOAfCo9lFAyHA77rvgRAkDpIEkWYcMN0wcLdirZzqWHUXE1tNK7/DxpjEIPO8anmJZ2+eV2pcYr10LIiAYnBBm91yqc1Wc7iL6R+KK4uxTfIILeQevMYdzMMIEfiCErvy2Zbz9GsSmBIBXLW8aOGm4zfA7+o2PS6A31eNx+V3TFkZYsX6HgjBXy2//VoeitaXlLb5k75PPtDxyXAmgYT1kXDHnpKkc9AYmxg8VYnR5PrjWqRcGO0QHQsioBhc0Ga3XCoxTdwYqtXvu8WthQWD1nP8f24gXy/N0FdPgwjEIkDj+WNWgsUVgS03xa9NngBFfn+n/B4onYI1CUt7H4OuGSRl1MLwiBFc1H0Pfu90UnlUo07o7xcROmVr4Co3MqHpXVz5HnQvrN8bmxhkXlcr5XvQBFRuoBWi1sG+fyEjOr5icESbMeKpIAiJZ6oZiLSqe1ypDVbjj6iRdnxjDVUE3rwRsM5fawkc8UY7tUEIIJKIrSWzl98D8XLNGntdT6Jp3edljlqiQySNrL5Icg+5UZKvdr3AERzviaVOZL0f0sf47gfMa4xiUOvgCC6ifU5BMbhP+tM6N+UviHGqWY9kEdfkEv5cY5EOE4G8Mb9Qd/C0Nt7Zdk4AKzluYe6/JFDgYuyrvtsDSgmXGvdLLTy6ewwxSFihfEx9zuBCJeGM+oGfLJZQMlnnYoFC5FbvBy/M7Os6d/EYxeCqdZDrk3jIuezNENf7pM+hGJz09g0+edy6ZL7V2JhaGoKsY/qH4gIiw7hZIgbLBzXTnp/kt0sSyuAT94QSGBGBVyS5frEKYkEik7OPQZcMEhrqixoCBasgJVGGGKzxJcWjsPqsqYkrtN77QCktQ4Lah8v9gr7MUytxgrv4vY2Eu79IQhLe6hirGMQ6SGkfMszZHxJL3jTEheI59k9AMbj/PZjSDEgcoTtIdYU03/h566+WQtakCJzSzjrXoQhctgi0+htCLLy9p5OToHHNRh086nkSpzjU4KWQWEhEEi3neGGk2DRWynXPnioQcWUTp0xFAfoP0x2DF0r+fx18lv9u/r9630FEYnnEY4HA5N9DDcT35RrluKhDiNhtjrGKQeZInUHqXLI/vKgQO+hYAAHF4AI2ueMlNpNGDrqhawnsGLqHmw0BYst4wPLbodXaL/S0MqyCiMwa5/vN4sLs6XQbH5bWe5dIcoHSfg+X9aXLtw97Hm1bAoeMaUQhiW4kz9DJBMsoxa0RY1QtwKOB0OT/dzVYD67vmkyyzjrIXmCFY+CGPU1XJ+/gOGcu1tkzFCF+oSQkODlmTkAxOPMN7nh5JIOQJMKNbPXa4ebLjZXaYbqDOwbv4WZBgGLLCIUfL5ZzrDCET/QxiM9FZPA7xXqGRZISKGMb3Euwnp0nCQKEUjT8m3qmZLgiZrcdRz3XEJa81CJy8HQQr8kLLILxH5PQm33V4rjNHI6yDo5ZDLJOWgGSEAgnys0QP+iYOYGjfjQzX77L24AAN2oKxlIQl4bmNU6Qr9a3dR48WDv6erBtME0/IoFRE+Bee9+SOcyf31FcuPx2uh4kjVBDsCZ7vba4Z7s+T5/HoyD2uUolgvOXExGKUgf3Hix6zf9X70m4hc9UrHO4p4mTxF1Nf3WYHPbc45j3LsIZUdgm83nVOoib+GKNuY9dDDaLoesq7vMqH9GxFYMj2owRTQUBSKFYbqJkB3OdNK8VrIC8WTN4C6bBeV/ZkCPC4lQk0IoAvx3ECS7D85aXKITh77U62uFfwj3MeXBTMvidEpc4RqtgD8tfe0himbmPYYX8sZJQw58p/H3Wcv/CPUqiTb3PITbJBCbOkvqPuJcRcZsO9uAyjXjNeyV5fPny2MWgruJNd3lGn1MMzmgzd1zKUQKQmyNv3B8qvSy1Au4I3K8vggD3WITHkxodRnBPkmTwtx0T4DdM6RaEZ834p+vPkEkjHS+p98MhmvF4YDVEMP5o6ZZC0kt9PuIyhit7SCkg9o+i2cQcHjR+qmRt12L93Dsp/v3+IirHGjNY1/PUUjCc+/7tk1BazDFjAorBGW/uBkvbRAByM8Dqh1sL94kWwA3A+hEJFDHBQx8rO/X26iDuls4cXQ5+yy8v8Yjc16tlC1Hi2I4AcYu4pkl0+cOV0jhwJcP5hCQnFlHIf2PtW01yuUeSP2i46yn0jbVw7JZBaCEAKTPDtQQDLJuOGRNQDM54cw9YGkHsjy6uo3UuYG5o/ENJBrLwqB1I0LtDAlhRuGaIwzro3lFjubCEVGsyDz9qVOKy3DYrdKrUq0WwCkEyWKnRyfqvk+Q1HS5snRDErUmmsr/d9qBJXqlxi1zzxEWT1MLvoFr8sA5Si4+EC6yGq2VssARWKyPxiHSdIcOZa4ExVGvAbSlcJMn7ShkguuXQr9gxYwKKwRlv7srSeMu9fwkkX80GVgAu5zrYdKW4zk5fLE1kd/IwJCP1hqWo+GGijqD++veUzqDjBL14sYwMWfNt07V2/Tnuq8Sj/UqShxYXI/X1+P9vSHKDIgK6OO86Ifj5cg6FYBeE//sYZGdjNeT+iZijODMVFvhvhB5JO09bKVVD4ghFvmupGWI3KdcydjHIql9Xmgjwe774Ad1UuiXs0fZGQDG4N/SDnZgsYEq9EFjezKRTAA62BaM9UQ2s50H1E43A+nMkuVOxitREhNVF1Otn3eKaYhDLB10lEEZkVXZZ022sYBHOWFNoR4YYJLv0F3tIHFEI7vcKIM4QgYgYvF2SF5c40NVrnJcg7r88b/k7LORTEIMkvPxyuW6xfCJ0HTMloBic6cYmOTbJfUrsy2o5GOpp8danC3i++8/KmmKPum0IO7Ip+XctuXGFJJTxOKzkBg8w2oMR60bMKPUkcf2uE3a1hhtB9/wZNxouYv5ZghBEHGAhQvySjcpDFDcimaqIAAQiSVi7DoXgrgS7+z7P0Wr5W3eNY1VDENbP8LJEFxbGWN3EzI3r+IFlnrzU/GZ3yDzS2AgoBse2I7vNh3hAmosT/EtsV1MEUg7m00menYRMMWKKHNMngMigzRdZkIi61fpqm4i9SgHxhmijcDjdK3hpIDj+SyWDEhHoOJgA4vtaSV5a4scozXS98tLFvfYFxa24K0MEJf2NKV5dk0V0De9Ktd/vk9xDr+a6X/VsY+kMs271j0hCzUoGGenH9YvIo++TgGJwn/S7OzfWHqyAiMDV4H5EIMVTqWlGdphjugSOSYILl6B29pyYPrITiUcj2P2o3zNij+sBa91b17TpogAyooLkoSVY8bq8Enjxwh1c+wwTX/nB0r3hpsVKirWw1ppre26EIMKC+ngKwbYUh/8eMdvsW03aYwb8HilRQ0zuGIdicIy70tOcjnp49HRaD9sRAQQBDxre3igU2iyYygOfAPLfSPLmjs7nYYYjUGueIfywAGHxI3kDK+BBLt3DxB5ttmpvVpI6EHxLSOYYYsfYD9qpkSXK75D4QLKFKTD9Vx26iBWCQ+xmf+doCsIqBilPc+v+TrnTkbEGkvjFeFRJQNzpgH55vAQUg+Pdm6NmRsAyZnseQk0RSAwKDyKsELqCj6K4/7/HzYuVhwQO3PyICYQgVl4sBoeVcEHw01v1U6WnKi7dzyZR7A27r+wTWaII9yeWhybuP+rMUaOtCxfxOiFI/CaZye8ZdrmebQcCCELuzZRqIcmI3r9jHZQgw+PEwLNE1xzHTAkoBqe3sfTY5C2NAPIaE4hFCBH4nFLcVhE4zn0l+/DCSUjmwNKH2/ecpR0Wf3eY8EPoPbNY9HDlEseH8EMQ1NaA41z1/GdFYef3Fksr9dlqZxG6NvCw5/d5zyRPaIkCIUgHjGr9r4XgFYItgfq1jQg8pjQa4MOPLT3qN/qiH5oeAcXgdPYMlzDtkCgku5oYQjD5LxXr0HRWNO+ZIvKw9OEqrBY/4vsoOnuUm/dvShIHrl0K2SL4EH64dh3jI0AhYqw8JN7ctryY0cECFzFlR/61ZBFTb3HbgSWJOESSU2qMoBbBbSn6+TYEEIC18wgWbgqoO2ZKQDE4/o0lS5Qf4d1Lbaq6ZyQCEBN4v5IMMP6VzHOGWPQQfLh6+Yf9wuVLMVoKDzPW/c6w7lB+5U9Kqz8sfWTrUsKFrG+SORzjJ0ApmeeWl7Tq+mPWtJt7Stl7Wpfh9t924KIjbqsmB2kR3Jagn9+FAAKQUAcGVm2s246ZElAMjntjf670v6yZg8yWBwIxYtR84iHjGI4A3QeI0UT84eZF+OEWpHzIYXX6au29FyX5ZInlxOqH8MMKqJt3uD3s+kzECdJyDFF4qfKCxgsCsZy8ELD3d2jxWyXztF5XzLlWBSDZwBjBrnfR460jgADE48R4cjFISGqmBBSD49xYRMbTS8mQZlwgliPS/V+oS7jXjeNhTlwfWbxY+Ujo4M/XLaVdOPlB1j7+Dpcutea+WFy7/Ddxfp8pZV16nbwHH5QA7cYQZ1wPdJngz4QD0Neb3y5i/8rF1b/JxChQ/LyVYvEIwVeVZJFNjuFnJNAFAerR0omIQVmy+ucuju0xRkZAMTiuDUEE3jjJw0oNubo/uBN5M6OtHBYlR3cEqMtIfBcxfvDHtXvuJDcpJUEOS+qgVMurS7s1Yvtw9ZI88IkkX+1uih5pxARI5KK7BIN4UEI3+P0+pPw/Xt4etOH8EYLE/9ZadDWUgNJRZHM6JDAkARLWiIFl0KyAChaOmRJQDI5nY3EJU5CWwrXNUjH0cyVu48/HM9VJzqQp+vgzSR1Y+yjYTJYm4zBr39eSvKS4eWtSB25erX2TvBw6m3RTDGIZJJP/jUkuWFy7dCF5xwZnQwjiGsYSXRNFqANJ8WoSURwSGJoAAvBW5aTExY65DM7QbGZ3PsXg/rcUIcKbPwki9K5k1Mr0FIym+Tniw7EZgbair3KH/TvLAxw3L8kcWPvI4NQqu9keLOlTq5bBqxYLPvdW3L133CA0AIs/v//TNoQg1xphCQrBJV1N41or1y9xrwyshPS7d8yUgGJwvxt7iyS/22gtxWyID8KyQKC4IvDg/dlV9HFkxB7ZvMTzEY/Jv3HxfmiDB/h+rxzPPhYCl07yF2UyuIYf3hB0V0/yhjUTpS7hg0vhYeJTa/JRtQgSY0oNQWoXOiSwDwJnLC/FJMzxgkwiCdnxjpkSUAzuZ2MvVzoT4BpqJohQR+6WuoS/b1O6Fn0Ub8bqQkY2PZu/vJ9LwLPOhMAVkrylsZYq6O5aSs7QDaY5EILEBZKgtHr/5aGrEJzJhTHhZSAE6T5CvCDXKElQhCtw73TMlIBicNiNxSVMhtb1V0QgNeWIFySVf6nWQIrzUrKF3ruU0qF0yyYxfewgD1FG09Kn6Bv22l7q2a6S5PVl8VUI0m6MagAUm14VgsQFnqNhPaz9pCkvROFqLItaBJd6NY1j3YQ2PK1xjbYpjTSOlTiLjQkoBjdGtdMHETbEBFHNnRZkzcLRrytZWgiZJQ3ePi+UhNIcZPKeryRzwOawDF5F35KukvGvlULT9AKv1yyB9hScXhWCJIZhEWwKQV4C6Sr0wPEv0xkuhAAGi3eV65QXFVqcUvycMBrHjAkoBvvfXIQggg/R0xSBvP1jQajxRv3PZH9nqFY/SrggAMmYpK3eGY7I4NXSt78988ybEcCaTd1PQj54ePJvKgCsDkpD3aVhbSExibhAClY7JDAGApTWousIZbV4VnGNkiFPySzHzAkoBvvdYKwGZGQR91ZdSMQF3r90Fun37Ps7OlY/HoqU18Dqd4ESLH+Q1Y+HKG5dLCfETFGy5ePG9O1vAz3zxgSI+UUQco0Tg0p8VQ1baB6E5CT6izOoT0m3EoXgxpj9YM8EEILECVJKpj6rTBrpGfqYDq8Y7Gc3EEOY1ukbXBNEyBKmcOxjSmxbP2ce/qjV6vfTJSged++1VopmN2fFg5J/yOJF8JHI8b5SuFlXxPD75xmHIYCVm/sCg+u81rYc5uyeRQIHE+AlhecS1S2qEKTGIM+vpYUvLfY6UQx2v/V0IcAl1HQLY/UiSxh38dRHG6vfV5K8rFj9PlwsKNTuW820nDob5y+BgwiQGEbICAO3G5YYhwT2TQAh+NgkN2sIQeJe77vgZMZ978lezq8Y7A478W/0biQb8IfKYbGAERt4zYnGXZw6CXXUsPaR4XsurX7dXTAeaVEEKGdUrYFYW6rLeFEQXOyoCNCF6fcbMYI8r04sXq2lVrUY1QYNORnFYDe0EYIPLRnDlSn9hInB4Mc2hQDcpvAjzo8bxUWLhRNKB7Vq0+rXzTXkUeZNgDZ11RrIg5bfl0MC+yLA9UeyyI0aFsEXJLm3nZb2tSX7Pa9icHf+CEG6Cdyz8aPCGkjwbW1gv/tZuj1CW+FnrF+3++DRlkOAxCis6wzCI8jS/Mhylu9KR0RgnRB8USl9ZsvNEW3UkFNRDO5Om0QRLIA18PaPSrbwWJIh2go/yJDY8ddJsGrUJA9j/Xa/ZjzC8gj8wcoLI7GzWGU+ujwUrniPBCjkf3wJ96nPrJeUMmfc5x0LJaAY3G3jyaB9e5KTlQxZqrYft8e2Pacpdfwuk+RsJUZpE1fvqvAjw5dM33cm+dZuiPy2BCRQfpc8dClBUx/C/Maot6kg9BIZggDF0IlpJ5FJITgE8QmdQzHYfrOoHfjKJPQZZiAKaTM3ZP/Gi5S4vgsXFxQPGuqXHVbPT+HXfs/9pgR2IUDdzRcXYVgfxriM71Y6PexybL8rgYMIYA384yR0wamlzgj5eWmSexTPj/QWTkAx2P4CaPZv/E5p5P2e9oc78ptkH1Kuhkb350ly7iQ/X37cByV3KPyOxOoHJDAoAV7YiM/iRa7Zkejvk7wtyQmlR/Ggk/JksyRAjCrtDq+e5OQNayB9sKkryN/pGp7l1m+/KMXg9szqN55SepDy39TQu2H7Q/3XN2nXRqu2UxZLH67eH07Cm91VSl9jPry6b7XjwVeTvLnU8/tEKeSsq7eDjfEQEuiQAIKQKgM8pJuWGk5BcXp+z99O8o1SlP22JWyjwyl4qJkSQADeOgnXDAaDk668dNAq8TpJ6IjjkMB/EVAMtr8Yaq9RjkDMzxvKobiRc0P/3ppD83f8fwTe6coP9bRJ6OJBA3t+yKt7cpDVj3O8JcknkyD8aG1FkofZYO331G9KYEgCPLS5j/D7P+heXO8nlHDCxYyIJNbQIYEmgZsnuV3xUJE02LyeuIZIaHxQEuLaHRL4HwQUg+0vCt6uXtUwvW96pG2Z1/Zt7yrCj769HypZvh/c9KR+TgISGCUBvAEPS3LFJCSAnaLcU6rFcPWhzsskL5/PSEKGsmO5BPAccQ1cttSwbMaK1+cGxoFnJXmC1sDlXiibrHxbYbLJMZfymdMn+bUkD9hxwfxoiRf6dKk/hmuIRva4fElG4ceMEKQUxTd3PJdfl4AExk8A9zFWHuKD8RgQNrLuQU/yCS+H1DWl1/cLx780Z7gjAQQgLmD+oTkA3a5WXxioAEFCI/Gnz9/xfH59IQQUg7ttNK5esne5eVNehlFdwbhxVwd/xw8VgYcA/NcS3/ex3abhtyUggRkTuFeSY0tZmpOsefjX+w73HO4pJLR9PQk1Qbm30GmCPzumS+BW5QWB9qCrYQU8VzAgEDKEFfA55fky3dU688EJKAYHR+4JJSABCbQiQI/wX01y4yR4JnAlH3YPr4lluJb5hyxSXkbxOpBYRleUZ5eY41YT8ku9EsD6d4Mk1I2ttQHrflc3MH2uyULnhQEDg0MCrQgoBlth80sSkIAE9koAYYgb8OylygClQ7Aa8g9jE5HYTHYje5l/CEVBVJCU9rwkb9zrKpd1cipJkORBDCD7Sgzpas1Y9ozwAMQ8+//cZSFytX0RUAz2RdbjSkACEhiWwHlLWzGSUvjzMSV8hZjDphXxqPt+tSjWMjdYFL+b5EslDAY3NF2KmjXqsDIiTHBVOjYjgPj7xWL9o9wQ1r911l72A/4wxw3MP5/b7BR+SgKbETjqprDZUfyUBCQgAQmMmcBNk1y7FK6n9MgZS/JBLUa8Lnt53XqqUFz9u2pl5P/Xz1QRWT9bE+P4e/6OJAdiG19T6qOOmV/buV0+ydUaNWLpFnXmJJQUO0ujGPRqEkhlRD1AagPeUwHYdgv83iYEFIObUPIzEpCABOZLgIL2tyydjah1insSa2J1PW9jVdyUUlNUYoHkH9zUWMBwg+KuxtqIu5p/n1gypzc9flefu0JJEMTKWgcdoOgIVXvSUw6I2rEMWPHfuOtrwecqtJtzWtc4AAZYXykd9PLSLo61OyTQOwHFYO+IPYEEJCCByRJA+NymdEYik5VSJoxaNJ8/8xxB/CAe639XYXTQM2aTZ08VjNXqiGURiyL//YWGBXIbuDXxoq6hzrkp5Kp4q2Vb1om5es5N1rFufnUeiN7PFCvpbxXhu816/KwEOiHQ9kLu5OQeRAISkIAEZkmAVmiUQyEurg7cotTGw2KGGMJdyjMIQcb/29YCeZDL+iigXT731s2hxloiXsnixuJZS419rWRz4/6ljSnxfw4J7J1Alz+KvS/GCUhAAhKQwCQJnCvJLYp4xBqJiMRdTU09LHS4XhGLh1npulh4FXK4qxm1JE+zbizlebDoIQSp64jYe0/5PDGQry/lXrqYj8eQwCAEFIODYPYkEpCABCSwI4ErJblW6eF+0YbLepvDVvcs7mYyn5sZ0Qi540s3qG2O6WclMHkCisHJb6ELkIAEJCABCUhAAu0JKAbbs/ObEpCABCQgAQlIYPIEFIOT30IXIAEJSEACEpCABNoTUAy2Z+c3JSABCUhAAhKQwOQJKAYnv4UuQAISkIAEJCABCbQnoBhsz85vSkACEpCABCQggckTUAxOfgtdgAQkIAEJSEACEmhPQDHYnp3flIAEJCABCUhAApMnoBic/Ba6AAlIQAISkIAEJNCegGKwPTu/KQEJSEACEpCABCZPQDE4+S10ARKQgAQkIAEJSKA9AcVge3Z+UwISkIAEJCABCUyegGJw8lvoAiQgAQlIQAISkEB7AorB9uz8pgQkIAEJSEACEpg8DQqAXAAAAv1JREFUAcXg5LfQBUhAAhKQgAQkIIH2BBSD7dn5TQlIQAISkIAEJDB5AorByW+hC5CABCQgAQlIQALtCSgG27PzmxKQgAQkIAEJSGDyBBSDk99CFyABCUhAAhKQgATaE1AMtmfnNyUgAQlIQAISkMDkCSgGJ7+FLkACEpCABCQgAQm0J6AYbM/Ob0pAAhKQgAQkIIHJE1AMTn4LXYAEJCABCUhAAhJoT0Ax2J6d35SABCQgAQlIQAKTJ6AYnPwWugAJSEACEpCABCTQnoBisD07vykBCUhAAhKQgAQmT0AxOPktdAESkIAEJCABCUigPQHFYHt2flMCEpCABCQgAQlMnoBicPJb6AIkIAEJSEACEpBAewKKwfbs/KYEJCABCUhAAhKYPAHF4OS30AVIQAISkIAEJCCB9gQUg+3Z+U0JSEACEpCABCQweQKKwclvoQuQgAQkIAEJSEAC7QkoBtuz85sSkIAEJCABCUhg8gQUg5PfQhcgAQlIQAISkIAE2hNQDLZn5zclIAEJSEACEpDA5AkoBie/hS5AAhKQgAQkIAEJtCegGGzPzm9KQAISkIAEJCCByRNQDE5+C12ABCQgAQlIQAISaE9AMdiend+UgAQkIAEJSEACkyegGJz8FroACUhAAhKQgAQk0J6AYrA9O78pAQlIQAISkIAEJk9AMTj5LXQBEpCABCQgAQlIoD0BxWB7dn5TAhKQgAQkIAEJTJ6AYnDyW+gCJCABCUhAAhKQQHsCisH27PymBCQgAQlIQAISmDwBxeDkt9AFSEACEpCABCQggfYEFIPt2flNCUhAAhKQgAQkMHkCisHJb6ELkIAEJCABCUhAAu0JKAbbs/ObEpCABCQgAQlIYPIEFIOT30IXIAEJSEACEpCABNoTUAy2Z+c3JSABCUhAAhKQwOQJKAYnv4UuQAISkIAEJCABCbQnoBhsz85vSkACEpCABCQggckTUAxOfgtdgAQkIAEJSEACEmhPQDHYnp3flIAEJCABCUhAApMn8J/svIW2zTogCQAAAABJRU5ErkJggg==",
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
        hospitalLists: []
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
      Details: {
        address: null,
        birthday: null,
        isBlack: null,
        memberName: null,
        phone: null,
        school: null,
        sex: null,
        source: null
      },
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
      bj_obj: {},
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
            this.Details = res.data.data.orderDetailDto;
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
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        createTimeBegin:
          this.seach.createTime == null ? null : this.seach.createTime[0],
        createTimeEnd:
          this.seach.createTime == null ? null : this.seach.createTime[1],
        deliveryTimeBegin:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        deliveryTimeEnd:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        userName: this.seach.userName || null,
        phone: this.seach.phone || null,
        status: this.seach.status == "0" ? 0 : this.seach.status,
        payType: this.seach.payType == "0" ? 0 : this.seach.payType,
        owe: this.seach.owe == "0" ? 0 : this.seach.owe,
        orderNum: this.seach.orderNum || null,
        createUserName: this.seach.createUserName || null,
        prescriptionType:
          this.seach.prescriptionType == "0" ? 0 : this.seach.prescriptionType,
        favorable: this.seach.favorable == "0" ? 0 : this.seach.favorable,
        siteId: this.seach.siteValue,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        hospitalId: this.seach.hospitalId
      };
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
      let data = {
        createTimeBegin:
          this.seach.createTime == null ? null : this.seach.createTime[0],
        createTimeEnd:
          this.seach.createTime == null ? null : this.seach.createTime[1],
        deliveryTimeBegin:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[0],
        deliveryTimeEnd:
          this.seach.deliveryTime == null ? null : this.seach.deliveryTime[1],
        userName: this.seach.userName || null,
        phone: this.seach.phone || null,
        status: this.seach.status == "0" ? 0 : this.seach.status,
        payType: this.seach.payType == "0" ? 0 : this.seach.payType,
        owe: this.seach.owe == "0" ? 0 : this.seach.owe,
        orderNum: this.seach.orderNum || null,
        createUserName: this.seach.createUserName || null,
        prescriptionType:
          this.seach.prescriptionType == "0" ? 0 : this.seach.prescriptionType,
        favorable: this.seach.favorable == "0" ? 0 : this.seach.favorable,
        siteId: this.seach.siteValue,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        hospitalId: this.seach.hospitalId
      };
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
      if (viewPage_function(String(window.location.href)) == "测评") {
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
    width: 30%;
  }
  .div {
    display: inline-block;
    width: 69%;
    .sizeInput {
      height: 30px;
      line-height: 30px;
      border: 1px solid #dcdfe6;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: 12px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
    }
    .sizeInput:focus {
      border-color: #409eff;
      outline: 0;
    }
  }
}
.xiaopiao {
  padding: 10px;
  border: 1px solid #bbbbbb;
  box-sizing: border-box;
  div {
    padding: 5px 0;
  }
  h2 {
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
</style>
