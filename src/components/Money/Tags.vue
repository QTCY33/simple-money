<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Component, Prop } from "vue-property-decorator";
@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    },
  },
})
export default class Tags extends Vue {
  @Prop(Array) dataSource: string[] | undefined;
  selectedTags: string[] = [];
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
  create() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit("createTag", name);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  background: white;
  > .current {
    display: flex;
    flex-direction: column-reverse;

    > li {
      $bg: rgb(192, 185, 185);
      background: $bg;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      flex-direction: row;
      padding: 0 6px;
      margin-top: 10px;
      margin-right: auto;
      &.selected {
        background: darken($color: $bg, $amount: 20%);
        color: white;
      }
    }
  }
  > .new {
    padding: 16px 0;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
