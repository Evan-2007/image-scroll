import React, { useEffect, useState } from "react";
import { Masonry } from "masonic";
import styles from '@/styles/fadeIn.module.css'

interface response {
    src: string;
    width: number;
    height: number;
}

export const MasonryComponent = () => {

    const [items, setItems] = useState<response[]>([]);
    const [loading, setLoading] = useState(true);
    const [ size , setSize] = useState(299);
    const [load , setLoad] = useState(0);
    const [initialSize, setInitialSize] = useState(0);
    const [bottomMargin , setBottomMargin] = useState(0);


    function style() {
      if (load === 0 && loading === false) {
        setLoad(1)
        return styles.fadeIn
      } else {
        return styles.slowFadeIn
      }
    }

    useEffect(() => {

      const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
  
        if (scrollTop + clientHeight >= scrollHeight - 3000  ) {
          console.log('near bottom');
  //        setSize(300)
        } else {
          console.log('not near bottom');
        }
      };
      style();


      window.addEventListener('scroll', handleScroll);
      fetchData();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };


    }, []);
      
    async function fetchData() {
        const response = await fetch("https://api.evanc.dev/images/random?start=0&end=200");
        const data: response[] = await response.json();
        setItems(data);
        setLoading(false);
    }


    return (
    <main className={`mb-[${bottomMargin}px]`}>
      <div className={`flex justify-center flex-wrap gap-4 overflow-hidden w-5/6 items-center mx-auto ${styles.fadeIn} `}>
        <h1>Images</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Masonry
          // Provides the data for our grid items
          items={items}
          // Adds 8px of space between the grid cells
          columnGutter={10}
          // Sets the minimum column width to 172px
          columnWidth={size}
          // Pre-renders 5 windows worth of content
          overscanBy={20}
          // This is the grid item component
          render={
            ({ data }) => (
              <div className={`h-[${data.height}px] w-[${data.width}px] ${style}`}>
                <img src={data.src} className=" rounded-sm w-full h-full" width={data.width} height={data.height}/>
              </div>
            )
          }
        />
        )}
      </div>
    </main>
  );
};

//array props
type ArrayItem = {
    data: {
        src: string;
    };
};

const FakeCard = ({ data: { src } }: ArrayItem) => (
    <div>
        <img className={src} />
    </div>
);
