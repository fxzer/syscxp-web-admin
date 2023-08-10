<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="550px" @close="close">

    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">
      <el-form-item label="封面" prop="cover">
        <el-upload class="avatar-uploader" action="/website/api/uploadfile" :data="{
          fileType: 'access'
        }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="form.desc" show-word-limit maxlength="50"
          placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="link">
        <el-upload style="width: 100%;"   drag action="https://jsonplaceholder.typicode.com/posts/"  :on-success="handleUploadSuccessFile" :fileList="fileList"  :before-upload="handleBeforeUploadFile">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传，</em>只能上传【PDF】格式文件!</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      title: '新增白皮书',
      errorMsg: '',
      originSrc: '',
      form: {
        icon: '',
        link: '',
        title: '',
        description: '',
      },
      imageUrl: '',
      formRules: {
        icon: [{ required: true, message: '请上传图标', trigger: 'blur' },],
        link: [{ required: true, message: '请选择跳转链接', trigger: 'blur' },],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },],
      },
      linkGroup: [],
      fileList: [ {
        name: 'food.jpeg',
        url: 'https://jsonplaceholder.typicode.com/posts/',
      }]
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
      this.$refs.form.resetFields();
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('done', this.form);
        }
      });
    },
      // 上传图片
    handleUploadSuccess(_, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.icon = 'access-' + file.name
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

      // 上传文件
      handleUploadSuccessFile(_, file) {
      const fileObj = {
        name: file.name,
        url: URL.createObjectURL(file.raw),
      }
       this.fileList.push(fileObj);
    },
    handleBeforeUploadFile(file) {
      //上传 pdf
      const isEnableType = ['application/pdf'].includes(file.type);
      if (!isEnableType) {
        this.$message.error('上传文件只能是 【 PDF 】格式!');
      }
    },

  },
  computed: {

  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(async () => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
        });
      } else {
        this.imageUrl = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display:
   block;
}
::v-deep .el-upload .el-upload-dragger {
  width:  450px;
}
</style>