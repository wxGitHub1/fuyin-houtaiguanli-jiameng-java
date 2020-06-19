// 角色管理
<template>
  <div>
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="用户角色">
        <el-input class="w-150" clearable v-model="formInline.searchUser" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input class="w-150" clearable v-model="formInline.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          class="w-250"
          v-model="formInline.creation_time"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUserBut">新增角色</el-button>
        <el-button
          type="warning"
          icon="el-icon-search"
          @click="getControlCommunities(pages.currentPage,pages.pageSize)"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 角色列表 -->
    <el-table
      :border="true"
      :data="clientData"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="name" label="角色名称" width="100"></el-table-column>
      <el-table-column align="center" prop="memberNum" label="用户数量" width="100"></el-table-column>
      <el-table-column align="center" prop="menuModule" label="包含菜单" min-width="400"></el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间" width="200"></el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="info" icon="el-icon-document" @click="details(scope.row)" size="mini">详情</el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="handleModify(scope.row)"
            size="mini"
          >修改</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row.id)"
            icon="el-icon-delete"
            size="mini"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页标签-->
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

    <!-- 弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :before-close="toggleSelection"
      width="70%"
      title="数据录入"
      :visible.sync="DatadialogVisible"
      center
    >
      <div class="new-title">角色名称</div>
      <el-form :inline="true" :model="formInline" id="search" class="xiangqing" size="small">
        <el-form-item>
          <el-input class="w-150" v-model="formInline.addUser" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <span style="color:#FFA116">温馨提示：角色名称要简明扼要，字数不宜太长</span>
        </el-form-item>
      </el-form>
      <!-- <el-row class="line-h-30">
        <el-col :span="1.5" class="margin-r-20">
          <span>角色名称</span>
        </el-col>
        <el-col :span="3">
          <el-input size="small" v-model="formInline.addUser" placeholder="请输入角色名称"></el-input>
        </el-col>
        <el-col :span="8" :offset="1" class="line-h-30">
          <span style="color:#FFA116">温馨提示：角色名称要简明扼要，字数不宜太长</span>
        </el-col>
        <el-col :span="1.5" class="line-h-30 margin-r-20">
          <span>选择父级</span>
        </el-col>
        <el-col :span="3" class="line-h-30">
          <el-select clearable v-model="formInline.region" placeholder="请选择" size="mini">
            <el-option
              v-for="item in formInline.options"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>-->
      <div class="new-title">角色菜单配置</div>
      <!-- 添加用户表格 -->
      <el-table v-if="mTable" :data="selection" tooltip-effect="dark" border :max-height="481">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column label="模块名称" width="200">
          <template slot-scope="scope">
            <el-checkbox
              :indeterminate="scope.row.isIndeterminate"
              v-model="scope.row.checkAll"
              @change="handleCheckAllChange(scope.$index,$event,selection,1)"
            >{{scope.row.name}}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="功能">
          <template slot-scope="scope">
            <el-checkbox-group
              v-model="scope.row.checkedCities"
              @change="handleCheckedCitiesChange(scope.$index,$event,selection,1)"
            >
              <el-checkbox
                v-for="(city,index) in scope.row.moduleDtos"
                :label="city"
                :key="index"
              >{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改用户表格 -->
      <el-table v-else :data="modifymune" tooltip-effect="dark" border :max-height="481">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column label="模块名称" width="200">
          <template slot-scope="scope">
            <el-checkbox
              :indeterminate="scope.row.isIndeterminate"
              v-model="scope.row.checkAll"
              @change="handleCheckAllChange(scope.$index,$event,modifymune,2)"
            >{{scope.row.name}}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="功能">
          <template slot-scope="scope">
            <el-checkbox-group
              v-model="scope.row.checkedCities"
              @change="handleCheckedCitiesChange(scope.$index,$event,modifymune,2)"
            >
              <el-checkbox
                v-for="(model,index) in scope.row.moduleDtos"
                :label="model.id"
                :key="index"
              >{{model.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
      <!--添加-->
      <!--修改-->
      <span slot="footer">
        <el-button @click="toggleSelection" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-check"
          @click="saveCommunity(formInline,selection)"
          v-if="mTable"
        >确认</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-check"
          @click="saveCommunity(formInline,modifymune,'修改')"
          v-else
        >确认</el-button>
      </span>
    </el-dialog>
    <!-- 配置权限弹框 -->
    <!-- <el-dialog
      title="配置权限"
      width="70%"
      :visible.sync="permissionDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      center
    >
      <el-row class="line-h-30">
        <el-col :span="1.5" class="margin-r-20">
          <span>角色名称：</span>
        </el-col>
        <el-col :span="10">
          <span>{{nextFormInline.roleName}}</span>
        </el-col>
        <el-col :span="1.5" class="line-h-30 margin-r-20">
          <span>父级角色：</span>
        </el-col>
        <el-col :span="3" class="line-h-30">
          <span>{{nextFormInline.fatherName}}</span>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
        :max-height="481"
        center
      >
        <el-table-column prop="parentName" label="模块" min-width="20"></el-table-column>
        <el-table-column prop="name" label="功能" min-width="20"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" class="center">
            <div
              v-for="(item,index) in scope.row.menuDtos"
              :key="index"
              class="pct-w18 margin-b-10 margin-r-10 display-i-b"
            >
              <el-select clearable v-model="item.permission" :placeholder="item.name" size="mini">
                <el-option
                  v-for="item in item.permissionMap"
                  :key="item.value"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-back">上一步</el-button>
        <el-button @click="determine()" type="success" icon="el-icon-circle-check">保存</el-button>
      </span>
    </el-dialog>-->
    <!-- 角色详情 -->
    <el-dialog
      title="角色详情"
      width="70%"
      :visible.sync="characterDetailsDialog"
      :close-on-click-modal="false"
      :before-close="character_cancel"
      center
    >
      <div class="new-title">角色信息</div>
      <el-table :border="true" :data="clientData_two" :header-row-class-name="'headerClass-two'">
        <el-table-column align="center" prop="name" label="角色名称" width="100"></el-table-column>
        <el-table-column align="center" prop="menuModule" label="包含菜单" min-width="400"></el-table-column>
      </el-table>
      <div class="new-title">用户信息</div>
      <el-table
        :border="true"
        :data="clientData_three"
        :header-row-class-name="'headerClass-two'"
        max-height="400"
      >
        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" prop="telephone" label="账号"></el-table-column>
        <el-table-column align="center" prop="rolePermission" label="权限"></el-table-column>
        <el-table-column align="center" prop="siteName" label="测评中心"></el-table-column>
        <el-table-column align="center" prop="hospitalNameString" label="医院"></el-table-column>
        <el-table-column align="center" label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-info"
              @click="authority_fuc(scope.row)"
              size="mini"
            >权限</el-button>
            <el-button
              type="danger"
              @click="delete_user_fuc(scope.row)"
              icon="el-icon-delete"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="character_cancel()" type="primary" icon="el-icon-circle-close">关闭</el-button>
        <el-button @click="add_user()" type="success" icon="el-icon-circle-plus-outline">添加用户</el-button>
        <!-- <el-button @click="character_determine()" type="success" icon="el-icon-circle-check">保存</el-button> -->
      </span>
    </el-dialog>
    <!-- 权限设置 -->
    <el-dialog
      title="权限设置"
      width="30%"
      :visible.sync="authorityDialog"
      :close-on-click-modal="false"
    >
      <el-form :inline="true" size="small">
        <el-form-item label="选择用户权限">
          <el-select clearable v-model="authorityId" placeholder="请选择">
            <el-option
              v-for="item in authorityList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button
          @click="authorityDialog=false"
          type="primary"
          icon="el-icon-circle-close"
        >关闭</el-button>
        <el-button @click="add_role_fuc(detailUserId)" type="success" icon="el-icon-circle-plus-outline">确认</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      width="50%"
      :visible.sync="adduserDialog"
      :close-on-click-modal="false"
    >
       <el-form :inline="true" label-width="100px" :model="seachFome" id="search" size="small">
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
          @change="siteList(seachFome.fom2.value)"
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
        <el-select clearable class="w-150" @change="uerList_fuc(seachFome.siteIdValue)" v-model="seachFome.siteIdValue" placeholder="请先选择城市">
          <el-option
            v-for="item in seachFome.siteIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户">
        <el-select clearable class="w-150" v-model="seachFome.fom3.value" placeholder="请先选择城市">
          <el-option
            v-for="item in seachFome.fom3.select"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限设置">
          <el-select clearable  class="w-150" v-model="authorityId" placeholder="请选择">
            <el-option
              v-for="item in authorityList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
      </el-form-item>

    </el-form>
      <span slot="footer">
        <el-button
          @click="adduserDialog=false"
          type="primary"
          icon="el-icon-circle-close"
        >关闭</el-button>
        <el-button @click="add_user_fuc()" type="success" icon="el-icon-circle-plus-outline">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleList,
  selectRoleDetail,
  roleDelete,
  // roleTree,
  moduleTree,
  // selectMenuByModel,
  // roleMenuUpdate,
  roleMenuTree,
  roleModuleUpdate,
  deleteRoleUser,
  updateRoleUserPermission,
  getProvinceList,
  getCityList,
  userListByDept
} from "../../api/javaApi";
import { exportMethod, site, allSite, hospital } from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      seachFome: {
        fom1: {
          select: [],
          value: null
        },
        fom2: {
          select: [],
          value: null
        },
        fom3: {
          select: [],
          value: null
        },
        siteIdList: [],
        siteIdValue: null 
      },
      authorityList: [
        { name: "一级", id: 1 },
        { name: "二级", id: 2 },
        { name: "三级", id: 3 }
      ],
      authorityId: null,
      permissionDialog: false,
      adduserDialog: false,
      authorityDialog: false,
      characterDetailsDialog: false,
      spanArr: [],
      position: 0,
      // tableData: [
      //   {
      //     // id: "1",
      //     type: "1",
      //     name: "客户管理",
      //     amount1: "前台客户管理",
      //     value1: "",
      //     value2: ""
      //   }
      // ],
      mTable: true,
      // 修改用户时的信息
      modifymune: [],
      // 添加用户时的信息
      selection: [],
      //添加和查询时用户名
      formInline: {
        creation_time: null,
        searchUser: null,
        username: null,
        // addUser: "",
        userId: ""
        // region: "",
        // options: []
      },
      //下一步弹框角色名称和父级名称
      // nextFormInline: {
      //   roleName: "",
      //   fatherName: ""
      // },
      //权限管理
      // limit: {
      //   add: true,:disabled="limit.add"
      //   delete: true:disabled="limit.delete"
      // },
      //表格数据
      clientData: [],
      clientData_two: [],
      clientData_three: [],
      //录入数据弹出框
      DatadialogVisible: false,
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      //弹框
      // ModifydialogVisible: false,
      // roleId: "",
      loading: true,
      detailUserId: null
    };
  },
  created() {
    this.getMenus();
     this.provinceList();
    // this.parentRole();
  },
  mounted() {
    //获取用户权限
    // this.limit.add = !!!session.getItem("userlimit")[0];
    // this.limit.delete = !!!session.getItem("userlimit")[1];
    // this.limit.update = !!!this.$store.state.login.userlimit[2];
    // this.limit.select =  !!!this.$store.state.login.userlimit[3];
    this.getControlCommunities();
  },
  methods: {
    add_user_fuc(){
      this.adduserDialog=false
       this.add_role_fuc(this.seachFome.fom3.value)
    },
    add_role_fuc(userId) {
      let data = {
        roleId: this.clientData_two[0].id, //角色id
        userId: userId, //用户id
        permission: this.authorityId //角色权限
      };
      updateRoleUserPermission(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.authorityDialog = false;
            this.details(this.clientData_two[0]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delete_user_fuc(obj) {
      this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            roles: [this.clientData_two[0].id], //角色id
            users: [obj.id] //用户id
          };
          deleteRoleUser(data)
            .then(res => {
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.details(this.clientData_two[0]);
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
    authority_fuc(obj) {
      this.detailUserId = obj.id;
      this.authorityDialog = true;
    },
    add_user() {
      this.adduserDialog=true
    },
    details(obj) {
      this.formInline.userId = obj.id; //角色id
      let data = {
        id: obj.id //角色id
      };
      selectRoleDetail(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            // debugger;
            this.clientData_two[0] = obj;
            this.characterDetailsDialog = true;
            this.clientData_three = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    character_cancel() {
      this.getControlCommunities(this.pages.currentPage, this.pages.pageSize);
      this.characterDetailsDialog = false;
    },
    // character_determine() {},
    //配置权限弹框确认
    // determine() {
    //   let roleMenuForms = [];
    //   // debugger
    //   this.tableData.forEach(father => {
    //     father.menuDtos.forEach(obj => {
    //       roleMenuForms.push({ aclId: obj.id, level: obj.permission });
    //     });
    //   });

    //   let data = {
    //     name: this.formInline.addUser,
    //     parentId: this.formInline.region || 0,
    //     roleMenuForms: roleMenuForms
    //   };
    //   if (!!this.formInline.userId) {
    //     data.id = this.formInline.userId;
    //   } else {
    //     data.id = null;
    //   }
    //   // debugger;
    //   roleMenuUpdate(data)
    //     .then(res => {
    //       if (res.data.returnCode != 0) {
    //         this.$message({
    //           type: "warning",
    //           message: res.data.returnMsg,
    //           center: true
    //         });
    //       } else {
    //         this.permissionDialog = false;
    //         this.toggleSelection();
    //         this.tableData = [];
    //         this.getControlCommunities();
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // 配置权限弹框上一步
    // cancel() {
    //   this.permissionDialog = false;
    //   this.spanArr = [];
    //   this.position = 0;
    // },
    // 合并单元格
    // rowspan() {
    //   // debugger
    //   this.tableData.forEach((item, index) => {
    //     if (index === 0) {
    //       this.spanArr.push(1);
    //       this.position = 0;
    //     } else {
    //       if (
    //         this.tableData[index].parentId ===
    //         this.tableData[index - 1].parentId
    //       ) {
    //         this.spanArr[this.position] += 1;
    //         this.spanArr.push(0);
    //       } else {
    //         this.spanArr.push(1);
    //         this.position = index;
    //       }
    //     }
    //   });
    // },
    //表格合并行
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   // debugger
    //   if (columnIndex === 0) {
    //     const _row = this.spanArr[rowIndex];
    //     const _col = _row > 0 ? 1 : 0;
    //     return {
    //       rowspan: _row,
    //       colspan: _col
    //     };
    //   }
    //   // if(columnIndex === 1){
    //   // 	const _row = this.spanArr[rowIndex];
    //   // 	const _col = _row>0 ? 1 : 0;
    //   // 	return {
    //   // 		rowspan: _row,
    //   // 		colspan: _col
    //   // 	}
    //   // }
    // },
    addUserBut() {
      // this.parentRole();
      this.DatadialogVisible = true;
      this.mTable = true;
    },
    //获取父级角色
    // parentRole() {
    //   roleTree()
    //     .then(res => {
    //       console.log(res);
    //       this.formInline.options = res.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // 获取用户管理列表
    async getMenus() {
      moduleTree()
        .then(res => {
          // debugger
          let array = [];
          let data = res.data.data;
          data.map((item, index) => {
            array.push(
              Object.assign({}, item, {
                checkedCities: [],
                checkAll: false,
                isIndeterminate: false
              })
            );
          });
          let mkMune = [];
          array.forEach(obj => {
            obj.moduleDtos.forEach(item => {
              mkMune.push({ id: item.id, name: item.name });
            });
            obj.moduleDtos = mkMune;
            mkMune = [];
          });
          // console.log(array)
          this.selection = array;
          this.modifymune = array;

          // console.log(this.modifymune)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加修改用户全选名称
    handleCheckAllChange(index, val, data, change) {
      let sIndex = data[index];
      if (change === 1) {
        sIndex.checkedCities = val ? sIndex.moduleDtos : [];
      } else {
        // debugger
        let list = [];
        sIndex.moduleDtos.forEach(obj => {
          list.push(obj.id);
        });
        sIndex.checkedCities = val ? list : [];
      }
      if (val === true) {
        sIndex.isIndeterminate = false;
        sIndex.checkAll = true;
      } else {
        sIndex.isIndeterminate = false;
        sIndex.checkAll = false;
      }
    },
    //添加修改用户选择功能
    handleCheckedCitiesChange(index, value, data, change) {
      // debugger

      let sIndex = data[index];
      let checkedCount = value.length;
      let modLenght = [];
      if (change === 1) {
        modLenght = sIndex.moduleDtos;
      } else {
        modLenght = sIndex.moduleDtos;
      }
      sIndex.checkAll = checkedCount === modLenght.length;
      sIndex.isIndeterminate =
        checkedCount > 0 && checkedCount < modLenght.length;
    },
    //取消按钮
    toggleSelection() {
      this.DatadialogVisible = false;
      this.formInline.addUser = null;
      // this.formInline.region = null;
      this.formInline.userId = null;
      this.selection.forEach(e => {
        e.checkedCities = [];
        e.isIndeterminate = false;
        e.checkAll = false;
      });
    },
    //查询数据
    // searchData(name) {
    //   name = undefined ? null : name;
    //   this.getControlCommunities(name);
    // },
    //获取用户列表
    async getControlCommunities(pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageNum: pageIndex,
        name: this.formInline.searchUser || null, //名称
        createTimeBegin:
          this.formInline.creation_time == null
            ? null
            : this.formInline.creation_time[0], //创建时间开始
        createTimeEnd:
          this.formInline.creation_time == null
            ? null
            : this.formInline.creation_time[1], //创建时间结束
        username: this.formInline.username || null //用户名
      };
      // arg.name = name || null; //名称
      // debugger
      this.loading = true;
      roleList(arg)
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
    // 修改保存
    // saveCommunity2(name) {
    //   if (name === "") {
    //     this.$message({
    //       type: "warning",
    //       message: "角色名称不能为空！",
    //       center: true
    //     });
    //     return false;
    //   } else {
    //     let postList = [];
    //     this.modifymune.forEach(data => {
    //       //   console.log(data)
    //       data.childs.forEach(childs => {
    //         data.checkedList.forEach(checkedList => {
    //           if (childs.menuName == checkedList) {
    //             postList.push(childs.menuId);
    //           }
    //         });
    //       });
    //     });
    //     let a = postList.join(",");
    //     // console.log(this.modifymune);
    //     let data = {
    //       roleName: this.formInline.addUser,
    //       isDelete: 0,
    //       menuId: a,
    //       roleId: this.roleId
    //     };
    //     OperateRole(data)
    //       .then(res => {
    //         const loading = this.$loading({
    //           lock: true,
    //           text: "加载中",
    //           spinner: "el-icon-loading",
    //           background: "rgba(0, 0, 0, 0.7)"
    //         });
    //         setTimeout(() => {
    //           loading.close();
    //           this.$message({
    //             type: "success",
    //             message: "修改成功！",
    //             center: true
    //           });
    //           this.DatadialogVisible = false;
    //           this.getControlCommunities(
    //             null,
    //             this.pages.currentPage,
    //             this.pages.pageSize
    //           );
    //         }, 500);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    // },
    // toggleSelection2() {
    //   this.formInline.addUser = null;
    //   this.DatadialogVisible = false;
    //   // this.getControlCommunities(
    //   //   null,
    //   //   this.pages.currentPage,
    //   //   this.pages.pageSize
    //   // );
    // },
    // 确认
    async saveCommunity(obj, caidan, caozuo) {
      console.log(caidan);
      debugger;
      if (!!obj.addUser) {
        let menuIdList = [];
        for (let index = 0; index < caidan.length; index++) {
          const element = caidan[index];
          menuIdList.push(element.id);
          if (caozuo == "修改") {
            for (let dex = 0; dex < element.checkedCities.length; dex++) {
              menuIdList.push(element.checkedCities[dex]);
            }
          } else {
            for (let dex = 0; dex < element.checkedCities.length; dex++) {
              menuIdList.push(element.checkedCities[dex].id);
            }
          }
        }
        let data = {
          moduleIds: menuIdList,
          parentId: 0, //默认0
          name: obj.addUser // 角色名
        };
        if (caozuo == "修改") {
          data.id = obj.userId;
        }
        roleModuleUpdate(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              this.toggleSelection();
              this.getControlCommunities(
                this.pages.currentPage,
                this.pages.pageSize
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
        // console.log(menuIdList)
        // selectMenuByModel(data)
        //   .then(res => {
        // console.log(res)
        // let myData = res.data.data;
        // console.log(myData);
        // this.tableData = myData;
        // this.permissionDialog = true;
        // this.nextFormInline.roleName = obj.addUser;
        // let fatherRoleName;
        // this.formInline.options.forEach(element => {
        //   if (obj.region == element.id) {
        //     fatherRoleName = element.name;
        //   }
        // });
        // this.nextFormInline.fatherName = fatherRoleName;
        // this.rowspan();
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      } else {
        this.$message({
          type: "warning",
          message: "角色名称不能为空！",
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
    handleModify(obj) {
      // debugger;
      this.mTable = false;
      this.DatadialogVisible = true;
      this.formInline.addUser = obj.name;
      this.formInline.userId = obj.id; //用户id
      // this.formInline.region = obj.parentId; //父级id
      // this.roleId = id;
      let data = { id: obj.id };
      roleMenuTree(data)
        .then(res => {
          // debugger
          // console.log(res)
          this.modifymune.forEach(element => {
            res.data.data.forEach(obj => {
              if (obj.id == element.id) {
                obj.moduleDtos.forEach(item => {
                  element.checkedCities.push(item.id);
                });
              }
            });
          });
          // console.log(this.modifymune)
          this.modifymune.forEach(array => {
            if (array.checkedCities.length != 0) {
              array.isIndeterminate = true;
            }
            if (array.checkedCities.length == array.moduleDtos.length) {
              array.checkAll = true;
              array.isIndeterminate = false;
            }
          });
          // console.log(this.modifymune)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除用户
    async handleDelete(id) {
      let deleteData = {
        id: id
      };
      // debugger
      this.$confirm("此操作将永久删除该文件, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          roleDelete(deleteData)
            .then(res => {
              // debugger
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },

    //获取省
    async provinceList() {
      getProvinceList()
        .then(res => {
          this.seachFome.fom1.select = res.data.data;
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    //测评中心
    async siteList(id) {
      let resData = await allSite(null, id);
      this.seachFome.siteIdList = resData;
    },
    //测评中心查用户名列表
    async uerList_fuc(id) {
        let  data={
          site:id
        }
      userListByDept(data)
          .then(res => {
            if (res.data.returnCode != 0) {
              this.$message({
                type: "warning",
                message: res.data.returnMsg,
                center: true
              });
            } else {
              let dataList=res.data.data
              this.seachFome.fom3.select=dataList
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
  }
};
</script>

<style scoped lang="scss">
.xiangqing .el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
</style>
