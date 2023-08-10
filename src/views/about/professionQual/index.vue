<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small" @click="openAdd">新增</el-button>
    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="img" label="图片"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160px">
          <template slot-scope='{row}'>
            {{ row.createDate | date }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="320" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" style="margin-right:6px;" @click="openEdit(row)">修改</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="deleteHandler(row)">
              <el-button type="danger" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { queryQuickAccess, deleteQuickAccess,createQuickAccess ,updateQuickAccess} from "@/api/quickAccess";
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
    };
  },
  methods: {
    async queryList() {
      this.gridLoading = true
      const result = await queryQuickAccess({})
      this.dataList = result.success ? result.inventories : []
      console.log("[  this.dataList ]-46", this.dataList);
      this.gridLoading = false
    },
    /* 新增 */
    openAdd() {
      this.currentRow = {}
      this.addVisible = true
    },
    async addDone(formData){
      this.wrapperLoading = true;
      const result = await createQuickAccess(formData);
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
      const result = await updateQuickAccess(formData);
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
      const result = await deleteQuickAccess(row.uuid)
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
  },
  computed: {
    ...mapState([
      "cellLayout",
      "headerCellLayout",
    ]),
  },
  mounted() {
    this.queryList()
  },
};
</script>

