<template>
  <div class="wrapper" v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <el-form :model="form" ref="form" :rules="formRules" label-width="60px">
      <div class="new-item">
        <el-form-item label="封面"   style="margin-right:20px;">
          <div class="cover-bg">
            <p class="cover-text">{{ form.title }}</p>
          </div>
        </el-form-item>

        <div class="title-desc">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <div style="display: flex;">
            <el-form-item label="来源" prop="source" style="flex:1;">
              <el-input v-model="form.source" placeholder="请输入来源"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="writer">
              <el-input v-model="form.writer" placeholder="请输入作者"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description" :autosize="{
              minRows: 4,
            }" show-word-limit maxlength="200" placeholder="请输入描述"></el-input>
          </el-form-item>
        </div>
      </div>

      <el-form-item label="内容" prop="content">
        <div class="content-wrap">
          <el-input class="edit" type="textarea" :class="form.content ? '' : 'nodata'" v-model="form.content"
            placeholder="请输入内容"></el-input>
          <div class="preview" :class="form.content ? '' : 'nodata'" v-html="form.content"></div>
        </div>
      </el-form-item>

      <el-form-item>
        <div class="footer">
          <p class="tips">
            <b>使用方式：</b>
            <span style="color:#f8a24b">情况1：</span>使用<a href="https://www.365editor.com/" target="_blank">365编辑器</a>排版文章
            ==>复制全文==>粘贴到编辑区==>发布；
            <span style="color:#f8a24b">情况2（微信公众号已发布的文章）</span>：微信公众号编辑==>复制全文到<a href="https://www.365editor.com/"
              target="_blank">365编辑器</a>粘贴==>替换微信平台图片==>复制全文==>粘贴到编辑区==>发布
          </p>

          <div>
            <el-button size="medium" @click="goToNewList" style="margin-left:10px;">取消</el-button>
            <el-button size="medium" type="primary" @click="onSubmit" :loading="wrapperLoading">发布</el-button>
          </div>
        </div>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>

/*  */
import { createKnowledge } from "@/api/knowledge";
export default {
  props: {

  },
  data() {
    return {
      wrapperLoading: false,
      form: {
        title: "",
        source: "",
        writer: "",
        content: "",
        description: "",
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        source: [{ required: true, message: '请输入来源', trigger: 'blur' },],
        writer: [{ required: true, message: '请输入作者', trigger: 'blur' },],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' },],
      },
    };
  },
  methods: {
    handleChange(val) {
      this.form.content = val
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.wrapperLoading = true;
          const result = await createKnowledge(this.form);
          this.wrapperLoading = false;
          if (result.success) {
            this.$notify({
              type: "success",
              message: `新增成功`,
            });
            this.$router.replace("/knowledge")
          } else {
            this.$notify({
              type: "error",
              message: `新增失败`,
            });
          }
        } else {
          return false;
        }
      });
    },
    goToNewList() {
      this.$router.replace("/knowledge")
    },

  },
};
</script>

<style scoped lang="scss">
.new-item {
  display: flex;

  .title-desc {
    width: 100%;
  }


}

.content-wrap {
  display: flex;
  height: calc(100vh - 400px);

  .nodata::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    font-weight: 600;
    color: #e5e6eb;
  }

  ::v-deep .el-textarea {
    max-height: 100%;
    flex: 1;

    .el-textarea__inner {
      height: 100%;
    }

    &.nodata::after {
      position: absolute;
      content: '编辑区';
    }
  }

  .preview {
    //禁止编辑
    cursor: not-allowed;
    margin-left: 5px;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: auto;
    flex: 1;
    border: 1px solid #89c48f;
    height: 100%;
    border-radius: 4px;
    position: relative;

    &.nodata::after {
      content: '预览区';
    }
  }
}




.wrapper {
  background: #fff;
  padding: 20px 20px 5px 0;
}


.footer {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;

  .tips {
    background-color: #F2F2F3;
    padding: 0 10px;
    border-radius: 5px;
    font-size: 12px;
  }
}

.preview ::v-deep img {
  margin: auto;
}

.cover-bg {
  box-sizing: border-box;
  width: 240px;
  height: 160px;
  padding: 45px 24px;
  background-image: url(../../../../assets/images/cover.svg);

  .cover-text {
    font-size: 22px;
    line-height: 1.5;
    text-align: center;
    color: #000;
    //两行溢出省略
    display: -webkit-box;
    line-break: anywhere;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;/* 布局方向 */
    -webkit-line-clamp: 2; /* 显示三行文本 */

  }
}
</style>
