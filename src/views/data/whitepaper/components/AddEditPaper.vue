<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="550px" top="60px" @close="close">
    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">
      <el-form-item label="封面" prop="cover">
        <el-upload class="cover" drag action="/website/api/uploadfile" :data="{
          fileType: 'paperimg'
        }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeImageUpload">
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
        <el-upload class="file-upload" drag :multiple="false" :limit="1" :on-exceed="handleLimit"
          action="/website/api/uploadfile" :on-remove="handleRemoveFile" :on-success="handleUploadSuccessFile" :data="{
            fileType: 'paperfile'
          }" :fileList="fileList" :before-upload="handleBeforeUploadFile">
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
  inject: ['backendFileBasePath', 'handleBeforeImageUpload'],
  data() {
    return {
      loading: false,
      isEditMode: false,
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
  computed: {
    title() {
      return this.currentRow.uuid ? '修改白皮书' : '新增白皮书'
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
          if (this.isEditMode) {
            const {fileLink } = this.form
            this.form.fileLink = fileLink.startsWith('http') ? fileLink.split(this.backendFileBasePath)[1] : fileLink
          }
          this.$emit('done', this.form, this.isEditMode);
        }
      });
    },
    // 成功上传图片
    handleUploadSuccess(url,file) {
      this.form.cover  = url
      this.imageUrl = URL.createObjectURL(file.raw);
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
      return isEnableType;
    },
    handleLimit() {
      this.$message.error('只能上传一个文件!');
    },
    handleRemoveFile() {
      this.fileList.pop()
      this.form.fileLink = ''
    }

  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(async () => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          if (this.currentRow.uuid) {
            this.isEditMode = true
            this.imageUrl = this.currentRow.cover;
            this.fileList = this.currentRow.fileLink ? [{
              name: this.currentRow.fileLink.split('/').pop(),
              url: this.currentRow.fileLink,
            }] : [];
            copyObject(this.currentRow, this.form)
          } else {
            this.isEditMode = false
          }
        });
      } else {
        this.imageUrl = ''
        this.fileList = []
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

.cover img {
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
