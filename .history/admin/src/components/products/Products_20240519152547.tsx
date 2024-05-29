import { useState } from "react";

export const Products = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      {products.map((product, index) => {
        return <div>product</div>;
      })}
    </div>
  );
};
