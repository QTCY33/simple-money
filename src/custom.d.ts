type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; //'success'表示成功 'duplicated'表示重复
  save: () => void;
  update: (id: string, name: string) => "success" | "not-found" | "duplicated";
  remove: (id: string) => boolean;
};
interface Window {
  tagList: Tag[];
}
