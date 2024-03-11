'use client';
import Images from '@/components/ui/images';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ImageExample(){
  const [images, setImages]= useState([]);
  const [ loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect (() => {
    const fetchData = async() => {
      try {
        const res = await fetch('https://api.evanc.dev/images/random');
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
    <div className=''>
      {loading ? <Loader2 size={100} className='animate-spin overflow-hidden mb-6'/> : error? <p >Error</p>: <Images images={images}/>}
    </div>
  )
}