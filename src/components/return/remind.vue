//待复查
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="是否会员">
        <el-select class="w-150" clearable v-model="seach.vip" placeholder="请选择">
          <el-option
            v-for="item in seach.vipList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否逾期">
        <el-select
         class="w-150"
          clearable
          v-model="seach.overdue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seach.overdueList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="回访人员">
        <el-input clearable class="w-150" v-model="seach.visitUserName" placeholder="请输入回访人"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-select
         class="w-150"
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
         class="w-150"
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
        <el-select clearable class="w-150" v-model="seach.siteValue" placeholder="请先选择城市" @change="hospitalList(seach.siteValue)">
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
      <el-form-item label="产品昵称">
        <el-input clearable class="w-150" v-model="seach.saleProductName" placeholder="请输入产品昵称"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input clearable class="w-150" v-model="seach.memberName" placeholder="请输入产品昵称"></el-input>
      </el-form-item>
      <el-form-item label="复查应到访日期">
        <el-date-picker
          class="w-250"
          v-model="seach.delivery"
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
      <el-table-column align="center" prop="vip" label="是否会员"></el-table-column>
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="tryOnUserName" label="试穿人员"></el-table-column>
      <el-table-column align="center" prop="visitTime" label="回访时间"></el-table-column>
      <el-table-column align="center" prop="confirmBackWaitTime" label="确定时间回访"></el-table-column>
      <el-table-column align="center" prop="backVisitUserName" label="回访人员"></el-table-column>
      <el-table-column align="center" prop="visitPromiseTime" label="复查到访约定时间">
        <template slot-scope="scope">
          <div :class="scope.row.red === 1 ?'color-red':''">{{scope.row.visitPromiseTime}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="details_hf(scope.row)"
            type="primary"
            size="small"
            icon="el-icon-help"
          >回访详情</el-button>
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
    <!-- 详情弹框 -->
    <el-dialog
      title="产品复查邀约回访详情"
      :visible.sync="productUsageDetailsDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      width="80%"
    >
      <h3 class="b-b-p-1">客户信息</h3>
      <el-table :data="memberDetailDto" border>
        <el-table-column prop="memberName" label="客户姓名" min-width="100"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"></el-table-column>
        <el-table-column prop="vip" label="是否会员"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">产品信息</h3>
      <el-table :data="pickupServiceInformation" border max-height="220">
        <el-table-column prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column prop="saleProductNickname" label="产品昵称"></el-table-column>
        <el-table-column prop="reflect" label="取型家长反应"></el-table-column>
        <el-table-column prop="tryOnUserName" label="试穿人员"></el-table-column>
        <el-table-column prop="tryOnBeginTime" label="试穿时间"></el-table-column>
        <el-table-column prop="tryOnRemark" label="试穿备注"></el-table-column>
        <el-table-column prop="experienceTime" label="体验回访时间"></el-table-column>
        <el-table-column prop="experiencePhone" label="体验回访电话"></el-table-column>
        <el-table-column prop="experiencePhoneStatus" label="接通状态"></el-table-column>
        <el-table-column prop="experienceUserName" label="产品体验回访人"></el-table-column>
        <el-table-column prop="experienceSatisfaction" label="客户满意度"></el-table-column>
        <el-table-column prop="visitType" label="回访类型"></el-table-column>
        <el-table-column label="产品体验问题">
          <template slot-scope="scope">
            <el-link @click="visitIdDtails(scope.row)" type="primary">
              查看详情
              <i class="el-icon-view el-icon--right"></i>
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="pickupServiceInformation_use" border max-height="220" class="margin-t-20">
        <el-table-column prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column prop="saleProductNickname" label="产品昵称"></el-table-column>
        <el-table-column prop="useTime" label="回访时间"></el-table-column>
        <el-table-column prop="usePhone" label="回访电话"></el-table-column>
        <el-table-column prop="usePhoneStatus" label="接通状态"></el-table-column>
        <el-table-column prop="useUserName" label="回访人"></el-table-column>
        <el-table-column prop="useSatisfaction" label="客户满意度"></el-table-column>
        <el-table-column prop="useHeightWeight" label="身高体重有无变化"></el-table-column>
        <el-table-column prop="visitType" label="回访类型"></el-table-column>
        <el-table-column label="产品使用问题">
          <template slot-scope="scope">
            <el-link @click="visitIdDtails_2(scope.row)" type="primary">
              查看详情
              <i class="el-icon-view el-icon--right"></i>
            </el-link>
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
      <h3 class="b-b-p-1">填写产品体验回访信息</h3>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="line-h-30 text-r">接通状态：</div>
        </el-col>
        <el-col :span="7">
          <div class="line-h-30">
            <el-radio-group v-model="usePhoneStatus">
              <el-radio label="接通">接通</el-radio>
              <el-radio label="接通挂断">接通挂断</el-radio>
              <el-radio label="联系方式错误">联系方式错误</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="line-h-30 text-r">回访电话：</div>
        </el-col>
        <el-col :span="3">
          <div>
            <el-select
              style="width:100%"
              size="mini"
              clearable
              v-model="usePhone"
              placeholder="请选择"
            >
              <el-option v-for="item in phoneList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="line-h-30 text-r">确认时间回访：</div>
        </el-col>
        <el-col :span="3">
          <div>
            <el-date-picker
              style="width:100%"
              v-model="useWaitTime"
              size="mini"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row class="margin-t-20" style="background:#ecf5ff">
        <el-col :span="3">
          <div class="line-h-30 center margin-b-10">邀约流程提示：</div>
          <div class="line-h-30 center margin-b-10">1.表明身份</div>
          <div class="line-h-30 center margin-b-10">2.确认身份</div>
          <div class="line-h-30 center margin-b-10">3.表明目的</div>
          <div class="line-h-30 center margin-b-10">4.确定时间</div>
        </el-col>
        <el-col :span="12">
          <el-row class="padding-tb-20">
            <el-col :span="8">
              <div class="text-r">沟通结果：</div>
            </el-col>
            <el-col :span="16">
              <div>
                <el-radio-group v-model="backTalkResult">
                  <el-radio v-for="(item,index) in ls_gtjg" :key="index" :label="item"></el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="padding-tb-20">
            <el-col :span="8">
              <div class="text-r">复查邀约结果：</div>
            </el-col>
            <el-col :span="16">
              <div>
                <el-radio-group v-model="backInviteResult">
                  <el-radio v-for="(item,index) in ls_fcyyjg" :key="index" :label="item"></el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="padding-tb-20">
            <el-col :span="8">
              <div class="text-r line-h-30">复查到访约定时间：</div>
            </el-col>
            <el-col :span="16">
              <el-date-picker
                size="mini"
                v-model="visitWaitTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="9">
          <div class="line-h-30 margin-b-10">流失原因：</div>
          <div class="margin-b-10">
            <el-input
              style="width:80%"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="causeOfLoss"
            ></el-input>
          </div>
          <div class="line-h-30">
            <el-button @click="userChurn(productVisitIds)" size="mini" type="danger">确认流失</el-button>
          </div>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="addVisit(productVisitIds)" type="success" icon="el-icon-circle-check">确认提交</el-button>
        <el-button @click="addPhone()" type="success" icon="el-icon-circle-plus-outline">添加联系电话</el-button>
        <el-button @click="morePrduct_function()" type="success" icon="el-icon-tickets">更多产品信息</el-button>
      </span>
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
        <span class="margin-r-20">{{memberDetailDto[0].memberName}}</span>
        <span>出生日期:</span>
        <span class="margin-r-20">{{memberDetailDto[0].birthday}}</span>
        <span>联系方式:</span>
        <span class="margin-r-20">{{memberDetailDto[0].phone}}</span>
        <span>家庭住址:</span>
        <span class="margin-r-20">{{memberDetailDto[0].address}}</span>
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
          <span>新增病情:</span>
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
    <!-- 更多产品 -->
    <el-dialog
      title="更多产品"
      :visible.sync="dialogMoreProducts"
      :close-on-click-modal="false"
      width="80%"
    >
      <el-table :data="moreProducts" border>
        <el-table-column prop="orderNum" label="订单号" min-width="100"></el-table-column>
        <el-table-column prop="saleProductName" label="产品名称"></el-table-column>
        <el-table-column prop="saleProductNickname" label="产品昵称"></el-table-column>
        <el-table-column prop="source" label="产品分类"></el-table-column>
        <el-table-column prop="hospitalName" label="医院名称"></el-table-column>
        <el-table-column prop="departmentName" label="科室"></el-table-column>
        <el-table-column prop="doctorName" label="医生"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="orderUserName" label="下单人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="tag-read"
              @click="copy(scope.$index)"
              size="mini"
              icon="el-icon-copy-document"
              type="primary"
            >复制单号</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加电话 -->
    <el-dialog
      title="添加电话信息"
      :visible.sync="addPhoneDialog"
      :close-on-click-modal="false"
      width="30%"
      :before-close="cancelAddPhone"
    >
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="line-h-30 text-r">电话号码：</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-input type="text" size="mini" placeholder="请输入电话号码" v-model="backupPhone"></el-input>
          </div>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button type="primary" @click="cancelAddPhone" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="addSparePhone" type="success" icon="el-icon-circle-check">确认</el-button>
      </span>
    </el-dialog>
    <!-- 添加电话 -->
    <el-dialog
      title="添加电话信息"
      :visible.sync="addPhoneDialog"
      :close-on-click-modal="false"
      width="30%"
      :before-close="cancelAddPhone"
    >
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="line-h-30 text-r">电话号码：</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-input type="text" size="mini" placeholder="请输入电话号码" v-model="backupPhone"></el-input>
          </div>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button type="primary" @click="cancelAddPhone" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="addSparePhone" type="success" icon="el-icon-circle-check">确认</el-button>
      </span>
    </el-dialog>
    <!-- 产品待体验回访详情 -->
    <el-dialog
      title="产品体验待回访详情"
      :visible.sync="productDetailsForReturnVisitDialog"
      :close-on-click-modal="false"
      width="1042px"
    >
      <div class="product_box">
        <div class="my_box clearfix" ref="my_box">
          <div v-show="productItemUse.item_1" class="item">
            <h4 class="center border-b-1 product_title">足弓垫</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">每天使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[0].experienceUseTime">
                        <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[0].experienceSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">目测使用效果：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[0].experienceUseEffect">
                        <el-radio v-for="(item,index) in isXG" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box_use[0].experienceNotice">
                        <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box_use[0].experienceNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                        <el-radio label="鞋垫保养">鞋垫保养</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="border-b-1">
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">C系列</h5>
                    <el-row class="padding-tb-15">
                      <el-col :span="10">
                        <div class="text-r">足弓有无塌陷：</div>
                      </el-col>
                      <el-col :span="12">
                        <div>
                          <el-radio-group v-model="data_box_use[0].experienceCTaxian">
                            <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row class="padding-tb-15">
                      <el-col :span="10">
                        <div class="text-r">表层有无开胶：</div>
                      </el-col>
                      <el-col :span="12">
                        <div>
                          <el-radio-group v-model="data_box_use[0].experienceCKaijiao">
                            <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">Z系列</h5>
                    <el-row class="padding-tb-15">
                      <el-col :span="10">
                        <div class="text-r">有无开胶：</div>
                      </el-col>
                      <el-col :span="12">
                        <div>
                          <el-radio-group v-model="data_box_use[0].experienceZKaijiao">
                            <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row class="padding-tb-15">
                      <el-col :span="10">
                        <div class="text-r">有无断层：</div>
                      </el-col>
                      <el-col :span="12">
                        <div>
                          <el-radio-group v-model="data_box_use[0].experienceZDuanceng">
                            <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-10">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[0].experienceProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-10">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box_use[0].experienceProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItemUse.item_2" class="item">
            <h4 class="center border-b-1 product_title">长腿类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">每天使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[1].experienceUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[1].experienceSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">目测使用效果：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[1].experienceUseEffect">
                        <el-radio v-for="(item,index) in isXG" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box_use[1].experienceNotice">
                        <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box_use[1].experienceNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                        <el-radio label="按摩">按摩</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">磨皮肤：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[1].experienceMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">子母扣翘起：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[1].experienceZimukouqiaoqi">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">关节灵活度：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[1].experienceGuanjielinghuodu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[1].experienceProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box_use[1].experienceProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItemUse.item_3" class="item">
            <h4 class="center border-b-1 product_title">膝外翻</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">每天使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[2].experienceUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[2].experienceSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">目测使用效果：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[2].experienceUseEffect">
                        <el-radio v-for="(item,index) in isXG" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box_use[2].experienceNotice">
                        <el-checkbox v-for="item in zysx_3" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box_use[2].experienceNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="生活习惯">生活习惯</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">支具下滑：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[2].experienceZhijuxiahua">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">子母扣翘起：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[2].experienceZimukouqiaoqi">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">磨皮肤：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[2].experienceMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[2].experienceProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box_use[2].experienceProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItemUse.item_4" class="item">
            <h4 class="center border-b-1 product_title">踝足类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">每天使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[3].experienceUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[3].experienceSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">目测使用效果：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[3].experienceUseEffect">
                        <el-radio v-for="(item,index) in isXG" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box_use[3].experienceNotice">
                        <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box_use[3].experienceNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="鞋垫保养">鞋垫保养</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">螺丝松动：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[3].experienceLuosisongdong">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">子母扣翘起：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[3].experienceZimukouqiaoqi">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">磨皮肤：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[3].experienceMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[3].experienceProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box_use[3].experienceProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItemUse.item_5" class="item">
            <h4 class="center border-b-1 product_title">脊柱类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">每天使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[4].experienceUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[4].experienceSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">目测使用效果：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[4].experienceUseEffect">
                        <el-radio v-for="(item,index) in isXG" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box_use[4].experienceNotice">
                        <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box_use[4].experienceNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="按摩">按摩</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">磨皮肤：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[4].experienceMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">支具下滑：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[4].experienceZhijuxiahua">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">子母扣翘起：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[4].experienceZimukouqiaoqi">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[4].experienceProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box_use[4].experienceProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItemUse.item_6" class="item">
            <h4 class="center border-b-1 product_title">丹尼类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">每天使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[5].experienceUseTime">
                        <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[5].experienceSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">目测使用效果：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[5].experienceUseEffect">
                        <el-radio v-for="(item,index) in isXG" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box_use[5].experienceNotice">
                        <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box_use[5].experienceNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                        <el-radio label="鞋垫保养">鞋垫保养</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">角度松动：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[5].experienceJiaodusongdong">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">磨皮肤：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[5].experienceMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[5].experienceProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box_use[5].experienceProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItemUse.item_7" class="item">
            <h4 class="center border-b-1 product_title">扭转类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">每天使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[6].experienceUseTime">
                        <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[6].experienceSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">目测使用效果：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[6].experienceUseEffect">
                        <el-radio v-for="(item,index) in isXG" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box_use[6].experienceNotice">
                        <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box_use[6].experienceNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                        <el-radio label="鞋垫保养">鞋垫保养</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">磨皮肤：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[6].experienceMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">角度变化：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[6].experienceJiaodubianhua">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">步态：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[6].experienceButai">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[6].experienceProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box_use[6].experienceProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItemUse.item_8" class="item">
            <h4 class="center border-b-1 product_title">其他产品</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">每天使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[7].experienceUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[7].experienceSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">目测使用效果：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box_use[7].experienceUseEffect">
                        <el-radio v-for="(item,index) in isXG" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-30">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box_use[7].experienceNotice">
                        <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box_use[7].experienceNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="按摩">按摩</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>

                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">子母扣翘起：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[7].experienceZimukouqiaoqi">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">磨皮肤：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[7].experienceMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">其他：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 2}"
                        placeholder="请输入内容"
                        v-model="data_box_use[7].experienceQita"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box_use[7].experienceProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 2}"
                        placeholder="请输入内容"
                        v-model="data_box_use[7].experienceProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 产品待使用回访详情 -->
    <el-dialog
      title="产品使用待回访详情"
      :visible.sync="productVisitDialog_2"
      :close-on-click-modal="false"
      width="1042px"
    >
      <div class="product_box">
        <div class="my_box clearfix" ref="my_box">
          <div v-show="productItem.item_1" class="item">
            <h4 class="center border-b-1 product_title">足弓垫</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[0].useUseTime">
                        <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[0].useSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">身高体重有无变化：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[0].useHeightWeight">
                        <el-radio v-for="(item,index) in isST" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">支具干净程度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[0].useClean">
                        <el-radio v-for="(item,index) in isGJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用情况：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[0].useUseEffect">
                        <el-radio v-for="(item,index) in isQK" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box[0].useNotice">
                        <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box[0].useNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                        <el-radio label="鞋垫保养">鞋垫保养</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="8">
                    <div class="text-r">C系列足弓有无塌陷：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[0].useCTaxian">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">底层开裂：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[0].useDicengkailie">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">皮肤有无磨损：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[0].useMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-10">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[0].useProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-10">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box[0].useProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItem.item_2" class="item">
            <h4 class="center border-b-1 product_title">长腿类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[1].useUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[1].useSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">身高体重有无变化：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[1].useHeightWeight">
                        <el-radio v-for="(item,index) in isST" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">支具干净程度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[1].useClean">
                        <el-radio v-for="(item,index) in isGJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用情况：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[1].useUseEffect">
                        <el-radio v-for="(item,index) in isQK" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box[1].useNotice">
                        <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box[1].useNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                        <el-radio label="按摩">鞋垫保养</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">皮肤有无磨损：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[1].useMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">尼龙带：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[1].useNilongdai">
                        <el-radio v-for="item in isNLD" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">支具形变：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[1].useZhijubianxing">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[1].useProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box[1].useProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItem.item_3" class="item">
            <h4 class="center border-b-1 product_title">膝外翻</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[2].useUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[2].useSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">身高体重有无变化：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[2].useHeightWeight">
                        <el-radio v-for="(item,index) in isST" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">支具干净程度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[2].useClean">
                        <el-radio v-for="(item,index) in isGJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用情况：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[2].useUseEffect">
                        <el-radio v-for="(item,index) in isQK" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box[2].useNotice">
                        <el-checkbox v-for="item in zysx_3" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box[2].useNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="生活习惯">生活习惯</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">支具变形：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[2].useZhijubianxing">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">尼龙带：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[2].useNilongdai">
                        <el-radio v-for="item in isNLD" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">皮肤有无磨损：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[2].useMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[2].useProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box[2].useProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItem.item_4" class="item">
            <h4 class="center border-b-1 product_title">踝足类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[3].useUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">身高体重有无变化：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[3].useHeightWeight">
                        <el-radio v-for="(item,index) in isST" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">支具干净程度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[3].useClean">
                        <el-radio v-for="(item,index) in isGJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[3].useSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用情况：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[3].useUseEffect">
                        <el-radio v-for="(item,index) in isQK" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box[3].useNotice">
                        <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box[3].useNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="按摩">按摩</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">螺丝松动：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[3].useLuosisongdong">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">尼龙带：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[3].useNilongdai">
                        <el-radio v-for="item in isNLD" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">皮肤有无磨损：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[3].useMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[3].useProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box[3].useProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItem.item_5" class="item">
            <h4 class="center border-b-1 product_title">脊柱类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[4].useUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">身高体重有无变化：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[4].useHeightWeight">
                        <el-radio v-for="(item,index) in isST" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">支具干净程度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[4].useClean">
                        <el-radio v-for="(item,index) in isGJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[4].useSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用情况：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[4].useUseEffect">
                        <el-radio v-for="(item,index) in isQK" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box[4].useNotice">
                        <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box[4].useNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="按摩">按摩</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">皮肤有无磨损：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[4].useMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">尼龙带：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[4].useNilongdai">
                        <el-radio v-for="item in isNLD" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">支具变形：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[4].useZhijubianxing">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[4].useProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box[4].useProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItem.item_6" class="item">
            <h4 class="center border-b-1 product_title">丹尼类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[5].useUseTime">
                        <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">身高体重有无变化：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[5].useHeightWeight">
                        <el-radio v-for="(item,index) in isST" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">支具干净程度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[5].useClean">
                        <el-radio v-for="(item,index) in isGJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[5].useSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用情况：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[5].useUseEffect">
                        <el-radio v-for="(item,index) in isQK" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box[5].useNotice">
                        <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box[5].useNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                        <el-radio label="鞋垫保养">鞋垫保养</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">角度松动：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[5].useJiaodusongdong">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">尼龙带：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[5].useNilongdai">
                        <el-radio v-for="item in isNLD" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">皮肤有无磨损：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[5].useMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[5].useProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box[5].useProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItem.item_7" class="item">
            <h4 class="center border-b-1 product_title">扭转类</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[6].useUseTime">
                        <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">身高体重有无变化：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[6].useHeightWeight">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">支具干净程度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[6].useClean">
                        <el-radio v-for="(item,index) in isGJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[6].useSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用情况：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[6].useUseEffect">
                        <el-radio v-for="(item,index) in isQK" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box[6].useNotice">
                        <el-checkbox v-for="item in zysx_3" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box[6].useNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                        <el-radio label="生活习惯">生活习惯</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">皮肤有无磨损：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[6].useMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">连接处脱开：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[6].useLianjiechutuokai">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">步态有无变化：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[6].useButai">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[6].useProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box[6].useProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-show="productItem.item_8" class="item">
            <h4 class="center border-b-1 product_title">其他产品</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-col :span="12" class="border-r-1">
                <h5 class="center border-b-1">使用调查</h5>
                <el-row class="padding-special">
                  <el-col :span="8">
                    <div class="text-r">使用时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[7].useUseTime">
                        <el-radio
                          v-for="(item,index) in isSYSJ_L"
                          :key="index"
                          :label="item"
                          :class="index == 3 || index == 4 ?'margin-t-10':''"
                        ></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">身高体重有无变化：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[7].useHeightWeight">
                        <el-radio v-for="(item,index) in isST" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">支具干净程度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[7].useClean">
                        <el-radio v-for="(item,index) in isGJ" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">客户满意度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[7].useSatisfaction">
                        <el-radio v-for="(item,index) in isMY" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">使用情况：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[7].useUseEffect">
                        <el-radio v-for="(item,index) in isQK" :key="index" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-20">
                  <el-col :span="8">
                    <div class="text-r">注意事项：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-checkbox-group v-model="data_box[7].useNotice">
                        <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                      <!-- <el-radio-group v-model="data_box[7].useNotice">
                        <el-radio label="运动">运动</el-radio>
                        <el-radio label="按摩">按摩</el-radio>
                        <el-radio label="皮肤护理">皮肤护理</el-radio>
                      </el-radio-group>-->
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <h5 class="center border-b-1">产品问题</h5>

                <el-row class="padding-tb-15">
                  <el-col :span="8">
                    <div class="text-r">子母扣有无生锈：</div>
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <el-radio-group v-model="data_box[7].useZimukoushengxiu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">皮肤有无磨损：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[7].useMopifu">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">尼龙带：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-radio-group v-model="data_box[7].useNilongdai">
                        <el-radio v-for="item in isNLD" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">是否有问题：</div>
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-radio-group v-model="data_box[7].useProblemHave">
                        <el-radio v-for="item in isYW" :key="item" :label="item"></el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="padding-tb-15">
                  <el-col :span="5">
                    <div class="text-r">问题处理：</div>
                  </el-col>
                  <el-col :span="18">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 3}"
                        placeholder="请输入内容"
                        v-model="data_box[7].useProblemDo"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 待复查详情弹框 -->
    <el-dialog
      title="待复查详情"
      :visible.sync="dfc_Dialog"
      :close-on-click-modal="false"
      :before-close="cancel_dfc"
      width="80%"
    >
      <h3 class="b-b-p-1">客户信息</h3>
      <el-table :data="memberDetailDto" border>
        <el-table-column prop="memberName" label="客户姓名" min-width="100"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"></el-table-column>
        <el-table-column prop="vip" label="是否会员"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
      </el-table>
      <h3 class="b-b-p-1">复查邀约回访记录</h3>
      <el-table :data="pickupServiceInformation_back" border max-height="220">
        <el-table-column prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column prop="saleProductNickname" label="产品昵称"></el-table-column>
        <el-table-column prop="backTime" label="邀约回访时间"></el-table-column>
        <el-table-column prop="backPhone" label="回访电话"></el-table-column>
        <el-table-column prop="backPhoneStatus" label="接通状态"></el-table-column>
        <el-table-column prop="backUserName" label="回访人"></el-table-column>
        <el-table-column prop="visitPromiseTime" label="复查预约到访时间"></el-table-column>
        <el-table-column prop="confirmBackWaitTime" label="确认预约应回访时间"></el-table-column>
        <el-table-column label="邀约回访详情">
          <template slot-scope="scope">
            <el-link @click="visitIdDtails_3(scope.row)" type="primary">
              查看详情
              <i class="el-icon-view el-icon--right"></i>
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="cancel_dfc()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="details(rowObj)" type="success" icon="el-icon-circle-check">修改/确认到访时间</el-button>
      </span>
    </el-dialog>
    <!-- 复查预约回访详情 -->
    <el-dialog
      title="复查邀约回访详情"
      :visible.sync="productVisitDialog_3"
      :close-on-click-modal="false"
      width="1042px"
    >
      <div class="product_box">
        <div class="my_box clearfix" style="height:auto">
          <div class="item">
            <h4 class="center border-b-1 product_title">邀约回访</h4>
            <el-row class="margin-t-20 margin-b-20">
              <el-row class="padding-tb-20">
                <el-col :span="8">
                  <div class="text-r">沟通结果：</div>
                </el-col>
                <el-col :span="16">
                  <div>
                    <el-radio-group v-model="ls_back.backTalkResult">
                      <el-radio v-for="(item,index) in ls_gtjg" :key="index" :label="item"></el-radio>
                    </el-radio-group>
                  </div>
                </el-col>
              </el-row>
              <el-row class="padding-tb-20">
                <el-col :span="8">
                  <div class="text-r">复查邀约结果：</div>
                </el-col>
                <el-col :span="16">
                  <div>
                    <el-radio-group v-model="ls_back.backInviteResult">
                      <el-radio v-for="(item,index) in ls_fcyyjg" :key="index" :label="item"></el-radio>
                    </el-radio-group>
                  </div>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </div>
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
  selectWaitReviewByPage,
  selectUpdateBackWaitVisitDetail,
  queryExamineDetail,
  selectBackupPhoneByMemberId,
  insertBackVisit,
  insertBackupPhone,
  insertOutflow,
  selectOrderDetailByMemberId,
  selectVisitDetailByVisitIdAndType,
  selectWaitReviewDetail,
  printMakeParam,
  examinePadZb3d,
  queryWaitReviewDetail
} from "../../api/javaApi";
import {
  exportMethod,
  personnel,
  tips,
  arrayDeduplication, province, city,allSite, site,hospital,getBase64Image,img_base64
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import Clipboard from "clipboard";
import Print from "../commonComponent/PrintTemplate";
export default {
  name: "App",
  data() {
    return {
      //列表数据
      clientData: [],
      loading: true,
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        repairUserId: null,
        delivery: null,
        scUserNameList: [],
        phoneStatus: null,
        phoneStatusList: [
          { name: "接通" },
          { name: "多次未接通" },
          { name: "接通挂断" },
          { name: "联系方式错误" }
        ],
        saleProductName: null,
        memberName: null,
        visitUserName: null,
        overdue: null,
        overdueList: [{ name: "是", id: 1 }, { name: "否", id: "0" }],
        vip: null,
        vipList: [{ name: "是", id: 1 }, { name: "否", id: "0" }],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists:[],
        hospitalId:null,
      },
      productUsageDetailsDialog: false,
      productDetailsForReturnVisitDialog: false,
      productVisitDialog_2: false,
      productVisitDialog_3: false,
      dfc_Dialog: false,
      userMemberId: null,
      rowObj: null,
      //回访id数组
      multipleSelection: [],
      memberDetailDto: [{}],
      pickupServiceInformation: [],
      pickupServiceInformation_use: [],
      pickupServiceInformation_back: [],
      //测评信息
      dialogEvaluationDetails: false, //测评信息详情弹框
      examinationInfo: {}, //测评详情
      detailList: [], //测评详情
      evaluates: [],
      causeOfLoss: null,
      nextVisitDate: null,
      onState: null,
      //
      textarea_1: null,
      //更多产品
      dialogMoreProducts: false,
      moreProducts: [],
      //添加电话
      addPhoneDialog: false,
      //用户电话列表
      phoneList: [],
      //模板表显示
      productItem_box: false,
      productItem: {
        item_1: false,
        item_2: false,
        item_3: false,
        item_4: false,
        item_5: false,
        item_6: false,
        item_7: false,
        item_8: false
      },
      //体验回访详情
      productItemUse: {
        item_1: false,
        item_2: false,
        item_3: false,
        item_4: false,
        item_5: false,
        item_6: false,
        item_7: false,
        item_8: false
      },
      usePhoneStatus: null,
      usePhone: null,
      useWaitTime: null,
      productVisitType: [],
      visitForms: [],
      backupPhone: null,
      //模板数据
      backTalkResult: null,
      backInviteResult: null,
      visitWaitTime: null,
      isYW: ["有", "无"],
      isGJ: ["干净", "脏"],
      isSYSJ: ["未使用", "5小时以下", "5-12小时"],
      isSYSJ_L: ["未使用", "5小时以下", "5-12小时", "5-18小时", "18小时以上"],
      isMY: ["满意", "一般", "不满意"],
      isST: ["有变化", "无变化", "没量"],
      isXG: ["没注意", "没变化", "有点变化"],
      isQK: ["鼓励", "警告"],
      isNLD: ["粘", "不沾"],
      ls_gtjg: ["配合", "不配合"],
      ls_fcyyjg: ["拒绝不来", "没时间", "时间不定", "时间确定"],
      zysx_1: ["运动", "皮肤护理", "鞋垫保养"],
      zysx_2: ["运动", "皮肤护理", "按摩"],
      zysx_3: ["运动", "皮肤护理", "生活习惯"],
      ls_fcdfydsj: null,
      productVisitIds:[],
      ls_back: {},
      data_box_use: [
        {
          productType: 1,
          experienceUseTime: null,
          experienceSatisfaction: null,
          experienceUseEffect: null,
          experienceNotice: [],
          experienceCTaxian: null,
          experienceCKaijiao: null,
          experienceZKaijiao: null,
          experienceZDuanceng: null,
          experienceProblemHave: null,
          experienceProblemDo: null
        },
        {
          productType: 2,
          experienceUseTime: null,
          experienceSatisfaction: null,
          experienceUseEffect: null,
          experienceNotice: [],
          experienceMopifu: null,
          experienceZimukouqiaoqi: null,
          experienceGuanjielinghuodu: null,
          experienceProblemHave: null,
          experienceProblemDo: null
        },
        {
          productType: 3,
          experienceUseTime: null,
          experienceSatisfaction: null,
          experienceUseEffect: null,
          experienceNotice: [],
          experienceZhijuxiahua: null,
          experienceLuosisongdong: null,
          experienceZimukouqiaoqi: null,
          experienceMopifu: null,
          experienceProblemHave: null,
          experienceProblemDo: null
        },
        {
          productType: 4,
          experienceUseTime: null,
          experienceSatisfaction: null,
          experienceUseEffect: null,
          experienceNotice: [],
          experienceLuosisongdong: null,
          experienceZimukouqiaoqi: null,
          experienceMopifu: null,
          experienceProblemHave: null,
          experienceProblemDo: null
        },
        {
          productType: 5,
          experienceUseTime: null,
          experienceSatisfaction: null,
          experienceUseEffect: null,
          experienceNotice: [],
          experienceMopifu: null,
          experienceZhijuxiahua: null,
          experienceZimukouqiaoqi: null,
          experienceProblemHave: null,
          experienceProblemDo: null
        },
        {
          productType: 6,
          experienceUseTime: null,
          experienceSatisfaction: null,
          experienceUseEffect: null,
          experienceNotice: [],
          experienceJiaodusongdong: null,
          experienceMopifu: null,
          experienceProblemHave: null,
          experienceProblemDo: null
        },
        {
          productType: 7,
          experienceUseTime: null,
          experienceSatisfaction: null,
          experienceUseEffect: null,
          experienceNotice: [],
          experienceMopifu: null,
          experienceJiaodubianhua: null,
          experienceButai: null,
          experienceProblemHave: null,
          experienceProblemDo: null
        },
        {
          productType: 8,
          experienceUseTime: null,
          experienceSatisfaction: null,
          experienceUseEffect: null,
          experienceNotice: [],
          experienceZimukouqiaoqi: null,
          experienceMopifu: null,
          experienceQita: null,
          experienceProblemHave: null,
          experienceProblemDo: null
        }
      ],
      data_box: [
        {
          productType: 1,
          useUseTime: null,
          useHeightWeight: null,
          useSatisfaction: null,
          useNotice: [],
          useClean: null,
          useDicengkailie: null,
          useUseEffect: null,
          useCTaxian: null,
          useMopifu: null,
          useProblemHave: null,
          useProblemDo: null
        },
        {
          productType: 2,
          useUseTime: null,
          useHeightWeight: null,
          useSatisfaction: null,
          useNotice: [],
          useClean: null,
          useUseEffect: null,
          useMopifu: null,
          useNilongdai: null,
          useZhijubianxing: null,
          useProblemHave: null,
          useProblemDo: null
        },
        {
          productType: 3,
          useUseTime: null,
          useHeightWeight: null,
          useSatisfaction: null,
          useNotice: [],
          useClean: null,
          useUseEffect: null,
          useMopifu: null,
          useNilongdai: null,
          useZhijubianxing: null,
          useProblemHave: null,
          useProblemDo: null
        },
        {
          productType: 4,
          useUseTime: null,
          useHeightWeight: null,
          useSatisfaction: null,
          useNotice: [],
          useClean: null,
          useUseEffect: null,
          useMopifu: null,
          useNilongdai: null,
          useLuosisongdong: null,
          useProblemHave: null,
          useProblemDo: null
        },
        {
          productType: 5,
          useUseTime: null,
          useHeightWeight: null,
          useSatisfaction: null,
          useNotice: [],
          useClean: null,
          useUseEffect: null,
          useMopifu: null,
          useNilongdai: null,
          useZhijubianxing: null,
          useProblemHave: null,
          useProblemDo: null
        },
        {
          productType: 6,
          useUseTime: null,
          useHeightWeight: null,
          useSatisfaction: null,
          useNotice: [],
          useClean: null,
          useUseEffect: null,
          useMopifu: null,
          useNilongdai: null,
          useJiaodusongdong: null,
          useProblemHave: null,
          useProblemDo: null
        },
        {
          productType: 7,
          useUseTime: null,
          useHeightWeight: null,
          useSatisfaction: null,
          useNotice: [],
          useClean: null,
          useUseEffect: null,
          useMopifu: null,
          useLianjiechutuokai: null,
          useButai: null,
          useProblemHave: null,
          useProblemDo: null
        },
        {
          productType: 8,
          useUseTime: null,
          useHeightWeight: null,
          useSatisfaction: null,
          useNotice: [],
          useClean: null,
          useUseEffect: null,
          useMopifu: null,
          useNilongdai: null,
          useZimukoushengxiu: null,
          useProblemHave: null,
          useProblemDo: null
        }
      ],
      //检测报告
      dialogTestReport: false,
      testReport: {},
      isTwo: true,
      htmlTitle: "测评报告PDF",
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
    this.userList();
    this.provinceList();
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
            img_base64(this,res.data.data)
            this.dialogTestReport = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel_dfc() {
      this.dfc_Dialog = false;
    },
    visitIdDtails_3(obj) {
      let data = {
        visitId: obj.visitId,
        visitTypeInt: obj.visitTypeInt
      };
      selectVisitDetailByVisitIdAndType(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.ls_back = res.data.data;
            this.productVisitDialog_3 = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    visitIdDtails_2(obj) {
      for (let key in this.productItem) {
        this.productItem[key] = false;
      }
      let data = {
        visitId: obj.visitId,
        visitTypeInt: obj.visitTypeInt
      };
      selectVisitDetailByVisitIdAndType(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.data_box[obj.saleProductType - 1] = res.data.data;
            this.productItem["item_" + obj.saleProductType] = true;
            this.productVisitDialog_2 = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    visitIdDtails(obj) {
      for (let key in this.productItemUse) {
        this.productItemUse[key] = false;
      }
      let data = {
        visitId: obj.visitId,
        visitTypeInt: obj.visitTypeInt
      };
      selectVisitDetailByVisitIdAndType(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.data_box_use[obj.saleProductType - 1] = res.data.data;
            this.productItemUse["item_" + obj.saleProductType] = true;
            this.productDetailsForReturnVisitDialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    userChurn(list) {
      let data = {
        outflowPhoneStatus: this.usePhoneStatus,
        outflowPhone: this.usePhone,
        outflowReason: this.causeOfLoss,
        visitIds: list//this.multipleSelection
      };
      insertOutflow(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.cancel();
            this.cancel_dfc()
            this.pageList(this.pages.currentPage, this.pages.pageSize);
            this.$message({
              type: "success",
              message: "提交成功！",
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addVisit(list) {
      //   this.productVisitType.forEach((item, index) => {
      //     let element = this.data_box[Number(item) - 1];
      //     this.visitForms.push(element);
      //   });
      //   console.log(this.visitForms);
      //   console.log(this.data_box);
      let data = {
        visitIds: list,//this.multipleSelection,
        backPhoneStatus: this.usePhoneStatus,
        backPhone: this.usePhone,
        visitWaitTime: this.visitWaitTime,
        confirmBackWaitTime: this.useWaitTime,
        backInviteResult: this.backInviteResult,
        backTalkResult: this.backTalkResult
      };
      insertBackVisit(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
            // this.visitForms=[]
          } else {
            this.cancel();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
            this.$message({
              type: "success",
              message: "提交成功！",
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addSparePhone() {
      let data = {
        memberId: this.userMemberId,
        backupPhone: this.backupPhone
      };
      insertBackupPhone(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.cancelAddPhone();
            this.userPhoneList(this.userMemberId);
            this.$message({
              type: "success",
              message: "添加成功！",
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelAddPhone() {
      this.addPhoneDialog = false;
      this.backupPhone = null;
    },
    addPhone() {
      this.addPhoneDialog = true;
    },
    copy(index) {
      let copyText = this.moreProducts[index].orderNum;
      let clipboard = new Clipboard(".tag-read", {
        text: function() {
          return copyText;
        }
      });
      clipboard.on("success", e => {
        tips(this, "复制成功!", "success");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        tips(this, "该浏览器不支持自动复制!", "warning");
        // 释放内存
        clipboard.destroy();
      });
    },
    morePrduct_function() {
      let data = {
        memberId: this.userMemberId
      };
      selectOrderDetailByMemberId(data)
        .then(res => {
          console.log(res);
          this.moreProducts = res.data.data.data;
          this.dialogMoreProducts = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      this.productUsageDetailsDialog = false;
      this.multipleSelection = [];
      for (let key in this.productItem) {
        this.productItem[key] = false;
      }
      this.usePhoneStatus = null;
      this.useWaitTime = null;
      this.visitForms = [];
      this.usePhone = null;
      this.causeOfLoss = null;
      this.backInviteResult = null;
      this.backTalkResult = null;
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      console.log(val);
      //   let myType = [];
      //   if (val.length > 0) {
      // for (let key in this.productItem) {
      //   this.productItem[key] = false;
      // }
      val.forEach(element => {
        //   this.productItem["item_" + element.saleProductType] = true;
        //   myType.push(element.saleProductType);
        this.multipleSelection.push(element.visitId);
      });
      // let myArry = arrayDeduplication(myType);
      // this.productItem_box = true;
      // this.productVisitType = myArry;
      // console.log(this.productVisitType);
      // this.$refs.my_box.style.width = 1002 * myArry.length + "px";
      //   } else {
      //     this.productItem_box = false;
      //   }
    },
    details_hf(obj) {
      this.userMemberId = obj.memberId;
      this.rowObj = obj;
      // this.userPhoneList(obj.memberId);
      let data = { backVisitId: obj.backVisitId };
      queryWaitReviewDetail(data)
        .then(res => {
          console.log(res);
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let details = res.data.data;
            this.memberDetailDto[0]=details.memberDetail;// details.memberDetailDTO;
            this.pickupServiceInformation_back =details.prescriptionDTO
              // details.visitFinishProductDetailDTO;
            this.dfc_Dialog = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(obj) {
      this.userMemberId = obj.memberId;
      this.userPhoneList(obj.memberId);
      let data = { visitId: obj.visitId };
      selectUpdateBackWaitVisitDetail(data)
        .then(res => {
          console.log(res);
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let details = res.data.data;
            this.memberDetailDto = details.memberDetailDTO;
            this.pickupServiceInformation = details.useWaitProductDetailDTO;
            this.pickupServiceInformation_use =
              details.backWaitProductDetailDTO;
            this.evaluates = details.evaluates;
            this.backInviteResult = details.backVisitDetailDTO.backInviteResult;
            this.backTalkResult = details.backVisitDetailDTO.backTalkResult;
            this.useWaitTime = details.backVisitDetailDTO.confirmBackWaitTime;
            this.visitWaitTime = details.backVisitDetailDTO.visitWaitTime;
            // this.useWaitTime=new Date(2018, 9, 10);
            // this.visitWaitTime=new Date(2000, 10, 10, 10, 10);
            console.log(this.useWaitTime);
            console.log(this.visitWaitTime);
            this.usePhone = details.backVisitDetailDTO.backPhone;
            this.usePhoneStatus = details.backVisitDetailDTO.backPhoneStatus;
            this.productVisitIds=details.visitIds
            this.productUsageDetailsDialog = true;
            this.handleSelectionChange(details.useWaitProductDetailDTO);
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
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        visitPromiseTimeBegin:
          this.seach.delivery == null ? null : this.seach.delivery[0],
        visitPromiseTimeEnd:
          this.seach.delivery == null ? null : this.seach.delivery[1],
        visitUserName: this.seach.visitUserName,
        saleProductName: this.seach.saleProductName,
        memberName: this.seach.memberName,
        overdue: this.seach.overdue == "0" ? 0 : this.seach.overdue,
        vip: this.seach.vip == "0" ? 0 : this.seach.vip,
        phoneStatus: this.seach.phoneStatus,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectWaitReviewByPage(data)
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
    //获取试穿人员列表
    // async userList() {
    //   this.seach.scUserNameList = await personnel(9);
    // },
    //获取试穿人员列表
    async userList() {
      this.seach.scUserNameList = await personnel(6);
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
    //电话号列表
    userPhoneList(id) {
      let data = {
        memberId: id
      };
      selectBackupPhoneByMemberId(data)
        .then(res => {
          console.log(res);
          this.phoneList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.color-red {
  color: #fb5b3c;
}
.product_box {
  width: 100%;
  overflow-y: hidden;
  margin-top: 20px;
  // border: 1px solid #CDCDCD;
  .my_box {
    height: 413px;
    width: 0px;
    .item {
      border: 1px solid #cdcdcd;
      width: 1000px;
      height: auto;
      float: left;
    }
  }
}
.product_title {
  background: #3a8ee6;
  color: #ecf5ff;
}
.padding-special {
  padding: 7.5px 0px;
}
.border-b-1 {
  border-bottom: 1px solid #cdcdcd;
  line-height: 30px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.border-r-1 {
  border-right: 1px solid #cdcdcd;
}
</style>
