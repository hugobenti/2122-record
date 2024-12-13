import React from "react";
import catalogData from "../../content/catalog.json";
import { useAppContext } from "../../context/AppContext";
import { Carousel } from "../Carousel/Carousel";

const Catalog = ({}) => {
  const { catalogRef, animations } = useAppContext();

  return (
    <div ref={catalogRef} id="catalog" className="pr-24 py-12 max-w-[100vw] overflow-hidden">
      <p
        className={`large-text text-stone-200 pb-8 transition-all duration-200 ${
          animations.catalog ? `opacity-100` : `opacity-0`
        }`}
      >
        Catalogo
      </p>

      <Carousel contentData={catalogData} itemSize={0.30} />
    </div>
  );
};

export default Catalog;
