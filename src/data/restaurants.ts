import plov from "@/assets/dish-plov.jpg";
import burger from "@/assets/dish-burger.jpg";
import pizza from "@/assets/dish-pizza.jpg";
import sushi from "@/assets/dish-sushi.jpg";
import kebab from "@/assets/dish-kebab.jpg";
import shawarma from "@/assets/dish-shawarma.jpg";
import coffee from "@/assets/dish-coffee.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import chicken from "@/assets/dish-chicken.jpg";

export type Platform = "wolt" | "bolt" | "yango";

export const platformMeta: Record<Platform, { label: string; color: string; url: string }> = {
  wolt: { label: "Wolt", color: "var(--wolt)", url: "https://wolt.com" },
  bolt: { label: "Bolt Food", color: "var(--bolt)", url: "https://food.bolt.eu" },
  yango: { label: "Yango Deli", color: "var(--yango)", url: "https://yango.deli" },
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: Partial<Record<Platform, number>>;
};

export type CategoryKey =
  | "Burger"
  | "Pizza"
  | "Döner"
  | "Kabab"
  | "Qəhvə"
  | "Şirniyyat"
  | "Balıq"
  | "Toyuq";

export const categories: { key: CategoryKey; emoji: string; label: string }[] = [
  { key: "Burger", emoji: "🍔", label: "Burger" },
  { key: "Pizza", emoji: "🍕", label: "Pizza" },
  { key: "Döner", emoji: "🥙", label: "Döner" },
  { key: "Kabab", emoji: "🔥", label: "Kabab" },
  { key: "Qəhvə", emoji: "☕", label: "Qəhvə" },
  { key: "Şirniyyat", emoji: "🍰", label: "Şirniyyat" },
  { key: "Balıq", emoji: "🐟", label: "Balıq" },
  { key: "Toyuq", emoji: "🍗", label: "Toyuq" },
];

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  categories: CategoryKey[];
  rating: number;
  deliveryMin: number;
  image: string;
  tagline: string;
  // delivery fee per platform
  fees: Partial<Record<Platform, number>>;
  popularPrice: Partial<Record<Platform, number>>;
  menu: MenuItem[];
  // map coordinates (mocked, relative %)
  coords: { x: number; y: number };
};

export const restaurants: Restaurant[] = [
  {
    id: "firuze",
    name: "Firuzə Restoranı",
    cuisine: "Azərbaycan",
    rating: 4.8,
    deliveryMin: 25,
    tagline: "Klassik plov və kabab",
    categories: ["Kabab"] ,
    image: plov,
    fees: { wolt: 2.5, bolt: 1.9, yango: 2.2 },
    popularPrice: { wolt: 14.5, bolt: 12.9, yango: 13.8 },
    coords: { x: 28, y: 38 },
    menu: [
      {
        id: "plov",
        name: "Quzu Plov",
        description: "Saffran düyüsü, quzu əti, kuru meyvə",
        image: plov,
        prices: { wolt: 14.5, bolt: 12.9, yango: 13.8 },
      },
      {
        id: "lula",
        name: "Lülə Kabab",
        description: "Mangalda bişmiş quzu lüləsi, lavaş ilə",
        image: kebab,
        prices: { wolt: 11.0, bolt: 10.5, yango: 10.9 },
      },
    ],
  },
  {
    id: "burgerlab",
    name: "Burger Lab",
    cuisine: "Burger",
    rating: 4.6,
    deliveryMin: 20,
    tagline: "Smashed burgerlər və crinkle fries",
    categories: ["Burger"] ,
    image: burger,
    fees: { wolt: 1.9, bolt: 2.5, yango: 2.0 },
    popularPrice: { wolt: 9.9, bolt: 10.5, yango: 9.5 },
    coords: { x: 55, y: 25 },
    menu: [
      {
        id: "classic",
        name: "Classic Smash Burger",
        description: "100% mal əti, çedar, marinadlanmış soğan",
        image: burger,
        prices: { wolt: 9.9, bolt: 10.5, yango: 9.5 },
      },
      {
        id: "double",
        name: "Double Cheese",
        description: "İki köftə, ikiqat çedar, ev sousu",
        image: burger,
        prices: { wolt: 13.5, bolt: 13.9, yango: 12.9 },
      },
    ],
  },
  {
    id: "napoli",
    name: "Napoli Pizzeria",
    cuisine: "İtalyan",
    rating: 4.7,
    deliveryMin: 30,
    tagline: "Odun sobasında bişmiş pizza",
    categories: ["Pizza"] ,
    image: pizza,
    fees: { wolt: 2.9, bolt: 2.2, yango: 2.5 },
    popularPrice: { wolt: 15.0, bolt: 14.5, yango: 15.5 },
    coords: { x: 70, y: 55 },
    menu: [
      {
        id: "marg",
        name: "Margherita",
        description: "San Marzano pomidorları, mozzarella, reyhan",
        image: pizza,
        prices: { wolt: 15.0, bolt: 14.5, yango: 15.5 },
      },
      {
        id: "pep",
        name: "Pepperoni",
        description: "İtalyan pepperoni, mozzarella, oregano",
        image: pizza,
        prices: { wolt: 17.5, bolt: 16.9, yango: 17.0 },
      },
    ],
  },
  {
    id: "sakura",
    name: "Sakura Sushi",
    cuisine: "Yapon",
    rating: 4.5,
    deliveryMin: 35,
    tagline: "Təzə suşi və ramen",
    categories: ["Balıq"] ,
    image: sushi,
    fees: { wolt: 3.5, bolt: 3.0, yango: 3.2 },
    popularPrice: { wolt: 24.0, bolt: 22.5, yango: 23.0 },
    coords: { x: 40, y: 65 },
    menu: [
      {
        id: "phila",
        name: "Philadelphia Roll",
        description: "Norveç qızılbalığı, kürəm pendir, avakado",
        image: sushi,
        prices: { wolt: 24.0, bolt: 22.5, yango: 23.0 },
      },
      {
        id: "cali",
        name: "California Roll",
        description: "Krab, avakado, xiyar, susam",
        image: sushi,
        prices: { wolt: 18.5, bolt: 17.9, yango: 18.2 },
      },
    ],
  },
  {
    id: "shawking",
    name: "Şawarma King",
    cuisine: "Fast Food",
    rating: 4.4,
    deliveryMin: 18,
    tagline: "Toyuq və mal şavərması",
    categories: ["Döner", "Toyuq"] ,
    image: shawarma,
    fees: { wolt: 1.5, bolt: 1.9, yango: 1.7 },
    popularPrice: { wolt: 6.5, bolt: 6.9, yango: 6.0 },
    coords: { x: 18, y: 70 },
    menu: [
      {
        id: "chick",
        name: "Toyuq Şavərma",
        description: "Lavaşda toyuq, sarımsaq sousu, turşular",
        image: shawarma,
        prices: { wolt: 6.5, bolt: 6.9, yango: 6.0 },
      },
    ],
  },
  {
    id: "manqal",
    name: "Manqal House",
    cuisine: "Azərbaycan",
    rating: 4.9,
    deliveryMin: 40,
    tagline: "Premium kabab və tikə",
    categories: ["Kabab"] ,
    image: kebab,
    fees: { wolt: 2.9, bolt: 2.5, yango: 2.7 },
    popularPrice: { wolt: 19.0, bolt: 18.5, yango: 19.5 },
    coords: { x: 82, y: 35 },
    menu: [
      {
        id: "tikə",
        name: "Quzu Tikə",
        description: "Marinadlanmış quzu əti, mangal kömürü",
        image: kebab,
        prices: { wolt: 19.0, bolt: 18.5, yango: 19.5 },
      },
    ],
  },
];

export const cuisines = ["Hamısı", "Azərbaycan", "Burger", "İtalyan", "Yapon", "Fast Food"];

export function cheapestPlatform(prices: Partial<Record<Platform, number>>): Platform | null {
  const entries = Object.entries(prices) as [Platform, number][];
  if (!entries.length) return null;
  return entries.reduce((a, b) => (b[1] < a[1] ? b : a))[0];
}

export function getRestaurant(id: string) {
  return restaurants.find((r) => r.id === id);
}
