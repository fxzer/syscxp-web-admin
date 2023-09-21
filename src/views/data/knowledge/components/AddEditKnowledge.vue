<template>
  <div class="wrapper" v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <el-form :model="form" ref="form" :rules="formRules" label-width="80px">
      <div class="new-item">
        <el-form-item label="封面"   style="margin-right:20px;">
          <div class="cover-bg">
            <p class="cover-text">{{ previewTitle }}</p>
          </div>
        </el-form-item>
        <div style="width: 100%;">
          <div style="display: flex">
            <el-form-item label="标题" prop="title" style="flex:1;margin-right:10px;">
              <el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
            </el-form-item>
            <el-form-item label="发布日期"  prop="releaseDate">
              <el-date-picker
                v-model="form.releaseDate"
                type="date"
                style="width: 183px;"
                value-format="timestamp"
                placeholder="选择发布日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div style="display: flex;">
            <el-form-item label="来源" prop="source" style="flex:1;margin-right:10px;">
              <el-input v-model="form.source" placeholder="请输入来源" clearable></el-input>
            </el-form-item>
            <el-form-item label="关键词" prop="keywords" style="flex:1;margin-right:10px;">
              <el-input v-model="form.keywords" placeholder="请输入关键词" clearable></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="writer">
              <el-input v-model="form.writer" placeholder="请输入作者"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description" :autosize="{
              minRows: 3,
            }" show-word-limit maxlength="200" placeholder="请输入描述"></el-input>
          </el-form-item>
        </div>
      </div>

      <el-form-item label="内容" prop="content">
        <div class="content-wrap">
          <el-input class="edit" type="textarea" :class="form.content ? '' : 'nodata'" v-model="form.content"
            placeholder="请输入内容"></el-input>
          <div class="preview" :class="form.content ? '' : 'nodata'" v-html="form.content"></div>
        </div>
      </el-form-item>

      <el-form-item>
        <div class="footer">
          <el-button type="primary"   size="medium"  @click="helpVisible = true">查看使用说明</el-button>

          <div>
            <el-button size="medium" @click="gotoList" style="margin-left:10px;">取消</el-button>
            <el-button size="medium" type="primary" @click="onSubmit" :loading="wrapperLoading">发布</el-button>
          </div>
        </div>

      </el-form-item>
    </el-form>
    <EditorHelp :visible.sync="helpVisible"></EditorHelp>
  </div>
</template>

<script>
import { copyObject } from '@/utils/common'

import { createKnowledge, updateKnowledge,queryKnowledge } from "@/api/knowledge";
export default {
  components:{
    EditorHelp: () => import('@/views/EditorHelp.vue')
  },
  data() {
    return {
      helpVisible: false,
      isEditMode: false,
      wrapperLoading: false,
      form: {
        title: "",
        source: "",
        writer: "",
        content: "",
        keywords:"",
        description: "",
        releaseDate: '',
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        source: [{ required: true, message: '请输入来源', trigger: 'blur' },],
        writer: [{ required: true, message: '请输入作者', trigger: 'blur' },],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },],
        keywords: [{ required: true, message: '请输入关键词', trigger: 'blur' },],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' },],
        releaseDate: [{ required: true, message: '请选择发布日期', trigger: 'blur' },],
      },
    };
  },
  computed:{
    previewTitle(){
      let { title } = this.form
      return title.length>15 ? title.substring(0,15)+'...' : title
    }
  },
  methods: {
    async queryCurrentKnowledge() {
      this.wrapperLoading = true
      const qobj = {
        conditions:[ {
            name:'uuid',
            op:'=',
            value:this.$route.query.uuid } ]  }
      const result = await queryKnowledge(qobj)
      const currentNew = result.success ? result.inventories[0] : {}
      copyObject(currentNew,this.form)
      this.form.releaseDate  = new Date(currentNew.releaseDate).getTime()
      this.wrapperLoading = false
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.wrapperLoading = true;
        const fn = this.isEditMode ? updateKnowledge : createKnowledge
          const result = await fn(this.form);
          this.wrapperLoading = false;
          if (result.success) {
            this.$notify({
              type: "success",
              message: `${this.isEditMode ? '修改': '新增'}成功`,
            });
            this.$router.replace("/knowledge")
          } else {
            this.$notify({
              type: "error",
              message: `${this.isEditMode ? '修改': '新增'}失败`,
            });
          }
        } else {
          return false;
        }
      });
    },
    gotoList() {
      this.$router.replace("/knowledge")
    },

  },
  mounted(){
    if(this.$route.query.uuid){
      this.isEditMode = true
      this.queryCurrentKnowledge()
    }else{
      this.isEditMode = false
    }
  }
};
</script>

<style scoped lang="scss">
.new-item {
  display: flex;
}

.content-wrap {
  display: flex;
  height: calc(100vh - 400px);

  .nodata::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    font-weight: 600;
    color: #e5e6eb;
  }

  ::v-deep .el-textarea {
    max-height: 100%;
    flex: 1;

    .el-textarea__inner {
      height: 100%;
    }

    &.nodata::after {
      position: absolute;
      content: '编辑区';
    }
  }

  .preview {
    //禁止编辑
    cursor: not-allowed;
    margin-left: 5px;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: auto;
    flex: 1;
    border: 1px solid #89c48f;
    height: 100%;
    border-radius: 4px;
    position: relative;

    &.nodata::after {
      content: '预览区';
    }
  }
}

.wrapper {
  background: #fff;
  padding: 20px 20px 5px 0;
}


.footer {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;
}

.preview ::v-deep img {
  margin: auto;
}

.cover-bg {
  box-sizing: border-box;
  width: 240px;
  height: 160px;
  padding: 45px 24px;
  background-image: url(../../../../assets/images/cover.svg);

  .cover-text {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    line-height: 1.5;
    text-align: center;
    color: #000;
  }
}
</style>
