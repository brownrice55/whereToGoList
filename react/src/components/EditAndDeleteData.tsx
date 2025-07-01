import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { getData } from "../utils/common";
import FormForAddAndEdit from "./FormForAddAndEdit";

export default function EditAndDeleteData() {
  const data = getData();
  const [list, setList] = useState(new Map(data));

  const handleDelete = (key) => {
    const newMap = new Map(list);
    newMap.delete(key);
    setList(newMap);
    localStorage.setItem("whereToGoListData", JSON.stringify([...newMap]));
  };

  const [show, setShow] = useState(false);
  const [nextId, setNextId] = useState(0);

  const handleClose = () => setShow(false);
  const handleEdit = (key) => {
    setShow(true);
    setNextId(key);
  };

  const handleUpdate = (isClosed) => {
    if (isClosed) {
      handleClose();
    }
  };

  return (
    <>
      <ListGroup variant="flush" className="my-5">
        <ListGroup.Item className="py-2">
          {[...list].map(([key, val]) => (
            <Row key={key}>
              <Col>{val.place}</Col>
              <Col className="text-end mb-3">
                <Button
                  variant="secondary"
                  type="submit"
                  className="me-3"
                  onClick={() => handleEdit(key)}
                >
                  編集
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={() => handleDelete(key)}
                >
                  削除
                </Button>
              </Col>
            </Row>
          ))}
        </ListGroup.Item>
      </ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <FormForAddAndEdit
            keyNumber={nextId}
            isClosed={false}
            onUpdate={handleUpdate}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
