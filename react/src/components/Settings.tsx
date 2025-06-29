import Nav from "react-bootstrap/Nav";

import AddNewData from "./AddNewData";
import EditAndDeleteData from "./EditAndDeleteData";

export default function Settings({ tabIndex }) {
  const activeKey = tabIndex ? "/edit" : "/add";

  return (
    <>
      <Nav variant="tabs" defaultActiveKey={activeKey} className="mt-4">
        <Nav.Item>
          <Nav.Link href="/add">新規登録</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/edit">編集・削除</Nav.Link>
        </Nav.Item>
      </Nav>
      {!tabIndex ? <AddNewData /> : <EditAndDeleteData />}
    </>
  );
}
