import { useState } from "react";
import Nav from "react-bootstrap/Nav";

import TabNav from "./TabNav";
import AddNewData from "./AddNewData";
import EditAndDeleteData from "./EditAndDeleteData";

export default function Settings({ init }) {
  const [tabIndex, setTabIndex] = useState(init);
  const activeKey = init ? "/edit" : "/add";

  const update = (index) => setTabIndex(index);

  return (
    <>
      <Nav variant="tabs" defaultActiveKey={activeKey} className="mt-4">
        <TabNav index={0} title="新規登録" activeKey="/add" onUpdate={update} />
        <TabNav
          index={1}
          title="編集・削除"
          activeKey="/edit"
          onUpdate={update}
        />
      </Nav>
      {!tabIndex ? <AddNewData /> : <EditAndDeleteData />}
    </>
  );
}
