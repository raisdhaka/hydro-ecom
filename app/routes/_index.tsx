/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";

import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import AOS from 'aos';
import 'aos/dist/aos.css';

import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  return [{ title: 'Hydrogen | Home' }];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront } = context;
  const { collections } = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({ featuredCollection, recommendedProducts });
}

export default function Homepage() {
  // useEffect(() => {
  //   AOS.init();
  //   AOS.refresh();
  // }, []);
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <Sliders />
      <AfterSlider />
      <OurCategory />
    </div>
  );
}


function Sliders() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="sldiers" data-aos="zoom-in" >
      <div className="sldiers-image mb-3">
        <img src="img/slider01.png" alt="Slider01" className="img-fluid slider" />
        <div className="sliderOverflow text-center">
          <h1>ART<br />
            FOR YOUR TOUCH.</h1>
          <h3 className="py-3">振り向くな、振り向くな、後ろには夢がない </h3>
          <a href="#" className="btnCata">Browse Catalogue</a><br /><br/>
          <a href="#" className="btnCataC">七転び八起き</a>
        </div>
        <div className="socliaArea">
          <a href="#"><img src="img/so_fb.png" alt="facebook" /></a>
          <a href="#"><img src="img/so_tik.png" alt="facebook" /></a>
          <a href="#"><img src="img/so_pin.png" alt="Pinterest" /></a>
          <a href="#"><img src="img/so_discord.png" alt="Pinterest" /></a>
        </div>
      </div>
    </div>
  );
}


function AfterSlider() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="after-slider mx-5 px-5 my-3 py-5" data-aos="zoom-in" data-aos-duration="1000">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae fermentum ligula. Aliquam ornare viverra mollis. Etiam vitae risus in ante dapibus venenatis quis eget augue. Nunc eget ultricies tellus. Sed et lectus id diam congue finibus.</p>
    </div>
  );
}


function OurCategory() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="ourCategory mx-5" data-aos="zoom-in">
      <h2>Our Category</h2>
      <div className="ourCategory-grid">
        <div className="row">

          <div className="col-sm-3 text-center" data-aos="zoom-in">
            <div className="catimgOverflow">
              <img src="img/grid0101.png" alt="grid1" className='w-full' />
            </div>
              <a href="#" className="btn btn-lg cat">Cosplay</a>

          </div>
          <div className="col-sm-3 text-center" data-aos="zoom-in">
            <div className="catimgOverflow">
              <img src="img/grid0102.png" alt="grid2" className='w-full' />
            </div>
              <a href="#" className="btn btn-lg cat">Pillow Collection</a>
          </div>
          <div className="col-sm-6" data-aos="zoom-in">
            <h1 className="exploreMore">Explore <br/><span>More</span></h1>
            <a href="#" className="btn btn-lg catw">Full Catalogue</a>
          </div>
        </div>
        <div className='row'>
          <div className="col-sm-3 text-center" data-aos="zoom-in">
            <div className="catimgOverflow">
              <img src="img/grid0201.png" alt="grid3" className='w-full' />
            </div>
              <a href="#" className="btn btn-lg cat">Phone Covers</a>

          </div>
          <div className="col-sm-9 text-center" data-aos="zoom-in">
            <div className="catimgOverflow">
              <img src="img/grid0202.png" alt="grid4" className='w-full' />
            </div>
              <a href="#" className="btn btn-lg cat">Figures</a>
          </div>
        </div>

      </div>
    </div>
  );
}



function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    <div className="recommended-products">
      <h2 className='ourCategory'>Our Category</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({ products }) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
