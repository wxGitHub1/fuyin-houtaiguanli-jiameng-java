// 已回访
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="回访人员">
        <el-input clearable class="w-150" v-model="seach.visitUserName" placeholder="请输入回访人"></el-input>
      </el-form-item>
      <el-form-item label="产品昵称">
        <el-input clearable class="w-150" v-model="seach.saleProductName" placeholder="请输入产品昵称"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input clearable class="w-150" v-model="seach.memberName" placeholder="请输入客户姓名"></el-input>
      </el-form-item>
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
      <el-form-item label="是否流失">
        <el-select class="w-150" clearable v-model="seach.outflow" placeholder="请选择">
          <el-option
            v-for="item in seach.outflowList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
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
      <el-form-item label="回访类型">
        <el-select class="w-150" clearable v-model="seach.visitTypeInt" placeholder="请选择">
          <el-option
            v-for="item in seach.visitTypeIntList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接通状态">
        <el-select class="w-150" clearable v-model="seach.phoneStatus" placeholder="请选择">
          <el-option
            v-for="item in seach.phoneStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回访日期">
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
        <el-button type="danger" @click="exportExcels()" size="small">导出excel</el-button>
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
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="vip" label="是否会员"></el-table-column>
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="phoneStatus" label="接通状态"></el-table-column>
      <el-table-column align="center" prop="visitTypeString" label="回访类型"></el-table-column>
      <el-table-column align="center" prop="outflow" label="是否流失"></el-table-column>
      <el-table-column align="center" prop="backVisitUserName" label="回访人员"></el-table-column>
      <el-table-column align="center" prop="visitTime" label="回访时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="details(scope.row)" type="primary" size="small">回访详情</el-button>
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
      title="产品已回访详情"
      :visible.sync="productUsageDetailsDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      width="80%"
    >
      <h3 class="new-title">客户信息</h3>
      <el-table :data="memberDetailDto" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="memberName" label="客户姓名" min-width="100"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"></el-table-column>
        <el-table-column prop="vip" label="是否会员"></el-table-column>
        <el-table-column prop="condition" label="处方病情"></el-table-column>
        <el-table-column prop="illness" label="新增病情"></el-table-column>
      </el-table>
      <h3 class="new-title">产品信息</h3>
      <el-table :data="pickupServiceInformation" border max-height="220" v-show="visitShow===1" :header-row-class-name="'headerClass-two'">
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
      <el-table
        :data="pickupServiceInformation_use"
        border
        max-height="220"
        class="margin-t-20"
        v-show="visitShow===2"
        :header-row-class-name="'headerClass-two'"
      >
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
      <el-table
        :data="pickupServiceInformation_back"
        border
        max-height="220"
        class="margin-t-20"
        v-show="visitShow===3"
        :header-row-class-name="'headerClass-two'"
      >
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
      <h3 class="new-title">流失信息</h3>
      <el-table :data="outflowDTOs" border :header-row-class-name="'headerClass-two'">
        <el-table-column prop="outflowTime" label="流失时间" min-width="100"></el-table-column>
        <el-table-column prop="visitTypeString" label="回访类型"></el-table-column>
        <el-table-column prop="backVisitUserName" label="回访人"></el-table-column>
        <el-table-column prop="phoneStatus" label="接通状态"></el-table-column>
        <el-table-column prop="phone" label="回访电话"></el-table-column>
        <el-table-column prop="outflowReason" label="流失原因"></el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import {
  selectVisitFinishList,
  selectVisitFinishDetail,
  queryExamineDetail,
  selectBackupPhoneByMemberId,
  insertBackVisit,
  insertBackupPhone,
  insertOutflow,
  selectOrderDetailByMemberId,
  selectVisitDetailByVisitIdAndType
} from "../../api/javaApi";
import {
  exportMethod,
  personnel,
  tips,
  arrayDeduplication,
  province,
  city,
  site,
  hospital,
  allSite
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import javaApi from "../../api/javaApi";
import Clipboard from "clipboard";
import return_variable from "./return_variable";
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
        visitUserName: null,
        visitTypeInt: null,
        visitTypeIntList: [
          { name: "产品体验回访", id: 1 },
          { name: "产品使用回访", id: 2 },
          { name: "复查邀约回访", id: 3 }
        ],
        saleProductName: null,
        memberName: null,
        vip: null,
        vipList: [
          { name: "是", id: 1 },
          { name: "否", id: "0" }
        ],
        outflowList: [
          { name: "是", id: 1 },
          { name: "否", id: "0" }
        ],
        outflow: null,
        repairUserName: null,
        delivery: null,
        // scUserNameList: [],
        phoneStatus: null,
        phoneStatusList: [
          { name: "接通" },
          { name: "多次未接通" },
          { name: "接通挂断" },
          { name: "联系方式错误" }
        ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists: [],
        hospitalId: null
      },
      productUsageDetailsDialog: false,
      productDetailsForReturnVisitDialog: false,
      productVisitDialog_2: false,
      productVisitDialog_3: false,
      userMemberId: null,
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
      // evaluates: [],

      causeOfLoss: null,
      nextVisitDate: null,
      onState: null,
      //流失列表
      outflowDTOs: [],
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
      productItem: return_variable.productItem,
      //体验回访详情
      productItemUse: return_variable.productItemUse,
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
      ls_back: {},
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
      ls_fcdfydsj: null,
      zysx_1: ["运动", "皮肤护理", "鞋垫保养"],
      zysx_2: ["运动", "皮肤护理", "按摩"],
      zysx_3: ["运动", "皮肤护理", "生活习惯"],
      visitShow: 1,
      data_box_use: return_variable.data_box_use,
      data_box: return_variable.data_box
    };
  },
  mounted() {
    this.pageList();
    this.userList();
    this.provinceList();
  },
  methods: {
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
    details(obj) {
      this.userMemberId = obj.memberId;
      let data = {
        visitId: obj.visitId,
        visitTypeInt: obj.visitTypeInt
      };
      selectVisitFinishDetail(data)
        .then(res => {
          // console.log(res);
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            let details = res.data.data;
            this.memberDetailDto[0] = details.memberDetailDTO;
            this.outflowDTOs = details.outflowDTOs;
            this.visitShow = obj.visitTypeInt;
            this.pickupServiceInformation = details.useWaitProductDetailDTO;
            this.pickupServiceInformation_use =
              details.backWaitProductDetailDTO;
            this.pickupServiceInformation_back =
              details.visitFinishProductDetailDTO;

            // this.evaluates = details.evaluates;
            this.productUsageDetailsDialog = true;
            // this.handleSelectionChange(details.useWaitProductDetailDTO);
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
        visitTimeBegin:
          this.seach.delivery == null ? null : this.seach.delivery[0],
        visitTimeEnd:
          this.seach.delivery == null ? null : this.seach.delivery[1],
        visitUserName: this.seach.visitUserName,
        phoneStatus: this.seach.phoneStatus,
        visitTypeInt: this.seach.visitTypeInt,
        saleProductName: this.seach.saleProductName,
        memberName: this.seach.memberName,
        outflow: this.seach.outflow == "0" ? 0 : this.seach.outflow,
        vip: this.seach.vip == "0" ? 0 : this.seach.vip,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      this.loading = true;
      selectVisitFinishList(data)
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
        visitTimeBegin:
          this.seach.delivery == null ? null : this.seach.delivery[0],
        visitTimeEnd:
          this.seach.delivery == null ? null : this.seach.delivery[1],
        visitUserName: this.seach.visitUserName,
        phoneStatus: this.seach.phoneStatus,
        visitTypeInt: this.seach.visitTypeInt,
        saleProductName: this.seach.saleProductName,
        memberName: this.seach.memberName,
        outflow: this.seach.outflow == "0" ? 0 : this.seach.outflow,
        vip: this.seach.vip == "0" ? 0 : this.seach.vip,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId
      };
      const lsyObj = {
        method: "post",
        fileName: "已回访信息",
        url: javaApi.exportVisitFinishExcel,
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
      this.seach.siteLists = await allSite(null, id);
    },
    //根据测评中心获取医院列表
    async hospitalList(id) {
      this.seach.hospitalLists = await hospital(id);
    },
    //获取试穿人员列表
    async userList() {
      this.seach.scUserNameList = await personnel(9);
    }
  }
};
</script>

<style scoped lang="scss">
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
