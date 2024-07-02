"use client";
import React, { useState } from "react";

import {
  TShirtSizes,
  categories,
  pantSizes,
  shirtSizes,
  jacketSizes,
  shoeSizes,
} from "@/app/_libs/helpers";

import { Select, SelectItem } from "@nextui-org/react";

type Props = {
  setSizes: (arg: string[]) => void;
};

export default function AdTextInputs({ setSizes }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [localSizes, setLocalSizes] = useState<string[]>([]);

  function setSizeFunction(value: string) {
    setLocalSizes([]);
    localSizes.push(value);
    console.log(localSizes);
    setSizes(localSizes);
  }

  return (
    <>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" type="text" placeholder="Title" />
      <label htmlFor="price">Price</label>
      <input
        id="price"
        name="price"
        type="number"
        min="0"
        step="0.01"
        placeholder="Price"
      />
      <label htmlFor="category">Category</label>
      <select
        id="category"
        defaultValue="0"
        name="category"
        value={selectedCategory}
        onChange={(ev) => {
          setSelectedCategory(ev.target.value);
        }}
      >
        <option selected value="0">
          {" "}
          Select Category
        </option>

        {categories.map(({ key: categoryKey, label: categoryLabel }) => (
          <option key={categoryKey} value={categoryKey}>
            {categoryLabel}
          </option>
        ))}
      </select>

      {selectedCategory === "T-Shirts" && (
        <div>
          <label>Available Sizes</label>

          <Select
            aria-label="Size"
            name="sizes"
            labelPlacement="outside-left"
            placeholder="Select T-Shirt Sizes"
            selectionMode="multiple"
            className="w-full border p-2 rounded-xl"
            value={localSizes}
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
      {selectedCategory === "Pants" && (
        <div>
          <label>Available Sizes</label>

          <Select
            aria-label="Size"
            placeholder="Select Pant Sizes"
            name="sizes"
            selectionMode="multiple"
            className="w-full border p-2 rounded-xl"
            value={localSizes}
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

      {selectedCategory === "Suits" && (
        <div>
          <label>Available Sizes</label>
          <div className="flex flex-col gap-3">
            <Select
              aria-label="Size"
              name="sizes"
              placeholder="Select Jacket Sizes"
              selectionMode="multiple"
              className="w-full border p-2 rounded-xl"
              value={localSizes}
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

      {selectedCategory === "Shoes" && (
        <div>
          <label>Available Sizes</label>
          <Select
            aria-label="Size"
            name="sizes"
            placeholder="Select Shoe Sizes"
            selectionMode="multiple"
            className="w-full border p-2 rounded-xl"
            value={localSizes}
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
        placeholder="Description "
      ></textarea>
      <label htmlFor="contact">Contact Info</label>
      <textarea
        name="contact"
        id="contact"
        placeholder="mobile: +1-(857)-654-0904 "
      ></textarea>
    </>
  );
}
