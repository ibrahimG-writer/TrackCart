
import jacket01 from "../assets/images/jacket-01.jfif";
import jacket02 from "../assets/images/jacket-02.jfif";
import jacket03 from "../assets/images/jacket-03.jfif";
import jacket04 from "../assets/images/jacket-04.jfif";
import jacket05 from "../assets/images/jacket-05.jfif";
import jacket06 from "../assets/images/jacket-06.jfif";
import jacket07 from "../assets/images/jacket-07.jfif";
import jacket08 from "../assets/images/jacket-08.jfif";
import jacket09 from "../assets/images/jacket-09.jfif";
import jacket10 from "../assets/images/jacket-10.jfif";
import jacket11 from "../assets/images/jacket-11.jfif";

const mockProducts = [
  {
    id: "trz-001",
    name: "Classic Leather Jacket",
    category: "Leather",
    price: 895,
    image: jacket01,
    images: [jacket01, jacket02, jacket03],
    colors: ["#171717", "#5B4030"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    stock: 12,
    description: "A timeless leather silhouette for everyday wear.",
  },
  {
    id: "trz-002",
    name: "Classic Leather Jacket — Vintage Cut",
    category: "Leather",
    price: 895,
    image: jacket04,
    images: [jacket04, jacket05, jacket06],
    colors: ["#171717", "#5B4030"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    stock: 12,
    description: "A timeless leather silhouette with a vintage-inspired cut.",
  },
  {
    id: "trz-003",
    name: "Technical Bomber",
    category: "Outerwear",
    price: 485,
    image: jacket07,
    images: [jacket07, jacket08, jacket09],
    colors: ["#6D7050", "#292929"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    stock: 8,
    description: "A functional bomber designed for modern urban life.",
  },
  {
    id: "trz-004",
    name: "Vintage Denim Jacket",
    category: "Denim",
    price: 295,
    image: jacket10,
    images: [jacket10, jacket11, jacket01],
    colors: ["#343D4A"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    stock: 5,
    description: "A vintage-inspired staple with a relaxed silhouette.",
  },
  {
    id: "trz-005",
    name: "Wool Overcoat",
    category: "Outerwear",
    price: 725,
    image: jacket02,
    images: [jacket02, jacket03, jacket04],
    colors: ["#A07850", "#252525"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    stock: 4,
    description: "A refined outer layer for a considered wardrobe.",
  },
];

export default mockProducts;
