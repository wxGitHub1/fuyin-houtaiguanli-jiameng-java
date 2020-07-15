//产品体验待回访
<template>
  <div>
    <!-- 头部筛选box -->
    <div class="box">
      <div class="item item1" :class="{active:topActive==1}" @click="topItem_func(1)">
        <div>今日待回访</div>
        <div>{{box_top_data.todayNum || 0}}</div>
      </div>
      <div class="item item2" :class="{active:topActive==2}" @click="topItem_func(2)">
        <div>逾期未回访总数</div>
        <div>{{box_top_data.overdueNum|| 0}}</div>
      </div>
      <div class="item item3" :class="{active:topActive==0}" @click="topItem_func(0)">
        <div>全部待回访</div>
        <div>{{box_top_data.allNum|| 0}}</div>
      </div>
    </div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="应回访日期">
        <el-date-picker
          v-model="seach.delivery"
          class="w-250"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="试穿人员">
        <el-select class="w-150" clearable v-model="seach.repairUserId" placeholder="请选择">
          <el-option
            v-for="item in seach.scUserNameList"
            :key="item.id"
            :label="item.username"
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
      <el-form-item>
        <el-button
          @click="topItem_func(topActive)"
          :loading="loading"
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
        <el-button @click="data_assignment_func()" icon="el-icon-thumb" type="warning">数据指派</el-button>
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
      <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
      <el-table-column align="center" prop="vip" label="是否会员"></el-table-column>
      <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
      <el-table-column align="center" prop="reflect" label="取型家长反应"></el-table-column>
      <el-table-column align="center" prop="tryOnBeginTime" label="试穿时间"></el-table-column>
      <el-table-column align="center" prop="tryOnUserName" label="试穿人员"></el-table-column>
      <el-table-column align="center" prop="examinationUserName" label="测评人员"></el-table-column>
      <el-table-column align="center" prop="visitWaitTime" label="应回访时间">
        <template slot-scope="scope">
          <div :class="scope.row.red === 1 ?'color-red':''">{{scope.row.visitWaitTime}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="details(scope.row)" type="primary" size="small" icon="el-icon-help">回访</el-button>
          <!-- <el-button
            @click="new_details(scope.row)"
            type="primary"
            size="small"
            icon="el-icon-help"
          >回访2</el-button>-->
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
      title="产品体验待回访详情"
      :visible.sync="productDetailsForReturnVisitDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      width="90%"
      top="5vh"
    >
      <div class="clearfix">
        <div
          class="left pct-w50 padding-10 box-sizing-box"
          style="max-height: 700px;overflow-x: hidden;"
        >
          <h3 class="new-title">客户信息</h3>
          <el-table :data="memberDetailDto" border :header-row-class-name="'headerClass-two'">
            <el-table-column prop="memberName" label="客户姓名" min-width="100"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="phone" label="联系电话"></el-table-column>
            <el-table-column prop="birthday" label="出生日期"></el-table-column>
            <el-table-column prop="vip" label="是否会员"></el-table-column>
            <el-table-column prop="memberModeCN" label="客户当前类型"></el-table-column>
            <el-table-column prop="cognition" label="客户初始认知"></el-table-column>
          </el-table>
          <h3 class="new-title">病单信息</h3>
          <el-table
            :data="new_details_data.prescriptionDTO"
            border
            :header-row-class-name="'headerClass-two'"
          >
            <el-table-column prop="hospitalName" label="医院" min-width="100"></el-table-column>
            <el-table-column prop="departmentName" label="科室"></el-table-column>
            <el-table-column prop="doctorName" label="医生"></el-table-column>
            <el-table-column prop="prescriptionType" label="病单类型"></el-table-column>
            <el-table-column prop="condition" label="处方病情"></el-table-column>
            <el-table-column prop="illness" label="新增病情"></el-table-column>
            <el-table-column prop="updateTime" label="创建时间"></el-table-column>
          </el-table>
          <h3 class="new-title">产品信息</h3>
          <el-table
            :data="pickupServiceInformation"
            border
            @selection-change="handleSelectionChange"
            max-height="220"
            :header-row-class-name="'headerClass-two'"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="saleProductNickname" label="产品昵称"></el-table-column>
            <el-table-column prop="reflect" label="取型家长反应"></el-table-column>
            <el-table-column prop="tryOnUserName" label="试穿人员"></el-table-column>
            <el-table-column prop="tryOnBeginTime" label="试穿时间"></el-table-column>
            <el-table-column prop="tryOnRemark" label="试穿备注"></el-table-column>
            <el-table-column prop="visitWaitTime" label="应回访时间"></el-table-column>
          </el-table>
          <h3 class="new-title">测评记录</h3>
          <!-- <el-table
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
          </el-table>-->
          <el-table
            :border="true"
            :data="new_details_data.examinationInfo"
            :header-row-class-name="'headerClass-two'"
          >
            <el-table-column align="center" prop="remark" label="结果备注"></el-table-column>
            <el-table-column align="center" prop="repeatTime" label="复查日期"></el-table-column>
            <el-table-column align="center" prop="cycle" label="治疗周期"></el-table-column>
            <el-table-column align="center" prop="createTime" label="测评日期"></el-table-column>
            <el-table-column align="center" prop="evaluateUserName" label="测评人员"></el-table-column>
            <el-table-column align="center" prop="memberAnalysisCN" label="客户分析"></el-table-column>
            <el-table-column align="center" prop="recoveryCN" label="恢复情况"></el-table-column>
          </el-table>
          <div v-for="(item,index) in new_details_data.detailList" :key="index" class="margin-t-10">
            <div class="clearfix" style="border:1px solid #E6E6E6">
              <div
                class="left"
                style="width:15%;height:81px;line-height:81px;background:#E6E6E6;text-align:center;"
              >
                <div>{{item.examinationName}}</div>
              </div>
              <div class="left" style="width:85%">
                <div class="margin-l-5" style="height:40px;border-bottom:1px solid #E6E6E6">
                  <span>测评数据:</span>
                  <span
                    class="margin-r-20"
                    v-for="(element,index) in item.detail"
                    :key="index"
                  >{{element.name}}:{{element.value}}</span>
                  <!-- <el-button
                    class="right"
                    style="margin-left:10px"
                    v-if="item.examinationName == '足部3D扫描测评' || item.examinationName == '3D全身扫描' || item.examinationName == '足底压力分析'"
                    type="warning"
                    icon="el-icon-download"
                    @click="baogao_func(item.examinationName)"
                    size="mini"
                  >下载报告文件</el-button> -->
                  <el-button
                    class="right"
                    v-if="item.examinationName=='足部3D扫描测评'"
                    type="primary"
                    icon="el-icon-edit"
                    @click="threeD_show(item.detail)"
                    size="mini"
                  >修改</el-button>
                </div>
                <div class="margin-l-5" style="height:40px;line-height:30px;">
                  <span>测评结果:</span>
                  <span class="margin-r-20">{{item.result}}</span>
                </div>
              </div>
            </div>
            <div class="clearfix">
              <div class="left" v-for="(imgUrlList,index) in item.url" :key="index">
                <el-image :src="imgUrlList" style="height:400px" fit="contain">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
          </div>
        </div>
        <div class="left pct-w50 padding-10 box-sizing-box">
          <h3 class="new-title">填写产品体验回访信息</h3>
          <el-form :inline="true" size="small" id="search">
            <el-form-item label="回访电话：">
              <el-select style="width:100%" clearable v-model="experiencePhone" placeholder="请选择">
                <el-option v-for="item in phoneList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下次回访时间：">
              <el-date-picker
                style="width:100%"
                v-model="useWaitTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <el-form :inline="true" size="small" id="search">
            <el-form-item label="接通状态：">
              <el-radio-group v-model="experiencePhoneStatus">
                <el-radio label="接通">接通</el-radio>
                <el-radio label="接通挂断">接通挂断</el-radio>
                <el-radio label="多次未接通">多次未接通</el-radio>
                <el-radio label="联系方式错误">联系方式错误</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <!-- <el-row :gutter="20" class="margin-t-20">
            <el-col :span="4">
              <div class="line-h-30 text-r">流失原因：</div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="causeOfLoss"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="line-h-30 text-r">
                <el-button @click="userChurn" size="mini" type="danger">确认流失</el-button>
              </div>
            </el-col>
          </el-row>-->

          <div
            class="product_box"
            v-show="productItem_box"
            style="max-height: 475px;overflow-x: hidden;"
          >
            <!-- <div
              class="my_box clearfix"
              ref="my_box"
              :style="'width:' + 1002 * productVisitType.length + 'px'"
            >-->
            <div v-show="productItem.item_1" class="item">
              <div v-for="(item,index) in data_box[0].list" :key="index" class="margin-b-10">
                <h4 class="center border-b-1 product_title">足弓垫——{{item.title}}</h4>
                <el-row>
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">使用调查</h5>
                    <el-row class="padding-tb-30">
                      <el-col :span="8">
                        <div class="text-r">每天使用时间：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceUseTime">
                            <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row class="padding-tb-30">
                      <el-col :span="8">
                        <div class="text-r">产品满意度：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceSatisfaction">
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
                          <el-radio-group v-model="item.experienceUseEffect">
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
                          <el-checkbox-group v-model="item.experienceNotice">
                            <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                          </el-checkbox-group>
                          <!-- <el-radio-group v-model="item.experienceNotice">
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
                              <el-radio-group v-model="item.experienceCTaxian">
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
                              <el-radio-group v-model="item.experienceCKaijiao">
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
                              <el-radio-group v-model="item.experienceZKaijiao">
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
                              <el-radio-group v-model="item.experienceZDuanceng">
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
                          <el-radio-group v-model="item.experienceProblemHave">
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
                            v-model="item.experienceProblemDo"
                          ></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-show="productItem.item_2" class="item">
              <div v-for="(item,index) in data_box[1].list" :key="index" class="margin-b-10">
                <h4 class="center border-b-1 product_title">长腿类——{{item.title}}</h4>
                <el-row class="margin-t-20 margin-b-20">
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">使用调查</h5>
                    <el-row class="padding-special">
                      <el-col :span="8">
                        <div class="text-r">每天使用时间：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceUseTime">
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
                        <div class="text-r">产品满意度：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceSatisfaction">
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
                          <el-radio-group v-model="item.experienceUseEffect">
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
                          <el-checkbox-group v-model="item.experienceNotice">
                            <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                          </el-checkbox-group>
                          <!-- <el-radio-group v-model="item.experienceNotice">
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
                          <el-radio-group v-model="item.experienceMopifu">
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
                          <el-radio-group v-model="item.experienceZimukouqiaoqi">
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
                          <el-radio-group v-model="item.experienceGuanjielinghuodu">
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
                          <el-radio-group v-model="item.experienceProblemHave">
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
                            v-model="item.experienceProblemDo"
                          ></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-show="productItem.item_3" class="item">
              <div v-for="(item,index) in data_box[2].list" :key="index" class="margin-b-10">
                <h4 class="center border-b-1 product_title">膝外翻——{{item.title}}</h4>
                <el-row class="margin-t-20 margin-b-20">
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">使用调查</h5>
                    <el-row class="padding-special">
                      <el-col :span="8">
                        <div class="text-r">每天使用时间：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceUseTime">
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
                        <div class="text-r">产品满意度：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceSatisfaction">
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
                          <el-radio-group v-model="item.experienceUseEffect">
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
                          <el-checkbox-group v-model="item.experienceNotice">
                            <el-checkbox v-for="item in zysx_3" :label="item" :key="item">{{item}}</el-checkbox>
                          </el-checkbox-group>
                          <!-- <el-radio-group v-model="item.experienceNotice">
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
                          <el-radio-group v-model="item.experienceZhijuxiahua">
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
                          <el-radio-group v-model="item.experienceZimukouqiaoqi">
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
                          <el-radio-group v-model="item.experienceMopifu">
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
                          <el-radio-group v-model="item.experienceProblemHave">
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
                            v-model="item.experienceProblemDo"
                          ></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-show="productItem.item_4" class="item">
              <div v-for="(item,index) in data_box[3].list" :key="index" class="margin-b-10">
                <h4 class="center border-b-1 product_title">踝足类——{{item.title}}</h4>
                <el-row class="margin-t-20 margin-b-20">
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">使用调查</h5>
                    <el-row class="padding-special">
                      <el-col :span="8">
                        <div class="text-r">每天使用时间：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceUseTime">
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
                        <div class="text-r">产品满意度：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceSatisfaction">
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
                          <el-radio-group v-model="item.experienceUseEffect">
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
                          <el-checkbox-group v-model="item.experienceNotice">
                            <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                          </el-checkbox-group>
                          <!-- <el-radio-group v-model="item.experienceNotice">
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
                          <el-radio-group v-model="item.experienceLuosisongdong">
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
                          <el-radio-group v-model="item.experienceZimukouqiaoqi">
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
                          <el-radio-group v-model="item.experienceMopifu">
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
                          <el-radio-group v-model="item.experienceProblemHave">
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
                            v-model="item.experienceProblemDo"
                          ></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-show="productItem.item_5" class="item">
              <div v-for="(item,index) in data_box[4].list" :key="index" class="margin-b-10">
                <h4 class="center border-b-1 product_title">脊柱类——{{item.title}}</h4>
                <el-row class="margin-t-20 margin-b-20">
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">使用调查</h5>
                    <el-row class="padding-special">
                      <el-col :span="8">
                        <div class="text-r">每天使用时间：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceUseTime">
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
                        <div class="text-r">产品满意度：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceSatisfaction">
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
                          <el-radio-group v-model="item.experienceUseEffect">
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
                          <el-checkbox-group v-model="item.experienceNotice">
                            <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                          </el-checkbox-group>
                          <!-- <el-radio-group v-model="item.experienceNotice">
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
                          <el-radio-group v-model="item.experienceMopifu">
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
                          <el-radio-group v-model="item.experienceZhijuxiahua">
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
                          <el-radio-group v-model="item.experienceZimukouqiaoqi">
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
                          <el-radio-group v-model="item.experienceProblemHave">
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
                            v-model="item.experienceProblemDo"
                          ></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-show="productItem.item_6" class="item">
              <div v-for="(item,index) in data_box[5].list" :key="index" class="margin-b-10">
                <h4 class="center border-b-1 product_title">丹尼类——{{item.title}}</h4>
                <el-row class="margin-t-20 margin-b-20">
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">使用调查</h5>
                    <el-row class="padding-tb-30">
                      <el-col :span="8">
                        <div class="text-r">每天使用时间：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceUseTime">
                            <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row class="padding-tb-30">
                      <el-col :span="8">
                        <div class="text-r">产品满意度：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceSatisfaction">
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
                          <el-radio-group v-model="item.experienceUseEffect">
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
                          <el-checkbox-group v-model="item.experienceNotice">
                            <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                          </el-checkbox-group>
                          <!-- <el-radio-group v-model="item.experienceNotice">
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
                          <el-radio-group v-model="item.experienceJiaodusongdong">
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
                          <el-radio-group v-model="item.experienceMopifu">
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
                          <el-radio-group v-model="item.experienceProblemHave">
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
                            v-model="item.experienceProblemDo"
                          ></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-show="productItem.item_7" class="item">
              <div v-for="(item,index) in data_box[6].list" :key="index" class="margin-b-10">
                <h4 class="center border-b-1 product_title">扭转类——{{item.title}}</h4>
                <el-row class="margin-t-20 margin-b-20">
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">使用调查</h5>
                    <el-row class="padding-tb-30">
                      <el-col :span="8">
                        <div class="text-r">每天使用时间：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceUseTime">
                            <el-radio v-for="(item,index) in isSYSJ" :key="index" :label="item"></el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row class="padding-tb-30">
                      <el-col :span="8">
                        <div class="text-r">产品满意度：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceSatisfaction">
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
                          <el-radio-group v-model="item.experienceUseEffect">
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
                          <el-checkbox-group v-model="item.experienceNotice">
                            <el-checkbox v-for="item in zysx_1" :label="item" :key="item">{{item}}</el-checkbox>
                          </el-checkbox-group>
                          <!-- <el-radio-group v-model="item.experienceNotice">
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
                          <el-radio-group v-model="item.experienceMopifu">
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
                          <el-radio-group v-model="item.experienceJiaodubianhua">
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
                          <el-radio-group v-model="item.experienceButai">
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
                          <el-radio-group v-model="item.experienceProblemHave">
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
                            v-model="item.experienceProblemDo"
                          ></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-show="productItem.item_8" class="item">
              <div v-for="(item,index) in data_box[7].list" :key="index" class="margin-b-10">
                <h4 class="center border-b-1 product_title">其他产品——{{item.title}}</h4>
                <el-row class="margin-t-20 margin-b-20">
                  <el-col :span="12" class="border-r-1">
                    <h5 class="center border-b-1">使用调查</h5>
                    <el-row class="padding-special">
                      <el-col :span="8">
                        <div class="text-r">每天使用时间：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceUseTime">
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
                        <div class="text-r">产品满意度：</div>
                      </el-col>
                      <el-col :span="16">
                        <div>
                          <el-radio-group v-model="item.experienceSatisfaction">
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
                          <el-radio-group v-model="item.experienceUseEffect">
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
                          <el-checkbox-group v-model="item.experienceNotice">
                            <el-checkbox v-for="item in zysx_2" :label="item" :key="item">{{item}}</el-checkbox>
                          </el-checkbox-group>
                          <!-- <el-radio-group v-model="item.experienceNotice">
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
                          <el-radio-group v-model="item.experienceZimukouqiaoqi">
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
                          <el-radio-group v-model="item.experienceMopifu">
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
                            v-model="item.experienceQita"
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
                          <el-radio-group v-model="item.experienceProblemHave">
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
                            v-model="item.experienceProblemDo"
                          ></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>

            <!-- </div> -->
          </div>
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入回访备注内容，必填"
              v-model="causeOfLoss"
            ></el-input>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="td_addVisit()" type="success" icon="el-icon-circle-check">确认提交</el-button>
        <el-button @click="addPhone()" type="success" icon="el-icon-circle-plus-outline">添加联系电话</el-button>
        <el-button @click="morePrduct_function()" type="success" icon="el-icon-tickets">更多产品信息</el-button>
        <el-button @click="ls_save()" type="danger">确认流失</el-button>
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
      <h3 class="new-title">客户信息</h3>
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
      </el-row>-->
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
        <el-col :span="6">
          <!-- <div class="line-h-30 text-r">电话号码：</div> -->
          <el-input
            type="text"
            size="mini"
            placeholder="请输入关系"
            v-model="new_details_data.relationship"
          ></el-input>
        </el-col>
        <el-col :span="18">
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
    <!-- dialog 数据指派-->
    <el-dialog
      title="数据指派"
      :visible.sync="data_assignment.data_assignment_Dialg"
      :close-on-click-modal="false"
      width="90%"
      :before-close="data_assignment_close"
    >
      <!-- seach -->
      <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
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
        <el-form-item label="应回访日期">
          <el-date-picker
            v-model="data_assignment.search.time"
            class="w-250"
            type="daterange"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="试穿人员">
          <el-select
            class="w-150"
            clearable
            v-model="data_assignment.search.user"
            placeholder="请选择"
          >
            <el-option
              v-for="item in data_assignment.userList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input
            v-model="data_assignment.search.productName"
            class="w-150"
            placeholder="请输入产品名称或昵称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="data_assignment_pageList()"
            icon="el-icon-search"
            type="primary"
            :loading="data_assignment.loading"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <!-- table -->
      <el-table
        :data="data_assignment.clientData"
        border
        @selection-change="data_assignment_handleSelectionChange"
        v-loading="data_assignment.loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="saleProductNickname" label="产品昵称"></el-table-column>
        <el-table-column align="center" prop="reflect" label="取型家长反应"></el-table-column>
        <el-table-column align="center" prop="tryOnBeginTime" label="试穿时间"></el-table-column>
        <el-table-column align="center" prop="tryOnUserName" label="试穿人员"></el-table-column>
        <el-table-column align="center" prop="visitWaitTime" label="应回访时间"></el-table-column>
        <el-table-column type="selection" label="操作"></el-table-column>
      </el-table>
      <!-- Pagination 分页 -->
      <el-pagination
        @size-change="data_assignment_handleSizeChange"
        @current-change="data_assignment_handleCurrentChange"
        :current-page="data_assignment.pages.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="data_assignment.pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data_assignment.pages.total"
        class="pagination"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="data_assignment_close()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="data_assignment_save()" type="success" icon="el-icon-thumb">数据指派</el-button>
      </div>
    </el-dialog>
    <!--选择指派人-->
    <el-dialog
      title="产品体验回访数据指派"
      :visible.sync="data_assignment.experience_details_dialog_two"
      :close-on-click-modal="false"
      width="30%"
       :before-close="data_assignment_close_two"
    >
      <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
        <el-form-item label="选择被指派人">
          <el-select class="w-150" clearable v-model="data_assignment.zpUser" placeholder="请选择">
            <el-option
              v-for="item in data_assignment.userList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>已选中{{data_assignment.multipleSelection.length}}条数据</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="data_assignment_close_two()"
          type="primary"
          icon="el-icon-circle-close"
        >取消</el-button>
        <el-button
          @click="data_assignment_save_two(0)"
          type="success"
          icon="el-icon-circle-check"
        >确认指派</el-button>
      </div>
    </el-dialog>
    <!-- new_datails-->
    <el-dialog
      title="客户态度分析"
      :visible.sync="new_details_data.td_dialog"
      :close-on-click-modal="false"
      width="30%"
      :before-close="td_cancel"
    >
      <div class="clearfix">
        <div class="left" style="height:20px;line-height:20px">客户态度评分：</div>
        <div class="left">
          <el-rate
            v-model="new_details_data.value"
            show-score
            text-color="#ff9900"
            show-text
            allow-half
            score-template="{value}分"
          ></el-rate>
        </div>
      </div>
      <div class="margin-t-20">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入详情'非必填'"
          v-model="new_details_data.causeOfLoss"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="td_cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="addVisit()" type="success" icon="el-icon-circle-check">提交</el-button>
      </div>
    </el-dialog>
    <!-- 流失登记-->
    <el-dialog
      title="客户流失登记"
      :visible.sync="new_details_data.ls_dialog"
      :close-on-click-modal="false"
      width="30%"
      :before-close="ls_cancel"
    >
      <div class="margin-t-20">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入流失原因"
          v-model="new_details_data.churnRegistration"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ls_cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="userChurn()" type="success" icon="el-icon-circle-check">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectExperienceWaitVisitList,
  selectExperienceWaitVisitDetail,
  queryExamineDetail,
  selectBackupPhoneByMemberId,
  insertExperienceVisit,
  insertBackupPhone,
  insertOutflow,
  selectOrderDetailByMemberId,
  printMakeParam,
  examinePadZb3d,
  selectPrincipalVisitListWhenExperience,
  updatePrincipalUser
} from "../../api/javaApi";
import {
  exportMethod,
  personnel,
  tips,
  arrayDeduplication,
  province,
  city,
  allSite,
  site,
  hospital,
  getBase64Image,
  img_base64
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import Clipboard from "clipboard";
import Print from "../commonComponent/PrintTemplate";
import return_variable from "./return_variable";
export default {
  name: "App",
  data() {
    return {
      /****数据指派数据 */
      data_assignment: return_variable.data_assignment,
      /**新的回访弹框数据 */
      new_details_data: return_variable.new_details_data,
      /****top box */
      topActive: 1,
      box_top_data: {},
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
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: [],
        hospitalLists: [],
        hospitalId: null
      },
      productDetailsForReturnVisitDialog: false,
      userMemberId: null,
      //回访id数组
      multipleSelection: [],
      memberDetailDto: [{}],
      pickupServiceInformation: [],
      //测评信息
      dialogEvaluationDetails: false, //测评信息详情弹框
      examinationInfo: [{}], //测评详情
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
      productItem: return_variable.productItem,
      // {
      //   item_1: false,
      //   item_2: false,
      //   item_3: false,
      //   item_4: false,
      //   item_5: false,
      //   item_6: false,
      //   item_7: false,
      //   item_8: false
      // },
      experiencePhoneStatus: null,
      experiencePhone: null,
      useWaitTime: null,
      productVisitType: [],
      visitForms: [],
      backupPhone: null,
      //模板数据
      isYW: ["有", "无"],
      isSYSJ: ["未使用", "5小时以下", "5-12小时"],
      isSYSJ_L: ["未使用", "5小时以下", "5-12小时", "5-18小时", "18小时以上"],
      isMY: ["满意", "一般", "不满意"],
      isXG: ["没注意", "没变化", "有点变化"],
      zysx_1: ["运动", "皮肤护理", "鞋垫保养"],
      zysx_2: ["运动", "皮肤护理", "按摩"],
      zysx_3: ["运动", "皮肤护理", "生活习惯"],
      data_box: [
        {
          productType: 1,
          list: []
        },
        {
          productType: 2,
          list: []
        },
        {
          productType: 3,
          list: []
        },
        {
          productType: 4,
          list: []
        },
        {
          productType: 5,
          list: []
        },
        {
          productType: 6,
          list: []
        },
        {
          productType: 7,
          list: []
        },
        {
          productType: 8,
          list: []
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
    // this.pageList();
    this.userList();
    this.provinceList();
    this.topItem_func(1);
  },
  methods: {
    ls_cancel(){
      this.new_details_data.ls_dialog=false
      this.new_details_data.churnRegistration=null
    },
    ls_save(){
      this.new_details_data.ls_dialog=true
    },
    td_cancel() {
      this.new_details_data.td_dialog = false;
      this.new_details_data.value = 0;
      this.new_details_data.causeOfLoss = null;
    },
    td_addVisit() {
      this.new_details_data.td_dialog = true;
    },
    new_details(obj) {
      this.new_details_data.obj = obj;
      this.new_details_data.experience_details_dialog = true;
    },
    data_assignment_handleSelectionChange(val) {
      this.data_assignment.multipleSelection = val;
    },
    data_assignment_close() {
      this.data_assignment.data_assignment_Dialg = false;
      this.data_assignment.multipleSelection = [];
    },
    data_assignment_close_two() {
      this.data_assignment.experience_details_dialog_two = false;
      this.data_assignment.zpUser = null;
    },
    data_assignment_save() {
      this.data_assignment.experience_details_dialog_two = true;
    },
    data_assignment_save_two(status) {
      let visitIds = [];
      this.data_assignment.multipleSelection.forEach(obj => {
        visitIds.push(obj.visitId);
      });
      let data = {
        visitIds: visitIds,
        principalUserId: this.data_assignment.zpUser,
        backVisitStatus: status
      };
      updatePrincipalUser(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            tips(this, "指派成功!", "success");
            this.data_assignment.multipleSelection = [];
            this.data_assignment_close_two();
            this.data_assignment_pageList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    data_assignment_func() {
      this.data_assignment_pageList();
      this.data_assignment.data_assignment_Dialg = true;
    },
    topItem_func(index) {
      this.topActive = index;
      this.pageList(index);
    },
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
    userChurn() {
      let data = {
        outflowPhoneStatus: this.experiencePhoneStatus,
        outflowPhone: this.experiencePhone,
        outflowReason: this.new_details_data.churnRegistration,
        visitIds: this.multipleSelection
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
            this.ls_cancel()
            this.cancel();
            this.pageList();
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
    addVisit() {
      // this.productVisitType.forEach((item, index) => {
      //   let element = this.data_box[Number(item) - 1];
      //   this.visitForms.push(element);
      // });
      let visitFormsList = [];
      this.data_box.forEach(obj => {
        if (obj.list.length != 0) {
          obj.list.forEach(item => {
            visitFormsList.push(item);
          });
        }
      });
      console.log(this.visitForms);
      console.log(this.data_box);
      let data = {
        visitIds: this.multipleSelection,
        experiencePhoneStatus: this.experiencePhoneStatus,
        experiencePhone: this.experiencePhone,
        useWaitTime: this.useWaitTime,
        remark: this.causeOfLoss,
        memberAttitude: this.new_details_data.value,
        memberAttitudeRemark: this.new_details_data.causeOfLoss,
        visitForms: visitFormsList //this.visitForms
      };
      console.log(data)
      insertExperienceVisit(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
            this.visitForms = [];
          } else {
            this.td_cancel()
           this.cancel();
            this.topItem_func(this.topActive)
            // this.pageList();
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
        parent:this.new_details_data.relationship,
        backupPhone: this.backupPhone,
      };
      debugger;
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
      this.new_details_data.relationship = null;
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
      this.productDetailsForReturnVisitDialog = false;
      this.multipleSelection = [];
      for (let key in this.productItem) {
        this.productItem[key] = false;
      }
      this.experiencePhoneStatus = null;
      this.useWaitTime = null;
      this.visitForms = [];
      this.experiencePhone = null;
      this.causeOfLoss = null;
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      console.log(val);
      let myType = [];
      if (val.length > 0) {
        for (let key in this.productItem) {
          this.productItem[key] = false;
        }
        this.data_box.forEach(obj => {
          obj.list = [];
        });
        val.forEach(element => {
          this.productItem["item_" + element.saleProductType] = true;
          myType.push(element.saleProductType);
          // debugger;
          let productTitle = element.saleProductNickname;
          let obj = {
            experienceUseTime: null,
            experienceSatisfaction: null,
            experienceUseEffect: null,
            experienceNotice: [],
            experienceCTaxian: null,
            experienceCKaijiao: null,
            experienceZKaijiao: null,
            experienceZDuanceng: null,
            experienceMopifu: null,
            experienceZimukouqiaoqi: null,
            experienceGuanjielinghuodu: null,
            experienceZhijuxiahua: null,
            experienceJiaodubianhua: null,
            experienceButai: null,
            experienceLuosisongdong: null,
            experienceJiaodusongdong: null,
            experienceQita: null,
            experienceProblemHave: null,
            experienceProblemDo: null,
            title: productTitle,
            productType: element.saleProductType,
            visitId:element.visitId,
            visitTypeInt:element.visitTypeInt,
          };
          // obj=this.new_details_data.templateData[element.saleProductType - 1];
          // obj.title = productTitle;
          console.log(obj);
          this.data_box[element.saleProductType - 1].list.push(obj);

          this.multipleSelection.push(element.visitId);
        });
        // console.log(myType);
        // console.log(this.data_box);

        let myArry = arrayDeduplication(myType);
        this.productItem_box = true;
        // this.$refs.my_box.style.width = 1002 * myArry.length + "px";
        this.productVisitType = myArry;
        // console.log(this.productVisitType);
      } else {
        this.productItem_box = false;
      }
    },
    details(obj) {
      this.userMemberId = obj.memberId;
      this.userPhoneList(obj.memberId);
      let data = { visitId: obj.visitId };
      selectExperienceWaitVisitDetail(data)
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
            this.memberDetailDto[0] = details.memberDetailDTO;
            this.new_details_data.prescriptionDTO = details.prescriptionDTO;
            this.pickupServiceInformation =
              details.experienceWaitProductDetailDTO;
            this.new_details_data.examinationInfo[0] =
              details.examineDetail.examinationInfo;
            this.new_details_data.detailList = details.examineDetail.detailList;
            // this.evaluates = details.evaluates;

            this.productDetailsForReturnVisitDialog = true;
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
            this.examinationInfo[0] = res.data.data.examinationInfo;
            this.detailList = res.data.data.detailList;
            this.dialogEvaluationDetails = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //统计列表 //查询
    async pageList() {
      // this.pages.currentPage, this.pages.pageSize
      let data = {
        pageNum: this.pages.currentPage,
        pageSize: this.pages.pageSize,
        waitTimeBegin:
          this.seach.delivery == null ? null : this.seach.delivery[0],
        waitTimeEnd:
          this.seach.delivery == null ? null : this.seach.delivery[1],
        tryOnUserId: this.seach.repairUserId,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        hospitalId: this.seach.hospitalId,
        timeType: this.topActive
      };
      this.loading = true;
      selectExperienceWaitVisitList(data)
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
            this.clientData = dataList.data.visitDTOS;
            this.pages.total = dataList.total;
            this.box_top_data = dataList.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //数据指派统计列表 //查询
    async data_assignment_pageList() {
      let data = {
        pageNum: this.data_assignment.pages.currentPage,
        pageSize: this.data_assignment.pages.pageSize,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue,
        principalUserId: this.data_assignment.search.user,
        waitTimeBegin:
          this.data_assignment.search.time == null
            ? null
            : data_assignment.search.time[0],
        waitTimeEnd:
          this.data_assignment.search.time == null
            ? null
            : data_assignment.search.time[1],
        productName: this.data_assignment.search.productName
      };
      this.data_assignment.loading = true;
      selectPrincipalVisitListWhenExperience(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(res);
            this.data_assignment.loading = false;
            let dataList = res.data.data;
            this.data_assignment.clientData = dataList.data;
            this.data_assignment.pages.total = dataList.total;
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
    // data_assignment_handleSizeChange
    // data_assignment_handleCurrentChange
    //指派数据当前页面变化时
    data_assignment_handleCurrentChange(num) {
      this.data_assignment.pages.currentPage = num;
      this.data_assignment_pageList();
    },
    //指派数据页面条数发生变化时
    data_assignment_handleSizeChange(val) {
      this.data_assignment.pages.pageSize = val;
      this.data_assignment_pageList();
    },
    //获取试穿人员列表
    async userList() {
      let data = await personnel(6);
      this.seach.scUserNameList = data;
      this.data_assignment.userList = data;
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
/***top box*/
.box {
  display: flex;
  justify-content: center;
  .item {
    width: 40%;
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
  // .item1 {
  //   div {
  //     line-height: 60px;
  //   }
  // }
}
/*****/
.color-red {
  color: #fb5b3c;
}
.product_box {
  width: 100%;
  // overflow-y: hidden;
  // margin-top: 20px;
  // background: #ecf5ff;
  // border: 1px solid #CDCDCD;
  // .my_box {
  // height: 413px;
  // width: 0px;
  // display: -webkit-flex; /* Safari */
  // display: flex;
  // justify-content:center;
  margin-bottom: 20px;
  .item {
    margin-top: 10px;
    border: 1px solid #cdcdcd;
    // width: 1000px;
    // height: auto;
    // float: left;
  }
  // }
}
.product_title {
  background: #3a8ee6;
  color: #ecf5ff;
}
.padding-special {
  padding: 17.5px 0px;
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
