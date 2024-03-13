'use client';
import MasonryImageGrid from '@/components/ui/customMasonry';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function Home(){
  const [images, setImages]= useState([]);
  const [ loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect (() => {
    const fetchData = async() => {
      try {
        const res = await fetch('https://api.evanc.dev/images/random?start=0&end=200');
        const data = await res.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, []);
  return (
    <div className='flex justify-center mb-10'>
      {loading ? <Loader2 size={100} className='animate-spin overflow-hidden mb-6'/> : error ? <p >Error</p>: <MasonryImageGrid images={images}/>}
    </div>
  )
}