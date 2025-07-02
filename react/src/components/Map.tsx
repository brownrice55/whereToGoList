import { useEffect, useState } from "react";
import { key } from "../config/api-config";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../css/map.css";
import "leaflet/dist/leaflet.css";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const fetchApi = async (apiURL) => {
  await sleep(1000);
  const res = await fetch(apiURL);
  if (res.ok) {
    return res.json();
    throw new Error(res.statusText);
  }
};

export default function Map({ data }) {
  const getApiURL = (aAddress) => {
    return `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      aAddress
    )}&key=${key}&language=ja`;
  };

  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  let lat = 0;
  let lng = 0;

  useEffect(() => {
    setIsLoading(true);
    fetchApi(getApiURL([...data][0][1].address))
      .then((result) => setApiData(result))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) {
    return <p>読み込み中...</p>;
  }
  if (error) {
    return <p>Error: 取得できませんでした。</p>;
  }
  if (apiData.results.length) {
    lat = apiData.results[0].geometry.lat;
    lng = apiData.results[0].geometry.lng;
  }

  return (
    <>
      <MapContainer
        className="map my-5"
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>店名などが入ります。</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
