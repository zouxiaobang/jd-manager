<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px" class="login-form" :rules="loginRules">
      <h3 class="title">管理系统</h3>
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="Remember">
        <el-switch v-model="form.remember"></el-switch>
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
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: '',
        password: '',
        remember: false
      },
      loginRules: {
        name: [
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
  methods: {
    signIn() {

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