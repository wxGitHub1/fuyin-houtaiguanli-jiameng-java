<template>
  <div class="container">
    <div class="login_box">
      <div style="margin-bottom: 30px">
        <img src="../../static/image/login/img_logotitle.png" alt="title" width="80%" />
      </div>
      <div class="input">
        <span>
          <i class="iconfont icon-zhanghaoguanli"></i>
        </span>
        <input type="text" placeholder="请输入账号" v-model="userCount" />
      </div>
      <div class="input">
        <span>
          <i class="iconfont icon-account_pwd"></i>
        </span>
        <input type="password" placeholder="请输入密码" v-model="userPassword" />
      </div>
      <el-button
        style="margin-top: 50px;"
        class="user_login"
        :loading="isSearch"
        @click="userLogin()"
      >登录</el-button>
      <div class="version">当前版本：1.0.0</div>
    </div>
  </div>
</template>

<script>
import $axios from "axios";
import session from "../utils/session";
import menuList_data from "../router/path";
import { checkLogine } from "../api/javaApi";
export default {
  name: "HelloWorld",
  data() {
    return {
      menu: null,
      userCount: null,
      userPassword: null,
      isSearch: false
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
            menuList_data.menuList_data.forEach(element => {
              if (element.text === menu[0].name) {
                this.$router.push({ name: element.name });
                return;
              }
            });
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
      this.isSearch = true;
      let self = this;
      //如果不填写账号和密码
      const userInfo = {
        username: self.userCount,
        password: self.userPassword
      };
      if (!userInfo.username && !userInfo.password) {
        this.isSearch = false;
        self.$message({
          message: "账号或密码不能为空！",
          type: "warning",
          center: true
        });
      } else {
        const loginState = await self.$store.dispatch("userLogin", userInfo);
        // debugger
        if (loginState.data.returnCode != "0") {
          this.isSearch = false;
          this.$message({
            type: "warning",
            message: loginState.data.returnMsg,
            center: true
          });
        } else {
          // let menu = session.getItem("menu");
          // menuList_data.menuList_data.forEach(element => {
          //   if (element.text === menu[0].name) {
              this.$router.push({ name: "home" });
          //     return;
          //   }
          // });
          this.isSearch = false;
        }
      }
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-image: url(../../static/image/login/img_background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  background-size: cover;
  background-position: center center;

  .login_box {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    .user_login {
      width: 100%;
      background-color: #59a4f2;
      border: 0px;
      // height: 45px;
      border-radius: 30px;
      font-size: 16px;
      letter-spacing: 4px;
      color: #f2f6fc;
      text-align: center;
      // line-height: 45px;
      font-weight: bold;
      cursor: pointer;
      padding: 15px 0;
    }
    .user_login:hover {
      transition: 1s;
      background: #409eff;
      color: #fff;
    }
    .input {
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 15px;
      input {
        width: 100%;
        font-size: 14px;
        background-color: rgba(255, 255, 255, 0.1);
        color: #e5e5e5;
        padding: 15px 18px 15px 16px;
        border-radius: 0 30px 30px 0;
      }
      input:focus {
        transition: 1s;
        background-color: rgba(255, 255, 255, 0.2);
      }
      :-ms-input-placeholder {
        letter-spacing: 1px;
        font-size: 14px;
        color: #e5e5e5;
      }
      ::-webkit-input-placeholder {
        letter-spacing: 2px;
        font-size: 14px;
        color: #e5e5e5;
      }
      span {
        background-color: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        padding: 14px 0 14px 19px;
        border-radius: 50% 0 0 50%;
      }
      i {
        // font-size: 17px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .version {
      color: #e5e5e5;
      font-size: 12px;
      text-align: right;
      margin-top: 40px;
      margin-right: 8%;
    }
  }
}
.container:before {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  content: "";
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
