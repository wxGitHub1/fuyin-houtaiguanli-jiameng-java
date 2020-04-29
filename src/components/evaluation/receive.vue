// 已接待
<template>
  <div>
    <!-- seach -->
    <el-row class="search">
      <el-col :span="2" style="width: 5.5%;line-height: 30px">
        <span>客户姓名</span>
      </el-col>
      <el-col :span="3">
        <el-input v-model="seach.memberName" size="small" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="2" style="width: 5.5%;line-height: 30px">
        <span>联系方式</span>
      </el-col>
      <el-col :span="3">
        <el-input size="small" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-col>
      <el-col :span="2" style="width: 5.5%;line-height: 30px">
        <span>是否会员</span>
      </el-col>
      <el-col :span="2">
        <el-select clearable size="small" v-model="seach.vipValue" placeholder="请选择">
          <el-option v-for="item in seach.vips" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 5.5%;line-height: 30px">
        <span>服务人员</span>
      </el-col>
      <el-col :span="3">
        <el-input v-model="seach.servicePersonnel" size="small" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="2" style="width: 5.5%;line-height: 30px">
        <span class="time_style">接待日期</span>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="seach.receptionTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="1" style="width: 4.8%">
        <el-button
          size="small"
          type="warning"
          icon="el-icon-search"
          @click="pageList(pages.currentPage,pages.pageSize)"
        >查询</el-button>
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
      <el-table-column align="center" prop="userName" label="服务人员"></el-table-column>
      <el-table-column align="center" prop="beginTime" label="接待时间"></el-table-column>
      <el-table-column align="center" prop="assignTime" label="接待时长"></el-table-column>
      <el-table-column align="center" prop="vip" label="是否会员"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
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
              <el-radio-group v-model="ruleForm.memberType">
                <el-radio label="1">固定类</el-radio>
                <el-radio label="2">矫形类</el-radio>
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
                v-for="item in seach.provinceIdList"
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
        <el-table-column prop="name" label="产品名"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="source" label="产品分类"></el-table-column>
        <el-table-column prop="number" label="产品数量"></el-table-column>
        <el-table-column prop="model" label="产品型号"></el-table-column>
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
    <!-- dialog 新增病单-->
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
                v-for="item in seach.provinceIdList"
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
        <span>{{Details.school||"暂无数据"}}</span>
      </div>
      <h3 class="b-b-p-1">黑名单详细</h3>
      <el-table :data="blacklistDetails" border>
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
          <el-checkbox v-model="jjChecked" @change="isJiaJi()">加急费300元</el-checkbox>
        </el-col>
      </el-row>
      <el-table class="margin-t-10" :data="detailFormList" border max-height="500">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="nickname" label="产品昵称"></el-table-column>
        <el-table-column prop="unit" label="产品规格"></el-table-column>
        <el-table-column prop="number" label="产品数量"></el-table-column>
        <el-table-column prop="model" label="产品型号"></el-table-column>
        <el-table-column prop="price" label="标准价格"></el-table-column>
        <el-table-column prop="actual" label="实际价格">
          <template slot-scope="scope">
            <input
              class="input"
              type="text"
              v-model="scope.row.actual"
              @change="changeMoney()"
              oninput="value=value.replace(/[^\d]/g,'')"
            />
            <!-- <el-input v-model="scope.row.actual" size="mini" placeholder="请输入金额" ></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="deliveryTime" label="交货日期" min-width="100">
          <template slot-scope="scope">
            <!-- <input
              v-if="scope.row.source =='自制产品' || scope.row.source =='定制产品'|| scope.row.source =='外购产品' ? true : false "
              type="text"
              class="input"
              @change="deliveryTimeDate(scope.row.deliveryTime)"
              v-model="scope.row.deliveryTime"
            />-->
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
      <div>
        折扣价格：
        <input
          type="text"
          class="input"
          v-model="zhekouyouhui.favorable"
          oninput="value=value.replace(/[^\d]/g,'')"
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
        <div v-for="item in productSize.wc" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入"></el-input>
          </div>
        </div>
        <div v-for="item in productSize.kd" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入"></el-input>
          </div>
        </div>
        <div v-for="item in productSize.gd" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入"></el-input>
          </div>
        </div>
        <div v-for="item in productSize.zb" :key="item.name" class="cpSize">
          <span class="span">{{item.name}}</span>
          <div class="div">
            <el-input v-model="item.value" style="width：100%" size="small" placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="cpSize">
          <span class="span">是否有X光片：</span>
          <el-radio v-model="productSize.radio" label="1">是</el-radio>
          <el-radio v-model="productSize.radio" label="2">否</el-radio>
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
      <el-row>
        <el-col :span="4">
          <h3 class="b-b-p-1">结果备注</h3>
          <div>{{examinationInfo.remark || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">复查日期</h3>
          <div>{{examinationInfo.repeatTime || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">孩子配合程度</h3>
          <div>{{examinationInfo.cooperate || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">治疗周期</h3>
          <div>{{examinationInfo.cycle || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">老带新</h3>
          <div>{{examinationInfo.recommendCN || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">驼背</h3>
          <div>{{examinationInfo.tuobeiCN || "暂无数据"}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3 class="b-b-p-1">客户分析</h3>
          <div>{{examinationInfo.memberAnalysisCN || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">客户类型</h3>
          <div>{{examinationInfo.memberModeCN || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">是否全身测评</h3>
          <div>{{examinationInfo.completeCN || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">未进行全身测评的原因</h3>
          <div>{{examinationInfo.incompleteReason || "暂无数据"}}</div>
        </el-col>
        <el-col :span="4">
          <h3 class="b-b-p-1">恢复情况</h3>
          <div>{{examinationInfo.recoveryCN || "暂无数据"}}</div>
        </el-col>
      </el-row>
      <h3 class="b-b-p-1">测评详情</h3>
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
  examineAdmit,
  getHospitalList,
  selectDepartmentByHospitalId,
  queryDoctorByDepartmentId,
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
  printMakeParam,
  examinePadZb3d
} from "../../api/javaApi";
import {
  exportMethod,
  province,
  city,
  site,
  hospital,
  getBase64Image,
  img_base64
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import Print from "../commonComponent/PrintTemplate";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        // callback();
        callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          // this.ruleForm.phone = null;
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      dialogEvaluationDetails: false, //测评信息详情弹框
      examinationInfo: {}, //测评详情
      detailList: [], //测评详情
      excelLoad: false,
      addKeHuTitle: "新增客户",
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
        qualificationList: [
          { name: "一类", id: 1 },
          { name: "二类", id: 2 }
        ]
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
      isBlackBut: null,
      currentPrescriptions: [],
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
      loading: true,
      xd_siteId: null,
      //检测报告
      dialogTestReport: false,
      testReport: {},
      isTwo: true,
      htmlTitle: "测评报告PDF",
      overdueList: [],
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
    // this.salesList();
  },
  methods: {
    threeD_func() {
      let data = {
        recordId: this.only_recordId,
        footLength:
          this.threeD_ObjFrom.list[1].name == "足长"
            ? this.threeD_ObjFrom.list[1].value
            : this.threeD_ObjFrom.list[0].value,
        footWidth:
          this.threeD_ObjFrom.list[0].name == "足宽"
            ? this.threeD_ObjFrom.list[0].value
            : this.threeD_ObjFrom.list[1].value
      };
      examinePadZb3d(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.threeDDialg = false;
            this.dialogEvaluationDetails = false;
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
    },
    threeD_show(obj) {
      this.threeD_ObjFrom.list = obj;
      this.threeDDialg = true;
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
            this.examinationInfo = res.data.data.examinationInfo;
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
      // this.productSize.wc=null;
      // this.productSize.kd=null;
      // this.productSize.gd=null;
      // this.productSize.yq=null;
      // this.productSize.zb=null;
      // this.productSize.radio=null;
      for (let key in this.productSize) {
        this.productSize[key] = null;
      }
    },
    changeMoney() {
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    cancelSelection() {
      this.dialogselectProduct = false;
      this.multipleSelection = [];
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
        zbList[zb[i].name] = zb[i].value;
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
      debugger;
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
      // var regexp = /^([1][7-9][0-9][0-9]|[2][0][0-9][0-9])(\-)([0][1-9]|[1][0-2])(\-)([0-2][1-9]|[3][0-1])$/g; /// 日期范围：1700-01-01 ----2099-01-01
      // if (regexp.test(value) == 0) {
      //   this.$message({
      //     type: "warning",
      //     message: "格式错误！日期范围：1700-01-01 ----2099-01-01",
      //     center: true
      //   });
      // }
      // debugger
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
              obj.favorable = null;
              obj.favorableRemark = null;
            });
            // this.dialogselectProduct = false;
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
            obj.favorable = null;
            obj.favorableRemark = null;
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
            obj.favorable = null;
            obj.favorableRemark = null;
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
        type: this.seachProduct.productTypeValue || null,
        siteId: this.xd_siteId
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
    calculation() {
      this.paymentMethod.total =
        this.paymentMethod.xj + this.paymentMethod.zz + this.paymentMethod.lkl;
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
      // debugger;
      if (data.actual < data.lakala + data.cash + data.transfer) {
        this.$message({
          type: "warning",
          message: "支付金额大于应收金额请从新输入！",
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
      this.xd_siteId = obj.prescriptionSiteId;
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
      this.$refs[formName].validate(valid => {
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
          memberType: Number(this.ruleForm.memberType)
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
      });
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
      this.departmentList(obj.departmentId);
      this.doctorList(obj.doctorId);
      console.log(obj);
      this.dialogAddbd = true;
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
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.addData[0].prescriptionValue);
        if (
          valid &&
          this.addData[0].prescriptionValue != null &&
          this.addData[0].departmentValue != null &&
          this.addData[0].doctorValue != null &&
          this.addData[0].hospitalValue != null &&
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
                this.xiangxifanhui();
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
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.addData[0].condition = null;
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
      this.isBlackBut = null;
    },
    goBlack() {
      this.addBlack = true;
    },
    handleModify(id, isBlack) {
      this.addKeHuTitle = "修改客户信息";
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
    //列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        vip: this.seach.vipValue == "0" ? 0 : this.seach.vipValue,
        userName: this.seach.servicePersonnel || null,
        type: 201,
        status: 0
      };
      this.loading = true;
      examineAdmit(data)
        .then(res => {
          this.loading = false;
          let dataList = res.data;
          this.clientData = dataList.data.dataList;
          this.pages.total = dataList.total;
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
    // hospitals() {
    //   getHospitalList()
    //     .then(res => {
    //       // console.log(res);
    //       this.addData[0].hospitals = res.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //根据站点获取医院列表
    async hospitalList(id) {
      let data = await hospital(id);
      // this.seach.hospitalLists = data;
      this.addData[0].hospitals = data;
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
      // this.transferSite.provinceIdList = data;
    },
    //获取市
    async cityList(id) {
      let data = await city(id);
      this.seach.cityIdList = data;
      // this.transferSite.cityIdList = data;
    },
    //根据市获取站点列表
    async siteList(id) {
      let data = await site(id);
      this.seach.siteLists = data;
      // this.transferSite.siteLists = data;
    },
    isJiaJi() {
      // debugger
      this.paymentMethod.totalAmountReceivable = this.ysMoney();
      this.paymentMethod.arrears = this.xqMoney();
    },
    ysMoney() {
      // debugger
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
  text-align: center;
  // margin-top: 10px;
  padding-bottom: 8px;
  // border-bottom: 1px solid #e4e7ed;
  span {
    font-size: 14px;
    letter-spacing: 1px;
  }
}
.client_info {
  text-align: center;
  padding: 10px 0;
  span {
    font-size: 14px;
    letter-spacing: 1px;
  }
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
