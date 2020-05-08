<template>
  <!-- 客户管理 -->
  <div>
    <!-- seach -->
    <el-row class="search">
      <el-col :span="2" id="input-title">
        <span class="time_style">客户姓名</span>
      </el-col>
      <el-col :span="2">
        <el-input v-model="seach.memberName" style="width：100%" size="small" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">联系方式</span>
      </el-col>
      <el-col :span="2">
        <el-input size="small" style="width：100%" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">评价日期：</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="seach.appraisalTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">服务日期</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="seach.serviceTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" id="input-title">
        <span class="time_style">评价类型</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.evaluationValue" placeholder="请选择">
          <el-option
            v-for="item in seach.evaluations"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="office_performance">
      <el-col :span="2" id="input-title">
        <span>评价结果：</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.EvaluationResultValue" placeholder="请选择">
          <el-option
            v-for="item in seach.EvaluationResults"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" id="input-title">
        <span>服务人员</span>
      </el-col>
      <el-col :span="2">
        <el-input
          size="small"
          style="width：100%"
          v-model="seach.servicePersonnel"
          placeholder="请输入名称"
        ></el-input>
      </el-col>
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
        <el-select clearable size="small" v-model="seach.siteValue" placeholder="请先选择城市">
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-button
          size="small"
          @click="pageList(pages.currentPage,pages.pageSize)"
          type="warning"
          icon="el-icon-search"
        >查询</el-button>
        <el-button
          type="danger"
          icon="el-icon-download"
          @click="exportExcels()"
          size="small"
        >导出excel</el-button>
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
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="type" label="评价类型"></el-table-column>
      <el-table-column align="center" prop="userName" label="服务人员"></el-table-column>
      <el-table-column align="center" prop="appraisalTime" label="评价时间"></el-table-column>
      <el-table-column align="center" prop="appraisal" label="评价结果"></el-table-column>
      <el-table-column align="center" prop="assignTime" label="服务时长"></el-table-column>
      <el-table-column align="center" prop="firstQuestion" label="初诊问卷"></el-table-column>
      <el-table-column align="center" prop="question" label="试穿问卷"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleInfo(scope.row.memberId)"
            type="info"
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
      title="新增客户"
      :visible.sync="dialogFormVisible"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="resetForm"
    >
      <el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" size="mini">
          <h3 class="b-b-p-1">基本信息</h3>
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
              <el-radio-group v-model="ruleForm.memberType" @change="isRequired(ruleForm.memberType)">
                <el-radio label="2">固定类</el-radio>
                <el-radio label="1">矫形类</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <h3 class="b-b-p-1">
        病单信息
        <el-button
          v-if="modefiy"
          type="warning"
          icon="el-icon-circle-plus-outline"
          @click="dialogAddbd = true"
          size="mini"
          class="right"
        >新增病单</el-button>
      </h3>
      <el-table v-if="modefiy" :data="DataList" key="DataList" max-height="190">
        <el-table-column label="病单编号" align="center" prop="prescriptionNum"></el-table-column>
        <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
        <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="siteName" label="站点"></el-table-column>
        <el-table-column label="医院" align="center" prop="hospitalName"></el-table-column>
        <el-table-column label="科室" align="center" prop="departmentName"></el-table-column>
        <el-table-column label="医生" align="center" prop="doctorName"></el-table-column>
        <el-table-column label="病单类型" align="center" prop="prescriptionName"></el-table-column>
        <el-table-column label="处方病情" align="center" prop="condition"></el-table-column>
        <el-table-column label="观察病情" align="center" prop="illness"></el-table-column>
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
        <el-table-column label="站点" align="center">
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.siteValue" placeholder="请选择" size="mini">
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
        <el-table-column label="观察病情" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.obCondition"
              placeholder="请输入观察病情"
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
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
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
        <span>{{Details.school||"暂无数据"}}</span>
      </div>
      <h3 class="b-b-p-1">会员信息</h3>
      <el-table :data="memberCard" border>
        <el-table-column prop="isVIP" label="当前是否会员" min-width="100"></el-table-column>
        <el-table-column prop="partsNum" label="部位剩余次数"></el-table-column>
        <el-table-column prop="wholeNum" label="全身剩余次数"></el-table-column>
        <el-table-column prop="vipType" label="是否续会员"></el-table-column>
        <el-table-column prop="expireDate" label="会员到期时间"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">历史信息</h3>
      <el-table :data="overdueList" border>
        <el-table-column prop="isOverdue" label="会员是否过期"></el-table-column>
        <el-table-column prop="overdueDate" label="过期时间"></el-table-column>
        <el-table-column prop="allOverdueTimes" label="过期全身次数"></el-table-column>
        <el-table-column prop="overdueTimes" label="过期部位次数"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">初诊评价</h3>
      <div>{{Details.firstCognition}}</div>
      <h3 class="b-b-p-1">治疗周期</h3>
      <div>
        <span>治疗周期:</span>
        <span class="margin-r-20">{{Details.treatmentCycle}}</span>
        <span>创建时间:</span>
        <span>{{Details.treatmentCycleTime}}</span>
      </div>
      <h3 class="b-b-p-1">病单信息</h3>
      <el-table :data="prescriptions" border>
        <el-table-column prop="prescriptionNum" label="病单编号" min-width="100"></el-table-column>
        <el-table-column align="center" prop="pProvinceName" label="省份"></el-table-column>
        <el-table-column align="center" prop="pCityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="prescriptionSiteName" label="站点"></el-table-column>
        <el-table-column prop="hospitalName" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="观察病情"></el-table-column>
        <el-table-column prop="updateTime" label="创建时间" min-width="100"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="readyOrder(scope.row)"
              type="primary"
              plain
              icon="el-icon-edit-outline"
            >下单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="b-b-p-1">测评记录</h3>
      <el-table :data="evaluates" border max-height="500">
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
      <h3 class="b-b-p-1">订单信息</h3>
      <el-table :data="orders" border max-height="500">
        <el-table-column prop="orderNum" label="病单编号" min-width="100"></el-table-column>
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
        <el-table-column prop="orderNum" label="订单号"></el-table-column>
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
          type="primary"
          icon="el-icon-edit"
          plain
          @click="handleModify(currentNamberId,Details.isBlack)"
        >修改</el-button>
        <el-button type="info" icon="el-icon-s-order" @click="heimingdanxiangxi()">黑名单详细</el-button>
      </div>
    </el-dialog>
    <!-- dialog 订单详情-->
    <el-dialog
      title="订单详情"
      :visible.sync="DdialogDepartmentDetails"
      center
      :close-on-click-modal="false"
      width="80%"
    >
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.memberName}}</span>
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
        <span>{{Details.school||"暂无数据"}}</span>
      </div>
      <h3 class="b-b-p-1">病单信息</h3>
      <el-table :data="PatientInformation" border style="width: 100%">
        <el-table-column prop="prescriptionId" label="病单编号" min-width="100"></el-table-column>
        <el-table-column prop="hospitalNmae" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="观察病情"></el-table-column>
        <el-table-column prop="pCreateTime" label="创建时间" min-width="100"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">
        订单信息
        <!-- <el-button
          type="primary"
          icon="el-icon-plus"
          @click="bujiaoManey()"
          size="mini"
          class="right"
          v-if="orderInformation.oweMoney > 0"
        >补交欠款</el-button>-->
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
      <h3 class="b-b-p-1">产品信息</h3>
      <el-table class="margin-t-20" :data="prescriptions" border>
        <el-table-column prop="name" label="产品名" min-width="230"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称" min-width="100"></el-table-column>
        <el-table-column prop="type" label="产品分类"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <el-table-column prop="number" label="产品数量"></el-table-column>
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
        <el-table-column prop="price" label="标准价格"></el-table-column>
        <el-table-column prop="actual" label="实际价格"></el-table-column>
        <el-table-column prop="favorable" label="折扣金额"></el-table-column>
        <el-table-column prop="recordActual" label="退款金额"></el-table-column>
        <el-table-column prop="deliveryTime" label="交货时间" min-width="200"></el-table-column>
        <!-- <el-table-column  label="操作" min-width="130">
          <template>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-document"
            >打印订货单</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!-- <h3 class="b-b-p-1">客户确认签字</h3>
      <div class="signatureImg">
        <img :src="imgUrl" alt="图片"/>
        <el-image :src="imgUrl">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div> -->
      <!-- <div slot="footer" class="dialog-footer">
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
    </el-dialog>
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
        <el-table-column label="观察病情" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.obCondition"
              placeholder="请输入观察病情"
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
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
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
        <span>{{Details.school ||"暂无数据"}}</span>
      </div>
      <h3 class="b-b-p-1">黑名单详细</h3>
      <el-table :data="blacklistDetails" border>
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
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.memberName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>性别:</span>
        <span class="margin-r-20">{{Details.sex}}</span>
      </div>
      <h3 class="b-b-p-1">病单信息</h3>
      <el-table :data="currentPrescriptions" border>
        <el-table-column prop="prescriptionNum" label="病单编号" min-width="100"></el-table-column>
        <el-table-column prop="hospitalName" label="医院"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="观察病情"></el-table-column>
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
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <el-table-column prop="model" label="产品型号"></el-table-column>
        <el-table-column prop="price" label="标准价格"></el-table-column>
        <el-table-column prop="actual" label="实际价格">
          <template slot-scope="scope">
            <input class="input" type="text" v-model="scope.row.actual" @change="changeMoney()" oninput="value=value.replace(/[^\d]/g,'')"/>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryTime" label="交货日期" min-width="100">
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row.source =='自制产品' || scope.row.source =='定制产品'|| scope.row.source =='外购产品' ? true : false "
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
        <el-table-column label="操作" align="center" min-width="290">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.source =='自制产品' || scope.row.source =='定制产品'|| scope.row.source =='外购产品' ? true : false "
              @click="tsyq(scope)"
              type="primary"
            >特殊要求</el-button>
            <el-button
              size="mini"
              v-if="scope.row.source =='自制产品' || scope.row.source =='定制产品' ? true : false "
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
        <el-button @click="orderingStart()" type="success" icon="el-icon-circle-check">确认</el-button>
      </div>
    </el-dialog>
    <!-- dialog 选择产品-->
    <el-dialog
      title="选择产品"
      :visible.sync="dialogselectProduct"
      center
      :close-on-click-modal="false"
      width="70%"
      :before-close="cancelSelection"
    >
      <!-- seach product-->
      <el-row class="search">
        <el-col :span="2" class="input-title">
          <span>选择产品</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="seachProduct.name" size="mini" placeholder="请输入名称" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="2" class="input-title">
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
        <el-col :span="2" class="input-title">
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
        <el-col :span="2">
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
        max-height="500"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="source" label="产品分类"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unit" label="产品规格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="model" label="产品型号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="qualification" label="产品资质" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="标准价格" show-overflow-tooltip></el-table-column>
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
    <el-dialog title="折扣优惠" :visible.sync="dialogDiscount" center :close-on-click-modal="false">
      <div>标准价格：{{zhekouyouhui.price}}</div>
      <div>
        折扣价格：
        <input type="text" class="input" v-model="zhekouyouhui.favorable" oninput="value=value.replace(/[^\d]/g,'')"/>
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
    >
      <div class="clearfix">
        <div v-for="item in productSize.wc" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </div>
        </div>
        <div v-for="item in productSize.kd" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </div>
        </div>
        <div v-for="item in productSize.gd" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </div>
        </div>
        <div v-for="item in productSize.zb" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </div>
        </div>
        <div class="cpSize">
          <span class="span">是否有X光片：</span>
          <el-radio v-model="productSize.radio" label="1">是</el-radio>
          <el-radio v-model="productSize.radio" label="0">否</el-radio>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSizeDetails=false" type="primary" icon="el-icon-circle-close">取消</el-button>
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
    <el-dialog
      title="取型分配"
      :visible.sync="takeShapeDialog"
      :close-on-click-modal="false"
      width="70%"
      center
    >
      <!-- table -->
      <el-table border :data="takeShapeData">
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
    </el-dialog>
    <!-- dialog 试穿 -->
    <el-dialog
      title="试穿分配"
      :visible.sync="tryOnDialog"
      :close-on-click-modal="false"
      width="70%"
      center
    >
      <!-- table -->
      <el-table border :data="tryOnData">
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
    </el-dialog>
    <!-- dialog 维修 -->
    <el-dialog
      title="维修分配"
      :visible.sync="serviceDialog"
      :close-on-click-modal="false"
      width="70%"
      center
    >
      <!-- table -->
      <el-table border :data="serviceData">
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
    </el-dialog>
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
      <h3 class="b-b-p-1">客户信息</h3>
      <div>
        <span>客户姓名:</span>
        <span class="margin-r-20">{{Details.memberName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{Details.birthday}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{Details.phone}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{Details.address}}</span>
      </div>
      <h3 class="b-b-p-1">结果备注</h3>
      <div>{{examinationInfo.remark || "暂无数据"}}</div>
      <h3 class="b-b-p-1">复查日期</h3>
      <div>{{examinationInfo.repeatTime || "暂无数据"}}</div>
      <h3 class="b-b-p-1">孩子配合程度</h3>
      <div>{{examinationInfo.cooperate || "暂无数据"}}</div>
      <h3 class="b-b-p-1">治疗周期</h3>
      <div>{{examinationInfo.cycle || "暂无数据"}}</div>
      <h3 class="b-b-p-1">测评详情</h3>
      <div v-for="(item,index) in detailList" :key="index" class="margin-t-20">
        <div>
          <span>测评项目:</span>
          <span class="margin-r-20">{{item.examinationName}}</span>
        </div>
        <div class="margin-t-5">
          <span>测评数据:</span>
          <span
            class="margin-r-20"
            v-for="(element,index) in item.detail"
            :key="index"
          >{{element.name}}:{{element.value}}</span>
        </div>
        <div class="margin-t-5">
          <span>观察病情:</span>
          <span class="margin-r-20">{{item.normal}}</span>
        </div>
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
  </div>
</template>

<script>
import {
  appraisalList,
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
  printMakeParam
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import { exportMethod, province, city, site,allSite,getBase64Image,img_base64 } from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import Print from "../commonComponent/PrintTemplate";
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
      examinationInfo: {}, //测评详情
      detailList: [], //测评详情
      specialRequirements: null,
      discount: null,
      productData: [],
      multipleSelection: [],
      detailFormList: [],
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
        qualificationList: [{ name: "一类", id: 1 }, { name: "二类", id: 2 }]
      },
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
      // isBlackBut: null,
      currentPrescriptions: [],
      seach: {
        memberName: null,
        phone: null,
        appraisalTime: null,
        serviceTime: null,
        evaluationValue: null,
        evaluations: [
          { name: "取型评价", id: 310 },
          { name: "测评评价", id: 201 },
          { name: "试穿评价", id: 360 },
          { name: "维修评价", id: 370 },
        ],
        servicePersonnel: null,
        EvaluationResultValue: null,
        EvaluationResults: [
          { name: "十分满意", id: 1 },
          { name: "满意", id: 2 },
          { name: "一般", id: 3 },
          { name: "不满意", id: 4 },
          { name: "十分不满意", id: 5 }
        ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
      },
      clientData: [],
      loading: true,
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
        memberType: [{ required: true, message: "请选择来源", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      addData: [
        {
          number: "自动生成",
          hospitals: null,
          hospitalValue: null,
          doctors: null,
          doctorValue: null,
          departments: null,
          departmentValue: null,
          prescriptionValue: null,
          prescriptions: [
            { id: 0, name: "儿保" },
            { id: 1, name: "住院" },
            { id: 2, name: "门诊" }
          ],
          condition: null,
          obCondition: null,
          siteValue: null,
          provinceId: null,
          cityId: null
        }
      ],
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
      Details: {
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
      },
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
        favorable: null
      },
      favorableRemark: null,
      productSize: {
        wc: null,
        kd: null,
        gd: null,
        yq: null,
        zb: null,
        radio: null
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
      DdialogDepartmentDetails: false,
      PatientInformation: [],
      orderInformation: {},
      refundRecordDto: null,
      favorableDto: [],
      imgUrl: null,
      backstageData: null,
      //检测报告
      dialogTestReport: false,
      testReport: {},
      isTwo: true,
      htmlTitle: "测评报告PDF",
      overdueList:[],
      isShowVal: null
    };
  },
  components: {
    "my-print": Print
  },
  mounted() {
    this.pageList();
    this.hospitals();
    this.provinceList();
    // this.salesList();
    // this.personnel(8);
    // this.personnel(9);
    // this.personnel(6);
    // this.personnel(12);
  },
  methods: {
    isRequired(val) {
      this.isShowVal = val;
      if (val == 2) {
        this.rules.phone[0].required = false;
        this.rules.birthday[0].required = false;
        console.log("不用填");
      } else {
        this.rules.phone[0].required = true;
        this.rules.birthday[0].required = true;
        console.log("必须填");
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
            img_base64(this,res.data.data)
            this.dialogTestReport = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    evaluationDetails(id) {
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
            this.examinationInfo = res.data.data.examinationInfo;
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
      this.tryOnUserDialog = true;
      this.xzfp.productId = obj.id;
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
            console.log(res);
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
    //获取测评、试穿、取型、维修人员列表
    // personnel(id) {
    //   let data = {
    //     deptId: id
    //   };
    //   if (id == 6) {
    //     userListByDept(data)
    //       .then(res => {
    //         console.log(res);
    //         let data = res.data.data;
    //         data.forEach(element => {
    //           this.nameList6.push({ label: element.username, key: element.id });
    //         });
    //         console.log(this.nameList6);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   } else if (id == 8) {
    //     userListByDept(data)
    //       .then(res => {
    //         console.log(res);
    //         let data = res.data.data;
    //         data.forEach(element => {
    //           this.nameList8.push({ label: element.username, key: element.id });
    //         });
    //         console.log(this.nameList8);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   } else if (id == 9) {
    //     userListByDept(data)
    //       .then(res => {
    //         console.log(res);
    //         let data = res.data.data;
    //         data.forEach(element => {
    //           this.nameList9.push({ label: element.username, key: element.id });
    //         });
    //         console.log(this.nameList9);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   } else if (id == 12) {
    //     userListByDept(data)
    //       .then(res => {
    //         console.log(res);
    //         let data = res.data.data;
    //         data.forEach(element => {
    //           this.nameList12.push({
    //             label: element.username,
    //             key: element.id
    //           });
    //         });
    //         console.log(this.nameList12);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    // },
    czpj(obj) {
      // console.log("测评开始")
      this.numberId = obj.memberId;
      let data = {
        type: 1
      };
      setPjType(data)
        .then(res => {
          console.log(res);
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
          console.log(res);
          if (type == 310) {
            this.takeShapeData = res.data.data;
            this.takeShapeDialog = true;
          } else if (type == 362) {
            this.tryOnData = res.data.data;
            this.tryOnDialog = true;
          } else if (type == 3) {
            this.serviceData = res.data.data;
            this.serviceDialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(orderNum) {
      //this.paymentMethod.orderNum = orderNum;
      let data = {
        orderNum: orderNum
      };
      orderDetail(data)
        .then(res => {
          console.log(res);
          debugger;
          this.Details.memberName = res.data.data.orderDetailDto.customerName;
          this.Details = res.data.data.orderDetailDto;
          //this.Details.address = res.data.data.orderDetailDto.address;
          // this.Details.birthday = res.data.data.orderDetailDto.birthday;
          // this.Details.isBlack = res.data.data.orderDetailDto.black;
          // this.Details.phone = res.data.data.orderDetailDto.phone;
          // this.Details.sex = res.data.data.orderDetailDto.sex;
          // this.Details.school = res.data.data.orderDetailDto.school;
          // this.Details.source = res.data.data.orderDetailDto.source;
          this.prescriptions = res.data.data.saleDetailDtos;
          this.refundData = res.data.data.saleDetailDtos;
          this.PatientInformation[0] = res.data.data.orderDetailDto;
          this.orderInformation = res.data.data.orderDetailDto;
          this.favorableDto = res.data.data.favorableDtos;
          this.refundRecordDto = res.data.data.refundDetails;
          this.paymentMethod.orderId = res.data.data.orderDetailDto.orderId;
          this.imgUrl = javaApi.ExportUrl + res.data.data.orderDetailDto.url;
          console.log(this.imgUrl);
          this.refundData.forEach(obj => {
            obj.amount = 0;
          });
          this.DdialogDepartmentDetails = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cpjd(obj) {
      this.userDialog = true;
      this.xzfp.memberId = obj.memberId;
    },
    entrySize() {
      // console.log(this.productSize);
      let wc = this.productSize.wc;
      let wcList = {};
      for (let i in wc) {
        //  let aa = {}
        wcList[wc[i].name] = wc[i].value;
        // wcList.push(aa)
      }
      let kd = this.productSize.kd;
      // let kdList=[]
      let kdList = {};
      for (let i in kd) {
        kdList[kd[i].name] = kd[i].value;
        // kdList.push(aa)
      }
      let gd = this.productSize.gd;
      let gdList = {};
      for (let i in gd) {
        // let aa = {}
        gdList[gd[i].name] = gd[i].value;
        // gdList.push(aa)
      }
      let zb = this.productSize.zb;
      let zbList = {};
      for (let i in zb) {
        // let aa = {}
        gdList[zb[i].name] = zb[i].value;
        // gdList.push(aa)
      }
      let cpxq = {
        取型: {
          围长: wcList,
          宽度: kdList,
          高度: gdList,
          足部: zbList,
          要求: this.productSize.yq
        }
      };
      // console.log(cpxq);
      debugger;
      this.detailFormList.forEach((obj, index) => {
        if (index == this.cpIndex) {
          obj.size = cpxq;
          obj.xRay = this.productSize.radio;
        }
      });
      this.dialogSizeDetails = false;
      // console.log(this.detailFormList);
      // console.log(this.productSize);
      // console.log(this.detailFormList);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    specialRequirementsCancel() {
      this.dialogSpecialRequirements = false;
      this.dialogDiscount = false;
      this.cpIndex = null;
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
      this.detailFormList.forEach((obj, index) => {
        if (index == this.cpIndex) {
          obj.favorableRemark = this.favorableRemark;
          obj.favorable = this.zhekouyouhui.favorable;
          obj.actual = obj.price - this.zhekouyouhui.favorable;
        }
      });
      // debugger;
      this.$set(
        this.detailFormList,
        this.cpIndex,
        this.detailFormList[this.cpIndex]
      );
      this.specialRequirementsCancel();
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
      // console.log(this.detailFormList[0]);
    },
    tsyq(obj) {
      this.dialogSpecialRequirements = true;
      this.cpIndex = obj.$index;
      console.log(obj.$index);
      this.specialRequirements = obj.row.demand;
    },
    zkyh(obj) {
      this.dialogDiscount = true;
      this.cpIndex = obj.$index;
      this.zhekouyouhui = obj.row;
      console.log(obj.$index);
    },
    deliveryTimeDate(value, index) {
      this.$set(this.detailFormList, index, value);
      console.log(value);
    },
    confirmProduct() {
      if (this.detailFormList.length == 0) {
        debugger;
        // this.multipleSelection.forEach(obj=>{})
        if (this.multipleSelection.length >= 2) {
          let isTrue;
          for (let index = 0; index < this.multipleSelection.length; index++) {
            const element = this.multipleSelection[index];
            const element2 =
              this.multipleSelection[index + 1] ||
              this.multipleSelection[this.multipleSelection.length - 1];
            if (element.sourceType != element2.sourceType) {
              debugger;
              isTrue = false;
              break;
            } else {
              isTrue = true;
            }
          }
          if (isTrue) {
            this.multipleSelection.forEach(obj => {
              this.detailFormList.push(obj);
            });
            this.detailFormList.forEach(obj => {
              obj.deliveryTime = null;
              obj.number = 1;
              obj.actual = obj.price;
              obj.demand = null;
              // obj.favorable = null;
              // obj.favorableRemark = null;
            });
            // this.dialogselectProduct = false;
            this.paymentMethod.totalAmountReceivable = this.ysMoney();
            this.paymentMethod.arrears = this.xqMoney();
            this.cancelSelection();
          }
        } else {
          this.multipleSelection.forEach(obj => {
            this.detailFormList.push(obj);
          });
          this.detailFormList.forEach(obj => {
            obj.deliveryTime = null;
            obj.number = 1;
            obj.actual = obj.price;
            obj.demand = null;
            // obj.favorable = null;
            // obj.favorableRemark = null;
          });
          // this.dialogselectProduct = false;
          this.paymentMethod.totalAmountReceivable = this.ysMoney();
          this.paymentMethod.arrears = this.xqMoney();
          this.cancelSelection();
        }
      } else {
        let isTrue;
        let id;
        let tishi;
        for (let index = 0; index < this.multipleSelection.length; index++) {
          const element = this.multipleSelection[index];
          const element2 =
            this.multipleSelection[index + 1] ||
            this.multipleSelection[this.multipleSelection.length - 1];
          if (element.sourceType != element2.sourceType) {
            isTrue = false;
            break;
          } else {
            isTrue = true;
            id = element.sourceType;
          }
        }
        for (let index = 0; index < this.detailFormList.length; index++) {
          const element = this.detailFormList[index];
          if (element.sourceType != id) {
            tishi = true;
            break;
          } else {
            tishi = false;
          }
        }
        if (tishi) {
          this.$message({
            type: "warning",
            message: "不支持同时选择两种类型的产品！",
            center: true
          });
        } else {
          this.multipleSelection.forEach(obj => {
            this.detailFormList.push(obj);
          });
          this.detailFormList.forEach(obj => {
            obj.deliveryTime = null;
            obj.number = 1;
            obj.actual = obj.price;
            obj.demand = null;
            // obj.favorable = null;
            // obj.favorableRemark = null;
          });
          // this.dialogselectProduct = false;
          this.paymentMethod.totalAmountReceivable = this.ysMoney();
          this.paymentMethod.arrears = this.xqMoney();
          this.cancelSelection();
          console.log(this.detailFormList);
        }
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
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
    calculation(currentValue, oldValue) {
      console.log(currentValue, oldValue);
      this.paymentMethod.total =
        Number(this.paymentMethod.xj || 0) +
        Number(this.paymentMethod.zz || 0) +
        Number(this.paymentMethod.lkl || 0);
      this.paymentMethod.arrears = this.xqMoney();
      debugger;
      if (this.paymentMethod.total > this.paymentMethod.totalAmountReceivable) {
        this.$message({
          type: "warning",
          message: "实收金额大于应收金额！请重新输入金额!",
          center: true
        });
        this.paymentMethod.arrears = this.ysMoney();
        this.paymentMethod.total = 0;
      }

      if (this.paymentMethod.xj > 0 && this.paymentMethod.zz > 0) {
        this.paymentMethod.lx = 0;
      } else if (this.paymentMethod.xj > 0 && this.paymentMethod.lkl > 0) {
        this.paymentMethod.lx = 0;
      } else if (this.paymentMethod.zz > 0 && this.paymentMethod.lkl > 0) {
        this.paymentMethod.lx = 0;
      } else if (this.paymentMethod.zz > 0) {
        this.paymentMethod.lx = 3;
      } else if (this.paymentMethod.xj > 0) {
        this.paymentMethod.lx = 2;
      } else if (this.paymentMethod.lkl > 0) {
        this.paymentMethod.lx = 1;
      } else {
        this.paymentMethod.lx = null;
      }
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
      let priceTatol = [];
      for (let index = 0; index < this.detailFormList.length; index++) {
        const element = this.detailFormList[index];
        priceTatol.push(element.price);
      }
      let price = eval(priceTatol.join("+"));
      // let shouldTatol = [];
      // for (let index = 0; index < this.detailFormList.length; index++) {
      //   const element = this.detailFormList[index];
      //   shouldTatol.push(element.actual);
      // }
      // let should = eval(shouldTatol.join("+"));
      this.detailFormList.forEach(obj => {
        obj.salesId = obj.id;
        if (obj.size != undefined) {
          if (
            obj.size["取型"] == "" ||
            obj.size["取型"] == undefined ||
            obj.size["取型"] == null ||
            JSON.stringify(obj.size) == "{}"
          ) {
            delete obj.size;
            return;
          } else {
            let qxwc = obj.size["取型"]["围长"];
            let qxkd = obj.size["取型"]["宽度"];
            let qxgd = obj.size["取型"]["高度"];
            let qxzb = obj.size["取型"]["足部"];
            let qxyq = obj.size["取型"]["要求"];
            for (var key in qxzb) {
              if (!qxzb[key]) {
                delete obj.size;
                return;
              }
            }
            for (var key in qxwc) {
              if (!qxwc[key]) {
                delete obj.size;
                return;
              }
            }
            for (var key in qxkd) {
              if (!qxkd[key]) {
                delete obj.size;
                return;
              }
            }
            for (var key in qxgd) {
              if (!qxgd[key]) {
                delete obj.size;
                return;
              }
            }
            for (var key in qxyq) {
              if (!qxyq[key]) {
                delete obj.size;
                return;
              }
            }
          }
        }
      });

      let data = {
        customerId: this.currentNamberId,
        prescriptionId: this.currentPrescriptions[0].prescriptionId,
        quickly: this.jjChecked == true ? 1 : 0,
        price: price,
        should: this.paymentMethod.totalAmountReceivable,
        actual: this.paymentMethod.total,
        lakala: this.paymentMethod.lkl,
        cash: this.paymentMethod.xj,
        transfer: this.paymentMethod.zz,
        payType: this.paymentMethod.lx,
        hospital: 1,
        orderUserName: this.orderingPerson,
        detailFormList: this.detailFormList
      };
      //判断交货日期必填
      let jhrq = true;
      this.detailFormList.forEach(obj => {
        if (
          obj.source == "自制产品" ||
          obj.source == "定制产品" ||
          obj.source == "外购产品"
        ) {
          if (!obj.deliveryTime) {
            jhrq = false;
            return jhrq;
          }
        }
      });
      // debugger;
      if (data.actual < data.lakala + data.cash + data.transfer) {
        this.$message({
          type: "warning",
          message: "支付金额大于应收金额请从新输入！",
          center: true
        });
      } else if (jhrq === false) {
        this.$message({
          type: "warning",
          message: "请填写交货日期！",
          center: true
        });
      } else {
        orderInsert(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.readyOrderCancel();
              this.handleInfo(this.currentNamberId);
              this.$message({
                type: "success",
                message: "下单成功！",
                center: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    readyOrder(obj) {
      this.dialogreadyOrder = true;
      this.currentPrescriptions.push(obj);
      this.orderingPerson = session.getItem("username");
    },
    sizeEntry(obj) {
      if (!!obj.row.size && JSON.stringify(obj.row.size) != "{}") {
        let qxwc = obj.row.size["取型"]["围长"];
        let qxkd = obj.row.size["取型"]["宽度"];
        let qxgd = obj.row.size["取型"]["高度"];
        let qxzb = obj.row.size["取型"]["足部"];
        this.productSize.yq = obj.row.size["取型"]["要求"];
        for (let i in qxzb) {
          this.productSize.zb.push({ name: i, value: qxzb[i] });
        }
        for (let i in qxwc) {
          this.productSize.wc.push({ name: i, value: qxwc[i] });
        }
        for (let i in qxkd) {
          this.productSize.kd.push({ name: i, value: qxkd[i] });
        }
        for (let i in qxgd) {
          this.productSize.gd.push({ name: i, value: qxgd[i] });
        }
        this.dialogSizeDetails = true;
        this.cpIndex = obj.$index;
      } else {
        this.$message({
          type: "warning",
          message: "暂无尺寸信息！",
          center: true
        });
      }
    },
    submitModfiy(formName) {
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
    },
    addDd(obj) {
      if (
        obj[0].doctorValue != null &&
        obj[0].prescriptionValue != null &&
        obj[0].siteValue != null &&
        obj[0].provinceId != null &&
        obj[0].cityId != null &&
        obj[0].condition != null
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
                this.handleModify(this.currentNamberId);
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
                this.handleModify(this.currentNamberId);
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
      console.log(obj);
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
    },
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   console.log(this.addData[0].prescriptionValue);
      //     valid &&
        if (
          valid &&
          this.addData[0].prescriptionValue != null &&
          this.addData[0].departmentValue != null &&
          this.addData[0].doctorValue != null &&
          this.addData[0].hospitalValue != null &&
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
            illness: this.addData[0].obCondition || ""
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
      this.currentNamberId = null;
    },
    handleModify(id, isBlack) {
      this.currentNamberId = id;
      debugger;
      let data = {
        memberId: id
      };
      queryForUpdate(data)
        .then(res => {
          this.dialogFormVisible = true;

          this.modefiy = true;
          console.log("修改");
          console.log(res);
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
          console.log("详情");
          console.log(res);
          this.dialogDepartmentDetails = true;
          this.Details = res.data.data.memberInfo;
          this.overdueList = res.data.data.overdueList;
          this.memberCard[0] = res.data.data.memberCard;
          this.prescriptions = res.data.data.prescriptions;
          this.evaluates = res.data.data.evaluates;
          this.orders = res.data.data.orders;
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
        appraisalTimeBegin:
          this.seach.appraisalTime == null ? null : this.seach.appraisalTime[0],
        appraisalTimeEnd:
          this.seach.appraisalTime == null ? null : this.seach.appraisalTime[1],
        beginTime:
          this.seach.serviceTime == null ? null : this.seach.serviceTime[0],
        endTime:
          this.seach.serviceTime == null ? null : this.seach.serviceTime[1],
        appraisalString: this.seach.EvaluationResultValue || null,
        type: this.seach.evaluationValue || null,
        userName: this.seach.servicePersonnel || null,
         provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      const lsyObj = {
        method: "post",
        fileName: "评价管理信息",
        url: javaApi.exportAppraisalExcel,
        data: data
      };
      exportMethod(this, lsyObj);
    },
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        status: 2,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        appraisalTimeBegin:
          this.seach.appraisalTime == null ? null : this.seach.appraisalTime[0],
        appraisalTimeEnd:
          this.seach.appraisalTime == null ? null : this.seach.appraisalTime[1],
        beginTime:
          this.seach.serviceTime == null ? null : this.seach.serviceTime[0],
        endTime:
          this.seach.serviceTime == null ? null : this.seach.serviceTime[1],
        appraisalString: this.seach.EvaluationResultValue || null,
        type: this.seach.evaluationValue || null,
        userName: this.seach.servicePersonnel || null,
         provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      appraisalList(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.loading = false;
            let dataList = res.data;
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
      return s;
    }
  }
};
</script>

<style scoped lang="scss">
.operation {
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
}
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
.client_info {
  text-align: center;
  padding: 10px 0;
  span {
    font-size: 14px;
    letter-spacing: 1px;
  }
}
.client_table {
  margin-top: 10px;
}
.input {
  border: 1px solid #ebeef5;
  color: #606266;
  padding: 5px;
  width: 80%;
}
.margin-l-p1 {
  margin-left: 1%;
}
.b-b-1 {
  padding: 10px 0;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 15px;
}
.b-b-p-1 {
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
.cpSize {
  float: left;
  width: 46%;
  margin: 10px 2%;
  .span {
    display: inline-block;
    margin-bottom: 10px;
    width: 20%;
  }
  .div {
    display: inline-block;
    width: 79%;
  }
}
.input-title {
  width: 5.5%;
  line-height: 30px;
}
.visitEvaluation {
  width: 100%;
  // height: 100%;
  position: relative;
  // top: 0;
  // left: 0;
  // background: rgba(0, 0, 0, 0.9);
  // z-index: 2;
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
.margin-t-5 {
  margin-top: 5px;
}
.margin-r-5 {
  margin-right: 5px;
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
