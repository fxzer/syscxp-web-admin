<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="600px" @close="close">

    <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
      <el-form-item label="图片" prop="bgPath">
        <el-upload class="avatar-uploader" action="/website/api/uploadfile" drag :data="{
          fileType: 'banner'
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
          maxRows: 8
        }" show-word-limit maxlength="200" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="按钮文本" prop="btnText">
        <el-input v-model="form.btnText" placeholder="请输入按钮文本" clearable></el-input>
      </el-form-item>
      <el-form-item label="按钮链接" prop="btnLink">
        <el-select
          v-model="form.btnLink"
          filterable
          allow-create
          default-first-option
          style="width: 100%;"
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
import { copyObject } from '@/utils/common'
import { querySolution } from "@/api/quickAccess";

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
      title: '修改首页轮播图',
      form: {
        title: '',
        bgPath: '',
        btnText: '',
        btnLink: '',
        description: '',
      },
      linkGroup: {},

      imageUrl: '',
      formRules: {
        bgPath: [{ required: true, message: '请上传图片', trigger: 'blur' },],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },],
        btnText: [{ required: true, message: '请输入按钮跳转链接', trigger: 'blur' },],
        btnLink: [{ required: true, message: '请输入按钮文本', trigger: 'blur' },],
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
          const { bgPath } = this.form
          this.form.bgPath = bgPath.startsWith('http') ? bgPath.split('web_site_file/')[1] : bgPath
          this.$emit('done', this.form);
        }
      });
    },
    async querySolution(title) {
      const qobj  = {
        limit:20,
        conditions:[]
      }
      if(title){
        qobj.conditions.push({
          name:'title',
          op:'like',
          value: title
        })
      }
      const result = await querySolution(qobj)
      this.linkGroup = result.success ? result.inventories.reduce((group,cur) =>{
        group[cur.category] = group[cur.category] ? [...group[cur.category],cur] : [cur]
        return group
      },{}) : {}
    },
    // 上传图片
    handleUploadSuccess(_, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.bgPath = 'banner/' + file.name
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
  },
  computed: {
    linkGroupKeys(){
      return Object.keys(this.linkGroup).reverse()
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(async () => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          await this.querySolution()
          this.imageUrl = this.currentRow.bgPath
          copyObject(this.currentRow, this.form)
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