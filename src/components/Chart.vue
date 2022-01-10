<template>
  <div id="main" ref="main"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import * as echarts from "echarts";
import { EChartsOption, ECharts } from "echarts";

@Component
export default class Chart extends Vue {
  @Prop() option?: EChartsOption;
  myChart?: ECharts;
  mounted() {
    if (this.option === undefined) {
      return console.error("option 为空");
    }
    this.myChart = echarts.init(this.$refs.main as HTMLDivElement);
    this.myChart.setOption(this.option);
  }
  @Watch("option")
  onOptionsChange(newValue: EChartsOption) {
    this.myChart!.setOption(newValue);
  }
}
</script>
<style lang="scss">
#main {
  height: 200px;
}
</style>
