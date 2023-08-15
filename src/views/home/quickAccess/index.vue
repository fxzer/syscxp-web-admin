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
        <el-table-column prop="icon" label="图片" width="100">
          <template slot-scope='{row}'>
             <img :src="row.icon"   class="icon" >  
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160">
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
    </div>
    <AddAccess :visible.sync="addVisible" @done="addDone" />
    <EditAccess :visible.sync="editVisible"  :currentRow="currentRow" @done="editDone"/>
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
    },
    
  },
  components: {
    AddAccess: () => import('./components/AddAccess.vue'),
    EditAccess: () => import('./components/EditAccess.vue'),
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

<style scoped lang="scss">
.icon{
  width: 60px;height:60px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>

