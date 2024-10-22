import React from "react";
import { useAppContext } from "../../context/AppContext";
import { Carousel } from "../Carousel/Carousel";

const Catalog = ({}) => {
  const { catalogRef, animations } = useAppContext();

  return (
    <div ref={catalogRef} id="catalog" className="bg-stone-900 px-24 py-12 max-w-[100vw] overflow-hidden">
      <p
        className={`large-text text-stone-200 pb-8 transition-all duration-200 ${
          animations.catalog ? `opacity-100` : `opacity-0`
        }`}
      >
        Catalogo
      </p>

      <Carousel contentData={[{ title: "a" }, { title: "b" }, { title: "c" }]} />
    </div>
  );
};

export default Catalog;
