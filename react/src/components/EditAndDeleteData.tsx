import { useState, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { DoesDataExistContext } from "../contexts/context";
import { getData } from "../utils/common";
import type { Value } from "../types/value.interface";
import FormForAddAndEdit from "./FormForAddAndEdit";

export default function EditAndDeleteData() {
  const context = useContext(DoesDataExistContext);
  if (!context) {
    throw new Error("error");
  }
  const { setDoesDataExist } = context;

  const originalData = getData();
  const [data, setData] = useState<Map<number, Value>>(originalData);

  const navigate = useNavigate();

  const handleDelete = (key: number) => {
    const newMap = new Map(data);
    newMap.delete(key);
    setData(newMap);
    localStorage.setItem("whereToGoListData", JSON.stringify([...newMap]));
    if (!newMap.size && setDoesDataExist) {
      setDoesDataExist(0);
      navigate("/");
    }
  };

  const [show, setShow] = useState<boolean>(false);
  const [nextId, setNextId] = useState<number>(0);

  const handleClose = () => setShow(false);
  const handleEdit = (key: number) => {
    setShow(true);
    setNextId(key);
  };

  const handleUpdate = (isClosed: boolean) => {
    if (isClosed) {
      handleClose();
    }
  };

  return (
    <>
      <ListGroup variant="flush" className="my-5">
        <ListGroup.Item className="py-2">
          {[...data].map(([key, val]) => (
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
