import React, { useState, useEffect, useRef, useCallback } from 'react';

const MasonryImageGrid = ({ images }) => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleImages((prevVisibleImages) => [
              ...prevVisibleImages,
              entry.target.src,
            ]);
          }
        });
      },
      { rootMargin: '100px' }
    );

    const imageElements = document.querySelectorAll('img');
    imageElements.forEach((img) => observer.observe(img));

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const loadMoreImages = useCallback(() => {
    const nextImages = images.slice(
      loadedImages.length,
      loadedImages.length + 20
    );
    setLoadedImages((prevLoadedImages) => [
      ...prevLoadedImages,
      ...nextImages,
    ]);
  }, [images, loadedImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreImages();
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreImages]);

  useEffect(() => {
    const numColumns = Math.max(Math.floor(window.innerWidth / 300), 1);
    const columnHeights = Array(numColumns).fill(0);
    const newColumns = Array.from({ length: numColumns }, () => []);

    loadedImages.forEach((image) => {
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      const imageHeight = (300 / image.widths) * image.heights;
      newColumns[shortestColumnIndex].push(
        <img
          key={image.id}
          src={image.src}
          alt={image.title}
          style={{ width: '100%', display: 'block' }}
        />
      );
      columnHeights[shortestColumnIndex] += imageHeight;
    });

    setColumns(newColumns);
  }, [loadedImages, visibleImages]);

  return (
    <div style={{ display: 'flex' }}>
      {columns.map((column, index) => (
        <div key={index} style={{ marginRight: '10px' }}>
          {column}
        </div>
      ))}
      <div ref={loadMoreRef} style={{ height: '1px' }} />
    </div>
  );
};

export default MasonryImageGrid;