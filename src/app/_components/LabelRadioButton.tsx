import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: string;
  value: string;
  icon: IconDefinition;
  onClick: () => void;
  label: string;
  defaultChecked?: boolean;
};

export default function LabelRadioButton({
  name,
  value,
  icon,
  onClick,
  label,
  defaultChecked = false,
}: Props) {
  return (
    <label className="radio-btn group">
      <input
        onClick={() => onClick()}
        className="hidden "
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
      />
      <span className="icon group-has-[:checked]:bg-blue-300 group-has-[:checked]:text-white flex items-center justify-center ">
        <img src={icon} alt={"icon"} className="size-6" />
        {/* <FontAwesomeIcon icon={icon} /> */}
      </span>

      {label}
    </label>
  );
}
