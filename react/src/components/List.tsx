import ListGroup from "react-bootstrap/ListGroup";

export default function List({
  place,
  station,
  category,
  priority,
  address,
  notes,
}) {
  return (
    <>
      <ListGroup variant="flush" className="my-3">
        <ListGroup.Item className="border-bottom">
          <p>
            <a
              href={`https://www.google.com/search?q=${place}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {place}
            </a>
          </p>
          <div>
            <span className="py-2 px-3 me-3 badge text-bg-secondary">
              {station}
            </span>
            <span className="py-2 px-3 me-3 badge text-bg-secondary">
              {category}
            </span>
            <span className="py-2 px-3 badge text-bg-secondary">
              {priority}
            </span>
          </div>
          <p className="pt-3">{address}</p>
          <p>{notes}</p>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
