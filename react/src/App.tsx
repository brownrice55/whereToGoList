import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { DoesDataExistContext } from "./contexts/context";

function App() {
  const context = useContext(DoesDataExistContext);
  if (!context) {
    throw new Error("Provider missing!");
  }
  const { doesDataExist } = context;

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Where to go list</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                className={!doesDataExist ? "d-none" : undefined}
              >
                ホーム
              </Nav.Link>
              <Nav.Link href="/add">新規追加</Nav.Link>
              <Nav.Link
                href="/edit"
                className={!doesDataExist ? "d-none" : undefined}
              >
                編集・削除
              </Nav.Link>
              <Nav.Link href="/category">カテゴリー設定</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="pt-3">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
