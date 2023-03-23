<template>
  <div id="register">
    <!-- 注册界面 -->
    <el-form
      :model="registerForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="registerForm"
    >
      <el-form-item class="title">
        <el-row>
          <el-col :span="11">
            <i class="el-icon-back" @click="backFn"></i>
          </el-col>
          <el-col :span="3">
            <h3>注册</h3>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item prop="nickname" class="nickName">
        <el-input
          type="text"
          v-model="registerForm.nickname"
          autocomplete="off"
          placeholder="昵称"
          class="input-1st"
        ></el-input>
      </el-form-item>

      <el-form-item class="upload">
        <span>上传头像</span>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <span>请上传大于1000*1000的图片</span>
      </el-form-item>

      <el-form-item prop="mail" class="email">
        <el-input
          type="text"
          v-model="registerForm.mail"
          autocomplete="off"
          placeholder="邮箱"
        ></el-input>
      </el-form-item>

      <el-form-item prop="code" class="email">
        <el-input
          type="text"
          v-model="registerForm.code"
          autocomplete="off"
          placeholder="验证码"
          class="input-2st"
        ></el-input>
        <el-button @click="sendCode" size="mini" type="primary" class="check"
          >发送验证码</el-button
        >
      </el-form-item>

      <el-form-item prop="passwd" class="passwordSet">
        <el-input
          type="password"
          v-model="registerForm.passwd"
          autocomplete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item class="commit">
        <el-button size="mini" class="btn" type="primary" @click="register"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SendCode, Register, CheckCode } from "../api/user";
export default {
  data() {
    return {
      registerForm: {
        mail: "",
        nickname: "",
        passwd: "",
        code: "",
      },
      rules: {
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
        // 邮箱校验
        mail: [
          {
            validator(rule, value, callback) {
              const reg =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
              if (reg.test(value)) {
                callback();
              } else if (value === "") {
                callback(new Error("请输入邮箱"));
              } else {
                callback(new Error("邮箱格式错误"));
              }
            },
            trigger: "blur",
          },
        ],
      },
      imageUrl: "",
    };
  },
  methods: {
    // 返回登录界面
    backFn() {
      this.$router.back();
    },
    // 发送验证码
    async sendCode() {
      const mail = this.registerForm.mail;
      try {
        const res = await SendCode(mail);
        console.log(res);
        this.$message({
          message: "验证码发送成功",
          type: "success",
        });
      } catch (error) {
        this.$message.error("验证码发送失败");
        console.log(error);
      }
    },
    // 注册
    async register() {
      const registerForm = this.registerForm;
      // 验证code
      try {
        const res = await CheckCode(registerForm);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      // 提交表单信息注册
      try {
        const res = await Register(registerForm);
        console.log(res);
        this.$message({
          message: "注册成功",
          type: "success",
        });
        // 保存邮箱到本地
        this.$store.commit("setMail", registerForm.mail);
        this.$store.commit("setNickName", registerForm.nickname);
        this.$store.commit("setPasswd", registerForm.passwd);
      } catch (error) {
        this.$message.error("注册失败");
        console.log(error);
      }
    },
    // 上传用户头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
#register {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .registerForm {
    height: 650px;
    width: 500px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-top: 30px;
      width: 80%;
      .el-icon-back {
        font-size: 20px;
        text-align: center;
        line-height: 45px;
        color: #333;
      }
      .el-icon-back:hover {
        color: #409eff;
      }
    }
    h3 {
      font-size: 20px;
      font-weight: normal;
    }
    .nickName {
      width: 80%;
      margin-top: 10px;
      .input-1st {
        width: 100%;
      }
      .randomBtn {
        margin-left: 20px;
      }
    }

    .email {
      width: 80%;
      // margin-top: 10px;
      .input-2st {
        width: 250px;
      }
      .check {
        margin-left: 40px;
      }
    }

    .passwordSet {
      width: 80%;
      // margin-top: 20px;
    }

    .commit {
      width: 80%;
      margin-top: 10px;
      .btn {
        width: 100%;
        height: 40px;
      }
    }
    .avatar-uploader {
      margin-right: 300px;
      height: 100px;
      width: 100px;
      border: 1px dashed #d9d9d9;
      border-radius: 5px;
      .avatar-uploader-icon {
        line-height: 100px;
      }
    }

    .avatar-uploader:hover {
      border: 1px dashed #409eff;
    }

    /deep/ .el-upload {
      height: 100px;
      width: 100px;
    }
  }
}
</style>
