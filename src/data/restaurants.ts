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
  | "Qəhvə"
  | "Döner"
  | "Kabab"
  | "Pide"
  | "Şirniyyat"
  | "Çörək"
  | "Balıq"
  | "Toyuq"
  | "Fast Food";

export const categories: { key: CategoryKey; emoji: string; label: string; bg: string }[] = [
  { key: "Burger", emoji: "🍔", label: "Burger", bg: "bg-amber-100" },
  { key: "Pizza", emoji: "🍕", label: "Pizza", bg: "bg-red-100" },
  { key: "Qəhvə", emoji: "☕", label: "Qəhvə", bg: "bg-orange-100" },
  { key: "Döner", emoji: "🥙", label: "Döner", bg: "bg-yellow-100" },
  { key: "Kabab", emoji: "🔥", label: "Kabab", bg: "bg-rose-100" },
  { key: "Pide", emoji: "🫓", label: "Pide", bg: "bg-orange-100" },
  { key: "Şirniyyat", emoji: "🍰", label: "Şirniyyat", bg: "bg-pink-100" },
  { key: "Çörək", emoji: "🥖", label: "Çörək", bg: "bg-amber-100" },
  { key: "Balıq", emoji: "🐟", label: "Balıq", bg: "bg-sky-100" },
  { key: "Toyuq", emoji: "🍗", label: "Toyuq", bg: "bg-yellow-100" },
  { key: "Fast Food", emoji: "🍟", label: "Fast Food", bg: "bg-red-100" },
];

export type Neighborhood =
  | "Yasamal"
  | "28 May"
  | "Gənclik"
  | "Nəsimi"
  | "Səbail"
  | "Nərimanov";

export const neighborhoods: Neighborhood[] = [
  "Yasamal",
  "28 May",
  "Gənclik",
  "Nəsimi",
  "Səbail",
  "Nərimanov",
];

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  neighborhood: Neighborhood;
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
  // real-world Baku coordinates
  latlng: [number, number];
};

export const categoryEmoji: Record<CategoryKey, string> = {
  Burger: "🍔",
  Pizza: "🍕",
  Döner: "🥙",
  Kabab: "🔥",
  Qəhvə: "☕",
  Pide: "🫓",
  Şirniyyat: "🍰",
  Çörək: "🥖",
  Balıq: "🐟",
  Toyuq: "🍗",
  "Fast Food": "🍟",
};

export const restaurants: Restaurant[] = [
  {
    id: "firuze",
    neighborhood: "Səbail",
    name: "Firuzə Restoranı",
    cuisine: "Azərbaycan",
    rating: 4.8,
    deliveryMin: 25,
    tagline: "Klassik plov və kabab",
    categories: ["Kabab"],
    image: plov,
    fees: { wolt: 2.5, bolt: 1.9, yango: 2.2 },
    popularPrice: { wolt: 14.5, bolt: 12.9, yango: 13.8 },
    coords: { x: 28, y: 38 },
    latlng: [40.3667, 49.8352],
    menu: [
      { id: "plov", name: "Quzu Plov", description: "Saffran düyüsü, quzu əti, kuru meyvə", image: plov, prices: { wolt: 14.5, bolt: 12.9, yango: 13.8 } },
      { id: "lula", name: "Lülə Kabab", description: "Mangalda bişmiş quzu lüləsi, lavaş ilə", image: kebab, prices: { wolt: 11.0, bolt: 10.5, yango: 10.9 } },
      { id: "tikə-firuze", name: "Quzu Tikə Kabab", description: "Marinadlanmış quzu fileto", image: kebab, prices: { wolt: 16.5, bolt: 15.9, yango: 16.2 } },
      { id: "dushbara", name: "Düşbərə", description: "Ev hazırlanmış xırda pelmen, sumax", image: plov, prices: { wolt: 9.5, bolt: 8.9, yango: 9.2 } },
      { id: "dolma", name: "Yarpaq Dolması", description: "Üzüm yarpağında quzu qiyməsi", image: plov, prices: { wolt: 10.5, bolt: 9.9, yango: 10.2 } },
      { id: "piti", name: "Şəki Piti", description: "Quzu, noxud, ərik şorbası", image: plov, prices: { wolt: 12.0, bolt: 11.5, yango: 11.8 } },
      { id: "shah-plov", name: "Şah Plov", description: "Lavaşda bişmiş bayram plovu", image: plov, prices: { wolt: 22.0, bolt: 21.5, yango: 21.9 } },
    ],
  },
  {
    id: "burgerlab",
    neighborhood: "Gənclik",
    name: "Burger Lab",
    cuisine: "Burger",
    rating: 4.6,
    deliveryMin: 20,
    tagline: "Smashed burgerlər və crinkle fries",
    categories: ["Burger"],
    image: burger,
    fees: { wolt: 1.9, bolt: 2.5, yango: 2.0 },
    popularPrice: { wolt: 9.9, bolt: 10.5, yango: 9.5 },
    coords: { x: 55, y: 25 },
    latlng: [40.3793, 49.8492],
    menu: [
      { id: "classic", name: "Classic Smash Burger", description: "100% mal əti, çedar, marinadlanmış soğan", image: burger, prices: { wolt: 9.9, bolt: 10.5, yango: 9.5 } },
      { id: "double", name: "Double Cheese", description: "İki köftə, ikiqat çedar, ev sousu", image: burger, prices: { wolt: 13.5, bolt: 13.9, yango: 12.9 } },
      { id: "bacon-burger", name: "Bacon BBQ Burger", description: "Mal əti, bacon, BBQ sous, sarımsaq", image: burger, prices: { wolt: 14.9, bolt: 15.2, yango: 14.5 } },
      { id: "spicy", name: "Spicy Jalapeño", description: "Acı jalapeño, pepper jack, chipotle mayo", image: burger, prices: { wolt: 12.5, bolt: 12.9, yango: 11.9 } },
      { id: "veggie", name: "Veggie Crunch", description: "Bitki köftə, avakado, pomidor", image: burger, prices: { wolt: 10.5, bolt: 10.9, yango: 10.2 } },
      { id: "fries", name: "Crinkle Fries", description: "Truffle yağı, parmesan", image: burger, prices: { wolt: 5.5, bolt: 5.9, yango: 5.2 } },
    ],
  },
  {
    id: "napoli",
    neighborhood: "Nərimanov",
    name: "Napoli Pizzeria",
    cuisine: "İtalyan",
    rating: 4.7,
    deliveryMin: 30,
    tagline: "Odun sobasında bişmiş pizza",
    categories: ["Pizza"],
    image: pizza,
    fees: { wolt: 2.9, bolt: 2.2, yango: 2.5 },
    popularPrice: { wolt: 15.0, bolt: 14.5, yango: 15.5 },
    coords: { x: 70, y: 55 },
    latlng: [40.385, 49.82],
    menu: [
      { id: "marg", name: "Margherita", description: "San Marzano pomidorları, mozzarella, reyhan", image: pizza, prices: { wolt: 15.0, bolt: 14.5, yango: 15.5 } },
      { id: "pep", name: "Pepperoni", description: "İtalyan pepperoni, mozzarella, oregano", image: pizza, prices: { wolt: 17.5, bolt: 16.9, yango: 17.0 } },
      { id: "quattro", name: "Quattro Formaggi", description: "4 pendir: mozzarella, gorgonzola, parmesan, fontina", image: pizza, prices: { wolt: 19.0, bolt: 18.5, yango: 18.9 } },
      { id: "diavola", name: "Diavola", description: "Acı salami, çili, mozzarella", image: pizza, prices: { wolt: 18.5, bolt: 17.9, yango: 18.2 } },
      { id: "prosc", name: "Prosciutto e Funghi", description: "Prosciutto, göbələk, mozzarella", image: pizza, prices: { wolt: 20.5, bolt: 19.9, yango: 20.2 } },
      { id: "calzone", name: "Calzone Classico", description: "Bağlı pizza: ricotta, ham, mozzarella", image: pizza, prices: { wolt: 16.0, bolt: 15.5, yango: 15.9 } },
    ],
  },
  {
    id: "sakura",
    neighborhood: "Səbail",
    name: "Sakura Sushi",
    cuisine: "Yapon",
    rating: 4.5,
    deliveryMin: 35,
    tagline: "Təzə suşi və ramen",
    categories: ["Balıq"],
    image: sushi,
    fees: { wolt: 3.5, bolt: 3.0, yango: 3.2 },
    popularPrice: { wolt: 24.0, bolt: 22.5, yango: 23.0 },
    coords: { x: 40, y: 65 },
    latlng: [40.4093, 49.8671],
    menu: [
      { id: "phila", name: "Philadelphia Roll", description: "Norveç qızılbalığı, kürəm pendir, avakado", image: sushi, prices: { wolt: 24.0, bolt: 22.5, yango: 23.0 } },
      { id: "cali", name: "California Roll", description: "Krab, avakado, xiyar, susam", image: sushi, prices: { wolt: 18.5, bolt: 17.9, yango: 18.2 } },
      { id: "dragon", name: "Dragon Roll", description: "Krevet tempura, ilan balığı, avakado", image: sushi, prices: { wolt: 28.0, bolt: 27.5, yango: 27.9 } },
      { id: "spicy-tuna", name: "Spicy Tuna Roll", description: "Acı tunset balığı, yaşıl soğan", image: sushi, prices: { wolt: 22.5, bolt: 21.9, yango: 22.2 } },
      { id: "ramen", name: "Tonkotsu Ramen", description: "Donuz sümük bulyonu, chashu, yumurta", image: sushi, prices: { wolt: 21.0, bolt: 20.5, yango: 20.8 } },
      { id: "gyoza", name: "Toyuq Gyoza (6 əd)", description: "Buxarlı və qızardılmış", image: sushi, prices: { wolt: 11.5, bolt: 10.9, yango: 11.2 } },
    ],
  },
  {
    id: "shawking",
    neighborhood: "Nəsimi",
    name: "Şawarma King",
    cuisine: "Fast Food",
    rating: 4.4,
    deliveryMin: 18,
    tagline: "Toyuq və mal şavərması",
    categories: ["Döner", "Toyuq"],
    image: shawarma,
    fees: { wolt: 1.5, bolt: 1.9, yango: 1.7 },
    popularPrice: { wolt: 6.5, bolt: 6.9, yango: 6.0 },
    coords: { x: 18, y: 70 },
    latlng: [40.3735, 49.855],
    menu: [
      { id: "chick", name: "Toyuq Şavərma", description: "Lavaşda toyuq, sarımsaq sousu, turşular", image: shawarma, prices: { wolt: 6.5, bolt: 6.9, yango: 6.0 } },
      { id: "beef-shaw", name: "Mal Şavərma", description: "Marinadlanmış mal əti, tahini sous", image: shawarma, prices: { wolt: 7.5, bolt: 7.9, yango: 7.2 } },
      { id: "mix-shaw", name: "Mix Şavərma", description: "Toyuq + mal, qarışıq tərəvəz", image: shawarma, prices: { wolt: 8.5, bolt: 8.9, yango: 8.2 } },
      { id: "doner-plate", name: "Döner Tabaq", description: "Düyü, salat və soslarla", image: shawarma, prices: { wolt: 11.5, bolt: 11.9, yango: 11.2 } },
      { id: "lahmacun", name: "Lahmacun", description: "Türk pizzası, qiymə, soğan", image: shawarma, prices: { wolt: 4.5, bolt: 4.9, yango: 4.2 } },
      { id: "ayran", name: "Ev Ayranı", description: "0.3L, soyuq", image: shawarma, prices: { wolt: 2.0, bolt: 2.2, yango: 1.9 } },
    ],
  },
  {
    id: "manqal",
    neighborhood: "Gənclik",
    name: "Manqal House",
    cuisine: "Azərbaycan",
    rating: 4.9,
    deliveryMin: 40,
    tagline: "Premium kabab və tikə",
    categories: ["Kabab", "Toyuq"],
    image: kebab,
    fees: { wolt: 2.9, bolt: 2.5, yango: 2.7 },
    popularPrice: { wolt: 19.0, bolt: 18.5, yango: 19.5 },
    coords: { x: 82, y: 35 },
    latlng: [40.403, 49.88],
    menu: [
      { id: "tikə", name: "Quzu Tikə", description: "Marinadlanmış quzu əti, mangal kömürü", image: kebab, prices: { wolt: 19.0, bolt: 18.5, yango: 19.5 } },
      { id: "lula-manqal", name: "Lülə Kabab", description: "Premium quzu lüləsi", image: kebab, prices: { wolt: 14.0, bolt: 13.5, yango: 13.9 } },
      { id: "toyuq-tikə", name: "Toyuq Tikə", description: "Toyuq filesi, lavaş", image: kebab, prices: { wolt: 13.5, bolt: 12.9, yango: 13.2 } },
      { id: "qabırğa", name: "Quzu Qabırğa", description: "Mangal qabırğa, sumax", image: kebab, prices: { wolt: 24.0, bolt: 23.5, yango: 23.9 } },
      { id: "lyangyar", name: "Cigər Tikə", description: "Quzu cigəri, soğan", image: kebab, prices: { wolt: 12.5, bolt: 11.9, yango: 12.2 } },
      { id: "mangal-mix", name: "Mangal Assorti", description: "4 növ kabab birgə tabaqda", image: kebab, prices: { wolt: 38.0, bolt: 37.5, yango: 37.9 } },
    ],
  },
  {
    id: "coffeelab",
    neighborhood: "Nəsimi",
    name: "Coffee Lab Baku",
    cuisine: "Kafe",
    rating: 4.7,
    deliveryMin: 15,
    tagline: "Specialty qəhvə və croissant",
    categories: ["Qəhvə"],
    image: coffee,
    fees: { wolt: 1.5, bolt: 1.7, yango: 1.4 },
    popularPrice: { wolt: 5.5, bolt: 5.9, yango: 5.2 },
    coords: { x: 48, y: 48 },
    latlng: [40.372, 49.8385],
    menu: [
      { id: "latte", name: "Flat White", description: "Double espresso, mikroköpük süd", image: coffee, prices: { wolt: 5.5, bolt: 5.9, yango: 5.2 } },
      { id: "cappuccino", name: "Cappuccino", description: "Espresso, buxarlı süd, köpük", image: coffee, prices: { wolt: 5.0, bolt: 5.4, yango: 4.8 } },
      { id: "americano", name: "Americano", description: "Double shot espresso, isti su", image: coffee, prices: { wolt: 4.0, bolt: 4.5, yango: 3.9 } },
      { id: "vanilla-latte", name: "Vanilla Latte", description: "Vanilla şərbəti, latte", image: coffee, prices: { wolt: 6.5, bolt: 6.9, yango: 6.2 } },
      { id: "croissant", name: "Bütər Croissant", description: "Fransız üsulu, təzə bişmiş", image: coffee, prices: { wolt: 4.5, bolt: 4.9, yango: 4.2 } },
      { id: "cheesecake", name: "New York Cheesecake", description: "Klassik, moruq sousu ilə", image: dessert, prices: { wolt: 7.5, bolt: 7.9, yango: 7.2 } },
      { id: "matcha", name: "Matcha Latte", description: "Yapon matcha tozu, süd", image: coffee, prices: { wolt: 7.0, bolt: 7.4, yango: 6.8 } },
    ],
  },
  {
    id: "shirniyyatevi",
    neighborhood: "Səbail",
    name: "Şirniyyat Evi",
    cuisine: "Şirniyyat",
    rating: 4.8,
    deliveryMin: 22,
    tagline: "Paxlava, şəkərbura və tortlar",
    categories: ["Şirniyyat", "Qəhvə"],
    image: dessert,
    fees: { wolt: 2.0, bolt: 1.8, yango: 1.9 },
    popularPrice: { wolt: 7.5, bolt: 6.9, yango: 7.2 },
    coords: { x: 62, y: 72 },
    latlng: [40.39, 49.81],
    menu: [
      { id: "paxlava", name: "Bakı Paxlavası", description: "Klassik qoz və bal şərbəti ilə", image: dessert, prices: { wolt: 7.5, bolt: 6.9, yango: 7.2 } },
      { id: "şəkərbura", name: "Şəkərbura", description: "Qoz, şəkər tozu, ənənəvi naxış", image: dessert, prices: { wolt: 6.5, bolt: 5.9, yango: 6.2 } },
      { id: "qoğal", name: "Qoğal", description: "Şirin pampuşka, darçın", image: dessert, prices: { wolt: 4.5, bolt: 3.9, yango: 4.2 } },
      { id: "medovik", name: "Medovik Tort", description: "Bal qatlı tort, smetanalı krem", image: dessert, prices: { wolt: 8.5, bolt: 7.9, yango: 8.2 } },
      { id: "napoleon", name: "Napoleon Tort", description: "Çoxqatlı yaprak xəmiri, vanil krem", image: dessert, prices: { wolt: 8.0, bolt: 7.5, yango: 7.8 } },
      { id: "muraba", name: "Şahtut Mürəbbəsi", description: "Ev hazırlanmış, çay üçün", image: dessert, prices: { wolt: 5.5, bolt: 4.9, yango: 5.2 } },
    ],
  },
  {
    id: "chickenhouse",
    neighborhood: "Nərimanov",
    name: "Chicken House",
    cuisine: "Fast Food",
    rating: 4.5,
    deliveryMin: 25,
    tagline: "Krunch toyuq və qanadlar",
    categories: ["Toyuq", "Burger"],
    image: chicken,
    fees: { wolt: 2.0, bolt: 2.2, yango: 1.8 },
    popularPrice: { wolt: 11.5, bolt: 10.9, yango: 11.0 },
    coords: { x: 35, y: 22 },
    latlng: [40.385, 49.85],
    menu: [
      { id: "wings", name: "Hot Wings (8 əd)", description: "Acılı sous, ranch dip", image: chicken, prices: { wolt: 11.5, bolt: 10.9, yango: 11.0 } },
      { id: "bucket", name: "Krunch Bucket (10 əd)", description: "Çıtır toyuq parçaları", image: chicken, prices: { wolt: 24.5, bolt: 23.9, yango: 23.5 } },
      { id: "chick-burger", name: "Crispy Chicken Burger", description: "Çıtır toyuq fileto, coleslaw", image: burger, prices: { wolt: 9.5, bolt: 8.9, yango: 9.0 } },
      { id: "tenders", name: "Chicken Tenders (5 əd)", description: "Honey mustard sous", image: chicken, prices: { wolt: 10.5, bolt: 9.9, yango: 10.0 } },
      { id: "wrap", name: "Spicy Chicken Wrap", description: "Tortilla, acı toyuq, salat", image: shawarma, prices: { wolt: 8.5, bolt: 7.9, yango: 8.0 } },
      { id: "nuggets", name: "Nuggets (9 əd)", description: "Çocuqlar üçün məşhur", image: chicken, prices: { wolt: 7.5, bolt: 6.9, yango: 7.0 } },
    ],
  },
  // === Yasamal ===
  {
    id: "burgerhouseaz",
    name: "Burger House AZ",
    cuisine: "Burger",
    neighborhood: "Yasamal",
    rating: 4.5,
    deliveryMin: 22,
    tagline: "Yasamalın ən sevimli burgerləri",
    categories: ["Burger", "Fast Food"],
    image: burger,
    fees: { wolt: 2.2, bolt: 1.7, yango: 2.0 },
    popularPrice: { wolt: 9.5, bolt: 9.0, yango: 9.2 },
    coords: { x: 25, y: 30 },
    latlng: [40.378, 49.82],
    menu: [
      { id: "bha-classic", name: "Classic Beef Burger", description: "Mal əti, çedar, tomat", image: burger, prices: { wolt: 9.5, bolt: 9.0, yango: 9.2 } },
      { id: "bha-double", name: "Double Stack", description: "İki köftə, ikiqat çedar", image: burger, prices: { wolt: 13.5, bolt: 12.9, yango: 13.0 } },
      { id: "bha-bbq", name: "BBQ Bacon", description: "Bacon, BBQ sous, marinadlanmış soğan", image: burger, prices: { wolt: 14.0, bolt: 13.5, yango: 13.7 } },
      { id: "bha-spicy", name: "Spicy Habanero", description: "Acı habanero, pepper jack", image: burger, prices: { wolt: 12.5, bolt: 11.9, yango: 12.0 } },
      { id: "bha-chick", name: "Crispy Chicken", description: "Çıtır toyuq fileto, coleslaw", image: burger, prices: { wolt: 10.5, bolt: 9.9, yango: 10.0 } },
      { id: "bha-fries", name: "Loaded Fries", description: "Çedar sous, jalapeño", image: burger, prices: { wolt: 6.5, bolt: 5.9, yango: 6.0 } },
    ],
  },
  {
    id: "pizzaroma",
    name: "Pizza Roma",
    cuisine: "İtalyan",
    neighborhood: "Yasamal",
    rating: 4.6,
    deliveryMin: 28,
    tagline: "Roma üslublu nazik pizza",
    categories: ["Pizza"],
    image: pizza,
    fees: { wolt: 2.5, bolt: 2.9, yango: 2.3 },
    popularPrice: { wolt: 14.0, bolt: 13.5, yango: 13.9 },
    coords: { x: 30, y: 40 },
    latlng: [40.379, 49.821],
    menu: [
      { id: "pr-marg", name: "Margherita Romana", description: "Pomidor, mozzarella, reyhan", image: pizza, prices: { wolt: 14.0, bolt: 13.5, yango: 13.9 } },
      { id: "pr-pep", name: "Pepperoni", description: "Acı salami, mozzarella", image: pizza, prices: { wolt: 16.5, bolt: 15.9, yango: 16.0 } },
      { id: "pr-funghi", name: "Funghi", description: "Göbələk, mozzarella, pesto", image: pizza, prices: { wolt: 15.5, bolt: 14.9, yango: 15.0 } },
      { id: "pr-quattro", name: "Quattro Stagioni", description: "4 mövsüm: artişok, ham, göbələk, zeytun", image: pizza, prices: { wolt: 18.5, bolt: 17.9, yango: 18.0 } },
      { id: "pr-bianca", name: "Pizza Bianca", description: "Ricotta, ispanaq, sarımsaq", image: pizza, prices: { wolt: 17.0, bolt: 16.5, yango: 16.7 } },
      { id: "pr-tira", name: "Tiramisu", description: "Klassik italyan deserti", image: dessert, prices: { wolt: 7.5, bolt: 6.9, yango: 7.0 } },
    ],
  },
  {
    id: "cayeviyasamal",
    name: "Çay Evi Yasamal",
    cuisine: "Kafe",
    neighborhood: "Yasamal",
    rating: 4.7,
    deliveryMin: 18,
    tagline: "Klassik çay və qəhvə evi",
    categories: ["Qəhvə", "Şirniyyat"],
    image: coffee,
    fees: { wolt: 1.8, bolt: 1.5, yango: 1.6 },
    popularPrice: { wolt: 4.5, bolt: 4.0, yango: 4.2 },
    coords: { x: 28, y: 35 },
    latlng: [40.377, 49.819],
    menu: [
      { id: "cy-cay", name: "Armudu Çay", description: "Klassik Azərbaycan çayı", image: coffee, prices: { wolt: 2.5, bolt: 2.0, yango: 2.2 } },
      { id: "cy-turkqehve", name: "Türk Qəhvəsi", description: "Cezvə üsulu", image: coffee, prices: { wolt: 4.5, bolt: 4.0, yango: 4.2 } },
      { id: "cy-latte", name: "Latte", description: "Espresso, buxarlı süd", image: coffee, prices: { wolt: 5.5, bolt: 5.0, yango: 5.2 } },
      { id: "cy-pakhlava", name: "Bakı Paxlavası", description: "Qoz və bal", image: dessert, prices: { wolt: 6.5, bolt: 5.9, yango: 6.0 } },
      { id: "cy-shor", name: "Şor Qoğal", description: "Duzlu, ənənəvi", image: dessert, prices: { wolt: 3.5, bolt: 2.9, yango: 3.0 } },
      { id: "cy-mur", name: "Gül Mürəbbəsi", description: "Ev hazırlanmış", image: dessert, prices: { wolt: 4.5, bolt: 3.9, yango: 4.0 } },
    ],
  },
  {
    id: "kababsarayi",
    name: "Kabab Sarayı",
    cuisine: "Azərbaycan",
    neighborhood: "Yasamal",
    rating: 4.8,
    deliveryMin: 35,
    tagline: "Mangal kababı və tikə",
    categories: ["Kabab", "Toyuq"],
    image: kebab,
    fees: { wolt: 2.7, bolt: 2.4, yango: 2.6 },
    popularPrice: { wolt: 17.0, bolt: 16.5, yango: 16.8 },
    coords: { x: 32, y: 42 },
    latlng: [40.380, 49.823],
    menu: [
      { id: "ks-tikə", name: "Quzu Tikə", description: "Mangalda quzu fileto", image: kebab, prices: { wolt: 17.0, bolt: 16.5, yango: 16.8 } },
      { id: "ks-lula", name: "Lülə Kabab", description: "Quzu lüləsi, sumax", image: kebab, prices: { wolt: 12.5, bolt: 11.9, yango: 12.0 } },
      { id: "ks-tt", name: "Toyuq Tikə", description: "Marinadlanmış toyuq", image: kebab, prices: { wolt: 12.0, bolt: 11.5, yango: 11.8 } },
      { id: "ks-qab", name: "Quzu Qabırğa", description: "Mangal qabırğa", image: kebab, prices: { wolt: 22.0, bolt: 21.5, yango: 21.8 } },
      { id: "ks-cig", name: "Cigər Tikə", description: "Quzu cigəri", image: kebab, prices: { wolt: 11.5, bolt: 10.9, yango: 11.0 } },
      { id: "ks-mix", name: "Mangal Assorti", description: "Qarışıq kabab tabağı", image: kebab, prices: { wolt: 35.0, bolt: 34.5, yango: 34.8 } },
    ],
  },
  {
    id: "pidemaster",
    name: "Pide Master",
    cuisine: "Türk",
    neighborhood: "Yasamal",
    rating: 4.4,
    deliveryMin: 25,
    tagline: "Türk üsulu pide və lahmacun",
    categories: ["Pide", "Çörək"],
    image: pizza,
    fees: { wolt: 2.3, bolt: 2.0, yango: 2.1 },
    popularPrice: { wolt: 11.0, bolt: 10.5, yango: 10.8 },
    coords: { x: 26, y: 33 },
    latlng: [40.376, 49.818],
    menu: [
      { id: "pm-kasarli", name: "Kaşarlı Pide", description: "Kaşar pendiri, mayalı xəmir", image: pizza, prices: { wolt: 11.0, bolt: 10.5, yango: 10.8 } },
      { id: "pm-kiymali", name: "Kıymalı Pide", description: "Mal qiyməsi, soğan", image: pizza, prices: { wolt: 12.5, bolt: 11.9, yango: 12.0 } },
      { id: "pm-karisik", name: "Karışık Pide", description: "Sucuq, kaşar, yumurta", image: pizza, prices: { wolt: 14.0, bolt: 13.5, yango: 13.7 } },
      { id: "pm-lahmacun", name: "Lahmacun", description: "Türk pizzası, qiymə", image: pizza, prices: { wolt: 4.5, bolt: 3.9, yango: 4.0 } },
      { id: "pm-corek", name: "Şor Çörək", description: "Təzə bişmiş", image: pizza, prices: { wolt: 3.5, bolt: 2.9, yango: 3.0 } },
    ],
  },

  // === 28 May ===
  {
    id: "smashburger28",
    name: "SmashBurger 28",
    cuisine: "Burger",
    neighborhood: "28 May",
    rating: 4.7,
    deliveryMin: 20,
    tagline: "28 May məhəlləsinin smash burgeri",
    categories: ["Burger", "Fast Food"],
    image: burger,
    fees: { wolt: 1.9, bolt: 2.4, yango: 2.1 },
    popularPrice: { wolt: 10.5, bolt: 10.0, yango: 10.2 },
    coords: { x: 50, y: 35 },
    latlng: [40.382, 49.847],
    menu: [
      { id: "sb-classic", name: "OG Smash", description: "Single köftə, çedar, dill pickle", image: burger, prices: { wolt: 10.5, bolt: 10.0, yango: 10.2 } },
      { id: "sb-double", name: "Double Smash", description: "İki köftə, ikiqat pendir", image: burger, prices: { wolt: 14.5, bolt: 13.9, yango: 14.0 } },
      { id: "sb-truffle", name: "Truffle Smash", description: "Truffle aioli, parmesan", image: burger, prices: { wolt: 16.0, bolt: 15.5, yango: 15.7 } },
      { id: "sb-spicy", name: "Nashville Hot", description: "Acı toyuq, pickles, mayo", image: burger, prices: { wolt: 12.0, bolt: 11.5, yango: 11.7 } },
      { id: "sb-fries", name: "Smash Fries", description: "Çili sous, ranch", image: burger, prices: { wolt: 6.0, bolt: 5.5, yango: 5.7 } },
      { id: "sb-shake", name: "Vanilla Milkshake", description: "Klassik amerikan", image: dessert, prices: { wolt: 7.0, bolt: 6.5, yango: 6.7 } },
    ],
  },
  {
    id: "napoli28",
    name: "Napoli Pizza",
    cuisine: "İtalyan",
    neighborhood: "28 May",
    rating: 4.5,
    deliveryMin: 30,
    tagline: "Neapolitan üsulu pizza",
    categories: ["Pizza"],
    image: pizza,
    fees: { wolt: 2.8, bolt: 2.3, yango: 2.5 },
    popularPrice: { wolt: 15.5, bolt: 15.0, yango: 15.2 },
    coords: { x: 52, y: 38 },
    latlng: [40.383, 49.849],
    menu: [
      { id: "n28-marg", name: "Margherita DOC", description: "Buffalo mozzarella, San Marzano", image: pizza, prices: { wolt: 15.5, bolt: 15.0, yango: 15.2 } },
      { id: "n28-diavola", name: "Diavola", description: "Acı salami, çili", image: pizza, prices: { wolt: 18.5, bolt: 17.9, yango: 18.0 } },
      { id: "n28-capri", name: "Capricciosa", description: "Ham, göbələk, artişok, zeytun", image: pizza, prices: { wolt: 19.5, bolt: 18.9, yango: 19.0 } },
      { id: "n28-bufala", name: "Bufala", description: "Buffalo mozzarella, çeri pomidor", image: pizza, prices: { wolt: 20.0, bolt: 19.5, yango: 19.7 } },
      { id: "n28-calz", name: "Calzone Napoli", description: "Bağlı pizza, ricotta, salami", image: pizza, prices: { wolt: 17.0, bolt: 16.5, yango: 16.7 } },
      { id: "n28-tira", name: "Tiramisu", description: "Mascarpone, espresso", image: dessert, prices: { wolt: 8.0, bolt: 7.5, yango: 7.7 } },
    ],
  },
  {
    id: "sushi28",
    name: "Sushi 28",
    cuisine: "Yapon",
    neighborhood: "28 May",
    rating: 4.6,
    deliveryMin: 32,
    tagline: "Premium suşi və ramen",
    categories: ["Balıq"],
    image: sushi,
    fees: { wolt: 3.2, bolt: 2.9, yango: 3.0 },
    popularPrice: { wolt: 23.0, bolt: 22.5, yango: 22.8 },
    coords: { x: 54, y: 40 },
    latlng: [40.384, 49.850],
    menu: [
      { id: "s28-cali", name: "California Roll", description: "Krab, avakado, xiyar", image: sushi, prices: { wolt: 18.0, bolt: 17.5, yango: 17.7 } },
      { id: "s28-phila", name: "Philadelphia", description: "Qızılbalıq, kürəm pendir", image: sushi, prices: { wolt: 23.0, bolt: 22.5, yango: 22.8 } },
      { id: "s28-rainbow", name: "Rainbow Roll", description: "Müxtəlif balıq", image: sushi, prices: { wolt: 27.0, bolt: 26.5, yango: 26.7 } },
      { id: "s28-spicytuna", name: "Spicy Tuna", description: "Tunset balığı, çili mayo", image: sushi, prices: { wolt: 22.0, bolt: 21.5, yango: 21.7 } },
      { id: "s28-ramen", name: "Shoyu Ramen", description: "Soya bulyonu, chashu", image: sushi, prices: { wolt: 20.5, bolt: 19.9, yango: 20.0 } },
      { id: "s28-edamame", name: "Edamame", description: "Buxarlı, dəniz duzu", image: sushi, prices: { wolt: 6.5, bolt: 5.9, yango: 6.0 } },
    ],
  },
  {
    id: "donerking",
    name: "Döner King",
    cuisine: "Türk",
    neighborhood: "28 May",
    rating: 4.3,
    deliveryMin: 18,
    tagline: "Şaquli mil dönəri",
    categories: ["Döner", "Fast Food"],
    image: shawarma,
    fees: { wolt: 1.6, bolt: 2.0, yango: 1.8 },
    popularPrice: { wolt: 7.0, bolt: 6.5, yango: 6.7 },
    coords: { x: 48, y: 32 },
    latlng: [40.381, 49.846],
    menu: [
      { id: "dk-toyuq", name: "Toyuq Döner", description: "Lavaşda toyuq, sarımsaq sousu", image: shawarma, prices: { wolt: 7.0, bolt: 6.5, yango: 6.7 } },
      { id: "dk-mal", name: "Mal Döner", description: "Marinadlanmış mal, tahini", image: shawarma, prices: { wolt: 8.0, bolt: 7.5, yango: 7.7 } },
      { id: "dk-iskender", name: "İskender Döner", description: "Domates sousu, yoğurt, tereyağı", image: shawarma, prices: { wolt: 13.0, bolt: 12.5, yango: 12.7 } },
      { id: "dk-tabaq", name: "Döner Tabaq", description: "Düyü, salat, soslar", image: shawarma, prices: { wolt: 11.0, bolt: 10.5, yango: 10.7 } },
      { id: "dk-pide", name: "Döner Pide", description: "Pide xəmirinə döner", image: shawarma, prices: { wolt: 9.5, bolt: 8.9, yango: 9.0 } },
      { id: "dk-ayran", name: "Ev Ayranı", description: "0.3L soyuq", image: shawarma, prices: { wolt: 2.0, bolt: 1.8, yango: 1.9 } },
    ],
  },
  {
    id: "toyuqevi",
    name: "Toyuq Evi",
    cuisine: "Fast Food",
    neighborhood: "28 May",
    rating: 4.4,
    deliveryMin: 22,
    tagline: "Çıtır toyuq və qanadlar",
    categories: ["Toyuq", "Fast Food"],
    image: chicken,
    fees: { wolt: 2.0, bolt: 1.8, yango: 1.9 },
    popularPrice: { wolt: 11.0, bolt: 10.5, yango: 10.7 },
    coords: { x: 56, y: 36 },
    latlng: [40.385, 49.851],
    menu: [
      { id: "te-wings", name: "Hot Wings (8 əd)", description: "Acılı sous", image: chicken, prices: { wolt: 11.0, bolt: 10.5, yango: 10.7 } },
      { id: "te-bucket", name: "Family Bucket (12 əd)", description: "Qarışıq parçalar", image: chicken, prices: { wolt: 28.0, bolt: 27.5, yango: 27.7 } },
      { id: "te-tenders", name: "Chicken Tenders", description: "Bal-xardal sous", image: chicken, prices: { wolt: 10.5, bolt: 9.9, yango: 10.0 } },
      { id: "te-strips", name: "Spicy Strips", description: "Acı baharatlı zolaqlar", image: chicken, prices: { wolt: 12.0, bolt: 11.5, yango: 11.7 } },
      { id: "te-burger", name: "Crispy Chicken Burger", description: "Çıtır fileto, coleslaw", image: burger, prices: { wolt: 9.5, bolt: 8.9, yango: 9.0 } },
      { id: "te-nuggets", name: "Nuggets (9 əd)", description: "Klassik nuggets", image: chicken, prices: { wolt: 7.5, bolt: 6.9, yango: 7.0 } },
    ],
  },

  // === Gənclik ===
  {
    id: "lapizza",
    name: "La Pizza",
    cuisine: "İtalyan",
    neighborhood: "Gənclik",
    rating: 4.6,
    deliveryMin: 28,
    tagline: "Gənclikdə həqiqi italyan pizza",
    categories: ["Pizza"],
    image: pizza,
    fees: { wolt: 2.6, bolt: 2.2, yango: 2.4 },
    popularPrice: { wolt: 14.5, bolt: 14.0, yango: 14.2 },
    coords: { x: 70, y: 30 },
    latlng: [40.402, 49.879],
    menu: [
      { id: "lp-marg", name: "Margherita", description: "Pomidor, mozzarella, reyhan", image: pizza, prices: { wolt: 14.5, bolt: 14.0, yango: 14.2 } },
      { id: "lp-pep", name: "Pepperoni", description: "Acı pepperoni", image: pizza, prices: { wolt: 17.0, bolt: 16.5, yango: 16.7 } },
      { id: "lp-veg", name: "Vegetariana", description: "Tərəvəz qarışığı", image: pizza, prices: { wolt: 16.0, bolt: 15.5, yango: 15.7 } },
      { id: "lp-bbq", name: "BBQ Chicken", description: "Toyuq, BBQ sous", image: pizza, prices: { wolt: 18.0, bolt: 17.5, yango: 17.7 } },
      { id: "lp-quattro", name: "Quattro Formaggi", description: "4 pendir", image: pizza, prices: { wolt: 19.0, bolt: 18.5, yango: 18.7 } },
      { id: "lp-calz", name: "Calzone", description: "Bağlı pizza, ricotta, ham", image: pizza, prices: { wolt: 16.5, bolt: 16.0, yango: 16.2 } },
    ],
  },
  {
    id: "qehveevi",
    name: "Qəhvə Evi",
    cuisine: "Kafe",
    neighborhood: "Gənclik",
    rating: 4.8,
    deliveryMin: 16,
    tagline: "Gənclik metro yanı specialty qəhvə",
    categories: ["Qəhvə", "Şirniyyat"],
    image: coffee,
    fees: { wolt: 1.7, bolt: 1.4, yango: 1.5 },
    popularPrice: { wolt: 5.0, bolt: 4.5, yango: 4.7 },
    coords: { x: 72, y: 32 },
    latlng: [40.404, 49.881],
    menu: [
      { id: "qe-flat", name: "Flat White", description: "Double espresso, mikroköpük", image: coffee, prices: { wolt: 5.5, bolt: 5.0, yango: 5.2 } },
      { id: "qe-capp", name: "Cappuccino", description: "Klassik italyan", image: coffee, prices: { wolt: 5.0, bolt: 4.5, yango: 4.7 } },
      { id: "qe-amer", name: "Americano", description: "Double shot", image: coffee, prices: { wolt: 4.0, bolt: 3.5, yango: 3.7 } },
      { id: "qe-mocha", name: "Mocha", description: "Espresso, kakao, süd", image: coffee, prices: { wolt: 6.5, bolt: 5.9, yango: 6.0 } },
      { id: "qe-matcha", name: "Iced Matcha Latte", description: "Buzlu, vanilya", image: coffee, prices: { wolt: 7.0, bolt: 6.5, yango: 6.7 } },
      { id: "qe-cinnamon", name: "Cinnamon Roll", description: "Darçın, qaymaq pendir", image: dessert, prices: { wolt: 6.5, bolt: 5.9, yango: 6.0 } },
      { id: "qe-cheesecake", name: "Cheesecake", description: "New York üsulu", image: dessert, prices: { wolt: 7.5, bolt: 6.9, yango: 7.0 } },
    ],
  },
];

export const cuisines = ["Hamısı", "Azərbaycan", "Burger", "İtalyan", "Yapon", "Fast Food", "Kafe", "Şirniyyat"];

export function cheapestPlatform(prices: Partial<Record<Platform, number>>): Platform | null {
  const entries = Object.entries(prices) as [Platform, number][];
  if (!entries.length) return null;
  return entries.reduce((a, b) => (b[1] < a[1] ? b : a))[0];
}

export function getRestaurant(id: string) {
  return restaurants.find((r) => r.id === id);
}
