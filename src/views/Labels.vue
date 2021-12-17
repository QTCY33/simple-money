<template>
  <Layout>
    <ol class="tags">
      <router-link
        class="tag"
        :to="`/labels/edit/${tag.id}`"
        v-for="tag in tags"
        :key="tag.id"
      >
        <span>{{ tag.name }}</span> <Icon name="right" />
      </router-link>
    </ol>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";
import Button from "@/components/Button.vue";

tagListModel.fetch();

@Component({ components: { Button } })
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt("请输入标签");
    if (name) {
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        window.alert("标签重复");
      } else if (message === "success") {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    padding: 16px;
    text-align: center;
    margin-top: 28px;
  }
}
</style>
