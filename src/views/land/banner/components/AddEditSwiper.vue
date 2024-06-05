<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="600px" @close="close">

    <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
      <el-form-item label="图片" prop="img">
        <el-upload class="avatar-uploader" action="/website/api/uploadfile" drag :data="{
          fileType: 'banner'
        }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeImageUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="subtitle">
        <el-input v-model="form.subtitle" placeholder="请输入副标题"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" :autosize="{
          minRows: 4,
          maxRows: 8
        }" show-word-limit maxlength="200" placeholder="请输入描述，多条描述用换行分隔"></el-input>
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
  inject: ['handleBeforeImageUpload'],
  data() {
    return {
      loading: false,
      isEditMode: false,
      form: {
        title: '',
        subtitle: '',
        img: '',
        description: '',
      },
      imageUrl: '',
      formRules: {
        img: [{ required: true, message: '请上传图片', trigger: 'blur' },],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        subtitle: [{ required: false, message: '请输入副标题', trigger: 'blur' },],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },],
      },
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
          this.$emit('done', this.form, this.isEditMode);
        }
      });
    },
    // 成功上传图片
    handleUploadSuccess(url,file) {
      this.form.img = url
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
  computed: {
    title() {
      return  (this.currentRow.uuid ? '编辑' : '新增') + '落地页横幅'
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
            this.imageUrl = this.currentRow.img
            copyObject(this.currentRow, this.form)
          } else {
            this.isEditMode = false
          }
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

  &:hover {
    border-color: #409EFF;
  }
}

.avatar-uploader ::v-deep .el-upload .el-upload-dragger {
  width: 475px;
  height: 200px;

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
}
</style>
