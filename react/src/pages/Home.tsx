import { useState, useContext } from "react";

import { DoesDataExistContext } from "../contexts/DataProvider";
import AddNewData from "../components/AddNewData";
import HomeComponent from "../components/HomeComponent";
import Form from "react-bootstrap/Form";
import { getData } from "../utils/common";

export default function Home({ tabIndex }) {
  const { doesDataExist } = useContext(DoesDataExistContext);
  const originalData = getData();
  const [data, setData] = useState(originalData);

  const handleSearch = (e) => {
    const inputValue = e.target.value;

    const newEntries = [...originalData].filter(
      ([, val]) =>
        val.place.includes(inputValue) ||
        val.address.includes(inputValue) ||
        val.station.includes(inputValue)
    );
    setData(newEntries);
  };

  return (
    <>
      <Form.Group className="mt-5" controlId="form">
        <Form.Control
          type="text"
          placeholder="どこに行きたいですか？何をしたいですか？"
          onChange={(e) => handleSearch(e)}
        />
      </Form.Group>
      {doesDataExist ? (
        <HomeComponent tabIndex={tabIndex} data={data} />
      ) : (
        <AddNewData />
      )}
    </>
  );
}
