  'use client';

  import Masonry from '@mui/lab/Masonry';

  import InfiniteScroll from 'react-infinite-scroll-component';
  import { useEffect, useState } from "react";
  import { Loader2 } from 'lucide-react'
  import styles from '@/styles/fadeIn.module.css'
  import { memo } from 'react';
  import React, {useRef} from 'react';
  import Skeleton from '@mui/material/Skeleton';
//  import { Masonry } from 'react-masonry'

  interface Image {
    name: string;
    title: string;
    id: number;
    width: number;
    height: number;
  }
  interface imageProps {
      images: Image[];
      }

  export default function Images(props: imageProps) {

    

    const [items, setItems] = useState<Image[]>([]); // Your initial data
    const [hasMore, setHasMore] = useState(true);
    const [ notLoaded , setNotLoaded] = useState<Image[]>([]);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      if (items.length >= props.images.length) {
        setHasMore(false);
        return;
      }
      setTimeout(() => {
        // Use functional update to ensure we have the latest state
        setItems(prevItems => [
          ...prevItems,
          ...props.images.slice(prevItems.length, prevItems.length + 20),
        ]);
        setNotLoaded(
          props.images.filter(obj1 => !items.some(obj2 => obj2.id === obj1.id))
        );
      }, 1500); // Assuming there's a real async call, adjust time accordingly
    };

    
    return (
      <>
              <button onClick={fetchData}>Simulate scroll</button>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<div>loading</div>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have reached the bottom</b>
          </p>
        }
        className='flex justify-center flex-wrap gap-4 overflow-hidden w-5/6 items-center mx-auto'
      >

        {/* <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 800: 3, 1100: 4, 1700: 5 }}> */}
          <Masonry columns={{xs: 2, sm: 3, md: 4, xl: 5}} spacing={1} defaultHeight={200} >
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <img src={`/${item.name}.jpg`} alt={item.title} loading='lazy' style={{ minHeight: 10 }} className={styles.fadeIn}/>
            </React.Fragment>
            ))}
            {/* {notLoaded.map((item, index) => (
              <React.Fragment key={item.id}>
                <Skeleton variant="rectangular" width={item.width} height={item.height} className={styles.fadeIn}/>
              </React.Fragment>
            ))} */}
          </Masonry>
        {/* </ResponsiveMasonry> */}
        </InfiniteScroll>
      </>
    );
  }

  function Loading() {
    return (
      <>
          <div>
          <Loader2 size={100} className='animate-spin absolute'/>
          </div>
      </>
    );
  }
