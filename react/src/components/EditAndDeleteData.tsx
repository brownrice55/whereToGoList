import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getData } from "./CommonFunctions";

export default function EditAndDeleteData() {
  const data = getData();
  const [list, setList] = useState(new Map(data));

  const onClickDelete = (key) => {
    const newMap = new Map(list);
    newMap.delete(key);
    setList(newMap);
    localStorage.setItem("whereToGoListData", JSON.stringify([...newMap]));
  };

  return (
    <>
      <ListGroup variant="flush" className="my-5">
        <ListGroup.Item className="py-2">
          {[...list].map(([key, val]) => (
            <Row key={key}>
              <Col>{val.place}</Col>
              <Col className="text-end mb-3">
                <Button variant="secondary" type="submit" className="me-3">
                  編集
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={() => onClickDelete(key)}
                >
                  削除
                </Button>
              </Col>
            </Row>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
