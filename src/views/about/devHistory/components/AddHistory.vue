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
          // {
          //   yearmonth: '',
          //   description: '',
          // }
          {
            "yearmonth": "2023-03",
            "description": "获得北京市“专精特新”中小企业认证"
          },
          {
            "yearmonth": "2022-10",
            "description": "Hybrid WAN v2.0重磅发布"
          },
          {
            "yearmonth": "2022-09",
            "description": "与中信网络强强联合，共建云网融合平台"
          },
          {
            "yearmonth": "2022-05",
            "description": "受邀联合撰写《SASE技术与应用场景白皮书》"
          },
          {
            "yearmonth": "2022-05",
            "description": "获得云计算开源产业联盟“2022年优秀SASE案例”奖"
          },
          {
            "yearmonth": "2022-03",
            "description": "获得北京市“专精特新”中小企业认证"
          },
          {
            "yearmonth": "2021-12",
            "description": "(智能访问)获得云计算开源产业联盟年度混合云大会优秀SASE案例"
          },
          {
            "yearmonth": "2021-11",
            "description": "(SysNIP)平台1.0原型 构建完成"
          },
          {
            "yearmonth": "2021-08",
            "description": "联合中国信通发布业界首部《云交换白皮书》"
          },
          {
            "yearmonth": "2021-04",
            "description": "自研 SASE（智能访问）产品上线"
          },
          {
            "yearmonth": "2021-03",
            "description": "受聘成为中国通信标准协会云网产业推进方阵专家组、理事成员单位"
          },
          {
            "yearmonth": "2021-01",
            "description": "云交换平台v5.0上线"
          },
          {
            "yearmonth": "2020-11",
            "description": "受邀与中国信通院、中国电信集团、广东电信分公司联合撰写 《混合多云网络白皮书》"
          },
          {
            "yearmonth": "2020-10",
            "description": "犀思云与广东电信达成一线多云战略合作"
          },
          {
            "yearmonth": "2020-09",
            "description": "云交换平台v4.0上线"
          },
          {
            "yearmonth": "2019-11",
            "description": "获得云计算开源产业联盟年度SD-WAN优秀应用奖"
          },
          {
            "yearmonth": "2019-07",
            "description": "成为首批通过可信云SD-WAN解决方案评估企业"
          },
          {
            "yearmonth": "2019-05",
            "description": "与北京移动达成战略合作伙伴关系"
          },
          {
            "yearmonth": "2019-01",
            "description": "成为AWS北京、宁夏Direct Connect合作伙伴；成为微软云Azure北京C1合作伙伴"
          },
          {
            "yearmonth": "2018-12",
            "description": "云交换平台v3.0上线 软件平台全面上线，网络稳定性全面升级"
          },
          {
            "yearmonth": "2018-08",
            "description": "受邀联合制定SD-WAN行业准则"
          },
          {
            "yearmonth": "2018-04",
            "description": "云交换平台v2.0上线"
          },
          {
            "yearmonth": "2017-10",
            "description": "荣获阿里云“混合云优秀合作伙伴”"
          },
          {
            "yearmonth": "2017-08",
            "description": "拓展国内节点，及（东南亚、北美、欧洲）业务节点增至200+"
          },
          {
            "yearmonth": "2017-05",
            "description": "接入主流公有云，成为阿里云、腾讯云、华为云等主流公有云的战略伙伴"
          },
          {
            "yearmonth": "2017-03",
            "description": "云交换服务平台v1.0重磅上线"
          },
          {
            "yearmonth": "2016-10",
            "description": "获得A轮融资 获得投资机构1.5亿A轮融资"
          },
          {
            "yearmonth": "2015-05",
            "description": "建立基于SDN的Overlay专有网络 建立了全国范围内22个骨干网节点"
          },
          {
            "yearmonth": "2013-12",
            "description": "取得工信部颁发的牌照"
          },
          {
            "yearmonth": "2013-01",
            "description": "ISP经营许可证"
          },
          {
            "yearmonth": "2013-01",
            "description": "VPN经营许可证"
          },
          {
            "yearmonth": "2013-01",
            "description": "IDC经营许可证，并启用自有BGP网络"
          },
          {
            "yearmonth": "2012-07",
            "description": "犀思云Syscloud公司正式成立"
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
