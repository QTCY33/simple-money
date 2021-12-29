<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs
      class="tabs"
      :data-source="recordTypeList"
      :value.sync="record.type"
    />
    <div class="createAt">
      <Notes field-name="日期" :value.sync="record.createdAt" type="date" />
    </div>
    <div class="notes">
      <Notes
        field-name="备注"
        placeholder="在此输入备注"
        :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="record.tags = $event" />
    <NavTop class="nav-top">记账</NavTop>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import Notes from "../components/Money/Notes.vue";
import NavTop from "@/components/NavTop.vue";

@Component({
  components: { NumberPad, Tags, Notes, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("请至少选择一个标签");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
      this.record.notes = "";
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
::v-deep .tabs {
  display: flex;
  text-align: center;
  font-size: 24px;
  min-height: 58px;
  &-item {
    width: 50%;
    height:58px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected {
      color: white;
      height: 58px;
      background: rgb(181, 178, 190);
    }
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: rgb(32, 30, 30);
    }
  }
}
.tabs {
  background: #c4cece;
}
.nav-top {
  font-weight: bold;
}
.notes {
  padding: 5px;
}
</style>
