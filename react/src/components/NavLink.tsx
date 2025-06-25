import Nav from "react-bootstrap/Nav";

export default function NavLink({ index, title, onUpdate }) {
  const handleClick = () => onUpdate(index);
  return <Nav.Link onClick={handleClick}>{title}</Nav.Link>;
}
