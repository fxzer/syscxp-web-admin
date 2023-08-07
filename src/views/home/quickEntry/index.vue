<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small">新增</el-button>

    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout">
        <el-table-column prop="number" label="序号" width="100"></el-table-column>
        <el-table-column  label="图片"></el-table-column>
        <el-table-column   label="标题"></el-table-column>
        <el-table-column  label="描述"></el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160px">
        </el-table-column>

        <el-table-column label="操作" width="320" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" >修改</el-button>
            <el-button type="danger" size="mini"  >删除</el-button>
            {{ row }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      dataList: [],
    };
  },
  methods: {

  },
  components: {

  },
};
</script>

<style scoped lang="scss"></style>
