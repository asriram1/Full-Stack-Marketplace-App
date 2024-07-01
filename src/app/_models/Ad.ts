import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { models, model, Schema, Model } from "mongoose";

export type Ad = {
  _id: string;
  title: string;
  price: number;
  category: string;
  sizes: string[];
  description: string;
  contact: number;
  userEmail: string;
  files: UploadResponse[];
  location: { lat: number; lng: number };
};

const adSchema = new Schema<Ad>(
  {
    title: String,
    price: Number,
    category: String,
    sizes: [String],
    description: String,
    contact: String,
    files: [Object],
    location: Object,
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export const AdModel = (models?.Ad as Model<Ad>) || model<Ad>("Ad", adSchema);
