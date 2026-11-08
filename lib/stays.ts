export type Stay = {
  slug: string;
  name: string;
  location: string;
  region: string;
  type: string;
  price: number;
  guests: number;
  bedrooms: number;
  image: string;
  description: string;
  note: string;
  amenities: string[];
};
export const stays: Stay[] = [
  {
    slug: "the-palm-house",
    name: "The Palm House",
    location: "Galle",
    region: "SOUTH COAST",
    type: "Private villa",
    price: 42000,
    guests: 6,
    bedrooms: 3,
    image: "villa",
    note: "A slower kind of seaside",
    description:
      "A whitewashed hideaway tucked behind palms, with open living spaces and a private pool made for unhurried afternoons. Begin the day with breakfast in the garden, wander the lanes of Galle Fort, then return for a quiet evening on the terrace.",
    amenities: [
      "Wi-Fi",
      "Swimming pool",
      "Air conditioning",
      "Free parking",
      "Kitchen",
      "Garden",
    ],
  },
  {
    slug: "nine-arches-retreat",
    name: "Nine Arches Retreat",
    location: "Ella",
    region: "HILL COUNTRY",
    type: "Boutique lodge",
    price: 24500,
    guests: 2,
    bedrooms: 1,
    image: "ella",
    note: "Wake up above the clouds",
    description:
      "A quiet hillside lodge overlooking green valleys and distant ridgelines. A generous terrace opens onto cool morning air, with walking trails and Ella’s cafés a short journey away.",
    amenities: ["Wi-Fi", "Free parking", "Breakfast area", "Mountain views"],
  },
  {
    slug: "salt-and-soul",
    name: "Salt & Soul",
    location: "Mirissa",
    region: "SOUTH COAST",
    type: "Beach house",
    price: 36500,
    guests: 4,
    bedrooms: 2,
    image: "beach",
    note: "Barefoot, from dawn to dusk",
    description:
      "An easygoing coastal home with shaded corners, sea breezes and room to settle into island time. Spend the morning by the water and share dinner on the terrace as the light softens.",
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "Free parking",
      "Kitchen",
      "Beach access",
    ],
  },
  {
    slug: "the-cinnamon-courtyard",
    name: "The Cinnamon Courtyard",
    location: "Kandy",
    region: "CULTURAL HEARTLAND",
    type: "Heritage home",
    price: 28500,
    guests: 4,
    bedrooms: 2,
    image: "courtyard",
    note: "An island story, beautifully kept",
    description:
      "A characterful courtyard home inspired by the warmth of Kandyan hospitality. Timber details, leafy spaces and a sheltered veranda offer a peaceful base for discovering the city and its gardens.",
    amenities: ["Wi-Fi", "Air conditioning", "Free parking", "Garden"],
  },
  {
    slug: "ceylon-city-residence",
    name: "Ceylon City Residence",
    location: "Colombo",
    region: "WEST COAST",
    type: "Apartment",
    price: 19500,
    guests: 3,
    bedrooms: 2,
    image: "apartment",
    note: "Your own corner of the capital",
    description:
      "A light-filled city apartment with a comfortable living room and a practical kitchen. Discover Colombo’s galleries, neighbourhood cafés and oceanfront walks before coming home to a calm, private space.",
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "Free parking",
      "Kitchen",
      "Workspace",
    ],
  },
  {
    slug: "the-tea-planters-house",
    name: "The Tea Planter’s House",
    location: "Nuwara Eliya",
    region: "TEA COUNTRY",
    type: "Country bungalow",
    price: 32500,
    guests: 6,
    bedrooms: 3,
    image: "tea",
    note: "Cool mornings. Endless green.",
    description:
      "A cosy country bungalow inspired by the island’s tea-growing highlands. Slow breakfasts, misty garden walks and evenings in the sitting room make this a gentle escape for families and friends.",
    amenities: ["Wi-Fi", "Free parking", "Garden", "Kitchen", "Mountain views"],
  },
];
export const destinations = stays.map((s) => s.location);
export const lkr = (value: number) =>
  new Intl.NumberFormat("en-LK").format(value);
export function filterStays(destination: string, guests = 1) {
  return stays.filter(
    (s) =>
      (!destination ||
        s.location.toLowerCase() === destination.toLowerCase()) &&
      s.guests >= guests,
  );
}
