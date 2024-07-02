"use client";
import AdTextInputs from "@/app/_components/AdTextInputs";
import LocationPicker, { Location } from "@/app/_components/LocationPicker";
// import { authOptions } from "@/app/_libs/authOptions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SubmitButton from "@/app/_components/SubmitButton";
import UploadArea from "@/app/_components/UploadArea";
import { connect, connectAndFind } from "@/app/_libs/connectHelper";
import { Ad, AdModel } from "@/app/_models/Ad";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import {
  TShirtSizes,
  categories,
  jacketSizes,
  pantSizes,
  shoeSizes,
} from "@/app/_libs/helpers";
import { editAd } from "@/app/_actions/adActions";
import { redirect } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/react";

type Props = {
  params: {
    id: string;
  };
};

export default function EditAd(args: Props) {
  const [adDoc, setAdDoc] = useState<Ad>();
  const [files, setFiles] = useState<UploadResponse[]>([]);
  const [title, setTitle] = useState<string | undefined>(adDoc?.title);
  const [price, setPrice] = useState<number | undefined>(adDoc?.price);
  const [category, setCategory] = useState<string | undefined>(adDoc?.category);
  const [contact, setContact] = useState<string | number | undefined>(
    adDoc?.contact
  );
  const [description, setDescription] = useState<string | undefined>(
    adDoc?.description
  );
  const [location, setLocation] = useState<Location | undefined>(
    adDoc?.location
  );
  const [gpsCoords, setGpsCoords] = useState<Location | null>(null);
  const [fetch, setFetch] = useState<Boolean>(true);

  const [sizes, setSizes] = useState<string[]>([]);

  useEffect(() => {
    setFetch(true);
    const fetchData = async () => {
      const adDoc = await connectAndFind(args.params.id);
      setAdDoc(adDoc);
      setTitle(adDoc?.title);
      setPrice(adDoc?.price);
      setCategory(adDoc?.category);
      setDescription(adDoc?.description);
      setContact(adDoc?.contact);
      setLocation(adDoc?.location);
      setFiles(adDoc?.files);
      setSizes(adDoc?.sizes);
      setFetch(false);
    };
    fetchData();
  });

  function setSizeFunction(value: string) {
    sizes.push(value);
    console.log(sizes);
  }

  async function handleSubmit(formData: FormData) {
    formData.set("location", JSON.stringify(location));
    formData.set("files", JSON.stringify(files));
    console.log(sizes);
    console.log(sizes[sizes.length - 1]);
    formData.set("sizes", sizes[sizes.length - 1]);

    await editAd(formData, args.params.id);

    redirect("/ad/" + args.params.id);
  }

  function handleFindMyPositionClick() {
    navigator.geolocation.getCurrentPosition((ev) => {
      setLocation({ lat: ev.coords.latitude, lng: ev.coords.longitude });
      setGpsCoords({ lat: ev.coords.latitude, lng: ev.coords.longitude });
    }, console.error);
  }

  if (fetch && !adDoc) {
    return "Loading Post...";
  }

  if (!fetch && !adDoc) {
    return "No Post Found.";
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-xl mx-auto grid grid-cols-2 gap-8"
    >
      <div className="grow pt-8">
        <UploadArea files={files} setFiles={setFiles} />
        <div>
          <label className="text-center" htmlFor="">
            {" "}
            Where is it located?
          </label>
          <button
            type="button"
            onClick={handleFindMyPositionClick}
            className="flex w-full gap-2 items-center justify-center border border-blue-600 text-blue-600 py-2 mb-2 rounded"
          >
            <FontAwesomeIcon icon={faLocationCrosshairs} />

            <span>Share current location</span>
          </button>
          <div className="bg-gray-100 min-h-12 rounded overflow-hidden text-gray-400">
            <LocationPicker
              defaultLocation={location}
              gpsCoords={gpsCoords}
              onChange={setLocation}
            />
          </div>
        </div>
      </div>
      <div className="grow">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          placeholder="Title"
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.valueAsNumber)}
          type="number"
          placeholder="Price"
        />
        <label htmlFor="category">Category</label>
        <select id="category" name="category">
          <option selected value="0">
            {" "}
            Select Category
          </option>
          {categories.map(({ key: categoryKey, label: categoryLabel }) => (
            <option
              key={categoryKey}
              value={categoryKey}
              selected={categoryKey === category}
            >
              {categoryLabel}
            </option>
          ))}
        </select>

        {category === "T-Shirts" && (
          <div>
            <label>Available Sizes</label>

            <Select
              aria-label="Size"
              name="sizes"
              labelPlacement="outside-left"
              placeholder="Select T-Shirt Sizes"
              selectionMode="multiple"
              className="w-full border p-2 rounded-xl"
              value={sizes}
              onChange={(ev) => {
                setSizeFunction(ev.target.value);
              }}
            >
              {TShirtSizes.map((size) => (
                <SelectItem
                  className="bg-white text-lg border border-gray-300"
                  key={size.key}
                >
                  {size.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}
        {category === "Pants" && (
          <div>
            <label>Available Sizes</label>

            <Select
              aria-label="Size"
              placeholder="Select Pant Sizes"
              name="sizes"
              selectionMode="multiple"
              className="w-full border p-2 rounded-xl"
              value={sizes}
              onChange={(ev) => {
                setSizeFunction(ev.target.value);
              }}
            >
              {pantSizes.map((size) => (
                <SelectItem
                  className="bg-white text-lg border border-gray-300"
                  key={size.key}
                >
                  {size.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}

        {category === "Suits" && (
          <div>
            <label>Available Sizes</label>
            <div className="flex flex-col gap-3">
              <Select
                aria-label="Size"
                name="sizes"
                placeholder="Select Jacket Sizes"
                selectionMode="multiple"
                className="w-full border p-2 rounded-xl"
                value={sizes}
                onChange={(ev) => {
                  setSizeFunction(ev.target.value);
                }}
              >
                {jacketSizes.map((size) => (
                  <SelectItem
                    className="bg-white text-lg border border-gray-300"
                    key={size.key}
                  >
                    {size.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        )}

        {category === "Shoes" && (
          <div>
            <label>Available Sizes</label>
            <Select
              aria-label="Size"
              name="sizes"
              placeholder="Select Shoe Sizes"
              selectionMode="multiple"
              className="w-full border p-2 rounded-xl"
              value={sizes}
              onChange={(ev) => {
                setSizeFunction(ev.target.value);
              }}
            >
              {shoeSizes.map((size) => (
                <SelectItem
                  className="bg-white text-lg border border-gray-300"
                  key={size.key}
                >
                  {size.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Description "
        ></textarea>
        <label htmlFor="contact">Contact Info</label>
        <textarea
          name="contact"
          id="contact"
          value={contact}
          onChange={(ev) => setContact(ev.target.value)}
          placeholder="mobile: +1-(857)-654-0904 "
        ></textarea>
        <SubmitButton>Publish</SubmitButton>
      </div>
    </form>
  );
}
