import Nav from "react-bootstrap/Nav";

import AddNewData from "../components/AddNewData";
import EditAndDeleteData from "../components/EditAndDeleteData";

import { useContext } from "react";
import { DoesDataExistContext } from "../contexts/context";
import type { TabIndexProps } from "../types/tabindexprops.type";

export default function Settings({ tabIndex }: TabIndexProps) {
  const activeKey: string = tabIndex ? "/edit" : "/add";
  const context = useContext(DoesDataExistContext);
  if (!context) {
    throw new Error("error");
  }
  const { doesDataExist } = context;

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
