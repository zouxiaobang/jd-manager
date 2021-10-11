<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px" class="login-form" :rules="loginRules">
      <h3 class="title">管理系统</h3>
      <el-form-item label="账号">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="记住我">
        <el-switch v-model="form.rememberMe"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signIn" :loading="loading">
          <span v-if="!loading">Sign In</span>
          <span v-else>Waiting Sign In ...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {encrypt, decrypt} from "@/utils/encrypt";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: '',
        rememberMe: false
      },
      loginRules: {
        username: [
          {
            require: true,
            trigger: 'blur',
            message: 'please enter your name'
          }
        ],
        password: [
          {
            require: true,
            trigger: 'blur',
            message: 'please enter your password'
          }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
        console.log(this.redirect)
      },
      immediate: true
    }
  },
  created() {
    this.getCache();
  },
  methods: {
    getCache() {
      let username = Cookies.get('username');
      let password = Cookies.get('password');
      let rememberMe = Cookies.get('rememberMe');
      this.form = {
        username: username === undefined ? this.form.username : username,
        password: password === undefined ? this.form.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    signIn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.form.rememberMe) {
            Cookies.set('username', this.form.username, {expires: 30});
            Cookies.set('password', this.form.password, {expires: 30});
            Cookies.set('rememberMe', this.form.rememberMe, {expires: 30});
          } else {
            Cookies.remove('username');
            Cookies.remove('password');
            Cookies.remove('rememberMe');
          }

          // todo 调用登录接口

        }
      })
    }
  }
}
</script>

<style scoped>
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url("../assets/login-background.jpg");
  background-size: 100%, 100%;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
}
</style>