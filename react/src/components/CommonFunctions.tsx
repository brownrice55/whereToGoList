export function getCategories() {
  const data = JSON.parse(localStorage.getItem("whereToGoListCategory"));
  return data.length ? data : ["観光スポット", "飲食店", "雑貨店"];
}

export function getData() {
  let data = new Map();
  const dataFromLocalStorage = localStorage.getItem("whereToGoListData");
  if (dataFromLocalStorage !== "undefined") {
    const dataJson = JSON.parse(dataFromLocalStorage);
    data = new Map(dataJson);
  }
  return data;
}
