import { useEffect, useState } from "react";

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      {products.map((product, index) => {
        return <div key={`product number : ${index}`}>product</div>;
      })}
    </div>
  );
};
