//已分配
<template>
  <div>
    <!-- seach -->
    <el-form :inline="true" size="small" id="search" class="padding-LR-p10">
      <el-form-item label="客户姓名">
        <el-input v-model="seach.memberName" class="w-150" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input class="w-150" v-model="seach.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="评价状态">
        <el-select clearable class="w-150" v-model="seach.appraisalValue" placeholder="请选择">
          <el-option
            v-for="item in seach.appraisals"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务人员">
        <el-select clearable class="w-150" v-model="seach.userName" placeholder="请选择">
          <el-option
            v-for="item in userNameList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="服务种类">
        <el-select clearable class="w-150" v-model="seach.serviceValue" placeholder="请选择">
          <el-option
            v-for="item in seach.services"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接待状态">
        <el-select clearable class="w-150" v-model="seach.statusValue" placeholder="请选择">
          <el-option
            v-for="item in seach.status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省份">
        <el-select
          clearable
          class="w-150"
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
          clearable
          class="w-150"
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
          @change="userNameList_fuc(seach.siteValue)"
          v-model="seach.siteValue"
          placeholder="请先选择城市"
        >
          <el-option
            v-for="item in seach.siteLists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分配日期">
        <el-date-picker
          class="w-250"
          v-model="seach.distributionTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="pageList(pages.currentPage,pages.pageSize)"
          type="warning"
          icon="el-icon-search"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table
      border
      :data="clientData"
      max-height="615"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-row-class-name="'headerClass'"
    >
      <el-table-column width="60" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="memberName" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="type" label="服务类型"></el-table-column>
      <el-table-column align="center" prop="userName" label="服务人员"></el-table-column>
      <el-table-column align="center" prop="status" label="接待状态"></el-table-column>
      <el-table-column align="center" prop="assignTime" label="接待时长"></el-table-column>
      <el-table-column align="center" prop="firstAssignTime" label="到访时间"></el-table-column>
      <el-table-column align="center" prop="createTime" label="分配时间"></el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <!-- <el-button
            v-if="panduan(scope.row)"
            @click="openDrawer(scope.row)"
            type="primary"
            size="small"
          >评价</el-button>-->
          <el-button
            v-if="wanchengjd(scope.row)"
            @click="completeReception(scope.row.id)"
            type="warning"
            plain
            size="small"
          >完成接待</el-button>
          <el-button
            v-if="scope.row.status == '未接待' ? true:false"
            @click="distribution(scope.row)"
            type="success"
            size="small"
          >重新分配</el-button>
          <el-button
            v-if="scope.row.status == '未接待' ? true:false"
            @click="Unassign(scope.row.id)"
            type="success"
            size="small"
          >取消分配</el-button>
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
    <!-- 选择用户弹框 -->
    <el-dialog
      title="人员分配"
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
        <el-button @click="serve()" type="success" icon="el-icon-circle-check">确认</el-button>
      </span>
    </el-dialog>
    <!-- drawer 评价抽屉-->
    <el-drawer
      id="pingjia"
      title="评价开始！请客户开始评价！"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
      center
    >
      <div class="visitEvaluation">
        <div class="questionOne">{{question.title}}</div>
        <div class="cpry">
          <el-image :src="evaluator.imgUrl" class="img">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="center margin-t-10">{{evaluator.title}}</div>
        <div class="questionOneBut">
          <div
            v-for="(item,index) in question.answer"
            :key="index"
            :class="{active:active==item.title}"
          >{{item.title}}</div>
        </div>
      </div>
      <div v-if="is_sc">
        <el-row :gutter="20" class="margin-t-30">
          <el-col :span="6" :offset="3">
            <div>是否学会穿戴：</div>
          </el-col>
          <el-col :span="15">
            <div>
              <el-radio-group v-model="radio1">
                <el-radio :label="1" disabled>学会了</el-radio>
                <el-radio :label="2" disabled>没学会</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="margin-t-30">
          <el-col :span="6" :offset="3">
            <div>是否清晰注意事项：</div>
          </el-col>
          <el-col :span="15">
            <div>
              <el-radio-group v-model="radio2">
                <el-radio :label="3" disabled>清楚</el-radio>
                <el-radio :label="4" disabled>差不多</el-radio>
                <el-radio :label="5" disabled>不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="center" style="margin-top:20%;">
        <el-button type="primary" @click="getRatingInformation">获取客户评价信息</el-button>
        <el-button type="success" @click="SaveRatingInformation">保存客户评价信息</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  assignList,
  userList,
  updateAssign,
  getPjInfo,
  userListByDept,
  setPjType,
  assignAppraisal,
  endAdmit
} from "../../api/javaApi";
import {
  exportMethod,
  province,
  city,
  site,
  allSite,
  personnel
} from "../../utils/public";
import { Promise, all, async } from "q";
import session from "../../utils/session";
export default {
  name: "App",
  data() {
    return {
      src: require("../../images/cpr.jpg"),
      active: null,
      activeTwo: null,
      memberId: null,
      question: {
        title: "为了提高我们的服务质量，请您为本次服务人员进行评价",
        answer: [
          { title: "十分满意" },
          { title: "满意" },
          { title: "一般" },
          { title: "不满意" },
          { title: "十分不满意" }
        ]
      },
      is_sc: false,
      radio1: null,
      radio2: null,
      radio1Name: null,
      radio2Name: null,
      clientData: [],
      loading: true,
      //分页
      pages: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      seach: {
        memberName: null,
        phone: null,
        distributionTime: null,
        evaluationValue: null,
        serviceValue: null,
        statusValue: null,
        appraisalValue: null,
        evaluations: [
          { name: "待取型", id: 310 },
          { name: "待测评", id: 201 },
          { name: "待试穿", id: 360 }
        ],
        services: [
          { name: "取型", id: 310 },
          { name: "测评", id: 201 },
          { name: "试穿", id: 360 },
          { name: "维修", id: 370 }
        ],
        status: [
          { name: "未接待", id: "0" },
          { name: "接待中", id: 1 },
          { name: "已接待", id: 2 }
        ],
        appraisals: [
          { name: "待评价", id: "0" },
          { name: "已评价", id: 1 }
        ],
        siteLists: [],
        siteValue: null,
        provinceId: null,
        cityId: null,
        provinceIdList: [],
        cityIdList: []
      },
      userDialog: false,
      myValue: [],
      nameList: [],
      cxfp: {
        id: null
      },
      drawer: false,
      direction: "rtl",
      evaluator: {
        title: null,
        imgUrl: null
      },
      myType: null,
      userNameList: []
    };
  },
  mounted() {
    this.pageList();
    this.provinceList();
    this.userNameList_fuc();
    // this.personnel();
  },
  methods: {
    completeReception(id) {
      this.$confirm("是否完成接待, 是否继续?", "提示", {
        center: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: id
          };
          endAdmit(data)
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
                  message: "完成接待！",
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
            message: "已取消！"
          });
        });
    },
    SaveRatingInformation() {
      let data = {};
      if (this.myType === "试穿") {
        data.id = this.pjId;
        data.appraisal = this.active;
        data.question = "是否学会穿戴?";
        data.answer = this.radio1Name;
        data.question2 = "是否清晰注意事项?";
        data.answer2 = this.radio2Name;
      } else {
        data.id = this.pjId;
        data.appraisal = this.active;
      }

      assignAppraisal(data)
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
              message: "保存成功！",
              center: true
            });
            this.handleClose();
            this.pageList(this.pages.currentPage, this.pages.pageSize);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRatingInformation() {
      getPjInfo()
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(res);
            this.activeTwo = res.data.data.answer2;

            if (this.myType === "试穿") {
              this.active = res.data.data.question1;
            } else {
              this.active = res.data.data.answer1;
            }
            this.radio1Name = res.data.data.answer1;
            this.radio2Name = res.data.data.answer2;
            if (res.data.data.answer1 == "学会了") {
              this.radio1 = 1;
            } else if (res.data.data.answer1 == "没学会") {
              this.radio1 = 2;
            }
            if (res.data.data.answer2 == "清楚") {
              this.radio2 = 3;
            } else if (res.data.data.answer2 == "差不多") {
              this.radio2 = 4;
            } else if (res.data.data.answer2 == "不清楚") {
              this.radio2 = 5;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    openDrawer(obj) {
      // this.drawer = true;
      this.pjId = obj.id;
      this.myType = obj.type;
      if (obj.type == "试穿") {
        this.is_sc = true;
      } else {
        this.is_sc = false;
      }
      let data = {
        userId: obj.userId[0],
        name: obj.type,
        type: 3
      };
      setPjType(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(res);
            this.evaluator.title = res.data.data.name;
            this.evaluator.imgUrl = res.data.data.photo;
            this.drawer = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClose() {
      this.drawer = false;
      this.radio1 = null;
      this.active = null;
      this.radio1Name = null;
      this.radio2Name = null;
      this.activeTwo = null;
      this.radio2 = null;
    },
    distribution(obj) {
      this.userDialog = true;
      this.cxfp.id = obj.id;
      this.personnel(obj.type, obj.siteId);
    },
    Unassign(id) {
      this.$confirm("此操作将取消分配, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: id,
            status: 3
          };
          updateAssign(data)
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
                  message: "取消成功！",
                  center: true
                });
                this.pageList(this.pages.currentPage, this.pages.pageSize);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    cancel() {
      this.userDialog = false;
      this.nameList = [];
    },
    serve() {
      let data = {
        id: this.cxfp.id,
        users: this.myValue
      };
      updateAssign(data)
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.cancel();
            this.$message({
              type: "success",
              message: "分配成功！",
              center: true
            });
            this.pageList(this.pages.currentPage, this.pages.pageSize);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    wanchengjd(obj) {
      if (obj.status == "接待中") {
        return true;
      } else {
        return false;
      }
    },
    panduan(obj) {
      if (
        (obj.status == "已接待" || obj.status == "接待中") &&
        obj.isAppraisal == 0 &&
        obj.type != "维修"
      ) {
        return true;
      } else {
        return false;
      }
    },
    //获取人员列表
    //获取测评、试穿、取型、维修人员列表9/6/8/12
    personnel(name, siteId) {
      let ry = {
        测评: 9,
        试穿: 6,
        取型: 8,
        维修: 12
      };
      let ids = ry[name] || null;
      userListByDept({ deptId: ids, siteId: siteId })
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            console.log(res);
            let data = res.data.data;
            let list = [];
            data.forEach(element => {
              list.push({ label: element.username, key: element.id });
            });
            this.nameList = list;
            console.log(this.nameList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // personnel() {
    //   userList()
    //     .then(res => {
    //       // debugger;
    //       let data = res.data.data;
    //       console.log(data);
    //       data.forEach(element => {
    //         this.nameList.push({ label: element.username, key: element.id });
    //       });
    //       console.log(this.nameList);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //统计列表 //查询
    async pageList(pageIndex = 1, pageSize = 10) {
      let data = {
        pageNum: pageIndex,
        pageSize: pageSize,
        memberName: this.seach.memberName || null,
        phone: this.seach.phone || null,
        beginTime:
          this.seach.distributionTime == null
            ? null
            : this.seach.distributionTime[0],
        endTime:
          this.seach.distributionTime == null
            ? null
            : this.seach.distributionTime[1],
        type: this.seach.serviceValue || null,
        status: this.seach.statusValue == "0" ? 0 : this.seach.statusValue,
        appraisal:
          this.seach.appraisalValue == "0" ? 0 : this.seach.appraisalValue,
        userName: this.seach.userName || null,
        provinceId: this.seach.provinceId,
        cityId: this.seach.cityId,
        siteId: this.seach.siteValue
      };
      this.loading = true;
      assignList(data)
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
    //服务人员列表
    async userNameList_fuc(id = null) {
      this.userNameList = await personnel(null, id);
    }
  }
};
</script>

<style scoped lang="scss">
.visitEvaluation {
  width: 100%;
  position: relative;
  .questionOne {
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  .cpry {
    text-align: center;
  }
  .cpry .img {
    width: 20%;
  }
  .questionOneBut {
    color: #ffffff;
    font-size: 20px;
    margin-left: 10%;
    margin-top: 40px;
    div {
      display: inline-block;
      width: 15%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-left: 3%;
      // padding: 5px;
      border: 4px solid #67c23a;
      border-radius: 20px;
    }
    .active {
      background: #67c23a;
    }
  }
}
// .image-slot{
//   display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 200px;
//     background: #f5f7fa;
//     color: #909399;
//     font-size: 30px;
// }
</style>
<style>
#pingjia .el-drawer__open .el-drawer.rtl {
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
}
#pingjia .el-drawer__header {
  color: #ffffff;
}
#pingjia .el-radio__input.is-checked .el-radio__inner {
  border-color: #67c23a !important;
  background: #67c23a !important;
}
#pingjia .el-radio__input.is-checked + .el-radio__label {
  color: #67c23a !important;
}
</style>
