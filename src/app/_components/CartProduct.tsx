import React from "react";
import { Ad } from "../_models/Ad";
import Trash from "./icons/Trash";

type Props = {
  index?: number | undefined;
  product: Ad;
  onRemove?: (index: number | undefined) => void;
};

export default function CartProduct({ index, product, onRemove }: Props) {
  return (
    <>
      <div className="flex gap-4 mb-2 border-b py-4 items-center ">
        <div className="w-24">
          {product.images.length > 0 && (
            <img src={product.images[0]} width={240} height={240} alt={""} />
          )}
        </div>
        <div className="grow">
          <h3 className="font-semibold">{product.title}</h3>
          <p>{product.category}</p>
        </div>
        <div className="font-semibold text-lg">${product.price}</div>
        {!!onRemove && (
          <div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-2"
            >
              <Trash />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
