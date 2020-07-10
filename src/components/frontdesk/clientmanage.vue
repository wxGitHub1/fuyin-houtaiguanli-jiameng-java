<template>
  <!-- 客户管理 -->
  <div>
    <!-- 右侧抽屉 -->
    <!-- 悬浮按钮 -->
    <div class="left-muen" @click="left_drawer_func()">
      <span class="animation-left">&rsaquo;&rsaquo;</span>
    </div>
    <!-- 抽屉弹框 -->
    <el-drawer title="预约日历" :visible.sync="left_drawer_data.lef_drawer" direction="ltr" size="60%">
      <!-- seach -->
      <el-form :inline="true" size="mini" id="search" class="padding-LR-p10">
        <el-form-item label="客户姓名">
          <el-input v-model="left_drawer_data.search.memberName" class="w-150" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input class="w-150" v-model="left_drawer_data.search.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="产品昵称">
          <el-input
            v-model="left_drawer_data.search.productName"
            class="w-150"
            placeholder="请输入产品昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="时段">
          <el-select
            clearable
            class="w-150"
            v-model="left_drawer_data.search.timePeriod"
            placeholder="请选择"
          >
            <el-option
              v-for="item in left_drawer_data.timePeriodList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约类型">
          <el-select
            clearable
            class="w-150"
            v-model="left_drawer_data.search.reservedType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in left_drawer_data.reservedTypeList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务人员">
          <el-select
            clearable
            class="w-150"
            v-model="left_drawer_data.search.user"
            placeholder="请选择"
          >
            <el-option
              v-for="item in left_drawer_data.userList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约日期">
          <el-date-picker
            class="w-250"
            v-model="left_drawer_data.search.time"
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
            type="warning"
            icon="el-icon-search"
            :loading="left_drawer_data.isSearch"
            @click="left_drawer_search_func()"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <!-- table -->
      <el-table
        border
        :data="left_drawer_data.clientData"
        max-height="670"
        v-loading="left_drawer_data.loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :header-row-class-name="'headerClass'"
        size="mini"
      >
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="memberName" label="客户姓名" width="100"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系电话" width="120"></el-table-column>
        <el-table-column align="center" prop="isVIP" label="是否会员"></el-table-column>
        <el-table-column align="center" prop="date" label="预约日期" width="100"></el-table-column>
        <el-table-column align="center" prop="timePeriod" label="时段"></el-table-column>
        <el-table-column align="center" prop="time" label="时间点" width="100"></el-table-column>
        <el-table-column align="center" prop="type" label="预约类型" width="100"></el-table-column>
        <el-table-column align="center" prop="productName" label="产品昵称" width="180"></el-table-column>
        <el-table-column align="center" prop="user" label="服务人员" width="100"></el-table-column>
      </el-table>
      <!-- Pagination 分页 -->
      <el-pagination
        @size-change="left_drawer_handleSizeChange"
        @current-change="left_drawer_handleCurrentChange"
        :current-page="left_drawer_data.pages.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="left_drawer_data.pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="left_drawer_data.pages.total"
        class="pagination"
      ></el-pagination>
    </el-drawer>
    <!-- 头部筛选box -->
    <div class="box" v-if="tryOnly_show">
      <div class="item item1" :class="{active:topActive==0}" @click="topItem_func(0)">
        <div>默认列表</div>
      </div>
      <div class="item item2" :class="{active:topActive==1}" @click="topItem_func(1)">
        <div>今日复查剩余</div>
        <div>{{box_top_data.remainingBackVisit|| 0}}</div>
      </div>
      <div class="item item3" :class="{active:topActive==2}" @click="topItem_func(2)">
        <div>今日取型剩余</div>
        <div>{{box_top_data.remainingShape || 0}}</div>
      </div>
      <div class="item item4" :class="{active:topActive==3}" @click="topItem_func(3)">
        <div>今日试穿剩余</div>
        <div>{{box_top_data.remainingTryOn|| 0}}</div>
      </div>
      <div class="item item5" :class="{active:topActive==4}" @click="topActive=4">
        <div>今日维修剩余</div>
        <div>{{box_top_data.remainingRepair|| 0}}</div>
      </div>
    </div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input v-model="seach.name" class="w-150" placeholder="请输入姓名" @input="listenKey()"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话" @input="listenKey()"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          class="w-150"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="seach.birthday"
          @change="listenKey()"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="黑名单">
        <el-select
          clearable
          class="w-150"
          v-model="seach.heimingdanValue"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.heimingdans"
            :key="item.type"
            :label="item.name"
            :value="item.type"
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
          v-if="tryOnly_show"
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addkehu()"
        >新增</el-button>
        <el-button
          type="warning"
          icon="el-icon-search"
          :loading="isSearch"
          @click="topItem_func(topActive)"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table
      border
      :data="clientData"
      max-height="670"
      :span-method="objectSpanMethod"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" prop="seq" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名" width="100"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="联系电话"
        :show-overflow-tooltip="true"
        width="100"
      ></el-table-column>
      <el-table-column align="center" prop="isVIP" label="是否会员" width="100"></el-table-column>
      <el-table-column align="center" prop="isBlack" label="黑名单" width="80"></el-table-column>
      <el-table-column align="center" prop="productName" label="产品昵称"></el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态"
        :show-overflow-tooltip="true"
        min-width="50"
      ></el-table-column>
      <el-table-column align="center" prop="orderNum" label="订单号"></el-table-column>
      <el-table-column align="center" prop="oweMoney" label="下欠金额" width="100"></el-table-column>
      <el-table-column
        align="center"
        prop="orderDate"
        label="下单时间"
        :show-overflow-tooltip="true"
        width="100"
      ></el-table-column>
      <!-- <el-table-column align="center" prop="siteName" label="测评中心" :show-overflow-tooltip="true" min-width="40"></el-table-column>
      <el-table-column align="center" prop="visitFlagCN" label="到访状态" min-width="50"></el-table-column>-->
      <el-table-column v-if="tryOnly_show" align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-guide"
            plain
            @click="transferSite_func(scope.row.memberId)"
            v-if="topActive==0"
            size="small"
          >转</el-button>
          <!-- <el-button @click="cpjd(scope.row)" type="success" size="small">测评</el-button>
          <el-button @click="qxjd(scope.row,310)" type="warning" size="small">取型</el-button>
          <el-button @click="qxjd(scope.row,363)" type="success" size="small">试穿</el-button>
          <el-button @click="qxjd(scope.row,366)" type="primary" size="small">维修</el-button>-->
          <!-- <el-button
            @click="czpj(scope.row)"
            v-if="scope.row.firstCognitionFlag == 0"
            type="danger"
            size="small"
          >初诊</el-button>-->
          <el-button @click="receptionist_func(scope.row)"  type="primary" size="small">分配接待</el-button>
          <el-button @click="handleInfo(scope.row)" type="info" size="small">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleInfo(scope.row)" type="info" size="small">详情</el-button>
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
    <!-- dialog -->
    <el-dialog
      :title="addClientTitle"
      :visible.sync="dialogFormVisible"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="resetForm"
    >
      <el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" size="mini">
          <h3 class="new-title">基本信息</h3>
          <el-col :span="11">
            <el-form-item label="客户姓名:" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入客户姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" prop="phone">
              <el-input v-model.number="ruleForm.phone" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="就读学校:">
              <el-input v-model="ruleForm.school" placeholder="请输入就读学校"></el-input>
            </el-form-item>
            <el-form-item prop="birthday" required label="出生日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.birthday"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="地址">
              <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入家庭住址地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item v-if="modefiy" label="治疗周期:">
              <span>{{modfiyTreatmentCycle}}</span>
            </el-form-item>
            <el-form-item v-else label="治疗周期" prop="zhouqi">
              <el-radio-group v-model="ruleForm.zhouqi">
                <el-radio label="0">干预期</el-radio>
                <el-radio label="1">巩固期</el-radio>
                <el-radio label="2">观察期</el-radio>
                <el-radio label="3">持续生长</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="客户初始认知" prop="renzhi">
              <el-radio-group v-model="ruleForm.renzhi">
                <el-radio label="AA"></el-radio>
                <el-radio label="AB"></el-radio>
                <el-radio label="BA"></el-radio>
                <el-radio label="BB"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="客户来源" prop="laiyuan">
              <el-radio-group v-model="ruleForm.laiyuan">
                <el-radio label="0">自然发病</el-radio>
                <el-radio label="1">体检</el-radio>
                <el-radio label="2">调研</el-radio>
                <el-radio label="3">其它</el-radio>
                <el-radio label="4">儿保</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="就诊类型" prop="memberType">
              <el-radio-group
                v-model="ruleForm.memberType"
                @change="isRequired(ruleForm.memberType)"
              >
                <el-radio label="2">固定类</el-radio>
                <el-radio label="1">矫形类</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <h3 class="new-title">
        病单信息
        <el-button
          v-if="modefiy"
          type="warning"
          icon="el-icon-circle-plus-outline"
          @click="Adddis_fuc()"
          size="mini"
          class="right"
        >新增病单</el-button>
      </h3>
      <el-table v-if="modefiy" :data="DataList" size="mini" key="DataList" max-height="190">
        <el-table-column label="病单编号" align="center" prop="prescriptionNum"></el-table-column>
        <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
        <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
        <el-table-column label="医院" align="center" prop="hospitalName"></el-table-column>
        <el-table-column label="科室" align="center" prop="departmentName"></el-table-column>
        <el-table-column label="医生" align="center" prop="doctorName"></el-table-column>
        <el-table-column label="病单类型" align="center" prop="prescriptionName"></el-table-column>
        <el-table-column label="处方病情" align="center" prop="condition"></el-table-column>
        <el-table-column label="新增病情" align="center" prop="illness"></el-table-column>
        <el-table-column label="创建时间" align="center" prop="updateTime"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              size="mini"
              @click="ddModfiy(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else :data="addData" size="mini" key="addData">
        <el-table-column label="省份" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              @change="cityList(scope.row.provinceId)"
              v-model="scope.row.provinceId"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in transferSite.provinceIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="城市" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              @change="siteList(scope.row.cityId)"
              v-model="scope.row.cityId"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in seach.cityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="测评中心" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.siteValue"
              @change="hospitalList(scope.row.siteValue)"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in seach.siteLists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="医院" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              @change="departmentList(scope.row.hospitalValue)"
              v-model="scope.row.hospitalValue"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in scope.row.hospitals"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="科室" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              @change="doctorList(scope.row.departmentValue)"
              v-model="scope.row.departmentValue"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in scope.row.departments"
                :key="item.departmentId"
                :label="item.departmentName"
                :value="item.departmentId"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="医生" align="center">
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.doctorValue" placeholder="请选择" size="mini">
              <el-option
                v-for="item in scope.row.doctors"
                :key="item.doctorId"
                :label="item.doctorName"
                :value="item.doctorId"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="病单类型" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.prescriptionValue"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in scope.row.prescriptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="处方病情" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.condition" placeholder="请输入处方病情" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增病情" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.obCondition" placeholder="请输入新增病情" size="mini"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="resetForm()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          v-if="modefiy"
          type="success"
          icon="el-icon-circle-check"
          :loading="isSearch"
          @click="submitModfiy('ruleForm')"
        >保存</el-button>
        <el-button
          v-else
          type="success"
          icon="el-icon-circle-check"
          :loading="isSearch"
          @click="submitForm('ruleForm')"
        >保存</el-button>
        <el-button
          v-if="isBlackBut == 1 "
          icon="el-icon-user-solid"
          type="danger"
          @click="goBlack()"
        >加入黑名单</el-button>
        <el-button
          v-if="isBlackBut == 2 "
          icon="el-icon-user-solid"
          type="warning"
          @click="goBlack()"
        >移出黑名单</el-button>
      </div>
    </el-dialog>
    <!-- dialog 详情-->
    <el-dialog
      title="客户信息详情"
      :visible.sync="dialogDepartmentDetails"
      center
      :close-on-click-modal="false"
      width="80%"
      :before-close="xiangxifanhui"
    >
      <h3 class="new-title">客户信息</h3>
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
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
        <span class="margin-r-20">{{Details.isBlack}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{Details.address}}</span>
        <span>就读学校:</span>
        <span class="margin-r-20">{{Details.school}}</span>
        <span>客户当前类型:</span>
        <span class="margin-r-20">{{Details.memberModeCN}}</span>
        <span>就诊类型:</span>
        <span>{{Details.memberTypeCN}}</span>
      </div>-->
      <h3 class="new-title">会员信息</h3>
      <el-table :data="memberCard" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="isVIP" label="当前是否会员" min-width="100"></el-table-column>
        <el-table-column prop="partsNum" label="部位剩余次数"></el-table-column>
        <el-table-column prop="wholeNum" label="全身剩余次数"></el-table-column>
        <el-table-column prop="vipType" label="是否续会员"></el-table-column>
        <el-table-column prop="expireDate" label="会员到期时间"></el-table-column>
      </el-table>
      <h3 class="new-title">历史信息</h3>
      <el-table :data="overdueList" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="isOverdue" label="会员是否过期"></el-table-column>
        <el-table-column prop="overdueDate" label="过期时间"></el-table-column>
        <el-table-column prop="allOverdueTimes" label="过期全身次数"></el-table-column>
        <el-table-column prop="overdueTimes" label="过期部位次数"></el-table-column>
      </el-table>
      <h3 class="new-title">初诊评价</h3>
      <div>{{Details[0].firstCognition}}</div>
      <h3 class="new-title">治疗周期</h3>
      <div>
        <span>治疗周期:</span>
        <span class="margin-r-20">{{Details[0].treatmentCycle}}</span>
        <span>创建时间:</span>
        <span>{{Details[0].treatmentCycleTime}}</span>
      </div>
      <h3 class="new-title">病单信息</h3>
      <el-table :data="prescriptions" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="prescriptionNum" label="病单编号" min-width="100"></el-table-column>
        <el-table-column align="center" prop="pProvinceName" label="省份"></el-table-column>
        <el-table-column align="center" prop="pCityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="prescriptionSiteName" label="测评中心"></el-table-column>
        <el-table-column prop="hospitalName" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
        <el-table-column prop="updateTime" label="创建时间" min-width="100"></el-table-column>
        <el-table-column label="操作" align="center" v-if="tryOnly_show">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.addOrder==1"
              @click="readyOrder(scope.row)"
              type="primary"
              plain
              icon="el-icon-edit-outline"
            >下单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="new-title">测评记录</h3>
      <el-table
        :data="evaluates"
        border
        max-height="500"
        :header-row-class-name="'headerClass-two'"
      >
        <el-table-column prop="evaluateUserName" label="测评人" min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="测评时间"></el-table-column>
        <el-table-column prop="recoveryCN" label="恢复情况"></el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button
              @click="evaluationDetails(scope.row.evaluateId)"
              size="mini"
              type="primary"
            >测评详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="110">
          <template slot-scope="scope">
            <el-button
              @click="evaluationReport(scope.row.evaluateId)"
              size="mini"
              type="primary"
            >测评报告</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="height" label="身高"></el-table-column>
        <el-table-column prop="weight" label="体重"></el-table-column>
        <el-table-column prop="zgfy" label="足弓发育"></el-table-column>
        <el-table-column prop="zdyl" label="足底压力"></el-table-column>
        <el-table-column prop="ggfy" label="跟骨发育"></el-table-column>
        <el-table-column prop="xzfy" label="下肢发育"></el-table-column>
        <el-table-column prop="xgjgzm" label="膝关节冠状面"></el-table-column>
        <el-table-column prop="xgjszm" label="膝关节矢状面"></el-table-column>
        <el-table-column prop="jzfy" label="脊柱发育"></el-table-column>
        <el-table-column prop="jzhdqs" label="脊柱活动趋势"></el-table-column>
        <el-table-column prop="jjg" label="肩胛骨"></el-table-column>
        <el-table-column prop="jbhdd" label="颈部活动度"></el-table-column>
        <el-table-column prop="gp" label="骨盆"></el-table-column>
        <el-table-column prop="xb" label="胸部"></el-table-column>
        <el-table-column prop="sm3d" label="3d扫描 "></el-table-column>
        <el-table-column prop="zb3d" label="足部3d"></el-table-column>
        <el-table-column prop="gmd" label="骨密度"></el-table-column>
      </el-table>
      <h3 class="new-title">订单信息</h3>
      <el-table :data="orders" border max-height="500" :header-row-class-name="'headerClass-two'">
        <el-table-column prop="orderNum" label="订单编号" min-width="100"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="source" label="产品分类"></el-table-column>
        <el-table-column prop="model" label="产品型号"></el-table-column>
        <el-table-column prop="productOrderTypeCN" label="下单类型"></el-table-column>
        <el-table-column prop="price" label="标准价格"></el-table-column>
        <el-table-column prop="actual" label="实际价格"></el-table-column>
        <el-table-column prop="favorable" label="折扣金额"></el-table-column>
        <el-table-column prop="createTime" label="下单时间"></el-table-column>
        <el-table-column prop="orderUserName" label="下单人"></el-table-column>
        <el-table-column prop="status" label="订单状态"></el-table-column>
        <el-table-column prop="lakala" label="拉卡拉"></el-table-column>
        <el-table-column prop="transfer" label="转账"></el-table-column>
        <el-table-column prop="cash" label="现金"></el-table-column>
        <el-table-column prop="oweMoney" label="下欠金额"></el-table-column>
        <el-table-column prop="quickly" label="是否加急"></el-table-column>
        <el-table-column prop="deliveryTime" label="交货日期"></el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="xiangxifanhui()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          v-if="Details[0].phone != '***********' "
          type="primary"
          icon="el-icon-edit"
          plain
          @click="handleModify(currentNamberId,Details[0].isBlack)"
        >修改客户信息</el-button>
        <el-button
          type="danger"
          v-if="assigned_reception_data.userObj.firstCognitionFlag == 0 || tryOnly_show == true"
          @click="czpj(assigned_reception_data.userObj)"
        >初诊评价</el-button>
        <el-button @click="assigned_reception_func()" v-if="tryOnly_show" type="primary">分配接待</el-button>
        <el-button type="info" icon="el-icon-s-order" @click="heimingdanxiangxi()">黑名单详细</el-button>
      </div>
    </el-dialog>
    <!-- dialog 订单详情-->
    <!-- <el-dialog
      title="订单详情"
      :visible.sync="DdialogDepartmentDetails"
      center
      :close-on-click-modal="false"
      width="80%"
    >
      <h3 class="new-title">客户信息</h3>
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
      <h3 class="new-title">病单信息</h3>
      <el-table :data="PatientInformation" border style="width: 100%">
        <el-table-column prop="prescriptionId" label="病单编号" min-width="100"></el-table-column>
        <el-table-column prop="hospitalNmae" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
        <el-table-column prop="pCreateTime" label="创建时间" min-width="100"></el-table-column>
      </el-table>
      <h3 class="new-title">
    订单信息-->
    <!-- <el-button
          type="primary"
          icon="el-icon-plus"
          @click="bujiaoManey()"
          size="mini"
          class="right"
          v-if="orderInformation.oweMoney > 0"
    >补交欠款</el-button>-->
    <!-- </h3>
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
        <span>订单备注:</span>
        <span class="margin-r-20">{{orderInformation.remark || "暂无数据"}}</span>
      </div>
      <h3 class="new-title">退款信息</h3>
      <el-table :data="refundRecordDto" border style="width: 100%">
        <el-table-column prop="nickname" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="price" label="退款金额"></el-table-column>
        <el-table-column prop="createTime" label="退款时间"></el-table-column>
        <el-table-column prop="createUserName" label="退款人员"></el-table-column>
        <el-table-column prop="reason" label="退款原因"></el-table-column>
      </el-table>
      <h3 class="new-title">折扣优惠</h3>
      <el-table :data="favorableDto" border style="width: 100%">
        <el-table-column prop="productName" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="sum" label="折扣金额"></el-table-column>
        <el-table-column prop="refundTime" label="折扣时间"></el-table-column>
        <el-table-column prop="user" label="折扣人员"></el-table-column>
        <el-table-column prop="reason" label="折扣原因"></el-table-column>
      </el-table>
      <h3 class="new-title">产品信息</h3>
      <el-table class="margin-t-20" :data="prescriptions" border>
        <el-table-column prop="name" label="产品名" min-width="230"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="type" label="产品分类"></el-table-column>
    <el-table-column prop="unit" label="产品规格"></el-table-column>-->
    <!-- <el-table-column prop="number" label="产品数量"></el-table-column> -->
    <!-- <el-table-column label="产品尺寸" align="center" min-width="90">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.type =='自制产品' || scope.row.type =='定制产品' ? true : false "
              @click="orderDetails(scope.row.id)"
              size="mini"
              type="info"
              icon="el-icon-document"
            >详情</el-button>
            <span v-else>--</span>
          </template>
    </el-table-column>-->
    <!-- <el-table-column prop="price" label="标准价格"></el-table-column>
        <el-table-column prop="actual" label="实际价格"></el-table-column>
        <el-table-column prop="favorable" label="折扣金额"></el-table-column>
        <el-table-column prop="recordActual" label="退款金额"></el-table-column>
    <el-table-column prop="deliveryTime" label="交货时间" min-width="200"></el-table-column>-->
    <!-- <el-table-column  label="操作" min-width="130">
          <template>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-document"
            >打印订货单</el-button>
          </template>
    </el-table-column>-->
    <!-- </el-table> -->
    <!-- <h3 class="new-title">客户确认签字</h3>
      <div class="signatureImg">
        <img :src="imgUrl" alt="图片"/>
        <el-image :src="imgUrl">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
    </div>-->
    <!-- <div slot="footer" >
        <el-button @click="returnOn()" type="primary" icon="el-icon-back">返回</el-button>
        <el-button
          type="success"
          icon="el-icon-receiving"
          @click="printTicket(paymentMethod.orderNum)"
        >打印小票</el-button>
        <el-button type="warning" @click="dialogRefund=true" icon="el-icon-bank-card">退款</el-button>
        <el-button type="primary" icon="el-icon-circle-close" @click="cancelOrder">取消订单</el-button>
        <el-button type="warning" @click="changeOrder()">修改订单</el-button>
    </div>-->
    <!-- </el-dialog> -->
    <!-- 新增病单 -->
    <el-dialog
      title="新增病单"
      :visible.sync="dialogAddbd"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="cancelDd"
    >
      <el-table :data="addData">
        <el-table-column label="省份" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              @change="cityList(scope.row.provinceId)"
              v-model="scope.row.provinceId"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in transferSite.provinceIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="城市" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              @change="siteList(scope.row.cityId)"
              v-model="scope.row.cityId"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in seach.cityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="测评中心" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.siteValue"
              @change="hospitalList(scope.row.siteValue)"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in seach.siteLists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="医院" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              @change="departmentList(scope.row.hospitalValue)"
              v-model="scope.row.hospitalValue"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in scope.row.hospitals"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="科室" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              @change="doctorList(scope.row.departmentValue)"
              v-model="scope.row.departmentValue"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in scope.row.departments"
                :key="item.departmentId"
                :label="item.departmentName"
                :value="item.departmentId"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="医生" align="center">
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.doctorValue" placeholder="请选择" size="mini">
              <el-option
                v-for="item in scope.row.doctors"
                :key="item.doctorId"
                :label="item.doctorName"
                :value="item.doctorId"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="病单类型" align="center">
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.prescriptionValue"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in scope.row.prescriptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="处方病情" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.condition" placeholder="请输入处方病情" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增病情" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.obCondition" placeholder="请输入新增病情" size="mini"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="cancelDd()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-check"
          :loading="isSearch"
          @click="addDd(addData)"
        >确认</el-button>
      </div>
    </el-dialog>
    <!-- dialog 黑名单明细-->
    <el-dialog
      title="黑名单明细"
      :visible.sync="dialogBlacklistDetails"
      center
      :close-on-click-modal="false"
      width="70%"
    >
      <h3 class="new-title">客户信息</h3>
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
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
        <span class="margin-r-20">{{Details.memberName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{Details.phone}}</span>
        <span>客户来源:</span>
        <span class="margin-r-20">{{Details.source}}</span>
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
      </div>-->
      <h3 class="new-title">黑名单详细</h3>
      <el-table :data="blacklistDetails" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="operation" label="操作类型" min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="操作时间"></el-table-column>
        <el-table-column prop="createUserName" label="操作人"></el-table-column>
        <el-table-column prop="remark" label="操作原因"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- dialog 下单详情-->
    <el-dialog
      title="下单详情"
      :visible.sync="dialogreadyOrder"
      center
      :close-on-click-modal="false"
      width="90%"
      :before-close="readyOrderCancel"
    >
      <h3 class="new-title">客户信息</h3>
      <el-table
        :border="true"
        :data="Details"
        size="mini"
        :header-row-class-name="'headerClass-two'"
      >
        <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
        <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      </el-table>
      <!-- <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.memberName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>性别:</span>
        <span class="margin-r-20">{{Details.sex}}</span>
      </div>-->
      <h3 class="new-title">病单信息</h3>
      <el-table
        :data="currentPrescriptions"
        border
        size="mini"
        :header-row-class-name="'headerClass-two'"
      >
        <el-table-column prop="prescriptionNum" label="病单编号" min-width="100"></el-table-column>
        <el-table-column align="center" prop="pProvinceName" label="省份"></el-table-column>
        <el-table-column align="center" prop="pCityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="prescriptionSiteName" label="测评中心"></el-table-column>
        <el-table-column prop="hospitalName" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
        <el-table-column prop="updateTime" label="创建时间" min-width="100"></el-table-column>
      </el-table>
      <el-row class="margin-t-10">
        <el-col :span="2">
          <el-button
            size="mini"
            style="width：100%"
            @click="salesList()"
            icon="el-icon-s-grid"
            type="primary"
          >选择产品</el-button>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>下单人:</span>
        </el-col>
        <el-col :span="3">
          <el-input style="width：100%" v-model="orderingPerson" size="mini" placeholder="请输入姓名"></el-input>
        </el-col>
        <el-col :span="5" style="line-height: 30px;margin-left:20px">
          <el-checkbox v-model="jjChecked" @change="isJiaJi">加急费300元</el-checkbox>
        </el-col>
      </el-row>
      <el-table
        class="margin-t-10"
        :data="detailFormList"
        border
        max-height="500"
        size="mini"
        :header-row-class-name="'headerClass-two'"
      >
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
              v-if="scope.row.source =='会员卡' || scope.row.source =='测评服务' ? false:true  "
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
            <el-button
              size="mini"
              @click.native.prevent="deleteRow(scope.$index,detailFormList)"
              type="danger"
            >删除</el-button>
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
            size="mini"
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
            size="mini"
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
            size="mini"
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
      <div slot="footer">
        <el-button @click="readyOrderCancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="orderingStart()" type="success" icon="el-icon-circle-check">确认</el-button>
      </div>
    </el-dialog>
    <!-- dialog 选择产品-->
    <el-dialog
      title="选择产品"
      :visible.sync="dialogselectProduct"
      center
      :close-on-click-modal="false"
      width="90%"
      :before-close="cancelSelection"
    >
      <!-- seach product-->
      <el-row class="search">
        <el-col :span="2" id="input-title">
          <span>产品名称</span>
        </el-col>
        <el-col :span="2">
          <el-input v-model="seachProduct.name" size="mini" placeholder="请输入产品名称"></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品昵称</span>
        </el-col>
        <el-col :span="2">
          <el-input v-model="seachProduct.nickname" size="mini" placeholder="请输入产品昵称"></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>备案编号</span>
        </el-col>
        <el-col :span="2">
          <el-input v-model="seachProduct.recordNumber" size="mini" placeholder="请输入备案编号"></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品类型</span>
        </el-col>
        <el-col :span="2">
          <el-select
            clearable
            size="mini"
            v-model="seachProduct.productTypeValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in seachProduct.productTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品资质</span>
        </el-col>
        <el-col :span="2">
          <el-select clearable size="mini" v-model="seachProduct.qualification" placeholder="请选择">
            <el-option
              v-for="item in seachProduct.qualificationList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产地</span>
        </el-col>
        <el-col :span="2">
          <el-select clearable size="mini" v-model="seachProduct.origin" placeholder="请选择">
            <el-option
              v-for="item in seachProduct.originList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" id="input-title">
          <el-button size="mini" @click="salesList()" icon="el-icon-search" type="warning">查询</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="productData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        @row-click="dblclick_table_fuc"
        highlight-current-row
        max-height="500"
        :header-row-class-name="'headerClass-two'"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="recordNumber" label="备案编号"></el-table-column>
        <el-table-column prop="source" label="产品分类"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unit" label="产品规格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="model" label="产品型号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="qualification" label="产品资质" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="标准价格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="origin" label="产地" show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- Pagination 分页 -->
      <el-pagination
        @size-change="handleSizeChangeProduct"
        @current-change="handleCurrentChangeProduct"
        :current-page="pagesProduct.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesProduct.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagesProduct.total"
        class="pagination"
      ></el-pagination>
      <div slot="footer">
        <el-button @click="cancelSelection()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="confirmProduct()" type="success" icon="el-icon-circle-check">选择</el-button>
      </div>
    </el-dialog>
    <!-- dialog 特殊要求-->
    <el-dialog
      title="特殊要求"
      :visible.sync="dialogSpecialRequirements"
      center
      :close-on-click-modal="false"
    >
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="specialRequirements"></el-input>
      <div slot="footer">
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
    <el-dialog title="折扣优惠" :visible.sync="dialogDiscount" center :close-on-click-modal="false">
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
      <div slot="footer">
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
              <el-input
                v-model="item.valueCenter"
                style="width：100%"
                size="small"
                placeholder="请输入"
              ></el-input>
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
      <div slot="footer">
        <el-button @click="sizeCancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-circle-check" @click="entrySize()">确认</el-button>
      </div>
    </el-dialog>
    <!-- 选择用户弹框 -->
    <el-dialog
      title="测评人员分配"
      :visible.sync="userDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      center
    >
      <div style="width:496px;margin:0 auto;">
        <el-transfer
          v-model="myValue"
          filterable
          filter-placeholder="请输入人员"
          :titles="['待选择人员', '被选择人员']"
          :data="nameList9"
        ></el-transfer>
      </div>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="serve(201)" type="success" icon="el-icon-circle-check">新增分配</el-button>
      </span>
    </el-dialog>
    <!-- 选择用户弹框 -->
    <el-dialog
      title="取型人员分配"
      :visible.sync="takeShapeUserDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      center
    >
      <div style="width:496px;margin:0 auto;">
        <el-transfer
          v-model="myValue"
          filterable
          filter-placeholder="请输入人员"
          :titles="['待选择人员', '被选择人员']"
          :data="nameList8"
        ></el-transfer>
      </div>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="serve(310)" type="success" icon="el-icon-circle-check">新增分配</el-button>
      </span>
    </el-dialog>
    <!-- 选择用户弹框 -->
    <el-dialog
      title="试穿人员分配"
      :visible.sync="tryOnUserDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      center
    >
      <div style="width:496px;margin:0 auto;">
        <el-transfer
          v-model="myValue"
          filterable
          filter-placeholder="请输入人员"
          :titles="['待选择人员', '被选择人员']"
          :data="nameList6"
        ></el-transfer>
      </div>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="serve(360)" type="success" icon="el-icon-circle-check">新增分配</el-button>
      </span>
    </el-dialog>
    <!-- 选择用户弹框 -->
    <el-dialog
      title="维修人员分配"
      :visible.sync="serviceUserDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      center
    >
      <div style="width:496px;margin:0 auto;">
        <el-transfer
          v-model="myValue"
          filterable
          filter-placeholder="请输入人员"
          :titles="['待选择人员', '被选择人员']"
          :data="nameList12"
        ></el-transfer>
      </div>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="serve(370)" type="success" icon="el-icon-circle-check">新增分配</el-button>
      </span>
    </el-dialog>
    <!-- dialog 取型 -->
    <!-- <el-dialog
      title="取型分配"
      :visible.sync="takeShapeDialog"
      :close-on-click-modal="false"
      width="70%"
      center
    >-->
    <!-- table -->
    <!-- <el-table border :data="takeShapeData">
        <el-table-column align="center" prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column align="center" prop="rStatus" label="订单状态"></el-table-column>
        <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column align="center" prop="model" label="产品型号"></el-table-column>
        <el-table-column align="center" prop="number" label="产品数量"></el-table-column>
        <el-table-column align="center" label="分配">
          <template slot-scope="scope">
            <el-button @click="fpr(scope.row)" type="success" size="small">分配取型人</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="oweMoney" label="下欠金额"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="details(scope.row.orderNum)" type="success" size="small">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>-->
    <!-- dialog 试穿 -->
    <!-- <el-dialog
      title="试穿分配"
      :visible.sync="tryOnDialog"
      :close-on-click-modal="false"
      width="70%"
      center
    >-->
    <!-- table -->
    <!-- <el-table border :data="tryOnData">
        <el-table-column align="center" prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column align="center" prop="rStatus" label="订单状态"></el-table-column>
        <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column align="center" prop="model" label="产品型号"></el-table-column>
        <el-table-column align="center" prop="number" label="产品数量"></el-table-column>
        <el-table-column align="center" label="分配">
          <template slot-scope="scope">
            <el-button @click="scfpr(scope.row)" type="success" size="small">分配试穿人</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="oweMoney" label="下欠金额"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="details(scope.row.orderNum)" type="success" size="small">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>-->
    <!-- dialog 维修 -->
    <!-- <el-dialog
      title="维修分配"
      :visible.sync="serviceDialog"
      :close-on-click-modal="false"
      width="70%"
      center
    >-->
    <!-- table -->
    <!-- <el-table border :data="serviceData">
        <el-table-column align="center" prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column align="center" prop="rStatus" label="订单状态"></el-table-column>
        <el-table-column align="center" prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column align="center" prop="model" label="产品型号"></el-table-column>
        <el-table-column align="center" prop="number" label="产品数量"></el-table-column>
        <el-table-column align="center" label="分配">
          <template slot-scope="scope">
            <el-button @click="wxfpr(scope.row)" type="success" size="small">分配维修人</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="oweMoney" label="下欠金额"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="details(scope.row.orderNum)" type="success" size="small">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>-->
    <!-- drawer 评价抽屉-->
    <el-drawer
      id="pingjia"
      title="初诊评价开始！请客户开始评价！"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
      center
    >
      <div class="visitEvaluation">
        <div class="questionOne">{{question.title1}}</div>
        <div class="questionOneBut">
          <div
            v-for="(item,index) in question.answer"
            :key="index"
            :class="{active:active==item.title}"
          >{{item.title}}</div>
        </div>
        <div class="questionOne">{{question.title2}}</div>
        <div class="questionOneBut">
          <div
            v-for="(item,index) in question.answer"
            :key="index"
            :class="{active:activeTwo==item.title}"
          >{{item.title}}</div>
        </div>
      </div>
      <div class="center" style="margin-top:20%;">
        <el-button type="primary" @click="getRatingInformation">获取客户评价信息</el-button>
        <el-button type="success" @click="SaveRatingInformation">保存客户评价信息</el-button>
      </div>
    </el-drawer>
    <!-- dialog 测评详情-->
    <el-dialog
      title="测评信息详情"
      :visible.sync="dialogEvaluationDetails"
      center
      :close-on-click-modal="false"
      width="80%"
    >
      <h3 class="new-title">客户信息</h3>
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
        <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="address" label="家庭住址"></el-table-column>
      </el-table>
      <!-- <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.memberName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{Details.phone}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{Details.address}}</span>
      </div>-->
      <h3 class="new-title">测评信息</h3>
      <el-table :border="true" :data="examinationInfo" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="remark" label="结果备注"></el-table-column>
        <el-table-column align="center" prop="repeatTime" label="复查日期"></el-table-column>
        <el-table-column align="center" prop="cooperate" label="孩子配合程度"></el-table-column>
        <el-table-column align="center" prop="cycle" label="治疗周期"></el-table-column>
        <el-table-column align="center" prop="recommendCN" label="老带新"></el-table-column>
        <el-table-column align="center" prop="tuobeiCN" label="驼背"></el-table-column>
        <el-table-column align="center" prop="memberAnalysisCN" label="客户分析"></el-table-column>
        <el-table-column align="center" prop="memberModeCN" label="客户类型"></el-table-column>
        <el-table-column align="center" prop="completeCN" label="是否全身测评"></el-table-column>
        <el-table-column align="center" prop="incompleteReason" label="未进行全身测评的原因"></el-table-column>
        <el-table-column align="center" prop="recoveryCN" label="恢复情况"></el-table-column>
      </el-table>
      <!-- <el-row>
        <el-col :span="4">
          <h3 class="new-title">结果备注</h3>
          <div>{{examinationInfo.remark || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">复查日期</h3>
          <div>{{examinationInfo.repeatTime || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">孩子配合程度</h3>
          <div>{{examinationInfo.cooperate || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">治疗周期</h3>
          <div>{{examinationInfo.cycle || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">老带新</h3>
          <div>{{examinationInfo.recommendCN || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">驼背</h3>
          <div>{{examinationInfo.tuobeiCN || "暂无数据"}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3 class="new-title">客户分析</h3>
          <div>{{examinationInfo.memberAnalysisCN || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">客户类型</h3>
          <div>{{examinationInfo.memberModeCN || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">是否全身测评</h3>
          <div>{{examinationInfo.completeCN || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">未进行全身测评的原因</h3>
          <div>{{examinationInfo.incompleteReason || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="new-title">恢复情况</h3>
          <div>{{examinationInfo.recoveryCN || "暂无数据"}}</div>
        </el-col>
      </el-row> -->
      <h3 class="new-title">测评详情</h3>
      <div v-for="(item,index) in detailList" :key="index" class="margin-t-20">
        <div>
          <span>测评项目:</span>
          <span class="margin-r-20">{{item.examinationName}}</span>
          <el-button
            class="right"
            v-if="item.examinationName=='足部3D扫描测评'"
            type="primary"
            icon="el-icon-edit"
            @click="threeD_show(item.detail)"
            size="mini"
          >修改</el-button>
        </div>
        <div class="margin-t-5">
          <span>测评数据:</span>
          <span
            class="margin-r-20"
            v-for="(element,index) in item.detail"
            :key="index"
          >{{element.name}}:{{element.value}}</span>
        </div>
        <!-- <div class="margin-t-5">
          <span>新增病情:</span>
          <span class="margin-r-20">{{item.normal}}</span>
        </div>-->
        <div class="margin-t-5">
          <span>测评结果:</span>
          <span class="margin-r-20">{{item.result}}</span>
        </div>
        <div class="clearfix">
          <div
            class="margin-t-5 left margin-r-5"
            v-for="(imgUrlList,index) in item.url"
            :key="index"
          >
            <el-image :src="imgUrlList">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </div>
        <hr class="border-dashed" />
      </div>
    </el-dialog>
    <!-- dialog 黑名单操作-->
    <el-dialog
      title="黑名单操作"
      :visible.sync="addBlack"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="cancelBlack"
    >
      <el-input type="textarea" :rows="4" v-model="BlackReason" placeholder="请输入原因"></el-input>
      <div slot="footer">
        <el-button @click="cancelBlack()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          v-if="isBlackBut == 1"
          type="success"
          icon="el-icon-circle-check"
          :loading="isSearch"
          @click="addBlackList(0)"
        >确认拉黑</el-button>
        <el-button
          v-if="isBlackBut == 2"
          type="success"
          icon="el-icon-circle-check"
          :loading="isSearch"
          @click="addBlackList(1)"
        >确认移出</el-button>
      </div>
    </el-dialog>
    <!-- dialog 转移测评中心-->
    <el-dialog
      title="转移测评中心"
      :visible.sync="dialogTransferSite"
      center
      :close-on-click-modal="false"
      :before-close="cancelTransfer_func"
    >
      <el-form :model="transferSite" ref="dialogForm" :inline="true" size="mini" label-width="80px">
        <el-form-item label="省份">
          <el-select
            clearable
            v-model="transferSite.provinceValue"
            placeholder="请选择"
            @change="cityList(transferSite.provinceValue)"
          >
            <el-option
              v-for="item in transferSite.provinceIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select
            clearable
            v-model="transferSite.citysValue"
            placeholder="请先选择省份"
            @change="siteList(transferSite.citysValue)"
          >
            <el-option
              v-for="item in transferSite.cityIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测评中心">
          <el-select clearable v-model="transferSite.siteId" placeholder="请先选择测评中心">
            <el-option
              v-for="item in transferSite.siteLists"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="transferSite.sitePhone" placeholder="请输入客户电话" style="width:193px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelTransfer_func()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="confirmTransferSite_func()" type="success" icon="el-icon-circle-check">保存</el-button>
      </div>
    </el-dialog>
    <!-- dialog 打印检测报告-->
    <el-dialog
      title="检测报告"
      :visible.sync="dialogTestReport"
      center
      :close-on-click-modal="false"
      width="70%"
    >
      <my-print :testReport="testReport" :isTwo="isTwo" ref="print"></my-print>
      <div slot="footer">
        <el-button @click="close_testReport()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-receiving" @click="printpage()">打印报告</el-button>
        <el-button type="success" icon="el-icon-picture-outline" v-on:click="getPdf()">导出PDF</el-button>
      </div>
    </el-dialog>
    <!-- dialog 足长足宽修改-->
    <el-dialog title="足长足宽修改" :visible.sync="threeDDialg" :close-on-click-modal="false" width="30%">
      <el-form :model="threeD_ObjFrom" :inline="true" size="mini" label-width="80px">
        <el-form-item v-for="(item,index) in threeD_ObjFrom.list" :key="index" :label="item.name">
          <el-input v-model="item.value" size="small" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="threeD_func()" type="success" icon="el-icon-circle-check">提交</el-button>
      </div>
    </el-dialog>
    <!-- 分配接待弹框-->
    <el-dialog
      title="分配接待"
      :visible.sync="assigned_reception_dialog"
      :before-close="assigned_reception_cancel"
      :close-on-click-modal="false"
      width="900px"
    >
      <div class="clearfix">
        <div class="left left-1">
          <ul>
            <li
              v-for="(item,index) in tabList"
              :key="index"
              @click="toggle(index,item.name)"
              :class="{active:tabActive == index}"
            >{{item.name}}</li>
          </ul>
        </div>
        <div class="left left-2">
          <el-table
            v-if="tabActive != 0"
            :data="assigned_reception_data.fpjd_product"
            @selection-change="handleSelectionChange"
            max-height="200"
            border
            class="margin-b-10"
            :header-row-class-name="'headerClass-two'"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="orderNum" label="订单编号"></el-table-column>
            <el-table-column prop="rStatus" label="订单状态"></el-table-column>
            <el-table-column prop="nickname" label="产品昵称"></el-table-column>
          </el-table>
          <div style="width:496px;margin:0 auto;">
            <el-transfer
              v-model="assigned_reception_data.user"
              filterable
              filter-placeholder="请输入人员"
              :titles="['待选人员-接待数', '被选人员-接待数']"
              :data="assigned_reception_data.userList"
            ></el-transfer>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button
          @click="assigned_reception_cancel()"
          type="primary"
          icon="el-icon-circle-close"
        >取消</el-button>
        <el-button @click="assigned_reception_save()" type="success" icon="el-icon-circle-check">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getHospitalList,
  selectDepartmentByHospitalId,
  queryDoctorByDepartmentId,
  queryMemberByPage,
  addMember,
  updateMemberInfo,
  queryForUpdate,
  queryMemberDetail,
  blackOperation,
  queryBlackHistory,
  addPrescription,
  updatePrescription,
  orderInsert,
  sales,
  deleteUser,
  setPjType,
  userListByDept,
  insertAssign,
  getPjInfo,
  firstAssess,
  product,
  orderDetail,
  queryExamineDetail,
  receptionQueryMember,
  selectAdvanceUser,
  changeSite,
  printMakeParam,
  selectUserListByHospitalId,
  examinePadZb3d,
  /*新增查询接口*/
  backVisitRemainingToday,
  shapeRemainingToday,
  tryOnRemainingToday,
  selectMemberReserved,
  userListByDepts,
  userAssignListByDept,
  insertAssignList
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import {
  exportMethod,
  province,
  city,
  site,
  allSite,
  hospital,
  getBase64Image,
  img_base64,
  personnel
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import Print from "../commonComponent/PrintTemplate";
import placeOrder from "../navComponent/place_order";
import naVComponent from "../navComponent/page";
import naVComponent_variable from "../navComponent/page_variable";
import frontDesk_variable from "./frontDesk_variable";
import frontDesk from "./page";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (this.isShowVal == 1) {
        if (!value) {
          // callback();
          callback(new Error("手机号不能为空"));
        } else {
          const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            // this.ruleForm.phone = null;
            return callback(new Error("请输入正确的手机号"));
          }
        }
      } else {
        return true;
      }
    };
    return {
      /*新增data*/
      tabList: [
        { name: "测评接待" },
        { name: "取型接待" },
        { name: "试穿接待" },
        { name: "维修接待" }
      ],
      tabActive: 0,
      assigned_reception_dialog: false,
      /*** left抽屉*/
      left_drawer_data: frontDesk_variable.left_drawer_data,
      /*** 分配接待弹框数据*/
      assigned_reception_data: frontDesk_variable.assigned_reception_data,
      /****top box */
      topActive: 0,
      box_top_data: {},
      /** */
      addClientTitle: "新增客户",
      dialogEvaluationDetails: false, //测评信息详情弹框
      examinationInfo: [{}], //测评详情
      detailList: [], //测评详情
      specialRequirements: null,
      discount: null,
      discountList: naVComponent_variable.discount,
      productData: [],
      multipleSelection: [],
      detailFormList: [],
      seachProduct: naVComponent_variable.seachProduct,
      jjChecked: false,
      orderingPerson: null,
      paymentMethod: {
        orderNum: null,
        xj: 0,
        zz: 0,
        lkl: 0,
        total: 0,
        totalAmountReceivable: 0,
        arrears: 0,
        lx: null
      },
      isBlackBut: null,
      currentPrescriptions: [],
      seach: frontDesk_variable.seach,
      clientData: [],
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      dialogFormVisible: false,
      modefiy: false,
      addBlack: false,
      dialogDepartmentDetails: false,
      dialogBlacklistDetails: false,
      dialogAddbd: false,
      dialogreadyOrder: false,
      dialogselectProduct: false,
      dialogSpecialRequirements: false,
      dialogDiscount: false,
      dialogSizeDetails: false,
      ruleForm: {
        name: null,
        phone: null,
        school: null,
        birthday: null,
        sex: null,
        zhouqi: null,
        renzhi: null,
        laiyuan: null,
        memberType: null,
        desc: null,
        memberId: null
      },
      rules: {
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        // school: [
        //   { required: true, message: "请输入学校名称", trigger: "blur" }
        // ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        birthday: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        zhouqi: [{ required: true, message: "请选择周期", trigger: "change" }],
        renzhi: [{ required: true, message: "请选择认知", trigger: "change" }],
        laiyuan: [{ required: true, message: "请选择来源", trigger: "change" }],
        memberType: [
          { required: true, message: "请选择来源", trigger: "change" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      addData: naVComponent_variable.addData,
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      //产品分页
      pagesProduct: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      BlackReason: null,
      currentNamberId: null,
      Details: [
        {
          address: null,
          birthday: null,
          cognition: null,
          isBlack: null,
          memberName: null,
          phone: null,
          school: null,
          sex: null,
          source: null,
          treatmentCycle: null,
          treatmentCycleTime: null
        }
      ],
      memberCard: [],
      prescriptions: null,
      evaluates: null,
      orders: null,
      blacklistDetails: null,
      DataList: null,
      modfiyTreatmentCycle: null,
      bianhao: null,
      cpIndex: null,
      zhekouyouhui: {
        favorable: null
      },
      favorableRemark: null,
      productSize: {
        list: [],
        radio: "",
        shapeUserList: [],
        shapeUser: ""
      },
      userDialog: false,
      xzfp: {
        memberId: null,
        productId: null
      },
      takeShapeData: [],
      tryOnData: [],
      serviceData: [],
      tryOnDialog: false,
      serviceDialog: false,
      takeShapeDialog: false,
      drawer: false,
      myValue: [],
      nameList8: [],
      nameList9: [],
      nameList6: [],
      nameList12: [],
      userDialog: false,
      takeShapeUserDialog: false,
      tryOnUserDialog: false,
      serviceUserDialog: false,
      takeShapeDialog: false,
      tryOnDialog: false,
      serviceDialog: false,
      direction: "rtl",
      active: null,
      activeTwo: null,
      question: {
        title1: "1.您现在对孩子的病情有清晰的认知吗？",
        title2: "2.您现在对病情恢复周期有清晰的认知吗？",
        answer: [
          { title: "有清晰认知" },
          { title: "没有清晰认知" },
          { title: "完全不知道" }
        ]
      },
      //查看订单详情
      // DdialogDepartmentDetails: false,
      PatientInformation: [],
      orderInformation: {},
      refundRecordDto: null,
      favorableDto: [],
      imgUrl: null,
      backstageData: null,
      spanArr: [],
      position: 0,
      spanArr2: [],
      position2: 0,
      loading: true,
      isSearch: false,
      dialogTransferSite: false,
      transferSite: {
        provinceValue: null,
        provinceIdList: [],
        citysValue: null,
        cityIdList: [],
        siteId: null,
        siteLists: [],
        sitePhone: null
      },
      xd_siteId: null,
      //检测报告
      dialogTestReport: false,
      testReport: {},
      isTwo: true,
      htmlTitle: "测评报告PDF",
      /**新增data */
      productOrderTypeList: [
        { name: "处方产品", id: 1 },
        { name: "新增产品", id: 2 },
        { name: "更换产品", id: 3 },
        { name: "赠送产品", id: 4 }
      ],
      overdueList: [],
      tryOnly_show: true,
      isShowVal: null,
      threeD_ObjFrom: {
        list: []
      },
      threeDDialg: false,
      only_recordId: null
    };
  },
  components: {
    "my-print": Print
  },
  mounted() {
    this.pageList();
    // this.hospitals();
    this.provinceList();
    this.personnel(8);
    this.personnel(9);
    this.personnel(6);
    this.personnel(12);
    this.init();
    this.init_two();
  },
  methods: {
    fpjd_product_func(obj, type) {
      let data = {
        id: obj.memberId,
        type: type
      };
      product(data)
        .then(res => {
          console.log(res);
          this.assigned_reception_data.fpjd_product = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  scfpr(obj) {
    //   console.log(obj);
    //   let data = {
    //     productId: obj.id,
    //     type: 360
    //   };
    //   selectAdvanceUser(data)
    //     .then(res => {
    //       this.myValue = res.data.data;
    //       this.tryOnUserDialog = true;
    //       this.xzfp.productId = obj.id;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    receptionist_func(obj, deptId = 9) {
      this.assigned_reception_data.userObj = obj;
      let data = {
        deptId: deptId,
        siteId: obj.siteId
      };
      userAssignListByDept(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.assigned_reception_dialog = true;
            this.assigned_reception_data.userList = res.data.data;
            // .dtos;
            // this.assigned_reception_data.user = res.data.data.idList;
          }
        })
        .catch(err => {
          console.log(err);
        });
      // frontDesk.receptionist_func(this, deptId, siteId);

      if (deptId == 9) {
        let data2 = {
          type: 201,
          memberId: obj.memberId
        };
        selectAdvanceUser(data2)
          .then(res => {
            this.assigned_reception_data.user = res.data.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    init_two() {
      let data = {
        depts: [6, 9]
      };
      userListByDepts(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.left_drawer_data.userList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    left_drawer_search_func() {
      let ldd = this.left_drawer_data;
      let data = {
        pageNum: ldd.pages.currentPage,
        pageSize: ldd.pages.pageSize,
        beginTime: ldd.search.time == null ? null : ldd.search.time[0],
        endTime: ldd.search.time == null ? null : ldd.search.time[1],
        timePeriod: ldd.search.timePeriod || null,
        memberName: ldd.search.memberName || null,
        phone: ldd.search.phone || null,
        reservedType: ldd.search.reservedType || null,
        productName: ldd.search.productName || null,
        user: ldd.search.user || null
      };
      ldd.loading = true;
      ldd.isSearch = true;
      selectMemberReserved(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            ldd.clientData = dataList.data;
            ldd.pages.total = dataList.total;
            ldd.loading = false;
            ldd.isSearch = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    left_drawer_func() {
      this.left_drawer_search_func();
      this.left_drawer_data.lef_drawer = true;
    },
    topItem_func(index) {
      frontDesk.topItem_func(this, index);
    },
    toggle(index, name) {
      this.tabActive = index;
      this.assigned_reception_data.user = [];
      if (index == 0) {
        this.receptionist_func(this.assigned_reception_data.userObj, 9);
      } else if (index == 1) {
        this.fpjd_product_func(this.assigned_reception_data.userObj, 310);
        this.receptionist_func(this.assigned_reception_data.userObj, 8);
      } else if (index == 2) {
        this.fpjd_product_func(this.assigned_reception_data.userObj, 363);
        this.receptionist_func(this.assigned_reception_data.userObj, 6);
      } else if (index == 3) {
        this.fpjd_product_func(this.assigned_reception_data.userObj, 366);
        this.receptionist_func(this.assigned_reception_data.userObj, 12);
      }
    },
    assigned_reception_func() {
      this.receptionist_func(this.assigned_reception_data.userObj);
      this.assigned_reception_dialog = true;
    },
    assigned_reception_cancel() {
      this.tabActive = 0;
      this.assigned_reception_dialog = false;
      this.multipleSelection = [];
      this.assigned_reception_data.user = [];
    },
    assigned_reception_save() {
      if (this.assigned_reception_data.user.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择人员！",
          center: true
        });
      } else {
        let list = [];
        let type = null;
        if (this.tabActive == 0) {
          type = 201;
        } else if (this.tabActive == 1) {
          type = 310;
        } else if (this.tabActive == 2) {
          type = 360;
        } else if (this.tabActive == 3) {
          type = 370;
        }
        if (this.multipleSelection.length == 0) {
          list.push({
            memberId: this.assigned_reception_data.userObj.memberId,
            type: type,
            users: this.assigned_reception_data.user,
            productId: null
          });
        } else {
          this.multipleSelection.forEach(obj => {
            list.push({
              memberId: this.assigned_reception_data.userObj.memberId,
              type: type,
              users: this.assigned_reception_data.user,
              productId: obj.id
            });
          });
        }

        let data = {
          assignForms: list
        };

        insertAssignList(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.assigned_reception_cancel();
              this.$message({
                type: "success",
                message: "分配成功！",
                center: true
              });
              this.topItem_func(this.topActive);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeSizeVal_fuc(value, index) {
      naVComponent.changeSizeVal_fuc(this, value, index);
    },
    dblclick_table_fuc(row, column, cell, event) {
      naVComponent.dblclick_table_fuc(this, row);
    },
    discount_fuc(value) {
      naVComponent.discount_fuc(this, value);
    },
    Adddis_fuc() {
      this.dialogAddbd = true;
      naVComponent.default_PCSH(this);
    },
    threeD_func() {
      naVComponent.threeD_func(this);
    },
    threeD_show(obj) {
      this.threeD_ObjFrom.list = obj;
      this.threeDDialg = true;
    },
    isRequired(val) {
      naVComponent.isRequired(this, val);
    },
    init() {
      if (localStorage.getItem("witchPage") == "试穿") {
        this.tryOnly_show = false;
      } else {
        this.tryOnly_show = true;
      }
    },
    printpage() {
      this.$print2(this.$refs.print);
    },
    close_testReport() {
      this.dialogTestReport = false;
      this.testReport = {};
    },
    evaluationReport(id) {
      let data = {
        recordId: id
      };
      printMakeParam(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.testReport = res.data.data;
            img_base64(this, res.data.data);
            this.dialogTestReport = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirmTransferSite_func() {
      naVComponent.confirmTransferSite_func(this);
    },
    cancelTransfer_func() {
      this.transferSite.provinceValue = null;
      this.transferSite.citysValue = null;
      this.transferSite.siteId = null;
      this.transferSite.sitePhone = null;
      this.dialogTransferSite = false;
    },
    //转测评中心
    transferSite_func(id) {
      this.currentNamberId = id;
      this.dialogTransferSite = true;
    },
    addBlackList(operation) {
      this.isSearch = true;
      if (!!this.BlackReason) {
        let data = {
          operation: operation,
          memberId: this.currentNamberId,
          remark: this.BlackReason
        };
        blackOperation(data)
          .then(res => {
            this.isSearch = false;
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancelBlack();
              this.pageList(this.pages.currentPage, this.pages.pageSize);
              // this.handleModify(this.currentNamberId);
              this.dialogDepartmentDetails = false;
              this.resetForm("ruleForm");
              this.$message({
                type: "success",
                message: "操作成功！",
                center: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.isSearch = false;
        this.$message({
          type: "warning",
          message: "请填写原因！",
          center: true
        });
      }
    },
    cancelBlack() {
      this.addBlack = false;
      this.BlackReason = null;
    },
    goBlack() {
      this.addBlack = true;
    },
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
    rowspan() {
      frontDesk.rowspan(this);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 2) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 3) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 4) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }

      if (columnIndex === 5) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 8) {
        const _row = this.spanArr2[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 9) {
        const _row = this.spanArr2[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 10) {
        const _row = this.spanArr2[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 11) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    evaluationDetails(id) {
      this.only_recordId = id;
      let data = {
        recordId: id
      };
      queryExamineDetail(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.examinationInfo[0] = res.data.data.examinationInfo;
            this.detailList = res.data.data.detailList;
            this.dialogEvaluationDetails = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改实际价格改变价格
    changeMoney() {
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    allocationList() {
      this.takeShapeDialog = false;
      this.tryOnDialog = false;
      this.serviceDialog = false;
    },
    cancelSelection() {
      this.dialogselectProduct = false;
      this.multipleSelection = [];
    },
    wxfpr(obj) {
      this.serviceUserDialog = true;
      this.xzfp.productId = obj.id;
    },
    scfpr(obj) {
      console.log(obj);
      let data = {
        productId: obj.id,
        type: 360
      };
      selectAdvanceUser(data)
        .then(res => {
          this.myValue = res.data.data;
          this.tryOnUserDialog = true;
          this.xzfp.productId = obj.id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fpr(obj) {
      this.takeShapeUserDialog = true;
      this.xzfp.productId = obj.id;
    },
    SaveRatingInformation() {
      // let data = {
      //   memberId: this.numberId,
      // firstCognition: [
      //   { question: this.question.title1, answer: this.active },
      //   { question: this.question.title1, answer: this.activeTwo }
      // ]
      // answer1: "有清晰认知"
      // answer2: "没有清晰认知"
      // info: "您现在对孩子的病情有清晰认知,您现在对病情恢复周期没有清晰认知"
      // question1: "1.您现在对孩子的病情有清晰的认知吗？"
      // question2: "2.您现在对病情恢复周期有清晰的认知吗？"
      // };
      let data = this.backstageData;
      data.memberId = this.numberId;
      firstAssess(data)
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
              message: "保存成功！",
              center: true
            });
            this.handleClose();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRatingInformation() {
      getPjInfo()
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            // console.log(res);
            this.active = res.data.data.answer1;
            this.activeTwo = res.data.data.answer2;
            this.backstageData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClose() {
      this.drawer = false;
      this.active = null;
      this.activeTwo = null;
    },
    cancel() {
      this.userDialog = false;
      this.takeShapeUserDialog = false;
      this.tryOnUserDialog = false;
      this.serviceUserDialog = false;
      this.xzfp.productId = null;
      this.myValue = [];
      // this.nameList8 = [];
      // this.nameList9 = [];
      // this.nameList6 = [];
      // this.nameList12 = [];
    },
    serve(type) {
      if (this.myValue.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择人员！",
          center: true
        });
      } else {
        let data = {
          memberId: this.xzfp.memberId,
          productId: this.xzfp.productId || null,
          type: type,
          users: this.myValue
        };

        insertAssign(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.cancel();
              this.allocationList();
              this.$message({
                type: "success",
                message: "分配成功！",
                center: true
              });
              this.pageList(this.pages.currentPage, this.pages.pageSize);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //获取试穿、测评、取型、维修人员列表
    personnel(id, siteId) {
      let data = {
        deptId: id,
        siteId: siteId
      };
      if (id == 6) {
        userListByDept(data)
          .then(res => {
            // console.log(res);
            let data = res.data.data;
            let list = [];
            data.forEach(element => {
              list.push({ label: element.username, key: element.id });
            });
            this.nameList6 = list;
            // console.log(this.nameList6);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (id == 8) {
        userListByDept(data)
          .then(res => {
            // console.log(res);
            let data = res.data.data;
            let list = [];
            data.forEach(element => {
              list.push({ label: element.username, key: element.id });
            });
            this.nameList8 = list;

            // console.log(this.nameList8);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (id == 9) {
        userListByDept(data)
          .then(res => {
            // console.log(res);
            let data = res.data.data;
            let list = [];
            data.forEach(element => {
              list.push({ label: element.username, key: element.id });
            });
            this.nameList9 = list;
            // console.log(this.nameList9);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (id == 12) {
        userListByDept(data)
          .then(res => {
            // console.log(res);
            let data = res.data.data;
            let list = [];
            data.forEach(element => {
              list.push({
                label: element.username,
                key: element.id
              });
            });
            this.nameList12 = list;
            // console.log(this.nameList12);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    czpj(obj) {
      // console.log("测评开始")
      this.numberId = obj.memberId;
      let data = {
        type: 1
      };
      setPjType(data)
        .then(res => {
          // console.log(res);
          this.drawer = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    qxjd(obj, type) {
      this.xzfp.memberId = obj.memberId;
      let data = {
        id: obj.memberId,
        type: type
      };
      product(data)
        .then(res => {
          // console.log(res);
          if (type == 310) {
            this.personnel(8, obj.siteId);
            this.takeShapeData = res.data.data;
            this.takeShapeDialog = true;
          } else if (type == 363) {
            this.personnel(6, obj.siteId);
            this.tryOnData = res.data.data;
            this.tryOnDialog = true;
          } else if (type == 366) {
            this.personnel(12, obj.siteId);
            this.serviceData = res.data.data;
            this.serviceDialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // details(orderNum) {
    //   //this.paymentMethod.orderNum = orderNum;
    //   let data = {
    //     orderNum: orderNum
    //   };
    //   orderDetail(data)
    //     .then(res => {
    //       // console.log(res);
    //       // //debugger;
    //       this.Details.memberName = res.data.data.orderDetailDto.customerName;
    //       this.Details = res.data.data.orderDetailDto;
    //       //this.Details.address = res.data.data.orderDetailDto.address;
    //       // this.Details.birthday = res.data.data.orderDetailDto.birthday;
    //       // this.Details.isBlack = res.data.data.orderDetailDto.black;
    //       // this.Details.phone = res.data.data.orderDetailDto.phone;
    //       // this.Details.sex = res.data.data.orderDetailDto.sex;
    //       // this.Details.school = res.data.data.orderDetailDto.school;
    //       // this.Details.source = res.data.data.orderDetailDto.source;
    //       this.prescriptions = res.data.data.saleDetailDtos;
    //       this.refundData = res.data.data.saleDetailDtos;
    //       this.PatientInformation[0] = res.data.data.orderDetailDto;
    //       this.orderInformation = res.data.data.orderDetailDto;
    //       this.favorableDto = res.data.data.favorableDtos;
    //       this.refundRecordDto = res.data.data.refundDetails;
    //       this.paymentMethod.orderId = res.data.data.orderDetailDto.orderId;
    //       this.imgUrl = javaApi.ExportUrl + res.data.data.orderDetailDto.url;
    //       // console.log(this.imgUrl);
    //       this.refundData.forEach(obj => {
    //         obj.amount = 0;
    //       });
    //       this.DdialogDepartmentDetails = true;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    cpjd(obj) {
      this.userDialog = true;
      this.xzfp.memberId = obj.memberId;
      this.personnel(9, obj.siteId);
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
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    specialRequirementsCancel() {
      naVComponent.specialRequirementsCancel(this);
    },
    specialRequirementsConfirm() {
      this.detailFormList.forEach((obj, index) => {
        if (index == this.cpIndex) {
          obj.demand = this.specialRequirements;
        }
      });
      this.specialRequirementsCancel();
      // console.log(this.detailFormList[0]);
    },
    discountConfirm() {
      naVComponent.discountConfirm(this);
    },
    tsyq(obj) {
      this.dialogSpecialRequirements = true;
      this.cpIndex = obj.$index;
      // console.log(obj.$index);
      this.specialRequirements = obj.row.demand;
    },
    zkyh(obj) {
      naVComponent.zkyh(this, obj);
    },
    deliveryTimeDate(value, index) {
      this.$set(this.detailFormList, index, value);
      // console.log(value);
    },
    confirmProduct() {
      placeOrder.choose_product(this);
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
    },
    salesList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        prescriptionNum: this.currentPrescriptions[0].prescriptionNum,
        qualification: this.seachProduct.qualification || null,
        name: this.seachProduct.name || null,
        nickname: this.seachProduct.nickname || null,
        source: this.seachProduct.productTypeValue || null,
        recordNumber: this.seachProduct.recordNumber || null,
        origin: this.seachProduct.origin || null
        // siteId:this.xd_siteId
      };
      sales(data)
        .then(res => {
          console.log(res);
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            // debugger
            this.productData = res.data.data.data;
            this.pagesProduct.total = res.data.data.total;
            this.dialogselectProduct = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    calculation() {
      naVComponent.calculation(this);
    },
    readyOrderCancel() {
      this.dialogreadyOrder = false;
      this.currentPrescriptions = [];
      this.detailFormList = [];
      this.jjChecked = null;
      this.paymentMethod.total = 0;
      this.paymentMethod.totalAmountReceivable = 0;
      this.paymentMethod.arrears = 0;
      this.paymentMethod.lkl = 0;
      this.paymentMethod.zz = 0;
      this.paymentMethod.xj = 0;
    },
    orderingStart() {
      naVComponent.orderingStart(this);
    },
    readyOrder(obj) {
      this.dialogreadyOrder = true;
      this.xd_siteId = obj.prescriptionSiteId;
      this.currentPrescriptions.push(obj);
      this.orderingPerson = session.getItem("username");
    },
    sizeEntry(obj) {
      naVComponent.sizeEntry(this, obj);
    },
    submitModfiy(formName) {
      this.isSearch = true;
      // this.$refs[formName].validate(valid => {
      let data = {
        channel: 0,
        memberName: this.ruleForm.name,
        memberId: this.ruleForm.memberId,
        phone: this.ruleForm.phone,
        school: this.ruleForm.school || "",
        sex: Number(this.ruleForm.sex),
        birthday: this.ruleForm.birthday,
        address: this.ruleForm.desc || "",
        treatmentCycle: Number(this.ruleForm.zhouqi),
        cognition: this.ruleForm.renzhi,
        source: Number(this.ruleForm.laiyuan),
        memberType: Number(this.ruleForm.memberType),
        siteId: this.addData[0].siteValue,
        provinceId: this.addData[0].provinceId,
        cityId: this.addData[0].cityId
      };
      // console.log(data)
      updateMemberInfo(data)
        .then(res => {
          this.isSearch = false;
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
            this.resetForm("ruleForm");
            this.xiangxifanhui();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
          }
        })
        .catch(err => {
          console.log(err);
        });
      // });
    },
    cancelDd() {
      this.dialogAddbd = false;
      this.addData[0].condition = null;
      this.addData[0].obCondition = null;
      this.addData[0].prescriptionValue = null;
      this.addData[0].departmentValue = null;
      this.addData[0].doctorValue = null;
      this.addData[0].hospitalValue = null;
      this.addData[0].siteValue = null;
      this.addData[0].provinceId = null;
      this.addData[0].cityId = null;
      this.bianhao = null;
    },
    addDd(obj) {
      this.isSearch = true;
      if (
        obj[0].doctorValue != null &&
        obj[0].prescriptionValue != null &&
        obj[0].siteValue != null &&
        obj[0].provinceId != null &&
        obj[0].cityId != null
        // &&
        // obj[0].condition != null
      ) {
        let data = {
          channel: 1,
          memberId: this.currentNamberId,
          doctorId: obj[0].doctorValue,
          prescriptionType: obj[0].prescriptionValue,
          condition: obj[0].condition,
          illness: obj[0].obCondition || "",
          siteId: obj[0].siteValue,
          provinceId: obj[0].provinceId,
          cityId: obj[0].cityId
        };
        if (!!this.bianhao) {
          data.prescriptionNum = this.bianhao;
          updatePrescription(data)
            .then(res => {
              //debugger;
              this.isSearch = false;
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
                this.cancelDd();
                // this.handleModify(this.currentNamberId);
                this.resetForm("ruleForm");
                this.xiangxifanhui();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          addPrescription(data)
            .then(res => {
              this.isSearch = false;
              //debugger;
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.$message({
                  type: "success",
                  message: "添加成功！",
                  center: true
                });
                this.cancelDd();
                // this.handleModify(this.currentNamberId);
                this.resetForm("ruleForm");
                this.xiangxifanhui();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.isSearch = false;
        this.$message({
          type: "warning",
          message: "请填写表格！",
          center: true
        });
      }
    },
    ddModfiy(obj) {
      // console.log(obj);
      this.departmentList(obj.hospitalId);
      this.doctorList(obj.departmentId);
      this.dialogAddbd = true;
      this.addData[0].condition = obj.condition;
      this.addData[0].obCondition = obj.illness;
      this.addData[0].prescriptionValue = obj.prescriptionType;
      this.addData[0].departmentValue = obj.departmentId;
      this.addData[0].doctorValue = obj.doctorId;
      this.addData[0].hospitalValue = obj.hospitalId;
      this.addData[0].siteValue = obj.siteId;
      this.hospitalList(obj.siteId);
      this.addData[0].provinceId = obj.provinceId;
      this.cityList(obj.provinceId);
      this.addData[0].cityId = obj.cityId;
      this.siteList(obj.cityId);
      this.bianhao = obj.prescriptionNum;
    },
    xiangxifanhui() {
      this.dialogDepartmentDetails = false;
    },
    heimingdanxiangxi() {
      this.dialogBlacklistDetails = true;
      let data = {
        memberId: this.currentNamberId
      };
      queryBlackHistory(data)
        .then(res => {
          this.blacklistDetails = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addkehu() {
      this.dialogFormVisible = true;
      this.modefiy = false;
      this.addClientTitle = "新增客户";
      naVComponent.default_PCSH(this);
    },
    submitForm(formName) {
      this.isSearch = true;
      // this.$refs[formName].validate(valid => {
      //   // console.log(this.addData[0].prescriptionValue);
      //     valid &&
      if (
        this.addData[0].prescriptionValue != null &&
        this.addData[0].departmentValue != null &&
        this.addData[0].doctorValue != null &&
        this.addData[0].hospitalValue != null &&
        this.addData[0].siteValue != null &&
        this.addData[0].provinceId != null &&
        this.addData[0].cityId != null &&
        !!this.addData[0].condition
      ) {
        let data = {
          channel: 0,
          memberName: this.ruleForm.name,
          phone: this.ruleForm.phone,
          school: this.ruleForm.school || "",
          sex: Number(this.ruleForm.sex),
          birthday: this.ruleForm.birthday,
          address: this.ruleForm.desc || "",
          treatmentCycle: Number(this.ruleForm.zhouqi),
          cognition: this.ruleForm.renzhi,
          source: Number(this.ruleForm.laiyuan),
          memberType: Number(this.ruleForm.memberType),
          doctorId: this.addData[0].doctorValue,
          prescriptionType: this.addData[0].prescriptionValue,
          condition: this.addData[0].condition,
          illness: this.addData[0].obCondition || "",
          siteId: this.addData[0].siteValue,
          provinceId: this.addData[0].provinceId,
          cityId: this.addData[0].cityId
        };
        // console.log(data)
        addMember(data)
          .then(res => {
            this.isSearch = false;
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
              this.resetForm("ruleForm");
              this.pageList(this.pages.currentPage, this.pages.pageSize);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.isSearch = false;
        this.$message({
          type: "warning",
          message: "请填写表格！",
          center: true
        });
      }
      // });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.addData[0].condition = null;
      this.addData[0].obCondition = null;
      this.addData[0].prescriptionValue = null;
      this.addData[0].departmentValue = null;
      this.addData[0].doctorValue = null;
      this.addData[0].hospitalValue = null;
      this.addData[0].siteValue = null;
      this.addData[0].provinceId = null;
      this.addData[0].cityId = null;
      this.$refs["ruleForm"].resetFields();
      this.ruleForm.name = null;
      this.ruleForm.memberId = null;
      this.ruleForm.phone = null;
      this.ruleForm.school = null;
      this.ruleForm.birthday = null;
      this.ruleForm.sex = null;
      this.ruleForm.zhouqi = null;
      this.ruleForm.renzhi = null;
      this.ruleForm.laiyuan = null;
      this.ruleForm.memberType = null;
      this.ruleForm.desc = null;
      this.modefiy = false;
      // this.currentNamberId = null;
      this.isBlackBut = null;
    },
    handleModify(id, isBlack) {
      console.log(id);
      this.currentNamberId = id;
      if (isBlack == "是") {
        this.isBlackBut = 2;
      } else {
        this.isBlackBut = 1;
      }
      //debugger;
      let data = {
        memberId: id
      };
      queryForUpdate(data)
        .then(res => {
          this.modefiy = true;
          this.addClientTitle = "修改客户信息";
          // console.log("修改");
          // console.log(res);
          this.ruleForm.name = res.data.data[0].memberName;
          this.ruleForm.memberId = res.data.data[0].memberId;
          this.ruleForm.phone = res.data.data[0].phone;
          this.ruleForm.school = res.data.data[0].school;
          this.ruleForm.birthday = res.data.data[0].birthday;
          this.ruleForm.sex = res.data.data[0].sex.toString();
          this.ruleForm.desc = res.data.data[0].address;
          this.ruleForm.renzhi = res.data.data[0].cognition;
          this.ruleForm.laiyuan = res.data.data[0].source.toString();
          this.ruleForm.memberType = res.data.data[0].memberType.toString();
          this.DataList = res.data.data[0].prescriptions;
          this.modfiyTreatmentCycle = res.data.data[0].treatmentCycle;
          this.dialogFormVisible = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleInfo(obj) {
      this.assigned_reception_data.userObj = obj;
      this.currentNamberId = obj.memberId;
      let data = {
        memberId: obj.memberId
      };
      queryMemberDetail(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            // console.log("详情");
            // console.log(res);
            this.dialogDepartmentDetails = true;
            this.Details[0] = res.data.data.memberInfo;
            this.overdueList = res.data.data.overdueList;
            this.$set(this.memberCard, 0, res.data.data.memberCard);
            // this.memberCard[0] = res.data.data.memberCard;
            this.prescriptions = res.data.data.prescriptions;
            this.evaluates = res.data.data.evaluates;
            this.orders = res.data.data.orders;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //客户列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      this.spanArr = [];
      this.position = 0;
      this.spanArr2 = [];
      this.position2 = 0;
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.name || null,
        phone: this.seach.phone || null,
        birthday: this.seach.birthday || null,
        isBlack:
          this.seach.heimingdanValue == "0" ? 0 : this.seach.heimingdanValue,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      this.loading = true;
      this.isSearch = true;
      receptionQueryMember(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let dataList = res.data.data;
            this.clientData = dataList.data.todayDTOS;
            this.box_top_data = dataList.data;
            this.pages.total = dataList.total;
            this.rowspan();
            this.loading = false;
            this.isSearch = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // async pageList(pageIndex = 1, pageSize = 10) {
    //   let data = {
    //     pageNum: pageIndex,
    //     pageSize: pageSize,
    //     memberName: this.seach.name || null,
    //     phone: this.seach.phone || null,
    //     birthday: this.seach.birthday || null,
    //     isVIP: this.seach.vipValue || null,
    //     status:
    //       this.seach.zhuangtaiValue == "0" ? 0 : this.seach.zhuangtaiValue,
    //     isBlack:
    //       this.seach.heimingdanValue == "0" ? 0 : this.seach.heimingdanValue
    //   };
    //   queryMemberByPage(data)
    //     .then(res => {
    //       // //debugger;
    //       // console.log(res)
    //       const loading = this.$loading({
    //         lock: true,
    //         text: "加载中",
    //         spinner: "el-icon-loading",
    //         background: "rgba(0, 0, 0, 0.7)"
    //       });
    //       let dataList = res.data;
    //       if (dataList) {
    //         loading.close();
    //         // //debugger;
    //         this.clientData = dataList.data;
    //         this.pages.total = dataList.total;
    //       } else {
    //         this.clientData = null;
    //         this.pages.total = 0;
    //         loading.close();
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
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
    //左抽屉页面变化时
    left_drawer_handleCurrentChange(num) {
      this.left_drawer_data.pages.currentPage = num;
      this.left_drawer_search_func();
    },
    //左抽屉条数发生变化时
    left_drawer_handleSizeChange(val) {
      this.left_drawer_data.pages.pageSize = val;
      this.left_drawer_search_func();
    },
    //医院
    hospitals() {
      getHospitalList()
        .then(res => {
          // console.log(res);
          this.addData[0].hospitals = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //科室
    departmentList(id) {
      let data = {
        hospitalId: id
      };
      selectDepartmentByHospitalId(data)
        .then(res => {
          // //debugger;
          this.addData[0].departments = res.data.data.departments;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //医生
    doctorList(id) {
      let data = {
        departmentId: id
      };
      queryDoctorByDepartmentId(data)
        .then(res => {
          // //debugger;
          this.addData[0].doctors = res.data.data.doctors;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取省
    async provinceList() {
      let data = await province();
      this.seach.provinceIdList = data;
      this.transferSite.provinceIdList = data;
    },
    //获取市
    async cityList(id) {
      let data = await city(id);
      this.seach.cityIdList = data;
      this.transferSite.cityIdList = data;
    },
    //根据市获取测评中心列表
    async siteList(id) {
      let data = await allSite(null, id);
      this.seach.siteLists = data;
      this.transferSite.siteLists = data;
    },
    //根据测评中心获取医院列表
    async hospitalList(id) {
      let data = await hospital(id);
      // this.seach.hospitalLists = data;
      this.addData[0].hospitals = data;
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
    }
  }
};
</script>

<style scoped lang="scss">
.left-1 {
  width: 20%;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      text-align: center;
      height: 130px;
      line-height: 130px;
      color: #606266;
      background: #f7f7f7;
      cursor: pointer;
    }
    .active {
      background: #56a9ff;
      position: relative;
      color: #ffffff;
    }
    .active::after {
      content: "";
      position: absolute;
      border-top: solid 5px transparent;
      border-left: solid 10px #56a9ff;
      border-right: solid 5px transparent;
      border-bottom: solid 5px transparent;
      right: -15px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
.left-2 {
  width: 78%;
  margin-left: 2%;
}
/***top box*/
.box {
  display: flex;
  justify-content: center;
  .item {
    width: 20%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin: 0 10px 10px 10px;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    div {
      line-height: 30px;
    }
  }
  .active {
    color: #ffffff;
    background: #56a9ff;
  }

  .item1 {
    div {
      line-height: 60px;
    }
  }
}
/*****左侧悬浮菜单栏***** */
.left-muen {
  position: fixed;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  font-size: 25px;
  top: 50%;
  background: #56a9ff;
  color: #ffffff;
  left: -10px;
  cursor: pointer;
  animation: mymove 1s infinite alternate;
  z-index: 2;
}
@keyframes mymove {
  0% {
    left: -10px;
  }
  100% {
    left: 0px;
  }
}
/** */
.operation {
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
}
.input {
  border: 1px solid #ebeef5;
  color: #606266;
  padding: 5px;
  width: 80%;
}
.new-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}
.cpSize {
  float: left;
  width: 46%;
  margin: 10px 2%;
  height: 32px;
  line-height: 32px;
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
.visitEvaluation {
  width: 100%;
  position: relative;
  .questionOne {
    color: #ffffff;
    font-size: 20px;
    margin-left: 10%;
    margin-top: 8%;
  }
  .questionOneBut {
    color: #ffffff;
    font-size: 20px;
    margin-left: 10%;
    margin-top: 40px;
    div {
      display: inline-block;
      width: 20%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-left: 5%;
      padding: 5px;
      border: 4px solid #67c23a;
      border-radius: 20px;
    }
    .active {
      background: #67c23a;
    }
  }
}
.border-dashed {
  border-top: 1px dashed #666;
  margin-top: 5px;
}
</style>
<style>
#pingjia .el-drawer__open .el-drawer.rtl {
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
}
#pingjia .el-drawer__header {
  color: #ffffff;
}
</style>
