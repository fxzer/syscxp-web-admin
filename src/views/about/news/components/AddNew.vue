<template>
  <div class="wrapper" v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <el-form :model="form" ref="form" :rules="formRules" label-width="60px">
      <div class="new-item">
        <el-form-item label="封面" prop="cover">
          <el-upload class="cover" drag action="/website/api/uploadfile" :data="{
            fileType: 'news'
          }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="title-desc">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description" :autosize="{
              minRows: 5,
            }" show-word-limit maxlength="200" placeholder="请输入描述"></el-input>
          </el-form-item>
        </div>
      </div>

      <el-form-item label="内容" prop="content" >
        <div class="content-wrap">
          <el-input class="edit" type="textarea" :class="form.content ? '':'nodata'" v-model="form.content" placeholder="请输入内容"></el-input>
          <div class="preview" :class="form.content ? '':'nodata'" v-html="form.content"></div>
        </div>
      </el-form-item>

      <el-form-item >
        <div class="footer">
          <el-button type="primary"   size="medium"  @click="helpVisible = true">查看使用说明</el-button>
          <div>
            <el-button size="medium" @click="gotoList" style="margin-left:10px;">取消</el-button>
            <el-button size="medium" type="primary" @click="onSubmit" :loading="wrapperLoading">发布</el-button>
          </div>
        </div>
       
      </el-form-item>
    </el-form>
    <EditorHelp :visible.sync="helpVisible"></EditorHelp>
  </div>
</template>

<script>
import { createNews } from "@/api/news";
export default {
  props: {

  },
  data() {
    return {
      helpVisible: false,
      wrapperLoading: false,
      form: {
        cover: "",
        title: "",
        content: "",
        description: "",
      },
      imageUrl: '',
      formRules: {
        cover: [{ required: true, message: '请上传图片', trigger: 'blur' },],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' },],
      },
    };
  },
  components:{
    EditorHelp: () => import('@/views/EditorHelp.vue')
  },
  methods: {
    handleUploadSuccess(_, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.cover = 'news/' + file.name
    },
    handleBeforeUpload(file) {
      const isEnableType = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isEnableType) {
        this.$message.error('上传图片只能是 【JPG、JPEG、PNG、SVG】格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleChange(val) {
      this.form.content = val
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.wrapperLoading = true;
          const result = await createNews(this.form);
          this.wrapperLoading = false;
          if (result.success) {
            this.$notify({
              type: "success",
              message: `新增成功`,
            });
            this.$router.replace("/news")
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
    gotoList() {
      this.$router.replace("/news")
    }
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
  .nodata::after{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
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
    &.nodata::after{
      position: absolute;
      content: '编辑区';
    }
  }

  .preview {
    //禁止编辑
    // cursor: not-allowed ;
    margin-left:5px;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: auto;
    flex: 1;
    border: 1px solid #89c48f;
    height: 100%;
    border-radius: 4px;
    position: relative;
    &.nodata::after{
      content: '预览区';
    }
  }
}

.cover ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #409EFF;
  }

  width: 100%;
  height: 100%;
}

.cover {
  width: 320px;
  height: 180px;
}


::v-deep .el-upload .el-upload-dragger {
  width: 100%;
  height: 100%;
}

.el-icon-plus {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #8c939d;
  width: 100%;
  height: 100%;
}

.wrapper {
  background: #fff;
  padding: 20px 20px 5px 0;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
}

.footer {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;
}
.preview ::v-deep img{
margin: auto;
}
</style>
