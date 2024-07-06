import { Date, model, models, Schema } from "mongoose";
import { Ad } from "./Ad";

export type Order = {
  _id: string;
  userEmail: string;
  cartProducts: [Ad];
  selectedSizes: [string];
  paid: boolean;
  createdAt: number;
};

const OrderSchema = new Schema(
  {
    userEmail: String,
    cartProducts: Object,
    selectedSizes: [String],
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
