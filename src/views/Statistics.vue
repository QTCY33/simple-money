<template>
  <Layout class="layout">
    <NavTop
      ><Tabs
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="type"
    /></NavTop>
    <div v-if="groupedList.length!==0" class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :option="chartOption" />
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else>
      <Icon class="icon" name="NoContent" />
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "../components/Chart.vue";
import _ from "lodash";
import day from "dayjs";

@Component({
  components: { Tabs, Chart },
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join("，");
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [] as Result;
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  type = "-";
  recordTypeList = recordTypeList;
  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 30; i++) {
      const dateString = day(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.groupedList, {
        title: dateString,
      });
      array.push({
        key: dateString,
        value: found ? found.total : 0,
      });
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }
  get chartOption() {
    const keys = this.keyValueList.map((item) => item.key);
    const values = this.keyValueList.map((item) => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
      },
      tooltip: {
        trigger: "axis",
        formatter: "{c}",
        axisPointer: {
          animation: true,
        },
      },
      xAxis: {
        type: "category",
        splitLine: {
          show: false,
        },
        axisTick: { alignWithLabel: true },
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substring(5);
          },
        },
        data: keys,
      },
      yAxis: {
        type: "value",

        splitLine: {
          show: true,
        },
      },
      series: [
        {
          itemStyle: { color: "#acd1c0" },
          type: "line",
          data: values,
        },
      ],
    };
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs {
    display: flex;
    flex-direction: row;
    margin: -10px;
    .type-tabs-item {
      font-size: 25px;
      margin: 12px;
      &.selected {
        font-weight: bold;
        transition: All 0.1s ease;
        transform: scale(1.2);
        &::after {
          display: none;
        }
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
  margin-top: 20px;
  border-top: 2px solid rgb(61, 56, 56);
}
.record {
  background: #eeebd8;
  border-bottom: 1px solid #dbd4b7;
  @extend %item;
  overflow-y: scroll;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

.icon {
  font-size: 340px;
  display: flex;
  margin: auto;
  margin-top: 12vh;
}
.chart {
  width: 200%;
}
.layout {
  overflow: hidden;
}
.chart {
  width: 400%;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
