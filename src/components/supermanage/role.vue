<template>
  <div class="container">
    <el-row>
      <el-col :span="2" class="margin-l-p1">
        <!-- 新增角色 -->
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="addUserBut"
        >新增角色</el-button>
      </el-col>
      <!-- 查询数据 -->
      <el-col :span="9">
        <el-form :inline="true" :model="formInline" size="small">
          <el-form-item label="角色名称">
            <el-input size="small" clearable v-model="formInline.searchUser" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="warning"
              icon="el-icon-search"
              @click="searchData(formInline.searchUser)"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 角色列表 -->
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
      <el-table-column align="center" prop="name" label="角色名称" min-width="20"></el-table-column>
      <el-table-column align="center" label="模块名称" prop="menuModule" min-width="100"></el-table-column>
      <el-table-column align="center" prop="createTime" label="添加日期" min-width="20"></el-table-column>
      <el-table-column align="center" label="操作" min-width="40">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="handleModify(scope.row)"
            size="small"
          >修改</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row.id)"
            icon="el-icon-delete"
            size="small"
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
      <el-row class="line-h-30">
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
      </el-row>
      <!-- 添加用户表格 -->
      <el-table
        v-if="mTable"
        :data="selection"
        tooltip-effect="dark"
        style="margin-top:20px"
        border
        :max-height="481"
      >
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
      <el-table
        v-else
        :data="modifymune"
        tooltip-effect="dark"
        style="margin-top:20px"
        border
        :max-height="481"
      >
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
          icon="el-icon-right"
          @click="saveCommunity(formInline,selection)"
          v-if="mTable"
        >下一步</el-button>
        <el-button
          type="success"
          icon="el-icon-right"
          @click="saveCommunity(formInline,modifymune,'修改')"
          v-else
        >下一步</el-button>
      </span>
    </el-dialog>
    <!-- 配置权限弹框 -->
    <el-dialog
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
    </el-dialog>
  </div>
</template>

<script>
import {
  roleList,
  roleDelete,
  roleTree,
  moduleTree,
  selectMenuByModel,
  roleMenuUpdate,
  roleMenuTree
} from "../../api/javaApi";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      permissionDialog: false,
      spanArr: [],
      position: 0,
      tableData: [
        {
          // id: "1",
          type: "1",
          name: "客户管理",
          amount1: "前台客户管理",
          mune: [
            {
              name: "新增权限",
              options: [
                {
                  value: "2",
                  label: "允许新增"
                },
                {
                  value: "0",
                  label: "不允许新增"
                }
              ],
              value: ""
            },
            {
              name: "删除权限",
              options: [
                {
                  value: "2",
                  label: "允许删除全部"
                },
                {
                  value: "1",
                  label: "允许删除个人"
                },
                {
                  value: "0",
                  label: "不允许删除"
                }
              ],
              value: ""
            },
            {
              name: "删除权限",
              options: [
                {
                  value: "2",
                  label: "允许删除全部"
                },
                {
                  value: "1",
                  label: "允许删除个人"
                },
                {
                  value: "0",
                  label: "不允许删除"
                }
              ],
              value: ""
            },
            {
              name: "删除权限",
              options: [
                {
                  value: "2",
                  label: "允许删除全部"
                },
                {
                  value: "1",
                  label: "允许删除个人"
                },
                {
                  value: "0",
                  label: "不允许删除"
                }
              ],
              value: ""
            },
            {
              name: "删除权限",
              options: [
                {
                  value: "2",
                  label: "允许删除全部"
                },
                {
                  value: "1",
                  label: "允许删除个人"
                },
                {
                  value: "0",
                  label: "不允许删除"
                }
              ],
              value: ""
            }
          ],
          value1: "",
          value2: ""
        }
      ],
      mTable: true,
      // 修改用户时的信息
      modifymune: [],
      // 添加用户时的信息
      selection: [],
      //添加和查询时用户名
      formInline: {
        seachUser: null,
        addUser: "",
        userId: "",
        region: "",
        options: []
      },
      //下一步弹框角色名称和父级名称
      nextFormInline: {
        roleName: "",
        fatherName: ""
      },
      //权限管理
      // limit: {
      //   add: true,:disabled="limit.add"
      //   delete: true:disabled="limit.delete"
      // },
      //表格数据
      clientData: [],
      //录入数据弹出框
      DatadialogVisible: false,
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      //弹框
      ModifydialogVisible: false,
      roleId: "",
      loading: true
    };
  },
  created() {
    this.getMenus();
    this.parentRole();
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
    //配置权限弹框确认
    determine() {
      let roleMenuForms = [];
      // debugger
      this.tableData.forEach(father => {
        father.menuDtos.forEach(obj => {
          roleMenuForms.push({ aclId: obj.id, level: obj.permission });
        });
      });

      let data = {
        name: this.formInline.addUser,
        parentId: this.formInline.region || 0,
        roleMenuForms: roleMenuForms
      };
      if (!!this.formInline.userId) {
        data.id = this.formInline.userId;
      } else {
        data.id = null;
      }
      // debugger;
      roleMenuUpdate(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.permissionDialog = false;
            this.toggleSelection();
            this.tableData = [];
            this.getControlCommunities();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 配置权限弹框上一步
    cancel() {
      this.permissionDialog = false;
      this.spanArr = [];
      this.position = 0;
    },
    // 合并单元格
    rowspan() {
      // debugger
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (
            this.tableData[index].parentId ===
            this.tableData[index - 1].parentId
          ) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
    },
    //表格合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // debugger
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      // if(columnIndex === 1){
      // 	const _row = this.spanArr[rowIndex];
      // 	const _col = _row>0 ? 1 : 0;
      // 	return {
      // 		rowspan: _row,
      // 		colspan: _col
      // 	}
      // }
    },
    addUserBut() {
      this.parentRole();
      this.DatadialogVisible = true;
      this.mTable = true;
    },
    //获取父级角色
    parentRole() {
      roleTree()
        .then(res => {
          console.log(res);
          this.formInline.options = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      this.formInline.region = null;
      this.formInline.userId = null;
      this.selection.forEach(e => {
        e.checkedCities = [];
        e.isIndeterminate = false;
        e.checkAll = false;
      });
    },
    //查询数据
    searchData(name) {
      name = undefined ? null : name;
      this.getControlCommunities(name);
    },
    //获取用户列表
    async getControlCommunities(name = null, pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageNum: pageIndex
      };
      arg.name = name || null; //名称
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
    // 添加用户下一步
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
          modules: menuIdList
        };
        if (caozuo == "修改") {
          data.roleId = obj.userId;
        }
        // console.log(menuIdList)
        selectMenuByModel(data)
          .then(res => {
            // console.log(res)
            let myData = res.data.data;
            console.log(myData);
            this.tableData = myData;
            this.permissionDialog = true;
            this.nextFormInline.roleName = obj.addUser;
            let fatherRoleName;
            this.formInline.options.forEach(element => {
              if (obj.region == element.id) {
                fatherRoleName = element.name;
              }
            });
            this.nextFormInline.fatherName = fatherRoleName;
            this.rowspan();
          })
          .catch(err => {
            console.log(err);
          });
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
      this.getControlCommunities(null, pageIndex, pageSize);
    },
    //页面条数发生变化时
    handleSizeChange(val) {
      this.pages.pageSize = val;
      let pageIndex = this.pages.currentPage;
      let pageSize = this.pages.pageSize;
      this.getControlCommunities(null, pageIndex, pageSize);
    },
    //修改
    handleModify(obj) {
      debugger;
      this.mTable = false;
      this.DatadialogVisible = true;
      this.formInline.addUser = obj.name;
      this.formInline.userId = obj.id; //用户id
      this.formInline.region = obj.parentId; //父级id
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
                    null,
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
    }
  }
};
</script>

<style scoped lang="scss">

</style>
