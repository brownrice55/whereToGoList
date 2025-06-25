import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Category() {
  return (
    <>
      <p>カテゴリ名を設定してください</p>
      <Form>
        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Control type="text" />
        </Form.Group>

        <div className="text-end mt-3">
          <Button className="px-5 mx-3" variant="primary">
            追加する
          </Button>
        </div>

        <div className="text-center mt-5">
          <Button className="px-5 py-3 mx-3" variant="secondary">
            キャンセル
          </Button>
          <Button className="px-5 py-3 mx-3" variant="primary">
            設定する
          </Button>
        </div>
      </Form>
    </>
  );
}
