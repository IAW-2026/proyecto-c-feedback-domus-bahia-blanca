export interface PropertyMockData {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  specs: {
    bedrooms: number;
    bathrooms: number;
    meters: number;
    garage: number;
  };
}

export const propertyMocks: Record<string, PropertyMockData> = {
  "123": {
    id: "123",
    title: "Torre Plaza",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-1.jpg",
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      meters: 120,
      garage: 1,
    },
  },

  "234": {
    id: "234",
    title: "Residencias Alem",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-2.jpg",
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      meters: 85,
      garage: 0,
    },
  },

  "345": {
    id: "345",
    title: "Vista Sarmiento",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-3.jpg",
    specs: {
      bedrooms: 4,
      bathrooms: 3,
      meters: 180,
      garage: 2,
    },
  },
};