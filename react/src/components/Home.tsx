import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import List from "./List";
import Map from "./Map";

import { getData, priorityArray } from "./CommonFunctions";

export default function Home({ tabIndex }) {
  const originalData = getData();
  const [data, setData] = useState(originalData);

  const activeKey = tabIndex ? "/map" : "/";

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
          placeholder="どこに行きたい？何したい？"
          onChange={(e) => handleSearch(e)}
        />
      </Form.Group>
      <Nav variant="tabs" defaultActiveKey={activeKey} className="mt-4">
        <Nav.Item>
          <Nav.Link href="/">リスト</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/map">地図</Nav.Link>
        </Nav.Item>
      </Nav>
      {!tabIndex ? (
        <div>
          {[...data].map(([key, val]) => (
            <List
              key={key}
              place={val.place}
              station={val.station}
              category={val.category}
              priority={priorityArray[parseInt(val.priority) - 1]}
              address={val.address}
              notes={val.notes}
            />
          ))}
        </div>
      ) : (
        <Map />
      )}
    </>
  );
}
