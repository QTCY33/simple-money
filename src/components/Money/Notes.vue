<template>
  <div>
    <label class="notes">
      <span class="name">{{ fieldName }}</span>
      <template v-if="type === 'date'"
        ><input
          :value="x(value)"
          @input="onValueChange($event.target.value)"
          :type="type || 'text'"
          :placeholder="placeholder"
      /></template>
      <template v-else
        ><input
          :value="value"
          @input="onValueChange($event.target.value)"
          :type="type || 'text'"
          :placeholder="placeholder"
      /></template>
    </label>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;

  onValueChange(value: string) {
    this.$emit("update:value", value);
  }
  x(isoString: string) {
    return dayjs(isoString).format("YYYY-MM-DD");
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
