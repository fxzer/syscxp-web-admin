<template>
  <div class="login-wrapper">
    <div class="form-wrapper">
      <el-form
        class="login-form"
        :model="loginForm"
        ref="formRef"
        :rules="formRules"
        size="normal"
      >
        <h1>
          <span  >官网后台管理</span>
        </h1>
        <el-form-item class="account-type">
          <el-radio-group v-model="accountType">
            <el-radio-button label="account">账户登录</el-radio-button>
            <el-radio-button label="user">子用户登录</el-radio-button>
          </el-radio-group>
        </el-form-item>


        <el-form-item
          :prop="loginMethod"
          class="login-form-item"
          v-if="accountType === 'account'"
         :rules="formRules[loginMethod]"
        >
          <el-input
            prefix-icon="el-icon-user"
            class="login-input"
             v-model="loginForm[loginMethod]"
            :placeholder="`请输入${loginMethodMap[loginMethod]}`"
          >
            <el-select style="width:110px" v-model="loginMethod" slot="prepend" placeholder="请选择" >
            <el-option label="账户名" value="accountName"  ></el-option>
            <el-option label="手机号" value="phone"></el-option>
            <el-option label="邮箱" value="email"></el-option>
          </el-select>
          </el-input>
        </el-form-item>

        <!-- 用户名 -->
        <el-form-item
          :prop="userLoginMethod"
          v-if="accountType === 'user'"
          class="login-form-item"
          :rules="formRules[userLoginMethod]"
        >
          <el-input
            prefix-icon="el-icon-user"
            class="login-input"
            v-model="loginForm[userLoginMethod]"
             :placeholder="`请输入${userLoginMethodMap[userLoginMethod]}`"
          >
          <el-select style="width:110px" v-model="userLoginMethod" slot="prepend" placeholder="请选择" >
            <el-option label="用户名" value="userName"></el-option>
            <el-option label="手机号" value="userPhone"></el-option>
            <el-option label="邮箱" value="userEmail"></el-option>
          </el-select>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-form-item">
          <el-input
            prefix-icon="el-icon-unlock"
            class="login-input"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="imageCode" class="login-form-item">
          <el-input
            prefix-icon="el-icon-key"
            class="imageCode-input"
            v-model.trim="loginForm.imageCode"
            placeholder="请输入验证码"
            @keyup.native.enter="confirm"
          ></el-input>
          <img
            class="load-image"
            v-if="!imageUrl"
            :src="defaultImgUrl"
            title="图形验证码加载中..."
            @click="getImageCode"
          />
          <img
            class="imageCode-image"
            v-else
            :src="imageUrl"
            alt="验证码"
            @click="getImageCode"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-button"
            type="primary"
            @click.prevent="confirm"
            :loading="btnLoading"
            >登录</el-button
          >
        </el-form-item>
        <div v-if="errorObj" class="error-info">{{ errorObj }}</div>
      </el-form>
    </div>
    <MfaLogin
      :visible.sync="isMfaShow"
      :mfaAccountUuid="mfaAccountUuid"
      :mfaUserUuid="mfaUserUuid"
      :mfaError="mfaError"
      @done="mfaDone"
    />
  </div>
</template>

<script>
import { getImageCode, loginByAccount, loginByUser } from "@/api/account";
import { mapMutations } from "vuex";
import Cookies from "js-cookie";
import loadingImg from "@/assets/images/loading.gif";

export default {
  components: {
    MfaLogin: () => import("./components/MfaLogin"),
  },
  data() {
      const emailRule = [
      {
        required: true,
        type: "email",
        message: "请输入邮箱地址",
        trigger: "blur",
      },
      {
        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
        message: "请输入正确的邮箱地址",
        trigger: "blur",
      }
    ]
    const phoneRule = [
      { required: true, message: "请输入手机号", trigger: "blur" },
      {
        pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ]
    return {
       loginMethodMap:{
        accountName:"账户名",
        phone:"手机号",
        email:"邮箱",
      },
      loginMethod: "accountName",
      userLoginMethod:"userName",//子用户登录方式
      userLoginMethodMap:{
        userName:"用户名",
        userPhone:"手机号",
        userEmail:"邮箱",
      },
      btnLoading: false,
      errorObj: "",
      accountType: "user",
      defaultImgUrl: loadingImg,
      imageUrl: "",
      loginForm: {
        accountName: "",
        userName: "",
        password: "",
        imageCode: "",
        imageUuid: "",
        mfaType: "",
        mfaCode: "",
      },
      formRules: {
        accountName: [
          { required: true, message: "请输入账户名", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        imageCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        phone:phoneRule,
        email: emailRule,
        userEmail: emailRule,
        userPhone:phoneRule,
      },
      mfaAccountUuid: "",
      mfaUserUuid: "",
      isMfaShow: false,
      mfaError: "",
    };
  },
  methods: {
    ...mapMutations(["setUserName", "setAccountUuid", "setSessionId"]),
    async getImageCode() {
      const res = await getImageCode();
      this.imageUrl = res.success
        ? "data:image/png;base64," + res.imageCode
        : loadingImg;
      this.loginForm.imageUuid = res.success ? res.imageUuid : "";
    },
    async mfaDone(data) {
      this.loginForm.mfaType = data.mfaType;
      this.loginForm.mfaCode = data.mfaCode;

      this.btnLoading = true;
      const fn = this.isAccount ? loginByAccount : loginByUser;
      const res = await fn(this.loginForm);
      this.btnLoading = false;
      if (res.success) {
        this.errorObj = "";
        if (res.needChangePwd) {
          this.$notify({
            type: "info",
            message:
              "系统检测账号长期未修改密码，为提高安全性，建议立即修改密码！",
          });
        }
        Cookies.set("sessionid", res.inventory.uuid, { path: "/" });
        Cookies.set("accountUuid", res.inventory.accountUuid, {
          path: "/",
        });
        Cookies.set("accountType", res.inventory.type, { path: "/" });
         Cookies.set(
              "accountName", this.nameString,
              { path: "/" }
            );
        const lastPath = Cookies.get("lastLogoutPath_CXP_WEB") || process.env.BASE_URL;
       this.setUserName(this.nameString);
        this.isMfaShow = false;
        location.href = lastPath;
      } else {
        this.mfaError = res.error.details;
      }
    },
    confirm() {
      if (!this.isAccount) {
        this.loginForm.accountName = "admin";
      }
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true;
          const fn = this.isAccount ? loginByAccount : loginByUser;
          const res = await fn(this.loginForm);
          this.btnLoading = false;
          if (res.success) {
            this.errorObj = "";
            if (res.needChangePwd) {
              this.$notify({
                type: "info",
                message:
                  "系统检测账号长期未修改密码，为提高安全性，建议立即修改密码！",
              });
            }
            Cookies.set("sessionid", res.inventory.uuid, { path: "/" });
            Cookies.set("accountUuid", res.inventory.accountUuid, {
              path: "/",
            });
            Cookies.set("accountType", res.inventory.type, { path: "/" });
              Cookies.set(
              "accountName", this.nameString,
              { path: "/" }
            );
            const lastPath =
              Cookies.get("lastLogoutPath_CXP_WEB") || process.env.BASE_URL;
           this.setUserName(this.nameString);
            location.href = lastPath;
          } else {
            if (res.error.code === "ID.2000") {
              this.mfaAccountUuid = res.accountUuid;
              this.mfaUserUuid = res.userUuid;
              this.isMfaShow = true;
            } else {
              this.errorObj = res.error.details;
              this.getImageCode();
            }
          }
        }
      });
    },
  },
    computed:{
    isAccount(){
      return this.accountType === 'account';
    },
    nameString(){
      return this.isAccount ? this.loginForm.accountName : this.loginForm.userName;
    },
  },
  created() {
    this.setUserName("");
    this.setSessionId("");
    this.getImageCode();
    Cookies.remove("accountName");
    Cookies.remove("accountUuid");
    Cookies.remove("accountType");
    Cookies.remove("sessionid");
  },
   watch:{
    loginMethod(val,oldVal){
      this.loginForm[oldVal] = "";
    },
    userLoginMethod(val,oldVal){
      this.loginForm[oldVal] = "";
    },
    accountType(val,oldVal){
      if(oldVal === 'user'){
        this.loginForm.userName = '';
      }else{
        this.loginForm.accountName = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #F8F9FC;

  .form-wrapper {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-left: 720px;
    padding-top: 30px;
    width: 380px;
    height: 410px;
    background: url(../../assets/images/home.svg) no-repeat left top;
  }
  .login-form {
    max-width: 410px;
    padding: 15px 30px;
    border-radius: 8px;
    box-shadow: 0 0 8px #ddd;
    background: #fff;

    h1 {
      font-weight: 600;
      padding-top: 45px;
      padding-bottom: 24px;
      text-align: center;
    }

    .login-form-item {
      padding-bottom: 2px;
    }

    .login-button {
      width: 100%;
      border-radius: 25px;
    }
  }

  .imageCode-input {
    width: 180px;
  }

  .imageCode-image {
    float: right;
    width: 140px;
    height: 40px;
    cursor: pointer;
  }

  .load-image {
    float: right;
    width: 140px;
    cursor: pointer;
    height: 32px;
  }
}
@media screen and (max-width: 1024px) and (min-width: 750px) {
  .login-wrapper {
    .form-wrapper {
      padding-left: calc(100% - 410px);
    }
    .login-form {
      margin: 0 5px;
      padding: 10px;
    }
  }
}
@media screen and (max-width: 750px) and (min-width: 300px) {
  .login-wrapper {
    .form-wrapper {
      padding-left: 0;
      background: none;
      max-width: 380px;
    }
    .login-form {
      margin: 0 5px;
      padding: 10px;
    }
  }
}
@media screen and (max-width: 300px) {
  .login-wrapper {
    .form-wrapper {
      padding-left: 0;
      background: none;
      width: 100%;
    }
    .login-form {
      margin: 0 5px;
      padding: 10px;
    }
    .imageCode-image,
    .load-image {
      width: 110px;
    }
    .imageCode-input {
      width: 140px;
    }
  }
}
.account-type {
  text-align: center;
}
.error-info {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
</style>
