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
        <el-table-column prop="bgPath" label="图片" width="160">
          <template slot-scope='{row}'>
             <img :src="row.bgPath"   class="bgPath" >  
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="btnText" label="按钮文本"></el-table-column>
        <el-table-column prop="btnLink" label="按钮链接"></el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160">
          <template slot-scope='{row}'>
            {{ row.createDate | date }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="220" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="warning" size="mini"  @click="toggle(row)">隐藏</el-button>
            <el-button type="primary" size="mini" style="margin-right:6px;" @click="openAddOrEdit(row)">修改</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="deleteHandler(row)">
              <el-button type="danger" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddEditSwiper :visible.sync="addEditVisible"  :currentRow="currentRow" @done="addEditDone"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { queryBanner, deleteBanner,createBanner ,updateBanner} from "@/api/banner";
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
    toggle(){
      console.log('toggle')
    },
    async queryList() {
      this.gridLoading = true
      const result = await queryBanner({})
      this.dataList = result.success ? result.inventories : []
      this.gridLoading = false
    },
    openAddOrEdit(row){
      this.currentRow = row
      this.addEditVisible = true
    },
    async addEditDone(formData,isEdit){
      this.wrapperLoading = true;
      const fn = isEdit ? updateBanner : createBanner
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
      const result = await deleteBanner(row.uuid)
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
    AddEditSwiper: () => import('./components/AddEditSwiper.vue'),
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
.bgPath{
  width: 120px;
  height:60px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>

