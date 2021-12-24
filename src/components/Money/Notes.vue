<template>
  <div>
    <label class="notes">
      <span class="name">{{ fieldName }}</span>
      <input
        :value="value"
        @input="onValueChange($event.target.value)"
        type="text"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;

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
