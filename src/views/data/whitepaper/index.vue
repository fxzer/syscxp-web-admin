<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small" @click="openAddOrEdit({})">新增</el-button>

    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cover" label="封面" width="100">
          <template slot-scope='{row}'>
           <img :src="row.cover" class="cover"  >
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="fileLink" label="下载链接"></el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160px">
          <template slot-scope='{row}'>
            {{ row.createDate | date }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" style="margin-right:10px;" @click="openAddOrEdit(row)">修改</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="deleteHandler(row)">
              <el-button type="danger" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <AddEditPaper :visible.sync="addEditVisible"  :currentRow="currentRow" @done="addEditDone"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { queryPaper, deletePaper,createPaper ,updatePaper} from "@/api/whitepaper";
export default {
  props: {

  },
  data() {
    return {
      dataList: [],
      currentRow: {},
      wrapperLoading: false,
      gridLoading: false,
      addEditVisible: false,
    };
  },
  methods: {
    async queryList() {
      this.gridLoading = true
      const result = await queryPaper({})
      this.dataList = result.success ? result.inventories : []
      this.gridLoading = false
    },
    openAddOrEdit(row){
      this.currentRow = row
      this.addEditVisible = true
    },
    async addEditDone(formData,isEdit){
      this.wrapperLoading = true;
      const fn = isEdit ? updatePaper : createPaper
      const result = await fn(formData);
      this.wrapperLoading = false;
      if (result.success) {
        this.$notify({
          type: "success",
          message: `${isEdit?'修改':'添加'}成功`,
        });
        this.addEditVisible = false;
        this.queryList();
      } else {
        this.$notify({
          type: "error",
          message: `${isEdit?'修改':'添加'}失败`,
        });
      }
    },
    /* 删除 */
    async deleteHandler(row) {
      this.wrapperLoading = true
      const result = await deletePaper(row.uuid)
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
    AddEditPaper: () => import('./components/AddEditPaper.vue'),
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
.cover{
  width: 70px;
  height: 100px;
  border-radius: 4px;
  border:1px solid #ddd;
}
</style>

