'use client';

import Masonry from '@mui/lab/Masonry';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";
import { Loader2 } from 'lucide-react'

interface Image {
  name: string;
  title: string;
}
interface imageProps {
    images: Image[];
    }

export default function Images(props: imageProps) {
  const [items, setItems] = useState<Image[]>([]); // Your initial data
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (items.length >= props.images.length) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setItems([...items, ...props.images.slice(items.length, items.length + 20)]);
    }, 1500);
  };


  
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader2 size={100} className='animate-spin overflow-hidden mb-6'/>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have reached the bottom</b>
        </p>
      }
      className='flex justify-center flex-wrap gap-4 overflow-hidden w-5/6 items-center mx-auto'
    >
      {/* <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 800: 3, 1100: 4, 1700: 5 }}> */}
        <Masonry gutter="10px">
        {items.map((item, index) => (
              <img src={`https://via.placeholder.com/${item.name}`} alt={item.title} key={index} />
          ))}
        </Masonry>
      {/* </ResponsiveMasonry> */}
      </InfiniteScroll>
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
