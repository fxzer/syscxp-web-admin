<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="500px" @close="close">
    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">
      <el-form-item label="图片" prop="icon">
        <el-upload class="avatar-uploader" action="/website/api/uploadfile" :data="{
          fileType:'access'
        }" :show-file-list="false"
          :on-success="handleUploadSuccess" :on-remove="handleUploadRemove" :before-upload="handleBeforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-select v-model="form.link" style="width: 100%;" placeholder="请选择跳转链接">
          <el-option v-for="link in links" :key="link.value" :label="link.label" :value="link.value">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" show-word-limit maxlength="50"
          placeholder="请输入描述"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取 消</el-button>
      <el-button size="small" type="primary" @click="confirm">确 定</el-button>
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
    currentRow:{
      type:Object,
      default:()=>({})
    }
  },
  data() {
    return {
      title: '修改快捷入口',
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
      links: []
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
      this.form.icon = 'access' + file.name
    },
    handleBeforeUpload(file) {
      const isEnableType  = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isEnableType) {
        this.$message.error('上传图片只能是 【JPG、JPEG、PNG、SVG】格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleUploadRemove(file, fileList){
        console.log(file, fileList);
    },
    copyObject(obj,target,fields=[]){
      if(fields.length===0){
        fields = Object.keys(obj)
      }
      fields.forEach(field=>{
        target[field] = obj[field]
      })
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          this.imageUrl = 'http://192.168.211.63:8130/website/api/' + this.currentRow.icon
          this.copyObject(this.currentRow,this.form )
        });
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
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}

.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
</style>