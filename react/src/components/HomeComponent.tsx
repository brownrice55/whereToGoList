import Nav from "react-bootstrap/Nav";
import List from "../components/List";
import Map from "../components/Map";
import { priorityArray } from "../utils/common";

export default function HomeComponent({ tabIndex, data, inputs }) {
  const activeKey: string = tabIndex ? "/map" : "/";

  const getQueryString = (aInputs) => {
    const keywordsArray = aInputs.split(/[ 　]+/);
    return Array.isArray(keywordsArray)
      ? keywordsArray.join("&")
      : keywordsArray;
  };

  return (
    <>
      <Nav variant="tabs" defaultActiveKey={activeKey} className="mt-4">
        <Nav.Item>
          <Nav.Link href={`/?keywords=${getQueryString(inputs)}`} eventKey="/">
            リスト
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={`/map?keywords=${getQueryString(inputs)}`}
            eventKey="/map"
          >
            地図
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {!tabIndex ? (
        <div>
          {[...data].map(([key, val]) => (
            <List
              key={key}
              place={val.place}
              station={val.station}
              category={val.category}
              priority={priorityArray[parseInt(val.priority) - 1]}
              address={val.address}
              notes={val.notes}
            />
          ))}
        </div>
      ) : (
        <Map data={data} />
      )}
    </>
  );
}
