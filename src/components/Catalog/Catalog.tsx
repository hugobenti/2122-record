import React from "react";
import { useAppContext } from "../../context/AppContext";

const Catalog = ({}) => {
  const { catalogRef, animations } = useAppContext();

  return <div ref={catalogRef} id="catalog" className="bg-stone-700 px-24 py-12">Catalog!</div>;
};

export default Catalog;
