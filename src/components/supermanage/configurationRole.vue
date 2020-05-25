<template>
  <div>
    <!--配置角色-->
    <el-table
      :border="true"
      max-height="700"
      :data="clientData"
      class="client_table"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="name" label="角色名称" min-width="20"></el-table-column>
      <el-table-column label="当前用户">
        <template slot-scope="scope">
          <el-tag
            class="margin-l-10 margin-t-5"
            :key="tag.id"
            v-for="tag in scope.row.userDtos"
            closable
            :disable-transitions="false"
            @close="handleClose(tag,scope.$index,scope.row)"
          >{{tag.username}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="20">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleOrder(scope.row)"
            icon="el-icon-circle-plus-outline"
            size="small"
          >增加用户</el-button>
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
    <!-- 选择用户弹框 -->
    <el-dialog
      title="选择用户"
      width="70%"
      :visible.sync="userDialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      center
    >
      <div style="width:496px;margin:0 auto;">
        <el-transfer
          v-model="myValue"
          filterable
          filter-placeholder="请输入人员"
          :titles="['待选择人员', '被选择人员']"
          :data="nameList"
        ></el-transfer>
      </div>
      <span slot="footer">
        <el-button @click="cancel()" type="primary" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="serve()" type="success" icon="el-icon-circle-check">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  changeRoleList,
  userList,
  roleUser,
  deleteRoleUser
} from "../../api/javaApi";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      //分页
      pages: {
        total: 30,
        pageSize: 10,
        currentPage: 1
      },
      clientData: [
        // {
        //   name:"大客户",
        //   userDtos:[
        //             {name:"hah",id:1},
        //             {name:"hah",id:1}
        //           ]
        // }
      ],
      userDialog: false,
      nameList: [],
      myValue: [],
      severData: {
        users: [],
        roles: []
      },
      loading: true
    };
  },
  mounted() {
    this.getControlCommunities();
    this.personnel();
  },
  methods: {
    async getControlCommunities(name = null, pageIndex = 1, pageSize = 10) {
      let arg = {
        pageSize: pageSize,
        pageNum: pageIndex
      };
      // arg.name = name || null; //名称
      // debugger
      this.loading = true;
      changeRoleList(arg)
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
    //获取人员列表
    personnel() {
      userList()
        .then(res => {
          debugger;
          let data = res.data.data;
          data.forEach(element => {
            this.nameList.push({ label: element.username, key: element.id });
          });
          console.log(this.nameList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除人员
    handleClose(tag, index, obj) {
      this.clientData[index].userDtos.splice(
        this.clientData[index].userDtos.indexOf(tag),
        1
      );
      let data = {
        users: [tag.id],
        roles: []
      };
      data.roles.push(obj.id);
      // this.clientData[index].userDtos.forEach(element=>{
      //   data.users.push(element.id)
      // })
      debugger;
      deleteRoleUser(data)
        .then(res => {
          debugger;
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
        })
        .catch(errr => {
          console.log(err);
        });
    },
    // 新增人员
    handleOrder(obj) {
      // debugger
      this.userDialog = true;
      obj.userDtos.forEach(element => {
        this.myValue.push(element.id);
      });
      this.severData.roles.push(obj.id);
    },
    // 取消
    cancel() {
      this.userDialog = false;
      this.myValue = [];
      this.severData.users = [];
      this.severData.roles = [];
    },
    // 保存
    serve() {
      console.log(this.myValue);
      let data = this.severData;
      data.users = this.myValue;
      console.log(data);
      roleUser(data)
        .then(res => {
          debugger;
          this.$message({
            type: "success",
            message: "保存成功！",
            center: true
          });
          this.cancel();
          this.getControlCommunities(
            null,
            this.pages.currentPage,
            this.pages.pageSize
          );
        })
        .catch(errr => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.client_table {
  margin-top: 20px;
}
.tag {
  margin-left: 10px;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
