<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small" @click="openAddNew">添加新闻</el-button>
    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout">
        <el-table-column prop="cover" label="封面" width="200">
          <template slot-scope='{row}'>
            <img :src="row.cover" class="cover">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="releaseDate" label="发布日期" width="150">
          <template slot-scope='{row}'>
            {{ row.releaseDate | date('yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160">
          <template slot-scope='{row}'>
            {{ row.createDate | date }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" style="margin-right:10px;" @click="openEditNew(row)">修改</el-button>
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
import { queryNews, deleteNews, updateNews } from "@/api/news";
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
        fields:['uuid','cover','title','description','createDate']
      }
      const { pageSize, currentPage } = this.paginationOptions;
      qobj.limit = pageSize;
      qobj.start = (currentPage - 1) * pageSize;
      const result = await queryNews(qobj)
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
    openAddNew() {
      //另外重新开标签页
    this.$router.push({
        name: "AddNew",
      })
    },

    /* 修改 */
    openEditNew(row) {
      this.$router.push({
        name: "EditNew",
        query:{
          uuid:row.uuid
        }
      })
    },
    async editDone(formData) {
      this.wrapperLoading = true;
      const result = await updateNews(formData);
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
      const result = await deleteNews(row.uuid)
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
.cover {
  width: 120px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>

