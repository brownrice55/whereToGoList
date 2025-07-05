import { useState, useContext, useEffect } from "react";

import { DoesDataExistContext } from "../contexts/context";
import AddNewData from "../components/AddNewData";
import HomeComponent from "../components/HomeComponent";
import Form from "react-bootstrap/Form";
import { getData } from "../utils/common";
import type { Value } from "../types/value.interface";

export default function Home({ tabIndex }) {
  const { doesDataExist } = useContext<number>(DoesDataExistContext);
  const originalData = getData();
  const [data, setData] = useState<number, Value>(originalData);

  const search = window.location.search;
  const displayString = search.substring(10).replace(/&/g, "　");
  const decoded: string = decodeURIComponent(displayString);

  const [inputs, setInputs] = useState<string>(decoded);

  const handleSearch = (e, aKeywords) => {
    const inputValue = aKeywords ?? e?.target?.value ?? "";
    setInputs(inputValue);

    const inputValueArray = inputValue.split(/[ 　]+/);
    const getIsIncluded = (aVal) => {
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
      <Form.Group className="mt-5" controlId="form">
        <Form.Control
          type="text"
          placeholder="どこに行きたいですか？何をしたいですか？"
          value={inputs}
          onChange={(e) => handleSearch(e, null)}
        />
      </Form.Group>
      {doesDataExist ? (
        <HomeComponent tabIndex={tabIndex} data={data} inputs={inputs} />
      ) : (
        <AddNewData />
      )}
    </>
  );
}
