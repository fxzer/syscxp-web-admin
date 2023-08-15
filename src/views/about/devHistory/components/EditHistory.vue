<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="visible" width="650px" @close="close">

    <el-form :model="form" label-width="60px" :rules="formRules" ref="form">

      <el-form-item label="事件">
        <div style="display: flex;  margin-bottom:20px;">
          <el-form-item prop="yearmonth" :rules="formRules.yearmonth">
            <el-date-picker v-model="form.yearmonth" type="month" value-format="yyyy-MM" placeholder="选择年月"
              style="width:130px"> </el-date-picker>
          </el-form-item>
          <el-form-item prop="description" style="margin:0 10px; flex:1;" :rules="formRules.description">
            <el-input v-model="form.description" placeholder="请输入事件" clearable></el-input>
          </el-form-item>
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
  data() {
    return {
      loading: false,
      title: '修改企业发展史',
      form: {
        yearmonth: '',
        description: '',
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
          this.$emit('done', {
            ...this.form,
            year: this.form.yearmonth.split('-')[0],
            month: this.form.yearmonth.split('-')[1]
          });
        }
      });
    },

  },
  computed: {
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();
          copyObject(this.currentRow, this.form, ['uuid', 'description'])
          this.form.yearmonth = this.currentRow.year + '-' + this.currentRow.month
        });
      }
    }
  }
}
</script>
