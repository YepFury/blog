<template>
  <div class="tag">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tag"
};
</script>

<style lang="less" scoped>
.tag {
  display: inline-block;
  padding: 0 5px;
  height: 18px;
  line-height: 18px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #409eff;
  color: #409eff;
  margin-right: 5px;
}
</style>
