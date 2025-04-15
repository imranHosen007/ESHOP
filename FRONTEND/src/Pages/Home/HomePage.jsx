import React from "react";
import Hero from "./Hero/Hero";
import Categoires from "./Categories/Categoires";
import BestDeals from "./BestDeals/BestDeals";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Event from "./Event/Event";
import Sponsored from "./Sponsored/Sponsored";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Categoires />
      <BestDeals />
      <Event />
      <FeaturedProducts />
      <Sponsored />
    </div>
  );
};

export default HomePage;
