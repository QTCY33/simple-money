<template>
  <div id="main" ref="main"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as echarts from "echarts";

@Component
export default class Chart extends Vue {
  @Prop() option?: echarts.EChartsOption;

  mounted() {
    if (this.option === undefined) {
      return console.error("option 为空");
    }
    const myChart = echarts.init(this.$refs.main as HTMLDivElement);
    myChart.setOption(this.option);
  }
}
</script>
<style lang="scss">
#main {
  height: 200px;
}
</style>
