<template>
  <label class="notes">
    <span class="name">备注</span>
    <input id="xxx" type="text" placeholder="输入备注" />
  </label>
</template>

<script lang="ts">
export default {
  name: "Notes",
};
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    border: none;
    background: transparent;
    height: 64px;
    flex-grow: 1;
    padding-right: 16px;
  }
}
</style>