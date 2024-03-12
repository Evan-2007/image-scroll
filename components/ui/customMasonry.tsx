'use client';

//import Masonry from '@mui/lab/Masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";
import { Loader2 } from 'lucide-react'
import styles from '@/styles/fadeIn.module.css'
import Masonry from 'react-masonry-css';


interface Image {
  name: string;
  title: string;
  id: number;
  width: number;
  height: number;
    src: string;
}
interface imageProps {
    images: Image[];
    }

export const Images = (function Images(props: imageProps) {

  

  const [items, setItems] = useState<Image[]>([]); // Your initial data
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
    console.log('fetching data');
    }, []);

  const fetchData = () => {
    if (items.length >= props.images.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      // Use functional update to ensure we have the latest state
      const newItems = props.images.slice(0, items.length + 20);
      const loadingItem = { name: 'loading', title: 'loading', id: 0, width: 0, height: 0 };
      const withLoading = newItems.concat(Array(props.images.length).fill(loadingItem));
      setItems(prevItems => [
        ...prevItems,
        ...props.images.slice(prevItems.length, prevItems.length + 20),
      ]);
      
    }, 1500); // Assuming there's a real async call, adjust time accordingly
  };

  
  return (
    <div className='flex justify-center items-center '>
    <button onClick={fetchData}>Simulate scroll</button>
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<div></div>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have reached the bottom</b>
        </p>
      }
      className={` w-full h-full ${styles.fadeIn} `}
    >

        <Masonry
            breakpointCols={7}
            className={styles.myMasonryGrid}
            columnClassName={styles.myMasonryGridColumn}
        >
            {items.map((item, index) => (
                <div key={index} className=''>
                <img src={item.src} alt={item.title} className='rounded-lg' />
                </div>
            ))}
        </Masonry>

      {/* <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 800: 3, 1100: 4, 1700: 5 }}> */}
      {/* </ResponsiveMasonry> */}
      </InfiniteScroll>
    </div>
  );
} );

function Loading() {
  return (
    <>
        <div>
        <Loader2 size={100} className='animate-spin absolute'/>
        </div>
    </>
  );
}
