<template>
  <div class="view">
    <header>
      <div class="index-header">
        <h2>yBlog</h2>
        <div class="header-right">
          <el-menu
            router
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1" route="/">首页</el-menu-item>
            <!-- <el-menu-item index="2" route="/manage">管理</el-menu-item> -->
            <!-- <el-menu-item index="3" route="/about">关于</el-menu-item> -->
          </el-menu>
        </div>
      </div>
    </header>
    <div class="router-view-container">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    }
  }
};
</script>
<style lang="less">
.view {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    background-color: #333;
    color: #fff;
  }
  .index-header {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
      font-size: 26px;
    }
    .header-right {
      display: flex;
      align-items: center;
      ul {
        display: flex;
        li {
          margin-left: 10px;
        }
      }
    }
  }
  .router-view-container {
    height: calc(100% - 61px);
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
