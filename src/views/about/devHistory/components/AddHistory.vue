<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="650px" @close="close">

    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">

      <el-form-item label="事件">
        <div v-for="(event, index) in form.events" :key="index" class="event-item" style="display: flex;">
          <el-form-item :prop="`events.${index}.yearmonth`" :rules="formRules.yearmonth">
            <el-date-picker v-model="event['yearmonth']" type="month" value-format="yyyy-MM" placeholder="选择年月"
              style="width:130px"> </el-date-picker>
          </el-form-item>
          <el-form-item :prop="`events.${index}.description`" style="margin:0 10px; flex:1;"
            :rules="formRules.description">
            <el-input v-model="event['description']" placeholder="请输入事件" clearable></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" @click="addEvent" icon="el-icon-plus" v-if="index === 0"> </el-button>
          <el-button type="danger" size="mini" @click="removeEvent(index)" icon="el-icon-minus" v-else> </el-button>
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
        events: [
          {
            yearmonth: '',
            description: '',
          }
        ],
      },
      formRules: {
        yearmonth: [{ required: true, message: '请选择年月', trigger: 'blur' },],
        description: [{ required: true, message: '请输入事件', trigger: 'blur' },],
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
          const historyVOList = this.form.events.map(item => {
            return {
              year: item.yearmonth.split('-')[0],
              month: item.yearmonth.split('-')[1],
              description: item.description,
            }
          })
          this.$emit('done', { historyVOList });
        }
      });
    },
    /* 添加事件 */
    addEvent() {
      this.form.events.push({
        yearmonth: '',
        description: '',
      })
    },
    /* 删除事件 */
    removeEvent(index) {
      this.form.events.splice(index, 1)
    }

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

<style scoped lang="scss">
.event-item+.event-item {
  margin-top: 20px;
}
</style>
