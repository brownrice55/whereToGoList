import ListGroup from "react-bootstrap/ListGroup";

export default function List() {
  return (
    <>
      <ListGroup variant="flush" className="my-5">
        <ListGroup.Item className="py-2">
          <p>場所の名前が入ります。</p>
          <div>
            <span>最寄駅</span>
            <span>カテゴリ</span>
            <span>優先順位</span>
          </div>
          <p>住所が入ります。住所が入ります。住所が入ります。</p>
          <p>メモが入ります。メモが入ります。メモが入ります。</p>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
