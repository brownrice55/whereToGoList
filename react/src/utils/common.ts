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
  const dataFromLocalStorage: string | null =
    localStorage.getItem("whereToGoListData");
  if (dataFromLocalStorage !== "undefined") {
    let dataJson: any;
    if (typeof dataFromLocalStorage === "string") {
      dataJson = JSON.parse(dataFromLocalStorage);
    } else {
      dataJson = null;
    }
    data = new Map(dataJson);
  }
  return data;
}

export const priorityArray: string[] = [
  "凄く行ってみたい",
  "まぁまぁ行ってみたい",
  "ちょっと気になる",
];
