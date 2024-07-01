import {
  faCar,
  faHome,
  faMobile,
  faRing,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons";

// import mongoose from "mongoose";

// export async function connect() {
//   mongoose.connect(process.env.REACT_APP_MONGO_URL as string);
// }

export function formatMoney(amount: number): string {
  return "$" + Intl.NumberFormat("US", { currency: "USD" }).format(amount);
}

export const categories = [
  { key: "Accessories", label: "Accessories", icon: "smart-watch.png" },
  { key: "T-Shirts", label: "T-Shirts", icon: "shirt.png" },
  { key: "Pants", label: "Pants", icon: "trousers.png" },
  { key: "Suits", label: "Suits", icon: "suit-and-tie-outfit.png" },
  { key: "Shoes", label: "Shoes", icon: "sport-shoe.png" },
];

export const TShirtSizes = [
  { key: "x-small", label: "x-small" },
  { key: "small", label: "small" },
  { key: "medium", label: "medium" },
  { key: "large", label: "large" },
  { key: "x-large", label: "x-large" },
  { key: "xx-large", label: "xx-large" },
];

export const pantSizes = [
  { key: "28", label: "28" },
  { key: "29", label: "29" },
  { key: "30", label: "30" },
  { key: "31", label: "31" },
  { key: "32", label: "32" },
  { key: "33", label: "33" },
  { key: "34", label: "34" },
  { key: "35", label: "35" },
  { key: "36", label: "36" },
  { key: "37", label: "37" },
  { key: "38", label: "38" },
  { key: "39", label: "39" },
];

export const jacketSizes = [
  { key: "36", label: "36" },
  { key: "38", label: "38" },
  { key: "40", label: "40" },
  { key: "42", label: "42" },
  { key: "44", label: "44" },
  { key: "46", label: "46" },
  { key: "48", label: "48" },
  { key: "50", label: "50" },
  { key: "52", label: "52" },
  { key: "54", label: "54" },
];

export const shirtSizes = [
  { key: "x-small", label: "x-small" },
  { key: "small", label: "small" },
  { key: "medium", label: "medium" },
  { key: "large", label: "large" },
  { key: "x-large", label: "x-large" },
  { key: "xx-large", label: "xx-large" },
];

export const shoeSizes = [
  { key: "6", label: "6" },
  { key: "7", label: "7" },
  { key: "8", label: "8" },
  { key: "9", label: "9" },
  { key: "10", label: "10" },
  { key: "11", label: "11" },
  { key: "12", label: "12" },
  { key: "13", label: "13" },
];
