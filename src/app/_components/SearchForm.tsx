import React, { useRef } from "react";
import SubmitButton from "./SubmitButton";
import LabelRadioButton from "./LabelRadioButton";
import { categories } from "@/app/_libs/helpers";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import DistancePicker from "./DistancePicker";

type Props = {
  handleSearch: (formData: FormData) => void;
};

export default function SearchForm({ handleSearch }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form
      ref={formRef}
      action={handleSearch}
      className="bg-white grow w-1/4 p-4 border-r flex flex-col gap-4"
    >
      <input name="phrase" type="text" placeholder="Search..."></input>
      <div>
        <LabelRadioButton
          name={"category"}
          value={""}
          label={"View All"}
          icon={"shopping-bag.png"}
          defaultChecked={true}
          onClick={() => formRef.current?.requestSubmit()}
        />
        {categories.map(({ key: categoryKey, label, icon }) => (
          <LabelRadioButton
            name={"category"}
            value={categoryKey}
            label={label}
            icon={icon}
            onClick={() => formRef.current?.requestSubmit()}
          />
        ))}
      </div>
      <div>
        <label className="text-center">Price</label>
        <div className="flex gap-4">
          <div>
            <input name="min" type="number" placeholder="min" />
          </div>
          <div>
            <input name="max" type="number" placeholder="max" />
          </div>
        </div>
        <div className="size-full">
          <label className="text-center">Distance Picker</label>
          <DistancePicker />
        </div>
      </div>
      <SubmitButton>Search</SubmitButton>
    </form>
  );
}
