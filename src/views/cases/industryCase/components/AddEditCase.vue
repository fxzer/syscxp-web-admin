<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="520px" @close="close">
    <el-form :model="form" label-width="100px" :rules="formRules" ref="form">
      <el-form-item label="案例分类" prop="type">
        <el-select style="width: 100%;" v-model="form.type" clearable filterable allow-create default-first-option
          placeholder="请选择已有分类 或 输入新分类并选择它">
          <el-option v-for="item,index in caseTypeList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业LOGO" prop="logo">
        <el-upload class="avatar-uploader" action="/website/api/uploadfile" drag :data="{
          fileType: 'industryCase'
        }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeImageUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="企业名称" prop="company">
        <el-input v-model="form.company" placeholder="请输入企业名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="企业概述" prop="outline">
        <el-input v-model="form.outline" placeholder="请输入企业概述" clearable></el-input>
      </el-form-item>
      <el-form-item label="企业描述" prop="description">
        <el-input type="textarea" v-model="form.description" :autosize="{
          minRows: 5,
        }" show-word-limit maxlength="400" placeholder="请输入企业描述"></el-input>
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
import { queryTypeList } from "@/api/industryCase";
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
        logo: "",
        type: "",
        outline: "",
        company: "",
        description: "",
      },
      caseTypeList: [],
      imageUrl: '',
      formRules: {
        type: [{ required: true, message: '请选择分类', trigger: 'blur' },],
        outline: [{ required: true, message: '请输入企业概述', trigger: 'blur' },],
        company: [{ required: true, message: '请输入企业名称', trigger: 'blur' },],
        description: [{ required: true, message: '请输入企业描述', trigger: 'blur' },],
        logo: [{ required: true, message: '请上传图片', trigger: 'blur' },],
      },
      linkGroup: [],
    }
  },
  computed: {
    title() {
      return this.currentRow.uuid ? '修改行业案例' : '新增行业案例'
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
    handleUploadSuccess(url) {
      this.form.logo = this.imageUrl = url
    },

    async queryTypeList() {
      const { typeList = [] } = await queryTypeList()
      this.caseTypeList = typeList
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(async () => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          await this.queryTypeList()
          if (this.currentRow.uuid) {
            this.isEditMode = true
            this.imageUrl = this.currentRow.logo
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
  height: 150px;

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
