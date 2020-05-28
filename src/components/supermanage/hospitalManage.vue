<template>
  <!-- 医院管理 -->
  <div>
    <!-- seach -->
    <el-form :inline="true" :model="seachFome" id="search" size="small" class="padding-LR-p10">
      <el-form-item label="省份">
        <el-select
          clearable
          class="w-150"
          v-model="seachFome.fom1.value"
          placeholder="请选择"
          @change="cityList(seachFome.fom1.value)"
        >
          <el-option
            v-for="item in seachFome.fom1.select"
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
          v-model="seachFome.fom2.value"
          placeholder="请先选择省份"
          @change="hospitalList(seachFome.fom2.value)"
        >
          <el-option
            v-for="item in seachFome.fom2.select"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评中心">
        <el-select clearable class="w-150" v-model="seachFome.siteIdValue" placeholder="请先选择城市">
          <el-option
            v-for="item in seachFome.siteIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院名称">
        <el-select clearable class="w-150" v-model="seachFome.fom3.value" placeholder="请先选择城市">
          <el-option
            v-for="item in seachFome.fom3.select"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院类型">
        <el-select clearable class="w-150" v-model="seachFome.hospitalTypeValue" placeholder="请先选择">
          <el-option
            v-for="item in seachFome.hospitalTypeLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生">
        <el-input clearable class="w-150" v-model="seachFome.doctors" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input clearable class="w-150" v-model="seachFome.principal" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="当前职称" class="job">
        <el-select clearable class="w-150" v-model="seachFome.fom4.value" placeholder="请选择">
          <el-option
            v-for="item in seachFome.fom4.select"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="warning"
          icon="el-icon-search"
          @click="pageList(pages.currentPage,pages.pageSize)"
        >查询</el-button>
        <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addDialog()">新增医院</el-button>
        <el-button type="danger" icon="el-icon-download" @click="exportExcels()">导出excel</el-button>
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
      <el-table-column width="50" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="hospitalNum" label="医院编号" width="150"></el-table-column>
      <el-table-column align="center" prop="provinceName" label="省份" width="100"></el-table-column>
      <el-table-column align="center" prop="cityName" label="城市" width="100"></el-table-column>
      <el-table-column align="center" prop="hospitalName" label="医院" width="150"></el-table-column>
      <el-table-column align="center" prop="typeName" label="医院类型" width="100"></el-table-column>
      <el-table-column align="center" prop="sysUserCount" label="负责人数量" width="100"></el-table-column>
      <el-table-column align="center" prop="departmentCount" label="科室数量" width="100"></el-table-column>
      <el-table-column align="center" prop="doctorCount" label="医生数量" width="100"></el-table-column>
      <el-table-column align="center" prop="address" label="医院地址"></el-table-column>
      <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
      <el-table-column align="center" label="操作" width="450">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="addDepartments(scope.row.id)"
            icon="el-icon-circle-plus-outline"
            size="small"
          >添加科室</el-button>
          <el-button
            type="primary"
            @click="addDoctors(scope.row.id)"
            icon="el-icon-circle-plus-outline"
            size="small"
          >添加医生</el-button>
          <el-button
            type="info"
            @click="details(scope.row.id)"
            icon="el-icon-document"
            size="small"
          >详情</el-button>
          <el-button
            type="danger"
            @click="handleOrder4(scope.row.id)"
            icon="el-icon-delete"
            size="small"
          >删除</el-button>
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
    <!-- dialog 新增医院 -->
    <el-dialog
      :title="yyTitle"
      :visible.sync="dialogFormVisible"
      center
      :close-on-click-modal="false"
      :before-close="resetForm"
    >
      <el-form
        :model="dialogForm"
        ref="dialogForm"
        :inline="true"
        size="mini"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="省份" prop="provinceValue">
          <el-select
            clearable
            v-model="dialogForm.provinceValue"
            placeholder="请选择"
            @change="cityList(dialogForm.provinceValue)"
          >
            <el-option
              v-for="item in dialogForm.province.select"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="citysValue">
          <el-select
            clearable
            v-model="dialogForm.citysValue"
            @change="hospitalList(dialogForm.citysValue)"
            placeholder="请先选择省份"
          >
            <el-option
              v-for="item in dialogForm.citys.select"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测评中心" prop="siteIdValue">
          <el-select clearable v-model="dialogForm.siteIdValue" placeholder="请先选择城市">
            <el-option
              v-for="item in dialogForm.siteIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院类型" prop="hospitalTypeValue">
          <el-select clearable v-model="dialogForm.hospitalTypeValue" placeholder="请选择">
            <el-option
              v-for="item in dialogForm.hospitalType.select"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称" prop="hospitalName">
          <el-input
            v-model="dialogForm.hospitalName"
            autocomplete="off"
            placeholder="请输入医院名称"
            style="width:193px"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            v-model="dialogForm.address"
            autocomplete="off"
            placeholder="请输入地址"
            style="width:193px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-check"
          v-if="yyAddBut"
          @click="addHospitals('dialogForm')"
        >保存</el-button>
        <el-button
          type="success"
          v-else
          @click="addHospitals('dialogForm','modefiyHospital')"
          icon="el-icon-circle-check"
        >保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加和修改科室 -->
    <el-dialog
      :title="ksTitle"
      :visible.sync="keshiDialog"
      center
      :close-on-click-modal="false"
      :before-close="cancelKs"
    >
      <div class="center">
        科室名称：
        <el-input class="input-p80" placeholder="请输入科室名称" v-model="keshi" size="mini" clearable></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelKs" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          v-if="ksAddBut"
          type="success"
          @click="addKs(true)"
          icon="el-icon-circle-check"
        >保存</el-button>
        <el-button v-else type="success" @click="addKs(false)" icon="el-icon-circle-check">保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加负责人-->
    <el-dialog
      title="添加负责人"
      :visible.sync="fzrDialog"
      center
      :close-on-click-modal="false"
      :before-close="cancelFzr"
    >
      <div class="center">
        负责人：
        <el-select clearable v-model="fzr.fzrValue" placeholder="请选择" size="mini" class="input-p80">
          <el-option
            v-for="item in fzr.select"
            :key="item.id"
            :label="item.userName"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFzr" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" @click="addFzr" icon="el-icon-circle-check">保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加医生 -->
    <el-dialog
      :title="ysTitle"
      :visible.sync="yishengDialog"
      center
      :close-on-click-modal="false"
      :before-close="canceYs"
    >
      <el-form :inline="true" :model="addDoctor" size="mini" ref="addDoctor" :rules="rulesYs">
        <el-form-item label="医生姓名" prop="name">
          <el-input v-model="addDoctor.name" placeholder="请输入医生姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属科室" prop="keshiValue">
          <el-select v-model.number="addDoctor.keshiValue" placeholder="请选择" clearable>
            <el-option
              v-for="item in addDoctor.keshi.select"
              :key="item.departmentId"
              :label="item.departmentName"
              :value="item.departmentId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医生电话" prop="phone">
          <el-input v-model.number="addDoctor.phone" placeholder="请输入医生电话" clearable></el-input>
        </el-form-item>
        <el-form-item label="当前职称" prop="zhichengValue">
          <el-select clearable v-model="addDoctor.zhichengValue" placeholder="请选择">
            <el-option
              v-for="item in addDoctor.zhicheng.select"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canceYs()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          type="success"
          v-if="ysAddBut"
          @click="addYs('addDoctor')"
          icon="el-icon-circle-check"
        >保存</el-button>
        <el-button
          type="success"
          v-else
          @click="addYs('addDoctor','modefiyDocter')"
          icon="el-icon-circle-check"
        >保存</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      title="基本信息"
      :visible.sync="xiangqingDialog"
      center
      :close-on-click-modal="false"
      :before-close="xqcancel"
      width="70%"
      top="5vh"
    >
      <h3 class="b-b-p-1">医院信息</h3>
      <el-table :border="true" :data="hospitalData" max-height="300">
        <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
        <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="name" label="医院"></el-table-column>
        <el-table-column align="center" prop="typeName" label="医院类型"></el-table-column>
        <el-table-column align="center" prop="address" label="医院地址"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="addDialog(scope.row,true)"
              icon="el-icon-edit"
              size="small"
              plain
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="b-b-p-1">
        科室信息
        <el-button
          type="warning"
          icon="el-icon-circle-plus-outline"
          @click="addDepartments(hospitalId)"
          size="mini"
          class="right"
        >新增科室</el-button>
      </h3>
      <el-table :border="true" :data="departmentData" max-height="300">
        <el-table-column align="center" prop="departmentName" label="科室名称"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="addDepartments(scope.row.hospitalId,scope.row.departmentId,true,scope.row.departmentName,false)"
              size="small"
              icon="el-icon-edit"
              plain
            >修改</el-button>
            <el-button
              type="danger"
              @click="ksDelet(scope.row.departmentId)"
              icon="el-icon-delete"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="b-b-p-1">
        医生信息
        <el-button
          type="warning"
          icon="el-icon-circle-plus-outline"
          @click="addDoctors(hospitalId)"
          size="mini"
          class="right"
        >新增医生</el-button>
      </h3>
      <el-table :border="true" :data="doctorsData" max-height="300">
        <el-table-column align="center" prop="doctorName" label="医生姓名"></el-table-column>
        <el-table-column align="center" prop="departmentName" label="所属科室"></el-table-column>
        <el-table-column align="center" prop="mobile" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="technicalName" label="当前职称"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="addDoctors(null,scope.row,true)"
              icon="el-icon-edit"
              size="small"
              plain
            >修改</el-button>
            <el-button
              type="danger"
              @click="ysDelet(scope.row.doctorId)"
              icon="el-icon-delete"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="b-b-p-1">
        负责人信息
        <el-button
          type="warning"
          icon="el-icon-circle-plus-outline"
          @click="addprincipal(hospitalData[0].id)"
          size="mini"
          class="right"
        >新增负责人</el-button>
      </h3>
      <el-table :border="true" :data="principalData" max-height="300">
        <el-table-column align="center" prop="username" label="负责人姓名"></el-table-column>
        <el-table-column align="center" prop="telephone" label="电话"></el-table-column>
        <!-- <el-table-column align="center" prop="zh" label="帐号"></el-table-column>
        <el-table-column align="center" prop="qx" label="权限"></el-table-column>-->
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="fzrDelet(scope.row.id)"
              size="small"
              icon="el-icon-delete"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xqcancel" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" @click="xqSave" icon="el-icon-circle-check">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getProvinceList,
  getCityList,
  getHospitalList,
  GetHospitalTypeList,
  selectByPage,
  getTechnicalList,
  getUserListForUserHospital,
  addHospital,
  updateHospital,
  deleteHospital,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  addDoctor,
  deleteDoctor,
  updateDoctor,
  selectDepartmentByHospitalId,
  hospitalDetail,
  deleteUserHospitalById,
  addSysUserHospital,
  exportExcel
} from "../../api/javaApi";
import javaApi from "../../api/javaApi";
import { exportMethod, site, allSite, hospital } from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "hospitalManage",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback();
        // callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      clientData: null,
      seachFome: {
        fom1: {
          select: null,
          value: ""
        },
        fom2: {
          select: null,
          value: ""
        },
        fom3: {
          select: null,
          value: ""
        },
        fom4: {
          select: null,
          value: ""
        },
        doctors: "",
        principal: "",
        siteIdList: [],
        siteIdValue: null,
        hospitalTypeLists: [
          { name: "综合", id: 1 },
          { name: "自营", id: 3 },
          { name: "外包", id: 2 }
        ],
        hospitalTypeValue: null
      },
      keshi: "",
      dialogFormVisible: false,
      keshiDialog: false, //科室dialog
      yishengDialog: false, //医生dialog
      fzrDialog: false, //负责人dialog
      xiangqingDialog: false, //详情dialog
      //添加医生
      addDoctor: {
        name: "",
        phone: "",
        keshiValue: "",
        zhichengValue: "",
        keshi: {
          select: null
        },
        zhicheng: {
          select: null
        }
      },
      dialogForm: {
        province: {
          select: null
        },
        citys: {
          select: null
        },
        hospitalType: {
          select: null
        },
        hospitalName: "",
        address: "",
        provinceValue: "",
        citysValue: "",
        hospitalTypeValue: "",
        siteIdList: [],
        siteIdValue: null
      },
      hospitalData: null,
      departmentData: null,
      doctorsData: null,
      principalData: null,
      fzr: {
        select: [],
        fzrValue: ""
      },
      //分页
      pages: {
        total: 20,
        pageSize: 10,
        currentPage: 1
      },
      province: null, //省
      city: "", //市
      help1: null,
      help2: null,
      help3: null,
      help4: null,
      hospitalId: null,
      ksTitle: "添加科室",
      ksAddBut: true,
      yyTitle: "添加医院",
      yyAddBut: true,
      ysTitle: "添加医生",
      ysAddBut: true,
      //表单验证
      rules: {
        hospitalName: [
          { required: true, message: "请输入医院名称", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        provinceValue: [
          {
            required: true,
            message: "请选择省份",
            trigger: "change",
            type: "number"
          }
        ],
        citysValue: [
          {
            required: true,
            message: "请选择城市",
            trigger: "change",
            type: "number"
          }
        ],
        siteIdValue: [
          {
            required: true,
            message: "请选择测评中心",
            trigger: "change",
            type: "number"
          }
        ],
        hospitalTypeValue: [
          {
            required: true,
            message: "请选择医院类型",
            trigger: "change",
            type: "number"
          }
        ]
      },
      rulesYs: {
        name: [{ required: true, message: "请输入医生姓名", trigger: "blur" }],
        keshiValue: [
          {
            required: true,
            message: "请选择科室",
            trigger: "change",
            type: "number"
          }
        ],
        phone: [{ required: false, validator: checkPhone, trigger: "blur" }],
        zhichengValue: [
          {
            required: true,
            message: "请选择职称",
            trigger: "change",
            type: "number"
          }
        ]
      },
      loading: true
    };
  },
  mounted() {
    this.provinceList();
    this.pageList();
    this.technicalList();
    this.hospitalTypeList();
  },
  methods: {
    //添加负责人弹框
    addprincipal(id) {
      this.fzrDialog = true;
      this.help3 = id;
      let data = {
        hospitalId: this.hospitalId
      };
      getUserListForUserHospital(data)
        .then(res => {
          // debugger;
          this.fzr.select = res.data.data;
          if (this.fzr.select.length == 0) {
            this.$message({
              type: "info",
              message: "没有负责人可选！"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加负责人
    addFzr() {
      let data = {
        userId: this.fzr.fzrValue,
        hospitalId: this.hospitalId
      };
      addSysUserHospital(data)
        .then(res => {
          this.cancelFzr();
          this.details(this.hospitalId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消负责人
    cancelFzr() {
      this.fzr.fzrValue = null;
      this.help3 = null;
      this.fzrDialog = false;
    },
    //删除负责人
    fzrDelet(id) {
      let data = {
        userId: id,
        hospitalId: this.hospitalId
      };
      this.$confirm("此操作将永久删除该信息, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUserHospitalById(data)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功！",
                center: true
              });
              this.details(this.hospitalId);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 添加和修改科室弹框
    addDepartments(
      id = null,
      ksid = null,
      judge = false,
      name = null,
      addOrModfiyBut = true
    ) {
      // debugger;
      if (judge) {
        this.ksTitle = "修改科室";
      } else {
        this.ksTitle = "添加科室";
      }
      this.ksAddBut = addOrModfiyBut;
      if (id !== null) {
        this.hospitalId = id;
      }
      this.hospitalId = id;
      this.help1 = ksid;
      this.keshi = name;
      this.keshiDialog = true;
    },
    //添加科室和修改科室
    addKs(mark) {
      // debugger;
      if (this.keshi !== null) {
        if (mark) {
          let data = {
            hospitalId: this.hospitalId,
            departmentName: this.keshi
          };
          addDepartment(data)
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
                  message: "添加成功！",
                  center: true
                });
                this.cancelKs();
                this.details(this.hospitalId, "dialogHide");
                this.pageList(this.pages.currentPage, this.pages.pageSize);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          let data = {
            departmentId: this.help1,
            departmentName: this.keshi
          };
          // debugger;
          updateDepartment(data)
            .then(res => {
              this.cancelKs();
              this.details(this.hospitalId);
              this.pageList(this.pages.currentPage, this.pages.pageSize);
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
    //删除科室
    ksDelet(id) {
      let data = {
        departmentId: id
      };
      this.$confirm("此操作将永久删除该信息, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDepartment(data)
            .then(res => {
              // debugger;
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.$message({
                  type: "success",
                  message: "删除成功！",
                  center: true
                });
                this.details(this.hospitalId);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 取消添加科室
    cancelKs() {
      this.keshi = null;
      this.help1 = null;
      this.keshiDialog = false;
    },
    // 添加医生弹框
    addDoctors(id = null, ysData = null, judge = false) {
      if (judge) {
        this.ysAddBut = false;
        this.ysTitle = "修改医生";
      } else {
        this.ysAddBut = true;
        this.ysTitle = "添加医生";
      }
      if (id !== null) {
        this.hospitalId = id;
      } else {
        this.hospitalId = ysData.hospitalId;
      }
      // debugger
      this.yishengDialog = true;
      let data = {
        hospitalId: this.hospitalId
      };
      // debugger;
      selectDepartmentByHospitalId(data)
        .then(res => {
          this.addDoctor.keshi.select = res.data.data.departments;
        })
        .catch(err => {
          console.log(err);
        });
      if (ysData !== null) {
        this.help4 = ysData.doctorId;
        this.addDoctor.name = ysData.doctorName;
        this.addDoctor.phone = ysData.mobile;
        this.addDoctor.keshiValue = ysData.departmentId;
        this.addDoctor.zhichengValue = ysData.technical;
      }
    },
    // 添加医生和修改医生
    addYs(formName, modefiyDocter) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (modefiyDocter == "modefiyDocter") {
            let doctorsForm = this.addDoctor;
            let data = {
              doctorName: doctorsForm.name,
              departmentId: doctorsForm.keshiValue,
              doctorId: this.help4,
              mobile: doctorsForm.phone,
              technical: doctorsForm.zhichengValue
            };
            // debugger
            updateDoctor(data)
              .then(res => {
                this.canceYs();
                this.details(this.hospitalId);
                this.pageList(this.pages.currentPage, this.pages.pageSize);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            let doctorsForm = this.addDoctor;
            let data = {
              doctorName: doctorsForm.name,
              departmentId: doctorsForm.keshiValue,
              hospitalId: this.hospitalId,
              mobile: doctorsForm.phone,
              technical: doctorsForm.zhichengValue
            };
            // debugger
            addDoctor(data)
              .then(res => {
                if (res.data.returnCode != 0) {
                  this.$message({
                    type: "warning",
                    message: res.data.returnMsg,
                    center: true
                  });
                } else {
                  this.canceYs();
                  this.details(this.hospitalId, "dialogHide");
                  this.pageList(this.pages.currentPage, this.pages.pageSize);
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
          return false;
        }
      });
    },
    // 取消添加医生
    canceYs() {
      // debugger
      // this.addDoctor.name = "";
      // this.addDoctor.phone = "";
      // this.addDoctor.keshiValue = "";
      // this.addDoctor.zhichengValue = "";
      this.$refs["addDoctor"].resetFields();
      this.yishengDialog = false;
      // Console.log(this.addDoctor)
    },
    //删除医生
    ysDelet(id) {
      let data = {
        doctorId: id
      };
      this.$confirm("此操作将永久删除该信息, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDoctor(data)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功！",
                center: true
              });
              this.details(this.hospitalId);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 详情
    async details(id = null, dialog = "dialogShow") {
      if (id !== null) {
        this.hospitalId = id;
      }
      let data = {
        hospitalId: this.hospitalId
      };
      hospitalDetail(data)
        .then(res => {
          // if (res.data.returnCode != 0) {
          //     this.$message({
          //       type: "warning",
          //       message: res.data.returnMsg,
          //       center: true
          //     });
          //   } else {
          if (dialog == "dialogShow") {
            this.xiangqingDialog = true;
          }
          this.hospitalData = res.data.data.hospital;
          this.departmentData = res.data.data.departments;
          this.doctorsData = res.data.data.doctors;
          this.principalData = res.data.data.sysUsers;
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除医院
    handleOrder4(id) {
      let data = {
        hospitalId: id
      };
      this.$confirm("此操作将永久删除该信息, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteHospital(data)
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
                  message: "删除成功！",
                  center: true
                });
                this.pageList(this.pages.currentPage, this.pages.pageSize);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    //新增和修改医院弹框
    addDialog(yyData = null, judge = false) {
      if (judge) {
        this.yyAddBut = false;
        this.yyTitle = "修改医院";
      } else {
        this.yyAddBut = true;
        this.yyTitle = "添加医院";
      }
      this.dialogFormVisible = true;
      if (yyData !== null) {
        this.cityList(yyData.provinceId);
        this.siteList(yyData.cityId);
        // debugger;
        this.dialogForm.provinceValue = yyData.provinceId;
        this.dialogForm.hospitalName = yyData.name;
        this.dialogForm.citysValue = yyData.cityId;
        this.dialogForm.address = yyData.address;
        this.dialogForm.hospitalTypeValue = yyData.type;
        this.dialogForm.siteIdValue = yyData.siteId;
      }
    },
    // 新增医院和修改医院
    addHospitals(formName, modefiyHospital) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (modefiyHospital == "modefiyHospital") {
            let dialogForm = this.dialogForm;
            let data = {
              id: this.hospitalId,
              name: dialogForm.hospitalName,
              provinceId: dialogForm.provinceValue,
              cityId: dialogForm.citysValue,
              address: dialogForm.address,
              type: dialogForm.hospitalTypeValue,
              siteId: dialogForm.siteIdValue
            };
            // debugger;
            updateHospital(data)
              .then(res => {
                if (res.data.returnCode != 0) {
                  this.$message({
                    type: "warning",
                    message: res.data.returnMsg,
                    center: true
                  });
                } else {
                  this.resetForm();
                  this.details(this.hospitalId);
                  this.pageList(this.pages.currentPage, this.pages.pageSize);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            let dialogForm = this.dialogForm;
            let data = {
              name: dialogForm.hospitalName,
              provinceId: dialogForm.provinceValue,
              cityId: dialogForm.citysValue,
              address: dialogForm.address,
              type: dialogForm.hospitalTypeValue,
              siteId: dialogForm.siteIdValue
            };
            // debugger;
            addHospital(data)
              .then(res => {
                if (res.data.returnCode != 0) {
                  this.$message({
                    type: "warning",
                    message: res.data.returnMsg,
                    center: true
                  });
                } else {
                  this.resetForm();
                  this.details(this.hospitalId, "dialogHide");
                  this.pageList(this.pages.currentPage, this.pages.pageSize);
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
          return false;
        }
      });
    },
    //取消新增医院
    resetForm() {
      this.$refs["dialogForm"].resetFields();
      this.dialogForm.hospitalName = null;
      this.dialogForm.provinceValue = null;
      this.dialogForm.citysValue = null;
      this.dialogForm.address = null;
      this.dialogForm.hospitalTypeValue = null;
      this.dialogForm.siteIdValue = null;
      this.dialogFormVisible = false;
    },
    //详情保存按钮
    xqSave() {
      this.xiangqingDialog = false;
      this.pageList(this.pages.currentPage, this.pages.pageSize);
    },
    //详情取消按钮
    xqcancel() {
      this.xiangqingDialog = false;
      this.pageList(this.pages.currentPage, this.pages.pageSize);
    },
    //医院管理列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        provinceId: this.seachFome.fom1.value || null,
        cityId: this.seachFome.fom2.value || null,
        hospitalId: this.seachFome.fom3.value || null,
        doctorName: this.seachFome.doctors || null,
        sysUserName: this.seachFome.principal || null,
        technical: this.seachFome.fom4.value || null,
        siteId: this.seachFome.siteIdValue,
        type: this.seachFome.hospitalTypeValue
      };
      this.loading = true;
      selectByPage(data)
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
    //导出excel
    exportExcels() {
      let data = {
        provinceId: this.seachFome.fom1.value || "",
        cityId: this.seachFome.fom2.value || "",
        hospitalId: this.seachFome.fom3.value || "",
        doctorName: this.seachFome.doctors || "",
        sysUserName: this.seachFome.principal || "",
        technical: this.seachFome.fom4.value || "",
        siteId: this.seachFome.siteIdValue,
        type: this.seachFome.hospitalTypeValue
      };
      const lsyObj = {
        method: "post",
        fileName: "医院信息",
        url: javaApi.yy_ExportUrl,
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
    //获取省
    async provinceList() {
      getProvinceList()
        .then(res => {
          this.seachFome.fom1.select = res.data.data;
          this.dialogForm.province.select = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取市
    async cityList(id) {
      let data = { provinceId: id };
      // debugger
      getCityList(data)
        .then(res => {
          this.seachFome.fom2.select = res.data.data;
          this.dialogForm.citys.select = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取医院名
    async hospitalList(id) {
      let data = { cityId: id };
      getHospitalList(data)
        .then(res => {
          this.seachFome.fom3.select = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.siteList(id);
    },
    //测评中心
    async siteList(id) {
      let resData = await allSite(null, id);
      this.seachFome.siteIdList = resData;
      this.dialogForm.siteIdList = resData;
    },
    //根据测评中心获取医院列表
    // async hospitalList(id) {
    //   this.seach.hospitalLists = await hospital(id);
    // },
    //职称
    technicalList() {
      getTechnicalList()
        .then(res => {
          this.seachFome.fom4.select = res.data.data;
          this.addDoctor.zhicheng.select = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //医院类型
    hospitalTypeList() {
      GetHospitalTypeList()
        .then(res => {
          this.dialogForm.hospitalType.select = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.input-p80 {
  width: 80%;
}
.b-b-p-1 {
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}
</style>
