<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="600px" @close="close">

    <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
      <el-form-item label="图片" prop="bgPath">
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

      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" :autosize="{
          minRows: 4,
          maxRows: 8
        }" show-word-limit maxlength="200" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="按钮文本" prop="btnText">
        <el-input v-model="form.btnText" placeholder="请输入按钮文本" clearable></el-input>
      </el-form-item>
      <el-form-item label="按钮链接" prop="btnLink">
        <el-select v-model="form.btnLink" filterable allow-create default-first-option style="width: 100%;"
          placeholder="请输入或选择按钮跳转链接">
          <el-option-group v-for=" key  in linkGroupKeys" :key="key" :label="key">
            <el-option v-for="link in linkGroup[key]" :key="link.uuid" :label="link.title" :value="link.path">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { querySolution } from "@/api/quickAccess";
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
        bgPath: '',
        btnText: '',
        btnLink: '',
        description: '',
      },
      imageUrl: '',
      formRules: {
        bgPath: [{ required: true, message: '请上传图片', trigger: 'blur' },],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },],
        btnText: [{ required: true, message: '请输入按钮跳转链接', trigger: 'blur' },],
        btnLink: [{ required: true, message: '请输入按钮文本', trigger: 'blur' },],
      },
      linkGroup: {},
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
    async querySolution(title) {
      const qobj = {
        limit: 20,
        conditions: []
      }
      if (title) {
        qobj.conditions.push({
          name: 'title',
          op: 'like',
          value: title
        })
      }
      const result = await querySolution(qobj)
      this.linkGroup = result.success ? result.inventories.reduce((group, cur) => {
        group[cur.category] = group[cur.category] ? [...group[cur.category], cur] : [cur]
        return group
      }, {}) : {}
    },
    // 成功上传图片
    handleUploadSuccess(url) {
      this.form.bgPath = this.imageUrl = url
    },
  },
  computed: {
    linkGroupKeys() {
      return Object.keys(this.linkGroup).reverse()
    },
    title() {
      return this.currentRow.uuid ? '编辑首页轮播图' : '新增首页轮播图'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(async () => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          await this.querySolution()
          if (this.currentRow.uuid) {
            this.isEditMode = true
            this.imageUrl = this.currentRow.bgPath
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
