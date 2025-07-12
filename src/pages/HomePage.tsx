import React from "react";
import Welcome from "../components/Welcome/Welcome";
import FeaturedArtist from "../components/FeaturedArtist/FeaturedArtist";
import About from "../components/About/About";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Welcome Section */}
      <section className="pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pb-24">
        <Welcome />
      </section>

      {/* Featured Artist Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <FeaturedArtist />
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <About />
      </section>
    </div>
  );
};

export default HomePage; 