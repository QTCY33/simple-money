<template>
  <div>
    {{ value }}
    <label class="notes">
      <span class="name">备注</span>
      <input v-model="value" type="text" placeholder="输入备注" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  value = "";
}
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