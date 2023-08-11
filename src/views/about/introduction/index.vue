<template>
  <div class="wrapper">
    <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
      <el-form-item label="标题：" prop="title">
        <el-input v-if="isEdit" v-model="form.title" placeholder="请输入标题"></el-input>
        <h4 v-else>{{ form.title }}</h4>
      </el-form-item>
      <el-form-item label="副标题：" prop="subTitle">
        <el-input v-if="isEdit" v-model="form.subTitle" placeholder="请输入副标题"></el-input>
        <h4 v-else>{{ form.subTitle }}</h4>
      </el-form-item>
      <el-form-item label="描述：" prop="desc">
        <template  v-if="isEdit" >
          <div v-for="(desc,index) in descList" :key="index" style="display: flex;justify-content: start;align-items: center;">
            <el-input type="textarea" style="margin-bottom:10px;" v-model="descList[index]"  :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入描述"></el-input>
             <el-button type="primary" size="mini" @click="addDesc" icon="el-icon-plus" style="margin-left: 10px;" v-if="index===0"> </el-button>
             <el-button type="danger" size="mini" @click="removeDesc(index)" icon="el-icon-minus" style="margin-left: 10px;" v-else> </el-button>
          </div>
          
        </template>
       
          <template v-else>
            <p v-for="(desc,index) in descList" :key="index" class="desc">{{  desc }}</p>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" v-if="isEdit" type="primary" @click="handleSave" :loading="loading" >保存</el-button>
        <el-button size="medium" @click="showEdit" type="primary" v-else >修改</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { queryIntro,updateIntro} from "@/api/intro";
import { copyObject } from '@/utils/common'
export default {
  props: {
  },
  data() {
    return {
      isEdit: false,
      loading: false,
      form: {
        title: '',
        subTitle: '',
        description:''
      },
      descList:[],
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        subTitle: [{ required: true, message: '请输入副标题', trigger: 'blur' },],
        // description: [{ required: false, message: '请输入描述', trigger: 'blur' },],
      },
    }
  },
  watch:{
    descList:{
      handler(val){
        this.form.description = JSON.stringify(val).replace('"','\\"');
      },
      deep:true,
      immediate:true
    }
  },
  methods: {
    showEdit(){
      this.isEdit = true;
    },
    async handleSave(){
      this.loading = true;
      const result = await updateIntro(this.form);
      this.loading = false;
      if (result.success) {
        this.$notify({
          type: "success",
          message: `修改成功`,
        });
       this.isEdit = false;
      } else {
        this.$notify({
          type: "error",
          message: `修改失败`,
        });
      }
    },
    addDesc(){
      this.descList.push('');
    },
    removeDesc(index){
      this.descList.splice(index,1);
    },
    async queryIntro(){
      const result = await queryIntro();
      const data  = result.success ? result.inventories[0] : {}
      copyObject(data,this.form);
      this.descList = JSON.parse(data.description.replace('\\"','"') || '[]');
    }
  },
  created() {
    this.queryIntro();
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #fff;
  padding:  40px;
}

.desc{
  line-height: 1.625;
  margin-bottom: 12px;
}
</style>
