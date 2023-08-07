<template>
  <div>
    <el-dialog
      title="安全验证"
      :visible="visible"
      width="400px"
      @close="close()"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        :model="modelForm"
        ref="updateForm"
        :label-position="'left'"
        :label-width="formLabelWidth"
        :rules="rules"
        clearValidate
      >
        <el-form-item label="安全类型">
          <el-radio-group v-model="modelForm.mfaType" size="medium">
            <el-radio-button label="Phone">手机号</el-radio-button>
            <el-radio-button label="Google">虚拟MFA</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="modelForm.mfaType === 'Phone'"
          label="绑定手机"
          prop="phone"
        >
          <el-input disabled v-model="modelForm.phone"></el-input>
        </el-form-item>
        <el-form-item
          v-if="modelForm.mfaType === 'Phone'"
          prop="imageCode"
          label="图形验证码"
          :error="imageCodeError"
        >
          <el-input
            placeholder="输入图形验证码"
            class="code-input"
            tabindex="3"
            type="imageCode"
            v-model="modelForm.imageCode"
          >
            <i class="icon iconfont icon-anquan" slot="prefix"></i>
            <template slot="suffix"
              ><img @click="getImgCode" class="imgCode" :src="imgSrc" alt=""
            /></template>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="modelForm.mfaType === 'Phone'"
          label="验证码"
          :error="phoneCodeError"
          prop="phoneCode"
          class="phoneCode"
        >
          <el-input
            placeholder="输入验证码"
            class="code-input"
            v-model="modelForm.phoneCode"
          ></el-input>
          <div @click="checkValidatePhone($event)">
            <CountDown :isDo="isSendCode" class="count"></CountDown>
          </div>
        </el-form-item>
        <div v-if="modelForm.mfaType === 'Google'">
          <el-form-item
            v-if="gaMsg.ga"
            :error="safeCodeError"
            label="安全码"
            prop="safeCode"
          >
            <el-input
              placeholder="输入安全码"
              v-model="modelForm.safeCode"
            ></el-input>
          </el-form-item>

          <div v-if="!gaMsg.ga" class="bind-tips">
            <div>
              您还没有绑定MFA设备，请进入安全设置绑定设备。<a
                target="_blank"
                href="https://www.syscxp.com/docs/account/mfa"
                >帮助指引</a
              >
            </div>
          </div>
          <p class="tips">
            通过绑定的MFA设备获取安全码的方式。
            如何获取：1.微信添加小程序【二次验证码】2.前往应用商店下载手机客户端
            android版【Google 身份验证器】 iOS版【Google Authenticator】
          </p>
        </div>
        <div v-if="mfaError" class="error-info">{{mfaError}}</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPhoneCode, getAccountMfaInfo } from "@/api/mfa";
import { getImageCode } from "@/api/account";
import { Message } from "element-ui";
export default {
  components: {
    CountDown: () => import("./CountDown"),
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    mfaAccountUuid: String,
    mfaUserUuid: String,
    mfaError: String,
  },
  data() {
    return {
      formLabelWidth: "100px",
      imgSrc: "",
      isSendCode: false,
      modelForm: {
        mfaType: "Phone",
        safeCode: "",
        phone: "",
        phoneCode: "",
        imageCode: "",
        uuid: "",
      },
      imageCodeError: null,
      phoneCodeError: null,
      safeCodeError: null,
      gaMsg: {
        ga: false,
      },
      rules: {
        phoneCode: [
          { required: true, message: "输入验证码", trigger: ["blur"] },
        ],
        safeCode: [
          { required: true, message: "请输入安全码", trigger: ["blur"] },
        ],
        imageCode: [
          { required: true, message: "输入图形验证码", trigger: ["blur"] },
          {
            pattern: /[A-Za-z0-9]{4}/,
            message: "图形验证码格式错误",
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.isSendCode = false;
      this.modelForm.safeCode = "";
      this.modelForm.phone = "";
      this.modelForm.phoneCode = "";
      this.modelForm.imageCode = "";
      this.phoneCodeError = null;
      this.safeCodeError = null;
      this.imageCodeError = null;
    },
    async checkValidatePhone() {
      let imgflag = /[A-Za-z0-9]{4}/.test(this.modelForm.imageCode);
      if (!this.modelForm.imageCode) {
        this.imageCodeError = "图形验证码不能为空";
      } else if (!imgflag) {
        this.imageCodeError = "图形验证码格式错误";
      } else {
        this.isSendCode = true;
        let { phone, uuid, imageCode: code } = this.modelForm;
        await getPhoneCode({ phone, uuid, code });
      }
    },
    async getImgCode() {
      const data = await getImageCode();

      if (data.success) {
        this.imgSrc = "data:image/png;base64," + data.imageCode;
        this.modelForm.uuid = data.imageUuid;
      } else {
        Message({
          message: data.error.details,
          type: "error",
        });
      }
    },
    async getMfaInfo() {
      const res = await getAccountMfaInfo({
        isLogin: false,
        accountUuid: this.mfaAccountUuid,
        userUuid: this.mfaUserUuid
      });
      this.gaMsg.ga = res.ga;
      this.modelForm.phone = res.phone;
      this.modelForm.mfaType = res.defaultMfaType;
    },
    confirm() {
      this.$refs.updateForm.validate((valid) => {
        if (valid) {
          let infoPage = {
            mfaType: this.modelForm.mfaType,
            mfaCode:
              this.modelForm.mfaType === "Phone"
                ? this.modelForm.phoneCode
                : this.modelForm.safeCode,
          };
          this.$emit("done", infoPage);
        }
      });
    },
    close() {
      this.$emit("update:visible", false);
      this.$refs.updateForm.resetFields();
    },
  },
  watch: {
    visible: function (val) {
      if (val) {
        this.reset();
        this.getImgCode();
        this.getMfaInfo();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.imgCode {
  top: 8px;
  position: relative;
}
.phoneCode{
  ::v-deep .el-form-item__content {
    display: flex;
    .code-input {
      width: 160px;
      margin-right: 20px;
    }
  }
}
.step2 {
  .form-group {
    display: flex;
    margin-bottom: 15px;
    .name {
      width: 120px;
    }
  }
  .attention {
    span {
      font-size: 12px;
      color: #999;
    }
  }
}

.tips {
  font-size: 12px;
  color: #999;
}
.bind-tips {
  font-size: 12px;
  background: #f5f5f5;
  line-height: 30px;
  text-align: center;
  margin-bottom: 15px;
  color: #666;

  a {
    color: #2379ff;
    text-decoration: underline;
  }
}
.error-info {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
</style>
