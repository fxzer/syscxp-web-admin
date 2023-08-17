<template>
  <el-drawer :visible="visible" direction="rtl" size="450px" @close="close" :show-close="true"
    :wrapperClosable="true">
    <h2 style="margin-left: 20px;">使用说明</h2> 
    <div style="padding:20px">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="情景一：添加新文章" name="1" >
        <div style="margin-left:20px;">
          <h4>
            1. 使用<a href="https://www.365editor.com/" target="_blank">365编辑器</a> 排版文章，并保存至草稿箱
          </h4>
          <el-image style="width: 200px; height: 200px" src="https://s1.ax1x.com/2023/08/17/pP11TRP.jpg"
            :preview-src-list="srcListSave">
          </el-image>

          <h4>
            2. 复制全文，粘贴到编辑区
          </h4>
          <el-image style="width: 200px; height: 200px" src="https://s1.ax1x.com/2023/08/17/pP117xf.png"
            :preview-src-list="srcListCopy">
          </el-image>

          <h4>
            3. 发布
          </h4>
        </div>
        </el-collapse-item>
        <el-collapse-item title="情景二：加入公众号已有文章" name="2">
          <div style="margin-left:20px;">
          <h4>
            1. 打开微信公众号已发布的文章， 全选(Ctrl+A)并复制全文(Ctrl+C)
          </h4>
          <el-image style="width: 200px; height: 200px" src="https://s1.ax1x.com/2023/08/17/pP13lLD.jpg"
            :preview-src-list="srcListAll">
          </el-image>

          <h4>
            2. 粘贴到<a href="https://www.365editor.com/" target="_blank">365编辑器</a>
          </h4>
          <el-image style="width: 200px; height: 200px" src="https://s1.ax1x.com/2023/08/17/pP117xf.png"
            :preview-src-list="srcListCopy">
          </el-image>

          <h4>
            3. 替换微信平台图片（微信公众号的图片不可外用，需要选择替换重新上传）
          </h4>
          <el-image style="width: 200px; height: 200px" src="https://s1.ax1x.com/2023/08/17/pP13Deg.jpg"
            :preview-src-list="srcListReplace">
          </el-image>
          <h4>
            3. 复制全文，粘贴到官网管理后台编辑区，发布
          </h4>
        </div>
        </el-collapse-item>
        <el-collapse-item title="情景三：更新文章" name="3">
          <div style="margin-left:20px;">
          <h4>
            1. 去<a href="https://www.365editor.com/" target="_blank">365编辑器</a> 草稿箱更新文章
          </h4>
          <el-image style="width: 200px; height: 200px" src="https://s1.ax1x.com/2023/08/17/pP11TRP.jpg"
            :preview-src-list="srcListSave">
          </el-image>

          <h4>
            2. 复制更新后的文章，粘贴到官网管理后台编辑区，发布
          </h4>
          <el-image style="width: 200px; height: 200px" src="https://s1.ax1x.com/2023/08/17/pP117xf.png"
            :preview-src-list="srcListCopy">
          </el-image>
        </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-drawer>
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
      activeName: '1',
      srcListCopy: [
        'https://s1.ax1x.com/2023/08/17/pP117xf.png'
      ],
      srcListSave:[
        'https://s1.ax1x.com/2023/08/17/pP11TRP.jpg'
      ],
      srcListAll:[
        'https://s1.ax1x.com/2023/08/17/pP13lLD.jpg'
      ],
      srcListReplace:[
        'https://s1.ax1x.com/2023/08/17/pP13Deg.jpg'
      ],
    };
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  },
  components: {

  },
};
</script>

<style scoped lang="scss">
h4{
  margin-bottom: 5px;
}
</style>
