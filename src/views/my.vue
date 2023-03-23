<template>
  <div id="my">
    <el-form :model="myForm" class="myForm">
      <el-form-item class="title">
        <el-row>
          <el-col :span="10">
            <i class="el-icon-back" @click="backFn"></i>
          </el-col>
          <el-col :span="4">
            <h3>用户中心</h3>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item class="t1">修改密码</el-form-item>
      <!-- <el-form-item class="modify">
        <el-input
          type="password"
          placeholder="原密码"
          pass="passwd"
          v-model="myForm.passwd"
          class="input-1st"
        ></el-input>
      </el-form-item> -->
      <el-form-item class="modify">
        <el-input
          type="password"
          placeholder="新密码"
          pass="passwd"
          v-model="myForm.passwd"
          class="input-1st"
        ></el-input>
        <el-button
          type="primary"
          @click="modifyPasswd"
          size="mini"
          class="btn-1st"
          >提交</el-button
        >
      </el-form-item>

      <el-form-item class="t1">修改昵称</el-form-item>
      <el-form-item class="modify">
        <el-input
          type="text"
          placeholder="新昵称"
          pass="nickname"
          v-model="myForm.nickname"
          class="input-1st"
        ></el-input>
        <el-button
          type="primary"
          @click="modifyNicName"
          size="mini"
          class="btn-1st"
          >提交</el-button
        >
      </el-form-item>

      <el-form-item class="upload">
        <span>修改头像</span>
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
        <el-button type="primary" size="mini" class="btn-1st">提交</el-button>
      </el-form-item>

      <el-form-item class="exit">
        <el-button type="warning" size="mini" class="exitBtn" @click="toLogin"
          >退出登录</el-button
        >
      </el-form-item>

      <el-form-item class="exit">
        <el-button type="danger" size="mini" class="exitBtn" @click="delUser"
          >注销</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ModifyPasswd, ModifyNickName, DelUser } from "@/api/user";
export default {
  data() {
    return {
      myForm: {
        mail: this.$store.state.mail,
        passwd: "",
        nickname: "",
      },
      imageUrl: "",
      localStorage: {
        mail: this.$store.state.mail,
        nickname: this.$store.state.nickname,
        passwd: this.$store.state.passwd,
      },
    };
  },
  methods: {
    // 修改密码
    async modifyPasswd() {
      try {
        const res = await ModifyPasswd(this.myForm);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    // 修改昵称
    async modifyNicName() {
      try {
        const res = await ModifyNickName(this.myForm);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    // 注销账号
    async delUser() {
      try {
        const res = await DelUser(this.localStorage);
        console.log(res);
        this.$message({
          message: "注销成功",
          type: "success",
        });
        this.$router.push({path: '/'})
      } catch (error) {
        console.log(error);
      }
    },
    backFn() {
      this.$router.back();
    },
    toLogin() {
      this.$router.push({ path: "login" });
      this.$message({
        message: "退出成功",
        type: "success",
      });
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
#my {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .myForm {
    height: 700px;
    width: 500px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .title {
      width: 80%;
      height: 40px;
      .el-icon-back {
        line-height: 100px;
      }
    }
    h3 {
      margin-top: 30px;
    }
    .t1 {
      // border: 1px solid #000;
      width: 80%;
      margin-top: 20px;
    }
    .modify {
      width: 80%;
      // margin-top: 10px;
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      // border: 1px solid #000;
      .input-1st {
        width: 70%;
      }
      .btn-1st {
        margin-left: 20px;
      }
    }
    .upload {
      display: flex;
      width: 80%;
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
    .exit {
      width: 80%;
      .exitBtn {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
