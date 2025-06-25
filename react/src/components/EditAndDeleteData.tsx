import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function EditAndDeleteData() {
  return (
    <>
      <ListGroup variant="flush" className="my-5">
        <ListGroup.Item className="py-2">
          <Row>
            <Col>場所の名前が入ります。</Col>
            <Col className="text-end">
              <Button variant="secondary" type="submit" className="me-3">
                編集
              </Button>
              <Button variant="secondary" type="submit">
                削除
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
