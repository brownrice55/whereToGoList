import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TabNav from "./TabNav";
import List from "./List";
import Map from "./Map";

import { getData, priorityArray } from "./CommonFunctions";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  const data = getData();

  const update = (index) => setTabIndex(index);

  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId="form">
        <Col sm="10">
          <Form.Control type="text" />
        </Col>
        <Col sm="2" className="text-end">
          <Button variant="primary">検索</Button>
        </Col>
      </Form.Group>
      <Nav variant="tabs" defaultActiveKey="/list" className="mt-4">
        <TabNav index={0} title="リスト" activeKey="/list" onUpdate={update} />
        <TabNav index={1} title="地図" activeKey="/map" onUpdate={update} />
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
