<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="550px" top="60px" @close="close">
    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">
      <el-form-item label="封面" prop="cover">
        <el-upload class="cover" action="/website/api/uploadfile" :data="{
          fileType: 'paperimg'
        }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload">
         <img v-if="imageUrl" :src="imageUrl" class="avatar">  
           <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
        </el-upload>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" :autosize="{
          minRows: 4,
        }" show-word-limit maxlength="200" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="fileLink">

        <el-upload class="file-upload" drag action="/website/api/uploadfile"

        :data="{
          fileType: 'paperfile'
        }"
          :on-success="handleUploadSuccessFile" :multiple="false" :limit="1"  :on-remove="handleRemoveFile"
          :on-exceed="handleLimit"  :fileList="fileList" :before-upload="handleBeforeUploadFile">
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
import { copyObject } from '@/utils/common'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    currentRow: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      title: '修改白皮书',
      form: {
        cover: '',
        title: '',
        fileLink: '',
        description: '',
      },
      imageUrl: '',
      formRules: {
        cover: [{ required: true, message: '请上传图片', trigger: 'blur' },],
        fileLink: [{ required: true, message: '请上传文件', trigger: 'blur' },],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },],
      },
      fileList: []
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
          const { cover } = this.form
          this.form.cover = cover.startsWith('http') ? cover.split('imgs/')[1] : cover
          this.$emit('done', this.form);
        }
      });
    },
    // 上传图片
    handleUploadSuccess(_, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.cover = 'paperimg/' + file.name
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
      this.form.fileLink = 'paperfile/' + file.name
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
    handleLimit(){
      this.$message.error('只能上传一个文件，请先移除原来文件!');
    },
    handleRemoveFile(){
      this.fileList.pop()
      this.form.fileLink = ''
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          this.imageUrl = this.currentRow.cover;
          this.fileList = this.currentRow.fileLink ? [{
            name: this.currentRow.fileLink.split('/').pop(),
            url: this.currentRow.fileLink,
          }] : [];
          copyObject(this.currentRow, this.form)
          console.log("[ this.form ]-134", this.form);
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cover ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #409EFF;
  }

  width: 150px;
  height: 200px;
}
.cover img{
  width: 150px;
  height: 200px;
}
.file-upload ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #409EFF;
  }

  width: 450px;
  height: 200px;
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

.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>