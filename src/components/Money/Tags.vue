<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">新增</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }
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
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: transparent;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background: transparent;
      color: #acd1bf;
      border: 1px solid #acd1bf;
      box-shadow: -1px -1px #acd1bf;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0px 10px;
      margin-top: 10px;
      margin-right: 12px;
      &.selected {
        left: 1px;
        top: 1px;
        background: #e9da73;
        box-shadow:none;
        border: none;
        color: #ffffff;
      }
    }
  }
  > .new {
    margin-top: 20px;
    padding: 16px 0;
    button {
      background: transparent;
      border: none;
      color: rgb(158, 120, 120);
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
