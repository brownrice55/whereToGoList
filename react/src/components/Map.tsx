import { useEffect, useState } from "react";
import { key } from "../config/api-config";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../css/map.css";
import "leaflet/dist/leaflet.css";
import type { Value } from "../types/value.interface";

type MapType = {
  results: Array<{
    geometry: {
      lat: number;
      lng: number;
    };
  }>;
};

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
const fetchApi = async (aApiURL: string) => {
  await sleep(1000);
  const res = await fetch(aApiURL);
  if (res.ok) {
    const response = (await res.json()) as MapType;
    return response;
  } else {
    throw new Error(res.statusText);
  }
};

type LocationType = {
  place: string;
  station: string;
  lat: number;
  lng: number;
}[];

type MapProps = {
  data: Map<number, Value>;
};

export default function Map({ data }: MapProps) {
  const [locations, setLocations] = useState<LocationType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getApiURL = (aAddress: string) => {
    return `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      aAddress
    )}&key=${key}&language=ja`;
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all(
      [...data].map(async (array) => {
        try {
          const result = await fetchApi(getApiURL(array[1].address));
          if (result.results.length) {
            return {
              place: array[1].place,
              station: array[1].station,
              lat: result.results[0].geometry.lat,
              lng: result.results[0].geometry.lng,
            };
          }
          return null;
        } catch (err: any) {
          setError(err.message);
        }
      })
    )
      .then((val) => {
        const filtered = val.filter(
          (
            item
          ): item is {
            place: string;
            station: string;
            lat: number;
            lng: number;
          } => !!item
        );
        setLocations(filtered);
      })
      .finally(() => setIsLoading(false));
  }, [data]);

  if (!data) {
    return null;
  }
  if (isLoading) {
    return <p className="py-4">読み込み中...</p>;
  }
  if (error) {
    return <p className="py-4">データを取得できませんでした。</p>;
  }

  const locationLength: number = locations.length;
  if (!locationLength) {
    return <p className="py-4">該当するデータがありません。</p>;
  }

  let latTotal = 0;
  let lngTotal = 0;
  locations.forEach((location) => {
    latTotal += location.lat;
    lngTotal += location.lng;
  });
  const center: [number, number] = [
    latTotal / locationLength,
    lngTotal / locationLength,
  ];

  return (
    <>
      <MapContainer
        className="map my-4"
        center={center}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map(
          (location, index) =>
            typeof location.lat === "number" &&
            !isNaN(location.lat) &&
            typeof location.lng === "number" &&
            !isNaN(location.lng) && (
              <Marker key={index} position={[location.lat, location.lng]}>
                <Popup>
                  <a
                    href={`https://www.google.com/search?q=${location.place} ${location.station}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {location.place}
                  </a>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </>
  );
}
