import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { DoesDataExistContext } from "../contexts/DataProvider";
import AddNewData from "../components/AddNewData";
import HomeComponent from "../components/HomeComponent";
import Form from "react-bootstrap/Form";
import { getData } from "../utils/common";

export default function Home({ tabIndex }) {
  const { doesDataExist } = useContext(DoesDataExistContext);
  const originalData = getData();
  const [data, setData] = useState(originalData);
  const [params, setParams] = useSearchParams({ keywords: "" });
  const [inputs, setInputs] = useState(params.get("keywords"));

  const handleSearch = (e, aKeywords) => {
    const inputValue = aKeywords ?? e?.target?.value ?? "";
    setInputs(inputValue);

    const newEntries = [...originalData].filter(
      ([, val]) =>
        val.place.includes(inputValue) ||
        val.address.includes(inputValue) ||
        val.station.includes(inputValue)
    );
    setData(newEntries);
  };

  useEffect(() => {
    const getParams = params.get("keywords");
    handleSearch(null, getParams);
  }, [params]);

  return (
    <>
      <Form.Group className="mt-5" controlId="form">
        <Form.Control
          type="text"
          placeholder="どこに行きたいですか？何をしたいですか？"
          value={inputs}
          onChange={(e) => handleSearch(e)}
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
