"use client"

import { useParams } from 'next/navigation'
import React from 'react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { ProductDetails } from '@/app/components';

const page = async () => {
  const { slug }: any = useParams();

  const decodedSlug = decodeURIComponent(slug);

  const products = await client.fetch(groq`*[_type=="product"]{..., slug}`);

  const product = products.find((product: any) =>
      product.slug?.current?.toLowerCase().trim() === decodedSlug.toLowerCase().trim()
  );

  return (
      <>
          {/* Render Product Details */}
          {product ? <ProductDetails product={product} /> : <p>Product not found</p>}
      </>
  );
};

export default page;
