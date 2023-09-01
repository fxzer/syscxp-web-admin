<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small" style="height: 32px;"  @click="openAddOrEdit({})">新增</el-button> 
      <div style="margin-left: 20px;display: inline-block;">
        <span>资质分类：</span>
          <el-select v-model="qualType" size="medium"  placeholder="请选择资质分类"   @change="qualTypeChange">
            <el-option value="全部">全部 </el-option>
            <el-option value="权威资质">权威资质 </el-option>
            <el-option value="荣誉资质">荣誉资质 </el-option>
          </el-select>
      </div>
      
    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="imgSrc" label="图片">
          <template slot-scope='{row}'>
           <img :src="row.imgSrc" class="cover"  >
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="分类"></el-table-column>
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
      <el-pagination style="text-align: center;margin: 15px;"
        v-bind="{ ...pageOptions, ...paginationOptions }"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        hide-on-single-page
      ></el-pagination>
    </div>
    <AddEditQual :visible.sync="addEditVisible"  :currentRow="currentRow" @done="addEditDone"/> 
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { queryQualification, deleteQualification,createQualification ,updateQualification} from "@/api/qualification";
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
      qualType:'全部',
      paginationOptions: {
        currentPage: 1,
        pageSize: 20,
        total: 0,
      },
    };
  },
  methods: {
    qualTypeChange(){
      this.queryList()
    },
    async queryList() {
      this.gridLoading = true
      const qobj = {
        limit:10,
        conditions : []
      }
      if(this.qualType !== '全部'){
        qobj.conditions.push({
          name: 'type',
          op: '=',
          value: this.qualType,
        })
      }
      const { pageSize, currentPage } = this.paginationOptions;
      qobj.limit = pageSize;
      qobj.start = (currentPage - 1) * pageSize;
      const result = await queryQualification(qobj)
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
    openAddOrEdit(row){
      this.currentRow = row
      this.addEditVisible = true
    },
    async addEditDone(formData,isEdit){
      this.wrapperLoading = true;
      const fn = isEdit ? updateQualification : createQualification
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
      const result = await deleteQualification(row.uuid)
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
    AddEditQual: () => import('./components/AddEditQual.vue'),
  },
  computed: {
    ...mapState([
      "pageOptions",
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

