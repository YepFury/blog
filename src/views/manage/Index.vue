<template>
  <div class="manage-view">
    <el-menu
      router
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1" route="/manage">
        <i class="el-icon-menu"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="2" route="/manage/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">人员管理</span>
      </el-menu-item>
    </el-menu>
    <div class="table-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Manage",

  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.manage-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  .el-menu-vertical {
    width: 200px;
  }
  .table-content {
    width: calc(100% - 201px);
    padding: 20px;
    height: 100%;
  }
}
</style>
