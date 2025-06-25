import Nav from "react-bootstrap/Nav";

export default function TabNav({ title, index, activeKey, onUpdate }) {
  const handleClick = () => onUpdate(index);

  return (
    <Nav.Item onClick={handleClick}>
      <Nav.Link eventKey={activeKey}>{title}</Nav.Link>
    </Nav.Item>
  );
}
