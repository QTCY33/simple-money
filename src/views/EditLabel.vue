<template>
  <Layout
    ><div class="navBar">
      <Icon class="left" name="right" @click="goBack" /><span class="title"
        >编辑标签</span
      ><span class="right"></span>
    </div>
    <div class="notes-wrapper">
      <Notes
        :value="tag.name"
        @update:value="update"
        field-name="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "../components/Money/Notes.vue";
import Button from "../components/Button.vue";

@Component({ components: { Notes, Button } })
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("setCurrentTag", id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    // if (this.tag) {
    //   store.updateTag(this.tag.id, name);
    // }
  }
  remove() {
    if (this.tag) {
      // if (store.removeTag(this.tag.id)) {
      //   this.$router.back();
      // } else {
      //   window.alert("删除失败");
      // }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  font-size: 16px;
  text-align: center;
  padding: 12px 16px;
  position: relative;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
    font-size: 16px;
  }
  > .left {
    transform: rotate(180deg);
    width: 24px;
    height: 24px;
    margin-right: 16px;
    left: 16px;
  }
  > .right {
    width: 24px;
    height: 24px;
  }
}
.notes-wrapper {
  margin-top: 8px;
  background: white;
}
.button-wrapper {
  text-align: center;
  padding: 20px;
  margin-top: 28px;
}
</style>
