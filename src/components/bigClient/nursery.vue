<template>
  <!-- 入托体检 -->
  <div class="container" style="height: 800px;overflow-y: scroll">
    <el-row class="search">
      <el-col :span="2" style="width: 5.5%;line-height: 30px">
        <!-- 新增社区 -->
        <el-button
          type="primary"
          size="small"
          @click="DatadialogVisible = true"
          :disabled="limit.add"
        >新增</el-button>
      </el-col>
      <!-- 查询数据 -->
      <el-col :span="2" style="width: 6%;line-height: 30px;">
        <span>省份:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          :clearable="true"
          size="small"
          v-model="search.province"
          value-key="proviceId"
          @change="getCities(search.province, type=2)"
        >
          <el-option
            v-for="item in provinces"
            :key="item.proviceId"
            :value="item"
            :label="item.proviceName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 7%;line-height: 30px;">
        <span>城市:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
          value-key="cityId"
          v-model="search.city"
          @change="getCounty(search.city, type=2)"
        >
          <el-option v-for="item in cities" :key="item.cityId" :value="item" :label="item.cityName"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 6.9%;line-height: 30px;">
        <span>区县:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
          value-key="countyId"
          v-model="search.county"
          @change="getCountyId(search.county, type=2)"
        >
          <el-option
            v-for="item in counties"
            :key="item.countyId"
            :value="item"
            :label="item.countyName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 4.5%;line-height: 30px">
        <span>社区</span>
      </el-col>
      <el-col :span="3">
        <el-select
          :clearable="true"
          size="small"
          value-key="communityId"
          v-model="search.community"
        >
          <el-option
            v-for="item in communityList"
            :key="item.communityId"
            :value="item"
            :label="item.communityName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px">
        <span>开拓人</span>
      </el-col>
      <el-col :span="2" style="text-align: left">
        <el-input v-model="search.openPeople" placeholder="请输入姓名" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:5.5%;text-align:center">
        <span>季度:</span>
      </el-col>
      <el-col :span="3">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.quarter">
          <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 5.5%;line-height: 30px;margin-left: 1.4%">
        <span>反馈方式:</span>
      </el-col>
      <el-col :span="3">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.feedbackType">
          <el-option v-for="item in feedbackType" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 5.5%;line-height: 30px;margin-left: 1.4%">
        <span>反馈内容:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
          value-key="zoom"
          v-model="search.feedbackContainer"
        >
          <el-option
            v-for="item in feedbackContainer"
            :key="item.zoom"
            :value="item"
            :label="item.type"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 7%;line-height: 30px;margin-left: 1.4%">
        <span>是否需要车辆:</span>
      </el-col>
      <el-col :span="2" style="width: 8.6%">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.isNeedCar">
          <el-option v-for="item in searchCar" :key="item.zoom" :value="item" :label="item.type"></el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="2" style="width: 5.6%;line-height: 30px;margin-left:1%;text-align:center">
        <span>是否开通:</span>
      </el-col>-->
      <!-- <el-col :span="3">
        <el-select size="small" :clearable="true" value-key="zoom" v-model="search.isOpen">
          <el-option v-for="item in openState" :key="item.zoom" :value="item" :label="item.type">

          </el-option>
        </el-select>
      </el-col>-->
    </el-row>
    <el-row style="margin-top: 20px;text-align: center">
      <el-col :span="2" style="width: 5.5%;line-height: 30px;margin-left: 6.1%;">
        <span>录入时间：</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="search.inputTime"
          type="daterange"
          range-separator="至"
          format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" style="line-height: 30px;margin-left: 1%;">
        <span>查体开始时间范围：</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="search.examTime"
          type="daterange"
          range-separator="至"
          format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" style="width: 7%;margin-left: 2%;">
        <el-button
          style="width: 100%"
          size="small"
          type="primary"
          class="btns"
          @click="searchData()"
        >查询</el-button>
      </el-col>
    </el-row>
    <!-- 修改数据弹框-->
    <el-dialog
      :close-on-click-modal="false"
      top="1vh"
      width="45%"
      title="修改数据"
      :visible.sync="ModifydialogVisible"
      center
    >
      <el-row>
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            size="small"
            v-model="modifySelection.provice"
            :clearable="true"
            value-key="proviceId"
            @change="getCities(modifySelection.provice, type=3)"
          >
            <el-option
              v-for="item in provinces"
              :key="item.proviceId"
              :value="item"
              :label="item.proviceName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>城&nbsp;&nbsp;&nbsp;&nbsp;市:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            size="small"
            :clearable="true"
            value-key="cityId"
            v-model="modifySelection.city"
            @change="getCounty(modifySelection.city, type=3)"
          >
            <el-option
              v-for="item in cities"
              :key="item.cityId"
              :value="item"
              :label="item.cityName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>区&nbsp;&nbsp;&nbsp;&nbsp;县:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            :clearable="true"
            size="small"
            value-key="countyId"
            v-model="modifySelection.county"
            @change="getCountyId(modifySelection.county, type=3)"
          >
            <el-option
              v-for="item in counties"
              :key="item.countyId"
              :value="item"
              :label="item.countyName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>社&nbsp;&nbsp;&nbsp;&nbsp;区:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            :clearable="true"
            size="small"
            value-key="communityId"
            v-model="modifySelection.community"
            @change="getCommunityInfo(modifySelection.community,type=2)"
          >
            <el-option
              v-for="item in communityList"
              :key="item.communityId"
              :value="item"
              :label="item.communityName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>对接人姓名:</span>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <el-input v-model="modifySelection.linkPeople" disabled placeholder="请输入姓名" size="small"></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left: 0.9%">
          <span>对接人电话:</span>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <el-input v-model="modifySelection.linkPhone" disabled placeholder="请输入联系电话" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>负责部门:</span>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <el-input v-model="modifySelection.chargeDepart" placeholder="请输入部门" size="small"></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left: 0.9%">
          <span>查体周期:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            :clearable="true"
            size="small"
            value-key="zoom"
            v-model="modifySelection.physicalPeriod"
          >
            <el-option v-for="item in examBody" :key="item.zoom" :value="item" :label="item.time"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>查体设备:</span>
        </el-col>
        <el-col :span="6">
          <el-select size="small" value-key="zoom" v-model="modifySelection.physicalDevice">
            <el-option v-for="item in examDevice" :key="item.zoom" :value="item" :label="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>季&nbsp;&nbsp;&nbsp;&nbsp;度:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            size="small"
            :clearable="true"
            value-key="zoom"
            v-model="modifySelection.quarter"
          >
            <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>衣服颜色:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            :clearable="true"
            size="small"
            value-key="zoom"
            v-model="modifySelection.dressColor"
          >
            <el-option v-for="item in dress" :key="item.zoom" :value="item" :label="item.color"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left: 0.9%">
          <span>设备存放:</span>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="radio" label="1">可以</el-radio>
          <el-radio v-model="radio" label="2">不可以</el-radio>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>开拓人:</span>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="modifySelection.linkPeopleName"
            disabled
            placeholder="请输入人数"
            size="small"
          ></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>打卡时间:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            size="small"
            :clearable="true"
            value-key="zoom"
            v-model="modifySelection.pushCardTime"
          >
            <el-option v-for="item in cardTime" :key="item.zoom" :value="item" :label="item.time"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>工作人员数:</span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="modifySelection.needPhysicalCount" placeholder="请输入人数" size="small"></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>查体开始时间</span>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="modifySelection.physicalStartTime"
            style="width: 100%;"
            type="date"
            size="small"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>预估查体人数:</span>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="modifySelection.physicalEstimateCount"
            placeholder="请输入人数"
            size="small"
          ></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>查体结束时间</span>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="modifySelection.physicalEndTime"
            style="width: 100%;"
            type="date"
            size="small"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>记录信息:</span>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <el-select
            :clearable="true"
            size="small"
            value-key="zoom"
            v-model="modifySelection.recordInfo"
          >
            <el-option v-for="item in recordInfo" :key="item.zoom" :value="item" :label="item.info"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left: 0.9%">
          <span>日估查体人数:</span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="modifySelection.dayProspectCount" placeholder="请输入人数" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="4" :offset="2" style="line-height: 30px;">
          <span>是否需要车辆:</span>
        </el-col>
        <el-col :span="6" :offset="1" style="text-align: left">
          <el-radio v-model="isNeedCar" label="1">是</el-radio>
          <el-radio v-model="isNeedCar" label="2">否</el-radio>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>工作内容:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-input
            type="textarea"
            :rows="1"
            placeholder="请输入内容"
            v-model="modifySelection.workContent"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>反馈方式:</span>
        </el-col>

        <el-col :span="14" :offset="1" style="text-align: left">
          <el-checkbox-group v-model="modifySelection.feedBackType">
            <el-checkbox label="现场反馈"></el-checkbox>
            <el-checkbox label="纸质反馈"></el-checkbox>
            <el-checkbox label="电子反馈"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>反馈内容:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-checkbox-group v-model="modifySelection.feedBackContent">
            <el-checkbox label="十大病情"></el-checkbox>
            <el-checkbox label="足弓发育"></el-checkbox>
            <el-checkbox label="力线发育"></el-checkbox>
            <el-checkbox label="HTML5"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>查体地址:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-input
            type="textarea"
            :rows="1"
            placeholder="请输入地址"
            v-model="modifySelection.physicalAddress"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>查体注意事项:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-input
            type="textarea"
            :rows="1"
            placeholder="请输入内容"
            v-model="modifySelection.physicalAttention"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="foot_btn" style="margin-top:30px;">
        <el-col :span="4" :offset="7">
          <el-button
            @click="ModifydialogVisible = false"
            type="primary"
            style="width: 100%;"
            size="middle"
          >取消</el-button>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button style="width: 100%;" type="primary" @click="modifySave()" size="middle">保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 新增数据弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      top="1vh"
      width="45%"
      title="新增数据"
      :visible.sync="DatadialogVisible"
      center
    >
      <el-row>
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            size="small"
            v-model="province"
            :clearable="true"
            value-key="proviceId"
            @change="getCities(province, type=1)"
          >
            <el-option
              v-for="item in provinces"
              :key="item.proviceId"
              :value="item"
              :label="item.proviceName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>城&nbsp;&nbsp;&nbsp;&nbsp;市:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            size="small"
            :clearable="true"
            value-key="cityId"
            v-model="city"
            @change="getCounty(city, type=1)"
          >
            <el-option
              v-for="item in cities"
              :key="item.cityId"
              :value="item"
              :label="item.cityName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>区&nbsp;&nbsp;&nbsp;&nbsp;县:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            :clearable="true"
            size="small"
            value-key="countyId"
            v-model="county"
            @change="getCountyId(county, type=1)"
          >
            <el-option
              v-for="item in counties"
              :key="item.countyId"
              :value="item"
              :label="item.countyName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>社&nbsp;&nbsp;&nbsp;&nbsp;区:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            :clearable="true"
            size="small"
            value-key="communityId"
            v-model="communityName"
            @change="getCommunityInfo(communityName, type=1)"
          >
            <el-option
              v-for="item in communityList"
              :key="item.communityId"
              :value="item"
              :label="item.communityName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>对接人姓名:</span>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <el-input v-model="addNewList.linkPeople" disabled placeholder="请输入姓名" size="small"></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left: 0.9%">
          <span>对接人电话:</span>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <el-input v-model="addNewList.linkPhone" disabled placeholder="请输入联系电话" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>负责部门:</span>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <el-input v-model="addNewList.chargeDepart" placeholder="请输入部门" size="small"></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left: 0.9%">
          <span>查体周期:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            :clearable="true"
            size="small"
            value-key="zoom"
            v-model="addNewList.physicalPeriod"
          >
            <el-option v-for="item in examBody" :key="item.zoom" :value="item" :label="item.time"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>查体设备:</span>
        </el-col>
        <el-col :span="6">
          <el-select size="small" value-key="zoom" v-model="addNewList.physicalDevice">
            <el-option v-for="item in examDevice" :key="item.zoom" :value="item" :label="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>季&nbsp;&nbsp;&nbsp;&nbsp;度:</span>
        </el-col>
        <el-col :span="6">
          <el-select size="small" :clearable="true" value-key="zoom" v-model="addNewList.quarter">
            <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>衣服颜色:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            :clearable="true"
            size="small"
            value-key="zoom"
            v-model="addNewList.dressColor"
          >
            <el-option v-for="item in dress" :key="item.zoom" :value="item" :label="item.color"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left: 0.9%">
          <span>设备存放:</span>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="radio" label="1">可以</el-radio>
          <el-radio v-model="radio" label="2">不可以</el-radio>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>开拓人:</span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="addNewList.linkPeopleName" disabled placeholder="请输入人数" size="small"></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>打卡时间:</span>
        </el-col>
        <el-col :span="6">
          <el-select
            size="small"
            :clearable="true"
            value-key="zoom"
            v-model="addNewList.pushCardTime"
          >
            <el-option v-for="item in cardTime" :key="item.zoom" :value="item" :label="item.time"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>工作人员数:</span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="addNewList.needPhysicalCount" placeholder="请输入人数" size="small"></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>查体开始时间</span>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="addNewList.physicalStartTime"
            style="width: 100%;"
            type="date"
            size="small"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>预估查体人数:</span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="addNewList.physicalEstimateCount" placeholder="请输入人数" size="small"></el-input>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left:1%;">
          <span>查体结束时间</span>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="addNewList.physicalEndTime"
            style="width: 100%;"
            type="date"
            size="small"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>记录信息:</span>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <el-select
            :clearable="true"
            size="small"
            value-key="zoom"
            v-model="addNewList.recordInfo"
          >
            <el-option v-for="item in recordInfo" :key="item.zoom" :value="item" :label="item.info"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="line-height: 30px;margin-left: 0.9%">
          <span>日估查体人数:</span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="addNewList.dayProspectCount" placeholder="请输入人数" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="4" :offset="2" style="line-height: 30px;">
          <span>是否需要车辆:</span>
        </el-col>
        <el-col :span="6" :offset="1" style="text-align: left">
          <el-radio v-model="isNeedCar" label="1">是</el-radio>
          <el-radio v-model="isNeedCar" label="2">否</el-radio>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>工作内容:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-input type="textarea" :rows="1" placeholder="请输入内容" v-model="addNewList.workContent"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>反馈方式:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-checkbox-group v-model="addNewList.feedBackType">
            <el-checkbox label="现场反馈"></el-checkbox>
            <el-checkbox label="纸质反馈"></el-checkbox>
            <el-checkbox label="电子反馈"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>反馈内容:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-checkbox-group v-model="addNewList.feedBackContent">
            <el-checkbox label="十大病情"></el-checkbox>
            <el-checkbox label="足弓发育"></el-checkbox>
            <el-checkbox label="力线发育"></el-checkbox>
            <el-checkbox label="HTML5"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>查体地址:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-input
            type="textarea"
            :rows="1"
            placeholder="请输入地址"
            v-model="addNewList.physicalAddress"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="3" :offset="2" style="line-height: 30px;">
          <span>查体注意事项:</span>
        </el-col>
        <el-col :span="14" :offset="1" style="text-align: left">
          <el-input
            type="textarea"
            :rows="1"
            placeholder="请输入内容"
            v-model="addNewList.physicalAttention"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="foot_btn" style="margin-top:30px;">
        <el-col :span="4" :offset="7">
          <el-button @click="returnBtn()" type="primary" style="width: 100%;" size="middle">取消</el-button>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button style="width: 100%;" type="primary" @click="addOperation()" size="middle">保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-row class="client_table">
      <el-col :span="24">
        <el-table :border="true" :data="clientData" style="width: 100%">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="proviceName" label="省份" min-width="60"></el-table-column>
          <el-table-column align="center" prop="cityName" label="城市" min-width="60"></el-table-column>
          <el-table-column align="center" prop="countyName" label="区县" min-width="60"></el-table-column>
          <el-table-column align="center" prop="communityName" label="社区" min-width="80"></el-table-column>
          <el-table-column align="center" prop="quarter" label="季度" min-width="60"></el-table-column>
          <el-table-column align="center" prop="feedBackType" label="反馈方式" min-width="60"></el-table-column>
          <el-table-column align="center" prop="linkPeople" label="对接人姓名" min-width="60"></el-table-column>
          <el-table-column align="center" prop="linkPhone" label="对接人电话" min-width="80"></el-table-column>
          <el-table-column align="center" prop="isNeedCar" label="需要车辆" min-width="50"></el-table-column>
          <el-table-column align="center" prop="feedBackContent" label="反馈内容" min-width="80"></el-table-column>
          <el-table-column
            align="center"
            prop="physicalEstimateCount"
            label="预估查体人数"
            min-width="50"
          ></el-table-column>
          <el-table-column align="center" prop="physicalStartTime" label="查体开始时间" min-width="80"></el-table-column>
          <el-table-column align="center" prop="linkPeopleName" label="开拓人" min-width="60"></el-table-column>
          <el-table-column align="center" prop="operation" label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleModify(scope.row)" size="small">详情</el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.row)"
                size="small"
                :disabled="limit.delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getProvince,
  getCity,
  getCountys,
  addCommunity,
  getCommunity
} from "../../api/address";
import {
  addPhysicalExamination,
  getControlCommunity,
  selectNurseryData
} from "../../api/datalist";
import { Promise, allSettled } from "q";
import { setTimeout } from "timers";
import { isString } from "../../utils/types";
import { timeFormat, dateFormat } from "../../utils/timeformat";
import session from "../../utils/session";

export default {
  name: "App",
  data() {
    return {
      //权限管理
      limit: {
        add: true,
        delete: true,
        update: true,
        select: true
      },
      //设备存放
      textarea: "",
      textarea2: "",
      checkList: [],
      checkLists: [],
      quarter: null,
      // 新增入托
      addNewList: {
        proviceId: null,
        cityId: null,
        countyId: null,
        communityId: null,
        linkPeople: null,
        linkPhone: null,
        chargeDepart: null,
        physicalPeriod: null,
        physicalDevice: null,
        dressColor: null,
        pushCardTime: null,
        linkPeopleName: null,
        physicalStartTime: null,
        physicalEndTime: null,
        needPhysicalCount: null,
        physicalEstimateCount: null,
        dayProspectCount: null,
        recordInfo: null,
        isNeedCar: null,
        workContent: null,
        feedBackType: [],
        feedBackContent: [],
        physicalAddress: null,
        physicalAttention: null,
        isDelete: 0,
        quarter: null,
        deviceDeposit: null
      },
      // 查体周期
      examBody: [
        { time: "上午半天", zoom: 1 },
        { time: "下午半天", zoom: 2 },
        { time: "全天", zoom: 3 }
      ],
      //体检设备
      examDevice: [
        { type: "便携设备", zoom: 1 },
        { type: "台式设备", zoom: 2 },
        { type: "数据设备", zoom: 3 }
      ],
      //季度
      season: [{ type: "春季", zoom: 1 }, { type: "秋季", zoom: 2 }],
      //是否开通
      openState: [{ type: "开通", zoom: 1 }, { type: "未开通", zoom: 2 }],
      //衣服颜色
      dress: [
        { color: "粉色", zoom: 1 },
        { color: "蓝色", zoom: 2 },
        { color: "白色", zoom: 3 }
      ],
      //设备是否存放
      radio: "2",
      // 打卡时间
      cardTime: [
        { time: "8:00", zoom: 1 },
        { time: "8:10", zoom: 2 },
        { time: "8:20", zoom: 3 },
        { time: "8:30", zoom: 4 },
        { time: "9:00", zoom: 5 },
        { time: "13:00", zoom: 6 },
        { time: "13:10", zoom: 7 },
        { time: "13:20", zoom: 8 },
        { time: "13:30", zoom: 9 },
        { time: "14:00", zoom: 10 },
        { time: "14:10", zoom: 11 },
        { time: "14:30", zoom: 12 },
        { time: "15:00", zoom: 13 }
      ],
      //记录信息
      recordInfo: [
        { info: "可以", zoom: 1 },
        { info: "拒绝", zoom: 2 },
        { info: "无所谓", zoom: 3 }
      ],
      //是否需要汽车
      isNeedCar: "2",
      //表格数据
      clientData: [],
      clientChoseDate: "",
      //录入数据弹出框
      DatadialogVisible: false,
      //省份
      province: null,
      provinces: [],
      number: null,
      //城市
      city: null,
      cities: [],
      //区县
      county: null,
      counties: [],
      //社区
      community: null,
      //社区信息
      communityName: null,
      //对接人信息
      acceptPeopleName: null,
      acceptPeoplePhone: null,
      //负责人
      responsiblePeople: null,
      //信息汇总
      allData: {
        proviceId: null,
        cityId: null,
        countyId: null,
        isDelete: 0,
        principal: null,
        telephone: null,
        linkpeople: null,
        communityName: null
      },
      fullscreenLoading: false,

      //查询条件
      search: {
        province: null,
        county: null,
        city: null,
        community: null,
        openPeople: null,
        quarter: null,
        isNeedCar: null,
        feedbackType: null,
        feedbackContainer: null,
        inputTime: null,
        examTime: null
      },
      //查询是否需要车辆
      searchCar: [{ type: "是", zoom: 1 }, { type: "否", zoom: 2 }],
      // 反馈方式
      feedbackType: [
        { type: "现场反馈", zoom: 1 },
        { type: "纸质反馈", zoom: 2 },
        { type: "电子反馈", zoom: 3 }
      ],
      //反馈内容
      feedbackContainer: [
        { type: "十大病情", zoom: 1 },
        { type: "足弓发育", zoom: 2 },
        { type: "力线发育", zoom: 3 },
        { type: "HTML5", zoom: 4 }
      ],
      //社区列表
      communityList: null,
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      //修改
      ModifydialogVisible: false,
      //修改条件
      modifySelection: {
        provice: null,
        proviceId: null,
        city: null,
        cityId: null,
        county: null,
        countyId: null,
        community: null,
        communityId: null,
        linkPeople: null,
        linkPhone: null,
        chargeDepart: null,
        physicalPeriod: null,
        physicalDevice: null,
        dressColor: null,
        pushCardTime: null,
        linkPeopleName: null,
        physicalStartTime: null,
        physicalEndTime: null,
        needPhysicalCount: null,
        physicalEstimateCount: null,
        dayProspectCount: null,
        recordInfo: null,
        isNeedCar: null,
        workContent: null,
        feedBackType: [],
        feedBackContent: null,
        physicalAddress: null,
        physicalAttention: null,
        isDelete: 0,
        quarter: null,
        deviceDeposit: null,
        userphysicalId: null
      }
    };
  },

  mounted() {
    //获取用户权限
    this.limit.add = !!!session.getItem("userlimit")[0];
    this.limit.delete = !!!session.getItem("userlimit")[1];
    this.limit.update = !!!session.getItem("userlimit")[2];
    this.limit.select = !!!session.getItem("userlimit")[3];
    //获取地址
    this.getAddress();
    //获取入托信息
    this.getControlCommunities();
  },

  methods: {
    //导出Execl
    outExcel() {
      let arg = {
        whereLambda: {}
      };
      if (this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId; //省份
      } else {
        arg.whereLambda.proviceId = null;
      }
      if (this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId; //城市
      } else {
        arg.whereLambda.cityId = null;
      }
      if (this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId; //社区
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId; //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      arg.whereLambda.userName = this.search.clientName || null; //客户姓名

      arg.whereLambda.telephone = this.search.phone || null; //联系电话

      arg.whereLambda.isVisit = this.search.isArrive || null; //是否到访

      if (this.search.examTime) {
        let result = dateFormat(
          this.search.examTime[0],
          this.search.examTime[1]
        );
        arg.whereLambda.physicalStartTime = result.beginTimes || null; //体检开始时间
        arg.whereLambda.physicalEndTime = result.endTimes || null; //体检结束时间
      } else {
        arg.whereLambda.physicalStartTime = null;
        arg.whereLambda.physicalEndTime = null;
      }

      arg.whereLambda.linkPeople = this.search.openPeople || null;

      if (this.search.inputTime) {
        let result = dateFormat(
          this.search.inputTime[0],
          this.search.inputTime[1]
        );
        arg.whereLambda.inputBeginTime = result.beginTimes || null; //录入开始时间
        arg.whereLambda.inputEndTime = result.endTimes || null; //录入结束时间
      } else {
        arg.whereLambda.inputBeginTime = null;
        arg.whereLambda.inputEndTime = null;
      }

      arg.whereLambda.bak = this.search.illness || null; //病情

      arg.whereLambda.sysUserName = this.search.examPeople || null; //体检人

      arg.whereLambda.inputPeople = this.search.inputPeople || null; //录入人

      if (this.search.quarter) {
        arg.whereLambda.quarter = this.search.quarter.zoom; //季度
      } else {
        arg.whereLambda.quarter = null;
      }

      if (this.search.isArrive) {
        arg.whereLambda.isVisit = this.search.isArrive.zoom; //是否到访
      } else {
        arg.whereLambda.isVisit = null;
      }

      arg.whereLambda.bak = this.search.illness || null;

      // let baseUrl = 'http://192.168.3.220:83/api/Userphysical/ExportOutUserphysicals';

      // let exportArg = '?userName=' + arg.whereLambda.userName + '&patriarchicPhone=' + arg.whereLambda.telephone + '&isVisit=' + arg.whereLambda.isVisit + '&inputPeople=' + arg.whereLambda.inputPeople + '&bak=' + arg.whereLambda.bak + '&proviceId=' + arg.whereLambda.proviceId + '&cityId=' + arg.whereLambda.cityId + '&countyId=' + arg.whereLambda.countyId + '&communityId=' + arg.whereLambda.communityId + '&sysUserName=' + arg.whereLambda.sysUserName + '&physicalPeriod=' + null + '&physicalBeginTime=' + arg.whereLambda.physicalStartTime + '&physicalEndTime=' + arg.whereLambda.physicalEndTime + '&inputBeginTime=' + arg.whereLambda.inputBeginTime + '&inputEndTime=' + arg.whereLambda.inputEndTime + '&quarter=' + arg.whereLambda.quarter;

      // let endArg = baseUrl + exportArg;

      // window.location.href = endArg;
    },

    //查询数据
    searchData() {
      this.getControlCommunities();
    },
    //获取社区列表
    async getControlCommunities(pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {}
      };
      if (this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId; //省份
      } else {
        arg.whereLambda.proviceId = null;
      }
      if (this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId; //城市
      } else {
        arg.whereLambda.cityId = null;
      }
      if (this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId; //社区
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId; //区县
      } else {
        arg.whereLambda.countyId = null;
      }
      if (this.search.quarter) {
        arg.whereLambda.quarter = this.search.quarter.zoom; //季度
      } else {
        arg.whereLambda.quarter = null;
      }

      if (this.search.isNeedCar) {
        arg.whereLambda.isNeedCar = this.search.isNeedCar.zoom; //是否需要车辆
      } else {
        arg.whereLambda.isNeedCar = null;
      }

      arg.whereLambda.linkPeopleName = this.search.openPeople || null; //开拓人

      if (this.search.feedbackContainer) {
        arg.whereLambda.feedbackContainer = this.search.feedbackContainer.type; //反馈内容
      } else {
        arg.whereLambda.feedbackContainer = null;
      }

      if (this.search.feedbackType) {
        arg.whereLambda.feedbackType = this.search.feedbackType.type; //反馈方式
      } else {
        arg.whereLambda.feedbackType = null;
      }

      if (this.search.inputTime) {
        let result = dateFormat(
          this.search.inputTime[0],
          this.search.inputTime[1]
        );
        arg.whereLambda.inputBeginTime = result.beginTimes || null; //录入开始时间
        arg.whereLambda.inputEndTime = result.endTimes || null; //录入结束时间
      } else {
        arg.whereLambda.inputBeginTime = null;
        arg.whereLambda.inputEndTime = null;
      }

      if (this.search.examTime) {
        let result = dateFormat(
          this.search.examTime[0],
          this.search.examTime[1]
        );
        arg.whereLambda.physicalStartTime = result.beginTimes || null; //体检开始时间
        arg.whereLambda.physicalEndTime = result.endTimes || null; //体检结束时间
      } else {
        arg.whereLambda.physicalStartTime = null;
        arg.whereLambda.physicalEndTime = null;
      }

      try {
        return new Promise((resolve, reject) => {
          selectNurseryData(arg)
            .then(res => {
              const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              resolve(res);
              let dataList = res.data.ResponseModel;
              if (dataList) {
                loading.close();
                this.clientData = dataList.list;
                this.pages.total = dataList.total;
              } else {
                this.clientData = null;
                this.pages.total = 0;
                loading.close();
              }
            })
            .catch(err => {
              reject(err);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
    //获取省份
    async getAddress() {
      try {
        return new Promise((resolve, reject) => {
          getProvince()
            .then(res => {
              resolve(res);
              this.provinces = res.data.ResponseModel;
            })
            .catch(err => {
              reject(err);
            });
        });
      } catch (e) {
        console.log(e);
      }
    },
    //获取城市

    async getCities(item, type) {
      //根据类型判断重载机制
      switch (type) {
        case 1:
          this.city = null;
          this.county = null;
          this.community = null;
          break;
        case 2:
          this.search.city = null;
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.modifySelection.city = null;
          this.modifySelection.county = null;
          this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let proviceVal = item.proviceId;
        this.addNewList.proviceId = item.proviceId;
        try {
          return new Promise((resolve, reject) => {
            getCity({ proviceId: proviceVal })
              .then(res => {
                resolve(res);
                this.cities = res.data.ResponseModel;
              })
              .catch(err => {
                reject(err);
              });
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    //获取区县
    async getCounty(item, type) {
      switch (type) {
        case 1:
          this.county = null;
          this.community = null;
          break;
        case 2:
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.modifySelection.county = null;
          this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let cityVal = item.cityId;
        this.addNewList.cityId = item.cityId;
        try {
          return new Promise((resolve, reject) => {
            getCountys({ cityId: cityVal })
              .then(res => {
                resolve(res);
                this.counties = res.data.ResponseModel;
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err => {
            reject(err);
          });
        } catch (err) {
          console.log(err);
        }
      }
    },

    //获取区县Id
    getCountyId(item, type) {
      switch (type) {
        case 1:
          this.community = null;
          break;
        case 2:
          this.search.community = null;
          break;
        case 3:
          this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      this.addNewList.countyId = item.countyId;
      // 获取社区
      if (item) {
        let countyVal = item.countyId;

        try {
          return new Promise((resolve, reject) => {
            getCommunity({ countyId: countyVal })
              .then(res => {
                resolve(res);
                if (res.data.Error) {
                  this.communityList = null;
                  return null;
                } else {
                  this.communityList = res.data.ResponseModel.list;
                }
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err => {
            reject(err);
          });
        } catch (err) {
          console.log(err);
        }
      }
    },

    //获取每个社区详细信息
    getCommunityInfo(arg, type) {
      if (type === 1) {
        this.addNewList.linkPeople = arg.linkpeople;
        this.addNewList.linkPhone = arg.telephone;
        this.addNewList.linkPeopleName = arg.principal;
        this.addNewList.communityId = arg.communityId;
      } else if (type === 2) {
        this.modifySelection.linkPeople = arg.linkpeople;
        this.modifySelection.linkPhone = arg.telephone;
        this.modifySelection.linkPeopleName = arg.principal;
        this.modifySelection.communityId = arg.communityId;
      }
    },

    //关闭新增页面
    returnBtn() {
      this.DatadialogVisible = false;
      this.province = null;
      this.city = null;
      this.county = null;
      this.communityName = null;
      for (let name in this.addNewList) {
        this.addNewList[name] = null;
      }
      this.addNewList.feedBackType = [];
      this.addNewList.feedBackContent = [];
      this.isDelete = 0;
    },

    //当前页面变化时
    handleCurrentChange(num) {
      this.pages.currentPage = num;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(pageIndex, pageSize);
    },
    //页面条数发生变化时
    handleSizeChange(val) {
      this.pages.pageSize = val;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(pageIndex, pageSize);
    },
    //修改
    handleModify(row) {
      console.log(row);
      this.ModifydialogVisible = true;
      this.modifySelection.provice = row.proviceName;
      this.modifySelection.proviceId = row.proviceId;
      this.modifySelection.city = row.cityName;
      this.modifySelection.cityId = row.cityId;
      this.modifySelection.county = row.countyName;
      this.modifySelection.countyId = row.countyId;
      this.modifySelection.community = row.communityName;
      this.modifySelection.communityId = row.communityId;
      this.modifySelection.linkPeople = row.linkPeople;
      this.modifySelection.linkPeopleName = row.linkPeopleName;
      this.modifySelection.linkPhone = row.linkPhone;
      this.modifySelection.dressColor = row.dressColor;
      this.modifySelection.chargeDepart = row.chargeDepart;
      this.modifySelection.physicalDevice = row.physicalDevice;
      this.modifySelection.pushCardTime = row.pushCardTime;
      this.modifySelection.needPhysicalCount = row.needPhysicalCount;
      this.modifySelection.physicalPeriod = row.physicalPeriod;
      this.modifySelection.physicalStartTime = row.physicalStartTime;
      this.modifySelection.physicalEndTime = row.physicalEndTime;
      this.modifySelection.physicalEstimateCount = row.physicalEstimateCount;
      this.modifySelection.dayProspectCount = row.dayProspectCount;
      this.modifySelection.recordInfo = row.recordInfo;
      if (row.isNeedCar) {
        if (row.isNeedCar == "否") {
          this.isNeedCar = "2";
        } else if (row.isNeedCar == "是") {
          this.isNeedCar = "1";
        }
      } else {
        this.isNeedCar = "2";
      }

      if (row.deviceDeposit) {
        if (row.deviceDeposit == "可以") {
          this.radio = "1";
        } else if (row.deviceDeposit == "不可以") {
          this.radio = "2";
        }
      } else {
        this.radio = "1";
      }
      this.modifySelection.workContent = row.workContent;
      this.modifySelection.feedBackType = row.feedBackType.split(",");
      this.modifySelection.feedBackContent = row.feedBackContent.split(",");
      this.modifySelection.physicalAddress = row.physicalAddress;
      this.modifySelection.physicalAttention = row.physicalAttention;
      this.modifySelection.quarter = row.quarter;
      this.modifySelection.userphysicalId = row.userphysicalId;
      this.modifySelection.isNeedCar = "1";
      this.modifySelection.deviceDeposit = "1";
    },
    // 修改保存
    async modifySave() {
      let modifyData = this.modifySelection;
      console.log(modifyData);
      //第一步 验证是否为空
      for (let p in modifyData) {
        if (modifyData[p] === null || modifyData[p] === "") {
          this.$message({
            type: "warning",
            message: "信息不能为空",
            center: true
          });
          return false;
        }
      }

      // 第二步  整理后端接口数据

      //如果不改变省市区县
      let allSelects;
      if (isString(modifyData.provice)) {
        allSelects = {
          isDelete: 0,
          proviceId: this.modifySelection.proviceId,
          cityId: this.modifySelection.cityId,
          countyId: this.modifySelection.countyId,
          communityName: this.modifySelection.community,
          communityId: this.modifySelection.communityId,
          userphysicalId: this.modifySelection.userphysicalId,
          linkPeople: this.modifySelection.linkPeople,
          linkPeopleName: this.modifySelection.linkPeopleName,
          linkPhone: this.modifySelection.linkPhone,
          dressColor: this.modifySelection.dressColor,
          chargeDepart: this.modifySelection.chargeDepart,
          physicalDevice: this.modifySelection.physicalDevice,
          pushCardTime: this.modifySelection.pushCardTime,
          needPhysicalCount: this.modifySelection.needPhysicalCount,
          physicalPeriod: this.modifySelection.physicalPeriod,
          physicalStartTime: this.modifySelection.physicalStartTime,
          physicalEndTime: this.modifySelection.physicalEndTime,
          physicalEstimateCount: this.modifySelection.physicalEstimateCount,
          dayProspectCount: this.modifySelection.dayProspectCount,
          recordInfo: this.modifySelection.recordInfo,
          isNeedCar: this.isNeedCar,
          workContent: this.modifySelection.workContent,
          feedBackType: this.modifySelection.feedBackType.join(","),
          feedBackContent: this.modifySelection.feedBackContent.join(","),
          physicalAddress: this.modifySelection.physicalAddress,
          physicalAttention: this.modifySelection.physicalAttention,
          quarter: this.modifySelection.quarter,
          deviceDeposit: this.radio
        };
      } else {
        allSelects = {
          proviceId: this.modifySelection.provice.proviceId,
          cityId: this.modifySelection.city.cityId,
          countyId: this.modifySelection.county.countyId,
          isDelete: 0,
          communityName: this.modifySelection.community.communityName,
          communityId: this.modifySelection.community.communityId,
          userphysicalId: this.modifySelection.userphysicalId,
          linkPeople: this.modifySelection.linkPeople,
          linkPeopleName: this.modifySelection.linkPeopleName,
          linkPhone: this.modifySelection.linkPhone,
          dressColor: this.modifySelection.dressColor,
          chargeDepart: this.modifySelection.chargeDepart,
          physicalDevice: this.modifySelection.physicalDevice,
          pushCardTime: this.modifySelection.pushCardTime,
          needPhysicalCount: this.modifySelection.needPhysicalCount,
          physicalPeriod: this.modifySelection.physicalPeriod,
          physicalStartTime: this.modifySelection.physicalStartTime,
          physicalEndTime: this.modifySelection.physicalEndTime,
          physicalEstimateCount: this.modifySelection.physicalEstimateCount,
          dayProspectCount: this.modifySelection.dayProspectCount,
          recordInfo: this.modifySelection.recordInfo,
          isNeedCar: this.isNeedCar,
          workContent: this.modifySelection.workContent,
          feedBackType: this.modifySelection.feedBackType.join(","),
          feedBackContent: this.modifySelection.feedBackContent.join(","),
          physicalAddress: this.modifySelection.physicalAddress,
          physicalAttention: this.modifySelection.physicalAttention,
          quarter: this.modifySelection.quarter,
          deviceDeposit: this.radio
        };
      }

      //判断选项卡的类型 然后填值

      let dressColorResult = this.judgeType(allSelects.dressColor);
      let pushCardTimeResult = this.judgeType(allSelects.pushCardTime);
      let physicalDeviceResult = this.judgeType(allSelects.physicalDevice);
      let quarterResult = this.judgeType(allSelects.quarter);
      let physicalPeriodResult = this.judgeType(allSelects.physicalPeriod);
      let recordInfoResult = this.judgeType(allSelects.recordInfo);

      //判断衣服颜色
      if (dressColorResult) {
        switch (allSelects.dressColor) {
          case "粉色":
            allSelects.dressColor = 1;
            break;
          case "蓝色":
            allSelects.dressColor = 2;
            break;
          case "白色":
            allSelects.dressColor = 3;
            break;
            deflate: allSelects.dressColor = 1;
        }
      } else {
        allSelects.dressColor = this.modifySelection.dressColor.zoom;
      }

      //判断打卡时间
      if (pushCardTimeResult) {
        switch (allSelects.pushCardTime) {
          case "8:00":
            allSelects.pushCardTime = 1;
            break;
          case "8:10":
            allSelects.pushCardTime = 2;
            break;
          case "8:20":
            allSelects.pushCardTime = 3;
            break;
          case "8:30":
            allSelects.pushCardTime = 4;
            break;
          case "9:00":
            allSelects.pushCardTime = 5;
            break;
          case "13:00":
            allSelects.pushCardTime = 6;
            break;
          case "13:10":
            allSelects.pushCardTime = 7;
            break;
          case "13:20":
            allSelects.pushCardTime = 8;
            break;
          case "13:30":
            allSelects.pushCardTime = 9;
            break;
          case "14:00":
            allSelects.pushCardTime = 10;
            break;
          case "14:10":
            allSelects.pushCardTime = 11;
            break;
          case "14:30":
            allSelects.pushCardTime = 12;
            break;
          case "15:00":
            allSelects.pushCardTime = 13;
            break;
            deflate: allSelects.pushCardTime = 1;
        }
      } else {
        allSelects.pushCardTime = this.modifySelection.pushCardTime.zoom;
      }

      //判断体检设备
      if (physicalDeviceResult) {
        switch (allSelects.physicalDevice) {
          case "便携设备":
            allSelects.physicalDevice = 1;
            break;
          case "台式设备":
            allSelects.physicalDevice = 2;
            break;
          case "数据设备":
            allSelects.physicalDevice = 3;
            break;
            deflate: allSelects.physicalDevice = 1;
        }
      } else {
        allSelects.physicalDevice = this.modifySelection.physicalDevice.zoom;
      }

      //判断查体周期
      if (physicalPeriodResult) {
        switch (allSelects.physicalPeriod) {
          case "上午半天":
            allSelects.physicalPeriod = 1;
            break;
          case "下午半天":
            allSelects.physicalPeriod = 2;
            break;
          case "全天":
            allSelects.physicalPeriod = 3;
            break;
            deflate: allSelects.physicalPeriod = 1;
        }
      } else {
        allSelects.physicalPeriod = this.modifySelection.physicalPeriod.zoom;
      }
      //判断记录信息
      if (recordInfoResult) {
        switch (allSelects.recordInfo) {
          case "可以":
            allSelects.recordInfo = 1;
            break;
          case "拒绝":
            allSelects.recordInfo = 2;
            break;
          case "无所谓":
            allSelects.recordInfo = 3;
            break;
            deflate: allSelects.recordInfo = 1;
        }
      } else {
        allSelects.recordInfo = this.modifySelection.recordInfo.zoom;
      }

      //判断季节
      if (quarterResult) {
        switch (allSelects.quarter) {
          case "春季":
            allSelects.quarter = 1;
            break;
          case "秋季":
            allSelects.quarter = 2;
            break;
            deflate: allSelects.quarter = 1;
        }
      } else {
        allSelects.quarter = this.modifySelection.quarter.zoom;
      }

      console.log(allSelects);

      try {
        return new Promise((resolve, reject) => {
          addPhysicalExamination(allSelects)
            .then(res => {
              const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              resolve(res);
              setTimeout(() => {
                loading.close();
                this.$message({
                  type: "success",
                  message: "修改社区成功",
                  center: true
                });
                this.ModifydialogVisible = false;
                // this.modifySelection.province = null;
                // this.modifySelection.city = null;
                // this.modifySelection.county = null;
                // this.modifySelection.community = null;
                // this.modifySelection.acceptPeopleName = null;
                // this.modifySelection.acceptPeoplePhone = null;
                // this.modifySelection.responsiblePeople = null;
                this.getControlCommunities(
                  this.pages.currentPage,
                  this.pages.pageSize
                );
              }, 1000);
            })
            .catch(err => {
              reject(res);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },

    //判断类型
    judgeType(item) {
      const result = isString(item);
      return result;
    },

    //删除
    async handleDelete(row) {
      if (row) {
        let deleteData = {
          isDelete: 1,
          userphysicalId: row.userphysicalId
        };
        this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            try {
              return new Promise((resolve, reject) => {
                addPhysicalExamination(deleteData)
                  .then(res => {
                    const loading = this.$loading({
                      lock: true,
                      text: "加载中",
                      spinner: "el-icon-loading",
                      background: "rgba(0, 0, 0, 0.7)"
                    });
                    resolve(res);
                    if (!res.Error) {
                      loading.close();
                      setTimeout(() => {
                        this.$message({
                          type: "success",
                          message: "删除成功！",
                          center: true
                        });
                        this.getControlCommunities(
                          this.pages.currentPage,
                          this.pages.pageSize
                        );
                      }, 500);
                    }
                  })
                  .catch(err => {
                    reject(err);
                  });
              });
            } catch (err) {
              console.log(err);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          });
      }
    },
    // 新增按钮
    async addOperation() {
      let p = this.addNewList;
      console.log(p.feedBackContent);
      debugger;
      if (
        !!p.proviceId &&
        !!p.cityId &&
        !!p.countyId &&
        !!p.communityId &&
        !!p.linkPeople &&
        !!p.linkPhone &&
        !!p.chargeDepart &&
        !!p.physicalPeriod &&
        !!p.physicalDevice &&
        !!p.dressColor &&
        !!p.pushCardTime &&
        !!p.linkPeopleName &&
        !!p.physicalStartTime &&
        !!p.physicalEndTime &&
        !!p.needPhysicalCount &&
        !!p.physicalEstimateCount &&
        !!p.dayProspectCount &&
        !!p.recordInfo &&
        !!this.isNeedCar &&
        !!p.workContent &&
        !!p.feedBackType &&
        !!p.feedBackContent.length &&
        !!p.physicalAddress.length &&
        !!p.quarter
      ) {
        let addInfo = this.addNewList;
        addInfo.dressColor = this.addNewList.dressColor.zoom;
        addInfo.isNeedCar = this.isNeedCar;
        addInfo.pushCardTime = this.addNewList.pushCardTime.zoom;
        addInfo.quarter = this.addNewList.quarter.zoom;
        addInfo.recordInfo = this.addNewList.recordInfo.zoom;
        addInfo.deviceDeposit = this.radio;
        addInfo.physicalDevice = this.addNewList.physicalDevice.zoom;
        addInfo.physicalPeriod = this.addNewList.physicalPeriod.zoom;
        addInfo.feedBackType = addInfo.feedBackType.join(",");
        addInfo.feedBackContent = addInfo.feedBackContent.join(",");

        try {
          return new Promise((resolve, reject) => {
            debugger;
            addPhysicalExamination(addInfo)
              .then(res => {
                const loading = this.$loading({
                  lock: true,
                  text: "加载中",
                  spinner: "el-icon-loading",
                  background: "rgba(0, 0, 0, 0.7)"
                });
                if (!res.data.Error) {
                  setTimeout(() => {
                    loading.close();
                    this.$message({
                      type: "success",
                      message: "新增成功",
                      center: true
                    });
                    this.DatadialogVisible = false;
                    this.getControlCommunities(
                      this.pages.currentPage,
                      this.pages.pageSize
                    );
                    this.returnBtn();
                  }, 600);
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$message({
          type: "warning",
          message: "请填写全部表格信息！",
          center: true
        });
      }
      // console.log(this.addNewList);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  scrollbar {
    width: 10px;
    height: 10px;
  }
  scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rosybrown;
    border-radius: 3px;
  }
  scrollbar-thumb {
    border-radius: 7px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #e8e8e8;
  }
  scrollbar-button {
    background-color: cyan;
  }
  scrollbar-corner {
    background: khaki;
  }
  .search {
    text-align: center;
  }
  .another_row {
    text-align: center;
    margin-top: 20px;
    span {
      line-height: 30px;
    }
  }
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
  .client_table {
    margin-top: 20px;
  }
}
</style>
