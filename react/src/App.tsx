import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import NavLink from "./components/NavLink";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Category from "./components/Category";

function App() {
  const [page, setPage] = useState(<Home />);
  const [glovalNavIndex, setGlovalNavIndex] = useState(0);

  const update = (index) => {
    setGlovalNavIndex(index);
    const componentsArray = [
      <Home />,
      <Settings />,
      <Settings />,
      <Category />,
    ];
    setPage(componentsArray[index]);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Where to go list</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink index={0} title="ホーム" onUpdate={update} />
              <NavLink index={1} title="新規登録" onUpdate={update} />
              <NavLink index={2} title="編集・削除" onUpdate={update} />
              <NavLink index={3} title="カテゴリ設定" onUpdate={update} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5">{page}</Container>
    </>
  );
}

export default App;
