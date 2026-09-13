import HeroSection from "@/components/home/hero-section/HeroSection";
import FlashSalesSection from "@/components/home/flash-sales/FlashSalesSection";
import BrowseCategoriesSection from "@/components/home/browse-categories/BrowseCategoriesSection";
import BestSellingSection from "@/components/home/best-selling/BestSellingSection"
import MusicExperienceSection from "@/components/home/music-experience/MusicExperienceSection";
import ExploreProductsSection from "@/components/home/explore-products/ExploreProductsSection";
import NewArrivalSection from "@/components/home/new-arrival/NewArrivalSection";
import ServiceFeaturesSection from "@/components/home/service-features/ServiceFeaturesSection";


import {getProducts} from "@/lib/product/data";


export default async function HomePage() {
  const products = await getProducts();

   const bestSellingProducts = [...products]
    .sort((firstProduct, secondProduct) => {
      return secondProduct.rating - firstProduct.rating;
    })
    .slice(0, 4);

  return (
    <main>
      <HeroSection />

      <FlashSalesSection products={products} />

      <BrowseCategoriesSection />

      <BestSellingSection products={bestSellingProducts} />

      <MusicExperienceSection/>

      <ExploreProductsSection products={products} />
      
      <NewArrivalSection />

      <ServiceFeaturesSection />
    </main>
  );
}
