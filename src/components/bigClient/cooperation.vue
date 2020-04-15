<template>
  <div class="container" style="height: 800px;overflow-y: scroll">
    <el-row style="text-align: center">
      <el-col :span="2" style="width: 5.5%;line-height: 30px">
        <!-- 新增社区 -->
        <el-button type="primary" size="small" @click="loding(true)" :disabled="limit.add">新增</el-button>
        <el-dialog
          :close-on-click-modal="false"
          width="70%"
          title="数据录入"
          :visible.sync="DatadialogVisible"
          center
        >
          <el-row style="text-align: center">
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
              <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
            </el-col>
            <el-col :span="3">
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
            <el-col :span="2" style="width: 9%;line-height: 30px;">
              <span>城市:</span>
            </el-col>
            <el-col :span="3">
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
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
              <span>区县:</span>
            </el-col>
            <el-col :span="3">
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
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>机构类型:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                :clearable="true"
                value-key="zoom"
                v-model="allData.organizationType"
              >
                <el-option
                  v-for="item in organizationType"
                  :key="item.zoom"
                  :value="item"
                  :label="item.type"
                ></el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
                  <span>社区:</span>
                </el-col>
                  <el-col :span="3">
                  <el-select :clearable="true" size="small" value-key="communityId" v-model="allData.community">
                    <el-option v-for="item in communityList" :key="item.communityId" :value="item" :label="item.communityName">

                    </el-option>
                  </el-select>
            </el-col>-->
          </el-row>
          <el-row style="margin-top: 30px; text-align:center">
            <!-- <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%">
              <span>负责人:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="allData.principal" placeholder="请输入姓名" size="small"></el-input>
            </el-col> -->
            <el-col :span="2" style="width: 9%;line-height: 30px;">
              <span>对接人姓名:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="allData.linkPeople" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>对接人电话:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="allData.telephone" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
              <span>机构名称:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="allData.organizationName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row
            style="margin-top: 30px;text-align: center;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
          >
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 8%">
              <span>合同签署日期:</span>
            </el-col>
            <el-col :span="3">
              <el-date-picker
                style="width: 100%"
                size="small"
                v-model="allData.contractSignDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" style="width: 9%;line-height: 30px">
              <span>合同终止日期:</span>
            </el-col>
            <el-col :span="3">
              <el-date-picker
                size="small"
                v-model="allData.contractSignEndDate"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>合同人数:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="allData.contractPeopleCount" placeholder="请输入人数" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>机构规模:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                :clearable="true"
                value-key="zoom"
                v-model="allData.organizationSize"
              >
                <el-option
                  v-for="item in organizationSize"
                  :key="item.zoom"
                  :value="item"
                  :label="item.type"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;">
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 9%">
              <span>合同附件:</span>
            </el-col>
            <el-col :span="2">
              <!-- action="http://117.34.105.87:88/api/Userphysical/Import" -->
              <!-- <el-upload
                class="upload-demo"
                ref="upload"
                name="上传文件"
                action="http://192.168.3.111:8080/file/upload"
                :data="this.anotherData"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="handleUpload"
                :auto-upload="false"
                multiple
                :limit="1"
              >-->
              <el-upload
                class="upload-demo"
                ref="upload"
                action
                :http-request="uploadfile"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="handleUpload"
                :auto-upload="false"
                multiple
                :limit="1"
              >
                <el-button size="small" type="primary">点击选择</el-button>
                <div slot="tip" class="el-upload__tip">选择上传文件</div>
              </el-upload>
            </el-col>
          </el-row>
          <el-row class="foot_btn" style="margin-top:30px;">
            <el-col :span="2" :offset="10">
              <el-button
                @click="DatadialogVisible = false"
                type="success"
                style="width: 100%;"
                size="middle"
              >返回</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button style="width: 100%;" type="primary" @click="saveData()" size="middle">保存</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-col>
      <!-- 查询数据 -->
      <el-col :span="2" style="width: 5%;line-height: 30px;">
        <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
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
      <el-col :span="2" style="width: 5%;line-height: 30px;">
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
      <el-col :span="2" style="width: 5%;line-height: 30px;">
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
      <!-- <el-col :span="2" style="width: 4.5%;line-height: 30px">
          <span>社区</span>
        </el-col>
        <el-col :span="3">
          <el-select :clearable="true" size="small" value-key="communityId" v-model="search.community">
            <el-option v-for="item in communityList" :key="item.communityId" :value="item" :label="item.communityName">

            </el-option>
          </el-select>
      </el-col>-->
      <el-col :span="2" style="width: 5%;line-height: 30px">
        <span>负责人</span>
      </el-col>
      <el-col :span="2" style="text-align: left">
        <el-input v-model="search.linkPeople" placeholder="请输入姓名" size="small"></el-input>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px;margin-left: 1%">
        <span>机构类型:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
          value-key="zoom"
          v-model="search.organizationType"
        >
          <el-option
            v-for="item in organizationType"
            :key="item.zoom"
            :value="item"
            :label="item.type"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 修改数据 -->
    <el-row style="text-align: center">
      <el-col>
        <el-dialog
          :close-on-click-modal="false"
          width="70%"
          title="数据录入"
          :visible.sync="ModifydialogVisible"
        >
          <el-row>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
              <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                v-model="modifySelection.province"
                :clearable="true"
                value-key="proviceId"
                @change="getCities(modifySelection.province, type=3)"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.proviceId"
                  :value="item"
                  :label="item.proviceName"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="width: 9%;line-height: 30px;">
              <span>城市:</span>
            </el-col>
            <el-col :span="3">
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
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
              <span>区县:</span>
            </el-col>
            <el-col :span="3">
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
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>机构类型:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                :clearable="true"
                value-key="zoom"
                v-model="modifySelection.organizationType"
              >
                <el-option
                  v-for="item in organizationType"
                  :key="item.zoom"
                  :value="item"
                  :label="item.type"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;">
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%">
              <span>负责人:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="modifySelection.principal" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 9%;line-height: 30px;">
              <span>对接人姓名:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="modifySelection.linkPeopleName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>对接人电话:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="modifySelection.telephone" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
              <span>机构名称:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input v-model="modifySelection.organizationName" placeholder="请输入姓名" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row
            style="margin-top: 30px;text-align: center;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);"
          >
            <el-col :span="2" style="width: 8%;line-height: 30px;margin-left: 8%">
              <span>合同签署日期:</span>
            </el-col>
            <el-col :span="3">
              <el-date-picker
                style="width: 100%"
                size="small"
                v-model="modifySelection.contractSignDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" style="width: 9%;line-height: 30px">
              <span>合同终止日期:</span>
            </el-col>
            <el-col :span="3">
              <el-date-picker
                size="small"
                v-model="modifySelection.contractSignEndDate"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>合同人数:</span>
            </el-col>
            <el-col :span="3" style="text-align: left">
              <el-input
                v-model="modifySelection.contractPeopleCount"
                placeholder="请输入人数"
                size="small"
              ></el-input>
            </el-col>
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
              <span>机构规模:</span>
            </el-col>
            <el-col :span="3">
              <el-select
                size="small"
                :clearable="true"
                value-key="zoom"
                v-model="modifySelection.organizationSize"
              >
                <el-option
                  v-for="item in organizationSize"
                  :key="item.zoom"
                  :value="item"
                  :label="item.type"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;">
            <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 9%">
              <span>合同附件:</span>
            </el-col>
            <el-col :span="2">
              <!-- action="http://117.34.105.87:88/api/Userphysical/Import" -->
              <el-upload
                class="upload-demo"
                ref="upload"
                :data="this.anotherData"
                action="http://192.168.3.167:8090/FuYinApiServer/api/Organization/OperateOrganization"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="handleUpload"
                :auto-upload="false"
                multiple
                :limit="1"
              >
                <el-button size="small" type="primary">点击选择</el-button>
                <div slot="tip" class="el-upload__tip">选择上传文件</div>
              </el-upload>
            </el-col>
          </el-row>
          <el-row class="foot_btn" style="margin-top:30px;">
            <el-col :span="2" :offset="10">
              <el-button
                @click="ModifydialogVisible = false"
                type="success"
                style="width: 100%;"
                size="middle"
              >返回</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button style="width: 100%;" type="primary" @click="modifySave()" size="middle">保存</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;text-align: center">
      <el-col :span="2" style="width: 5%;line-height: 30px;margin-left: 5.4%">
        <span>机构规模:</span>
      </el-col>
      <el-col :span="3">
        <el-select
          size="small"
          :clearable="true"
          value-key="zoom"
          v-model="search.organizationSize"
        >
          <el-option
            v-for="item in organizationSize"
            :key="item.zoom"
            :value="item"
            :label="item.type"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="width: 5%;line-height: 30px">
        <span>机构名称</span>
      </el-col>
      <el-col :span="3" style="text-align: left">
        <el-input v-model="search.organizationName" placeholder="请输入名称" size="small"></el-input>
      </el-col>
      <el-col :span="1" style="width: 5.8%;margin-left: 1%">
        <el-button
          style="width:100%"
          size="small"
          type="warning"
          class="btns"
          @click="searchData()"
        >查询</el-button>
      </el-col>
      <el-col :span="1" style="width: 5.8%;margin-left: 1%">
        <el-button
          style="width: 100%"
          size="small"
          type="success"
          class="btns"
          @click="outExcel()"
        >导出excel</el-button>
      </el-col>
    </el-row>
    <el-row class="client_table">
      <el-col :span="24">
        <el-table :border="true" :data="clientData" style="width: 100%">
          <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="proviceName" label="省份" min-width="60"></el-table-column>
          <el-table-column align="center" prop="cityName" label="城市" min-width="60"></el-table-column>
          <el-table-column align="center" prop="countyName" label="区县" min-width="60"></el-table-column>
          <el-table-column align="center" prop="organizationName" label="机构名称" min-width="60"></el-table-column>
          <el-table-column align="center" prop="organizationType" label="机构类型" min-width="60"></el-table-column>
          <el-table-column align="center" prop="linkPeopleName" label="对接人姓名" min-width="60"></el-table-column>
          <el-table-column align="center" prop="telephone" label="对接人电话" min-width="60"></el-table-column>
          <el-table-column align="center" prop="contractSignDate" label="合同签署日期" min-width="80"></el-table-column>
          <el-table-column align="center" prop="contractSignEndDate" label="合同终止日期" min-width="80"></el-table-column>
          <el-table-column align="center" prop="person" label="负责人" min-width="60"></el-table-column>
          <el-table-column align="center" prop="contractPeopleCount" label="合同人数" min-width="60"></el-table-column>
          <el-table-column align="center" prop="operation" label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button type="primary" @click="download(scope.row)" size="small">下载附件</el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.row)"
                size="small"
                :disabled="limit.delete"
              >删除</el-button>
              <el-button type="primary" @click="handleModify(scope.row)" size="small">修改</el-button>
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
  getControlCommunity,
  organisationSeach,
  OrganizationOperate
} from "../../api/datalist";
import formatTime, { timeFormat } from "../../utils/timeformat";
import { isString } from "../../utils/types";
import { Promise } from "q";
import { setTimeout } from "timers";
import { dateFormat } from "../../utils/timeformat";
import axios from "../../utils/ajax";
import { debug } from "util";
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
      clientName: "",
      clientPhone: "",
      isMember: "",
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
      //新增机构
      allData: {
        proviceId: null,
        cityId: null,
        countyId: null,
        isDelete: 0,
        principal: null,
        organizationType: null,
        organizationName: null,
        linkPeople: null,
        telephone: null,
        contractSignDate: null,
        contractSignEndDate: null,
        contractPeopleCount: null,
        organizationSize: null
      },
      //修改条件
      modifySelection: {
        province: null,
        city: null,
        county: null,
        proviceId: null,
        cityId: null,
        countyId: null,
        isDelete: 0,
        principal: null,
        organizationType: null,
        organizationName: null,
        linkPeopleName: null,
        telephone: null,
        contractSignDate: null,
        contractSignEndDate: null,
        contractPeopleCount: null,
        organizationSize: null
      },

      //机构规模
      organizationSize: [
        { type: "大", zoom: 1 },
        { type: "中", zoom: 2 },
        { type: "小", zoom: 3 }
      ],

      //查询条件
      search: {
        principal: null,
        province: null,
        city: null,
        county: null,
        linkPeople: null,
        // community: null,
        organizationType: null,
        organizationSize: null,
        organizationName: null
      },
      //机构类型
      organizationType: [
        { type: "培训类", zoom: 1 },
        { type: "托管类", zoom: 2 }
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
      anotherData: null
    };
  },

  mounted() {
    //获取用户权限
    this.limit.add = !!!session.getItem("userlimit")[0];
    this.limit.delete = !!!session.getItem("userlimit")[1];
    this.limit.update = !!!session.getItem("userlimit")[2];
    this.limit.select = !!!session.getItem("userlimit")[3];
    this.getAddress();
    this.getControlCommunities();
  },

  methods: {
    //导出Execl
    outExcel() {
      let whereLambda = {};

      if (this.search.province) {
        whereLambda.proviceId = this.search.province.proviceId; //省份
      } else {
        whereLambda.proviceId = null;
      }
      if (this.search.city) {
        whereLambda.cityId = this.search.city.cityId; //城市
      } else {
        whereLambda.cityId = null;
      }
      if (this.search.linkPeople) {
        whereLambda.linkPeople = this.search.linkPeople; //负责人
      } else {
        whereLambda.linkPeople = null;
      }
      if (this.search.county) {
        whereLambda.countyId = this.search.county.countyId; //区县
      } else {
        whereLambda.countyId = null;
      }

      if (this.search.organizationType) {
        whereLambda.organizationType = this.search.organizationType.zoom; //机构类型
      } else {
        whereLambda.organizationType = null;
      }
      if (this.search.organizationSize) {
        whereLambda.organizationSise = this.search.organizationSize.zoom; //机构规模
      } else {
        whereLambda.organizationSise = null;
      }

      whereLambda.organizationName = this.search.organizationName || null; //机构名称

      let baseUrl = "http://192.168.3.167:8090/api/Organization/GetExcel";

      let exportArg =
        "?linkPeople=" +
        whereLambda.linkPeople +
        "&proviceId=" +
        whereLambda.proviceId +
        "&cityId=" +
        whereLambda.cityId +
        "&countyId=" +
        whereLambda.countyId +
        "&organizationSise=" +
        whereLambda.organizationSise +
        "&organizationType=" +
        whereLambda.organizationType +
        "&organizationName=" +
        whereLambda.organizationName;

      let endArg = baseUrl + exportArg;

      window.location.href = endArg;
    },
    //下载附件
    download(item) {
      console.log(item.organizationId);
      let baseUrl = "http://192.168.3.167:8090/api/Organization/Export";

      let exportArg = "?organizationId=" + item.organizationId;

      let endArg = baseUrl + exportArg;

      window.location.href = endArg;
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
      // if(this.search.community) {
      //   arg.whereLambda.communityId = this.search.community.communityId;    //社区
      // } else {
      //   arg.whereLambda.communityId = null;
      // }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId; //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      arg.whereLambda.person = this.search.principal || null; //负责人

      if (this.search.organizationType) {
        arg.whereLambda.organizationType = this.search.organizationType.zoom; //机构类型
      } else {
        arg.whereLambda.organizationType = null;
      }
      if (this.search.organizationSize) {
        arg.whereLambda.organizationSise = this.search.organizationSize.zoom; //机构规模
      } else {
        arg.whereLambda.organizationSise = null;
      }

      arg.whereLambda.organizationName = this.search.organizationName || null; //机构名称

      try {
        return new Promise((resolve, reject) => {
          organisationSeach(arg)
            .then(res => {
              const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              resolve(res);
              // console.log(res);
              let dataList = res.data.ResponseModel;
              if (dataList) {
                loading.close();
                // console.log(dataList);
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
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let proviceVal = item.proviceId;
        this.allData.proviceId = item.proviceId;
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
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      if (item) {
        let cityVal = item.cityId;
        this.allData.cityId = item.cityId;
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
          // this.modifySelection.community = null;
          break;
        default:
          console.log("wow");
          break;
      }
      this.allData.countyId = item.countyId;
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
    loding(item) {
      this.DatadialogVisible = item;
      this.allData = {
        proviceId: null,
        cityId: null,
        countyId: null,
        isDelete: 0,
        principal: null,
        organizationType: null,
        organizationName: null,
        linkPeople: null,
        telephone: null,
        contractSignDate: null,
        contractSignEndDate: null,
        contractPeopleCount: null,
        organizationSize: null
      };
    },

    async uploadfile(param) {
      // console.log(param);
      var fileObj = param.file;
      // // 接收上传文件的后台地址
      // var FileController = "http://117.34.105.87:88/api/Userphysical/Import";
      // // FormData 对象
      var form = new FormData();
      // // 文件对象
      form.append("file", fileObj);
      // // 其他参数
      // console.log(this.anotherData);
      let newData = this.anotherData;
      form.append("proviceId", newData.proviceId);
      form.append("cityId", newData.cityId);
      form.append("countyId", newData.countyId);
      form.append("person", newData.person);
      form.append("linkpeople", newData.linkpeople);
      form.append("telephone", newData.telephone);
      form.append("organizationType", newData.organizationType);
      form.append("organizationName", newData.organizationName);
      form.append("contractSignDate", newData.contractSignDate);
      form.append("contractSignEndDate", newData.contractSignEndDate);
      form.append("contractPeopleCount", newData.contractPeopleCount);
      form.append("organizationSise", newData.organizationSise);
      form.append("isDelete", newData.isDelete);
      form.append("createTime", newData.createTime);
      form.append("updateTime", newData.updateTime);

      try {
        await OrganizationOperate(form).then(res => {
          console.log(res);
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 保存合作机构
    //录入数据
    saveData() {
      // let allData = this.allData;
      let inputDatas;
      // console.log(allData);
      for (let name in allData) {
        if (allData[name] === null || allData[name] === "") {
          this.$message({
            type: "warning",
            message: "请正确填写表格！",
            center: true
          });
          return false;
        }
      }
      inputDatas = {
        proviceId: allData.proviceId,
        cityId: allData.cityId,
        countyId: allData.countyId,
        person: allData.principal,
        linkpeople: allData.linkPeople,
        telephone: allData.telephone,
        organizationType: allData.organizationType.zoom,
        organizationName: allData.organizationName,
        contractSignDate: timeFormat(allData.contractSignDate),
        contractSignEndDate: timeFormat(allData.contractSignEndDate),
        contractPeopleCount: allData.contractPeopleCount,
        organizationSise: allData.organizationSize.zoom,
        isDelete: 0,
        createTime: "",
        updateTime: ""
      };
      this.anotherData = inputDatas;
      this.$refs.upload.submit();
      //  OrganizationOperate(inputDatas)
      //     .then(res => {
      //       if (!res.data.Error) {
      //         this.$refs.upload.submit();
      //       } else {
      //         this.$message({
      //           type: "danger",
      //           message: "文件错误或重复",
      //           center: true
      //         });
      //       }
      //       this.DatadialogVisible=false
      //       setTimeout(() => {
      //                   this.$message({
      //                     type: "success",
      //                     message: "上传成功",
      //                     center: true
      //                   });
      //                   this.getControlCommunities(this.pages.currentPage, this.pages.pageSize);
      //                 },500);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    },
    //移除文件时
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    //成功上传时
    handleSuccess(file) {
      const loading = this.$loading({
        lock: true,
        text: "上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      setTimeout(() => {
        loading.close();
        this.$message({
          type: "success",
          message: "上传成功!",
          center: true
        });
        this.InputdialogVisible = false;
        for (let name in this.inputData) {
          this.inputData[name] = null;
        }
      }, 500);
    },
    //上传之前
    handleUpload(file, fileList) {
      let fileType = file.name
        .slice(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      if (fileType === "pdf" || fileType === "doc" || fileType === "docx") {
        return true;
      } else {
        this.$message({
          type: "warning",
          message: "文件格式不正确",
          center: true
        });
        return false;
      }
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
      let self = this;
      self.ModifydialogVisible = true;
      this.modifySelection.province = row.proviceName;
      self.modifySelection.proviceId = row.proviceId;
      self.modifySelection.city = row.cityName;
      self.modifySelection.county = row.countyName;
      self.modifySelection.principal = row.person;
      self.modifySelection.contractPeopleCount = row.contractPeopleCount;
      self.modifySelection.contractSignDate = row.contractSignDate;
      self.modifySelection.contractSignEndDate = row.contractSignEndDate;
      self.modifySelection.contractPeopleCount = row.contractPeopleCount;
      self.modifySelection.cityId = row.cityId;
      self.modifySelection.countyId = row.countyId;
      self.modifySelection.createTime = row.createTime || 1;
      self.modifySelection.updateTime = row.updateTime || 1;
      self.modifySelection.organizationName = row.organizationName;
      self.modifySelection.organizationType = row.organizationType;
      self.modifySelection.organizationSize = row.organizationSise;
      self.modifySelection.linkPeopleName = row.linkPeopleName;
      self.modifySelection.telephone = row.telephone;
    },
    // 修改保存
    async modifySave() {
      let modifyData = this.modifySelection;
      // console.log(modifyData);
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
      //处理省 市 县  时间格式
      if (isString(modifyData.province)) {
        allSelects = {
          proviceId: modifyData.proviceId,
          cityId: modifyData.cityId,
          countyId: modifyData.countyId
        };
      } else {
        allSelects = {
          proviceId: modifyData.province.proviceId,
          cityId: modifyData.city.cityId,
          countyId: modifyData.county.countyId
        };
      }

      allSelects.person = modifyData.principal;
      allSelects.linkpeople = modifyData.linkPeopleName;
      allSelects.telephone = modifyData.telephone;
      allSelects.organizationName = modifyData.organizationName;
      allSelects.contractPeopleCount = modifyData.contractPeopleCount;
      allSelects.isDelete = 0;
      allSelects.createTime = modifyData.createTime;
      allSelects.updateTime = modifyData.updateTime;

      // console.log(allSelects);
      //处理机构类型
      if (isString(modifyData.organizationType)) {
        switch (modifyData.organizationType) {
          case "培训类":
            allSelects.organizationType = 1;
            break;
          case "托管类":
            allSelects.organizationType = 2;
            break;
          default:
            allSelects.organizationType = 1;
            break;
        }
      } else {
        allSelects.organizationType = modifyData.organizationType.zoom;
      }

      //处理机构规模
      if (isString(modifyData.organizationSize)) {
        switch (modifyData.organizationSize) {
          case "大":
            allSelects.organizationSise = 1;
            break;
          case "中":
            allSelects.organizationSise = 2;
            break;
          case "小":
            allSelects.organizationSise = 3;
            break;
          default:
            allSelects.organizationSise = 1;
            break;
        }
      } else {
        allSelects.organizationSise = modifyData.organizationSize.zoom;
      }

      // 处理时间格式
      if (isString(modifyData.contractSignDate)) {
        allSelects.contractSignDate = modifyData.contractSignDate;
      } else {
        allSelects.contractSignDate = timeFormat(modifyData.contractSignDate);
      }

      if (isString(modifyData.contractSignEndDate)) {
        allSelects.contractSignEndDate = modifyData.contractSignEndDate;
      } else {
        allSelects.contractSignEndDate = timeFormat(
          modifyData.contractSignEndDate
        );
      }

      console.log(allSelects);

      try {
        return new Promise((resolve, reject) => {
          OrganizationOperate(allSelects)
            .then(res => {
              const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              resolve(res);
              if (!res.data.Error) {
                loading.close();
                this.$refs.upload.submit();
                this.ModifydialogVisible = false;
              } else {
                this.$message({
                  type: "danger",
                  message: "文件错误或重复",
                  center: true
                });
              }
              // setTimeout(() => {
              //   loading.close();
              //   this.$message({
              //     type: 'success',
              //     message: '修改机构成功',
              //     center: true,
              //   });
              //   this.ModifydialogVisible = false;
              //   this.getControlCommunities(this.pages.currentPage, this.pages.pageSize);
              // }, 1000);
            })
            .catch(err => {
              reject(res);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
    //删除
    async handleDelete(row) {
      if (row) {
        let deleteData = {
          isDelete: 1,
          organizationId: row.organizationId
        };

        this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            try {
              return new Promise((resolve, reject) => {
                OrganizationOperate(deleteData)
                  .then(res => {
                    const loading = this.$loading({
                      lock: true,
                      text: "加载中",
                      spinner: "el-icon-loading",
                      background: "rgba(0, 0, 0, 0.7)"
                    });
                    resolve(res);
                    if (!res.Error) {
                      setTimeout(() => {
                        loading.close();
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
    }
    //修改社区信息
    //删除社区
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
