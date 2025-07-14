import { useState, useContext, useEffect } from "react";

import { DoesDataExistContext } from "../contexts/context";
import AddNewData from "../components/AddNewData";
import HomeComponent from "../components/HomeComponent";
import Form from "react-bootstrap/Form";
import { getData } from "../utils/common";
import type { Value } from "../types/value.interface";
import type { TabIndexProps } from "../types/tabindexprops.type";

export default function Home({ tabIndex }: TabIndexProps) {
  const context = useContext(DoesDataExistContext);
  if (!context) {
    throw new Error("error");
  }
  const { doesDataExist } = context;

  const originalData = getData();
  const [data, setData] = useState<Map<number, Value>>(originalData);

  const search = window.location.search;
  const displayString = search.substring(10).replace(/&/g, "　");
  const decoded: string = decodeURIComponent(displayString);

  const [inputs, setInputs] = useState<string>(decoded);

  type ValType = {
    place: string;
    address: string;
    station: string;
  };
  const handleSearch = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > | null,
    aKeywords: string
  ) => {
    const inputValue =
      aKeywords !== "null" ? aKeywords : e?.target?.value ?? "";
    setInputs(inputValue);

    const inputValueArray = inputValue.split(/[ 　]+/);
    const getIsIncluded = (aVal: ValType) => {
      let cnt = 0;
      inputValueArray.forEach((val) => {
        if (
          aVal.place.includes(val) ||
          aVal.address.includes(val) ||
          aVal.station.includes(val)
        ) {
          ++cnt;
        }
      });
      return cnt === inputValueArray.length;
    };

    const newEntries = new Map(
      [...originalData].filter(([, val]) => getIsIncluded(val))
    );
    setData(newEntries);
  };

  useEffect(() => {
    handleSearch(null, decoded);
  }, [search]);

  return (
    <>
      {doesDataExist ? (
        <>
          <Form.Group className="mt-5" controlId="form">
            <Form.Control
              type="text"
              placeholder="どこに行きたいですか？何をしたいですか？"
              value={inputs}
              onChange={(e) => handleSearch(e, "null")}
            />
          </Form.Group>
          <HomeComponent tabIndex={tabIndex} data={data} inputs={inputs} />
        </>
      ) : (
        <AddNewData />
      )}
    </>
  );
}
