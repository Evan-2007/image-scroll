  'use client';

  import Masonry from '@mui/lab/Masonry';

  import InfiniteScroll from 'react-infinite-scroll-component';
  import { useEffect, useState } from "react";
  import { Loader2 } from 'lucide-react'
  import styles from '@/styles/fadeIn.module.css'
  import { memo } from 'react';
  import React, {useRef} from 'react';
  import Skeleton from '@mui/material/Skeleton';
  import { FixedSizeList as List } from "react-window"
//  import { Masonry } from 'react-masonry'
//  import { Masonry } from "masonic";

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

  export const Images = memo (function Images(props: imageProps) {

    

    const [items, setItems] = useState<Image[]>([]); // Your initial data
    const [hasMore, setHasMore] = useState(true);
    const [ key , setKey] = useState(0);


    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      const withoutLoading = items.filter((item) => item.name !== 'loading');
      if (withoutLoading.length >= props.images.length) {
        setHasMore(false);
        return;
      }
      setTimeout(() => {
        // Use functional update to ensure we have the latest state
        const newItems = props.images.slice(0, items.length + 40);
        const loadingItem = { name: 'loading', title: 'loading', id: 0, width: 0, height: 0 };
        const withLoading = newItems.concat(Array(props.images.length).fill(loadingItem));
        setItems(prevItems => [
          ...prevItems,
          ...props.images.slice(prevItems.length, prevItems.length + 20),
        ]);
        
      }, 1500); // Assuming there's a real async call, adjust time accordingly
    };


//https://github.com/bvaughn/react-virtualized/blob/master/docs/Masonry.md
    return (
      <>
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
        className={`flex justify-center flex-wrap gap-4 overflow-hidden w-5/6 items-center mx-auto ${styles.longFadeIn} `}
      >

        {/* <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 800: 3, 1100: 4, 1700: 5 }}> */}
          <Masonry columns={{xs: 2, sm: 3, md: 4, xl: 5}} spacing={1} defaultHeight={300} className={styles.fadein} >
              {items.map((item, index) => (
                <div key={index} className={styles.fadeIn}>
                  {item.name === 'loading' ? (
                    <Skeleton variant="rectangular" className='w-full' height={300} />
                  ) : (
                    <img src={`/${item.name}.jpg`} alt={item.title} loading='lazy' style={{ minHeight: 10 }} className={`w-full h-full ${styles.fadeIn}`}/>
                  )}
                </div>
                ))}
          </Masonry>
        {/* </ResponsiveMasonry> */}
        </InfiniteScroll>
      </>
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
