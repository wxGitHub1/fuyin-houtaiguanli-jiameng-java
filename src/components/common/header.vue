<template>
  <div class="container">
    <el-row class="header">
      <el-col :span="4">
        <div class="left_banner">
          <img src="../../../static/image/login/img_title.png" />
        </div>
      </el-col>
      <el-col :span="17" class="middle_banner"></el-col>
      <el-col :span="3" class="right_banner">
        <el-row>
          <el-col :span="6">
            <div class="head_pic">
              <img src="../../../static/image/login/gly.png" />
            </div>
          </el-col>
          <el-col :span="12" class="name_type">
            <p @click="changePerson()">{{user.name || '暂无数据'}}</p>
            <p @click="changePerson()">{{witchPage || '暂无数据'}}</p>
          </el-col>
          <el-col :span="6" class="arrow_box">
            <el-dropdown :hide-on-click="true" type="primary" trigger="click">
              <span class="el-dropdown-link">
                <span class="arrows"></span>
              </span>
              <el-dropdown-menu :split-button="true" slot="dropdown" style="width: 9%;">
                <el-dropdown-item
                  @click.native="gotoBigClient(item.name)"
                  v-for="(item,index) in menu "
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="nav_bar">
      <el-row v-for="(nav,index) in navTables" :key="nav.name">
        <el-col class="nav_box" :class="{active:cur==index}">
          <i class="iconfont" :class="nav.icon">
          </i>
          <span @click="switchTitle(nav.name,index)">{{nav.title}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import session from "../../utils/session";
import { logout } from "../../api/javaApi";
// import { viewPage_function} from "../../router/path";
import  menuList_data from "../../router/path";
export default {
  name: "HelloWorld",
  props: {
    navTables: Array,
  },
  data() {
    return {
      newNavTable: [],
      user: {
        name: null,
        limit: null
      },
      //显示当前页面名称
      witchPage: null,
      menu: [],
      cur: 0
    };
  },
  created() {
    this.creat();
  },
  mounted() {
    this.init();
  },
  methods: {
    creat() {
      let name = session.getItem("username");
      let menu = session.getItem("menu");
      if (!!name && !!menu) {
        this.user.name = name;
        this.menu = menu;
      } else {
        this.$router.push("/login");
        session.removeItem("user");
        session.removeItem("username");
        session.removeItem("menu");
        // this.$message({
        //   type: "error",
        //   message: "登录过期！请重新登录！"
        // });
      }
    },
    init() {
    //  console.log(this.$route.name) 
      let data=menuList_data.menuList_data
      this.witchPage = menuList_data.viewPage_function(this.$route.name,data);
      if (this.$store.state.login.username) {
        this.user.name = this.$store.state.login.username;
        this.menu = this.$store.state.login.menu;
      } else {
        this.user.name = session.getItem("username");
        this.menu = session.getItem("menu");
      }
      this.$store.dispatch("saveStatus", this.user);
      this.$store.dispatch("saveStatus", this.menu);
    },
    switchTitle(item, index) {
      this.$emit("acceptTitle", item);
      this.cur = index;
    },
    //退出账户
    changePerson() {
      this.$confirm("是否退出并更改账号？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "进入个人主页",
        center: true
      })
        .then(() => {
          logout()
            .then(res => {
              if (res.data.returnCode != 0) {
                this.$message({
                  type: "warning",
                  message: res.data.returnMsg,
                  center: true
                });
              } else {
                this.$router.push("/login");
                session.removeItem("user");
                session.removeItem("username");
                session.removeItem("menu");
                this.$message({
                  type: "info",
                  message: "已退出系统"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err === "cancel" ? "开发中！" : "已取消"
          });
        });
    },
    //跳转页面
    gotoBigClient(adress) {
      menuList_data.menuList_data.forEach(element => {
        if(element.text === adress){
          this.$router.push({ name:element.name });
          return
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  height: 100%;
  // min-width: 1200px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #56a9ff;
    .left_banner {
      width: 73.5%;
      margin-top: -42px;
      margin-left: -50px;
    }
    .middle_banner {
      height: 100%;
    }
    .right_banner {
      height: 100%;
      background: #2883e0;
      .head_pic {
        height: 60px;
        line-height: 72px;
        text-align: center;
        img {
          width: 28px;
          height: 28px;
        }
      }
      .name_type {
        height: 60px;
        line-height: 20px;
        cursor: pointer;
        p {
          margin: 0;
          padding: 0;
          color: #ffffff;
          letter-spacing: 1px;
        }
        p:first-child {
          font-size: 18px;
          margin-top: 10px;
        }
        p:last-child {
          font-size: 12px;
          // margin-top: 2px;
        }
      }
      .arrow_box {
        height: 60px;
        // margin-top: 13px;
        border-left: 2px solid #1465b7;
        text-align: center;
        .arrows {
          display: inline-block;
          width: 15px;
          height: 15px;
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(45deg);
          margin-top: 3px;
        }
      }
    }
  }
  .nav_bar {
    width: 180px;
    height: calc(100% - 60px);
    display: inline-block;
    background: #ffffff;
    position: relative;
    right: 16.8%;
    border-right: 1px solid #eeeeee;
    overflow-x: hidden;
    .nav_box {
      font-size: 16px;
      letter-spacing: 1px;
      color: #606266;
      padding-left: 20px;
      line-height: 30px;
      margin-top: 20px;
      cursor: pointer;
      // span {
      //   position: relative;
      //   bottom: 8px;
      // }
    }
    .active {
      background: rgb(244, 244, 244);
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
