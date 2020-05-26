//原版登录页复制页面
<template>
  <div class="container">
    <el-row >
      <el-col class="login_box" :span="6" :offset="9">
        <el-row :span="24">
          <el-col class="top_sign" :span="12" :offset="6">
            <img src="../../static/image/login/img_title.png" alt />
          </el-col>
        </el-row>
        <el-row :span="24" style="margin-top: 31px">
          <el-col class="input" :span="20" :offset="2">
            <i class="iconfont icon-zhanghaoguanli">
              <!-- <img src="../../static/image/login/icon_zhangh.png" alt /> -->
            </i>
            <input type="text" placeholder="请输入账号" v-model="userCount" />
          </el-col>
        </el-row>
        <el-row :span="24" style="margin-top: 15px;">
          <el-col class="input" :span="20" :offset="2">
            <i class="iconfont icon-account_pwd">
              <!-- <img src="../../static/image/login/icon_mm.png" alt /> -->
            </i>
            <input type="password" placeholder="请输入密码" v-model="userPassword" />
            <!-- <i><img src="../../static/image/login/icon_yc1.png" alt=""></i> -->
          </el-col>
        </el-row>
        <el-row :span="24" style="margin-top: 31px;">
          <el-col :span="20" :offset="2" class="login_btn">
            <div class="user_login" @click="userLogin()">登陆</div>
          </el-col>
        </el-row>
        <div class="version">当前版本：2.0.3</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $axios from "axios";
import session from "../utils/session";
import { actions_data } from "../router/path";
import { checkLogine } from "../api/javaApi";
export default {
  name: "HelloWorld",
  data() {
    return {
      menu: null,
      userCount: null,
      userPassword: null
    };
  },

  created() {},
  updated() {},
  beforeRouteLeave(to, form, next) {
    document.onkeydown = undefined;
    next();
  },
  mounted() {
    //添加监听回车按键
    this.listenKey();
    this.isint();
  },
  // computed: {
  //通过session获取vuex islogin属性
  // isLogin() {
  //   debugger
  //   if (session.getUser() && session.getValidate()) {
  //     this.$store.commit("USER_STATUS", sessionStorage.getItem("user"));
  //     console.log(this.$store.state);
  //     if (this.$store.state) {
  //       this.$router.push("/Support");
  //     }
  //   } else {
  //     this.$store.commit("USER_STATUS", null);
  //   }
  //   return this.$store.getters.isLogin;
  // }
  // },
  methods: {
    // 判断是否登录
    isint() {
      //加载完毕
      checkLogine()
        .then(res => {
          if (res.data.returnCode == 0) {
            session.setUser(res.data.data.name); //保存用户id
            session.setItem("username", res.data.data.name); //保存用户名
            session.setItem("menu", res.data.data.roleName); //保存用户菜单
            // commit('USER_STATUS', res.data.data);
            let menu = session.getItem("menu");
            let actions = actions_data;
            let action = actions[menu[0].name] || actions["404"];
            this.$router.push(action);
            // this.$message({
            //   message: "用户已登录",
            //   type: "warning",
            //   center: true
            // });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //监听按键
    listenKey() {
      let _self = this;
      document.onkeydown = e => {
        let key = window.event.keyCode;
        if (key === 13) {
          _self.userLogin();
          return false;
        }
      };
    },
    //登陆
    async userLogin() {
      let self = this;
      //如果不填写账号和密码
      const userInfo = {
        username: self.userCount,
        password: self.userPassword
      };
      if (!userInfo.username && !userInfo.password) {
        self.$message({
          message: "账号或密码不能为空！",
          type: "warning",
          center: true
        });
      } else {
        const loginState = await self.$store.dispatch("userLogin", userInfo);
        // debugger
        if (loginState.data.returnCode != "0") {
          this.$message({
            type: "warning",
            message: loginState.data.returnMsg,
            center: true
          });
        } else {
          let menu = session.getItem("menu");
          let actions = actions_data;
          //  {
          //   超级管理员: "/supermanage",
          //   大客户: "/bigclient",
          //   外出体检: "/outwork",
          //   前台: "/Front",
          //   支具室: "/Support",
          //   取型: "/TakeType",
          //   试穿: "/clothes",
          //   测评: "/Evaluation",
          //   回访管理: "/return",
          //   "404": "/404"
          // };
          // debugger
          let action = actions[menu[0].name] || actions["404"];
          self.$router.push(action);
        }
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-image: url(../../static/image/login/img_background.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .login_box {
    margin-top: 16%;
    height: 345px;
    background-color: #ffffff;
    box-shadow: 0 3px 43px 0px rgba(40, 121, 194, 0.36);
    border-radius: 10px;
    .top_sign {
      height: 62px;
      img {
        width: 100%;
        margin-top: -23%;
      }
    }
    .user_login:hover {
      border-radius: 10px;
      background: rgb(66, 152, 240);
      color: #fff;
    }
    .input {
      border-bottom: 2px solid #e5e5e5;
      input {
        width: 82%;
        letter-spacing: 1px;
        font-size: 16px;
        color: #9babbb;
        // vertical-align: 6px;
      }
      :-ms-input-placeholder {
        letter-spacing: 1px;
        font-size: 16px;
        color: #e5e5e5;
      }
      ::-webkit-input-placeholder {
        letter-spacing: 2px;
        font-size: 16px;
        color: #e5e5e5;
      }
      i {
        color: #9babbb;
        // display: inline-block;
        // width: 7%;
        // img {
        //   width: 100%;
        // }
      }
    }
    .login_btn {
      background-color: #59a4f2;
      height: 51px;
      border-radius: 10px;
      font-size: 18px;
      letter-spacing: 4px;
      color: #f2f6fc;
      text-align: center;
      line-height: 51px;
      font-weight: bold;
      cursor: pointer;
    }
    .version {
      color: #59a4f2;
      font-size: 12px;
      text-align: right;
      margin-top: 40px;
      margin-right: 8%;
    }
  }
}
</style>
