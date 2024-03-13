import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@/components/ui/imageModal';

const MasonryImageGrid = ({ images }) => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [columns, setColumns] = useState([]);
  const observerRef = useRef(null);

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

  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleModal = (src) => {
    setModalImage(src);
    setModal(true);
    console.log(src);
  };


  useEffect(() => {
    const numColumns = Math.max(Math.floor(window.innerWidth / 300), 1);
    const columnHeights = Array(numColumns).fill(0);
    const newColumns = Array.from({ length: numColumns }, () => []);

    images.forEach((image) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const imageHeight = (300 / image.widths) * image.heights;
      newColumns[shortestColumnIndex].push(
          <img
            key={image.id}
            src={image.src}
            alt={image.title}
            style={{ width: '100%', display: 'block' }}
            className='p-1 hover:scale-110 relative z-10 hover:z-20 transition-transform duration-300 ease-in-out rounded-md'
            onClick={handleModal.bind(this, image.src)}
            draggable="false"
          />
      );
      columnHeights[shortestColumnIndex] += imageHeight;
    });

    setColumns(newColumns);
  }, [images, visibleImages,], [window.innerWidth]);

  return (
    <>
    <div style={{ display: 'flex' }}>
      {columns.map((column, index) => (
        <div key={index}>
          {column}
        </div>
      ))}
    </div>
    {modal && (
      <Modal
        src={modalImage}
        setModal={setModal}
      />
    )}
    </>
  );
};

export default MasonryImageGrid;
