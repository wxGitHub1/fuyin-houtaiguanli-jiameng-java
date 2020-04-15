<template>
<!-- 数据设备 -->
  <div class="container" style="height: 750px;overflow-y: scroll">
    <el-row>
      <el-col :span="24" style="border-bottom: 1px solid #EBEEF5;padding-bottom: 16px;">
        <el-row>
          <el-col :span="2" style="text-align:center">
            <el-button type="success" size="small"  @click="InputdialogVisible = true">
              录入数据
            </el-button>
            <!-- 录入数据弹出框 -->
            <el-dialog :close-on-click-modal="false" width="80%" title="数据录入" :visible.sync="InputdialogVisible">
              <el-row>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
                  <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
                </el-col>
                <el-col :span="3">
                  <el-select size="small" v-model="inputData.province" :clearable="true" value-key="proviceId" @change="getCities(inputData.province, type=3)">
                    <el-option v-for="item in provinces" :key="item.proviceId" :value="item" :label="item.proviceName">

                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
                  <span>城市:</span>
                </el-col>
                <el-col :span="3">
                  <el-select size="small" :clearable="true" value-key="cityId" v-model="inputData.city" @change="getCounty(inputData.city, type=3)">
                    <el-option v-for="item in cities" :key="item.cityId" :value="item" :label="item.cityName">

                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
                  <span>区县:</span>
                </el-col>
                <el-col :span="3">
                  <el-select :clearable="true" size="small" value-key="countyId" v-model="inputData.county" @change="getCountyId(inputData.county, type=3)">
                    <el-option v-for="item in counties" :key="item.countyId" :value="item" :label="item.countyName">

                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
                  <span>社区:</span>
                </el-col>
                <el-col :span="3">
                  <el-select :clearable="true" size="small" value-key="communityId" v-model="inputData.community">
                    <el-option v-for="item in communityList" :key="item.communityId" :value="item" :label="item.communityName">

                    </el-option>
                </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);">
                  <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                    <span>录入人:</span>
                  </el-col>
                  <el-col :span="3" style="text-align: left">
                    <el-input placeholder="请输入录入人" size="small" v-model="inputData.inputPeople"></el-input>     
                  </el-col>
                  <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
                    <span>查体时间:</span>
                  </el-col>
                  <el-col :span="3">
                    <el-date-picker
                    style="width: 100%;"
                    size="small"
                    v-model="inputData.examTime"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                    <span>季度:</span>
                  </el-col>
                  <el-col :span="3">
                    <el-select size="small" :clearable="true" value-key="zoom" v-model="inputData.quarter">
                      <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type">

                      </el-option>
                    </el-select>    
                  </el-col>
              </el-row>
              <!-- action="http://117.34.105.87:88/api/Userphysical/Import" -->
              <!-- action="http://192.168.3.220:83/api/Userphysical/Import" -->
              <el-row style="margin-top: 50px;">
                <el-col :span="5" style="margin-left: 3.6%;">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://192.168.3.220:83/api/Userphysical/Import"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :on-change="upChange"
                    :before-upload="handleUpload" 
                    :auto-upload="false"
                    multiple
                    :limit="1"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击选择</el-button>
                    <div slot="tip" class="el-upload__tip">选择上传文件</div>
                  </el-upload>
                </el-col>
              </el-row>
              <el-row class="foot_btn">
                <el-col :span="2" :offset="16">
                  <el-button @click="InputdialogVisible = false" type="success" style="width: 100%;" size="middle">返回</el-button> 
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-button style="width: 100%;" type="primary" size="middle" @click="saveData()">保存</el-button> 
                </el-col>
              </el-row>   
            </el-dialog>
          </el-col>
          <!-- 详情弹出框 -->
          <el-dialog style="text-align: center" :close-on-click-modal="false" width="80%"  title="详情数据" :visible.sync="InfodialogVisible">
              <el-row>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:10%;">
                  <span>省&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
                </el-col>
                <el-col :span="3">
                  <el-select size="small" v-model="modifyData.province" :clearable="true" value-key="proviceId" @change="getCities(modifyData.province, type=1)">
                    <el-option v-for="item in provinces" :key="item.proviceId" :value="item" :label="item.proviceName">

                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
                  <span>城市:</span>
                </el-col>
                <el-col :span="3">
                  <el-select size="small" :clearable="true" value-key="cityId" v-model="modifyData.city" @change="getCounty(modifyData.city, type=1)">
                    <el-option v-for="item in cities" :key="item.cityId" :value="item" :label="item.cityName">

                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
                  <span>区县:</span>
                </el-col>
                <el-col :span="3">
                  <el-select :clearable="true" size="small" value-key="countyId" v-model="modifyData.county" @change="getCountyId(modifyData.county, type=1)">
                    <el-option v-for="item in counties" :key="item.countyId" :value="item" :label="item.countyName">

                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left:1%;">
                  <span>社区:</span>
                </el-col>
                <el-col :span="3">
                  <el-select :clearable="true" size="small" value-key="communityId" v-model="modifyData.community">
                    <el-option v-for="item in communityList" :key="item.communityId" :value="item" :label="item.communityName">

                    </el-option>
                </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);">
                  <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                    <span>查体人:</span>
                  </el-col>
                  <el-col :span="3" style="text-align: left">
                    <el-input placeholder="请输入查体人" size="small" v-model="modifyData.examPeople"></el-input>     
                  </el-col>
                  <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
                    <span>录入人:</span>
                  </el-col>
                  <el-col :span="3" style="text-align: left">
                    <el-input placeholder="请输入录入人" v-model="modifyData.inputPeople" size="small"></el-input>     
                  </el-col>
                  <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%">
                    <span>查体时间:</span>
                  </el-col>
                  <el-col :span="3">
                    <el-date-picker
                    style="width: 100%;"
                    size="small"
                    v-model="modifyData.examTime"
                    >
                    </el-date-picker>
                  </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                    <span>客户姓名:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                    <el-input placeholder="请输入客户姓名" v-model="modifyData.clientName" size="small"></el-input>     
                </el-col>
                <el-col :span="2" style="line-height: 30px;">
                  <span>性别:</span>
                </el-col>
                <el-col :span="4" style="line-height: 30px;text-align:left;">
                  <el-radio  v-model="modifyData.sex" label="男">男</el-radio>
                  <el-radio  v-model="modifyData.sex" label="女">女</el-radio>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid rgb(228,228,228);">
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 10%;">
                    <span>联系电话:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                    <el-input placeholder="请输入联系电话" v-model="modifyData.phone" size="small"></el-input>     
                </el-col>
                <el-col :span="2" style="width: 6%;line-height: 30px;margin-left: 1%;">
                    <span>学校名称:</span>
                </el-col>
                <el-col :span="3" style="text-align: left">
                    <el-input placeholder="请输入学校名称" v-model="modifyData.schoolName" size="small"></el-input>     
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="2" :offset="2">
                  <span>病症:</span>
                </el-col>
                <el-col :span="20" style="text-align: left;">
                  <el-checkbox-group v-model="modifyData.illnessList">
                    <el-checkbox class="check_box" border  label="足弓发育不良"></el-checkbox>
                    <el-checkbox class="check_box" border  label="跟骨外翻"></el-checkbox>
                    <el-checkbox class="check_box" border  label="跟骨内翻"></el-checkbox>
                    <el-checkbox class="check_box" border  label="足内旋"></el-checkbox>
                    <el-checkbox class="check_box" border  label="足外旋"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="20" :offset="4" style="text-align: left;">
                  <el-checkbox-group v-model="modifyData.illnessList">
                    <el-checkbox class="check_box" border  label="足内翻"></el-checkbox>
                    <el-checkbox class="check_box" border  label="足外翻"></el-checkbox>
                    <el-checkbox class="check_box" border  label="膝内翻"></el-checkbox>
                    <el-checkbox class="check_box" border  label="膝外翻"></el-checkbox>
                    <el-checkbox class="check_box" border  label="驼背"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="20" :offset="4" style="text-align: left;">
                  <el-checkbox-group v-model="modifyData.illnessList">
                    <el-checkbox class="check_box" border  label="斜颈"></el-checkbox>
                    <el-checkbox class="check_box" border  label="拇外翻"></el-checkbox>
                    <el-checkbox class="check_box" border  label="膝过伸"></el-checkbox>
                    <el-checkbox class="check_box" border  label="膝屈曲"></el-checkbox>
                    <el-checkbox class="check_box" border  label="长短腿"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row style="margin-top: 30px;">
                <el-col :span="20" :offset="4" style="text-align: left;">
                  <el-checkbox-group v-model="modifyData.illnessList">
                    <el-checkbox class="check_box" border  label="鸡胸"></el-checkbox>
                    <el-checkbox class="check_box" border  label="脊柱侧弯"></el-checkbox>
                    <el-checkbox class="check_box" border  label="高低肩"></el-checkbox>
                    <el-checkbox class="check_box" border  label="骨盆倾斜"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row class="foot_btn">
                <el-col :span="2" :offset="16">
                  <el-button @click="InfodialogVisible = false" type="success" style="width: 100%;" size="middle">返回</el-button> 
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-button style="width: 100%;" type="primary" size="middle" @click="saveInputData('info')">保存</el-button> 
                </el-col>
              </el-row>
            </el-dialog>
          <el-col :span="2" style="width: 5%;line-height: 30px">
            <span>客户姓名:</span>
          </el-col>
          <el-col :span="2" style="text-align: left">
            <el-input placeholder="请输入姓名" v-model="search.clientName" size="small"></el-input>     
          </el-col>
          <el-col :span="2" style="width: 5%;line-height:30px;margin-left:1%;">
            <span>联系电话:</span>
          </el-col>
          <el-col :span="2" style="text-align: left">
            <el-input placeholder="请输入联系电话" v-model="search.phone" size="small"></el-input>     
          </el-col>
            <el-col :span="2" style="width: 4.5%;line-height: 30px;margin-left: 1%;">
              <span>录入人:</span>
          </el-col>
          <el-col :span="2" style="text-align: left">
            <el-input placeholder="输入录入人" size="small" v-model="search.inputPeople"></el-input>     
          </el-col>
          <el-col :span="2" style="width: 4.5%;line-height: 30px;margin-left: 1%;">
          <span>查体人:</span>
          </el-col>
          <el-col :span="2">
            <el-input placeholder="输入查体人" v-model="search.examPeople" size="small"></el-input>     
          </el-col>
          <el-col :span="2" style="width: 5%;line-height: 30px;margin-left:1%;">
            <span>是否异常:</span>
          </el-col>
          <el-col :span="2">
            <el-select size="small" :clearable="true" value-key="zoom" v-model="search.isDiff">
              <el-option v-for="item in isDiff" :key="item.zoom" :value="item" :label="item.type">

              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="search">
        <el-col :span="2" style="width: 5%;line-height: 30px;margin-left: 8%;">
          <span>省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
        </el-col>
        <el-col :span="2"  style="margin-left: 0.3%;">
          <el-select size="small" v-model="search.province" :clearable="true" value-key="proviceId" @change="getCities(search.province, type=2)">
            <el-option v-for="item in provinces" :key="item.proviceId" :value="item" :label="item.proviceName">

            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6%;line-height: 30px">
          <span>城市:</span>
        </el-col>
        <el-col :span="2">
          <el-select size="small" :clearable="true" value-key="cityId" v-model="search.city" @change="getCounty(search.city, type=2)">
              <el-option v-for="item in cities" :key="item.cityId" :value="item" :label="item.cityName">

              </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 4.5%;line-height: 30px">
          <span>区县:</span>
        </el-col>
        <el-col :span="2" style="margin-left: 1%;">
          <el-select :clearable="true" size="small" value-key="countyId" v-model="search.county" @change="getCountyId(search.county, type=2)">
              <el-option v-for="item in counties" :key="item.countyId" :value="item" :label="item.countyName">

              </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 4.5%;line-height: 30px">
          <span>社区:</span>
        </el-col>
        <el-col :span="2" style="margin-left: 1%">
          <el-select :clearable="true" size="small" value-key="communityId" v-model="search.community">
              <el-option v-for="item in communityList" :key="item.communityId" :value="item" :label="item.communityName">

              </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="width: 6.5%;text-align: center;line-height: 30px;">
        查体时间：
      </el-col>
      <el-col :span="2"  style="width: 7%;">
        <el-date-picker
          v-model="search.examTime"
          type="daterange"
          range-separator="至"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      </el-row>
      <el-row style="margin-top:20px;text-align: center;">
        <!-- <el-col :span="2" style="width: 6.5%;line-height: 30px">
          <span>查体周期:</span>
        </el-col>
        <el-col :span="2" style="text-align: left;width: 7%;">
          <el-select size="small" v-model="search.examCycle">
            <el-option value="[1, 2, 3]">

            </el-option>
          </el-select>     
        </el-col> -->
        <el-col :span="2" style="width: 6%;margin-left: 7.3%;text-align: center;line-height: 30px;">
        录入时间：
        </el-col>
        <el-col :span="5" style="width: 22.65%">
          <el-date-picker
            v-model="search.inputTime"
            type="daterange"
            range-separator="至"
            size="small"
            style="width: 100%"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="2" style="width: 4.5%;line-height: 30px">
          <span>季度:</span>
        </el-col>
        <el-col :span="2" style="text-align: left;margin-left: 1%">
          <el-select size="small" :clearable="true" value-key="zoom" v-model="search.quarter">
            <el-option v-for="item in season" :key="item.zoom" :value="item" :label="item.type">

            </el-option>
          </el-select>    
        </el-col>
        <el-col :span="2" style="text-align:center;margin-left: 1.3%;width: 6.5%;">
            <el-button style="width: 100%;" @click="searchData()" type="success" size="small">
              查询
            </el-button>
          </el-col>
          <el-col :span="2" style="width: 6.5%;margin-left: 1%;">
            <el-button style="width: 100%" type="danger" size="small" @click="outExcel()">
              导出Excel
            </el-button>
        </el-col>
          <el-col :span="2" style="margin-left: 1%;width: 6.5%;">
            <el-button style="width:100%" type="danger" size="small" :disabled="allDelete" @click="toggleSelection">
              批量删除
            </el-button>
          </el-col>
      </el-row>
    <el-row class="client_table" style="min-height: 580px;">
        <el-col :span="24">
          <el-table :border="true" ref="multipleTable" :data="clientData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column width="60" align="center" type="index" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="userName" label="客户姓名" min-width="60"></el-table-column>
            <el-table-column align="center" prop="patriarchicPhone" label="联系方式" min-width="60"></el-table-column>
            <el-table-column align="center" prop="countyName" label="所属区域" min-width="80"></el-table-column>
            <el-table-column align="center" prop="communityName" label="社区" min-width="80"></el-table-column>
            <el-table-column align="center" prop="inputPeople" label="录入人" min-width="80"></el-table-column>
            <el-table-column align="center" prop="quarter" label="季度" min-width="80"></el-table-column>
            <el-table-column align="center" prop="bandyleg" label="膝内翻" min-width="60"></el-table-column>
            <el-table-column align="center" prop="genyleg" label="膝外翻" min-width="60"></el-table-column>
            <el-table-column align="center" prop="torticollis" label="膝过伸" min-width="60"></el-table-column>
            <el-table-column align="center" prop="leftArchesValue" label="左足弓指数" min-width="60"></el-table-column>
            <el-table-column align="center" prop="rightArchesValue" label="右足弓指数" min-width="60"></el-table-column>
            <el-table-column align="center" prop="leftCalcanValue" label="左跟骨指数" min-width="60"></el-table-column>
            <el-table-column align="center" prop="leftCalcanValue" label="右跟骨指数" min-width="60"></el-table-column>
            <el-table-column align="center" prop="torticollis" label="斜颈" min-width="60"></el-table-column>
            <el-table-column align="center" prop="chickenbreast" label="鸡胸" min-width="60"></el-table-column>
            <el-table-column align="center" prop="Scoliosis" label="脊柱侧弯" min-width="60"></el-table-column>
            <el-table-column align="center" prop="bak" label="其他病情" min-width="60"></el-table-column>
            <el-table-column align="center" prop="isstandard" label="存在异常" min-width="60"></el-table-column>
            <el-table-column align="center" prop="sysUserName" label="测评人员" min-width="60"></el-table-column>
            <el-table-column align="center" prop="physicalTime" label="测评时间" min-width="80"></el-table-column>
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
          :total="pages.total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getProvince, getCity, getCountys, addCommunity, getCommunity, getOutCommunity} from '../../../api/address';
import { outputNurseryData, addNurseryData, inputStatus, inputRepeat, getDataDevice, outworkNurseDataDelete } from '../../../api/datalist';
import session from '../../../utils/session';
import { all, Promise } from 'q';
import { timeFormat, dateFormat } from '../../../utils/timeformat';

export default {
  name: 'App',
  data() {
      return {
        clientData: [],
        clientChoseDate: '',
        date: '',
        //分页
        pages: {
          total: 30,
          pageSize: 10,
          currentPage: 1,
        },
        //录入数据弹出框
        InputdialogVisible: false,
        // 详情弹出框
        InfodialogVisible: false,
        // 上传文件
        fileList: [],
        //多选
        multipleSelection: [],
        //选择性别
        radio: 'man',
        //病症
        checkList: [],
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
        //社区列表
        communityList: null,
        //查询数据
        search: {
          clientName: null,
          phone: null,
          isArrive: null,
          inputPeople: null,
          province: null,
          city: null,
          county: null,
          community: null,
          examPeople: null,
          examTime: null,
          inputTime: null,
          quarter: null,
          isDiff: null,
        },
        isMember: '',
        //季度
        season: [
          { type: '春季', zoom: 1},
          { type: '秋季', zoom: 2 },
        ],
        //是否到访
        isVisit: [
          { type: '是', zoom: 1 },
          { type: '否', zoom: 2 },
        ],
        //是否异常
        isDiff: [
          { type: '是', zoom: 1 },
          { type: '否', zoom: 2 },
        ],
        //体检时间
        examTime: null,
        //录入时间
        inputTime: null,
        // 录入数据
        inputData: {
          province: null,
          city: null,
          community: null,
          county: null,
          inputPeople: null,
          examTime: null,
          quarter: null,
        },
        //数据详情与修改
        modifyData: {
          province: null,
          city: null,
          community: null,
          county: null,
          examPeople: null,
          inputPeople: null,
          examTime: null,
          clientName: null,
          sex: '男',
          phone: null,
          schoolName: null,
          illnessList: [],
        },
        //问题人数添加状态
        countStatus: 0,
        //批量删除状态
        allDelete: true,
      }
  },
  mounted() {
    //获取列表
    this.getControlCommunities();
    //获取地址
    this.getAddress();
  },
  methods: {
    //导出Execl
    outExcel() {
      let arg = {
        whereLambda: {
          
        }
      }
      if(this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId;     //省份
      } else {
        arg.whereLambda.proviceId = null;   
      }
      if(this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId;                 //城市
      } else {
        arg.whereLambda.cityId = null;   
      }
      if(this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId;  //社区     
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId;          //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      arg.whereLambda.userName = this.search.clientName || null;     //客户姓名

      arg.whereLambda.patriarchicPhone = this.search.phone || null;         //联系电话

      arg.whereLambda.isVisit = this.search.isArrive || null;        //是否到访

      
      if(this.search.examTime) {
        let result = dateFormat(this.search.examTime[0], this.search.examTime[1]);
        arg.whereLambda.physicalBeginTime = result.beginTimes || null;   //体检开始时间
        arg.whereLambda.physicalEndTime = result.endTimes || null;     //体检结束时间
      } else {
        arg.whereLambda.physicalStartTime = null;
        arg.whereLambda.physicalEndTime = null;
      }

      if(this.search.inputTime) {
        let result = dateFormat(this.search.inputTime[0], this.search.inputTime[1])
        arg.whereLambda.inputBeginTime  = result.beginTimes || null;    //录入开始时间
        arg.whereLambda.inputEndTime = result.endTimes || null;       //录入结束时间  
      } else {
        arg.whereLambda.inputBeginTime = null;
        arg.whereLambda.inputEndTime = null;  
      }

      arg.whereLambda.sysUserName = this.search.examPeople || null;           //体检人

      arg.whereLambda.inputPeople = this.search.inputPeople || null;          //录入人

      if(this.search.quarter) {
        arg.whereLambda.quarter = this.search.quarter.zoom;                    //季度
      } else {
        arg.whereLambda.quarter = null;   
      }

      if(this.search.isArrive) {
        arg.whereLambda.isVisit = this.search.isArrive.zoom;             //是否到访
      } else {
        arg.whereLambda.isVisit = null;
      }

      if(this.search.isDiff) {
        arg.whereLambda.isstandard = this.search.isDiff.zoom;             //是否异常
      } else {
        arg.whereLambda.isstandard = null;
      }

      arg.whereLambda.bak = this.search.illness || null;


      // let baseUrl = 'http://192.168.3.220:83/api/Userphysical/ExportOutUserphysicals';
      // let baseUrl = 'http://117.34.105.87:88/api/Userphysical/ExportOutUserphysicals';

      let baseUrl = 'http://117.34.105.87:88/api/Userphysical/ExportOutUserphysicals';
        
      let exportArg = '?userName=' + arg.whereLambda.userName + '&patriarchicPhone=' + arg.whereLambda.patriarchicPhone + '&isVisit=' + arg.whereLambda.isVisit + '&inputPeople=' + arg.whereLambda.inputPeople + '&bak=' + arg.whereLambda.bak + '&proviceId=' + arg.whereLambda.proviceId + '&cityId=' + arg.whereLambda.cityId + '&countyId=' + arg.whereLambda.countyId + '&communityId=' + arg.whereLambda.communityId + '&sysUserName=' + arg.whereLambda.sysUserName + '&physicalPeriod=' + null + '&physicalBeginTime=' + arg.whereLambda.physicalStartTime + '&physicalEndTime=' + arg.whereLambda.physicalEndTime + '&inputBeginTime=' + arg.whereLambda.inputBeginTime + '&inputEndTime=' + arg.whereLambda.inputEndTime + '&quarter=' + arg.whereLambda.quarter;

      let endArg = baseUrl + exportArg;

      window.location.href = endArg;
        
    },

    //获取列表
    async getControlCommunities(pageIndex=1, pageSize=10) {
      let arg = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        whereLambda: {
           
        }
      }
      if(this.search.province) {
        arg.whereLambda.proviceId = this.search.province.proviceId;     //省份
      } else {
        arg.whereLambda.proviceId = null;   
      }
      if(this.search.city) {
        arg.whereLambda.cityId = this.search.city.cityId;                 //城市
      } else {
        arg.whereLambda.cityId = null;   
      }
      if(this.search.community) {
        arg.whereLambda.communityId = this.search.community.communityId;  //社区     
      } else {
        arg.whereLambda.communityId = null;
      }
      if (this.search.county) {
        arg.whereLambda.countyId = this.search.county.countyId;          //区县
      } else {
        arg.whereLambda.countyId = null;
      }

      arg.whereLambda.userName = this.search.clientName || null;     //客户姓名

      arg.whereLambda.patriarchicPhone = this.search.phone || null;         //联系电话

      arg.whereLambda.isVisit = this.search.isArrive || null;        //是否到访

      
      if(this.search.examTime) {
        let result = dateFormat(this.search.examTime[0], this.search.examTime[1]);
        arg.whereLambda.physicalBeginTime = result.beginTimes || null;   //体检开始时间
        arg.whereLambda.physicalEndTime = result.endTimes || null;     //体检结束时间
      } else {
        arg.whereLambda.physicalStartTime = null;
        arg.whereLambda.physicalEndTime = null;
      }

      if(this.search.inputTime) {
        let result = dateFormat(this.search.inputTime[0], this.search.inputTime[1])
        arg.whereLambda.inputBeginTime  = result.beginTimes || null;    //录入开始时间
        arg.whereLambda.inputEndTime = result.endTimes || null;       //录入结束时间   
      } else {
        arg.whereLambda.inputBeginTime = null;
        arg.whereLambda.inputEndTime = null;  
      }

      arg.whereLambda.sysUserName = this.search.examPeople || null;            //体检人

      arg.whereLambda.inputPeople = this.search.inputPeople || null;          //录入人

      if(this.search.quarter) {
        arg.whereLambda.quarter = this.search.quarter.zoom;                    //季度
      } else {
        arg.whereLambda.quarter = null;   
      }

      if(this.search.isArrive) {
        arg.whereLambda.isVisit = this.search.isArrive.zoom;             //是否到访
      } else {
        arg.whereLambda.isVisit = null;
      }


      if(this.search.isDiff) {
        arg.whereLambda.isstandard = this.search.isDiff.zoom;            //是否异常
      } else {
        arg.whereLambda.isstandard = null;
      }


      
      try {
        return new Promise((resolve, reject) => {
          getDataDevice(arg).then(res => {
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            resolve(res);
            let dataList = res.data.ResponseModel;
            if(dataList) {
              setTimeout(() => {
                loading.close();
                // debugger
                this.clientData = dataList.list;
                this.pages.total = dataList.total;
              }, 500);
            } else {
              this.clientData = null;
              this.pages.total = 0;
              loading.close();
            }
          }).catch(err => {
            reject(err);
          })
        })
      } catch(err) {
        console.log(err);
      }
    },

    //查询数据
    async searchData() {
      this.getControlCommunities(); 
    }, 

       //获取省份
    async getAddress() {
      try {
        return new Promise((resolve, reject) => {
          getProvince().then(res => {
            resolve(res);
            this.provinces = res.data.ResponseModel;
          }).catch(err => {
            reject(err);
          })
        })
      } catch(e) {
        console.log(e);
      }
    },
    //获取城市

    async getCities(item, type) {
      //根据类型判断重载机制
      switch(type) {
        case 1:
          this.modifyData.city = null;
          this.modifyData.county = null;
          this.modifyData.community = null;
          break;
        case 2:
          this.search.city = null;
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.inputData.city = null;
          this.inputData.county = null;
          this.inputData.community = null;
          break;
        default:
          console.log('wow');
          break;
      }
      if (item) {
        let proviceVal = item.proviceId;
        // this.addNewList.proviceId = item.proviceId;
        try {
          return new Promise((resolve, reject) => {
            getCity({"proviceId" : proviceVal}).then(res => {
              resolve(res);
              this.cities = res.data.ResponseModel;
            }).catch(err => {
              reject(err);
            })
          })
        } catch(err) {
          console.log(err);
        }
      }
    },
    //获取区县
    async getCounty(item, type) {
      switch(type) {
        case 1:
          this.modifyData.county = null;
          this.modifyData.community = null;
          break;
        case 2:
          this.search.county = null;
          this.search.community = null;
          break;
        case 3:
          this.inputData.county = null;
          this.inputData.community = null;
          break;
        default:
          console.log('wow');
          break;
      }
      if (item) {
        let cityVal = item.cityId;
        // this.addNewList.cityId = item.cityId;
        try {
          return new Promise((resolve, reject) => {
            getCountys({ "cityId": cityVal }).then(res => {
              resolve(res);
              this.counties = res.data.ResponseModel;
            }).catch(err => {
              console.log(err);
            })
          }).catch(err => {
            reject(err);
          })
        } catch(err) {
          console.log(err);
        }
      }
    },

    //获取区县Id
    getCountyId(item, type) {
      switch(type) {
        case 1:
          this.modifyData.community = null;
          break;
        case 2:
          this.search.community = null;
          break;
        case 3:
          this.inputData.community = null;
          break;
        default:
          console.log('wow');
          break;
      }
      // this.addNewList.countyId = item.countyId;
      // 获取社区
      if (item) {
        let countyVal = item.countyId;

        try {
          return new Promise((resolve, reject) => {
            getOutCommunity({ "countyId": countyVal }).then(res => {
              resolve(res);
              if(res.data.Error){
                this.communityList = null;
                return null;
              } else {
                this.communityList = res.data.ResponseModel.list;
              }
            }).catch(err => {
              console.log(err);
            })
          }).catch(err => {
            reject(err);
          })
        } catch(err) {
          console.log(err);
        }
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
    upChange(file, fileList){
      debugger
    },
    //移除文件时
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    //成功上传时
    handleSuccess(file) {
        const loading = this.$loading({
          lock: true,
          text: '上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        setTimeout(() => {
          loading.close();
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true,
          })
          this.$refs.upload.clearFiles();
          this.InputdialogVisible = false;
          this.getControlCommunities()
          for(let name in this.inputData){
            this.inputData[name] = null;
          }
          
        }, 500)
    },
    //上传之前
    handleUpload(file, fileList) {
        let fileType = (file.name).slice(((file.name).lastIndexOf(".") + 1)).toLowerCase();
        if(fileType === 'csv') {
          return true
        } else {
          this.$message({
            type: 'warning',
            message: '文件格式不正确',
            center: true,
          });
          return false;
        }
    },

        //批量删除
    toggleSelection() {

      let self = this;
      //数组去重
      // function distinct() {
      //   return Array.from(new Set([...self.multipleSelection]));
      // }
      let data = [];

      self.multipleSelection.map((item) => {
        data.push(item.userphysicalId);
      });

      let arg = {
        'userphysicalIds' : data
      }

      self.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        try{
          return new Promise((resolve, reject) => {
            outworkNurseDataDelete(arg).then(res => {
              const loading = this.$loading({
                    lock: true,
                    text: '加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
              });
              resolve(res);
              if(!res.Error) {
                setTimeout(() => {
                  loading.close();
                  this.$message({
                    type: 'success',
                    message: '删除成功！',
                    center: true
                  })
                  this.getControlCommunities(this.pages.currentPage, this.pages.pageSize);
                }, 500);
              }
            })
          })
        } catch(err) {
          console.log(err);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
    },

    handleSelectionChange(val) {
      let self = this;
      //更改删除按钮状态
      val.length === 0 ? self.allDelete = true : self.allDelete = false;
      if(val) {
        //将勾选的数据传入数组中
        self.multipleSelection = val;
      }
    },

    //获取详情
    handleOrder(item) {
      this.InfodialogVisible = true;
      if(item) {
        this.modifyData.province = item.proviceName;
        this.modifyData.city = item.cityName;
        this.modifyData.community = item.communityName;
        this.modifyData.county = item.countyName;
        this.modifyData.examPeople = item.sysUserName;
        this.modifyData.inputPeople = item.inputPeople;
        this.modifyData.examTime = item.inputTime;
        this.modifyData.clientName = item.userName;
        this.modifyData.sex = item.sex;
        this.modifyData.sex = item.sex;
        this.modifyData.phone = item.patriarchicPhone;
        this.modifyData.schoolName = item.schoolId;
        if(item.bak) {
          this.modifyData.illnessList = item.bak.split(',');
        }
      }
    },

    //删除
    handleDelete(item) {
      this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },

    // async saveData() {
    //   this.$refs.upload.submit();
    // },

    //录入数据
    async saveData() {
      let allData = this.inputData;
      for(let name in allData) {
        if ( allData[name] === null || allData[name] === "") {
          this.$message({
            type: 'warning',
            message: '请正确填写表格！',
            center: true,
          })
        return false;
        }
      }
      if(allData.examTime && allData.examTime.length === undefined) {
        allData.examTime = timeFormat(allData.examTime);
      }  
      let inputDatas = {
        proviceId: allData.province.proviceId,
        cityId: allData.city.cityId,
        countyId: allData.county.countyId,
        communityId: allData.community.communityId,
        physicalTime: allData.examTime,
        inputPeople: allData.inputPeople,
        quarter: allData.quarter.zoom,
      };
      try{
        await inputRepeat(inputDatas).then(res => {
          if(!res.data.Error) {
            this.$refs.upload.submit();
          } else {
            this.$message({
              type: 'danger',
              message: '文件错误或重复',
              center: true,
            })
          }
        }).catch(err => {
          console.log(err);
        })
      } catch(err) {
        console.log(err); 
      }
      
    },
    //结束本次录入
    async endInput() {
      let uid = session.getItem('user');
      let arg = {
        uId: uid,
        ope: 1,
      }
      this.$confirm('此操作将结束你的录入状态，是否继续？','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        try {
          return new Promise((resolve, reject) => {
            inputStatus(arg).then(res => {
              const loading = this.$loading({
                lock: true,
                text: '保存中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              resolve(res);
              if(!res.data.Error) {
                this.countStatus = 0;
                setTimeout(() => {
                    loading.close();
                    this.$message({
                      type: 'success',
                      message: '已结束录入！',
                      center: true,
                    });
                    this.InputdialogVisible = false;
                }, 1000);
              }
              
            }).catch(err => {
              reject(err);
            })
          }) 
        } catch(err) {
          console.log(err)
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消！',
            center: true,
        })
      })
    }

  }
};
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  .search{
    text-align: center;
    padding-top: 16px;
  }
  .another_row{
    text-align: center;
    margin-top: 20px;
    span{
      line-height: 30px;
    }
  }
  .client_table{
    margin-top: 20px;
  }
  .pagination{
    margin-top: 10px;
    text-align: center;
  }
  .check_box{
    width: 13%;
  }
  .foot_btn{
    margin: 20px 0 0 0;
  }
}
</style>