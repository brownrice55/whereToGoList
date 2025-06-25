import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddNewData() {
  return (
    <>
      <Form>
        <Form.Group className="mt-5" controlId="exampleForm.ControlTextarea1">
          <Form.Label>場所の名前</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>カテゴリ名</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="1">観光スポット</option>
            <option value="2">飲食店</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>住所</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>最寄駅</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>優先順位（どのくらい行ってみたいですか？）</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="1">凄く行ってみたい</option>
            <option value="2">まぁまぁ行ってみたい</option>
            <option value="3">ちょっと気になる</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>メモ</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <div className="text-center mt-5">
          <Button className="px-5 py-3 mx-3" variant="secondary">
            キャンセル
          </Button>
          <Button className="px-5 py-3 mx-3" variant="primary">
            登録する
          </Button>
        </div>
      </Form>
    </>
  );
}
