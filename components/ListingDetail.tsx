import React, { useState } from 'react';
import type { Listing, Review } from '../types';
import { 
  StarIcon, 
  ShareIcon, 
  HeartIcon, 
  BackIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
  WifiIcon,
  KitchenIcon,
  CarIcon,
  PoolIcon,
  AcIcon,
  BriefcaseIcon,
  CheckIcon
} from './Icons';

// Amenity Icon Helper
const getAmenityIcon = (amenity: string, className: string) => {
  const props = { className };
  switch (amenity.toLowerCase()) {
    case 'wifi':
      return <WifiIcon {...props} />;
    case 'kitchen':
      return <KitchenIcon {...props} />;
    case 'free parking':
      return <CarIcon {...props} />;
    case 'pool':
      return <PoolIcon {...props} />;
    case 'air conditioning':
      return <AcIcon {...props} />;
    case 'dedicated workspace':
      return <BriefcaseIcon {...props} />;
    default:
      return <CheckIcon {...props} />;
  }
};

interface ListingDetailProps {
  listing: Listing;
  onBack: () => void;
}

const PhotoCarousel: React.FC<{ photos: string[], title: string }> = ({ photos, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!photos || photos.length === 0) {
    return <div className="relative h-72 bg-gray-200"></div>;
  }

  return (
    <div className="relative h-72 group">
      <img src={photos[currentIndex]} alt={`${title} - photo ${currentIndex + 1}`} className="w-full h-full object-cover" />
      {photos.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 p-1 rounded-full text-gray-800 hover:bg-white transition opacity-0 group-hover:opacity-100">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 p-1 rounded-full text-gray-800 hover:bg-white transition opacity-0 group-hover:opacity-100">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="border-b border-gray-200 py-4 last:border-b-0">
    <div className="flex items-center gap-3">
      <img src={review.reviewer.avatarUrl} alt={review.reviewer.name} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <p className="font-semibold">{review.reviewer.name}</p>
        <p className="text-xs text-gray-500">{review.createdAt}</p>
      </div>
    </div>
    <p className="mt-3 text-gray-700 leading-relaxed">{review.content}</p>
  </div>
);

const ListingDetail: React.FC<ListingDetailProps> = ({ listing, onBack }) => {
  const { 
    title, address, rating, reviewCount, host, propertyType,
    bedrooms, bathrooms, description, amenities,
    reviews, photos, pricePerMonth
  } = listing;

  return (
    <div className="bg-white min-h-screen">
      <div className="relative">
        <PhotoCarousel photos={photos} title={title} />
        <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
          <button onClick={onBack} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
            <BackIcon className="w-6 h-6 text-gray-800" />
          </button>
          <div className="flex gap-2">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <ShareIcon className="w-6 h-6 text-gray-800" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <HeartIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center gap-2 text-sm mt-1 text-gray-700">
          <StarIcon className="w-4 h-4 text-primary" />
          <span className="font-semibold">{rating.toFixed(2)}</span>
          <span className="text-gray-500">({reviewCount} reviews)</span>
          <span className="text-gray-500">·</span>
          <span className="underline font-semibold cursor-pointer hover:text-primary">{address.city}, {address.country}</span>
        </div>

        <hr className="my-5 border-gray-200" />

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{propertyType} listed by {host.name}</h2>
            <div className="flex gap-2 text-gray-600 mt-1">
              <span>{bedrooms} bed</span><span>·</span>
              <span>{bathrooms} bath</span>
            </div>
          </div>
          <img src={host.avatarUrl} alt={host.name} className="w-14 h-14 rounded-full" />
        </div>
        
        <hr className="my-5 border-gray-200" />
        
        <p className="text-gray-700 leading-relaxed">{description}</p>
        
        <hr className="my-5 border-gray-200" />

        <h2 className="text-xl font-semibold mb-3">What this place offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
          {amenities.slice(0, 6).map(amenity => (
            <div key={amenity} className="flex items-center gap-3">
              {getAmenityIcon(amenity, "w-6 h-6 text-gray-700 flex-shrink-0")}
              <span className="text-gray-800">{amenity}</span>
            </div>
          ))}
        </div>
        {amenities.length > 6 && (
            <button className="mt-4 w-full px-4 py-2 border border-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Show all {amenities.length} amenities
            </button>
        )}

        {reviews.length > 0 && <hr className="my-5 border-gray-200" />}
        
        {reviews.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-primary" />
              {rating.toFixed(2)} · {reviewCount} {reviewCount > 1 ? 'reviews' : 'review'}
            </h2>
            {reviews.slice(0,2).map(review => <ReviewCard key={review.id} review={review} />)}
            {reviews.length > 2 && (
              <button className="mt-4 w-full px-4 py-2 border border-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Show all {reviews.length} reviews
              </button>
            )}
          </div>
        )}
      </div>

      <div className="h-24" /> 

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center max-w-lg mx-auto z-20">
        <div>
          <p className="font-bold text-lg">${pricePerMonth.toLocaleString()} <span className="font-normal text-base text-gray-600">/ month</span></p>
        </div>
        <button className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors">
          Contact Landlord
        </button>
      </div>
    </div>
  );
};

export default ListingDetail;