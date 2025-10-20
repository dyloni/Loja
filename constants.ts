import type { Listing } from './types';

// Curated list of African house images
const africanHouseImages = [
  'https://images.unsplash.com/photo-1559941651-2d7a22651a82?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6164a83639?w=800&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
  'https://images.unsplash.com/photo-1595954446535-b7454a2a3f78?w=800&q=80',
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
  'https://images.unsplash.com/photo-1613977257363-2033976387b0?w=800&q=80',
  'https://images.unsplash.com/photo-1605276374104-5de67d18394b?w=800&q=80',
  'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80',
  'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80',
  'https://images.unsplash.com/photo-1600047509807-0b768eda19d5?w=800&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
  'https://images.unsplash.com/photo-1602075432747-385d56d7b14d?w=800&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1628744449797-157121300067?w=800&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
  'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=800&q=80'
];

// Helper data for generation
const cities = ['Harare', 'Bulawayo', 'Mutare', 'Gweru', 'Victoria Falls', 'Kariba', 'Masvingo', 'Kwekwe', 'Kadoma', 'Chinhoyi'];
export const propertyTypes = ['Entire house', 'Entire apartment', 'Townhouse', 'Cottage', 'Farm stay', 'Loft'];
const amenitiesList = ['Wifi', 'Kitchen', 'Free parking', 'Air conditioning', 'Pool', 'Dedicated workspace', 'Patio', 'BBQ grill', 'Waterfront', 'TV', 'Washing machine', 'Dryer'];
const houseRulesList = ['No smoking indoors', 'No pets', 'No parties or events', '12-month minimum lease', 'Corporate clients preferred', 'Respect local wildlife', 'Quiet hours after 10 PM'];
const featuresList = ['Large Garden', 'Borehole Water', 'Fully Tiled', 'Gated Community', 'Fully Furnished', 'Private Patio', 'City Views', 'Modern Finishes', 'Elevator Access', 'Solar Power', 'Thatched Roof', 'Secure Complex'];
const firstNames = ['Tafadzwa', 'Tendai', 'Kudakwashe', 'Fungai', 'Chipo', 'Rudo', 'Tinashe', 'Tanaka', 'Farai', 'Tapiwa', 'Chenai', 'Nyarai', 'Sekai', 'Munashe', 'David', 'Grace', 'John', 'Sarah'];
const lastNames = ['Moyo', 'Ncube', 'Ndlovu', 'Shumba', 'Gumbo', 'Mutasa', 'Sibanda', 'Chiwenga', 'Mhlanga', 'Dube', 'Ngwenya', 'Mapfumo', 'Chauke', 'Mlambo'];
const reviewContent = [
    'A fantastic place to stay. The host was very welcoming and responsive. Highly recommended!',
    'Great location and beautiful property. We enjoyed our time here and would love to come back.',
    'The house was clean, spacious, and had all the necessary amenities. Perfect for a family.',
    'Excellent value for money. The landlord is professional and the property is well-maintained.',
    'We had a wonderful experience. The views are amazing and the neighborhood is peaceful.',
    'A comfortable and secure home. We renewed our lease and are very happy here.',
    'The property exceeded our expectations. It was even better than the pictures.',
    'Very responsive and helpful host. The property is in a great, safe location.',
];

// Helper functions for deterministically random data
const deterministicRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const generateRandomElement = <T>(arr: T[], seed: number): T => arr[Math.floor(deterministicRandom(seed) * arr.length)];
const generateRandomNumber = (min: number, max: number, seed: number) => Math.floor(deterministicRandom(seed) * (max - min + 1)) + min;
const generateRandomFloat = (min: number, max: number, decimals: number, seed: number) => parseFloat((deterministicRandom(seed) * (max - min) + min).toFixed(decimals));

const generateHost = (id: number) => {
    const name = `${generateRandomElement(firstNames, id)} ${generateRandomElement(lastNames, id + 1)}`;
    return {
        id: `h${id}`,
        name,
        avatarUrl: `https://picsum.photos/seed/h${id}/100/100`,
        hostSince: `${generateRandomNumber(2018, 2023, id)}`,
        responseRate: generateRandomNumber(90, 100, id + 2),
        isVerified: deterministicRandom(id + 3) > 0.3,
    };
};

const hosts = Array.from({ length: 40 }, (_, i) => generateHost(i + 1));

const generateReview = (listingId: number, reviewIndex: number) => {
    const seed = listingId * 100 + reviewIndex;
    const reviewerName = `${generateRandomElement(firstNames, seed)} ${generateRandomElement(lastNames, seed + 1)}`;
    return {
        id: `r${seed}`,
        reviewer: {
            name: reviewerName,
            avatarUrl: `https://picsum.photos/seed/r${seed}/100/100`,
        },
        rating: generateRandomFloat(4.5, 5, 1, seed + 2),
        content: generateRandomElement(reviewContent, seed + 3),
        createdAt: `${generateRandomElement(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], seed + 4)} ${generateRandomNumber(2022, 2024, seed + 5)}`,
    };
};

const generateListing = (id: number): Listing => {
    const city = generateRandomElement(cities, id);
    const bedrooms = generateRandomNumber(1, 6, id + 1);
    const bathrooms = generateRandomNumber(1, Math.max(1, bedrooms - 1), id + 2);
    const propertyType = generateRandomElement(propertyTypes, id + 3);
    const reviewCount = generateRandomNumber(0, 45, id + 4);
    const reviews = Array.from({ length: Math.min(reviewCount, 5) }, (_, i) => generateReview(id, i));
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const rating = reviewCount > 0 ? totalRating / reviews.length : generateRandomFloat(4.0, 5.0, 2, id + 5);

    const generateUniqueItems = <T>(list: T[], count: number, seed: number): T[] => {
        const shuffled = [...list].sort(() => deterministicRandom(seed++) - 0.5);
        return shuffled.slice(0, count);
    };

    return {
        id: `${id}`,
        host: generateRandomElement(hosts, id + 6),
        title: `${bedrooms}-Bed ${propertyType} in ${city}`,
        description: `A beautiful and spacious ${bedrooms}-bedroom property available for long-term lease in ${city}. It features modern amenities and is perfect for families or professionals. Enjoy the comfort and convenience of this lovely home in a quiet and secure neighborhood.`,
        propertyType,
        address: { city, country: 'Zimbabwe' },
        bedrooms,
        bathrooms,
        amenities: generateUniqueItems(amenitiesList, generateRandomNumber(5, 10, id + 7), id + 7),
        houseRules: generateUniqueItems(houseRulesList, generateRandomNumber(2, 4, id + 8), id + 8),
        features: generateUniqueItems(featuresList, generateRandomNumber(2, 4, id + 9), id + 9),
        photos: generateUniqueItems(africanHouseImages, generateRandomNumber(3, 7, id + 10), id + 10),
        pricePerMonth: Math.round(generateRandomNumber(400, 3500, id + 11) / 50) * 50,
        rating: parseFloat(rating.toFixed(2)),
        reviewCount,
        reviews,
    };
};

export const mockListings: Listing[] = Array.from({ length: 100 }, (_, i) => generateListing(i + 1));