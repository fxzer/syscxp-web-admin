<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small" @click="openAddOrEdit({})">新增</el-button>

    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout" @expand-change="expandChange">
        <el-table-column type="expand" width="40">
          <template v-if="row" slot-scope="{ row }">
            <div style="padding: 5px 20px;">
              <div>
                <el-button type="primary" style="margin-bottom: 5px;" size="small" @click="openAddOrEditItem({})">新增痛点</el-button>
              </div>
              <el-table v-loading="detailLoading" :data="detailList" stripe class="width-percent-100"
                :header-cell-style="headerCellLayout" :cell-style="cellLayout">
                <el-table-column prop="cover" label="封面图" width="160">
                  <template slot-scope='{row}'>
                    <img :src="row.cover" class="cover" style="max-height: 100px;">
                  </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>

                <el-table-column label="操作" width="240" fixed="right">
                  <template slot-scope="{ row }">
                    <el-button type="primary" size="mini" style="margin-right:10px;"
                      @click="openAddOrEditItem(row)">修改</el-button>
                    <el-popconfirm title="确定删除吗？" @confirm="deleteItemHandler(row)">
                      <el-button type="danger" size="mini" slot="reference">删除</el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="img" label="图片" width="160">
          <template slot-scope='{row}'>
            <img :src="row.img" class="img">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="subTitle" label="副标题"></el-table-column>
        <el-table-column prop="createDate" label="更新时间" width="160">
          <template slot-scope='{row}'>
            {{ row.createDate | date }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="240" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="toggleExpand(row)">痛点管理</el-button>
            <el-button type="primary" size="mini" style="margin-right:10px;" @click="openAddOrEdit(row)">修改</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="deleteHandler(row)">
              <el-button type="danger" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddEditPain :visible.sync="addEditVisible" :currentRow="currentRow" @done="addEditDone" />
    <AddEditPainItem :visible.sync="addEditItemVisible" :currentRow="currentItem" @done="addEditItemDone" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { queryLand, deleteLand, createLand, updateLand, queryDetails,createDetails ,updateDetails,deleteDetails} from "@/api/land";
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
      detailList: [],
      currentItem: {},
      detailLoading: false,
      addEditItemVisible: false,
    };
  },
  methods: {
    expandChange(row){
      if(row){
        this.currentRow = row
        this.queryDetails()
      }
    },
    toggleExpand(row) {
      this.currentRow = row
      const expandIcons = document.querySelectorAll('.el-table .el-table__expand-icon')
      const index = this.dataList.findIndex((item) => item.uuid === row.uuid)
      expandIcons[index].click()
      this.queryDetails()
    },
    async queryList() {
      this.gridLoading = true
      const result = await queryLand({
        conditions: [{ name: 'type', op: '=', value: 'painPoint' }]
      })
      this.dataList = result.success ? result.inventories : []
      this.gridLoading = false
    },
    async queryDetails() {
      this.detailLoading = true
      const result = await queryDetails({
        conditions: [
          { name: 'landUuid', op: '=', value: this.currentRow.uuid }
        ]
      })
      this.detailList = result.success ? result.inventories : []
      this.detailLoading = false
    },
    openAddOrEdit(row) {
      this.currentRow = row
      this.addEditVisible = true
    },
    async addEditDone(formData, isEdit) {
      this.wrapperLoading = true;
      const fn = isEdit ? updateLand : createLand
      const result = await fn({
        ...formData,
        type: 'painPoint'
      });
      this.wrapperLoading = false;
      if (result.success) {
        this.$notify({
          type: "success",
          message: `${isEdit ? '修改' : '添加'}成功`,
        });
        this.addEditVisible = false;
        this.queryList();
      } else {
        this.$notify({
          type: "error",
          message: `${isEdit ? '修改' : '添加'}失败`,
        });
      }
    },
    async deleteHandler(row) {
      this.wrapperLoading = true
      const result = await deleteLand(row.uuid)
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

    /** 痛点管理 */ 
    openAddOrEditItem(row) {
      this.currentItem = row
      this.addEditItemVisible = true
    },
    async addEditItemDone(formData, isEdit) {
      this.wrapperLoading = true;
      const fn = isEdit ? updateDetails : createDetails
      const result = await fn({
        ...formData,
        landUuid: this.currentRow.uuid
      });
      this.wrapperLoading = false;
      if (result.success) {
        this.$notify({
          type: "success",
          message: `${isEdit ? '修改' : '添加'}成功`,
        });
        this.addEditItemVisible = false;
        this.queryDetails();
      } else {
        this.$notify({
          type: "error",
          message: `${isEdit ? '修改' : '添加'}失败`,
        });
      }
    },
    async deleteItemHandler(row) {
      this.detailLoading = true
      const result = await deleteDetails(row.uuid)
      this.detailLoading = false
      if (result.success) {
        this.$notify({
          type: 'success',
          message: '删除成功!'
        });
        this.queryDetails()
      } else {
        this.$notify({
          type: 'error',
          message: '删除失败!'
        });
      }
    },

  },
  components: {
    AddEditPain: () => import('./components/AddEditPain.vue'),
    AddEditPainItem: () => import('./components/AddEditPainItem.vue'),
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
.img {
  width: 120px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
