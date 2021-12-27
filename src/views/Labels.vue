<template>
  <Layout>
    <NavTop class="nav-top">标签</NavTop>
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
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";

@Component({
  components: { Button },
})
export default class Labels extends mixins(TagHelper) {
  beforeCreate() {
    this.$store.commit("fetchTags");
  }
  get tags() {
    return this.$store.state.tagList;
  }
}
</script>

<style lang="scss" scoped>
.tags {
  margin-top: 20px;
  background-color: #eeebd8;
  font-size: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    padding-left: 16px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dbd4b7;
    svg {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
  }
}
.nav-top {
  font-weight: bold;
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
