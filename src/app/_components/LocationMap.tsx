"use client";
import React, { createRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Location } from "./LocationPicker";

type Prop = {
  lat: number;
  lng: number;
};

export default function LocationMap({ lat, lng }: Prop) {
  const mapsDiv = createRef<HTMLDivElement>();
  const location = { lat: lat, lng: lng };

  useEffect(() => {
    loadMap();
  });
  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
    });

    const { Map, Circle } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const map = new Map(mapsDiv.current as HTMLDivElement, {
      mapId: "map",
      center: location,
      zoom: 8,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
    });

    const pin = new AdvancedMarkerElement({
      map,
      position: location,
    });
  }

  return <div ref={mapsDiv} className="w-full h-full "></div>;
}
