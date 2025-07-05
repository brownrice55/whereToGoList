export function getCategories() {
  const raw = localStorage.getItem("whereToGoListCategory");
  const data: string[] = raw
    ? JSON.parse(raw)
    : ["観光スポット", "飲食店", "雑貨店"];
  return data;
}

import type { Value } from "../types/value.interface";

export function getData() {
  let data = new Map<number, Value>();
  const dataFromLocalStorage = localStorage.getItem("whereToGoListData");
  if (dataFromLocalStorage !== "undefined") {
    const dataJson: unknown = JSON.parse(dataFromLocalStorage);
    data = new Map(dataJson);
  }
  return data;
}

export const priorityArray = [
  "凄く行ってみたい",
  "まぁまぁ行ってみたい",
  "ちょっと気になる",
];
