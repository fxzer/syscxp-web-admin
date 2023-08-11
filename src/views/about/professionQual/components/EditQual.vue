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
        }" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取 消</el-button>
      <el-button size="small" type="primary" @click="confirm">确 定</el-button>
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
    currentRow:{
      type:Object,
      default:()=>({})
    }
  },
  data() {
    return {
      title: '修改快捷入口',
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
  methods: {
    close() {
      this.$emit('update:visible', false);
      this.$refs.form.resetFields();
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { imgSrc } = this.form
          this.form.imgSrc =  imgSrc.startsWith('http')  ? imgSrc.split('imgs/')[1] : imgSrc
          this.$emit('done', this.form);
        }
      });
    },
    // 上传图片
    handleUploadSuccess(_, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgSrc = 'qualification/' + file.name
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
  },
  watch: {
     visible(val) {
      if (val) {
        this.$nextTick( () => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          this.imageUrl = this.currentRow.imgSrc
         copyObject(this.currentRow,this.form )
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