<template>
  <div v-loading.fullscreen.lock="wrapperLoading" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="opt-group">
      <el-button type="primary" size="small" style="height: 32px;" @click="openAddOrEdit({})">新增</el-button>
      <div style="margin-left: 20px;display: inline-block;">
        <span>资质分类：</span>
        <el-select v-model="caseType" size="medium" placeholder="请选择行业分类" @change="caseTypeChange">
          <el-option value="全部">全部 </el-option>
          <el-option :value="caseType" v-for="caseType,index in typeList" :key="index">{{ caseType }} </el-option>
        </el-select>
      </div>

    </div>
    <div class="grid-wrapper">
      <el-table v-loading="gridLoading" :data="dataList" stripe class="width-percent-100"
        :header-cell-style="headerCellLayout" :cell-style="cellLayout">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="type" label="案例分类" width="80"></el-table-column>
        <el-table-column prop="logo" label="企业LOGO" width="90">
          <template slot-scope='{row}'>
            <img :src="row.logo" class="cover">
          </template>
        </el-table-column>
        <el-table-column prop="company" label="企业名称"></el-table-column>
        <el-table-column prop="outline" label="企业概述" ></el-table-column>
        <el-table-column prop="description" label="企业描述" min-width="220"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="140px">
          <template slot-scope='{row}'>
            {{ row.createDate | date }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" style="margin-right:10px;" @click="openAddOrEdit(row)">修改</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="deleteHandler(row)">
              <el-button type="danger" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center;margin: 15px;" v-bind="{ ...pageOptions, ...paginationOptions }"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" hide-on-single-page></el-pagination>
    </div>
    <AddEditCase :visible.sync="addEditVisible" :currentRow="currentRow" @done="addEditDone" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { queryTypeList, queryCase, deleteCase, createCase, updateCase } from "@/api/industryCase";
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
      caseType: '全部',
      typeList:[],
      paginationOptions: {
        currentPage: 1,
        pageSize: 20,
        total: 0,
      },
    };
  },
  methods: {
    caseTypeChange() {
      this.queryList()
    },
    async queryTypeList() {
      const { typeList = [] } = await queryTypeList()
      this.typeList = typeList
    },
    async queryList() {
      this.gridLoading = true
      const qobj = {
        limit: 10,
        conditions: []
      }
      if (this.caseType !== '全部') {
        qobj.conditions.push({
          name: 'type',
          op: '=',
          value: this.caseType,
        })
      }
      const { pageSize, currentPage } = this.paginationOptions;
      qobj.limit = pageSize;
      qobj.start = (currentPage - 1) * pageSize;
      this.queryTypeList()
      const result = await queryCase(qobj)
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
    openAddOrEdit(row) {
      this.currentRow = row
      this.addEditVisible = true
    },
    async addEditDone(formData, isEdit) {
      this.wrapperLoading = true;
      const fn = isEdit ? updateCase : createCase
      const result = await fn(formData);
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
    /* 删除 */
    async deleteHandler(row) {
      this.wrapperLoading = true
      const result = await deleteCase(row.uuid)
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
    }
  },
  components: {
    AddEditCase: () => import('./components/AddEditCase.vue'),
  },
  computed: {
    ...mapState([
      "pageOptions",
      "cellLayout",
      "headerCellLayout",
    ]),
  },
  mounted() {
    this.queryTypeList()
    this.queryList()
  },
};
</script>

<style scoped lang="scss">
.cover {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>

