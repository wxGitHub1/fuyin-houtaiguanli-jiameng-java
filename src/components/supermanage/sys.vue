<!-- 用户管理 -->
<template>
  <div id="sys">
    <el-form :inline="true" :model="formInline" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="测评中心">
        <el-select clearable class="w-150" v-model="formInline.siteIdValue" placeholder="请选择">
          <el-option
            v-for="item in formInline2.allSiteList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-cascader
        class="w-150"
          v-model="formInline.departmentValue"
          :clearable="true"
          :options="formInline2.departmentList"
          :change-on-select="true"
          :props="defaultParams2"
          collapse-tags
          placeholder="请选择"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="用户姓名/手机">
        <el-input clearable class="w-150" v-model="formInline.user" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <!-- <el-form-item label="电话">
            <el-input clearable v-model="formInline.userMobile" placeholder="请输入电话"></el-input>
      </el-form-item>-->
      <el-form-item label="用户角色">
        <el-select clearable class="w-150" v-model="formInline.region" placeholder="请选择">
          <el-option
            v-for="item in formInline.options"
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
          @click="getControlCommunities(pages.currentPage,pages.pageSize)"
        >查询</el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="addUserBut"
        >新增用户</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户列表 -->
    <el-table
      :border="true"
      max-height="650"
      :data="clientData"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="username" label="用户姓名"></el-table-column>
      <el-table-column align="center" prop="telephone" label="用户电话" min-width="100"></el-table-column>
      <el-table-column align="center" prop="telephone" label="登录账户" min-width="100"></el-table-column>
      <el-table-column
        align="center"
        prop="roleNameString"
        label="用户角色"
        show-overflow-tooltip
        min-width="160"
      ></el-table-column>
      <el-table-column align="center" prop="deptName" label="部门" min-width="160"></el-table-column>
      <el-table-column
        align="center"
        prop="deptChildName"
        label="分组"
        show-overflow-tooltip
        min-width="160"
      ></el-table-column>
      <el-table-column align="center" prop="siteName" label="测评中心" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作" width="500">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="configurationRoles(scope.row.id,scope.row.username)"
            icon="el-icon-setting"
            size="mini"
          >配置用户角色</el-button>
          <el-button
            type="primary"
            @click="handleModify(scope.row.id)"
            plain
            icon="el-icon-edit"
            size="mini"
          >修改</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row.id)"
            size="mini"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            @click="handlePassword(scope.row.id)"
            size="mini"
          >重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- 新增用户和修改用户弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :before-close="toggleSelection"
      id="sys-el-dialog"
      :title="addAndModifyUserTitle"
      :visible.sync="DatadialogVisible"
      center
    >
      <el-form
        :inline="true"
        :rules="rules"
        ref="ruleForm"
        :model="formInline2"
        class="form"
        size="mini"
      >
        <el-form-item label="用户姓名" prop="userName">
          <el-input clearable v-model="formInline2.userName" prop="name" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="userMobile">
          <el-input clearable v-model.number="formInline2.userMobile" placeholder="请输入用户电话"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="登录密码" prop="passWord" label-width="79px">
          <el-input
            clearable
            show-password
            v-model="formInline2.passWord"
            placeholder="默认生成123456可修改"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" label-width="79px">
          <el-input
            clearable
            show-password
            v-model="formInline2.confirmPassword"
            placeholder="默认生成123456可修改"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="departmentValue">
          <!-- <el-select v-model="formInline2.departmentValue" placeholder="请选择" clearable>
            <el-option
              v-for="item in formInline2.departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->
          <el-cascader
            v-model="formInline2.departmentValue"
            :clearable="true"
            :options="formInline2.departmentList"
            :props="defaultParams"
            collapse-tags
            placeholder="请选择"
          ></el-cascader>
        </el-form-item>

        <!-- <br />            :change-on-select="true"
         <el-form-item label="用户角色">
          <el-select
           
            @change="changeSelection(formInline2)"
            v-model="formInline2.region"
            placeholder="请选择"
          >
            <el-option
              v-for="item in formInline2.options"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
          <el-button @click="roleAll" type="primary" icon="el-icon-document" size="mini">选择全部角色</el-button>
        </el-form-item>-->
        <!-- <br />
        <el-table :data="formInline2.tableData" style="width: 100%">
          <el-table-column prop="date.roleName" label="已选角色" min-width="50"></el-table-column>
          <el-table-column label="角色权限" min-width="100">
            <template slot-scope="scope">
              <el-select clearable size="mini" v-model="scope.row.region" placeholder="请选择角色权限">
                <el-option
                  v-for="item in scope.row.options"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column min-width="180" label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click.native.prevent="deleteRow(scope.$index, formInline2.tableData)"
                size="mini"
                icon="el-icon-delete"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>-->
        <el-form-item label="测评中心" prop="allSiteValue">
          <el-select
            clearable
            size="mini"
            multiple
            v-model="formInline2.allSiteValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in formInline2.allSiteList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- <el-button
            @click="hospitalAll"
            :disabled="AllHospitalBut"
            type="primary"
            icon="el-icon-s-grid"
            size="mini"
          >选择全部测评中心</el-button>-->
        </el-form-item>
        <!-- <el-form-item label="负责医院" prop="regionHospital">
          <el-select
            clearable
            size="mini"
            multiple
            v-model="formInline2.regionHospital"
            placeholder="请选择"
            @change="AllHospitalMethod(formInline2.regionHospital)"
          >
            <el-option
              v-for="item in formInline2.optionsHospital"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button
            @click="hospitalAll"
            :disabled="AllHospitalBut"
            type="primary"
            icon="el-icon-s-grid"
            size="mini"
          >选择全部医院</el-button>
        </el-form-item>-->

        <el-form-item label="上传头像">
          <el-upload
            :action="upImgUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="uploadFile"
            ref="upload"
            multiple
            :auto-upload="false"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="toggleSelection" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          v-if="mode"
          type="success"
          icon="el-icon-circle-check"
          @click="saveCommunity('新增用户')"
        >保存</el-button>
        <el-button
          v-else
          type="success"
          icon="el-icon-circle-check"
          @click="saveCommunity('修改用户')"
        >保存修改</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <!--配置角色弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :before-close="cancelRoles"
      id="sys-el-dialog"
      title="数据录入"
      :visible.sync="configuringRoles"
      center
    >
      <el-form :inline="true" ref="rolesFroms" :model="rolesFroms" class="center" size="mini">
        <el-form-item label="用户角色">
          <el-select
            clearable
            multiple
            @change="AllRoleMethod(rolesFroms.rolesValue)"
            v-model="rolesFroms.rolesValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in rolesFroms.select"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button
            @click="roleAll"
            :disabled="AllRoleBut"
            type="primary"
            icon="el-icon-s-grid"
            size="mini"
          >选择全部角色</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="cancelRoles" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button type="success" icon="el-icon-circle-check" @click="saveRoles()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  department,
  getHospitalList,
  addUser,
  userDetail,
  roleTree,
  modfiyUser,
  ConfigurationPassword,
  deleteUser,
  ConfiguringRolesList
} from "../../api/javaApi";
import { allSite } from "../../utils/public";
import javaApi from "../../api/javaApi";
import { Promise, all, async } from "q";
import session from "../../utils/session";
import { log } from "util";
import axios from "../../utils/ajax";
export default {
  name: "App",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码!"));
      } else {
        if (this.formInline2.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var hospitalRule = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("请选择医院!"));
      } else {
        callback();
      }
    };
    var allSiteRule = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("请选择测评中心!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码!"));
      } else if (value !== this.formInline2.passWord) {
        this.formInline2.confirmPassword = null;
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        // console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      upImgUrl: javaApi.userInsert,
      // upImgUrl2: javaApi.userUpdate,
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      //自定义级联选择项
      defaultParams: {
        label: "name",
        value: "id",
        children: "children",
        // emitPath: false,
        multiple: true
      },
      defaultParams2: {
        label: "name",
        value: "id",
        children: "children",
        // emitPath: false,
        multiple: false
      },
      formInline: {
        user: "",
        userMobile: "",
        region: "",
        options: [],
        siteIdValue: null,
        siteIdList: [],
        departmentValue: []
      },
      formInline2: {
        userName: null,
        userId: null,
        userMobile: null,
        passWord: null,
        confirmPassword: null,
        // region: null,
        options: [],
        regionHospital: [],
        optionsHospital: [],
        tableData: [],
        //部门列表
        departmentList: null,
        departmentValue: [],
        allSiteList: [],
        allSiteValue: []
      },
      rolesFroms: {
        select: [],
        rolesValue: [],
        id: null,
        name: null
      },
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      // 数据列表
      clientData: [],
      //权限管理
      // limit: {
      //   add: true,
      //   delete: true
      // },
      // :disabled="limit.add"
      // :disabled="limit.delete"
      //录入数据弹出框
      DatadialogVisible: false,
      addAndModifyUserTitle: "新增用户信息",
      //配置角色弹出框
      configuringRoles: false,
      //验证规则
      rules: {
        userName: [
          { required: true, message: "请输入用户姓名!", trigger: "blur" }
        ],
        passWord: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        departmentValue: [
          { required: true, message: "请选择部门!", trigger: "change" }
        ],
        regionHospital: [
          { required: true, validator: hospitalRule, trigger: "change" }
        ],
        allSiteValue: [
          { required: true, validator: allSiteRule, trigger: "change" }
        ],
        userMobile: [{ required: true, validator: checkPhone, trigger: "blur" }]
      },
      // 弹框底部保存取消状态
      mode: true,
      //选择全部医院按钮
      AllHospitalBut: false,
      //选择全部角色按钮
      AllRoleBut: false,
      loading: true
      //提交表单
      // formData:null
    };
  },
  mounted() {
    //获取用户权限
    // this.limit.add = !!!session.getItem("userlimit")[0];
    // this.limit.delete = !!!session.getItem("userlimit")[1];
    // this.limit.update = !!!this.$store.state.login.userlimit[2];
    // this.limit.select = !!!this.$store.state.login.userlimit[3];
    this.getControlCommunities();
    this.getRoleList();
    this.GetHospitals();
    this.departments();
    this.siteList();
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // this.isJPG = isJPG;
      return isJPG && isLt2M;
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传前图片
    uploadFile(file) {
      this.formData.append("photo", file.file);
    },
    //自定义上传图片
    // subPicForm() {
    //   this.formData = new FormData();
    //   this.$refs.upload.submit();
    //   let config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   };
    //   ajax
    //     .post(this.upImgUrl, this.formData, config)
    //     .then(res => {
    //       if (res.data.returnCode != 0) {
    //         this.$message({
    //           type: "warning",
    //           message: res.data.returnMsg,
    //           center: true
    //         });
    //       } else {
    //        console.log(this.fileList)
    //         debugger;
    //         if (this.isJPG) {
    //           this.cloPicForm()
    //           this.$message({
    //             type: "success",
    //             message: "上传成功！",
    //             center: true
    //           });
    //         }
    //       }
    //     })
    //     .catch(res => {
    //       console.log(res);
    //     });
    // },
    // 保存用户
    saveCommunity(parameter) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.formData = new FormData();
          this.$refs.upload.submit();
          this.formData.append("username", this.formInline2.userName);
          this.formData.append("telephone", this.formInline2.userMobile);
          // this.formData.append("deptId", this.formInline2.departmentValue);//单选框
          for (let i = 0; i < this.formInline2.departmentValue.length; i++) {
            for (let key in this.formInline2.departmentValue[i]) {
              //假设这个数组对应的字段为box
              this.formData.append(
                `deptIds[${i}][${key}]`,
                this.formInline2.departmentValue[i][key]
              );
            }
          } //多选框
          this.formData.append("siteIds", this.formInline2.allSiteValue);
          // this.formData.append(
          //   "userHospitalForms",
          //   this.formInline2.regionHospital
          // ); 暂时注销
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          if (parameter == "新增用户") {
            if (!!this.formInline2.confirmPassword) {
              this.formData.append(
                "password",
                this.formInline2.confirmPassword
              );
            } else {
              this.formData.append("password", "123456");
            }
            axios
              .post(javaApi.userInsert, this.formData, config)
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
                  this.toggleSelection();
                  this.getControlCommunities(
                    this.pages.currentPage,
                    this.pages.pageSize
                  );
                }
              })
              .catch(res => {
                console.log(res);
              });
            // (data.password = this.formInline2.confirmPassword),
            //   addUser(data)
            //     .then(res => {
            //       // debugger
            //       if (res.data.returnCode != 0) {
            //         this.$message({
            //           type: "warning",
            //           message: res.data.returnMsg,
            //           center: true
            //         });
            //       } else {
            //         this.$message({
            //           type: "success",
            //           message: "添加成功！",
            //           center: true
            //         });
            //         this.toggleSelection();
            //         this.getControlCommunities(
            //           this.pages.currentPage,
            //           this.pages.pageSize
            //         );
            //       }
            //     })
            //     .catch(err => {
            //       console.log(err);
            //     });
          } else {
            this.formData.append(
              "password",
              this.formInline2.confirmPassword || null
            );
            this.formData.append("id", this.formInline2.userId);
            //  console.log(this.fileList)
            if (this.fileList.length == 0) {
              this.formData.append("deletePhoto", 1);
            } else {
              this.formData.append("deletePhoto", 0);
            }
            axios
              .post(javaApi.userUpdate, this.formData, config)
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
                  this.toggleSelection();
                  this.getControlCommunities(
                    this.pages.currentPage,
                    this.pages.pageSize
                  );
                }
              })
              .catch(res => {
                console.log(res);
              });
            // data.id = this.formInline2.userId;
            // (data.password = this.formInline2.confirmPassword || null),
            //   console.log(data.password);
            // modfiyUser(data)
            //   .then(res => {
            //     this.$message({
            //       type: "success",
            //       message: "修改成功！",
            //       center: true
            //     });
            //     this.toggleSelection();
            //     this.getControlCommunities(
            //       this.pages.currentPage,
            //       this.pages.pageSize
            //     );
            //   })
            //   .catch(err => {
            //     console.log(err);
            //   });
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
    // 角色弹框
    configurationRoles(id, name) {
      this.configuringRoles = true;
      this.rolesFroms.id = id;
      this.rolesFroms.name = name;
      // console.log( session.getItem("username"))
    },
    //配置角色
    saveRoles() {
      // debugger
      if (this.rolesFroms.rolesValue.length !== 0) {
        let data = {
          users: [this.rolesFroms.id],
          roles: this.rolesFroms.rolesValue
        };
        ConfiguringRolesList(data)
          .then(res => {
            if (this.rolesFroms.name == session.getItem("username")) {
              this.$router.push("/login");
              session.removeItem("user");
              session.removeItem("username");
              session.removeItem("menu");
              this.$message({
                type: "info",
                message: "配置成功请重新登录！"
              });
            } else {
              this.$message({
                type: "success",
                message: "配置成功！",
                center: true
              });
              this.cancelRoles();
              this.getControlCommunities(
                this.pages.currentPage,
                this.pages.pageSize
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请选择角色！",
          center: true
        });
        return false;
      }
    },
    //取消配置角色
    cancelRoles() {
      this.configuringRoles = false;
      this.rolesFroms.rolesValue = [];
      this.AllRoleBut = false;
    },
    //选择角色options 发生变化时
    // changeSelection(formInline2) {
    //   // console.log(formInline2)
    //   let region = [];
    //   formInline2.options.forEach(options => {
    //     if (options.roleId == formInline2.region) {
    //       region.push(options);
    //     }
    //   });
    //   let region2 = {};
    //   region.forEach(region => {
    //     region2.roleName = region.roleName;
    //     region2.roleId = region.roleId;
    //   });
    //   // console.log(region2);
    //   let data = {
    //     date: region2,
    //     region: "",
    //     options: [
    //       { roleName: "一级", roleId: 1 },
    //       { roleName: "二级", roleId: 2 },
    //       { roleName: "三级", roleId: 3 }
    //     ]
    //   };
    //   this.formInline2.tableData.push(data);
    //   // console.log(this.formInline2.tableData);
    // },
    // 移除行
    // deleteRow(index, rows) {
    //   rows.splice(index, 1);
    // },
    //选择全部角色
    roleAll() {
      let self = this;
      if (self.rolesFroms.rolesValue.length == 0) {
        self.rolesFroms.select.forEach(res => {
          self.rolesFroms.rolesValue.push(res.id);
        });
        self.AllRoleBut = true;
      } else {
        let rgeList = [];
        for (let index1 = 0; index1 < self.rolesFroms.select.length; index1++) {
          const element1 = self.rolesFroms.select[index1].id;
          // console.log(element1)
          for (
            let index = 0;
            index < self.rolesFroms.rolesValue.length;
            index++
          ) {
            const element = self.rolesFroms.rolesValue[index];
            // console.log(element)
            if (element1 !== element) {
              rgeList.push(element1);
              break;
            }
          }
        }
        self.rolesFroms.rolesValue = rgeList;
        self.AllRoleBut == true;
      }
      // let dataList = [];
      // this.formInline2.options.forEach(res => {
      //   let data = {
      //     date: {},
      //     region: "",
      //     options: [
      //       { roleName: "一级", roleId: 1 },
      //       { roleName: "二级", roleId: 2 },
      //       { roleName: "三级", roleId: 3 }
      //     ]
      //   };
      //   data.date.roleName = res.roleName;
      //   data.date.roleId = res.roleId;
      //   dataList.push(data);
      // });
      // // console.log(dataList);
      // this.formInline2.tableData = dataList;
    },
    //选择全部医院
    hospitalAll() {
      let self = this;
      if (self.formInline2.regionHospital.length == 0) {
        self.formInline2.optionsHospital.forEach(res => {
          self.formInline2.regionHospital.push(res.id);
        });
        self.AllHospitalBut = true;
      } else {
        let rgeList = [];
        for (
          let index1 = 0;
          index1 < self.formInline2.optionsHospital.length;
          index1++
        ) {
          const element1 = self.formInline2.optionsHospital[index1].id;
          // console.log(element1)
          for (
            let index = 0;
            index < self.formInline2.regionHospital.length;
            index++
          ) {
            const element = self.formInline2.regionHospital[index];
            // console.log(element)
            if (element1 !== element) {
              rgeList.push(element1);
              break;
            }
          }
        }
        self.formInline2.regionHospital = rgeList;
        self.AllHospitalBut = true;
      }
    },
    // 新增用户按钮
    addUserBut() {
      this.addAndModifyUserTitle = "新增用户信息";
      this.GetHospitals();
      this.DatadialogVisible = true;
      this.rules.passWord[0].required = true;
      this.rules.confirmPassword[0].required = true;
      this.mode = true;
      // this.getRoleList();
    },
    //查询
    // onSubmit() {
    //   this.getControlCommunities();
    // },
    // 修改
    handleModify(id) {
      userDetail({ id: id })
        .then(res => {
          // debugger
          console.log(res);
          this.formInline2.userName = res.data.data.username;
          this.formInline2.userId = id;
          let phont = Number.parseInt(res.data.data.telephone);
          this.formInline2.userMobile = phont;
          this.rules.passWord[0].required = false;
          this.rules.confirmPassword[0].required = false;
          // this.formInline2.password = res.data.data.password;
          // this.formInline2.confirmPassword = res.data.data.password;
          this.formInline2.departmentValue = res.data.data.deptId;
          // this.formInline2.regionHospital = res.data.data.hospitalId;//暂时注销
          this.formInline2.allSiteValue = res.data.data.siteIds;
          if (!!res.data.data.photo) {
            this.fileList.push({ url: res.data.data.photo });
          }
          this.addAndModifyUserTitle = "修改用户信息";
          this.mode = false;
          this.DatadialogVisible = true;
        })
        .catch(err => {
          console.log(err);
        });
      // console.log(rowData);
      // let dataList = [];
      // this.formInline2.options.forEach(options => {
      //   rowData.roles.forEach(res => {
      //     let data = {
      //       date: {},
      //       region: "",
      //       options: [
      //         { roleName: "一级", roleId: 1 },
      //         { roleName: "二级", roleId: 2 },
      //         { roleName: "三级", roleId: 3 }
      //       ]
      //     };
      //     if (res.roleId == options.roleId) {
      //       res.authority == 1
      //         ? (data.region = 1)
      //         : res.authority == 2
      //         ? (data.region = 2)
      //         : res.authority == 3
      //         ? (data.region = 3)
      //         : (data.region = "");
      //       data.date.roleName = options.roleName;
      //       data.date.roleId = options.roleId;
      //       dataList.push(data);
      //     }
      //   });
      // });

      // this.formInline2.tableData = dataList;
      // console.log(this.formInline2);
    },
    // 删除
    handleDelete(id) {
      // debugger
      if (id) {
        let deleteData = {
          id: id
        };
        this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            try {
              return new Promise((resolve, reject) => {
                deleteUser(deleteData)
                  .then(res => {
                    // debugger
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
    },
    // 重置密码
    handlePassword(id) {
      this.$confirm("此操作将重置密码, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = { id: id };
          ConfigurationPassword(data)
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
                  message: "重置成功！",
                  center: true
                });
                this.getControlCommunities(
                  this.pages.currentPage,
                  this.pages.pageSize
                );
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消密码重置！"
          });
        });
    },
    //获取用户列表
    async getControlCommunities(pageIndex = 1, pageSize = 10) {
      // console.log(this.formInline.departmentValue)
      let itemId = null;
      for (
        let index = 0;
        index < this.formInline.departmentValue.length;
        index++
      ) {
        itemId = this.formInline.departmentValue[
          this.formInline.departmentValue.length - 1
        ];
      }
      let arg = {
        pageSize: pageSize,
        pageNum: pageIndex
      };
      arg.username = this.formInline.user || null; //名称
      // arg.telephone = this.formInline.userMobile || null; //电话
      arg.roleId = this.formInline.region || null; //id
      arg.siteId = this.formInline.siteIdValue || null;
      arg.deptId = itemId;
      // debugger
      this.loading = true;
      userList(arg)
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
    // 获取下拉角色列表
    getRoleList() {
      roleTree()
        .then(res => {
          // debugger
          this.rolesFroms.select = res.data.data;
          this.formInline.options = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取下拉医院列表
    GetHospitals() {
      getHospitalList()
        .then(res => {
          this.formInline2.optionsHospital = res.data.data;
          // console.log(this.formInline2.optionsHospital);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下拉框医院改变
    AllHospitalMethod(value) {
      // debugger;
      if (value.length >= this.formInline2.optionsHospital.length) {
        this.AllHospitalBut = true;
      } else {
        this.AllHospitalBut = false;
      }
    },
    // 下拉框角色改变
    AllRoleMethod(value) {
      // debugger;
      if (value.length >= this.rolesFroms.select.length) {
        this.AllRoleBut = true;
      } else {
        this.AllRoleBut = false;
      }
    },
    //取消按钮
    toggleSelection() {
      this.DatadialogVisible = false;
      this.$refs["ruleForm"].resetFields();
      let FromData = this.formInline2;
      FromData.userName = null;
      FromData.userMobile = null;
      FromData.password = null;
      FromData.confirmPassword = null;
      // FromData.region = null;
      this.formInline2.departmentValue = [];
      // FromData.regionHospital = [];
      FromData.allSiteValue = [];
      // FromData.optionsHospital = [];
      // FromData.tableData = [];
      this.fileList = [];
      // this.formInline2.userId=null;
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
    // 部门列表
    departments() {
      department()
        .then(res => {
          // debugger
          let obj = res.data.data;
          obj.forEach(element => {
            element.children = element.departmentDtos;
          });
          this.formInline2.departmentList = obj;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取测评中心列表
    async siteList() {
      // console.log("调用成功");
      this.formInline2.allSiteList = await allSite();
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  width: 620px;
  margin: 0 auto;
}
</style>
<style>
#sys-el-dialog .el-dialog--center {
  min-width: 640px;
}
</style>
