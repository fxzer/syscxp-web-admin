<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="500px" @close="close">

    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">
      <el-form-item label="图片" prop="icon">
        <el-upload class="avatar-uploader" action="/website/api/uploadfile"  drag :data="{
          fileType: 'access'
        }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link" >
        <el-select v-model="form.link" style="width: 100%;" placeholder="请选择跳转链接">
          <el-option-group v-for=" key  in linkGroupKeys" :key="key" :label="key">
             <el-option v-for="link in linkGroup[key]" :key="link.uuid" :label="link.title" :value="link.path">
          </el-option>
          </el-option-group>
        </el-select>

      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" show-word-limit maxlength="50" placeholder="请输入描述"></el-input>
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
    currentRow:{
      type:Object,
      default:()=>({})
    }
  },
  data() {
    return {
      isEditMode: false,
      loading: false,
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
    // 上传图片
    handleUploadSuccess(_, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.icon = 'access/' + file.name
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
    async querySolution() {
      const result = await querySolution({
        limit:20,
      })
      this.linkGroup = result.success ? result.inventories.reduce((group,cur) =>{
        group[cur.category] = group[cur.category] ? [...group[cur.category],cur] : [cur]
        return group
      },{}) : {}
    },

  },
  computed: {
    linkGroupKeys(){
      return Object.keys(this.linkGroup).reverse()
    },
    title(){
      return this.currentRow.uuid ? '修改快捷入口' : '新增快捷入口'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(async () => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          await this.querySolution()
          if(this.currentRow.uuid){
            copyObject(this.currentRow,this.form )
            this.imageUrl = this.currentRow.icon
            this.isEditMode = true
          }else{
            this.isEditMode = false
          }
        });
      }else{
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
  width: 100px;
  height: 100px;
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
