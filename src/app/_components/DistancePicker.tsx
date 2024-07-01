import React, { SetStateAction, createRef, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Prop = {
  lat: number;
  lng: number;
};

export default function DistancePicker() {
  const mapsDiv = createRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState<number>(300 * 100);
  const [center, setCenter] = useState<Prop>({ lat: 41.878, lng: -87.629 });
  useEffect(() => {
    loadMap();
  }, [radius]);

  useEffect(() => {
    loadMap();
  }, [center]);

  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
    });

    const { Map, Circle } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const map = new Map(mapsDiv.current as HTMLDivElement, {
      mapId: "map",
      center: center,
      zoom: 8,
      mapTypeControl: false,
      streetViewControl: false,
    });

    const circle = new Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: center,
      radius: radius,
      editable: true,
      //   radius: Math.sqrt(citymap[city].population) * 100,
    });
    // const pin = new AdvancedMarkerElement({
    //   map,
    //   position: center,
    // });

    google.maps.event.addListener(circle, "radius_changed", function () {
      //   console.log(circle.getBounds());
      //   console.log(circle.getCenter());
      //   console.log(circle.getCenter()?.lat(), circle.getCenter()?.lng());
      setRadius(circle.getRadius());
    });
    google.maps.event.addListener(circle, "center_changed", function () {
      //   console.log(circle.getRadius());
      //   console.log(circle.getCenter()?.lat(), circle.getCenter()?.lng());

      let lat = circle.getCenter()?.lat();
      let lng = circle.getCenter()?.lng();

      if (lat && lng) {
        setCenter({ lat, lng });
      } else {
        setCenter(center);
      }
    });

    map.addListener("click", (ev) => {
      pin.position = ev.latLng;
      const lat = ev.latLng.lat();
      const lng = ev.latLng.lng();
      //   onChange({ lat, lng });
    });
  }

  return (
    <>
      <div ref={mapsDiv} className="w-full h-[200px] "></div>
      <label className="text-center">Input desired radius in km:</label>
      <input
        name="radius"
        type="number"
        // value={radius / 100}
        onChange={(ev) => {
          setRadius(ev.target.valueAsNumber * 100);
        }}
        placeholder="Input radius value:"
      />
      <input name="lat" type="number" className="hidden" value={center.lat} />
      <input name="lng" type="number" className="hidden" value={center.lng} />
    </>
  );
}
