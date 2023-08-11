<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="650px" @close="close">

    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">

      <el-form-item label="年份" prop="title">
        <el-date-picker v-model="form.year" type="year" placeholder="选择年" style="width:130px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="事件">
        <div v-for="(event, index) in form.events" :key="index"  style="display: flex; margin-bottom:20px;" >
          <el-form-item :prop="`events.${index}.month`" :rules="formRules.month">
            <el-date-picker v-model="event['month']" type="month" placeholder="选择月" style="width:130px" > </el-date-picker>
          </el-form-item>
          <el-form-item :prop="`events.${index}.desc`" style="margin:0 10px; flex:1;" :rules="formRules.desc">
            <el-input v-model="event['desc']" placeholder="请输入事件" clearable ></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" @click="addEvent" icon="el-icon-plus"  
            v-if="index === 0"> </el-button>
          <el-button type="danger" size="mini" @click="removeEvent(index)" icon="el-icon-minus"  
            v-else> </el-button>
        </div>

      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      title: '新增企业发展史',
      form: {
        year: '',
        events: [
          {
            month: '',
            desc: '',
          }
        ],
      },
      formRules: {
        year: [{ required: true, message: '请选择年份', trigger: 'blur' },],
        month: [{ required: false, message: '请选择月份', trigger: 'blur' },],
        desc: [{ required: true, message: '请输入事件', trigger: 'blur' },],
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
          this.$emit('done', this.form);
        }
      });
    },
    /* 添加事件 */
    addEvent() {
      this.form.events.push({
        month: '',
        desc: '',
      })
    },
    /* 删除事件 */
    removeEvent(index) {
      this.form.events.splice(index, 1)
    }

  },
  computed: {
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
        });
      }
    }
  }
}
</script>
