<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <input v-model="value" type="text" :placeholder="this.placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  value = "";
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Watch("value")
  onValueChange(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  display: flex;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    border: none;
    background: transparent;
    height: 40px;
    flex-grow: 1;
    padding-right: 16px;
  }
}
</style>
