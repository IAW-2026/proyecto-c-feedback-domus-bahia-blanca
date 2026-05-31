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

  "456": {
    id: "456",
    title: "Palermo Chico",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-4.jpg",
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      meters: 70,
      garage: 1,
    },
  },

  "567": {
    id: "567",
    title: "Edificio Rosedal",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-5.jpg",
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      meters: 110,
      garage: 1,
    },
  },

  "678": {
    id: "678",
    title: "Complejo Pacífico",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-6.jpg",
    specs: {
      bedrooms: 1,
      bathrooms: 1,
      meters: 48,
      garage: 0,
    },
  },

  "789": {
    id: "789",
    title: "Portal del Sur",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-7.jpg",
    specs: {
      bedrooms: 4,
      bathrooms: 2,
      meters: 155,
      garage: 2,
    },
  },

  "890": {
    id: "890",
    title: "Villa Mitre Suites",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-8.jpg",
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      meters: 65,
      garage: 0,
    },
  },

  "901": {
    id: "901",
    title: "Barrio Universitario",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-9.jpg",
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      meters: 95,
      garage: 1,
    },
  },

  "012": {
    id: "012",
    title: "Alto Palihue",
    location: "Bahía Blanca, Buenos Aires",
    imageUrl: "/prueba-10.jpg",
    specs: {
      bedrooms: 5,
      bathrooms: 3,
      meters: 210,
      garage: 2,
    },
  },
};