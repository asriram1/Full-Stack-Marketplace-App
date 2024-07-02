import React, {
  Dispatch,
  SetStateAction,
  createRef,
  useEffect,
  useState,
} from "react";
import { Loader } from "@googlemaps/js-api-loader";

export type Location = {
  lat: number;
  lng: number;
};

type LocationChangeHandler = (pos: Location) => void;

export default function LocationPicker({
  defaultLocation,
  onChange,
  gpsCoords,
}: {
  defaultLocation: Location | undefined;
  onChange: (location: Location) => void;
  gpsCoords: Location | null;
}) {
  const divRef = createRef<HTMLDivElement>();
  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
    });

    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const map = new Map(divRef.current as HTMLDivElement, {
      mapId: "map",
      center: defaultLocation,
      zoom: 8,
      mapTypeControl: false,
      streetViewControl: false,
    });

    const pin = new AdvancedMarkerElement({
      map,
      position: defaultLocation,
    });

    map.addListener("click", (ev) => {
      pin.position = ev.latLng;
      const lat = ev.latLng.lat();
      const lng = ev.latLng.lng();
      console.log(lat, lng);
      onChange({ lat, lng });
    });
  }

  useEffect(() => {
    loadMap();
  }, [gpsCoords]);

  return (
    <>
      <div ref={divRef} className="w-full h-[200px]"></div>
    </>
  );
}
