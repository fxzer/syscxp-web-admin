<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small" @click="openAddKnowledge">添加</el-button>
    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="writer" label="作者"></el-table-column>
        <el-table-column prop="source" label="来源"></el-table-column>
        <el-table-column prop="counts" label="阅读次数"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160">
          <template slot-scope='{row}'>
            {{ row.createDate | date }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" style="margin-right:10px;" @click="openEditKnowledge(row)">修改</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="deleteHandler(row)">
              <el-button type="danger" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center;margin: 15px;"
        v-bind="{ ...pageOptions, ...paginationOptions }"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        hide-on-single-page
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { queryKnowledge, deleteKnowledge, updateKnowledge } from "@/api/knowledge";
export default {
  props: {

  },
  data() {
    return {
      dataList: [],
      currentRow: {},
      wrapperLoading: false,
      gridLoading: false,
      paginationOptions: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  methods: {
    async queryList() {
      this.gridLoading = true
      const qobj = {
        fields:['uuid','counts','title','writer','source','description','createDate']
      }
      const { pageSize, currentPage } = this.paginationOptions;
      qobj.limit = pageSize;
      qobj.start = (currentPage - 1) * pageSize;
      const result = await queryKnowledge(qobj)
      this.dataList = result.success ? result.inventories : []
      this.paginationOptions.total = result.success ? result.total : 0;
      this.gridLoading = false
    },
    handleSizeChange(size) {
      this.paginationOptions.pageSize = size;
      this.queryList(); 
    },
    handleCurrentChange(current) {
      this.paginationOptions.currentPage = current;
      this.queryList(); 
    },
    openAddKnowledge() {
      //另外重新开标签页
    this.$router.push({
        name: "AddKnowledge",
      })
    },

    /* 修改 */
    openEditKnowledge(row) {
      this.$router.push({
        name: "EditKnowledge",
        query:{
          uuid:row.uuid
        }
      })
    },
    async editDone(formData) {
      this.wrapperLoading = true;
      const result = await updateKnowledge(formData);
      this.wrapperLoading = false;
      if (result.success) {
        this.$notify({
          type: "success",
          message: `修改成功`,
        });
        this.editVisible = false;
        this.queryList();
      } else {
        this.$notify({
          type: "error",
          message: `修改失败`,
        });
      }
    },
    /* 删除 */
    async deleteHandler(row) {
      this.wrapperLoading = true
      const result = await deleteKnowledge(row.uuid)
      this.wrapperLoading = false
      if (result.success) {
        this.$notify({
          type: 'success',
          message: '删除成功!'
        });
        this.queryList()
      } else {
        this.$notify({
          type: 'error',
          message: '删除失败!'
        });
      }
    },

  },
  computed: {
    ...mapState([
      "pageOptions",
      "cellLayout",
      "searchAccount",
      "headerCellLayout",
    ]),
  },
  mounted() {
    this.queryList()
  },
};
</script>

<style scoped lang="scss">
</style>

