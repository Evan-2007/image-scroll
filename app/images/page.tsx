'use client';
import Images from '@/components/ui/images';
import {images} from '@/data/images';

export default async function ImageExample(){
  return (
    <Images images={images}/>
  )
}