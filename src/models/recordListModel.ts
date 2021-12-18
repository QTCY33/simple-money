import clone from "@/lib/clone";
const localStorageKeyName = "recordList";
const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem) {
    const deepCloneRecord: RecordItem = clone(record);
    deepCloneRecord.createdAt = new Date();
    this.data.push(deepCloneRecord);
    this.save();
  },
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem("localStorageKeyName ") || "[]"
    ) as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default recordListModel;
