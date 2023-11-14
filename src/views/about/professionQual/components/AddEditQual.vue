<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="500px" @close="close">
    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">
      <el-form-item label="分类" prop="name">
        <el-radio-group v-model="form.type" size="medium">
          <el-radio-button label="权威资质">权威资质</el-radio-button>
          <el-radio-button label="荣誉资质">荣誉资质</el-radio-button>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="图片" prop="icon">
        <el-upload class="avatar-uploader" action="/website/api/uploadfile" drag :data="{
          fileType: 'qualification'
        }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeImageUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入资质名称" clearable></el-input>
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
        type: '权威资质',
        imgSrc: '',
        name: '',
      },
      imageUrl: '',
      formRules: {
        type: [{ required: true, message: '请选择分类', trigger: 'blur' },],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' },],
        imgSrc: [{ required: true, message: '请上传图片', trigger: 'blur' },],
      },
      linkGroup: [],
    }
  },
  computed: {
    title() {
      return this.currentRow.uuid ? '修改专业资质' : '新增专业资质'
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
      this.form.imgSrc = url
      this.imageUrl = URL.createObjectURL(file.raw);
    },

  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(async () => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          if (this.currentRow.uuid) {
            this.isEditMode = true
            this.imageUrl = this.currentRow.imgSrc
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
  width: 150px;
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
