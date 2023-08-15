<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small" @click="openAdd">新增</el-button>
    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout">
        <el-table-column prop="year" label="年份" width="100"></el-table-column>
        <el-table-column prop="month" label="月份" width="100"></el-table-column>
        <el-table-column prop="description" label="事件"></el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160px">
          <template slot-scope='{row}'>
            {{ row.createDate | date }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" style="margin-right:10px;" @click="openEdit(row)">修改</el-button>
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
    <AddHistory :visible.sync="addVisible" @done="addDone" />
    <EditHistory :visible.sync="editVisible"  :currentRow="currentRow" @done="editDone"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { batchCreateHistory, queryHistory,updateHistory ,deleteHistory} from "@/api/devHistory";

export default {
  props: {

  },
  data() {
    return {
      dataList: [],
      currentRow: {},
      wrapperLoading: false,
      gridLoading: false,
      addVisible: false,
      editVisible: false,
      paginationOptions: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
      },
    };
  },
  methods: {
    async queryList() {
      this.gridLoading = true
      const qobj = {
        limit:80,
        sortBy: "year",
        sortDirection: "desc",
      }
      const { pageSize, currentPage } = this.paginationOptions;
      qobj.limit = pageSize;
      qobj.start = (currentPage - 1) * pageSize;
      const result = await queryHistory(qobj)
      this.dataList = result.success ? result.inventories : []
      this.paginationOptions.total = result.success ? result.total : 0;
      //按照年月排序
      this.dataList.sort((a, b) =>new Date(`${a.year}-${a.month}`) > new Date(`${b.year}-${b.month}`) ? -1 : 1)
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
    /* 新增 */
    openAdd() {
      this.currentRow = {}
      this.addVisible = true
    },
    async addDone(formData){
      this.wrapperLoading = true;
      const result = await batchCreateHistory(formData);
      this.wrapperLoading = false;
      if (result.success) {
        this.$notify({
          type: "success",
          message: `新增成功`,
        });
        this.addVisible = false;
        this.queryList();
      } else {
        this.$notify({
          type: "error",
          message: `新增失败`,
        });
      }
    },
    /* 修改 */
    openEdit(row) {
      this.currentRow = row
      this.editVisible = true
    },
    async editDone(formData){
      this.wrapperLoading = true;
      const result = await updateHistory(formData);
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
      const result = await deleteHistory(row.uuid)
      this.wrapperLoading = false
      if (result.success) {
        this.$notify({
          type: 'success',
          message: '删除成功!'
        });
        this.queryList()
      }else{
        this.$notify({
          type: 'error',
          message: '删除失败!'
        });
      }
    }
  },
  components: {
    AddHistory: () => import('./components/AddHistory.vue'),
    EditHistory: () => import('./components/EditHistory.vue'),
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

