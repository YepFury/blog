<template>
  <div class="login-view">
    <div class="login-content">
      <div class="logo">
        <i class="iconfont icon-blog-solid"></i>
        <span>yBlog</span>
      </div>
      <div class="login">
        <div class="login-input">
          <span>用户名</span>
          <el-input type="text" v-model="username"></el-input>
        </div>
        <div class="login-input">
          <span>密码</span>
          <el-input type="password" v-model="password"></el-input>
        </div>
        <el-button @click="submit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import { login } from "../../api/client";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submit() {
      // 随机生成6位字符串+AES加密组成密码
      let pwd = Math.random()
        .toString(36)
        .substr(2, 6);
      let s = CryptoJS.AES.encrypt(
        JSON.stringify(this.password),
        "secret key 123"
      ).toString();
      let params = {
        username: this.username,
        password: pwd.toUpperCase() + s
      };
      console.log(params);
      login(params).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-view {
  width: 280px;
  margin: 20px auto 0;
  .logo {
    display: flex;
    align-items: center;
    flex-direction: column;
    i {
      font-size: 48px;
      padding-top: 30px;
      padding-bottom: 24px;
      line-height: 1;
    }
    span {
      font-size: 28px;
      line-height: 1;
    }
  }
  .login {
    padding: 20px;
    margin-top: 16px;
    border-radius: 5px;
    border: 1px solid #eaecef;
    background-color: #f6f8fa;
    .el-input {
      margin-top: 5px;
      margin-bottom: 15px;
    }
    .el-button {
      width: 240px;
      height: 30px;
      padding: 0;
      text-align: center;
      color: #fff;
      background-color: #2c974b;
    }
  }
}
</style>
