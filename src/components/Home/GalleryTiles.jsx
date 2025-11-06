import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaEye, FaDownload } from 'react-icons/fa';

// --- Configuration Constants ---
const TOTAL_IMAGES = 50;
const INITIAL_LOAD = 9; 
const LOAD_INCREMENT = 9; 

// --- Vite Dynamic Import Setup ---
const galleryImages = import.meta.glob('../../assets/gallery/*.jpg', { eager: true, as: 'url' });

const getGalleryImage = (index) => {
    const pathKey = `../../assets/gallery/${index}.jpg`;
    return galleryImages[pathKey] || '';
};

// --- Placeholder Components ---

const SkeletonTile = () => (
  <div className="relative aspect-video w-full bg-gray-200 animate-pulse rounded-lg shadow-md overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Loading...</div>
  </div>
);

const GalleryTile = React.memo(({ index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  const src = getGalleryImage(index);
  const imageAlt = `Gallery Image ${index}`;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleView = () => {
    if (src) {
        window.open(src, '_blank');
        console.log(`Viewing image in new tab: ${index}.jpg`);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `smce_gallery_image_${index}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`Downloading image: ${index}.jpg`);
  };

  if (!src) {
      return <SkeletonTile />; 
  }

  return (
    <div className="relative aspect-video w-full rounded-lg shadow-xl overflow-hidden group">
      {!isLoaded && <SkeletonTile />}
      
      <img
        ref={imgRef}
        src={src} 
        alt={imageAlt}
        onLoad={handleImageLoad}
        onError={() => console.error(`Failed to load image: ${index}.jpg`)}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in ${
          isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
        }`}
        style={{ zIndex: isLoaded ? 1 : 0 }}
        loading="lazy"
      />

      {/* Overlay and Options (View/Download) */}
      {isLoaded && (
        <div 
          // ➡️ UPDATED: Subtle default opacity, slightly more on hover
          className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center 
                     opacity-0 group-hover:opacity-100 group-hover:bg-opacity-20 transition-all duration-300 z-10"
        >
          <button 
            onClick={handleView}
            aria-label={`View ${imageAlt}`}
            className="p-3 m-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition duration-200"
          >
            <FaEye className="text-xl" />
          </button>
          <button 
            onClick={handleDownload}
            aria-label={`Download ${imageAlt}`}
            className="p-3 m-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition duration-200"
          >
            <FaDownload className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
});


// --- Main Component ---
function GalleryTiles() {
  const [loadedCount, setLoadedCount] = useState(INITIAL_LOAD);
  const loadingRef = useRef(null); 

  const hasMore = loadedCount < TOTAL_IMAGES;

  const loadMore = useCallback(() => {
    if (loadedCount >= TOTAL_IMAGES) return;
    console.log(`Loading next batch: ${loadedCount + 1} to ${Math.min(loadedCount + LOAD_INCREMENT, TOTAL_IMAGES)}`);
    setLoadedCount(prevCount => Math.min(prevCount + LOAD_INCREMENT, TOTAL_IMAGES));
  }, [loadedCount]);

  useEffect(() => {
    if (!hasMore || !loadingRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target); 
            loadMore();
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(loadingRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadedCount, loadMore]); 

  const imageIndices = Array.from({ length: loadedCount }, (_, i) => i + 1);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white mt-24"> 
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Campus Gallery
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageIndices.map((index) => (
            <GalleryTile key={index} index={index} />
          ))}
        </div>
        
        {hasMore && (
          <div ref={loadingRef} className="py-10 flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
               <SkeletonTile />
               <SkeletonTile />
               <SkeletonTile />
            </div>
            <p className="mt-4 text-gray-500">Loading more images...</p>
          </div>
        )}

        {!hasMore && (
          <p className="text-center text-gray-500 py-10">
            You've reached the end of the gallery.
          </p>
        )}
      </div>
    </section>
  );
}

export default GalleryTiles;