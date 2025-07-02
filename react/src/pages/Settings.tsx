import Nav from "react-bootstrap/Nav";

import AddNewData from "../components/AddNewData";
import EditAndDeleteData from "../components/EditAndDeleteData";

import { useContext } from "react";
import { DoesDataExistContext } from "../contexts/DataProvider";

export default function Settings({ tabIndex }) {
  const activeKey = tabIndex ? "/edit" : "/add";
  const { doesDataExist } = useContext(DoesDataExistContext);

  return (
    <>
      <Nav
        variant="tabs"
        defaultActiveKey={activeKey}
        className={doesDataExist ? "mt-4" : "d-none"}
      >
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
