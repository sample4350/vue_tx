<template>
  <div id="login">
    <!-- 登录界面 -->
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="loginForm"
    >
      <h3>同城推荐</h3>

      <el-form-item prop="mail" class="admin">
        <el-input
          type="text"
          v-model="loginForm.mail"
          autocomplete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>

      <el-form-item prop="passwd" class="password">
        <el-input
          type="password"
          v-model="loginForm.passwd"
          autocomplete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item prop="type" class="checkbox">
        <el-checkbox label="记住我" name="type" v-model="check"></el-checkbox>
        <router-link to="/register" class="register">注册账号</router-link>
      </el-form-item>

      <el-form-item class="login">
        <el-button size="mini" class="btn" type="primary" @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Login } from "@/api/user";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        mail: "",
        passwd: "",
      },
      rules: {
        // 邮箱校验
        mail: [
          {
            trigger: "blur",
            validator(rule, value, callback) {
              // const reg1 = /^\d{10}$/;
              const reg2 =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
              if (reg2.test(value)) {
                callback();
              } else if (value === "") {
                callback(new Error("请输入邮箱"));
              } else {
                callback(new Error("邮箱格式错误"));
              }
            },
          },
        ],
        // 密码校验
        passwd: [
          {
            trigger: "blur",
            validator(rule, value, callback) {
              const reg = /^\w{8,12}$/;
              if (reg.test(value) === false) {
                callback(new Error("请输入8-12位的密码,且不能包含特殊字符"));
              }
            },
          },
        ],
      },
      check: this.$store.state.check,
    };
  },
  methods: {
    // 登录
    async login() {
      // 提交表单账号密码，请求登录
      try {
        const { data } = await Login(this.loginForm);
        // console.log(data);
        if (data.data == null) {
          this.$message.error("登陆失败");
          return;
        }
        // 返回的数据中带有token，保存token到本地
        this.$store.commit("setUser", data.data);
        this.$message({
          message: "登录成功",
          type: "success",
        });
        // 登录成功跳转到偏好设置
        this.$router.push({ path: "/map" });
        this.$store.commit("setMail", this.loginForm.mail);
        this.$store.commit("setPasswd", this.loginForm.passwd);
      } catch (error) {
        this.$message.error("登陆失败");
        console.log(error);
      }
    },
  },
  mounted() {
    if (this.check) {
      this.loginForm.mail = this.$store.state.mail;
      this.loginForm.passwd = this.$store.state.passwd;
    }
  },
  watch: {
    check(newval, oldval) {
      if (newval === true) {
        this.$store.commit("setSave", this.check);
      } else {
        this.$store.commit("setSave", this.check);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginForm {
    background-color: #fff;
    height: 400px;
    width: 520px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      margin-top: 40px;
      letter-spacing: 2px;
      font-size: 25px;
      font-weight: normal;
    }

    .admin {
      margin-top: 50px;
      width: 70%;
    }

    .password {
      width: 70%;
    }

    .checkbox {
      width: 70%;
      display: flex;
      position: relative;

      .register {
        position: absolute;
        left: 305px;
        width: 60px;
        cursor: pointer;
      }
    }

    .login {
      width: 70%;
      .btn {
        height: 40px;
        width: 100%;
        font-size: 15px;
      }
    }
  }
}
</style>
