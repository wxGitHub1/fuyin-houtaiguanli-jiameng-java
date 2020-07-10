<template>
  <!-- 客户管理 -->
  <div>
    <!-- seach -->
    <el-form :inline="true" size="mini" id="search" class="padding-LR-p10">
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
      <el-form-item label="客户姓名">
        <el-input
          class="w-150"
          v-model="seach.name"
          placeholder="请输入姓名"
          autocomplete="off"
          @input="listenKey()"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input
          class="w-150"
          v-model="seach.phone"
          placeholder="请输入联系电话"
          autocomplete="off"
          @input="listenKey()"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input
          class="w-150"
          v-model="seach.createName"
          placeholder="请输入创建人姓名"
          autocomplete="off"
          @input="listenKey()"
        ></el-input>
      </el-form-item>
      <el-form-item label="到访状态">
        <el-select
          clearable
          class="w-150"
          v-model="seach.daofang.value"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.daofang.select"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户认知">
        <el-select
          clearable
          class="w-150"
          v-model="seach.renzhi.value"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.renzhi.select"
            :key="item.type"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户来源">
        <el-select
          clearable
          class="w-150"
          v-model="seach.laiyuan.value"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.laiyuan.select"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="黑名单">
        <el-select
          clearable
          class="w-150"
          v-model="seach.heimingdan.value"
          placeholder="请选择"
          @change="listenKey()"
        >
          <el-option
            v-for="item in seach.heimingdan.select"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          class="w-250"
          @change="listenKey()"
          v-model="seach.createTime"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="warning"
          @click.native="pageList(pages.currentPage,pages.pageSize)"
          class="btns"
        >查询</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addkehu()">新增</el-button>
        <el-button
          type="danger"
          icon="el-icon-download"
          @click="exportExcels()"
          :loading="excelLoad"
        >导出excel</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table
      :border="true"
      :data="clientData"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column align="center" prop="visitFlag" label="到访状态"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话" min-width="100"></el-table-column>
      <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="source" label="客户来源"></el-table-column>
      <el-table-column align="center" prop="cognition" label="客户认知"></el-table-column>
      <el-table-column align="center" prop="isBlack" label="黑名单"></el-table-column>
      <el-table-column align="center" prop="createUserName" label="创建人"></el-table-column>
      <el-table-column align="center" prop="haveOrder" label="是否下单"></el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间" min-width="100"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.phone == '***********' "
            type="primary"
            icon="el-icon-guide"
            plain
            @click="transferSite_func(scope.row.memberId)"
            size="small"
          >转测评中心</el-button>
          <el-button
            v-if="scope.row.phone != '***********' "
            type="primary"
            icon="el-icon-edit"
            plain
            @click="handleModify(scope.row.memberId,scope.row.isBlack)"
            size="small"
          >修改</el-button>
          <el-button
            @click="handleInfo(scope.row.memberId)"
            type="primary"
            icon="el-icon-document"
            size="small"
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
    <!-- dialog -->
    <el-dialog
      :title="addKeHuTitle"
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
              <el-input v-model="ruleForm.name" placeholder="请输入客户姓名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" prop="phone">
              <el-input v-model.number="ruleForm.phone" placeholder="请输入联系方式" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="就读学校:">
              <el-input v-model="ruleForm.school" placeholder="请输入就读学校" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="birthday" label="出生日期">
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
              <el-input
                type="textarea"
                v-model="ruleForm.desc"
                placeholder="请输入家庭住址地址"
                autocomplete="off"
              ></el-input>
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
      <!-- 修改列表 -->
      <el-table v-if="modefiy" :data="DataList" key="DataList" max-height="190">
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
      <!-- 新增列表 -->
      <el-table v-else :data="addData" key="addData">
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
              placeholder="请选择"
              size="mini"
              @change="hospitalList(scope.row.siteValue)"
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
            <el-input
              v-model="scope.row.condition"
              placeholder="请输入处方病情"
              autocomplete="off"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增病情" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.obCondition"
              placeholder="请输入新增病情"
              autocomplete="off"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          v-if="modefiy"
          type="success"
          icon="el-icon-circle-check"
          @click="submitModfiy('ruleForm')"
        >保存</el-button>
        <el-button
          v-else
          type="success"
          icon="el-icon-circle-check"
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
      </div> -->

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
      <h3 class="new-title">治疗周期</h3>
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="treatmentCycle" label="治疗周期"></el-table-column>
        <el-table-column align="center" prop="treatmentCycleTime" label="创建时间"></el-table-column>
      </el-table>
      <!-- <div>
        <span>治疗周期:</span>
        <span class="margin-r-20">{{Details.treatmentCycle}}</span>
        <span>创建时间:</span>
        <span>{{Details.treatmentCycleTime}}</span>
      </div> -->
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
        <el-table-column label="操作" align="center">
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
      <el-table :data="evaluates" border max-height="500" :header-row-class-name="'headerClass-two'">
        <el-table-column prop="evaluateUserName" label="测评人" min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="测评时间"></el-table-column>
        <el-table-column prop="recoveryCN" label="恢复情况"></el-table-column>
        <el-table-column label="操作" min-width="101">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="xiangxifanhui()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          v-if="Details[0].phone != '***********' "
          type="primary"
          icon="el-icon-edit"
          plain
          @click="handleModify(currentNamberId,Details[0].isBlack)"
        >修改</el-button>
        <el-button type="info" icon="el-icon-s-order" @click="heimingdanxiangxi()">黑名单详细</el-button>
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
      <el-input
        type="textarea"
        :rows="4"
        v-model="BlackReason"
        placeholder="请输入原因"
        autocomplete="off"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBlack()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          v-if="isBlackBut == 1"
          type="success"
          icon="el-icon-circle-check"
          @click="addBlackList(0)"
        >确认拉黑</el-button>
        <el-button
          v-if="isBlackBut == 2"
          type="success"
          icon="el-icon-circle-check"
          @click="addBlackList(1)"
        >确认移出</el-button>
      </div>
    </el-dialog>
    <!-- dialog 新增/修改病单-->
    <el-dialog
      :title="bdTitle"
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
              placeholder="请选择"
              size="mini"
              @change="hospitalList(scope.row.siteValue)"
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
            <el-input
              v-model="scope.row.condition"
              placeholder="请输入处方病情"
              autocomplete="off"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增病情" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.obCondition"
              placeholder="请输入新增病情"
              autocomplete="off"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDd()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-circle-check" @click="addDd(addData)">确认</el-button>
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
      </div> -->
      <h3 class="new-title">黑名单详细</h3>
      <el-table :data="blacklistDetails" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="operation" label="操作类型" min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="操作时间"></el-table-column>
        <el-table-column prop="createUserName" label="操作人"></el-table-column>
        <el-table-column prop="remark" label="操作原因"></el-table-column>
      </el-table>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBlacklistDetails=false" type="success">取消</el-button>
      </div>-->
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
      <el-table :border="true" :data="Details" :header-row-class-name="'headerClass-two'">
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
      </div> -->
      <h3 class="new-title">病单信息</h3>
      <el-table :data="currentPrescriptions" border :header-row-class-name="'headerClass-two'">
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
          <el-input
            style="width：100%"
            v-model="orderingPerson"
            size="small"
            placeholder="请输入姓名"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="5" style="line-height: 30px;margin-left:20px">
          <el-checkbox v-model="jjChecked" @change="isJiaJi()">加急费300元</el-checkbox>
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
              v-if="scope.row.orderType == 3 ? true : false"
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
              v-if="scope.row.source =='会员卡' || scope.row.source =='测评服务' ? false:true "
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
          <el-input
            v-model="seachProduct.name"
            size="mini"
            placeholder="请输入产品名称"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>产品昵称</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="seachProduct.nickname"
            size="mini"
            placeholder="请输入产品昵称"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-col :span="2" id="input-title">
          <span>备案编号</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="seachProduct.recordNumber"
            size="mini"
            placeholder="请输入备案编号"
            autocomplete="off"
          ></el-input>
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
          <el-button
            size="mini"
            @click="salesList()"
            icon="el-icon-search"
            type="warning"
            class="btns"
          >查询</el-button>
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
      <div slot="footer" class="dialog-footer">
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
        <!-- <input
          type="text"
          class="input"
          v-model="discount"
          oninput="value=value.replace(/[^\d.]/g,'')"
          @input="discount_fuc(discount)"
        />-->
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
      :before-close="sizeCancel"
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
      </div> -->
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
          <el-input
            v-model="transferSite.sitePhone"
            autocomplete="off"
            placeholder="请输入客户电话"
            style="width:193px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
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
      <div slot="footer" class="dialog-footer">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="threeD_func()" type="success" icon="el-icon-circle-check">提交</el-button>
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
  queryExamineDetail,
  changeSite,
  printMakeParam,
  selectUserListByHospitalId,
  examinePadZb3d
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
  img_base64
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import Print from "../commonComponent/PrintTemplate";
import placeOrder from "./place_order";
import naVComponent from "./page";
import naVComponent_variable from "./page_variable";
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
      dialogEvaluationDetails: false, //测评信息详情弹框
      examinationInfo: [{}], //测评详情
      detailList: [], //测评详情
      excelLoad: false,
      addKeHuTitle: "新增客户",
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
      seach: naVComponent_variable.seach,
      clientData: [],
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      //产品分页
      pagesProduct: {
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
        desc: null,
        memberId: null,
        memberType: null
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
      BlackReason: null,
      currentNamberId: null,
      Details: [{
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
      }],
      memberCard: [],
      //  {
      //   isVIP: null,
      //   partsNum: null,
      //   wholeNum: null,
      //   vipType: null,
      //   expireDate: null
      // },
      prescriptions: null,
      evaluates: null,
      orders: null,
      blacklistDetails: null,
      DataList: null,
      modfiyTreatmentCycle: null,
      bianhao: null,
      cpIndex: null,
      zhekouyouhui: {
        favorable: 0
      },
      favorableRemark: null,
      // wc: [],
      // kd: [],
      // gd: [],
      // yq: [],
      // zb: [],
      productSize: {
        list: [],
        radio: "",
        shapeUserList: [],
        shapeUser: ""
      },
      loading: true,
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
      isShowVal: null,
      threeD_ObjFrom: {
        list: []
      },
      threeDDialg: false,
      only_recordId: null,
      bdTitle: "新增病单"
    };
  },
  components: {
    "my-print": Print
  },
  mounted() {
    this.pageList();
    // this.hospitals();
    this.provinceList();
  },
  computed: {},
  methods: {
    changeSizeVal_fuc(value, index) {
      naVComponent.changeSizeVal_fuc(this, value, index);
    },
    dblclick_table_fuc(row, column, cell, event) {
      naVComponent.dblclick_table_fuc(this, row);
      // this.multipleSelection.push(row)
      // this.$refs.multipleTable.setCurrentRow(row);
      // this.$refs.multipleTable.toggleRowSelection(row);
    },
    discount_fuc(value) {
      naVComponent.discount_fuc(this, value);
    },
    Adddis_fuc() {
      this.dialogAddbd = true;
      this.bdTitle = "新增病单";
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
    //监听按键
    listenKey() {
      document.onkeydown = e => {
        let key = window.event.keyCode;
        if (key === 13) {
          this.pageList(this.pages.currentPage, this.pages.pageSize);
          // console.log("客户管理的查询！");
          document.onkeydown = undefined;
        }
      };
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
    sizeCancel() {
      this.dialogSizeDetails = false;
      this.productSize.list = [];
      this.productSize.shapeUserList = [];
      this.productSize.radio = null;
      this.productSize.shapeUser = null;
    },
    //修改实际价格改变价格
    changeMoney() {
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    cancelSelection() {
      this.dialogselectProduct = false;
      this.multipleSelection = [];
    },
    entrySize() {
      naVComponent.entrySize(this);
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
      this.specialRequirements = obj.row.demand;
    },
    zkyh(obj) {
      naVComponent.zkyh(this, obj);
    },
    deliveryTimeDate(value, index) {
      this.$set(this.detailFormList, index, value);
      console.log(value);
    },
    confirmProduct() {
      placeOrder.choose_product(this);
    },
    handleSelectionChange(val) {
      console.log(val);
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
      // if(obj.name=="大腿假肢"||obj.name=="小腿假肢"){
      //   naVComponent.sizeEntry2(this, obj);
      // }else{
      naVComponent.sizeEntry(this, obj);
      // }
      // let data = {
      //   hospitalId: obj.row.hospitalId
      // };
      // selectUserListByHospitalId(data)
      //   .then(res => {
      //     if (res.data.returnCode != 0) {
      //       this.$message({
      //         type: "warning",
      //         message: res.data.returnMsg,
      //         center: true
      //       });
      //     } else {
      //       console.log(res);
      //       this.productSize.list = obj.row.sizeMapList;
      //       this.productSize.radio = obj.row.xRay;
      //       this.cpIndex = obj.$index;
      //       this.dialogSizeDetails = true;
      //       this.productSize.shapeUserList = res.data.data;
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    submitModfiy(formName) {
      // this.$refs[formName].validate(valid => {
      let data = {
        channel: 1,
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
      // alert(1)
      if (
        obj[0].doctorValue != null &&
        obj[0].prescriptionValue != null &&
        obj[0].siteValue != null &&
        obj[0].provinceId != null &&
        obj[0].cityId != null
        //  &&obj[0].condition != null
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
              debugger;
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
              debugger;
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
        this.$message({
          type: "warning",
          message: "请填写表格！",
          center: true
        });
      }
    },
    ddModfiy(obj) {
      this.dialogAddbd = true;
      this.bdTitle = "修改病单";
      this.departmentList(obj.hospitalId);
      this.doctorList(obj.departmentId);
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
    cancelBlack() {
      this.addBlack = false;
      this.BlackReason = null;
    },
    addBlackList(operation) {
      if (!!this.BlackReason) {
        let data = {
          operation: operation,
          memberId: this.currentNamberId,
          remark: this.BlackReason
        };
        blackOperation(data)
          .then(res => {
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
        this.$message({
          type: "warning",
          message: "请填写原因！",
          center: true
        });
      }
    },
    addkehu() {
      this.dialogFormVisible = true;
      this.addKeHuTitle = "新增客户";
      this.modefiy = false;
      naVComponent.default_PCSH(this);
    },
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      // console.log(this.addData[0].prescriptionValue);
      // valid &&
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
          channel: 1,
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
        this.$message({
          type: "warning",
          message: "请填写病单信息！",
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
    goBlack() {
      this.addBlack = true;
    },
    handleModify(id, isBlack) {
      this.currentNamberId = id;
      if (isBlack == "是") {
        this.isBlackBut = 2;
      } else {
        this.isBlackBut = 1;
      }
      // debugger;
      let data = {
        memberId: id
      };
      queryForUpdate(data)
        .then(res => {
          this.dialogFormVisible = true;
          this.addKeHuTitle = "修改客户信息";
          this.modefiy = true;
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleInfo(id) {
      this.currentNamberId = id;
      let data = {
        memberId: id
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
    //导出excel
    exportExcels() {
      this.excelLoad = true;
      let data = {
        memberName: this.seach.name || null,
        phone: this.seach.phone || null,
        beginDate:
          this.seach.createTime == null ? null : this.seach.createTime[0],
        endDate:
          this.seach.createTime == null ? null : this.seach.createTime[1],
        createName: this.seach.createName || null,
        visitFlag: this.seach.daofang.value,
        // haveOrder: this.seach.xiadan.value == "0" ? 0 : this.seach.xiadan.value,
        source: this.seach.laiyuan.value == "0" ? 0 : this.seach.laiyuan.value,
        cognition: this.seach.renzhi.value || null,
        isBlack:
          this.seach.heimingdan.value == "0" ? 0 : this.seach.heimingdan.value,
        siteId: this.seach.siteValue,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        hospitalId: this.seach.hospitalId
      };
      const lsyObj = {
        method: "post",
        fileName: "客户信息",
        url: javaApi.kh_ExportUrl,
        data: data
      };
      exportMethod(this, lsyObj);
    },
    //客户列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      // console.log(this.seach.createTime)
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.name || null,
        phone: this.seach.phone || null,
        beginDate:
          this.seach.createTime == null ? null : this.seach.createTime[0],
        endDate:
          this.seach.createTime == null ? null : this.seach.createTime[1],
        createName: this.seach.createName || null,
        visitFlag: this.seach.daofang.value,
        // haveOrder: this.seach.xiadan.value == "0" ? 0 : this.seach.xiadan.value,
        source: this.seach.laiyuan.value == "0" ? 0 : this.seach.laiyuan.value,
        cognition: this.seach.renzhi.value || null,
        isBlack:
          this.seach.heimingdan.value == "0" ? 0 : this.seach.heimingdan.value,
        siteId: this.seach.siteValue,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      queryMemberByPage(data)
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
    //产品页面变化时
    handleCurrentChangeProduct(num) {
      this.pagesProduct.currentPage = num;
      let pageIndex = this.pagesProduct.currentPage;
      let pageSize = this.pagesProduct.pageSize;
      this.salesList(pageIndex, pageSize);
    },
    //产品条数发生变化时
    handleSizeChangeProduct(val) {
      this.pagesProduct.pageSize = val;
      let pageIndex = this.pagesProduct.currentPage;
      let pageSize = this.pagesProduct.pageSize;
      this.salesList(pageIndex, pageSize);
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
          // debugger;
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
          // debugger;
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
      this.seach.hospitalLists = data;
      this.addData[0].hospitals = data;
    },
    isJiaJi() {
      // debugger
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
.b-b-p-1 {
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
  .span2 {
    display: inline-block;
    margin-bottom: 10px;
    width: 10%;
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
.border-dashed {
  border-top: 1px dashed #666;
  margin-top: 5px;
}
</style>

