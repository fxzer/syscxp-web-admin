<template>
  <div class="wrapper">
    <el-form :model="form" label-width="70px" :rules="formRules" ref="form">
      <el-form-item label="标题：" prop="title">
        <el-input v-if="isEdit" v-model="form.title" placeholder="请输入标题"></el-input>
        <h4 v-else>{{ form.title }}</h4>
      </el-form-item>
      <el-form-item label="描述：" prop="desc">
        <template  v-if="isEdit" >
          <div v-for="(desc,index) in form.desc" :key="index" style="display: flex;justify-content: start;align-items: center;">
            <el-input type="textarea" style="margin-bottom:10px;" v-model="form.desc[index]"  :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入描述"></el-input>
             <el-button type="primary" size="mini" @click="addDesc" icon="el-icon-plus" style="margin-left: 10px;" v-if="index===0"> </el-button>
             <el-button type="danger" size="mini" @click="removeDesc(index)" icon="el-icon-minus" style="margin-left: 10px;" v-else> </el-button>
          </div>
          
        </template>
       
          <template v-else>
            <p v-for="(desc,index) in form.desc" :key="index" class="desc">{{  desc }}</p>
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
export default {
  props: {
  },
  data() {
    return {
      isEdit: false,
      loading: false,
      form: {
        title: '犀思云是国内NaaS（网络即服务）服务提供商',
        desc: [
        '1犀思云成立于2012年，是国内NaaS（网络即服务）服务提供商，深耕SDN/NFV（软件定义网络/网络虚拟化）技术10年之久，致力于通过基于SDN技术构建的融合网络平台，面向用户提供混合多云连接、企业总分支组网、应用访问加速、边缘网络加速等L2至L7层网络服务和解决方案。犀思云资源覆盖全球，边缘云POP节点100+，云节点200+',
        '2犀思云成立于2012年，是国内NaaS（网络即服务）服务提供商，深耕SDN/NFV（软件定义网络/网络虚拟化）技术10年之久，致力于通过基于SDN技术构建的融合网络平台，面向用户提供混合多云连接、企业总分支组网、应用访问加速、边缘网络加速等L2至L7层网络服务和解决方案。犀思云资源覆盖全球，边缘云POP节点100+，云节点200+1',
        '3犀思云成立于2012年，是国内NaaS（网络即服务）服务提供商，深耕SDN/NFV（软件定义网络/网络虚拟化）技术10年之久，致力于通过基于SDN技术构建的融合网络平台，面向用户提供混合多云连接、企业总分支组网、应用访问加速、边缘网络加速等L2至L7层网络服务和解决方案。犀思云资源覆盖全球，边缘云POP节点100+，云节点200+2',

        ]
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        desc: [{ required: true, message: '请输入描述', trigger: 'blur' },],
      },
    }
  },
  methods: {
    showEdit(){
      this.isEdit = true;
    },
    async handleSave(){
      this.loading = true;
      // const result = await updateQuickAccess(formData);
      // this.loading = false;
      // if (result.success) {
      //   this.$notify({
      //     type: "success",
      //     message: `修改成功`,
      //   });
      //  his.isEdit = false;
      // } else {
      //   this.$notify({
      //     type: "error",
      //     message: `修改失败`,
      //   });
      // }
    },
    addDesc(){
      this.form.desc.push('');
    },
    removeDesc(index){
      this.form.desc.splice(index,1);
    }
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #fff;
  padding: 20px;
}

.desc{
  line-height: 1.625;
  margin-bottom: 12px;
}
</style>
