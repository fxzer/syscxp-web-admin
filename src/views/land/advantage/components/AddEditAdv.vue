<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="600px" @close="close">

    <el-form :model="form" label-width="80px" :rules="formRules" ref="form">

      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="subtitle">
        <el-input v-model="form.subtitle" placeholder="请输入副标题"></el-input>
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
      },
      imageUrl: '',
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        subtitle: [{ required: false, message: '请输入副标题', trigger: 'blur' },],
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
  },
  computed: {
    title() {
      return (this.currentRow.uuid ? '编辑' : '新增') + '方案优势'
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
